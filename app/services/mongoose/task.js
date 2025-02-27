const { isValidObjectId } = require("mongoose");
const { Task } = require("../../api/v1/task/model");
const BadRequest = require("../../errors/bad-request");
const { BadRequestError, NotFoundError } = require("../../errors");
const { isEmptyOrNull } = require("../../utils/validation");

const createTask = async (req) => {
  const {
    postTitle,
    description,
    brandId,
    platformId,
    dueDate,
    status,
    isRequiresPayment,
  } = req.body;


  const userId = req.user.id;

  const result = await Task.create({
    postTitle,
    description,
    brandId,
    platformId,
    userId,
    dueDate,
    status,
    isRequiresPayment,
  });

  return result;
};

const getAllTasks = async (req) => {
  const { keyword, status } = req.query;

  let condition = {};

  if (keyword) {
    condition = {
      ...condition,
      $or: [
        { postTitle: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
  }
  if (status) {
    condition = { ...condition, status: status };
  }

  const result = await Task.find(condition)
    .populate({
      path: "brandId",
      select: "_id name",
    })
    .populate({
      path: "platformId",
      select: "_id name url iconUrl",
    })
    .populate({
      path: "userId",
      select: "_id name",
    });

  //mapping result (because populate result is object now)
  const responseData = result.map((item) => {
    const task = item._doc;
    return {
      ...task,
      user: task.userId,
      brand: task.brandId,
      platform: task.platformId,
      userId: undefined,
      brandId: undefined,
      platformId: undefined,
    };
  });

  if(isEmptyOrNull(responseData)) {
    throw new NotFoundError("Data is not found")
  }

  return responseData;
};

const getTaskById = async (req) => {
  const { id } = req.params;

  const isIdValid = isValidObjectId(id);

  if (!isIdValid) {
    throw new BadRequestError("Valid task ID is required");
  }

  const result = await Task.find({ _id: id })
    .populate({
      path: "brandId",
      select: "_id name",
    })
    .populate({
      path: "platformId",
      select: "_id name url iconUrl",
    })
    .populate({
      path: "userId",
      select: "_id name",
    });

  //mapping result (because populate result is object now)
  const responseData = result.map((item) => {
    const task = item._doc;
    return {
      ...task,
      user: task.userId,
      brand: task.brandId,
      platform: task.platformId,
      userId: undefined,
      brandId: undefined,
      platformId: undefined,
    };
  });

  if (isEmptyOrNull(responseData)) {
    throw new NotFoundError("Task data not found")
  }

  return responseData;
};

const updateTaskById = async (req) => {
  const {
    postTitle,
    description,
    brandId,
    platformId,
    dueDate,
    status,
    isRequiresPayment,
  } = req.body;

  const { id } = req.params;

  const isIdValid = isValidObjectId(id);

  if (!isIdValid) {
    throw new BadRequestError("Valid task ID is required");
  }

  const result = await Task.findOneAndUpdate(
    {
      _id: id,
    },
    {
      postTitle,
      description,
      brandId,
      platformId,
      dueDate,
      status,
      isRequiresPayment,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  
  // check if result is empty or not
  if(isEmptyOrNull(result)) {
    throw new NotFoundError("Data not found")
  }

  return result;
};

const deleteTaskById = async (req) => {
  const { id } = req.params;

  const isIdValid = isValidObjectId(id);

  if (!isIdValid) {
    throw new BadRequestError("Valid task ID is required");
  }

  const result = await Task.findOneAndDelete({ _id: id });

  // check if result is empty or not
  if(isEmptyOrNull(result)) {
    throw new NotFoundError("Data not found")
  }

  return result;
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById
};
