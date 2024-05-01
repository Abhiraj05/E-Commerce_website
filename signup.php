


<?php
// PHP code for processing form data and inserting into the database
// This code should go in your signup.php file
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $fullName = $_POST["full_name"];
    $phoneNo = $_POST["phone_no"];
    $address = $_POST["address"];
    $password = $_POST["password"];

    // Establish database connection and insert data
    $servername = "localhost";
    $username = "your_username";
    $password = "your_password";
    $dbname = "your_database_name";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // SQL to insert data into the table
    $sql = "INSERT INTO your_table_name (full_name, phone_no, address, password) VALUES ('$fullName', '$phoneNo', '$address', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close database connection
    $conn->close();
}
?>
