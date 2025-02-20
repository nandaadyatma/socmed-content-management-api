const express = require("express");
const {
  createNewTask,
  fetchAllTask,
  fetchTaskById,
  editTaskById,
  removeTaskById,
} = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const { deleteTaskById } = require("../../../services/mongoose/task");
const router = express.Router();

router.post(
  "/tasks",
  authenticateUser,
  authorizeRoles("Super admin", "Admin"),
  createNewTask
);

router.get(
  "/tasks",
  authenticateUser,
  authorizeRoles("Super admin", "Admin"),
  fetchAllTask
);

router.get(
  "/tasks/:id",
  authenticateUser,
  authorizeRoles("Super admin", "Admin"),
  fetchTaskById
);

router.put(
  "/tasks/:id",
  authenticateUser,
  authorizeRoles("Super admin", "Admin"),
  editTaskById
);

router.delete(
  "/tasks/:id",
  authenticateUser,
  authorizeRoles("Super admin", "Admin"),
  removeTaskById
);

module.exports = router;
