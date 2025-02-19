const jwt = require("jsonwebtoken")
const { jwtTokenSecret, jwtTokenExpiration } = require("../config")

const createJWTToken = async ( payload ) => {
    const token = jwt.sign(payload, jwtTokenSecret, {
        expiresIn: jwtTokenExpiration
    })

    return token;
}

const isTokenValid = async (token) => jwt.verify(token, jwtTokenSecret)

const getUserData = (user) =>  {
    return {
        name: user.name,
        userId: user._id,
        role: user.role,
        email: user.email
    }
}

module.exports = {
    createJWTToken,
    getUserData,
    isTokenValid
}