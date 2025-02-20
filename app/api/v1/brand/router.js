const express = require("express");
const { createNewBrand, fetchAllBrandData, fetchBrandById, editBrandById, removeBrandById } = require("./controller");
const router = express.Router();


router.post("/brands", createNewBrand)
router.get("/brands", fetchAllBrandData)
router.get("/brands/:id", fetchBrandById)
router.put("/brands/:id", editBrandById)
router.delete("/brands/:id", removeBrandById)

module.exports = router