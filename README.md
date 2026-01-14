## Food_ordering_web_app

A food delivery web app with role based access(RBAC) and relation based access(ReBAC). Build using Nextjs, graphql and Jwt (for authorization). <br />
Demo: https://food-ordering-web-app-git-main-ahmed-armaans-projects.vercel.app/login

---

## Build
To build and run the we app - 
- Clone the repo
```bash
git clone https://github.com/Ahmed-Armaan/Food_ordering_web_app.git
```
- run using npm
```bash
npm run dev
```
-build using npm
```bash
npm run build
```

## Authentication handling

RBAC and ReBAC are achieved using JWT tokens. The country and role data are wrapped inside the JWT payload. At every request the payload is checked to authenticate if the user is authorized for the action.

## Data fetch

graphql is used at the APIs to send only the required fields back to user (or internal implementations).

---
# API Documentation

All APIs are implemented using **Next.js App Router** under `app/api/*`.

Authentication is handled using **JWT stored in HTTP-only cookies**.  
Role-based access control (RBAC) and relation-based access control (ReBAC) are enforced at the API layer.

---

## Authentication

### POST `/api/login`

Logs in a user and sets a JWT as an HTTP-only cookie.

**Request Body**
```json
{
  "id": "string"
}
```

**Response**
- If login successful and Jwt set :
```json
{
  status: 200
}
```
- On failure
```json
{
  "error": "invalid request"
}
```

### GET `/api/me`

provide necessary data about the user

**Request Body**
```json
{}
```

**Response**
- On successful authentication
```json
{
  "name": "string",
  "role": "ADMIN | MANAGER | MEMBER",
  "country": "string"
}

```
- On failue
```json
{
  "error": "unauthorized"
}
```

### GET `/api/checkout`

Provides checkout ability to authorized users
**Request Body**
```json
{}
```

**Response**
- If allowed
```json
{
  "status": 200
}


```
- If not allowed
```json
{
  "error": "forbidden"
}
```

### GET `/api/paymentMethods`

provides payment methods and auth for adding or changing
**Request Body**
```json
{}
```

**Response**
- If authorized to pay (manager)
```json
{
  "paymentmethod": [
    {
      "id": "string",
      "brand": "string",
      "last4": "string",
      "expiryMonth": number,
      "expiryYear": number,
      "isDefault": boolean
    }
  ]
}



```
- If authorized to change and add (admin)
```json
{
  "paymentmethod":[...] // array of all avilable methods
}
```
` If unathorized
```json
{
  "error": "forbidden"
}
```
