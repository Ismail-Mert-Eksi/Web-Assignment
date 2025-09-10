import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.tsx"
import HomePage from "./pages/HomePage.tsx"
import UsersPage from "./pages/UsersPage.tsx"
import PostsPage from "./pages/PostsPage.tsx"
import "./index.css"

// Router tanımı
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "users", element: <UsersPage /> },
      { path: "posts", element: <PostsPage /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
