/*---------------------
VARIABLES DEL DOM
-----------------------*/
let carrito = [];
let htmlCarrito = "";

let contadorCarrito = carrito.length;


// Ejercicio 1 _____________ 0.5 puntos
//armo lista con objetos productos
const productos = [
  { id: 1, nombre: "Ananá", precio: 220, img: "img/anana.jpg" },
  { id: 2, nombre: "Arándano", precio: 300, img: "img/arandano.jpg" },
  { id: 3, nombre: "Banana", precio: 80, img: "img/banana.jpg" },
  { id: 4, nombre: "Frambuesa", precio: 320, img: "img/frambuesa.png" },
  { id: 5, nombre: "Frutilla", precio: 180, img: "img/frutilla.jpg" },
  { id: 6, nombre: "Kiwi", precio: 200, img: "img/kiwi.jpg" },
  { id: 7, nombre: "Mandarina", precio: 90, img: "img/mandarina.jpg" },
  { id: 8, nombre: "Manzana", precio: 120, img: "img/manzana.jpg" },
  { id: 9, nombre: "Naranja", precio: 95, img: "img/naranja.jpg" },
  { id: 10, nombre: "Pera", precio: 110, img: "img/pera.jpg" },
  { id: 11, nombre: "Pomelo Amarillo", precio: 130, img: "img/pomelo-amarillo.jpg" },
  { id: 12, nombre: "Pomelo Rojo", precio: 140, img: "img/pomelo-rojo.jpg" },
  { id: 13, nombre: "Sandía", precio: 210, img: "img/sandia.jpg" }
];
//--------------------------variables DOM---------------------------------------

const barraBusqueda = document.getElementById("barra-busqueda");

const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("contenedor-carrito");

const botonVaciarCarrito = document.getElementById("vaciar-carrito");

const botonOrdenarPorNombre = document.getElementById("orden-nombre");

const botonOrdenarPorPrecio = document.getElementById("orden-precio");


//--------------------------listener---------------------------------------

barraBusqueda.addEventListener("input", filtrarProducto)

botonOrdenarPorNombre.addEventListener("click", ordenarPorNombre);

botonOrdenarPorPrecio.addEventListener("click", ordenarPorPrecio);


//---------------------------------------------------------------


//Ejercicio 2 _____________ 0.5 puntos
function imprimirDatosAlumno() {
    //creo el objeto alumno
  const alumno = {
    dni: "43318320",
    nombre: "Ignacio Martin",
    apellido: "Mendoza",
  };
  document.getElementById(
    "nav-alumno"
  ).textContent = `${alumno.nombre} ${alumno.apellido}`;
    // muestro en consola alumno
  const yo = `Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`;
  console.log(yo);
}

//Ejercicio 3 _____________ 1 punto
function mostrarProductos(array){
    //recibe un array de productos y los muestra en el HTML
    let htmlProductos = "";
    array.forEach(p=>{ 
        htmlProductos += `
        <div class="card">
            <img src="${p.img}" alt="${p.nombre}">
            <h3>${p.precio}</h3>
            <p>${p.nombre}</p>
            <button onclick="agregarACarrito(${p.id})">Agregar al carrito</button>
        </div>
        `
    })
    //actualizo el HTML
    contenedorProductos.innerHTML = htmlProductos;
}

//Ejercicio 4 _____________ 1 punto
function filtrarProducto()
{
    //filtro los productos por nombre gracias al imput de busqueda
    let valorBusqueda = barraBusqueda.value.toLowerCase();

    let productosFiltrados = productos.filter(p => {
        return p.nombre.toLowerCase().includes(valorBusqueda)
    });

    mostrarProductos(productosFiltrados);
}

//Ejercicio 5 _____________ 2 puntos

function agregarACarrito(idproducto){
    //busca en la lista de productos el objeto que tenga el mismo id que pasamos por parametro y lo agrega al carrito
    carrito.push(productos.find(p => p.id == idproducto));
    mostrarCarrito();
    actualizarHeader();
    actualizarTotal();
    actualizarCarrito();
    console.log(htmlCarrito)
}

function mostrarCarrito(){
    
    htmlCarrito = "<ul>";
       carrito.forEach(p => {
        htmlCarrito += 
        `
        <li class="bloque-item">
        <p class="nombre-item">${p.nombre} - ${p.precio}</p>
        <button class="boton-eliminar" onclick="eliminarProducto(${p.id})">Eliminar</button>
        </li>   
        `;
    })
    htmlCarrito += 
    `
        </ul>
        <div> 
            <button id="vaciar-carrito" onclick="vaciarCarrito()">Vaciar carrito</button>
        </div>
    `;

    contenedorCarrito.innerHTML = htmlCarrito;
}


function eliminarProducto(id){
    //elimina del carrito el producto que tenga el mismo id que pasamos por parametro y actualizamos
    carrito = carrito.filter(i=>i.id!==id);
    mostrarCarrito();
    actualizarHeader();
    actualizarCarrito();
    actualizarTotal();
}

function vaciarCarrito(){
    //vaciar carrito por completo reseteando el array
    carrito = [];
    mostrarCarrito();
    actualizarTotal();
    actualizarHeader();

    vaciarCarritoLocalStorage();
}

function cargarCarrito(params) 
{
    console.log("Cargando carrito desde el local storage al JS");
    let textoCarritoLeido = localStorage.getItem("carrito");

    if (!textoCarritoLeido)
    {
        mostrarCarrito();
    }
    else
    {
        console.log("SE INTENTA PARSEAR EL CARRITO");
        carrito = JSON.parse(textoCarritoLeido);
        mostrarCarrito();
    }
}

function actualizarCarrito() 
{
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function vaciarCarritoLocalStorage() 
{
    localStorage.removeItem("carrito");
}


function actualizarTotal() {

    //actualiza el total del carrito
    const total = carrito.reduce((acc, prod) => acc + Number(prod.precio), 0);
    document.getElementById("total-carrito").textContent = `Total: $${total}`;
}

function actualizarHeader() {
    //sirve para actualizar el contador del carrito en el header
    const contador = document.getElementById("contador"); 
    contador.textContent = carrito.length;
}

function ordenarPorNombre() {
    
    const productosOrdenados = productos.sort((a, b) => {
        // Compara nombres en minúscula para evitar problemas de mayúsculas/minúsculas
        return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase());
    });
    mostrarProductos(productosOrdenados);
}

function ordenarPorPrecio() {
    //ordena de menor a mayor
    const productosOrdenados = productos.sort((a, b) => a.precio - b.precio);

    mostrarProductos(productosOrdenados);
}

function init() {
  imprimirDatosAlumno();
  mostrarProductos(productos);
}

init();
