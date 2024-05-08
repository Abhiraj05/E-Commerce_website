<?php

// Assuming you have a database connection established.
// Replace the database connection details with your actual database credentials.
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wtproject";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve the data sent from the frontend
$data = json_decode(file_get_contents('php://input'), true);

// Extract user ID and cart data from the received data
$userId = $data['userId'];
$cart = $data['cart'];

// Prepare and execute SQL statements to insert cart data into the database
foreach ($cart as $item) {
    $productId = $item['productid'];
    $productImg = $item['productimg'];
    $productTitle = $item['producttitle'];
    $productPrice = $item['productprice'];
    $quantity = $item['quantity'];

    $sql = "INSERT INTO user_cart (user_id, product_id, product_img, product_title, product_price, quantity)
            VALUES ('$userId', '$productId', '$productImg', '$productTitle', '$productPrice', '$quantity')";

    if ($conn->query($sql) === TRUE) {
        // Insertion successful
    } else {
        // Insertion failed
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close database connection
$conn->close();

// Respond back to the frontend with a success message
$response = array('success' => true);
echo json_encode($response);

?>
