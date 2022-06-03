import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user,setUser]=useState({value:null})
  const router = useRouter();
  // const [key, setKey] = useState(0)
  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        setSubTotal(localStorage.getItem("subTotal"));
        if(localStorage.getItem('token')){
          setUser({value:'user'})
        }
      }
    } catch (err) {
      localStorage.clear();
    }
    let token=localStorage.getItem('token')
    if(token){
      setUser({value:'user'})
      // setKey(Math.random())
    }
    else{
      setUser({value:null})
    }
  }, [router.query]);
  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    let subt = 0;
    for (let i = 0; i < Object.keys(cart).length; i++) {
      subt =
        subt +
        cart[Object.keys(cart)[i]].qty * cart[Object.keys(cart)[i]].price;
    }
    setSubTotal(subt);
    localStorage.setItem("subTotal", subt);
  };
  const addToCart = (itemCode, size, price, name, variant) => {
    let myCart = cart;
    if (itemCode in cart) {
      myCart[itemCode].qty = cart[itemCode].qty + 1;
    } else {
      myCart[itemCode] = { itemCode, qty: 1, size, price, name, variant };
    }
    setCart(myCart);
    saveCart(myCart);
  };
  const buyNow = async (itemCode, size, price, name, variant) => {
    setCart({});
    saveCart({});
    let newCart={}
    newCart[itemCode]={itemCode, qty: 1, size, price, name, variant};
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };
  const clearCart = () => {
    setCart({});
    saveCart({});
  };
  const removeFromCart = (itemCode) => {
    let myCart = cart;
    if (itemCode in cart) {
      myCart[itemCode].qty = cart[itemCode].qty - 1;
    }
    if (myCart[itemCode].qty <= 0) {
      delete myCart[itemCode];
    }
    setCart(myCart);
    saveCart(myCart);
  };
  const logout=()=>{
    localStorage.removeItem('token')
    setUser({value:null})
  }
  return (
    <div className="flex flex-col">
      <div className="sticky bg-white top-0 left-0 z-10">
        <Navbar
          // key={key}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          subTotal={subTotal}
          clearCart={clearCart}
          user={user}
          logout={logout}
        />
      </div>
      <div className="min-h-[100vh]">
        <Component
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          subTotal={subTotal}
          clearCart={clearCart}
          buyNow={buyNow}
          {...pageProps}
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default MyApp;
