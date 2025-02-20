const express = require("express");
const router = express.Router();

const { loginUser, registerUser } = require("./controller");


router.post("/auth/register", registerUser);

router.post("/auth/login", loginUser);

module.exports = router
