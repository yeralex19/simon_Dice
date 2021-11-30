const niveles = 10
let teclas = generarTeclas(niveles)
localStorage.setItem('puntaje',0);

function siguienteNivel(nivelActual) {
  localStorage.setItem('nivel',nivelActual);
  if (nivelActual == niveles) {
    var puntaje = Number(nivelActual)*100;
    localStorage.setItem('puntaje',puntaje);
    mostrar_Registrar()
    return swal({
      title: 'Ganaste',
      text: '¡FELICITACIONES! Has superado todos los niveles. registra tu puntaje y consulta la tabla de posiciones.',
      type: 'success'
    })   
  }
  swal({
    title: 'Vas a jugar el nivel '+nivelActual+ ', suerte.',
    text: 'Debes estar pendiente de las letras resaltadas en color blanco.',
    timer: 3000,
    showCancelButton: false,
    showConfirmButton: false
  })
  document.getElementById('keyboard').style.display = "block";
  document.getElementById('comenzar').style.display = "none";
  for (let i = 1; i <= nivelActual; i++) {
    setTimeout(function() {
      activar(teclas[i])
    }, (1000 * i) + 3000)
  }
  let indice = 1;
  let teclaActual = teclas[indice]
  window.addEventListener('keydown', onkeydown)
  window.addEventListener('keydown', onkeydown)
  function onkeydown(ev) {
    if (ev.keyCode == teclaActual) {
      activar(teclaActual, {
        success: true
      })
      indice++
      if (indice > nivelActual) {
        var puntaje = Number(nivelActual)*100;
        localStorage.setItem('puntaje',puntaje);
        window.removeEventListener('keydown', onkeydown)
        setTimeout(() => siguienteNivel(indice), 1500)
      }
      teclaActual = teclas[indice]
    } else {
      activar(ev.keyCode, {
        fail: true
      })
      window.removeEventListener('keydown', onkeydown)
      swal({
        title: 'Respuesta incorrecta',
        text: '¡LO SENTIMOS! No has ingresado la secuencia correcta. Registra tu puntaje e intenatalo nuevamente.',
        type: 'error',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Jugar Nuevamente',
        confirmButtonText:'Registrar Puntaje',
        closeOnConfirm: true
      }, function(resp) {
        if (resp) {
          mostrar_Registrar()
        }else{
          teclas = generarTeclas(niveles)
          siguienteNivel(1)
        }
      })
    }
  }
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
    +'<div class="row">'
      +'<p><a href="index.html" style="color:white;cursor:pointer">Haz clic aquí para volver a jugar</a></p>'
    +'</div>'
  +'<script>'
    const formulario = document.getElementById("registrar");
    formulario.addEventListener("submit", function (event) {
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

function capturar_Pantalla(){
  //alert(String.fromCharCode(evt.keyCode));
  //localStorage.setItem('estado',0);
  document.querySelectorAll('div.key').forEach( elem => {   
    elem.addEventListener('click', e => {
        //console.log();
        //validar_Respuesta(e.target.dataset.key);
        validar_Respuesta_Prueba(e.target.dataset.key);
    });
  });
}

function generarTeclas(niveles) {
  return new Array(niveles).fill(0).map(generarTeclaAleatoria)
}

function generarTeclaAleatoria() {
  const min = 65
  const max = 90
  return Math.round(Math.random() * (max - min) + min)
}

function getElementByKeyCode(keyCode) {
  return document.querySelector('[data-key="'+keyCode+'"]')
}

function activar(keyCode, opts = {}) {
  const tecla = getElementByKeyCode(keyCode)
  tecla.classList.add('active')
  if (opts.success) {
    tecla.classList.add('success')
  } else if (opts.fail) {
    tecla.classList.add('fail')
  }
  setTimeout(() => inactiva(tecla), 500)
}

function inactiva(tecla) {
  tecla.className = 'key'
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