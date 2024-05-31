const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const Report = require("../model/report");
const { body, validationResult } = require("express-validator");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// Validate report request body
router.post(
  "/report-product/:productId", // Accept product ID from request parameters
  [
    body("reason").isLength({ min: 1 }).withMessage("Reason is required."),
  ],
  catchAsyncErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const productId = req.params.productId; // Retrieve product ID from request parameters
    const { reason } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Create a new report
    const report = new Report({
      product: productId,
      reason: reason,
    });

    await report.save();

    // Send a success response
    res.status(200).json({ message: "Product reported successfully." });
  })
);

module.exports = router;
