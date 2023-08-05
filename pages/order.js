import React, { useEffect, useState } from "react";
import Order from "../models/Order";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import Head from "next/head";

export default function MyOrder({ order, clearCart }) {
  const products = order.products;

  const router = useRouter();

  const [date, setDate] = useState();

  useEffect(() => {
    const d = new Date(order.createdAt);
    setDate(d);
    if (router.query.clearCart == 1) {
      clearCart();
    }
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden min-h-screen">
      <Head>
        <title>Order</title>
      </Head>
      <div className="container px-5 md:py-24 py-12 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              CODESWEAR.COM
            </h2>
            <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">
              Order Id: #{order.orderId}
            </h1>
            <p className="leading-relaxed mb-2">
              Yayy! Your order has been successfully placed!
            </p>
            <p className="leading-relaxed mb-4">
              Order placed on:{" "}
              {date &&
                date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </p>
            {/* <p className="mb-4">
              Your Payment Status is:{" "}
              <span className="font-semibold text-slate-700">
                {order.status}
              </span>
            </p> */}
            <div className="flex mb-4">
              <a className="flex-grow text-center py-2 md:text-lg px-1">
                Item Description
              </a>
              <a className="flex-grow text-center border-gray-300 py-2 md:text-lg px-1">
                Quantity
              </a>
              <a className="flex-grow text-center border-gray-300 py-2 md:text-lg px-1">
                Item Total
              </a>
            </div>

            {Object.keys(products).map((key) => {
              return (
                <div
                  key={key}
                  className="flex border-t border-gray-200 py-2 items-center justify-center "
                >
                  <span className="text-gray-500 md:text-base text-sm text-center w-[40%] md:w-full">
                    {products[key].name} ({products[key].size}/
                    {products[key].variant})
                  </span>
                  <span className="m-auto text-gray-500 md:text-base text-sm text-center w-[20%] md:w-full">
                    {products[key].qty}
                  </span>
                  <span className="m-auto text-gray-500 md:text-base text-sm text-center w-[20%] md:w-full">
                    ₹{products[key].price} X {products[key].qty} = ₹
                    {products[key].price * products[key].qty}
                  </span>
                </div>
              );
            })}

            <div className="flex my-5">
              <span className="title-font font-semibold text-xl text-gray-900 mt-2 text-center">
                SubTotal: ₹{order.amount}
              </span>
              <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                Track Order
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="order.jpg"
          />
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.findById(context.query.id);

  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  };
}
