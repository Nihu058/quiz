
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Register Page</title>
<link rel="stylesheet" href="register.css">
<style>
 
</style>
</head>
<body>

<div class="container">
  <h2>Register</h2>
  <p>wise wallet</p>
  <form method="post" action="register.php">
    <input type="text" name="username" placeholder="UserName" required>
    <input type="email" name="email" placeholder="Email Id" required>
    <input type="tel" name="contact" placeholder="Phone Number" required>
    <input type="password" name="password" placeholder="Password" required>
   <!-- <input type="password" name="confirm_password" placeholder="Confirm Password" required>-->
    <input type="submit" value="Register">
  </form>

  <div class="nav-links">
    <ul>
        <li><a href="login.html" class="btn">LOG IN</a></li>
    </ul>
</div>
</div>

</body>
</html>

</body>
</html>
<?php
$showError = false;
$showAlert = false;
$register = false;


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    include 'connection.php';  // link to the database 
    $username = $_POST['username'];
    $email = $_POST['email'];
    $contact= $_POST['contact'];
    $password = $_POST['password'];

    // check exist user 

   $existSql = "SELECT * FROM `stu_register` WHERE 'username' = '$username'";
   $result = mysqli_query($conn, $existSql);
   $numExistRows = mysqli_num_rows($result);
   if ($numExistRows > 0){
    $showError = "Username Already Exists";
   }
   else{
   // if (($password == $cpassword)) {
      $sql = "INSERT INTO   stu_register (NAME, EMAIL, CANTACT, PASSWORD) VALUES ('$username', '$email', '$contact', '$password');";
      $result = mysqli_query($conn, $sql);
      $register = true;
 // } else {
 //     echo "password are not matching";
 // }
   } 
   if ($register == true) {
    $login = true;
    session_start();
    $_SESSION['loggedin'] = true;
    $_SESSION['username'] = $username;
    header("location: login.php");
 }
 else {
    $showError = "Invalid Credentials"; 
 }
}

?>