import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Users from "./pages/users";
import Posts from "./pages/posts";
import UserPosts from "./pages/userPosts";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Users</Link> | <Link to="/posts">Posts</Link> | <Link to="/user-posts">User's Posts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/user-posts" element={<UserPosts />} />
      </Routes>
    </BrowserRouter>
  );
}
