import { useState } from "react";
import logo from "../../img/Logo.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useUser } from "./user-context/context";
import { useOrderItems } from "./orderItems-context/context";

const { VITE_URL_BACK_END } = import.meta.env;
function NavBar() {
  //user Context
  const { user, logout } = useUser();
  //items
  const { items } = useOrderItems();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const locationHome = location.pathname === "/";
  //log out
  const logOut = (e) => {
    e.preventDefault();
    window.open(`${VITE_URL_BACK_END}/auth/logout`, "_self");
    logout();
  };

  return (
    <>
      <nav
        className={`flex ${
          locationHome ? "absolute bg-neutral-950/50" : "relative bg-zinc-900"
        } w-full  items-center justify-between px-8 py-4 z-10`}
      >
        <div>
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-[150px]" />
          </NavLink>
        </div>
        <menu className="hidden md:flex text-lg mt-2 gap-4">
          <ul className="flex gap-6 text-white">
            <li>
              <NavLink to="/aboutus">About Us</NavLink>
            </li>

            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>

            <li>
              <NavLink to="/contacts">Contacts</NavLink>
            </li>
            {user ? (
              <li>
                <NavLink onClick={logOut}>Log Out</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/login-signup">Log In</NavLink>
              </li>
            )}
          </ul>
          <Link to="/cart">
            <div className="relative">
              <span className="text-white px-1.5 bg-red-500 rounded-full absolute right-2 top-2">{items.length}</span>
              <FaShoppingCart size={30} className="color text-white"></FaShoppingCart>
            </div>
          </Link>
        </menu>
        <div className="flex gap-4 md:hidden">
          <AiOutlineMenu size={30} className="color text-white" onClick={() => setOpen(true)} />
          <Link to="/cart">
            <div className="relative">
              <span className="text-white px-1.5 bg-red-500 rounded-full absolute right-2 top-2">{items.length}</span>
              <FaShoppingCart size={30} className="color text-white"></FaShoppingCart>
            </div>
          </Link>
        </div>
      </nav>
      {/* mobile menu */}
      {open ? (
        <>
          <div className="absolute w-full h-screen top-0 left-0 bg-black/50  z-20"></div>
          <div className="flex flex-col absolute w-2/4 h-screen right-0 bg-white z-30 p-4 gap-4">
            <div className="flex justify-end" onClick={() => setOpen(false)}>
              <AiOutlineClose size={20} />
            </div>
            <nav className="flex justify-center">
              <ul className="flex flex-col gap-4 text-center">
                <li>
                  <NavLink to="/aboutus" onClick={() => setOpen(false)}>
                    About Us
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/shop">Shop</NavLink>
                </li>
                <li>
                  <NavLink to="/contacts" onClick={() => setOpen(false)}>
                    Contacts
                  </NavLink>
                </li>
                {user ? (
                  <li>
                    <NavLink onClick={logOut}>Log Out</NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink to="/login-signup">Log In</NavLink>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default NavBar;
