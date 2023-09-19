<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$db = mysqli_connect("localhost", "root", "", "project");
if ($db->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT user_id FROM users WHERE '$_POST' = login_id";
$qresult = mysqli_query($db, $query);
$qrow = mysqli_fetch_row($qresult);
$user_id = $qrow[0];

$sql = mysqli_query($db, "SELECT DISTINCT prod_id FROM Purchased WHERE user_id = '$user_id'");
while($r = mysqli_fetch_assoc($sql)) {
    $prod[] = $r;
}

if (isset($prod)){
    $newArray = array();
    foreach($prod as $entry){
       array_push($newArray, $entry['prod_id']);
    }
    
    $psql = mysqli_query($db, "SELECT prod_name FROM product WHERE prod_id IN (".implode(',',$newArray).")");
    while($r = mysqli_fetch_assoc($psql)) {
        $row[] = $r;
    }
    print json_encode($row); 
} else {
    print json_encode([]);
}



/*foreach($prod as $i){
    $get_sql = mysqli_query($db, "SELECT prod_name FROM Product WHERE prod_id = '$i'");
    $prow = mysqli_fetch_row($get_sql);
    $rows[] = $prow[0];
}*/

mysqli_close($db);

?>