const todosLosLibros = document.querySelector('#todosLosLibros')
const formularioAgregarLibro = document.querySelector('#formularioAgregarLibro')
const formularioEditarLibro = document.querySelector('#formularioEditarLibro')

const exampleModal = document.querySelector('#exampleModal')
const myModal = new bootstrap.Modal(exampleModal)

const URL_DOMAIN = "/api/v1"

formularioAgregarLibro.addEventListener('submit', async (event) => {
    event.preventDefault()
    const nombre = event.target.nombre.value
    const autor = event.target.autor.value
    const precio = event.target.precio.value

    // tarea validar los inputs
    if (!nombre.trim() || !autor.trim() || !precio.trim()) {
        return alert('campos obligatorios')
    }

    try {
        await axios.post(URL_DOMAIN + '/libros', {
            nombre, autor, precio
        })
        obtenerLibros()
    } catch (error) {
        console.log(error)
        alert(error?.response?.data?.msg)
    }
})

const obtenerLibros = async () => {
    try {
        const { data: libros } = await axios.get(URL_DOMAIN + '/libros')
        todosLosLibros.innerHTML = ''
        libros.forEach(libro => {
            todosLosLibros.innerHTML += /*html*/`
            <li class="list-group-item">
                <div class="mb-2">
                    Nombre: ${libro.nombre} 
                    - autor: ${libro.autor} 
                    - precio: ${libro.precio}
                </div>
                <div>
                    <button 
                        onclick="eliminarLibro('${libro.id}')" 
                        class="btn btn-danger btn-sm">Eliminar</button>
                    <button 
                        onclick="editarLibro('${libro.id}')" 
                        class="btn btn-warning btn-sm">Editar</button>
                </div>
            </li>
            `
        })
    } catch (error) {
        console.log(error)
        alert(error?.response?.data?.msg)
    }
}

obtenerLibros()

const eliminarLibro = async (id) => {
    console.log('me estás eliminando...', id)
    try {
        if (confirm('Estás seguro que quieres eliminar el libro?')) {
            await axios.delete(URL_DOMAIN + '/libros/' + id)
            obtenerLibros()
        }
    } catch (error) {
        alert(error?.response?.data?.msg)
    }
}

const editarLibro = async (id) => {
    try {
        const { data: libro } = await axios.get(URL_DOMAIN + '/libros/' + id)

        // agregar los input según los elementos del libro
        formularioEditarLibro.nombre.value = libro.nombre
        formularioEditarLibro.autor.value = libro.autor
        formularioEditarLibro.precio.value = libro.precio
        formularioEditarLibro.idLibro.value = libro.id

        myModal.show()
    } catch (error) {
        alert(error?.response?.data?.msg)
    }
}

formularioEditarLibro.addEventListener('submit', async (event) => {
    try {
        event.preventDefault()

        const nombre = event.target.nombre.value
        const autor = event.target.autor.value
        const precio = event.target.precio.value
        const idLibro = event.target.idLibro.value

        await axios.put(URL_DOMAIN + '/libros/' + idLibro, {
            nombre, autor, precio
        })
        obtenerLibros()
        myModal.hide()
    } catch (error) {
        alert(error?.response?.data?.msg)
    }
})
