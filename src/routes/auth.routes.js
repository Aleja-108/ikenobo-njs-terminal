import { Router } from "express";
import { login } from "../controllers/auth.controllers.js";

const router = Router();
router.post("/", login); // POST /api/login
export default router;
