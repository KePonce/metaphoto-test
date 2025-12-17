# MetaPhoto – Software Developer Technical Test

This repository contains the solution for the MetaPhoto Software Developer Technical Test.
The objective of this project is to build an external API that enriches photo data with album and
user information, reducing the number of API calls required by client applications.

The solution is implemented using Node.js and Express, following the requirements provided in
the technical test document.

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
- JavaScript
- npm

---

## Setup Instructions (Backend)

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

### Install Dependencies

From the root of the repository, navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

This will install all required packages defined in `package.json`.

---

### Run the Server

Start the backend server with:

```bash
node index.js
```

If the server starts correctly, you should see the following message in the terminal:

```
API running on http://localhost:3000
```

---

## Available Endpoints

### Health Check

```
GET /health
```

Returns a simple response to verify that the API is running.

Example:
```
http://localhost:3000/health
```

---

### Get Enriched Photo by ID

```
GET /externalapi/photos/:id
```

Returns a single photo enriched with its album and user information.

Example:
```
http://localhost:3000/externalapi/photos/1
```

---

### Get Enriched Photos with Filters and Pagination

```
GET /externalapi/photos
```

Returns a list of enriched photos.

#### Supported Filters (Query Parameters)

- `title` → filters photos where the title contains the provided value
- `album.title` → filters photos where the album title contains the provided value
- `album.user.email` → filters photos where the user email equals the provided value

#### Pagination

- `limit` → maximum number of records to return (default: 25)
- `offset` → starting position in the result set (default: 0)

---

## Example Requests

```text
/externalapi/photos?title=repudiandae iusto
/externalapi/photos?album.title=quidem
/externalapi/photos?album.user.email=Sincere@april.biz
/externalapi/photos?album.title=quidem&title=repudiandae iusto
/externalapi/photos?album.title=quidem&limit=10&offset=50
```

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
```

---

## Status

- Part 1 – Backend API: Completed
- Part 2 – Frontend SPA: Pending

---

## Notes

This project prioritizes the correct implementation of API requirements such as data enrichment,
filtering, and pagination over UI design or performance optimizations.