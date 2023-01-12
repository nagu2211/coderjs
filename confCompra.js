
const activarFuncion = document.querySelector('#activarFuncion')
const totalProceso = document.querySelector('#totalProceso')
const pago = document.querySelector('#procesar-pago')

/* Llamando al carrito del localstorage */
const lista = localStorage.getItem('carrito')
    if(lista == null){
        listaCarrito = []
    } else{
        listaCarrito = JSON.parse(lista);
    }

/* funcion que hace que el div escuche el evento click al cargar el dom*/
activarFuncion.addEventListener("click", procesarPedido);

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#activarFuncion").click(procesarPedido);
});

    /* se muestra el carrito mas a detalle */
function procesarPedido(){
    listaCarrito.forEach((prod) => {
        const listaCompra = document.querySelector('#lista-compra tbody')
        const {id, nombre, precio, cantidad, img} = prod

        const row = document.createElement('tr')
        row.innerHTML += `
            <td>
            <img class="img-fluid img-carrito" src="${img}"/>
            </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
        `

        listaCompra.appendChild(row)
    })
    totalProceso.innerText = listaCarrito.reduce((acc,prod) => acc + prod.cantidad * prod.precio, 0)
} 
pago.addEventListener('submit', enviarPedido)
/* pequeños retoques cuando le dan a confirmar pedido y vacia el localstorage del carrito */
function enviarPedido(e){
    e.preventDefault()
    const cliente = document.querySelector('#cliente').value
    const correo = document.querySelector('#correo').value

    if(correo === '' || cliente === ''){
        alert('Debes completar todos los formularios')
    } else{
        const spinner = document.querySelector('#spinner')
        spinner.classList.add('d-flex')
        spinner.classList.remove('d-none')

        setTimeout(() => {
        spinner.classList.remove('d-flex')
        spinner.classList.add('d-none') 
        pago.reset()
        }, 3000)

        const alertExito = document.createElement('p')
        alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'cold-md-12', 'mt-2', 'alert-success')
        alertExito.textContent = "Compra realizada exitosamente"
        pago.appendChild(alertExito)

        setTimeout(() => {
            alertExito.remove()
        }, 3000)
    }

    localStorage.clear()
}

