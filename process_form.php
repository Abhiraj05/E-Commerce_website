<?php

if(isset($_POST["full_name"], $_POST["phone_no"], $_POST["address"], $_POST["password"])) {
    

    $fullName = htmlspecialchars($_POST["full_name"]);
    $phoneNo = htmlspecialchars($_POST["phone_no"]);
    $address = htmlspecialchars($_POST["address"]);
    $password = htmlspecialchars($_POST["password"]);

    $conn = new mysqli('localhost', 'root', '', 'wtproject');

    
    if($conn->connect_error) {
        die('Connection Failed: '.$conn->connect_error);
    } else {
      
        $stmt = $conn->prepare("INSERT INTO users (full_name, phone_no, address, password) VALUES (?, ?, ?, ?)");
        
        $stmt->bind_param("ssss", $fullName, $phoneNo, $address, $password);
        
        
        if ($stmt->execute()) {
            
           

            $stmt->close();
            $conn->close();


            $redirectUrl = isset($_POST['redirect_url']) ? $_POST['redirect_url'] : 'shop.html';
            echo "Data inserted successfully!";
            header("Location: $redirectUrl");
            exit(); 
        } else {
           
            error_log("Database error: " . $conn->error);
            echo "Oops! Something went wrong. Please try again later.";
        }
        
    
        $stmt->close();
        $conn->close();
    }
} else {
  
    echo "Error: Required POST variables are missing.";
}

?>
