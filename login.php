<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Signin Page</title>
<link rel="stylesheet" href="login.css">
<style>
  </style>
</head>
<body>

<div class="container">
  <h2>Login</h2>
  <p><i>Quiz</p>
  <form action="login.php" method="post">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>

    <input type="submit" value="Lognin">
    
  </form>
  <div class="links">
    <a href="FORGET.HTML">Forgot Password?</a>
  </div>
  
</div>
</body>
</html>

<?php
$login = false;
$showError = false;
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    include 'connection.php';
    $username = $_POST["username"];
    $password = $_POST["password"];

    
   
        $sql = "select * from stu_register where NAME='$username' AND password='$password'";
        $result = mysqli_query($conn, $sql);
        $num = mysqli_num_rows($result);
        if ($num == 1){
           $login = true;
           session_start();
           $_SESSION['loggedin'] = true;
           $_SESSION['username'] = $username;
           header("location: level.html");
        }
        else {
           $showError = "Invalid Credentials"; 
        }
}

?>