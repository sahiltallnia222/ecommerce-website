import axios from "axios";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "../../models/Product";
import { toast } from "react-toastify";
const slug = ({ addToCart, product, slugMaker, buyNow }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [serviceability, setServiceability] = useState();
  const _title = product.title.split(" ").join("-").toLowerCase();
  const ref = useRef();
  const checkServiceAbility = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/pincode");
      const pins = await res.data;
      if (pin == undefined || pin == "") {
        setServiceability(null);
        return;
      }
      if (pins.includes(parseInt(pin))) {
        setServiceability(true);
      } else {
        setServiceability(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (!product) {
    return <div>Page not Found</div>;
  }
  const handleSelectClick = (e) => {
    router.push(
      `/product/${_title}-${slug.split("-").at(-2)}-${e.toLowerCase()}`
    );
  };
  const handleClrClick = (lnk) => {
    if (ref) {
      ref.current.value = `${slug.split("-").at(-1)}`;
    }
    router.push(`/product/${lnk.toLowerCase()}`);
  };
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="uppercase text-sm title-font text-gray-500 tracking-widest">
                {product.category}
              </h2>
              <h1 className="capitalize text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>

              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  {Object.keys(slugMaker).map((clr, index) => {
                    let lnk = `${_title}-${clr}-${
                      Object.keys(slugMaker[clr])[0]
                    }`;
                    return (
                      <div key={index}>
                        <button
                          onClick={() => {
                            handleClrClick(lnk);
                          }}
                          style={{ backgroundColor: `${clr}` }}
                          className="border-2 mx-1 border-gray-300 rounded-full w-6 h-6 focus:outline-none"
                        ></button>
                      </div>
                    );
                  })}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      ref={ref}
                      onChange={(e) => {
                        handleSelectClick(e.target.value);
                      }}
                      className="rounded  border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(slugMaker[slug.split("-").at(-2)]).includes(
                        "SM"
                      ) && <option value="sm">SM</option>}
                      {Object.keys(slugMaker[slug.split("-").at(-2)]).includes(
                        "MD"
                      ) && <option>MD</option>}
                      {Object.keys(slugMaker[slug.split("-").at(-2)]).includes(
                        "L"
                      ) && <option>L</option>}
                      {Object.keys(slugMaker[slug.split("-").at(-2)]).includes(
                        "XL"
                      ) && <option value="xl">XL</option>}
                      {Object.keys(slugMaker[slug.split("-").at(-2)]).includes(
                        "XXL"
                      ) && <option>XXL</option>}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-x-8">
                <p className="text-xl font-bold">₹ {product.price}</p>
                <button
                  onClick={() => {
                    buyNow(
                      slug,
                      slug.split("-").at(-1).toUpperCase(),
                      product.price,
                      product.title,
                      slug.split("-").at(-2).toUpperCase()
                    );
                  }}
                  className="bg-[#db2777] py-2 px-3 text-white rounded"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    toast.success("Product Added to Cart", {
                      position: "bottom-center",
                      autoClose: 2500,
                    });
                    addToCart(
                      slug,
                      slug.split("-").at(-1).toUpperCase(),
                      product.price,
                      product.title,
                      slug.split("-").at(-2).toUpperCase()
                    );
                  }}
                  className="bg-[#db2777] py-2 px-3 text-white rounded"
                >
                  Add to Cart
                </button>
              </div>
              <div>
                <p className="mt-2">
                  Note: Our tshirts are custom tailored to be tight fit. If you
                  prefer loose fitting, please order a size larger
                </p>
                <div className="flex flex-row gap-x-4 items-center mt-6">
                  <input
                    type="text"
                    className="px-2 py-1 border-2 border-gray-500 rounded-sm"
                    onChange={(e) => {
                      setPin(e.target.value);
                    }}
                    placeholder="Enter Your Pincode"
                  />
                  <button
                    onClick={checkServiceAbility}
                    className="bg-[#db2777] py-2 px-4 text-white rounded"
                  >
                    Check
                  </button>
                </div>
                <div>
                  {serviceability && serviceability != null && (
                    <div className=" mt-4 font-semibold text-xl">
                      Service available
                    </div>
                  )}
                  <div className=" mt-4 font-semibold text-xl">
                    {!serviceability && serviceability != null
                      ? "Service not available in this area"
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  let p = await Product.findOne({ slug: context.params.slug.trim() });
  if (!p) {
    return {
      props: {
        product: null,
        slugMaker: null,
      },
    };
  }
  let v = await Product.find({ title: p.title });
  let SlugMaker = {};
  for (let item of v) {
    if (Object.keys(SlugMaker).includes(item.color[0])) {
      SlugMaker[item.color[0]][item.size[0]] = { slug: item.slug };
    } else {
      SlugMaker[item.color[0]] = {};
      SlugMaker[item.color[0]][item.size[0]] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(p)),
      slugMaker: SlugMaker,
    },
  };
}

export default slug;
