<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wtproject";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $stmt = $conn->prepare("SELECT * FROM users WHERE full_name=? AND phone_no=? AND password=?");
    $stmt->bind_param("sss", $username, $phone, $password);


    $username = $_POST['username'];
    $phone = $_POST['pno'];
    $password = $_POST['pass'];

    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
     
        header("Location: shop.html");
        exit();
    } else {
        
        header("Location: signin.html?error=InvalidCredentials");
        echo "invalid details!!"
        exit();
    }
} else {

    header("Location: signin.html");
    echo "login successfully!";

    exit();
}

$stmt->close();
$conn->close();
?>
