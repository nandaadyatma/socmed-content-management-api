const express = require("express");
const router = express.Router();

const { loginUser, registerUser } = require("./controller");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Membuat akun pengguna baru.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *     responses:
 *       201:
 *         description: Pengguna berhasil didaftarkan
 */
router.post("/auth/register", registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Melakukan autentikasi pengguna.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Login berhasil
 */
router.post("/auth/login", loginUser);

module.exports = router
