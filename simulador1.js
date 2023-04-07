//********======REFERENCIAS DE BOTONES========*********
const cotizar   = document.querySelector('#cotizar');
const reset     = document.querySelector('#reset');

//************====REFERENCIA A LOS INPUTS=====*********/
const nombre     = document.querySelector('#nombre');
const correo     = document.querySelector('#correo');
const ciudad     = document.querySelector('#ciudad')
const residencia = document.querySelector('#residencia');
const telefono   = document.querySelector('#telefono');
const monto      = document.querySelector('#monto');
const cuotas     = document.querySelector('#cuotas');

//******FORMULARIO CARGAR LOS MENSAJES DE VALIDACION*********/
const formulario = document.querySelector('.formulario-carga');
const formularioRepuesta = document.querySelector('.formulario-repuesta');

//******VARIABLES GLOBALES*********/
let datos = {}
//****EXPRESION REGULAR PARA VALIDAR CORREO ELECTRONICO */
const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;


//**/==============*****EVENTOS**********=================//
//*******LLAMAMOS A LA FUNCION PARA CARGAR LAS ESCUCHAS*****
eventlisteners();
function eventlisteners() {
    //****CUANDO ARRANCA LA APP******
    document.addEventListener('DOMContentLoaded', cargarInicio);
    //******EVENTOS DE LOS INPUTS*****
    nombre.addEventListener('blur', validarCampo);
    correo.addEventListener('blur', validarCampo);
    ciudad.addEventListener('blur', validarCampo);
    residencia.addEventListener('blur',validarCampo);
    telefono.addEventListener('blur',validarTelefono);
    monto.addEventListener('blur',validarMonto);
    cuotas.addEventListener('blur',validarCampo);

}

//******====EVENTO DEL BOTON COTIZAR================//
cotizar.addEventListener('click',()=>{
    
    //SI HAY HTML CARGADO POR STORAGE LO BORRA
    const mensajeP = document.querySelector('h2')
    if(mensajeP){
        mensajeP.remove()
    }

    //SI HAY TARJETA CARGADO POR STORAGE LA BORRA 
    const card = document.querySelector('.card')
    if(card){
        card.remove()
    }
    

    //CAPTURA LOS DATOS QUE VIENEN POR FORMULARIO
    datos = {
        nombre : nombre.value,
        correo: correo.value,
        ciudad: ciudad.value,
        residencia: residencia.value,
        telefono: telefono.value,
        monto: monto.value,
        cuotas: cuotas.value
    }

    
    const spinner = document.querySelector('#spinner');
    //Habilito el Spinners
    spinner.style.display = 'flex';

    setTimeout(() => {
        //Lo dejo visble por 3 segundos 
        spinner.style.display = 'none';
        //Creo un mensaje que diga que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'La consulta de envio correctamente';
        parrafo.classList.add('enviado');
        formulario.appendChild(parrafo);
        setTimeout(() => {
            parrafo.remove();
            cargarPlan(datos);
        }, 2000);
        //CARGO EL STORAGE LA TARJETA
        sincronizarStorage(datos); 
        cotizar.disabled = true;
    }, 3000);

  
})

//******====EVENTO DEL BOTON RESET================//
reset.addEventListener('click',()=>{
    resetearFormulario();  
})


//***********************************FUNCIONES******************************************************/

//******************CARGA INICIO******************//
function cargarInicio() {
    cotizar.disabled = true;


    datos = JSON.parse(localStorage.getItem('tarjeta'));
    if(datos !== null){
        cargarPlan(datos);
    }else{
        const mensaje = document.createElement('h2')
        mensaje.textContent = 'Complete los campos'
        const borrar = document.querySelectorAll('h2');
        if(borrar.length === 0){
            formularioRepuesta.appendChild(mensaje)
        }
        
    }
    
}

//******************GUARDADO EN STORAGE******************//
function sincronizarStorage(datos) {
    //FUNCION QUE PERMITE CARGAR LA TARJETA EN EL STORAGE
    localStorage.setItem('tarjeta', JSON.stringify(datos))
}


//******************VALIDA LOS CAMPOS******************//
function validarCampo(e) {
    
    //******CAMPO INPUT TIPO TEXT*********//
    if(e.target.type === 'text'){
        if(e.target.value.length > 0){
            e.target.classList.remove('errorDatos');
            e.target.classList.add('correcto');
            const error = document.querySelector('.error');
            if(error){
                error.remove();
            }
            validacion();
            }else{
            e.target.classList.remove('correcto');
            e.target.classList.add('errorDatos');
            mostrarError('Todos los campos son obligatorios');
        } 
    }

    //******CAMPO INPUT TIPO EMAIL*********//
    if(e.target.type === 'email'){
        if(e.target.value.length === 0){
            e.target.classList.remove('correcto');
            e.target.classList.add('errorDatos');
            mostrarError('Todos los campos son obligatorios')
        }

    if(e.target.value.length > 0){
        e.target.classList.remove('errorDatos');
        const error = document.querySelector('.error');
        if(error){
            error.remove();
            }

    if(validarEmail.test(e.target.value)){
        e.target.classList.add('correcto');
        errorEmail = document.querySelector('.errorEmail');
            if(errorEmail){
                errorEmail.remove()
                 }
                validacion();
            }else{
                e.target.classList.remove('correcto');
                e.target.classList.add('errorDatos');
                mostrarError('Ingrese un correo valido');
            }
        }
    }
    //******CAMPO INPUT TIPO SELECT ONE*********//
    if(e.target.type === 'select-one'){
        if(e.target.value === 'Presione aqui'){
            e.target.classList.remove('correcto');
            e.target.classList.add('errorDatos');
            mostrarError('Todos los campos son obligatorios');
        }
        else{
            e.target.classList.remove('errorDatos');
            e.target.classList.add('correcto');
            const error = document.querySelector('.error')
            if(error){
                error.remove()
            }
            validacion();
        }
    }


    
}

//******************VALIDA EL CAMPO TELEFONO******************//
function validarTelefono(e) {
    if(e.target.value.length === 0){
        e.target.classList.remove('correcto');
        e.target.classList.add('errorDatos');
        mostrarError('Todos los campos son obligatorios');
    }else 
        if(e.target.value.length > 0 && e.target.value.length != 10){
            const error = document.querySelector('.error');
            if(error){
                error.remove()
            }
            e.target.classList.remove('correcto');
            e.target.classList.add('errorDatos');
            mostrarError('Telefono no Valido')

    }else if (e.target.value.length === 10){
        const error = document.querySelector('.errorTelefono');
        if(error){
            error.remove();
        }
        e.target.classList.remove('errorDatos');
        e.target.classList.add('correcto');
        validacion();
    }
}


//******************VALIDA EL CAMPO MONTO******************//
function validarMonto(e) {
   if(e.target.value >= 5000){
    e.target.classList.remove('errorDatos');
    e.target.classList.add('correcto');
    const error = document.querySelector('.errorMonto')
    if(error){
        error.remove();
    }
    validacion()
   }
   else if(e.target.value < 5000){
    e.target.classList.remove('correcto');
    e.target.classList.add('errorDatos');
    mostrarError('Monto mayor a 5000')
   }
}


//******************VALIDA QUE TODOS LOS CAMPOS CUMPLAN PARA HABILITAR EL COTIZAR******************//
function validacion() {
    if(nombre.value.length > 0 &&  validarEmail.test(correo.value) && nombre.value.length > 0 && residencia.value !== 'Presione aqui' && telefono.value.length === 10 && monto.value >= 5000 && cuotas.value !=='Presione aqui'){
        cotizar.disabled = false;

        //
        cargarClima(ciudad.value,residencia.value);
    }
}

//******************MUESTRA LOS ERRORES SEGUN EL MENSAJE******************//
function mostrarError(mensaje) {
    if(mensaje === 'Todos los campos son obligatorios'){
        const mensajeError = document.createElement('p');
        mensajeError.textContent = mensaje
        mensajeError.classList.add('error');
        const errores = document.querySelectorAll('.error')
        if(errores.length === 0){
            formulario.appendChild(mensajeError);
         }    
    }

    if(mensaje === 'Ingrese un correo valido'){
        const mensajeError = document.createElement('p');
        mensajeError.textContent = mensaje
        mensajeError.classList.add('errorEmail');
        const errores = document.querySelectorAll('.errorEmail')
        if(errores.length === 0){
            formulario.appendChild(mensajeError);
         }    
    }

    if(mensaje === 'Monto mayor a 5000'){
        const mensajeError = document.createElement('p');
        mensajeError.textContent = mensaje
        mensajeError.classList.add('errorMonto');
        const errores = document.querySelectorAll('.errorMonto')
        if(errores.length === 0){
            formulario.appendChild(mensajeError);
         }    
    }

    if(mensaje === 'Telefono no Valido'){
        const mensajeError = document.createElement('p');
        mensajeError.textContent = mensaje
        mensajeError.classList.add('errorTelefono');
        const errores = document.querySelectorAll('.errorTelefono')
        if(errores.length === 0){
            formulario.appendChild(mensajeError);
         }    
    }

    if(mensaje === 'No podemos encontrar Clima de su ciudad'){
        const mensajeError = document.createElement('p');
        mensajeError.textContent = mensaje
        mensajeError.classList.add('errorCiudad');
        const errores = document.querySelectorAll('.errorTelefono')
        if(errores.length === 0){
            formulario.appendChild(mensajeError);
            setTimeout(() => {
                mensajeError.remove()
            }, 2000);
         }    
    }


    



}

//******************RESETEA TODO EL FORMULARIO******************//
function resetearFormulario() {

    nombre.value = '';
    correo.value = '';
    ciudad.value = '';
    residencia.value = 'Presione aqui';
    telefono.value = '';
    monto.value = '';
    cuotas.value = 'Presione aqui';

    const tarjeta = document.querySelector('.card');
    if(tarjeta){
        tarjeta.remove();
    }

    const tarjeta1 = document.querySelector('.card');
    if(tarjeta1){
        tarjeta1.remove();
    }

    const obligatorio = document.querySelector('.error');
    if(obligatorio){
        nombre.classList.remove('errorDatos');
        nombre.classList.remove('correcto');
        correo.classList.remove('errorDatos');
        correo.classList.remove('correcto');
        ciudad.classList.remove('errorDatos');
        ciudad.classList.remove('correcto');
        residencia.classList.remove('errorDatos');
        residencia.classList.remove('correcto');
        telefono.classList.remove('errorDatos');
        telefono.classList.remove('correcto');
        monto.classList.remove('errorDatos');
        monto.classList.remove('correcto');
        cuotas.classList.remove('errorDatos');
        cuotas.classList.remove('correcto');
        obligatorio.remove();
    }

    const montoError = document.querySelector('.errorMonto');
    if(montoError){
        montoError.remove()
    }

    const telefonoError = document.querySelector('.errorTelefono');
    if(telefonoError){
        telefonoError .remove()
    }

    const errorEmail= document.querySelector('.errorEmail');
    if(errorEmail){
        errorEmail.remove()
    }

    cargarInicio()

}


//******************CREA LA TARJETA SEGUN LOS DATOS PROPORCIONADOS POR EL USUARIO ******************//
function cargarPlan(datos){

    //Aplico destructuring al objeto
    const {nombre,correo,monto,cuotas} = datos
    
    //calculo el valor de cuota neto 
    let valorCuota = monto/cuotas;
    
    //creo la tarjeta div
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card');
    tarjeta.innerHTML = `<img src="img/pesos.png" class="card-img-top" alt="aca va la imagen">
                         <div class="card-body">
                         <h5 class="card-title">Cuotas : ${cuotas}</h5>
                         <p class="card-text">Nombre : ${nombre}</p>
                         <p class="card-text">Correo: ${correo}</p>
                         <p class="card-text">Monto: $ ${monto}</p>
                         <p class="card-text">Valor Cuota : $ ${valorCuota.toFixed(2)}</p>
                         <p class="card-text">Valor Recargo: ${obtenerRecargo(Number(cuotas))}%</p>
                         <p class="card-text">Valor + Recargo $ ${(valorCuota+valorCuota*obtenerRecargo(Number(cuotas))/100).toFixed(2)}</p>
                         <button type="button" id="solicitar" class="btn btn-success">Solicitar</button>
                         <button type="button" id="dolar" class="btn btn-primary">Valor Dolar</button>
                         </div>



                        `;

    formularioRepuesta.appendChild(tarjeta);

   

    //************BOTON SOLICITAR*****/
    const solicitar = document.querySelector('#solicitar')
    const dolar = document.querySelector('#dolar')
    solicitar.disabled = false;
    dolar.disabled = false;
    
    solicitar.addEventListener('click',()=>{
         solicitar.disabled = true;
         dolar.disabled = true;
         cargarCbu(datos);

    });

    //************BOTON DOLAR****/
    dolar.addEventListener('click',()=>{
         dolar.disabled = true;

        const spinner = document.querySelector('#spinner');
        spinner.style.display = 'flex';

        const tarjeta = document.querySelector('.card');
            if(tarjeta){
                tarjeta.remove();
            }

         setTimeout(() => {
            const spinner = document.querySelector('#spinner');
            spinner.style.display = 'none';
            buscarDolar(datos);
        }, 2000);
          
    });

   
}


//FUNCION QUE NOS PERMITE OBTENER EL RECARGO SEGUN LA CANTIDAD DE CUOTAS
function obtenerRecargo(cuotas) {


 const planes = [

            {cuotas: 12, recargo: 5},
            {cuotas: 24, recargo: 4},
            {cuotas: 36, recargo: 3},
            {cuotas: 48, recargo: 2},
         ]

 const resultado = planes.find( plan => plan.cuotas === cuotas );
    
  const {recargo} = resultado
  return recargo
    
}

//******************CARGA LA TARJETA PARA DEPOSITAR LA SUMA PEDIDA******************//
function cargarCbu(datos) {

    const {nombre,correo,monto} = datos
    

    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card');
    tarjeta.innerHTML =`<img src="img/banco.png" class="card-img-top" alt="aca va la imagen">
                        <div class="card-body">
                        <h5 class="card-title">Datos Personales</h5>
                        <p class="card-text">Nombre : ${nombre}</p>
                        <p class="card-text">Correo: ${correo}</p>
                        <p class="card-text">Monto a depositar: $ ${monto}</p>
                        <input type="number" id="cbu" placeholder="ingrese su cbu 21 digitos">
                        <button type="button"  id="depositar" class="btn btn-danger">Depositar</button>
                        `;      
    formularioRepuesta.appendChild(tarjeta);

    const cbu = document.querySelector('#cbu')
    const depositar = document.querySelector('#depositar')
    
    depositar.addEventListener('click',()=>{
        if(cbu.value.length === 21 ){
            Swal.fire('Deposito realizado correctamente');
            cbu.value = '';
            depositar.disabled = true;
            setTimeout(() => {
                tarjeta.remove();
            }, 2000);
            
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cbu invalido 21 digitos por favor!',
              })
            depositar.disabled = false;
            
        }
    })

    

}



//************************************SECCION APIS**************************************** */

//*****Cargar clima mediante API */
function cargarClima(ciudad,residencia) {
    
    const appId = 'a30625da3b2c5601bf19a969f581822b';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${residencia}&appid=${appId}`;

    fetch(url)
    .then(repuesta => repuesta.json())
    .then( datos =>{
        if(datos.cod ==='404'){
            mostrarError('No podemos encontrar Clima de su ciudad');
            return;
        }

        //IMPRIMO LOS DATOS AL HTML
        mostrarCLima(datos);


    }) 
}

//*****Mostrar el clima API  en HTML ****/
function mostrarCLima(datos) {
    const {main: {temp, temp_max, temp_min} } = datos;

    const centigrados = temp - 273.15;
    //Creo el P para despues agregarlo al DOM
    const actual = document.createElement('p');
    const entrada = document.createElement('p');

    actual.innerHTML = `${centigrados.toFixed(0)} &#8451`;
    actual.classList.add('font-bold');

    entrada.textContent = 'Temperatura actual en su Ciudad'
    entrada.classList.add('font-bold');

    //CREO EL DIV PARA PONER DENTRO AL PARRAFO
    const resultadoDiv = document.createElement('div');
    resultadoDiv.appendChild(entrada)
    resultadoDiv.classList.add('text-center');
    resultadoDiv.appendChild(actual);

    formulario.appendChild(resultadoDiv)

    setTimeout(() => {
        resultadoDiv.remove();
    }, 6000);
    
}


function buscarDolar(datos) {
    const url = `https://api.bluelytics.com.ar/v2/latest`;

    fetch(url)
        .then(repuesta=> repuesta.json())
        .then(dolar =>{
        
            const {oficial:{value_sell}} = dolar

            const tarjeta = document.querySelector('.card');
            if(tarjeta){
                tarjeta.remove();
            }
            cargarPlanDolar(datos,value_sell);

        
        });
}

function cargarPlanDolar(datos,dolar) {
     const {nombre,correo,monto,cuotas} = datos
    
    
    let valorDolar = monto/dolar
    let valorCuota = valorDolar/cuotas;
    
    //creo la tarjeta div
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card');
    tarjeta.innerHTML = `<img src="img/dolar.jpg" class="card-img-top" alt="aca va la imagen">
                         <div class="card-body">
                         <h5 class="card-title">Cuotas : ${cuotas}</h5>
                         <p class="card-text">Nombre : ${nombre}</p>
                         <p class="card-text">Correo: ${correo}</p>
                         <p class="card-text">Cotizacion Dolar $USD${dolar}</p>
                         <p class="card-text">Monto: $USD ${valorDolar.toFixed(2)}</p>
                         <p class="card-text">Valor Cuota : $USD ${valorCuota.toFixed(2)}</p>
                         <p class="card-text">Valor Recargo: ${obtenerRecargo(Number(cuotas))}%</p>
                         <p class="card-text">Valor + Recargo $USD ${(valorCuota+valorCuota*obtenerRecargo(Number(cuotas))/100).toFixed(2)}</p>
                         <button type="button" id="solicitar" class="btn btn-success">Solicitar</button>
                         <button type="button" id="pesos" class="btn btn-warning">Valor Pesos</button>
                         </div>

                        `;

    formularioRepuesta.appendChild(tarjeta);

    //************BOTON SOLICITAR*****/
    const solicitar = document.querySelector('#solicitar')
    const pesos = document.querySelector('#pesos')
    solicitar.disabled = false;
    pesos.disabled = false;

    solicitar.addEventListener('click',()=>{
         solicitar.disabled = true;
         pesos.disabled = true;
         cargarCbuDolar(datos,dolar);

    });

    //************BOTON PESOS****/
    pesos.addEventListener('click',()=>{
         pesos.disabled = true;

         const tarjeta = document.querySelector('.card');
            if(tarjeta){
                tarjeta.remove();
            }

        const spinner = document.querySelector('#spinner');
        spinner.style.display = 'flex';

        setTimeout(() => {
            spinner.style.display = 'none';
            cargarPlan(datos);
        }, 2000);
      
    });
    
}

function cargarCbuDolar(datos,dolar) {
    const {nombre,correo,monto} = datos
    
    valorDolar = monto/dolar

    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card');
    tarjeta.innerHTML =`<img src="img/wester.png" class="card-img-top" alt="aca va la imagen">
                        <div class="card-body">
                        <h5 class="card-title">Datos Personales</h5>
                        <p class="card-text">Nombre : ${nombre}</p>
                        <p class="card-text">Correo: ${correo}</p>
                        <p class="card-text">Monto a depositar: $USD ${valorDolar.toFixed(2)}</p>
                        <input type="number" id="cbu" placeholder="ingrese su cbu 21 digitos">
                        <button type="button"  id="depositar" class="btn btn-danger">Depositar</button>
                        `;      
    formularioRepuesta.appendChild(tarjeta);

    const cbu = document.querySelector('#cbu')
    const depositar = document.querySelector('#depositar')
    
    depositar.addEventListener('click',()=>{
        if(cbu.value.length === 21 ){
            Swal.fire('Deposito realizado correctamente');
            cbu.value = '';
            depositar.disabled = true;
            setTimeout(() => {
                tarjeta.remove();
            }, 2000);
            
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cbu invalido 21 digitos por favor!',
              })
            depositar.disabled = false;
            
        }
    })

}




