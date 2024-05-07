<?php
// Establish a database connection
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

// Check if form data is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Prepare and bind SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE full_name=? AND phone_no=? AND password=?");
    $stmt->bind_param("sss", $username, $phone, $password);

    // Fetching data from the form
    $username = $_POST['username'];
    $phone = $_POST['pno'];
    $password = $_POST['pass'];

    // Execute the prepared statement
    $stmt->execute();
    
    // Get result
    $result = $stmt->get_result();

    // Check if any rows are returned
    if ($result->num_rows > 0) {
        // Redirect user to another page if credentials are correct
        header("Location: shop.html");
        exit();
    } else {
        // Redirect back to login page with error message
        header("Location: signin.html?error=InvalidCredentials");
        echo "invalid details!!"
        exit();
    }
} else {
    // If the request method is not POST, redirect back to login page
    header("Location: signin.html");
    echo "login successfully!";

    exit();
}

// Close prepared statement and connection
$stmt->close();
$conn->close();
?>
