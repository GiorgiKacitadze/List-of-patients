<?php  

include '../db.php';

$obj = new db();
$conn = $obj->connect(); 

$sql = "SELECT * FROM cities";
$stmt = $conn->prepare($sql);
$stmt->execute();
$cities = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($cities);  

?>