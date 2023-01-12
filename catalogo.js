/* PRODUCTOS DEL CATALOGO */ 
let stockProductos = [
    {id: 1, nombre: "Qwerty Air Max", tipo:"sport", cantidad: 1, desc: "Zapatillas aerodinamicas semi deslizante especialmente para deportistas ", precio: 25000, img:'../images/prueba-card.jpg'},
    {id: 2, nombre: "Qwerty All Stars", tipo:"sport", cantidad: 1, desc: "Zapatillas aerodinamicas semi deslizante especialmente para deportistas ", precio: 25000, img:'../images/prueba-card2.jpg'},
    {id: 3, nombre: "New Balance", tipo:"sport", cantidad: 1, desc: "Zapatillas aerodinamicas semi deslizante especialmente para deportistas ", precio: 20000, img:'../images/prueba-card3.jpg'},
    {id: 4, nombre: "Air Jordan", tipo:"sport", cantidad: 1, desc: "Zapatillas aerodinamicas semi deslizante especialmente para deportistas ", precio: 15000, img:'../images/prueba-card4.jpg'},
    {id: 5, nombre: "Qwerty Gazelle", tipo:"sport", cantidad: 1, desc: "Zapatillas aerodinamicas semi deslizante especialmente para deportistas ", precio: 30000, img:'../images/prueba-card5.jpg'},
    {id: 6, nombre: "Qwerty Classic", tipo:"sport", cantidad: 1, desc: "Zapatillas aerodinamicas semi deslizante especialmente para deportistas ", precio: 15000, img:'../images/prueba-card6.jpg'},
    {id: 7, nombre: "Wedgie Booties", tipo:"party", cantidad: 1, desc: "Botas que sobresalen en medio de la multitud especialmente para extrovertidos ", precio: 15000, img:'../images/cat7.jpg'},
    {id: 8, nombre: "Chelsea Boots", tipo:"casual/elegant", cantidad: 1, desc: "Botas elegantes o tipo casual , para tu reunion laboral o incluso para un paseo", precio: 22000, img:'../images/cat8.jpg'},
    {id: 9, nombre: "Nike Crazy Red", tipo:"sport/casual", cantidad: 1, desc: "Zapatillas de un tono rojo fuerte para destacar en tu outfit solo o acompañado.", precio: 33000, img:'../images/cat9.jpg'},
    {id: 10, nombre: "Nike Road", tipo:"casual", cantidad: 1, desc: "Zapatillas perfectas para todos los dias o para dar un paseo, Incluso llevarlas al cine de vez en cuando", precio: 18000, img:'../images/cat10.jpg'},
    {id: 11, nombre: "Gianvito Rossi", tipo:"elegant", cantidad: 1, desc: "Zapatos elegantes para reuniones, bautismos, casamientos. Si crees que son para ti dale a comprar", precio: 30000, img:'../images/cat11.jpg'},
    {id: 12, nombre: "Passion Beige", tipo:"casual", cantidad: 1, desc: "Si te gustan los colores suaves y vestir bien estas zapatillas casuales de vans son perfectas para ti", precio: 20000, img:'../images/cat12.jpg'},
]
/* VARIABLES */
const contenedor = document.getElementById('contenedor')
const contadorCarrito = document.getElementById('contadorCarrito')
const vaciarCarrito = document.getElementById('vaciar-carrito')
const procesarCompra = document.querySelector("#procesarCompra");


let carrito=[]



document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    mostrarCarrito();
});

/* modificando el dom para que muestre tarjetas de productos */
stockProductos.forEach((prod)=> {
    const { id, nombre, precio, desc, img,tipo} = prod;
    const div = document.createElement('div')
    div.classList.add('content')
    div.id = `agregar${id}`
    div.innerHTML = `
    <img id="${id}" src=${img} alt="">
    <h3>${nombre}</h3>
    <p>${desc}</p>
    <p>tipo: ${tipo}</p>
    <h6>$ ${precio}</h6>
    <button class="buy">Comprar</button>
    `
    if(contenedor){
    contenedor.appendChild(div)
    }
    const comprar = document.getElementById(`agregar${id}`)

    if(comprar){
    comprar.addEventListener('click', ()=>{
        agregarAlCarrito(id)
    })
    }
})


/* funcion de continuar compra */
procesarCompra.addEventListener('click', ()=>{
    if(carrito.length === 0){
        alert("Tu carrito esta vacio, agrega algun producto para continuar.")
    } else {
        location.href = "../pages/comprando.html"
        procesarPedido()
    }
})
/* le pido que cada producto que seleccione aparezca en el modal del carrito y lo guarde en el localstorage*/
const mostrarCarrito = () => {
    const modalBody = document.querySelector('.modal-contenedor .modal-carrito .modal-contenido')
    if(modalBody){
    modalBody.innerHTML = ''

    carrito.forEach((prod) => {
        const { id, nombre, precio, img, cantidad,tipo} = prod;
        modalBody.innerHTML += `
        <div class="contenidoModal">
            <div id="carrito-contenedor">
                <div><img class="img-carrito" src="${img}"/></div>
            </div>
            <div>
            <p>${nombre}</p>
            <p>Tipo: ${tipo}</p>
            <p>Precio: ${precio}</p>
            <p>Cantidad: ${cantidad}</p>
            <button onclick="eliminarProducto(${id})" class="eliminarProducto">Eliminar Producto</button>
        </div>    
        `
    })
    }
    if(carrito.length == 0){
        modalBody.innerHTML = `
        <p >¡Carrito Vacio!</p>
        `
    } 
    if(contadorCarrito){
        contadorCarrito.textContent = carrito.length
        precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.cantidad * prod.precio, 0)
    }
    
    guardarStorage()
}


vaciarCarrito.addEventListener('click', () => {
    carrito.length = []
    mostrarCarrito()
})


function agregarAlCarrito(id){
    
    const existe = carrito.some(prod => prod.id === id)

    if(existe){
        const prod = carrito.map(prod => {
            if(prod.id === id){
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === id)
        carrito.push(item)
    }
    
    mostrarCarrito()
}

function eliminarProducto(id){
    prodId = id
    carrito = carrito.filter((prod) => prod.id !== prodId)
    mostrarCarrito()
}

/* INICIO DEL MODAL */
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

if((botonAbrir) || (botonCerrar) || (contenedorModal) || (modalCarrito)){
botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
    //padre
})
}

/* funcion para guardar en el localstorage*/
function guardarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


/* Redirigir a Acceder */ 
const accederPagCat = document.getElementById('botonAccederCat')

if(accederPagCat){
accederPagCat.addEventListener('click', ()=>{
    location.href = "./acceder.html"
})
}