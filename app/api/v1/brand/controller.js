const { StatusCodes } = require("http-status-codes");
const {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrandData,
  deleteBrandById,
} = require("../../../services/mongoose/brand");

const createNewBrand = async (req, res, next) => {
  try {
    const result = await createBrand(req);

    if (result) {
      return res.status(StatusCodes.OK).json({
        error: false,
        message: "Create new brand client successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const fetchAllBrandData = async (req, res, next) => {
  try {
    const result = await getAllBrands(req);

    if (result) {
      return res.status(StatusCodes.OK).json({
        error: false,
        message: "Success get all data",
        result: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const fetchBrandById = async (req, res, next) => {
  try {
    const result = await getBrandById(req);

    if (result) {
      return res.status(StatusCodes.OK).json({
        error: false,
        message: "Success get data",
        result: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const editBrandById = async (req, res, next) => {
  try {
    const result = await updateBrandData(req);

    if (result) {
      return res.status(StatusCodes.OK).json({
        error: false,
        message: "Success edit data",
        result: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const removeBrandById = async (req, res, next) => {
    try {
        const result = await deleteBrandById(req)

        if (result) {
            return res.status(StatusCodes.OK).json({
                error: false,
                message: "Success delete data",
                result: result,
              });
        }

        
    } catch (error) {
        next(error)
    }
}

module.exports = {
  createNewBrand,
  fetchAllBrandData,
  fetchBrandById,
  editBrandById,
  removeBrandById
};
