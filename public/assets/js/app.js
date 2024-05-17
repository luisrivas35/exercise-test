const todosLosLibros = document.querySelector("#todosLosLibros");
const formularioAgregarLibro = document.querySelector(
  "#formularioAgregarLibro"
);
const formularioEditarLibro = document.querySelector("#formularioEditarLibro");

const exampleModal = document.querySelector("#exampleModal");
const myModal = new bootstrap.Modal(exampleModal);

const URL_DOMAIN = "http://localhost:3000";

formularioAgregarLibro.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nombre = event.target.nombre.value;
  const autor = event.target.autor.value;
  const precio = event.target.precio.value;

  // tarea validar los inputs
  if (!nombre.trim() || !autor.trim() || !precio.trim()) {
    return alert("campos obligatorios");
  }

  try {
    await axios.post(URL_DOMAIN + "/libros", {
      nombre,
      autor,
      precio,
    });
    formularioAgregarLibro.reset();
    obtenerLibros();
  } catch (error) {
    console.log(error);
    alert(error?.response?.data?.msg);
  }
});

const obtenerLibros = async () => {
  try {
    const { data: libros } = await axios.get(URL_DOMAIN + "/libros");
    todosLosLibros.innerHTML = ""; // Clear existing content

    const table = document.createElement("table");
    table.classList.add("table", "table-striped");

    const thead = document.createElement("thead");
    thead.classList.add("thead-dark");
    thead.innerHTML = `
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Autor</th>
        <th scope="col">Precio</th>
        <th scope="col">Acciones</th>
      </tr>
    `;

    const tbody = document.createElement("tbody");

    libros.forEach((libro) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${libro.nombre}</td>
        <td>${libro.autor}</td>
        <td>$${libro.precio.toFixed(2)}</td>
        <td>
          <button onclick="editarLibro('${
            libro.id
          }')" class="btn btn-warning btn-sm">Editar</button>
          <button onclick="eliminarLibro('${
            libro.id
          }')" class="btn btn-danger btn-sm">Eliminar</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    todosLosLibros.appendChild(table);
  } catch (error) {
    console.log(error);
    alert(error?.response?.data?.msg);
  }
};




obtenerLibros();

const eliminarLibro = async (id) => {
  console.log("me estás eliminando...", id);
  try {
    if (confirm("Estás seguro que quieres eliminar el libro?")) {
      await axios.delete(URL_DOMAIN + "/libros/" + id);
      obtenerLibros();
    }
  } catch (error) {
    alert(error?.response?.data?.msg);
  }
};


const submitEditarLibro = async (event) => {
  try {
    event.preventDefault();
    const id = event.target.dataset.id; // aca se toma el id desde la forma
    await axios.put(URL_DOMAIN + "/libros/" + id, {
      nombre: event.target.nombre.value,
      autor: event.target.autor.value,
      precio: event.target.precio.value,
    });
    event.target.reset(); 
    obtenerLibros(); 
    myModal.hide();
  } catch (error) {
    alert(error?.response?.data?.msg);
  }
};

formularioEditarLibro.addEventListener("submit", submitEditarLibro);

const editarLibro = async (id) => {
  try {
    const { data: libro } = await axios.get(URL_DOMAIN + "/libros/" + id);
    
    formularioEditarLibro.dataset.id = id; 
    formularioEditarLibro.nombre.value = libro.nombre;
    formularioEditarLibro.autor.value = libro.autor;
    formularioEditarLibro.precio.value = libro.precio;
   
    myModal.show();
  } catch (error) {
    alert(error?.response?.data?.msg);
  }
};






