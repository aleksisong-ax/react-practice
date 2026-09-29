# Class Demo

## Backend setup

The API requires MongoDB. Start a local MongoDB server, then create the server
environment file by copying `server/.env.example` to `server/.env`. The example
uses the default local MongoDB address; if your MongoDB server uses a different
address, update `MONGODB_URI` in `server/.env`. You can also use a MongoDB Atlas
connection string there.

From the project directory, start the API:

```powershell
Copy-Item server/.env.example server/.env
cd server
node server.mjs
```

Then, in a separate terminal from the project directory, start the frontend:

```powershell
npm run dev
```

## Step 11: Fix common errors and save your work

- **Cannot find `axios`:** run `npm install axios` from the project root (`class-demo`).
- **Cannot find `mongoose`:** run `npm install mongoose` from `class-demo/server`.
- **Missing `MONGODB_URI`:** check `server/.env` and start Node from `server`.
- **Authentication failed or timeout:** check your database user, URI encoding,
  allowed public IP, internet connection, and Atlas cluster status.
- **400 invalid input:** provide both a name and section. Empty or whitespace-only
  text is rejected.
- **`EADDRINUSE`:** stop the old backend using port 3001 before restarting.
- **Proxy error:** make sure Express is running and restart Vite after changing
  its configuration.
- **Blank page:** check the browser console, exact file names, imports, complete
  code parts, and `BrowserRouter` in `main.jsx`.

This is a local class demo without user authentication. Use fictional records.
Test a live Atlas connection with your own credentials; do not paste secrets
into screenshots or GitHub.

### Optional GitHub update

From the project root, review and stage your work:

```powershell
git status
git diff
git add src/pages/Students.jsx src/App.jsx vite.config.js
git add package.json package-lock.json
git add server/server.mjs server/models/Student.mjs
git add server/routes/students.mjs server/package.json
git add server/package-lock.json .gitignore README.md
git status
```

If the staged changes are correct, commit and push:

```powershell
git commit -m "Add student records CRUD"
git push
```
