const express = require("express");
const {
  createNewPayment,
  fetchAllPayment,
  fetchPaymentById,
  editPaymentById,
  removePaymentById,
} = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const router = express.Router();

router.post(
  "/payments",
  authenticateUser,
  authorizeRoles("Admin", "Super admin"),
  createNewPayment
);

router.get(
  "/payments",
  authenticateUser,
  authorizeRoles("Admin", "Super admin"),
  fetchAllPayment
);

router.get(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("Admin", "Super admin"),
  fetchPaymentById
);

router.put(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("Admin", "Super admin"),
  editPaymentById
);

router.delete(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("Admin", "Super admin"),
  removePaymentById
);

module.exports = router;
