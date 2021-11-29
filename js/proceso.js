
function random(cantidad){
	var result = [];

	for(var i=0;i<cantidad;i++){
		 // Genera un número de 0 a 25
   		var ranNum = Math.ceil(Math.random() * 25);
		 // El ASCII de la letra mayúscula'A 'es 65, y el código ASCII de A ~ Z es 65 + 0 ~ 25;
		 // Luego llame a String.fromCharCode () para pasar el valor ASCII, devuelva el carácter correspondiente y presione en la matriz
		//alert (ranNum);
    	result.push(String.fromCharCode(65+ranNum));
    	result.push(ranNum+65);
	}
	return result;
}
function iniciar(){
	document.getElementById('keyboard').style.display = "block";
	document.getElementById('comenzar').style.display = "none";
	localStorage.setItem('letra_S','');
	localStorage.setItem('numero_S','');
	localStorage.setItem('nivel',1);
	localStorage.setItem('puntaje',0);
	localStorage.setItem('estado',1);
	generar_Letra();
}

function generar_Letra(){	
	var resultado = random(1);
	var letra = resultado[0];
	var numero = resultado[1];

	localStorage.setItem('letra_S',letra);
	localStorage.setItem('numero_S',numero);

	var div = document.querySelector("div[data-key='"+numero+"']");
	var nivel = localStorage.getItem('nivel');
	document.querySelector('#nivel').innerText = nivel;

	//console.log(div);
	div.classList.remove("active","success","fail");
	div.classList.add("active");
	setTimeout(function() { opacar(div); }, 300);
}

function opacar(div){
	div.classList.remove("active");
}

function capturar_Pantalla(){
	//alert(String.fromCharCode(evt.keyCode));
	document.querySelectorAll('div.key').forEach( elem => {		
		elem.addEventListener('click', e => {
		    //console.log();
		    validar_Respuesta(e.target.dataset.key);
		});
	});
}

function validar_Respuesta(rta){
	var estado = localStorage.getItem('estado');
	var correcta = localStorage.getItem('numero_S');
	var nivel = localStorage.getItem('nivel');
	var seleccion = document.querySelector("div[data-key='"+rta+"']");
	//alert(estado);
	if (estado==1) {
		if (rta==correcta) {
			seleccion.classList.add("active", "success");
			aumentar_Puntaje();
			var puntaje = localStorage.getItem('puntaje');
			if (puntaje==1000) {
				localStorage.setItem('estado',2);
				setTimeout(function() { alert('¡FELICITACIONES! Has superado todos los niveles. registra tu puntaje.'); }, 500);
				mostrar_Registrar();
			}else{
				aumentar_Nivel();
				//alert('¡EXCELENTE! avanzas al siguiente nivel. Puntos acumulados '+localStorage.getItem('puntaje'));
				setTimeout(function() { generar_Letra(); }, 1000);
			}
			setTimeout(function() { opacar(seleccion); }, 1000);
		}else{
			seleccion.classList.add("active", "fail");
			document.getElementById('continuar').style.display = "none";
			localStorage.setItem('estado',2);
			setTimeout(function() { alert('¡UPS! No has seleccionado la letra correcta. Registra tu puntaje e intenatalo nuevamente.'); }, 500);
			setTimeout(function() { opacar(seleccion); }, 1000);
			setTimeout(function() { mostrar_Registrar(); }, 1000);
		}
	}else{

	}
}

function aumentar_Puntaje(){
	var puntaje_Actual = localStorage.getItem('puntaje');
	var puntaje_Nuevo = Number(puntaje_Actual)+100;
	localStorage.setItem('puntaje',puntaje_Nuevo);
}

function aumentar_Nivel(){
	var nivel_Actual = localStorage.getItem('nivel');
	var nivel_Nuevo = Number(nivel_Actual)+1;
	localStorage.setItem('nivel',nivel_Nuevo);
}

function capturar_Teclado(evt){	
	presionada = evt.keyCode;
	var mayus = evt.getModifierState && evt.getModifierState( 'CapsLock' );
    //console.log(mayus); //que será verdadero cuando presiones Bloq Mayus
    if(mayus){
       var rta = presionada;
    }else{
       var rta = Number(presionada)-32;
    }
    validar_Respuesta(rta);
}

function mostrar_Registrar(){
	document.getElementById('keyboard').style.display = "none";
	var div_Datos=document.getElementById('div_Datos');
	var nivel = localStorage.getItem('nivel');
	var puntaje = localStorage.getItem('puntaje');
	div_Datos.innerHTML=
	'<div class="formulario">'
		+'<form action="controladores/controlador.php" method="POST" id="registrar">'
			+'<label>NOMBRE DEL JUGADOR </label>'
			+'<input type="text" name="jugador" id="jugador" placeholder="Ingrese su nombre" maxlength="100" onkeyup="mayus(this)" onkeypress="return letras(event);">'
			+'<input type="text" name="nivel" id="nivel_Form" required readonly hidden value="'+nivel+'">'
			+'<input type="text" name="puntaje" id="puntaje_Form" required readonly hidden value="'+puntaje+'"><hr>'
			+'<input type="submit" name="registrar" id="registrar" value="REGISTRAR">'
		+'</form>'
	+'</div>'
	+'<script>'
		const formulario = document.getElementById("registrar");
		formulario.addEventListener("submit", function (event) {
		  // si el campo de correo electrónico es válido, dejamos que el formulario se envíe
		  event.preventDefault();
		  var jugador = document.getElementById('jugador').value;
		  var nivel = localStorage.getItem('nivel');
		  var puntaje = localStorage.getItem('puntaje');
		  var nivel_Form = document.getElementById('nivel_Form').value;
		  var puntaje_Form = document.getElementById('puntaje_Form').value;
		  if(jugador.length == 0) {
		    alert("Ingresa el nombre del jugador");
		    return;
		  }
		  if(nivel != nivel_Form) {
		    alert("Has modificado el nivel de forma manual. No hagas trampa.");
		    return;
		  }
		  if(puntaje != puntaje_Form) {
		    alert("Has modificado el puntaje de forma manual. No hagas trampa.");
		    return;
		  }
		  this.submit()
		  //localStorage.clear();
		});
	+'</script>';
}

function letras(e) {
    var key = e.keyCode || e.which,
      tecla = String.fromCharCode(key).toLowerCase(),
      letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
      especiales = [8, 37, 39, 46],
      tecla_especial = false;

    for (var i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      return false;
    }
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}
