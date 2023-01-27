const registro = localStorage.getItem('registro')
const botonAcceder = document.querySelector('#botonAcceder')
const bienvenida = document.querySelector('#bienvenido')
const login = localStorage.getItem('login')
const accederPagCat = document.getElementById('botonAccederCat')
const cerrarSesion = document.querySelector('#cerrarSesion')

if((registro !== null) && (login !== null)) {
    datosLogin = JSON.parse(login)
    if(botonAcceder){
    botonAcceder.classList.add('ocultarAcceder')
    cerrarSesion.classList.remove('ocultarAcceder')
    } 
    if(accederPagCat){
    accederPagCat.classList.add('ocultarAcceder')
    cerrarSesion.classList.remove('ocultarAcceder')
    }
    const bienvenido = document.createElement('div')
    bienvenido.classList.add('laBienvenida')
    bienvenido.innerHTML = `
    <p>¡Bienvenido ${datosLogin[0]}!</p>
    `

    if(bienvenida){
    bienvenida.appendChild(bienvenido)
    }
    
    if(cerrarSesion){
    cerrarSesion.addEventListener('click', ()=>{
        localStorage.removeItem('login')
    })}
    
}

/*ir a la pagina Acceder */
if(botonAcceder){
botonAcceder.addEventListener('click', ()=>{
    window.location = "./pages/acceder.html"
    })
} else if(accederPagCat){
    accederPagCat.addEventListener('click', ()=>{
        location.href = "./acceder.html"})
}
/*Carrusel : flechas anterior y siguiente*/
const siguiente = document.getElementById('next')
const anterior = document.getElementById('prev')
if (siguiente){
siguiente.addEventListener('click', ()=>{
    const widthItem = document.querySelector('#cards-carrousel').offsetWidth;
    document.getElementById('formList').scrollLeft += widthItem;
})
}
if(anterior){
anterior.addEventListener('click', ()=>{
    const widthItem = document.querySelector('#cards-carrousel').offsetWidth;
    document.getElementById('formList').scrollLeft -= widthItem;
})
}

/* MENU HAMBURGUESA */
const iconoMenu = document.querySelector('#icono-menu'),
    menu = document.querySelector('#menu');

iconoMenu.addEventListener('click', (e) => {

    // Alternamos estilos para el menú y body
    menu.classList.toggle('active');
    document.body.classList.toggle('opacity');

    // Alternamos su atributo 'src' para el ícono del menú
    const rutaActual = e.target.getAttribute('src');

    if(rutaActual == 'img/open-menu.png'){
        e.target.setAttribute('src','img/open-menu2.png');
    }else{
        e.target.setAttribute('src','img/open-menu.png');
    }
});