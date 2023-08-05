import Head from "next/head";
import { TbHanger } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { BsCurrencyRupee } from "react-icons/bs";
import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Home() {
  return (
    <>
      <Head>
        <title>Daily Wear: Style for Every Day, Every Way!</title>
        <meta
          name="description"
          content="Daily Wear: Style for Every Day, Every Way!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <div className="select-none md:block hidden">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          interval={3500}
          showArrows={false}
          showStatus={false}
          showIndicators={true}
          showThumbs={false}
          transitionTime={1000}
          stopOnHover={false}
          swipeable={false}
        >
          <div>
            <img
              className="md:h-[90vh] object-fill w-full"
              src="/assets/images/home/cd1.jpg"
              alt="image"
            />
          </div>
          <div>
            <img
              className="md:h-[90vh] object-fill md:block hidden w-full"
              src="/assets/images/home/cd2.jpg"
              alt="image"
            />
          </div>
          <div>
            <img
              className="md:h-[90vh] object-fill md:block hidden w-full"
              src="/assets/images/home/cd3.jpg"
              alt="image"
            />
          </div>
          <div>
            <img
              className="md:h-[90vh] object-fill md:block hidden w-full"
              src="/assets/images/home/cd4.jpg"
              alt="image"
            />
          </div>
        </Carousel>
      </div>
      <div className="select-none md:hidden">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          interval={3500}
          showArrows={false}
          showStatus={false}
          showIndicators={true}
          showThumbs={false}
          transitionTime={1000}
          stopOnHover={false}
          swipeable={false}
        >
          <div>
            <img
              className="h-[85vh] object-fill w-full"
              src="/assets/images/home/cm1.jpg"
              alt="image"
            />
          </div>
          <div>
            <img
              className="h-[85vh] object-fill w-full"
              src="/assets/images/home/cm2.jpg"
              alt="image"
            />
          </div>
          <div>
            <img
              className="h-[85vh] object-fill w-full"
              src="/assets/images/home/cm3.jpg"
              alt="image"
            />
          </div>
          <div>
            <img
              className="h-[85vh] object-fill w-full"
              src="/assets/images/home/cm4.jpg"
              alt="image"
            />
          </div>
        </Carousel>
      </div>

      <section className="text-gray-600 body-font md:mt-10">
        <div className="container px-5 md:py-24 mx-auto py-12">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-semibold title-font mb-2 text-pink-500">
              Daily Wear: Style for Every Day, Every Way!
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Uncompromising Comfort, Unbeatable Style!
            </p>
          </div>
          <div className="flex flex-wrap -m-4 items-center justify-center">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg flex flex-col items-center justify-center">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4 text-2xl">
                  <TbHanger />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Premium Tshirts
                </h2>
                <p className="leading-relaxed text-base">
                  Our T-Shirts are 100% made of cotton.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg flex flex-col items-center justify-center">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4 text-2xl">
                  <FaShippingFast />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Free Shipping
                </h2>
                <p className="leading-relaxed text-base">
                  We ship all over India for FREE.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg flex flex-col items-center justify-center">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4 text-2xl">
                  <BsCurrencyRupee />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Exciting Offers
                </h2>
                <p className="leading-relaxed text-base">
                  We provide amazing offers & discounts on our products.
                </p>
              </div>
            </div>
          </div>
          <Link href={"/tshirts"}>
            <button className="flex mx-auto md:mt-16 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg mt-8">
              Shop Now
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
