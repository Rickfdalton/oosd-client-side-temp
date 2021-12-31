<?php
require_once "../PHP/PHPMailer/credential.php";

$db = new mysqli('localhost',USER,DB_PASS,DB);
$query = 'SELECT VaccinationCenters.Name, Lon, Lat FROM VaccinationCenters';
$list = array();
$stmt = $db->prepare($query);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($districtName, $hospitalName, $facilityName);
while($stmt->fetch()){
    $list[] = [$districtName, $hospitalName, $facilityName];
}

echo json_encode($list);

// define("USER_LON", $_POST['Lon']);
// define("USER_LAT", $_POST['Lat']);


// function getDistance($lon, $lat){
//     $earthRadius = 6371;
//     $dLat = deg2rad($lat - USER_LAT);
//     $dLon = deg2rad($lon - USER_LON);

//     $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad(USER_LAT)) * cos(deg2rad($lat)) * sin($dLon/2) * sin($dLon/2);

//     $c = 2 * atan2(sqrt($a), sqrt(1-$a));
//     $d = $earthRadius * $c;

//     return $d;
// }


// $result = $db->query($query);
// echo json_decode($result->fetch_array());
// $arr = array();
// while($row = $result->fetch_assoc()){
//     $lat = $row['Lat'];
//     $lon = $row['Lon'];
//     $dis = getDistance($lon, $lat);
//     if(count($arr)<3){
//         if(count($arr) === 0){
//             $arr['first'] = array("Name"=>$row['Name'], "Longitude"=>$lon, "Latitude"=>$lat, "Distance"=>$dis);
//         }elseif(count($arr) ===1){
//             if($arr['first']['Distance'] > $dis){
                
//             }
//         }
        
//     }else {
//         $maxKey = 0;
//         foreach ($arr as $key => $value) {
//             if($value['Distance'] > $dis){
                
//             }
//         }
//     }
    
// }

?>