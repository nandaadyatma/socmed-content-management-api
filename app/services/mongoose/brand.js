const { isValidObjectId } = require("mongoose");
const { Brand } = require("../../api/v1/brand/model");
const { NotFoundError, BadRequestError } = require("../../errors");

const createBrand = async (req) => {
  const { name, email, phone } = req.body;

  const result = await Brand.create({
    name,
    contact: {
      email,
      phone,
    },
  });

  return result;
};

const getAllBrands = async (req) => {
  const { keyword } = req.query;
  let condition = {};

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
  }

  const result = await Brand.find(condition);

  return result;
};

const getBrandById = async (req) => {
  const { id } = req.params;

  const isIdValid = isValidObjectId(id)
  
  if (!isIdValid) {
    throw new BadRequestError("valid ID is required")
  }

  const result = await Brand.find({ _id: id });

  return result;
};

const updateBrandData = async (req) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const isIdValid = isValidObjectId(id)

  if (!isIdValid) {
    throw new BadRequestError("valid ID is required")
  }

  if (!name || !email || !phone) {
    throw new BadRequestError("name, email, and phone number is required")
  }


  const result = await Brand.findOneAndUpdate(
    {
      _id: id,
    },
    {
      name: name,
      contact: {
        email,
        phone,
      },
    },
    {
        new: true,
        runValidators: true
    }
  );

  return result;
};

const deleteBrandById = async (req) => {
    const { id } = req.params

    const isIdValid = isValidObjectId(id)

    if(!isIdValid) {
        throw new BadRequestError("Required valid brand ID")
    }

    const result = await Brand.findOneAndDelete({ _id: id})

    return result
}

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrandData,
  deleteBrandById
};
