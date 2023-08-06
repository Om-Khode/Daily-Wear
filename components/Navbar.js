import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

export default function Navbar({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) {
  const ref = useRef();
  const toggleCart = () => {
    setSidebar(!sidebar);
  };

  const [sidebar, setSidebar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);
    let exempted = [
      "/checkout",
      "/order",
      "/orders",
      "/",
      "/myaccount",
      "/login",
      "/forgot",
      "/signup",
      "/about",
      "/contact",
      "/hoodies",
      "/tshirts",
      "/mugs",
      "/stickers",
    ];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, []);

  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <span
        onMouseOver={() => {
          setDropdown(true);
        }}
        onMouseLeave={() => {
          setDropdown(false);
        }}
      >
        {dropdown && (
          <div className="fixed right-14 bg-white shadow-lg border top-11 rounded-md px-5 py-2 w-32 z-30">
            <ul>
              <Link href={"/myaccount"}>
                <li className="py-2 hover:text-pink-700 text-sm font-bold">
                  My Account
                </li>
              </Link>
              <Link href={"/orders"}>
                <li className="py-2 hover:text-pink-700 text-sm font-bold">
                  My Orders
                </li>
              </Link>
              <li
                onClick={logout}
                className="py-2 hover:text-pink-700 text-sm font-bold"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </span>

      <div
        className={`flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10 ${
          !sidebar && "overflow-hidden"
        }`}
      >
        <div className="logo mr-auto md:mx-5">
          <Link href={"/"}>
            <img
              className="md:h-[2rem] h-[2rem] m-3 "
              src="/assets/images/common/DailyWearLogo.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="nav">
          <ul className="flex items-center space-x-6 font-semibold md:text-md">
            <Link href={"/tshirts"}>
              <li
                className={`hover:text-pink-700 ${
                  router.pathname === "/tshirts" && "text-pink-500"
                }`}
              >
                T-shirts
              </li>
            </Link>
            <Link href={"/hoodies"}>
              <li
                className={`hover:text-pink-700 ${
                  router.pathname === "/hoodies" && "text-pink-500"
                }`}
              >
                Hoodies
              </li>
            </Link>
            <Link href={"/stickers"}>
              <li
                className={`hover:text-pink-700 ${
                  router.pathname === "/stickers" && "text-pink-500"
                }`}
              >
                Stickers
              </li>
            </Link>
            <Link href={"/mugs"}>
              <li
                className={`hover:text-pink-700 ${
                  router.pathname === "/mugs" && "text-pink-500"
                }`}
              >
                Mugs
              </li>
            </Link>
          </ul>
        </div>
        <div className="cart cursor-pointer absolute right-0 mx-5 top-4 flex mt-1">
          {!user.value && (
            <Link href={"/login"}>
              <button className="bg-pink-600 px-3 md:py-2 py-1 rounded-md text-sm text-white md:mx-4 mx-2">
                Login
              </button>
            </Link>
          )}

          <span
            onMouseOver={() => {
              setDropdown(true);
            }}
            onMouseLeave={() => {
              setDropdown(false);
            }}
          >
            {user.value && (
              <MdAccountCircle
                onMouseOver={() => {
                  setDropdown(true);
                }}
                className="text-3xl md:text-3xl mx-2"
              />
            )}
          </span>

          <button onClick={toggleCart}>
            <AiOutlineShoppingCart className="text-3xl md:text-3xl" />
          </button>
        </div>

        <div
          ref={ref}
          className={`w-72 h-[100vh] sidebar overflow-y-scroll absolute top-0  bg-pink-100 px-8 py-10 transition-all ${
            sidebar ? "right-0" : "-right-96"
          } 
        } `}
        >
          <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
          <span
            onClick={toggleCart}
            className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
          >
            <AiFillCloseCircle />
          </span>
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length == 0 && (
              <div className="my-4 font-semibold">Your cart is Empty!</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-3 font-semibold">
                    <div className="w-2/3 font-semibold">
                      {cart[k].name} ({cart[k].variant}/{cart[k].size})
                    </div>
                    <div className="w-1/3 font-semibold flex items-center justify-center text-lg">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-pink-500"
                      />
                      <span className="mx-2 text-sm">{cart[k].qty}</span>
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-pink-500"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="font-bold my-2">Subtotal: ₹{subTotal}</div>

          <div className="flex">
            <Link href={"/checkout"}>
              <button
                disabled={Object.keys(cart).length === 0}
                className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
              >
                <BsFillBagCheckFill className="m-1" />
                Checkout
              </button>
            </Link>
            <button
              onClick={clearCart}
              disabled={Object.keys(cart).length === 0}
              className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
