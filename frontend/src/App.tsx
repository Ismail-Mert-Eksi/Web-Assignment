import { Link, Outlet, useLocation } from "react-router-dom"

export default function App() {
  const { pathname } = useLocation()

  return (
    <div className="max-w-5xl mx-auto p-4">
      <header className="flex items-center gap-4 py-3">
        <Link to="/" className="font-semibold">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/posts">Posts</Link>
        <span className="ml-auto text-sm opacity-60">{pathname}</span>
      </header>
      <hr className="my-3" />
      <Outlet />
    </div>
  )
}
