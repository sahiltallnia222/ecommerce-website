import axios from "axios";
import Link from "next/link";
const product = ({ category }) => {
  if(!category){
    return <div className="text-center text-2xl font-semibold mt-10">Out of Stock</div>
  }
  return (
    <div className=" m-auto">
      <section className="text-gray-600 body-font mt-12">
        <div className="flex flex-wrap w-[100%] justify-items-center">
          {Object.keys(category).map((product) => {
            return (
              <div
                key={category[product]._id}
                className="md:w-1/2 lg:w-1/3 w-[100%] justify-self-start h-[31rem]"
              >
                  <Link href={`/product/${category[product].slug}`}>
                    <a className="flex flex-col items-center group">
                      <div className="w-[19rem] h-[22.5rem]">
                        <img
                          alt="ecommerce"
                          className=""
                          src={category[product].img}
                        />
                      </div>
                      <div className="w-[20rem] h-[8rem] border-2 group-hover:-translate-y-2 transition-transform duration-300">
                        <h3 className="mx-2 text-md text-black uppercase font-semibold">
                          {category[product].category}
                        </h3>
                        <div className="flex flex-row justify-between items-center mx-2">
                          <h2 className="text-xl text-black font-bold">
                            {category[product].title}
                          </h2>
                          <p className="text-lg text-black uppercase font-semibold">
                            ₹ {category[product].price}
                          </p>
                        </div>
                        <div className="flex flex-row gap-x-2 mx-2 mt-1">
                                {category[product].size.includes('S') && <p className="border px-1">S</p>}
                                {category[product].size.includes('MD') && <p className="border px-1">MD</p>}
                                {category[product].size.includes('L') && <p className="border px-1">L</p>}
                                {category[product].size.includes('XL') && <p className="border px-1">XL</p>}
                                {category[product].size.includes('XXL') && <p className="border px-1">XXL</p>}
                        </div>
                        <div className="flex flex-row gap-x-2 mx-2 mt-1">
                        {category[product].color.map((item,index) => {
                            return (
                             <div key={index}>
                               <button style={{backgroundColor:`${item.toLowerCase()}`}} className={`border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none`}></button>
                             </div>
                            );
                          })}
                        </div>
                      </div>
                    </a>
                  </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  const { params } = context;
  const res = await axios.get(
    `http://localhost:3000/api/findproduct/${params.productcat}`
  );
  if( Object.keys(res.data).length === 0){
    return {
      props: {
        category: null,
      },
    };
  }
  return {
    props: {
      category: res.data,
    },
  };
}
export default product;
