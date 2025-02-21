const express = require("express");
const { createNewPlatform, fetchAllPlatformData, fetchPlatformDataById, editPlatformDataById, removePlatformDatabyId } = require("./controller");
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth");
const router = express.Router();

router.post("/platforms", authenticateUser, authorizeRoles("Super admin"), createNewPlatform)
router.get("/platforms", authenticateUser, authorizeRoles("Admin", "Super admin"), fetchAllPlatformData)
router.get("/platforms/:id", authenticateUser, authorizeRoles("Admin", "Super admin"), fetchPlatformDataById)
router.put("/platforms/:id", authenticateUser, authorizeRoles("Super admin"), editPlatformDataById)
router.delete("/platforms/:id", authenticateUser, authorizeRoles("Super admin"), removePlatformDatabyId)

module.exports = router