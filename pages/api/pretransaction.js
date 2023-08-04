import Product from "@/models/Product";
import Order from "../../models/Order";
import connetDb from "@/middleware/mongoose";
import pincodes from "@/data/pincodes";

const handler = async (req, res) => {
  try {
    if (!Object.keys(pincodes).includes(req.body.pincode)) {
      res.status(200).json({
        success: false,
        error: "The pincode you have entered is not serviceable!",
      });
      return;
    }

    if (req.method === "POST") {
      let product,
        sumTotal = 0;
      let cart = req.body.cart;
      if (req.body.subTotal <= 0) {
        res.status(200).json({
          success: false,
          error: "Cart Empty! Please build your cart and try again!",
          cartClear: false,
        });
        return;
      }
      for (let item in cart) {
        sumTotal += cart[item].price * cart[item].qty;
        product = await Product.findOne({ slug: item });
        if (product.availableQty < cart[item].qty) {
          res.status(200).json({
            success: false,
            error:
              "Some items in your cart went out of stock. Please try again!",
            cartClear: true,
          });
          return;
        }
        if (product.price != cart[item].price) {
          res.status(200).json({
            success: false,
            error: "The price of some items in your cart have been changed",
            cartClear: true,
          });
          return;
        }
      }

      if (sumTotal != req.body.subTotal) {
        res.status(200).json({
          success: false,
          error: "The price of some items in your cart have been changed",
          cartClear: true,
        });
        return;
      }

      if (
        req.body.phone.length != 10 ||
        !Number.isInteger(Number(req.body.phone))
      ) {
        res.status(200).json({
          success: false,
          error: "Please enter your 10 digit phone number",
          cartClear: false,
        });
        return;
      }

      if (
        req.body.pincode.length != 6 ||
        !Number.isInteger(Number(req.body.pincode))
      ) {
        res.status(200).json({
          success: false,
          error: "Please enter your 6 digit Pincode",
          cartClear: false,
        });
        return;
      }

      let order = new Order({
        name: req.body.name,
        email: req.body.email,
        orderId: req.body.oid,
        address: req.body.address,
        phone: req.body.phone,
        city: req.body.city,
        pincode: req.body.pincode,
        amount: req.body.subTotal,
        products: req.body.cart,
        status: "Paid",
      });
      await order.save();

      let products = order.products;
      for (let slug in products) {
        await Product.findOneAndUpdate(
          { slug: slug },
          { $inc: { availableQty: -products[slug].qty } }
        );
      }

      // res.redirect("/orders", 200);

      res.status(200).json({ success: true, id: order._id, cartClear: false });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      message: "Internal server error!",
    });
  }
};

export default connetDb(handler);
