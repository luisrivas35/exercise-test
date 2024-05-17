
import { pool } from "../database/connection.js";

const findAll = async () => {
    const query = {
        text: 'SELECT * FROM LIBROS',
        // rowMode: "array"
    }
    const { rows } = await pool.query(query)
    return rows
}

const findOneById = async (id) => {
    const query = {
        // name: 'findOneById',
        text: `
            SELECT * FROM LIBROS WHERE id = $1
        `,
        values: [id]
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

const create = async ({ id, nombre, precio, autor }) => {

    const query = {
        text: `
            INSERT INTO LIBROS (ID, NOMBRE, PRECIO, AUTOR)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `,
        values: [id, nombre, precio, autor]
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

const remove = async (id) => {
    const query = {
        text: `
            DELETE FROM LIBROS WHERE id = $1
            RETURNING *
        `,
        values: [id]    
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

const update = async ({ id, nombre, precio, autor }) => {

    const query = {
        text: `
            UPDATE LIBROS
            SET NOMBRE = $1,
            PRECIO = $2,
            AUTOR = $3
            WHERE ID = $4
            RETURNING *
        `,
        values: [nombre, precio, autor, id]
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

export const Libro = {
    findAll,
    create,
    findOneById,
    remove,
    update
}