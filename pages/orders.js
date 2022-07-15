import axios from "axios"
import {useRouter} from 'next/router'
const orders = ({orders}) => {
  let router=useRouter();
  const getDate=(s)=>{
    let dt=new Date(s);
    return dt.toDateString();
  }
  return (
    <div className=" w-full md:w-[80vw] m-auto">
        <div className="text-2xl font-bold m-2">MANAGE YOUR ORDERS</div>
        {
          orders.map((item,index)=>{
            return(
              <div key={index} className="border-2 p-5 m-2">
                <div ><span className="font-semibold text-lg">Order Date:</span> <span className="text-md">{getDate(item.createdAt)}</span></div>
                <div ><span className="font-semibold text-lg">Order ID:</span> <span onClick={()=>{router.push(`${process.env.NEXT_PUBLIC_HOST}/order/${item._id}`)}} className="text-md cursor-pointer underline text-blue-700">{item._id}</span></div>
                <div ><span className="font-semibold text-lg">Total Amount:</span> <span className="text-md">Rs. {item.amount} </span></div>
                <div ><span className="font-semibold text-lg">Delivery Address:</span> <span className="text-md">{item.address}</span></div>
              </div>
            )
          })
        }
    </div>
  )
}

export async function getServerSideProps(){
  const res=await axios.get('http://localhost:3000/api/orders')
  return {
    props:{
      orders:res.data.orders
    }
  }
}
export default orders