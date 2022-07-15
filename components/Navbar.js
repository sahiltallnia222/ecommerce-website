import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState ,useEffect} from "react";
import { IoBagCheck } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import {
  AiOutlineShoppingCart,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/Bi";
import { FaTimesCircle } from "react-icons/fa";
import { useRef } from "react";
import axios from "axios";
const Navbar = ({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  user,
  logout,
}) => {
  const ref = useRef();
  const [dropdown, setDropdown] = useState(false);
  const [disable,setDisable]=useState(false);
  const router = useRouter();
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.add("translate-x-full");
      ref.current.classList.remove("translate-x-0");
    }
  };
  const handleAddToCart = async (item, s, p, n, v) => {
    await axios
      .post("http://localhost:3000/api/getpbyslug", { slug: item })
      .then((res) => {
        let q=res.data.q
        if(q==cart[item].qty){
          toast.error("Sorry! We don't have any more units for this item.", {
            position: "bottom-center",
            autoClose: 2500,
          });
      }
      else  if(Object.keys(cart).length==0 && q>0){
          addToCart(
            item,
            s,
            p,
            n,
            v
          );
        }
        else if(Object.keys(cart).length>0 && cart[item]){
          if(q>cart[item].qty){
            addToCart(
              item,
              s,
              p,
              n,
              v
            );
          }
          if(q==cart[item].qty){
            setDisable(true)
          }
        }
        else if(Object.keys(cart).length>0 &&  !cart[item] && q>0){
          addToCart(
            item,
            s,
            p,
            n,
            v
          );
        }
        else{
          setDisable(true)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col shadow-md h-24 md:h-16  md:items-center md:flex-row  gap-x-8 w-[100%]">
      <div className="ml-4">
        <Link href="/">
          <a>
            <Image src="/images/weblogo.png" width={140} height={50} />
          </a>
        </Link>
      </div>
      <nav>
        <ul className="flex  justify-center md:justify-start flex-row gap-x-4 font-bold">
          <Link href={"/tshirts"}>
            <a>
              <li className="hover:text-blue-500">Tshirts</li>
            </a>
          </Link>
          <Link href={"/hoodies"}>
            <a>
              <li className="hover:text-blue-500">Hoodies</li>
            </a>
          </Link>
          <Link href={"/stickers"}>
            <a>
              <li className="hover:text-blue-500">Stickers</li>
            </a>
          </Link>
          <Link href={"/mugs"}>
            <a>
              <li className="hover:text-blue-500">Mugs</li>
            </a>
          </Link>
        </ul>
      </nav>
      {dropdown && (
        <div className="after:absolute after:top-[-1rem] after:right-[1.3rem] after:content-[''] after:w-0 after:h-0 after:border-8 after:border-r-transparent after:border-b-blue-200  after:border-l-transparent after:border-t-transparent  absolute right-12 bg-blue-200 top-12 rounded-md w-36">
          <ul>
            <li
              onClick={() => {
                router.push("/myac");
              }}
              className="py-1 text-black hover:text-white p-3 cursor-pointer w-[100%] hover:bg-blue-500 text-md  font-semibold"
            >
              My Account
            </li>
            <li
              onClick={() => {
                router.push("/orders");
              }}
              className="py-1 text-black hover:text-white p-3 cursor-pointer w-[100%] hover:bg-blue-500 text-md font-semibold"
            >
              Orders
            </li>
            <li
              onClick={() => {
                setDropdown(false), logout();
              }}
              className="py-1 text-black hover:text-white p-3 cursor-pointer w-[100%] hover:bg-blue-500 text-md font-semibold"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
      <div className="flex items-center flex-row gap-x-4 absolute top-3 right-4">
        {user.value ? (
          <BiUserCircle
            onClick={() => {
              setDropdown(!dropdown);
            }}
            className="cursor-pointer text-3xl"
          />
        ) : (
          <Link href={"/login"}>
            <a>
              <button className="bg-blue-500 font-bold text-white px-3 py-1 rounded-xl">
                Login
              </button>
            </a>
          </Link>
        )}
        <AiOutlineShoppingCart
          className="cursor-pointer text-3xl"
          onClick={toggleCart}
        />
      </div>
      <div
        ref={ref}
        className="sidecart pb-5 transition-transform translate-x-full  fixed right-0 overflow-auto h-[100vh]  top-0 bg-blue-200  w-80"
      >
        <div>
          <FaTimesCircle
            onClick={toggleCart}
            className="cursor-pointer text-blue-500 absolute top-3 right-3 text-xl"
          />
          <h2 className="mt-10 text-2xl font-bold text-center">
            Shopping Cart
          </h2>

          <div className="cartItems">
            <ol className="list-decimal pl-10 font-semibold">
              {Object.keys(cart).length === 0 && (
                <div className="my-4 font-semibold">Your Cart is empty !</div>
              )}
              {Object.keys(cart).map((item) => {
                return (
                  <li key={item}>
                    <div className="flex gap-x-3 my-6">
                      <div className="itemInfo font-semibold">
                        <div>Declare Variables</div>
                        <div>{cart[item].name}</div>
                        <div>Variant: {cart[item].variant}</div>
                        <div>Size: {cart[item].size}</div>
                        <div>₹ {cart[item].price}</div>
                      </div>
                      <div className="itemQuantity flex items-center gap-x-2">
                        <AiFillMinusCircle
                          className="text-blue-500 text-xl cursor-pointer"
                          onClick={() => {
                            removeFromCart(item);
                          }}
                        />
                        <div>{cart[item].qty}</div>
                        <AiFillPlusCircle 
                          className="text-blue-500 text-xl cursor-pointer"
                          onClick={() => {
                            handleAddToCart(item, cart[item].size, cart[item].price, cart[item].name, cart[item].variant);
                          }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="my-3 ml-6 font-bold text-xl">
            SubTotal: {subTotal}
          </div>
          <div className="flex flex-row gap-x-6 ml-6 mt-5">
            <Link href={"/checkout"}>
              <a>
                <button className="cursor-pointer bg-blue-500 flex items-center p-2 text-white rounded-md">
                  <span>
                    <IoBagCheck />
                  </span>
                  <span>Checkout</span>
                </button>
              </a>
            </Link>
            <button
              onClick={clearCart}
              className=" cursor-pointer bg-blue-500 p-2 rounded-md text-white"
            >
              ClearCart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={2500} />
    </div>
  );
};

export default Navbar;
