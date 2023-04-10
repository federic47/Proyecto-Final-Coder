# Proyecto-Final-Koss Federico

# Autor: Koss Federico Damian Comision 39450

# Fundamentacion del proyecto ---- SIMULADOR DE PRESTAMO ONLINE ----- 

# Con el siguiente programa el usuario podra interacturar con un simulador de prestamos online enfocado en moneda argentina $pesos Argentinos pero con la opcion de mostrar la cotizacion a dolar ofical donde la cotizacion de mismo se realiza por consulta de una API

# Seguir las siguientes pasos:
# 1- Validar los campos del formulario con informacion correcta. Los campos no pueden estar vacios.
# 2- En el campo correo electronico el usuario debera validar un correo valido es decir , con un @ y dominio.com esto se logro utilizando expresiones regulares.
# 3- Los placeholder de los inputs indica las condiciones que deben cumplir el campo para ser validado.
# 4- Todos los inputs estan asociados el evento "blur" es decir cuando el usuario hace click afuera del mismo se dispara la validacion del mismo.
# 5 - Cuando todos los campos son validados se habilitara el boton cotizar para disparar la consulta de validacion. Mientras eso sucede el formulario consultara mediante un api el estado y clima de su ciudad segun la que halla ingresado el usuario en el formulario.
# 6- Mientras se realiza la consulta se habilitara un Spinners que simulara la consulta a base de datos.
# 7- Luego aparecera la tarjera donde le va a indicar el monto que solicito y las cuotas con sus respectivos valores y cargos.
# 8- El Usuario podra elegir solicitar dicho prestamo o pasarlo a valor dolar oficial. En ambos casos cuando soliciten dicho prestamo se habilitara una tarjeta que indicara el monto a depositar ya sea en dolares o pesos y y un cbu valido de 21 digitos. Si el usuario no ingresa un cbu valido mediante un sweet alert le indicara un mensaje de error indicandole el mismo. De lo contrario le enviara un mensaje de deposito correcto y la tarjeta desaparecera.
# 9- El boton reset pondra a los campos en sus valores originales pero cargara la informacion del storage que se realizo en ultima instancia.


# Las api consultadas son:
# Para consultar cotizacion del dolar : https://bluelytics.com.ar/#!/api
# Para consultar la temperatura de la ciudad: https://openweathermap.org/
