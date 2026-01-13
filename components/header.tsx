"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/cartContext";

type User = {
	name: string;
};

export function Header() {
	const { items } = useCart()
	const router = useRouter();
	const pathname = usePathname()
	const [user, setUser] = useState<User | null>(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const checkUser = async () => {
			const res = await fetch("/api/me", {
				method: "GET",
				credentials: "include",
			});

			if (!res.ok) return;

			const me: User = await res.json();
			setUser(me);
		};

		checkUser();
	}, [pathname]);

	const logout = async () => {
		await fetch("/api/logout", {
			method: "POST",
			credentials: "include",
		});

		setUser(null);
		router.push("/login");
	};

	return (
		<header className="w-full border-b px-4 py-2 flex justify-between items-center">
			<span className="font-medium">getFoods</span>

			{user && (
				<div className="relative">
					{/* Username */}

					<button onClick={() => router.push("/cart")}>
						Cart ({items.length})
					</button>

					<button
						onClick={() => setOpen((v) => !v)}
						className="text-sm opacity-70 hover:opacity-100"
					>
						{user.name}
					</button>

					{/* Dropdown */}
					{open && (
						<div className="absolute right-0 mt-2 bg-white border rounded shadow">
							<button
								onClick={logout}
								className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full text-left"
							>
								Logout
							</button>
						</div>
					)}
				</div>
			)}
		</header>
	);
}
