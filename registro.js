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
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Todos los campos son obligatorios',
            footer: '<a href="">Why do I have this issue?</a>'
        })
    } else {
        Swal.fire(
            'Excelente',
            'Registrado exitosamente',
            'success'
        )
        setTimeout(() => {
            window.location = "../index.html"
        }, 2000);
        
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
        let login = []
        let nombreLog = ''
        let passwordLog = ''
        nombreLog = document.querySelector('#usuario').value;
        passwordLog = document.querySelector('#password').value;
        login.push(nombreLog, passwordLog)
        localStorage.setItem("login", JSON.stringify(login))
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Has sido logueado exitosamente.',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(() => {
            location.href = "../index.html"
        }, 1500); 

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Los datos ingresados no corresponden a ningun usuario',
            footer: '<p>¿No tienes una cuenta? <a href="./registrarte.html">Registrate</a></p>'
        })
    }
}