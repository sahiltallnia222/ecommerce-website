import {
  AiOutlineShoppingCart,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { IoBagCheck } from "react-icons/io5";
const myac = ({ cart, addToCart, removeFromCart, subTotal }) => {
  return (
    <div>
      <h2 className=" text-center font-bold text-4xl mb-1  m-8">Update Your Account</h2>
      <div>
        <h1 className="font-bold text-2xl  md:ml-16">1. Delivery Details</h1>
        <div className="grid grid-cols-2 gap-1 md:gap-4 mt-8 m-4 md:mx-16  mb-2">
          <div className="flex flex-col ">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="border-gray-200 border-2 p-1"
              placeholder="User Name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="userEmail">Email</label>
            <input
              type="text"
              id="userEmail"
              name="userEmail"
              className="border-gray-200 border-2 p-1"
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              id="address"
              rows={5}
              className=" border-gray-200 border-2 p-1"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="border-gray-200 border-2 p-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pinCode">Pin Code</label>
            <input
              type="tel"
              name="pinCode"
              id="pinCode"
              className="border-gray-200 border-2 p-1"
            />
          </div>
        </div>
      </div>
      <div>
      <div className="m-4 md:mx-16">
        <button className="cursor-pointer bg-[#db2777] flex items-center p-2 px-4 text-white rounded-md">
          <span>Submit</span>
        </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 md:gap-4 mt-8 m-4 md:mx-16  mb-2">
      <div className="flex flex-col ">
            <label htmlFor="cp">Current Password</label>
            <input
              type="password"
              id="cp"
              name="cp"
              className="border-gray-200 border-2 p-1"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="np">New Password</label>
            <input
              type="password"
              id="np"
              name="p"
              className="border-gray-200 border-2 p-1"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="cnp">Confirm New Password</label>
            <input
              type="password"
              id="cnp"
              name="cnp"
              className="border-gray-200 border-2 p-1"
            />
          </div>
        <div>
        <button className="cursor-pointer bg-[#db2777] flex items-center p-2 px-4 text-white rounded-md">
          <span>Submit</span>
        </button>
        </div>
      </div>
    </div>
  );
};

export default myac;
