
const activarFuncion = document.querySelector('#activarFuncion')
const totalProceso = document.querySelector('#totalProceso')
const pago = document.querySelector('#procesar-pago')
const alertexito = document.getElementById('alertexito')

/* Llamando al carrito del localstorage */
const lista = localStorage.getItem('carrito')
    if(lista == null){
        listaCarrito = []
    } else{
        listaCarrito = JSON.parse(lista);
    }
const registro = localStorage.getItem('registro')
    if(registro == null){
        datosRegistro = []
    } else{
        datosRegistro = JSON.parse(registro);
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
    if((datosRegistro[1] == null) || (datosRegistro[5] == null)){
        Swal.fire({
            icon: 'error',
            title: 'Usuario desconocido',
            text: 'Debes iniciar sesion para hacer alguna compra',
            footer: '<a href="">Why do I have this issue?</a>'
        })
    } else {

    e.preventDefault()
    const correo = document.querySelector('#correo').value

    if(correo === ''){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Introduce tu correo electronico'
        })
    } else if(lista === null){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tu carrito esta vacio',
            footer: '<a href="./pages/catalogo.html">Ir a catalogo</a>'
        })
    } else{
        const spinner = document.querySelector('#spinner')
        spinner.classList.add('d-flex')
        spinner.classList.remove('d-none')
        location.href = "#spinner"

        setTimeout(() => {
        spinner.classList.remove('d-flex')
        spinner.classList.add('d-none') 
        pago.reset()
        }, 3000)
        const alertExito = document.createElement('p')
        alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'cold-md-12', 'mt-2', 'alert-success')
        alertExito.setAttribute("id", "cartelCompra");
        alertExito.textContent = "Compra realizada exitosamente"
        alertexito.appendChild(alertExito)
        setTimeout(()=>{
        location.href = "#cartelCompra"
        },3000)
        

        setTimeout(() => {
            alertExito.remove()
        }, 5000)
        
    }
    }
    setTimeout(() => {
        window.location.reload()
        localStorage.removeItem('carrito');
    }, 5000);
    
}

