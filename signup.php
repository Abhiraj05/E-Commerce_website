<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $fullName = $_POST["full_name"];
    $phoneNo = $_POST["phone_no"];
    $address = $_POST["address"];
    $password = $_POST["password"];

    // Validate form data (you can add more validation as needed)
    if (empty($fullName) || empty($phoneNo) || empty($address) || empty($password)) {
        echo "Please fill in all fields.";
    } else {
        // Connect to your MySQL database (replace with your actual database credentials)
        $servername = "localhost";
        $username = "root"; // Replace with your MySQL username
        $password = ""; // Replace with your MySQL password
        $dbname = ""; // Replace with your MySQL database name

        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Prepare SQL query using prepared statements to prevent SQL injection
        $sql = "INSERT INTO users (full_name, phone_no, address, password) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $fullName, $phoneNo, $address, $password);

        // Execute SQL query
        if ($stmt->execute()) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        // Close statement and database connection
        $stmt->close();
        $conn->close();
    }
}
?>
