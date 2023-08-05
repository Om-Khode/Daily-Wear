import Product from "@/models/Product";
import connetDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      for (let i = 0; i < req.body.length; i++) {
        let slug =
          req.body.title.replace(/\s/g, "-") +
          "-(" +
          req.body[i].size +
          "/" +
          req.body[i].color +
          ")";
        let p = new Product({
          title: req.body[i].title,
          slug: slug,
          desc: req.body[i].desc,
          img: req.body[i].img,
          category: req.body[i].category,
          size: req.body[i].size,
          color: req.body[i].color,
          price: req.body[i].price,
          availableQty: req.body[i].availableQty,
        });
        await p.save();
      }
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
        message: "Internal server error!",
      });
    }
  } else {
    res.status(400).json({ error: "This is not allowed" });
  }
};

export default connetDb(handler);
