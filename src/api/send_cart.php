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

$prod = array_slice($_POST, 0, -1);
$user = end($_POST);

$query = "SELECT user_id FROM users WHERE '$user' = login_id";
$qresult = mysqli_query($db, $query);
$qrow = mysqli_fetch_row($qresult);
$user_id = $qrow[0];

foreach($prod as $value){
    $product_insert = "INSERT into Purchased(user_id, prod_id) values ('$user_id', '$value')";
    mysqli_query($db, $product_insert);
}


mysqli_close($db);

?>