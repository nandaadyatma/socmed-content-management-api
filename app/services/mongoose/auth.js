const { User } = require("../../api/v1/auth/model");
const {
    BadRequestError,
    UnauthenticatedError,
    UnauthorizedError,
    NotFoundError
} = require("../../errors");
const { createJWTToken, getUserData } = require("../../utils/jwt");

const createUser = async (req) => {
    const { name, email, password } = req.body
    // all input validation is already setup on mongoose schema

    const result = await User.create({
        name,
        email,
        password
    })

    //remove password from result, before return 
    delete result._doc.password

    return result

}

const login = async (req) => {
    const { email, password } = req.body

    // check input
    if (!email || !password) {
        throw new BadRequestError("Please input email and password")
    }

    // is user with this email exist
    const userFound = await User.findOne({ email: email})

    if (!userFound) {
        throw new UnauthorizedError(`User with this email (${email}) is not found`)
    }

    // is password match with real password
    const isPasswordCorrect = await userFound.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new UnauthorizedError("Invalid crededitials")
    }

    // generate token
    const payload = getUserData(userFound)
    const token = await createJWTToken({ payload: payload})

    // return data
    const data = {
        userId: userFound._id,
        name : userFound.name,
        email : userFound.email,
        token: token

    }

    return data
}

module.exports = {
    createUser,
    login
}