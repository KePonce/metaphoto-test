# MetaPhoto – Software Developer Technical Test

This repository contains the solution for the MetaPhoto Software Developer Technical Test.
The objective of this project is to build an external API that enriches photo data with album and
user information, reducing the number of API calls required by client applications.

The solution is implemented using Node.js, Express, and React, following the requirements
provided in the technical test document.

---

## Part 1 – Backend API

The backend exposes an external API that consumes and enriches data from the following internal APIs:

- https://jsonplaceholder.typicode.com/photos
- https://jsonplaceholder.typicode.com/albums
- https://jsonplaceholder.typicode.com/users

The external API combines photo, album, and user data into a single response and supports
filtering and pagination.

---

## Technologies Used

- Node.js (LTS)
- Express.js
- Axios
- React
- JavaScript
- npm

---

## Setup Instructions – Backend

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (LTS)
- npm

You can verify the installation by running:

```bash
node -v
npm -v
```

---

### Install Backend Dependencies

From the root of the repository, navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

---

### Run the Backend Server

Start the backend server with:

```bash
node index.js
```

If the server starts correctly, you should see the following message in the terminal:

```
API running on http://localhost:3000
```

---

## Available Backend Endpoints

### Health Check

```
GET /health
```

Example:
```
http://localhost:3000/health
```

---

### Get Enriched Photo by ID

```
GET /externalapi/photos/:id
```

Example:
```
http://localhost:3000/externalapi/photos/1
```

---

### Get Enriched Photos with Filters and Pagination

```
GET /externalapi/photos
```

#### Supported Filters (Query Parameters)

- `title` → filters photos where the title contains the provided value
- `album.title` → filters photos where the album title contains the provided value
- `album.user.email` → filters photos where the user email equals the provided value

#### Pagination

- `limit` → maximum number of records to return (default: 25)
- `offset` → starting position in the result set (default: 0)

---

## Example Backend Requests

```text
/externalapi/photos?title=repudiandae iusto
/externalapi/photos?album.title=quidem
/externalapi/photos?album.user.email=Sincere@april.biz
/externalapi/photos?album.title=quidem&title=repudiandae iusto
/externalapi/photos?album.title=quidem&limit=10&offset=50
```

---

## Part 2 – Frontend SPA (React)

The frontend is a simple Single Page Application (SPA) built with React.
It consumes the backend API and allows users to:

- View enriched photos (photo + album + user)
- Apply filters
- Navigate results using pagination

---

### Install Frontend Dependencies

From the root of the repository:

```bash
cd frontend
npm install
```

---

### Run the Frontend

Start the React application with:

```bash
npm start
```

If port `3000` is already in use by the backend, React will ask to run on another port.
Accept the prompt by typing `Y`.

The frontend will run on a port such as:

```
http://localhost:3001
```

---

### Backend + Frontend Integration

- Backend runs on: `http://localhost:3000`
- Frontend runs on: `http://localhost:3001`

Make sure the backend server is running before using the frontend SPA.

---

## Project Structure

```
METAPOTO-TEST/
├── README.md
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── node_modules/
```

---

## Status

- Part 1 – Backend API: Completed
- Part 2 – Frontend SPA: Completed

---

## Notes

This project prioritizes the correct implementation of API requirements such as data enrichment,
filtering, and pagination over UI design or performance optimizations.
