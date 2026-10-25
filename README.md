# travelPro4

Full-stack travel management project with a Spring Boot backend and React/Vite frontend.

## Requirements

- Java 21 or compatible JDK
- MySQL
- Node.js and npm
- 
## 🛠️ Tech Stack / Kullanılan Teknolojiler
**Frontend:** React, Vite, [Kullandıysanız örn: Tailwind CSS, Axios]
**Backend:** Java 21, Spring Boot, Spring Data JPA
**Database:** MySQL

## Backend Setup

1. Copy the example config:

   ```powershell
   Copy-Item backend\src\main\resources\application.properties.example backend\src\main\resources\application.properties
   ```

2. Update `backend\src\main\resources\application.properties` with your local MySQL username and password.

3. Create a MySQL database named `travelpro`.

4. Start the backend:

   ```powershell
   cd backend
   .\gradlew.bat bootRun
   ```

The backend runs on `http://localhost:8080`.

## Frontend Setup

1. Install dependencies:

   ```powershell
   cd frontend
   npm install --legacy-peer-deps
   ```

2. Start the dev server:

   ```powershell
   npm run dev
   ```

The frontend runs on `http://localhost:5173`.

In development, Vite proxies `/api` requests to `http://localhost:8080`.

## Checks

Frontend:

```powershell
cd frontend
npm run lint
npm run build
```

Backend:

```powershell
cd backend
.\gradlew.bat test
```
