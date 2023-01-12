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
    let logueado = ''
    
    nombreReg = document.getElementById('nombreReg').value;
    usuarioReg = document.getElementById('usuarioReg').value;
    emailReg = document.getElementById('emailReg').value;
    domicilioReg = document.getElementById('domicilioReg').value;
    localidadReg = document.getElementById('localidadReg').value;
    passwordReg = document.getElementById('passwordReg').value;
    

    registro.push(nombreReg,usuarioReg,emailReg,domicilioReg,localidadReg,passwordReg,logueado)

    localStorage.setItem("registro", JSON.stringify(registro))
    
    if((nombreReg == 0) || (usuarioReg == 0) || (emailReg == 0) || (domicilioReg == 0) || (localidadReg == 0) || (passwordReg == 0) ){
        alert('todos los campos son obligatorios')
    } else {
        alert('Registro exitoso! Bievenido')
        window.location = "../index.html"
    }
}
const usuarioLog = document.getElementById('usuario')
const passwordLog = document.getElementById('password')

const registro = localStorage.getItem('registro')
if(registro == null){
    datosRegistro = []
} else{
    datosRegistro = JSON.parse(registro);
}

const botonAcceder = document.getElementById('button')
botonAcceder.addEventListener('click',login)
function login(){
    if((usuarioLog.value == datosRegistro[1]) && (passwordLog.value == datosRegistro[5])){
        alert('logueado exitosamente')
        location.href = "../index.html"
    } else {
        alert('datos incorrectos, vuelva a intentarlo')
    }
}