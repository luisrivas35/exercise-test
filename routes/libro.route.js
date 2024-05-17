import { Router } from "express";
import { createLibro, getAllLibros, getLibro, removeLibro, updateLibro } from "../controllers/libro.controller.js";

const router = Router()

// URL /libros

router.get('/', getAllLibros)
router.get('/:id', getLibro)
router.post('/', createLibro)
router.delete('/:id', removeLibro)
router.put('/:id', updateLibro)

export default router