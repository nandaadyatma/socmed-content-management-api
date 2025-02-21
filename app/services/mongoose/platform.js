const { isValidObjectId } = require("mongoose");
const { Platform } = require("../../api/v1/platform/model");
const {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  NotFoundError,
} = require("../../errors");
const { isEmptyOrNull } = require("../../utils/validation");

const createPlatform = async (req) => {
  const { name, url, iconUrl } = req.body;

  const result = await Platform.create({
    name,
    url,
    iconUrl,
  });

  return result;
};

const getAllPlatformData = async (req) => {
  const result = await Platform.find({});

  return result;
};

const getOnePlatformData = async (req) => {
  const { id } = req.params;

  // check is ID valid format
  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    throw new BadRequestError("Required platform ID in valid format");
  }

  const result = await Platform.find({ _id: id });

  // check is result empty
  if (isEmptyOrNull(result)) {
    throw new NotFoundError("Platform data not found");
  }

  return result;
};

const updatePlatformData = async (req) => {
  const { id } = req.params;
  const { name, url, iconUrl } = req.body;

  // check is ID valid format
  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    throw new BadRequestError("Required platform ID in valid format");
  }

  // check is platform exist
  const checkPlatform = await Platform.find({ _id: id})

  if(isEmptyOrNull(checkPlatform)) {
    throw new NotFoundError("Platform not found")
  }


  const result = await Platform.findOneAndUpdate(
    {
      _id: id,
    },
    {
      name: name,
      url: url,
      iconUrl: iconUrl,
    },
    {
      new: true,
      runValidators: true,
    }
  );


  return result;
};

const deletePlatformData = async (req) => {
  const { id } = req.params;

  // check is ID valid format
  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    throw new BadRequestError("Required platform ID in valid format");
  }

  const result = await Platform.findOneAndDelete({
    _id: id,
  });

  // check is result empty (data not found)
  if(isEmptyOrNull(result)) {
    throw new NotFoundError("Data not found")
  }

  return result;
};

module.exports = {
  createPlatform,
  getAllPlatformData,
  getOnePlatformData,
  updatePlatformData,
  deletePlatformData,
};
