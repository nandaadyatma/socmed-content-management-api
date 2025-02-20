const { Platform } = require("../../api/v1/platform/model");
const {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  NotFoundError,
} = require("../../errors");

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
  const result = await Platform.findOne({ _id: id });

  return result;
};

const updatePlatformData = async (req) => {
  const { id } = req.params;
  const { name, url, iconUrl } = req.body;

  if (!id) {
    throw new BadRequestError("ID is required");
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
    const { id } = req.params

    const result = await Platform.findOneAndDelete(
        {
            _id: id
        }
    )

    return result
}

module.exports = {
  createPlatform,
  getAllPlatformData,
  getOnePlatformData,
  updatePlatformData,
  deletePlatformData,
};
