
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
/*  Datos de entrega */
const datosEntrega = document.querySelector('#datosEntrega')
const div = document.createElement('div')
div.innerHTML = `
<h2>Cliente: ${datosRegistro[1]}</h2>
<h2>Email: ${datosRegistro[2]}</h2>
<h2 id="datoDomicilio">Domicilio: ${datosRegistro[3]}</h2>
<h2 id="datoLocalidad">Localidad: ${datosRegistro[4]}</h2>
<h3>Metodo de pago: Solo efectivo.</h3>
<button class="col-xs-12 col-md-4 btn btn-danger btn-block" id="buttonEntrega">Modificar datos de entrega</button>
`
datosEntrega.appendChild(div)
/* Modificar datos de entrega */
const modificarEntrega = document.querySelector('#buttonEntrega')
modificarEntrega.addEventListener('click',modificarDatos)
function modificarDatos(){
    const domicilio = document.querySelector('#datoDomicilio')
    const localidad = document.querySelector('#datoLocalidad')
    domicilio.classList.add('ocultarAcceder')
    localidad.classList.add('ocultarAcceder')
    modificarEntrega.classList.add('ocultarAcceder')
    const datosMod = document.querySelector('#datosMod')
    const div2 = document.createElement('div')
    div2.innerHTML = `
    <h2>Ingrese nuevo punto de entrega</h2>
    <input type="text"  id="domicilioNuevo" class="form-control"  name="domicilio" placeholder="Ingrese su domicilio">
    <input type="text"  id="localidadNuevo" class="form-control"  name="localidad" placeholder="Ingrese su localidad">
    `
    datosMod.appendChild(div2)


}
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
            <td valign="center">${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            
        `

        listaCompra.appendChild(row)
    })
    totalProceso.innerText = listaCarrito.reduce((acc,prod) => acc + prod.cantidad * prod.precio, 0)
} 
function procesarLaCompra(){
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
            
            setTimeout(() => {
                window.location.reload()
                localStorage.removeItem('carrito');
            }, 5000);
            
}
pago.addEventListener('submit', enviarPedido)
/* pequeños retoques cuando le dan a confirmar pedido y vacia el localstorage del carrito */
function enviarPedido(e){
    e.preventDefault()
    const domicilioNuevo = document.querySelector('#domicilioNuevo')
    const localidadNuevo = document.querySelector('#localidadNuevo')
    if(lista === null){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tu carrito esta vacio',
            footer: '<a href="./catalogo.html">Ir a catalogo</a>'
        })
    } else if(registro === null){
        Swal.fire({
            icon: 'error',
            title: 'Usuario desconocido',
            text: 'Debes iniciar sesion para hacer alguna compra',
            
        })} else if(domicilioNuevo){
            if(( domicilioNuevo.value === '') || (localidadNuevo.value === '')){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Introduce tus datos correctamente'
                })
            } 
            else{
                procesarLaCompra()
                }}
            else{
                procesarLaCompra()
            }
        }  
