import { nanoid } from "nanoid"
import { Libro } from "../models/libro.model.js"
import { handleError } from "../database/errors.js"

export const getAllLibros = async (req, res) => {
    try {
        const libros = await Libro.findAll()
        return res.json(libros)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const getLibro = async (req, res) => {
    // console.log(req.params)
    try {
        const { id } = req.params
        // validar que tenga formato nanoid???
        const libro = await Libro.findOneById(id)
        if (!libro) {
            return res.status(404).json({ ok: false, msg: '404' })
        }
        return res.json(libro)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const createLibro = async (req, res) => {
    console.log(req.body)
    try {
        const { nombre, precio, autor } = req.body

        if (!nombre || !precio || !autor) {
            return res.status(400).json({ ok: false, msg: "campos obligatorios" })
        }

        const newLibro = {
            nombre,
            precio,
            autor,
            id: nanoid()
        }

        const libro = await Libro.create(newLibro)
        return res.json(libro)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const removeLibro = async (req, res) => {
    console.log(req.params)
    try {
        const { id } = req.params
        const libro = await Libro.remove(id)
        return res.json(libro)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const updateLibro = async (req, res) => {
    console.log(req.params)
    console.log(req.body)
    try {
        const { id } = req.params
        const { nombre, precio, autor } = req.body
        const libro = await Libro.update({
            id,
            nombre,
            precio,
            autor
        })
        return res.json(libro)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}