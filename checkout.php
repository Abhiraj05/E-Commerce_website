<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wtproject";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['userId'];
$cart = $data['cart'];

foreach ($cart as $item) {
    $productId = $item['productid'];
    $productImg = $item['productimg'];
    $productTitle = $item['producttitle'];
    $productPrice = $item['productprice'];
    $quantity = $item['quantity'];

    $sql = "INSERT INTO user_cart (user_id, product_id, product_img, product_title, product_price, quantity)
            VALUES ('$userId', '$productId', '$productImg', '$productTitle', '$productPrice', '$quantity')";

    if ($conn->query($sql) === TRUE){
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();

$response = array('success' => true);
echo json_encode($response);

?>
