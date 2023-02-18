
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
/* modificando el dom para que muestre tarjetas de productos del json */
fetch("./productos.json")
.then((res)=>res.json())
.then ((data)=>{
    data.forEach((prod)=>{
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
        Toastify({
            text: "¡Agregado al carrito!",
            offset: {
            x: 50, 
            y: 10,  
            },
            style: {
                
                background: "linear-gradient(to top, #ff626d, #fcad72)",
            },
            duration: 1000,
            }).showToast();
            
            const existe = carrito.some(prod => prod.id === id)
    
            if(existe){
                const prod = 
                    carrito.map(prod => {
                    if(prod.id === id){
                        prod.cantidad++
                    }
                })
            } 
            else {
                const item = data.find((prod) => prod.id === id)
                carrito.push(item)
            }
            
            mostrarCarrito()
    })
    }
    })
})
.catch(err => console.log(err))


/* funcion de continuar compra */
procesarCompra.addEventListener('click', ()=>{
    if(carrito.length === 0){
        Swal.fire({
            icon: 'error',
            title: 'Carrito vacio',
            text: 'Agrega algun producto para continuar',
        })
    } else {
        location.href = "./pages/comprando.html"
        procesarPedido()
    }
})
/* le pido que cada producto que seleccione aparezca en el modal del carrito y lo guarde en el localstorage*/
const mostrarCarrito = () => {
    const modalBody = document.querySelector('.modal-contenedor .modal-carrito .modal-contenido')
    if(modalBody){
    modalBody.innerHTML = '';

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
    window.location.reload()
})



function eliminarProducto(id){
    prodId = id
    carrito = carrito.filter((prod) => prod.id !== prodId)
    
    Toastify({
        text: "¡Producto eliminado del carrito!",
        offset: {
        x: 50, 
        y: 10, // 
        },
        style: {
            background: "linear-gradient(to top, #ff626d, #fcad72)",
        },
        }).showToast();
        window.location.reload()
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




