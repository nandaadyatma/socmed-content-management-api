const express = require("express");
const { createNewPlatform, fetchAllPlatformData, fetchPlatformDataById, editPlatformDataById, removePlatformDatabyId } = require("./controller");
const router = express.Router();

router.post("/platforms", createNewPlatform)
router.get("/platforms", fetchAllPlatformData)
router.get("/platforms/:id", fetchPlatformDataById)
router.put("/platforms/:id", editPlatformDataById)
router.delete("/platforms/:id", removePlatformDatabyId)

module.exports = router