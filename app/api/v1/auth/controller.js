const { StatusCodes } = require("http-status-codes");
const { createUser, login } = require("../../../services/mongoose/auth");

const loginUser = async (req, res, next) => {
  try {
    const result = await login(req);

    if (result) {
      return res.status(StatusCodes.OK).json({
        error: false,
        message: "Login successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
    try {
        const result = await createUser(req)

        if(result) {
            return res.status(StatusCodes.OK).json(
                {
                    error: false,
                    message: "Create account successfully",
                    data: result
                }
            )
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    registerUser,
    loginUser
}