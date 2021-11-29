<?php 

	class Juego{

	    private $conecta;

	    public function __construct(){
	    	$this->conecta=Conectar::conexion();
	    }

	    //Consultar Inscripciones a eventos
		public function consultar_Puntajes(){
			$query_bs_acces = "SELECT * FROM puntaje ORDER BY puntaje DESC LIMIT 5";
			//echo $query_bs_acces;
			$bs_acces = mysqli_query( $this->conecta, $query_bs_acces);
			if ($bs_acces) {
				$totalRows_bs_acces = mysqli_num_rows($bs_acces);
				if($totalRows_bs_acces >0){
		        	$info = $bs_acces;
		    	}else{
		        	$info = false;
		    	} 
			}else{
				$info = false;
			}
		    return $info;   
		}

		//Inscribir Beneficiarios
		public function registrar_Puntaje($jugador,$nivel,$puntaje){

			$fecha=date("Y-m-d H:i:s");

			$query_bs_acces = "INSERT INTO puntaje(
				puntaje_Id, 
				jugador, 
				nivel, 
				puntaje) VALUES (
				NULL,  
				'$jugador', 
				'$nivel', 
				'$puntaje')";

			//var_dump($query_bs_acces);
			$bs_acces = mysqli_query( $this->conecta, $query_bs_acces);
			return $bs_acces;
		}
	}

?>