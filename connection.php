<?php

$servername="localhost";
$username="root";
$password="";
$dbname="quiz";

$conn=mysqli_connect($servername,$username,$password,$dbname);

if($conn){
    //echo"connection okk";

}
else{
    echo "connection failed" .mysqli_connect_error();

}
?>