import { Home, BookOpen, User, Edit, Users } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar({ isOpen }) {
  const isLoggedIn = localStorage.getItem("token");
  if(!isLoggedIn) return false;
  return (
    <aside
      className={`fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 bg-gray-100 shadow-md z-20 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ul className="p-4 space-y-4">
        <li>
          <Link
            to="/"
            className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
          >
            <Home /> Home
          </Link>
        </li>
        <li>
          <Link
            to="/myblogs"
            className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
          >
            <BookOpen /> myblogs
          </Link>
        </li>
        {/* <li>
          <Link
            to="/stories"
            className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
          >
            <Edit /> Stories
          </Link>
        </li> */}
        {/* <li>
          <Link
            to="/following"
            className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
          >
            <Users /> Following
          </Link>
        </li> */}
        <li>
          <Link
            to="/editprofile"
            className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
          >
            <User /> Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
