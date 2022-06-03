import {
  AiOutlineShoppingCart,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { IoBagCheck } from "react-icons/io5";
const checkout = ({cart,addToCart,removeFromCart,subTotal}) => {
  return (
    <div>
      <h2 className=" text-center font-bold text-4xl  m-8">Checkout</h2>
      <div>
        <h1 className="font-bold text-2xl  md:ml-16">1. Delivery Details</h1>
          <div className="grid grid-cols-2 gap-1 md:gap-4 mt-8 m-4 md:m-16">
          <div className="flex flex-col ">
            <label htmlFor="username">Name</label>
            <input type="text" id="username" name="username" className="border-gray-200 border-2 p-1" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="userEmail">Email</label>
            <input type="text" id="userEmail" name="userEmail" className="border-gray-200 border-2 p-1" />
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="address">Address</label>
            <textarea name="address" id="address" rows={5} className=" border-gray-200 border-2 p-1"></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" name="phone" id="phone" className="border-gray-200 border-2 p-1" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pincode">Pin Code</label>
            <input type="tel" name="pincode" id="pincode" className="border-gray-200 border-2 p-1" />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="user_State">State</label>
            <input type="text" id="user_State" name="user_State" className="border-gray-200 border-2 p-1" />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="user_dist">District</label>
            <input type="text" id="user_dist" name="user_dist" className="border-gray-200 border-2 p-1" />
          </div>
          </div>
          <div>
            <h2 className="font-bold text-2xl   m-4 md:m-16">2. Review Cart Items and Pay</h2>
            <div className="bg-pink-200 p-8 m-6">
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
                          className="text-[#db2777] text-xl cursor-pointer"
                          onClick={() => {
                            removeFromCart(item);
                          }}
                        />
                        <div>{cart[item].qty}</div>
                        <AiFillPlusCircle
                          className="text-[#db2777] text-xl cursor-pointer"
                          onClick={() => {
                            addToCart(
                              item,
                              cart[item].size,
                              cart[item].price,
                              cart[item].name,
                              cart[item].variant
                            );
                          }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            </div>
          </div>
          <div className="flex gap-3  items-center  m-4 md:m-16">
            <input type="checkbox" id="paymethod" name="paymethod" />
            <label htmlFor="paymethod">I want to place a Cash on Delivery Order. I promise to pay the delivery partner on delivery</label>
          </div>

      </div>
      <div className=" m-4 md:m-16mt-6">
      <button className="cursor-pointer bg-[#db2777] flex items-center p-2 px-4 text-white rounded-md">
              <span>
                <IoBagCheck />
              </span>
              <span>Pay ₹{subTotal}</span>
            </button>
      </div>
    </div>
  )
}

export default checkout