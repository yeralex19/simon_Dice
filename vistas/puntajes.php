<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" type="text/css" href="../css/styles.css">
    <script src="../js/proceso.js"></script>
	<title>Puntajes</title>
</head>
<body>
	<div class="keyboard" style="text-align: center;"> 
		<h3>TABLA DE PUNTAJES</h3> 
      	<div class="row">
			<?php 
				echo"
					<table border=1 style='text-align: center;width:50%'>
				      <tr>
				        <th>JUGADOR</th>
				        <th>NIVEL</th>
				        <th>PUNTAJE</th>
				      </tr>
				";
				while($row = $consultar_Puntajes->fetch_assoc()){
					echo "
						<tr>
				        	<td>".$row['jugador']."</td>
				        	<td>".$row['nivel']."</td>
				        	<td>".$row['puntaje']."</td>
				      	</tr> 
					";
				}
				echo "</table>";
			?>
		</div>
	</div>
	<hr>
	<div class="row">
		<p><a href='../index.html' style='color:white;cursor:pointer'>Haz clic aquí para volver a jugar</a></p>
	</div>
</body>
</html>