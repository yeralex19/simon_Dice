<?php
    //conexión a base de datos
    require_once("../config/conecta.php");
    //Llamada al modelo
    require_once("../modelos/modelo.php");
	// Arrays para guardar mensajes y errores:
    $aErrores = array();
    $aMensajes = array();
    // Patrón para usar en expresiones regulares (admite letras acentuadas y espacios):
    $patron_texto = "/^[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ\s]+$/";
    // Comprobar si se ha enviado el formulario:
    if(!empty($_POST) )
    {
        // Mostrar la información recibida del formulario:
        //print_r( $_POST );
        //echo "<hr/>";
        // Comprobar si llegaron los campos requeridos:
        if(isset($_POST['jugador']) && isset($_POST['nivel']) && isset($_POST['puntaje'])){
            // Nombre:
             if(empty($_POST['jugador'])){
                $aErrores[] = "Debe especificar el nombre del jugador";
            }else{
                // Comprobar mediante una expresión regular, que sólo contiene letras y espacios:
                if(preg_match($patron_texto, $_POST['jugador'])){
                    $aMensajes[] = "Jugador: [".$_POST['jugador']."]";
                }else{
                    $aErrores[] = "El nombre sólo puede contener letras y espacios";
                }     
            }
            // Nivel:
            if( is_numeric($_POST['nivel'])){
                $aMensajes[] ="Nivel: [".$_POST['nivel']."]";
            }else{
                $aErrores[] = "El Nivel debe corresponder a un número.";
            }
            // Puntaje:
            if( is_numeric($_POST['puntaje'])){
                $aMensajes[] ="Puntaje: [".$_POST['puntaje']."]";
            }else{
                $aErrores[] = "El Puntaje debe corresponder a un número.";
            }
        }else{
            echo "<p>No se han especificado todos los datos requeridos.</p>";
        }
        // Si han habido errores se muestran, sino se porcede a registrar en la base de datos
        if( count($aErrores) > 0 ){
            // Mostrar los errores:
            $error='3';
            require_once("../vistas/error.php");
        }else{
            // Registrar en base de datos
            $jugador=filter_var($_POST['jugador'] , FILTER_SANITIZE_STRING);
            $nivel=filter_var($_POST['nivel'] , FILTER_SANITIZE_STRING);
            $puntaje=filter_var($_POST['puntaje'] , FILTER_SANITIZE_STRING);

            $juego=New Juego();
            $registrar_Puntaje=$juego->registrar_Puntaje($jugador,$nivel,$puntaje);
            if (!$registrar_Puntaje) {
                $error='1';
                require_once("../vistas/error.php");
            }else{
                $consultar_Puntajes=$juego->consultar_Puntajes();
                if(!$consultar_Puntajes) {
                    $error='2';
                    require_once("../vistas/error.php");
                }else{
                    require_once("../vistas/puntajes.php");
                }
            }
        }
    }
    else
    {
        $error='3';
        require_once("../vistas/error.php");
    }
?>