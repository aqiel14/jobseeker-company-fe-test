# JobSeeker Company FE Test

This is a **Front End Technical Test** for the Frontend Developer position . The application is built using **Next.js**, **Tailwind CSS**, **Zustand**, **Axios**, and **Yup**.

It demonstrates a simple User and Post management app with CRUD operations, responsive UI, and state management.

---

## Deployment

https://jobseeker-company-fe-test.vercel.app/

## Features

### User Page
- Fetch users from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)  
- **CRUD actions**: Create, Read, Update, Delete  
- Search and pagination support  
- Display company name  
- Responsive table and list view  

### Post Page
- Select a user to display posts from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users/{id}/posts)  
- Pagination and per-page selector  
- Navigate from User page to Post page  
- Responsive grid layout  

### Additional Features
- Skeleton loading states for Users and Posts  
- Error handling with toast notifications  
- Dark mode toggle  
- Undo delete feature for users  

---

## Technologies
- Next.js 14 (App Router)  
- TypeScript  
- Tailwind CSS v4  
- Zustand (state management)  
- Axios (API requests)  
- Yup (form validation)  
- Shadcn UI components  
- Sonner for toast notifications  

---

## Folder Structure

```bash
app/ # pages & layouts
components/ # Reusable UI components (UserTable, PostCard, etc.)
lib/ # API service functions
store/ # Zustand state stores
types/ # TypeScript type definitions
schemas/ # Yup validation schemas
public/ # Static assets

```

## Getting Started

### Installation
```bash
git clone https://github.com/aqiel14/jobseeker-company-fe-test.git
cd jobseeker-company-fe-test
npm install
# or
yarn install
```

Open http://localhost:3000 in your browser.

