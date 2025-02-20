const { StatusCodes } = require("http-status-codes");
const {
  createPlatform,
  getAllPlatformData,
  getOnePlatformData,
  updatePlatformData,
  deletePlatformData,
} = require("../../../services/mongoose/platform");

const createNewPlatform = async (req, res, next) => {
  try {
    const result = await createPlatform(req);

    if (result) {
      return res.status(StatusCodes.OK).json({
        status: false,
        message: "Platform is created successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const fetchAllPlatformData = async (req, res, next) => {
  try {
    const result = await getAllPlatformData(req);

    if (result) {
      return res.status(StatusCodes.OK).json({
        status: false,
        message: "Success get all data",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const fetchPlatformDataById = async (req, res, next) => {
  try {
    const result = await getOnePlatformData(req);

    if (result) {
      return res.status(StatusCodes.OK).json({
        status: false,
        message: "Success get data by ID",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const editPlatformDataById = async (req, res, next) => {
  try {
    const result = await updatePlatformData(req);

    if (result) {
      return res.status(StatusCodes.OK).json({
        status: false,
        message: "Success edit data by ID",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const removePlatformDatabyId = async (req, res, next) => {
    try {
        const result = await deletePlatformData(req)

        if (result) {
            return res.status(StatusCodes.OK).json(
                {
                    error: false,
                    message: "Success delete data",
                    data: result
                }
            )
        }
        
    } catch (error) {
        next (error)
    }
}

module.exports = {
  createNewPlatform,
  fetchAllPlatformData,
  fetchPlatformDataById,
  editPlatformDataById,
  removePlatformDatabyId
};
