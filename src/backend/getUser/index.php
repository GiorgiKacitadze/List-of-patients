<?php  

include '../db.php';

$obj = new db();
$conn = $obj->connect();

$method = $_SERVER['REQUEST_METHOD'];  

switch($method){
    case "GET":
        $sql = "SELECT  patients.`id`,
                        patients.`name`, 
                        patients.`lastname`, 
                        DATE(patients.`birth_date`) AS `birthdate`, 
                        genders.`name` AS `gender_name`,
                        patients.`gender_id` AS `genderid`,
                        patients.`phone_number` AS `phonenumber`,
                        cities.`name` AS `city_name`,
                        patients.`city_id` AS `cityid`
                FROM patients
                LEFT JOIN genders ON genders.id = patients.gender_id
                LEFT JOIN cities ON cities.id = patients.city_id
                WHERE patients.active = 1";  

        $id = $_GET['id']; 

        if($id == "") {
            echo "Invalid Request";
        }else{
            $sql .= " AND patients.id = $id"; 
            $stmt = $conn->prepare($sql); 
            $stmt->execute();
            $patients = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($patients);
        }
         
        break;
    
    case "POST":

        $user=json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO patients (`name`,`lastname`,`birth_date`,`gender_id`,`phone_number`,`city_id`) VALUES (:name, :lastname, :birth_date, :gender_id, :phone_number, :city_id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':lastname', $user->lastname);
        $stmt->bindParam(':birth_date', $user->birthdate);
        $stmt->bindParam(':gender_id', $user->genderid);
        $stmt->bindParam(':phone_number', $user->phonenumber);
        $stmt->bindParam(':city_id', $user->cityId);

        if($stmt->execute()){
            $response = array('status' => 1, 'message' => 'Patient Added Successfully');
        }else{
            $response = array('status' => 0, 'message' => 'Failed');
        }

        echo json_encode($response);

        break;
}



?>