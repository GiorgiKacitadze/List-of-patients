<?php   

include '../db.php';   

$obj = new db();
$conn = $obj->connect();
        
$id = $_POST['id'];
$name = $_POST['name'];
$lastname = $_POST['lastname'];
$birthdate = $_POST['birthdate'];
$genderid = $_POST['genderid'];
$phonenumber = $_POST['phonenumber'];
$cityid = $_POST['cityid']; 

$sql = "UPDATE patients SET `name`='$name',`lastname`='$lastname',`birth_date`='$birthdate',`gender_id`='$genderid',`phone_number`='$phonenumber',`city_id`='$cityid' WHERE `id`='$id'";

$result = $conn->prepare($sql);
$result->execute();

$response = array();
$response["success"] = true;
$response["message"] = "პაციენტის ინფორმაცია განახლებულია";


echo json_encode($response);  