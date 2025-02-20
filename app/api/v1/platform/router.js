const express = require("express");
const { createNewPlatform, fetchAllPlatformData, fetchPlatformDataById, editPlatformDataById, removePlatformDatabyId } = require("./controller");
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth");
const router = express.Router();

router.post("/platforms", authenticateUser, authorizeRoles("Super admin"), createNewPlatform)
router.get("/platforms", authenticateUser, fetchAllPlatformData)
router.get("/platforms/:id", authenticateUser, fetchPlatformDataById)
router.put("/platforms/:id", authenticateUser, authorizeRoles("Super admin"), editPlatformDataById)
router.delete("/platforms/:id", authenticateUser, authorizeRoles("Super admin"), removePlatformDatabyId)

module.exports = router