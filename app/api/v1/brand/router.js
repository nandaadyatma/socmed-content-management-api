const express = require("express");
const { createNewBrand, fetchAllBrandData, fetchBrandById, editBrandById, removeBrandById } = require("./controller");
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth");
const router = express.Router();


router.post("/brands", authenticateUser, authorizeRoles("Admin", "Super admin"), createNewBrand)
router.get("/brands", authenticateUser, authorizeRoles("Admin", "Super admin"), fetchAllBrandData)
router.get("/brands/:id", authenticateUser, authorizeRoles("Admin", "Super admin"), fetchBrandById)
router.put("/brands/:id", authenticateUser, authorizeRoles("Super admin"), editBrandById)
router.delete("/brands/:id", authenticateUser, authorizeRoles("Super admin"), removeBrandById)

module.exports = router