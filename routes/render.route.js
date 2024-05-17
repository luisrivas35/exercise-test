import { Router } from "express";
import { about, home } from "../controllers/render.controller.js";

const router = Router()

router.get('/', home)
router.get('/about', about)

export default router;