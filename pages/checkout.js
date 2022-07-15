import {
  AiOutlineShoppingCart,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { toast, ToastContainer } from 'react-toastify';
import { useState,useEffect } from "react";
import { IoBagCheck } from "react-icons/io5";
import { useRouter } from "next/router";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [disable,setDisable]=useState(false);
  const router=useRouter();
  const handleChange = (e) => {
    if (e.target.name == "username") {
      setName(e.target.value);
    } else if (e.target.name == "userEmail") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if ((e.target.name == "address")) {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    }
  };
  useEffect(()=>{
    handleDisablility();
  },[name,email,pincode,address,phone])
  const handleDisablility=()=>{
    if(name && email && phone.length==10 && address && pincode.length==6){
      setDisabled(false)
    }
    else{
      setDisabled(true)
    }
  }
  const handleClick=()=>{
    if(disabled){
      return;
    }
    else{
      let qtys=[];
      let slugs=[];
      const prices=[];
      for(let i=0;i<Object.keys(cart).length;i++){
        qtys[i]=cart[Object.keys(cart)[i]].qty;
        prices[i]=cart[Object.keys(cart)[i]].price;
        slugs[i]=Object.keys(cart)[i]
      }
      axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/placeorder`,{
        userId:email,productSlugs:slugs,address:address,amount:parseInt(subTotal),pincode:parseInt(pincode),phone:parseInt(phone),quantities:qtys,prices:prices
      }).then(res=>{
        toast.success('Order Placed',{
          position: "bottom-center",
          autoClose: 2500,
        })
        router.push('/orders')
      }).catch(err=>{
        toast.error('Invalid Credentials',{
          position: "bottom-center",
          autoClose: 2500,
        })})
    }
  }
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
      else if(Object.keys(cart).length==0 && q>0){
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
    <div>
      <h2 className=" text-center font-bold text-4xl  m-8">Checkout</h2>
      <div>
        <h1 className="font-bold text-2xl  md:ml-16">1. Delivery Details</h1>
        <div className="grid grid-cols-2 gap-1 md:gap-4 mt-8 m-4 md:m-16">
          <div className="flex flex-col ">
            <label htmlFor="username">Name</label>
            <input
              onChange={(e)=>{handleChange(e)}}
              type="text"
              id="username"
              name="username"
              className="border-gray-200 border-2 p-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="userEmail">Email</label>
            <input
              onChange={(e)=>{handleChange(e)}}
              type="text"
              id="userEmail"
              name="userEmail"
              className="border-gray-200 border-2 p-1"
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="address">Address</label>
            <textarea
              onChange={(e)=>{handleChange(e)}}
              name="address"
              id="address"
              rows={5}
              className=" border-gray-200 border-2 p-1"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone Number</label>
            <input
              onChange={(e)=>{handleChange(e)}}
              type="tel"
              name="phone"
              id="phone"
              className="border-gray-200 border-2 p-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pincode">Pin Code</label>
            <input
              onChange={(e)=>{handleChange(e)}}
              type="tel"
              name="pincode"
              id="pincode"
              className="border-gray-200 border-2 p-1"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="user_State">State</label>
            <input
              readOnly
              type="text"
              id="user_State"
              name="user_State"
              className="border-gray-200 border-2 p-1"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="user_dist">District</label>
            <input
              readOnly
              type="text"
              id="user_dist"
              name="user_dist"
              className="border-gray-200 border-2 p-1"
            />
          </div>
        </div>
        <div>
          <h2 className="font-bold text-2xl   m-4 md:m-16">
            2. Review Cart Items and Pay
          </h2>
          <div className="bg-blue-200 p-8 m-6">
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
        </div>
        <div className="flex gap-3  items-center  m-4 md:m-16">
          <input
            type="checkbox"
            defaultChecked
            id="paymethod"
            name="paymethod"
          />
          <label htmlFor="paymethod">
            I want to place a Cash on Delivery Order.{" "}
          </label>
        </div>
      </div>
      <div className="m-4 md:mx-16 mt-6">
        <button
          onClick={handleClick}
          disabled={disabled}
          className="disabled:bg-blue-300 disabled:cursor-not-allowed cursor-pointer bg-[#d62876] flex items-center p-2 px-4 text-white rounded-md"
        >
          <span>Place Order ₹{subTotal}</span>
        </button>
      </div>
      <div className=" m-4 md:m-16 mt-6">
        <button className=" cursor-not-allowed bg-blue-200 flex items-center p-2 px-4 text-white rounded-md">
          <span>
            <IoBagCheck />
          </span>
          <span>Pay ₹{subTotal}</span>
        </button>
      </div>
      <ToastContainer position="bottom-center" autoClose={2500} />
    </div>
  );
};

export default checkout;
