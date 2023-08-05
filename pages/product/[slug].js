import Product from "@/models/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import mongoose from "mongoose";
import { toast } from "react-toastify";
import Error from "next/error";
import Head from "next/head";

export default function Post({ addToCart, buyNow, product, variants, error }) {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);

  const [pin, setPin] = useState();
  const [service, setService] = useState();

  const [color, setColor] = useState();
  const [size, setSize] = useState();

  useEffect(() => {
    if (!error) {
      setColor(product.color);
      setSize(product.size);
    }
  }, []);

  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success("Your pincode is serviceable!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setService(false);
      toast.error("Sorry, Your pincode is not serviceable!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const refreshVariant = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]["slug"]}`;
    router.push(url);
  };

  if (error == 404) {
    return <Error className="bg-white" statusCode={404} />;
  }

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <Head>
          <title>
            {product.title} ({product.color}/{product.size})
          </title>
        </Head>

        <div className="container px-5 py-16 mx-auto pt-24 ">
          <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
            <img
              alt="ecommerce"
              className="lg:w-[40%] w-full lg:h-fit mt-auto mb-auto md:px-24 px-5 md:object-fill object-top rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                DAILY WEAR
              </h2>
              <h1 className="text-gray-900 md:text-3xl text-xl title-font font-medium mb-1">
                {product.title} ({product.color}/{product.size})
              </h1>
              <p className="leading-relaxed text-sm md:text-base">
                {product.desc}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("White") &&
                    Object.keys(variants["White"]).includes(size) && (
                      <button
                        onClick={(e) => refreshVariant(size, "White")}
                        className={`border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none ${
                          color === "White" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("Black") &&
                    Object.keys(variants["Black"]).includes(size) && (
                      <button
                        onClick={(e) => refreshVariant(size, "Black")}
                        className={`border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${
                          color === "Black" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("Red") &&
                    Object.keys(variants["Red"]).includes(size) && (
                      <button
                        onClick={(e) => refreshVariant(size, "Red")}
                        className={`border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "Red" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("Green") &&
                    Object.keys(variants["Green"]).includes(size) && (
                      <button
                        onClick={(e) => refreshVariant(size, "Green")}
                        className={`border-2 border-gray-300 ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-none ${
                          color === "Green" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("Blue") &&
                    Object.keys(variants["Blue"]).includes(size) && (
                      <button
                        onClick={(e) => refreshVariant(size, "Blue")}
                        className={`border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "Blue" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("Yellow") &&
                    Object.keys(variants["Yellow"]).includes(size) && (
                      <button
                        onClick={(e) => refreshVariant(size, "Yellow")}
                        className={`border-2 border-gray-300 ml-1 bg-yellow-300 rounded-full w-6 h-6 focus:outline-none ${
                          color === "Yellow"
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => refreshVariant(e.target.value, color)}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                    >
                      {color && Object.keys(variants[color]).includes("S") && (
                        <option>S</option>
                      )}
                      {color && Object.keys(variants[color]).includes("M") && (
                        <option>M</option>
                      )}
                      {color && Object.keys(variants[color]).includes("L") && (
                        <option>L</option>
                      )}
                      {color && Object.keys(variants[color]).includes("XL") && (
                        <option>XL</option>
                      )}
                      {color &&
                        Object.keys(variants[color]).includes("STANDARD") && (
                          <option>STANDARD</option>
                        )}
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
              <div className="flex">
                {product.availableQty <= 0 ? (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Out of Stock!
                  </span>
                ) : (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹{product.price}
                  </span>
                )}
                <button
                  disabled={product.availableQty <= 0}
                  onClick={() =>
                    buyNow(slug, 1, product.price, product.title, size, color)
                  }
                  className="disabled:bg-pink-300 flex ml-4 md:ml-8 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  disabled={product.availableQty <= 0}
                  onClick={() =>
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      size,
                      color
                    )
                  }
                  className="disabled:bg-pink-300 flex ml-2 md:ml-4 text-white bg-pink-500 border-0 py-2 px-2  md:px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Add to Cart
                </button>
              </div>
              <div className="pin mt-6 flex space-x-2 text-sm">
                <input
                  className="px-2 border-2 border-gray-400 rounded-md"
                  type="text"
                  placeholder="Enter your Pincode"
                  onChange={onChangePin}
                />
                <button
                  onClick={checkServiceability}
                  className="flex ml-14 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Check
                </button>
              </div>
              {!service && service != null && (
                <div className="text-red-700 text-sm mt-3">
                  Sorry! We do not deliver to this pincode yet
                </div>
              )}
              {service && service != null && (
                <div className="text-green-700 text-sm mt-3">
                  Yay! This pincode is serviceable
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.findOne({ slug: context.query.slug });
  if (product == null) {
    return {
      props: {
        error: 404,
      },
    };
  }
  let variants = await Product.find({
    title: product.title,
    category: product.category,
  });
  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }
  return {
    props: {
      error: error,
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}
