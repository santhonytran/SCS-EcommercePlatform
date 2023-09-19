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

$text = $_POST["text"];
$user = $_POST["user"]; 
$rate = $_POST["rate"];
$prod_name = $_POST["prod_name"];

$query = "SELECT user_id FROM users WHERE '$user' = login_id";
$qresult = mysqli_query($db, $query);
$qrow = mysqli_fetch_row($qresult);
$user_id = $qrow[0];

$query = "SELECT prod_id FROM product WHERE '$prod_name' = prod_name";
$qresult = mysqli_query($db, $query);
$qrow = mysqli_fetch_row($qresult);
$prod_id = $qrow[0];


$review_insert = "INSERT into review_products(preview_text, preview_rate, prod_id, user_id) values ('$text', '$rate', '$prod_id', $user_id)";
mysqli_query($db, $review_insert);

mysqli_close($db);

?>