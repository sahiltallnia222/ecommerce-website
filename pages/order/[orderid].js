import axios from "axios";
import {useRouter} from 'next/router'
const order = ({ order }) => {
  let router =useRouter()
  return (
    <div>
      <div className="md:w-[70%] md:m-auto">
      <div className="border-2 p-4 flex justify-between mb-4 mt-6" ><span className="font-semibold text-lg">ORDER DETAILS </span> <span className="font-semibold text-lg"> Order ID - {order._id}</span></div>
      <div className="border-2 mb-4 p-4" ><span className="font-semibold text-lg">Delivery Address:</span> <span className="text-md">{order.address}</span></div>
      <div className="border-2 mb-4 p-4" ><span className="font-semibold text-lg">Status: </span> <span className="text-md text-green-600 font-semibold">{order.status}</span></div>
      </div>
      <div className=" p-3 flex w-[100%] md:w-[70%] border-b-2 m-auto">
        <div className="flex-[3]  text-lg font-bold">
          Product Name
        </div>
        <div className="flex-[1] text-center text-lg font-bold  ">
          Quantity
        </div>
        <div className="flex-[1]  text-center text-lg font-bold  ">Price (₹)</div>
      </div>
      {/* -----------------------------Orders------------------------------------ */}
      {order.products.map((item, index) => {
        return (
          <div key={index} className=" flex p-3 w-[100%] md:w-[70%] m-auto">
            <div onClick={()=>{router.push(`${process.env.NEXT_PUBLIC_HOST}/product/${item.productSlug}`)}} className="flex-[3]  text-lg hover:text-blue-600 cursor-pointer">
              {item.productSlug}
            </div>
            <div className="flex-[1] text-center text-lg  ">
              {item.quantity}
            </div>
            <div className="flex-[1] text-center text-lg  ">
              {item.price}
            </div>
          </div>
        );
      })}
      <div className="flex justify-between border-2 p-4 mt-4  w-[100%] md:w-[70%] m-auto">
        <div><p className="text-lg font-bold px-4">Total Amount: </p></div>
        <div><p className="text-lg font-bold px-4 md:mr-16">₹ {order.amount}</p></div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const res = await axios.get(
    `http://localhost:3000/api/order/${params.orderid}`
  );
  let order = res.data.order;
  return {
    props: {
      order: order,
    },
  };
}
export default order;
