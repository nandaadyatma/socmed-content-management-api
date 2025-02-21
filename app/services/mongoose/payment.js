const { isValidObjectId } = require("mongoose");
const { Payment } = require("../../api/v1/payment/model");
const { Task } = require("../../api/v1/task/model");
const { BadRequestError, NotFoundError } = require("../../errors");
const { isEmptyOrNull } = require("../../utils/validation");

const createPayment = async (req) => {
  const { taskId, amount, currency, status, method, paymentDate } = req.body;

  // check is task ID in valid format object id
  const isIdValid = isValidObjectId(taskId);
  if (!isIdValid) {
    throw new BadRequestError("required task ID in valid format");
  }

  // check task is exist or not
  const checkTask = await Task.find({ _id: taskId });
  if (!checkTask) {
    throw new NotFoundError("Task is not found");
  }

  const result = await Payment.create({
    taskId,
    amount,
    currency,
    status,
    method,
    paymentDate,
  });

  return result;
};

const getAllPayment = async (req) => {
  const { status } = req.query;

  let condition = {};

  if (status) {
    condition = { ...condition, status: status };
  }

  const result = await Payment.find(condition);

  return result;
};

const getPaymentById = async (req) => {
  const { id } = req.params;

  // check is task ID in valid format object id
  const isIdValid = isValidObjectId(id);
  if (!isIdValid) {
    throw new BadRequestError("required task ID in valid format");
  }

  const result = await Payment.find({ _id: id });

  if (isEmptyOrNull(result)) {
    throw new NotFoundError("Payment is not found");
  }

  return result;
};

const updatePaymentById = async (req) => {
  const { taskId, amount, currency, status, method, paymentDate } = req.body;
  const { id } = req.params;

  // check is task ID in valid format object id
  const isIdValid = isValidObjectId(id);
  if (!isIdValid) {
    throw new BadRequestError("required task ID in valid format");
  }

  // check is payment exists
  checkPayment = await Payment.find({ _id: id });


  if (isEmptyOrNull(checkPayment)) {
    throw new NotFoundError("Payment not found");
  }

  const result = await Payment.findOneAndUpdate(
    {
      _id: id,
    },
    {
      taskId,
      amount,
      currency,
      status,
      method,
      paymentDate,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

const deletePaymentById = async (req) => {
  const { id } = req.params;

  // check is task ID in valid format object id
  const isIdValid = isValidObjectId(id);
  if (!isIdValid) {
    throw new BadRequestError("required task ID in valid format");
  }

  // check is payment exists
  checkPayment = await Payment.find({ _id: id });
  if (isEmptyOrNull(checkPayment)) {
    throw new NotFoundError("Payment not found");
  }

  const result = await Payment.findOneAndDelete({
    _id: id,
  });

  return result;
};

module.exports = {
  createPayment,
  getAllPayment,
  getPaymentById,
  updatePaymentById,
  deletePaymentById
};
