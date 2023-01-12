
/*ir a la pagina Acceder */
const accederPag = document.getElementById('botonAcceder')


accederPag.addEventListener('click', ()=>{
    window.location = "./pages/acceder.html"
})



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
