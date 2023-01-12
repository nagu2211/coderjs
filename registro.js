/*Localstorage registro */
const buttonReg = document.getElementById('buttonReg')

if(buttonReg){
buttonReg.addEventListener('click',()=>{
    registrarse();
})
}
function registrarse(){
    let registro = []
    let nombreReg = ''
    let usuarioReg = ''
    let emailReg = ''
    let domicilioReg = ''
    let localidadReg = ''
    let passwordReg = ''

    nombreReg = document.getElementById('nombreReg').value;
    usuarioReg = document.getElementById('usuarioReg').value;
    emailReg = document.getElementById('emailReg').value;
    domicilioReg = document.getElementById('domicilioReg').value;
    localidadReg = document.getElementById('localidadReg').value;
    passwordReg = document.getElementById('passwordReg').value;

    registro.push(nombreReg,usuarioReg,emailReg,domicilioReg,localidadReg,passwordReg)

    localStorage.setItem("registro", JSON.stringify(registro))
    
    if((nombreReg == 0) || (usuarioReg == 0) || (emailReg == 0) || (domicilioReg == 0) || (localidadReg == 0) || (passwordReg == 0) ){
        alert('todos los campos son obligatorios')
    } else {
        alert('Registro exitoso!')
        window.location = "../index.html"
        accederPag.classList.remove("ingresa")
        accederPag.classList.add("registradoNow")
    }
}