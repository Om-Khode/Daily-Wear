import pincodes from "@/data/pincodes";

export default function handler(req, res) {
  try {
    res.status(200).json(pincodes);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      message: "Internal server error!",
    });
  }
}
