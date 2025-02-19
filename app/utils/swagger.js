const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require("./swagger.json")
const {} = require("../api/v1/auth/router.js")


const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    console.log("Swagger docs available at http://localhost:9000/api-docs")
}

module.exports = {setupSwagger}