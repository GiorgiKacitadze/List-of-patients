<?php   

include '../db.php';   

$obj = new db();
$conn = $obj->connect();
        
$name = $_POST['name'];
$lastname = $_POST['lastname'];
$birthdate = $_POST['birthdate'];
$genderid = $_POST['genderid'];
$phonenumber = $_POST['phonenumber'];
$cityid = $_POST['cityid']; 

$sql = "INSERT INTO patients (`name`,`lastname`,`birth_date`,`gender_id`,`phone_number`,`city_id`) VALUES ('$name','$lastname','$birthdate','$genderid','$phonenumber','$cityid')";

$result = $conn->prepare($sql);
$result->execute();

$response = array();
$response["success"] = true;
$response["message"] = "პაციენტის ინფორმაცია დაემატა";


echo json_encode($response);  