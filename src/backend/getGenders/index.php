<?php  

include '../db.php';

$obj = new db();
$conn = $obj->connect(); 


$sql = "SELECT * FROM genders";
$stmt = $conn->prepare($sql);
$stmt->execute();
$genders = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($genders); 





?>