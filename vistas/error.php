<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" type="text/css" href="../css/styles.css">
    <script src="../js/proceso.js"></script>
	<title>Error</title>
</head>
<body>
	<?php 
		if(isset($error)){
	        if(empty($error)){
	            echo "CÓDIGO INVÁLIDO";
	            echo "<p><a href='../index.html' style='color:white;cursor:pointer'>Haz clic aquí para volver a jugar</a></p>";
	        }else{
	           switch ($error) {
	           	case '1':
	           		echo "Error registrando el puntaje. Intenta en otro momento";
	            	echo "<p><a href='../index.html' style='color:white;cursor:pointer'>Haz clic aquí para volver a jugar</a></p>";
	           	break;
	           	case '2':
	           		echo "Error listando los puntajes. Intenta en otro momento";
	            	echo "<p><a href='../index.html' style='color:white;cursor:pointer'>Haz clic aquí para volver a jugar</a></p>";
	           	break;
	           	case '3':
	           		for( $contador=0; $contador < count($aErrores); $contador++ )
                	echo $aErrores[$contador]."<br/>";

	            	echo "<p><a href='../index.html' style='color:white;cursor:pointer'>Haz clic aquí para volver a jugar</a></p>";
	           	break;	           	
	           	default:
	           		echo "Error no específicado. Notifica al administrador";
	            	echo "<p><a href='../index.html' style='color:white;cursor:pointer'>Haz clic aquí para volver a jugar</a></p>";
	           	break;
	           }	              
	        }
	    }
	?>	
</body>
</html>
