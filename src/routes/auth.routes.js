import express from "express"
import {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProduct,
    editProduct
} from "../controllers/products.controllers.js"

import { authentication } from "../middleware/authentication.js"

const routes = express.Router()

routes.get("/products", getAllProducts)

routes.get("/products/:id", getProductById)

routes.post("/products/create", authentication, addProduct)

routes.delete("/products/:id", authentication, deleteProduct)

routes.put("/products/:id", authentication, editProduct )


//routes.post("products", )
export default routes;