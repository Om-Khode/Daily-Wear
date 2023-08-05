import Link from "next/link";
import React from "react";
import Product from "@/models/Product";
import mongoose from "mongoose";
import Head from "next/head";

export default function Tshirts({ products }) {
  return (
    <div>
      <Head>
        <title>Daily Wear - Tshirts</title>
      </Head>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap mt-0 w-[80vw] mx-auto">
            {Object.keys(products).length === 0 && (
              <h1 className="text-2xl text-center mx-auto">
                Sorry all the T-Shirts are currently out of stock. New stock
                coming soon. Stay tuned!
              </h1>
            )}
            {Object.keys(products).map((item) => {
              return (
                <div
                  key={products[item]._id}
                  className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg"
                >
                  <a className="block relative rounded overflow-hidden  ">
                    <img
                      alt="ecommerce"
                      className="m-auto h-[36vh] block"
                      src={products[item].img}
                    />
                  </a>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      T-Shirts
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="mt-1">
                      {products[item].size.includes("S") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          S
                        </span>
                      )}
                      {products[item].size.includes("M") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          M
                        </span>
                      )}
                      {products[item].size.includes("L") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          L
                        </span>
                      )}
                      {products[item].size.includes("XL") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          XL
                        </span>
                      )}
                      {products[item].size.includes("XXL") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          XXL
                        </span>
                      )}
                    </div>
                    <div className="mt-1">
                      {products[item].color.includes("White") && (
                        <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("Black") && (
                        <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("Red") && (
                        <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("Green") && (
                        <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("Blue") && (
                        <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("Yellow") && (
                        <button className="border-2 border-gray-300 ml-1 bg-yellow-300 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                    </div>
                    <Link href={`product/${products[item].slug}`}>
                      <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 mt-4 px-4 rounded">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps = async () => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "tshirt" });
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      } else {
        tshirts[item.title].color = [];
        tshirts[item.title].size = [];
      }
    }
  }
  return { props: { products: JSON.parse(JSON.stringify(tshirts)) } };
};
