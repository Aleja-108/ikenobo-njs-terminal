import express from "express"
import {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProduct,
    editProduct
} from "../controllers/products.controllers.js"

//import { authentication } from "../middleware/authentication.js"

const routes = express.Router()

routes.get("/", getAllProducts)

routes.get("/:id", getProductById)

routes.post("/create", addProduct)

routes.delete("/:id", deleteProduct)

routes.put("/:id", editProduct)


//routes.post("products", )
export default routes;