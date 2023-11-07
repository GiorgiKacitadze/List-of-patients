<?php   

include '../db.php';   

$obj = new db();
$conn = $obj->connect();
        
$id = $_POST['id']; 

$sql = "UPDATE patients SET `active`=0 WHERE `id`='$id'";

$result = $conn->prepare($sql);
$result->execute();

$response = array();
$response["success"] = true;
$response["message"] = "პაციენტის ინფორმაცია წაიშალა";


echo json_encode($response);  