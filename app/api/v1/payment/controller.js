const { StatusCodes } = require("http-status-codes");
const {
  createPayment,
  getAllPayment,
  getPaymentById,
  updatePaymentById,
  deletePaymentById
} = require("../../../services/mongoose/payment");

const createNewPayment = async (req, res, next) => {
  try {
    const result = await createPayment(req);

    if (result) {
      return res.status(StatusCodes.OK).json({
        error: false,
        message: "Create payment successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const fetchAllPayment = async (req, res, next) => {
  try {
    const result = await getAllPayment(req);

    if (result) {
      return res.status(StatusCodes.OK).json({
        error: false,
        message: "Get payment data successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const fetchPaymentById = async (req, res, next) => {
  try {
    const result = await getPaymentById(req);

    if (result) {
      return res.status(StatusCodes.OK).json({
        error: false,
        message: "Get payment data successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const editPaymentById = async (req, res, next) => {
  try {
    const result = await updatePaymentById(req)

    if (result) {
      return res.status(StatusCodes.OK).json({
        error: false,
        message: "Edit payment data successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error)
  }
}

const removePaymentById = async (req, res, next) => {
  try {
    const result = await deletePaymentById(req)

    if (result) {
      return res
        .status(StatusCodes.OK)
        .json({
          error: false,
          message: "Delete payment data successfully",
          data: result,
        });
    }
    
  } catch (error) {
    next(error)
  }
}

module.exports = { createNewPayment, fetchAllPayment, fetchPaymentById, editPaymentById, removePaymentById };
