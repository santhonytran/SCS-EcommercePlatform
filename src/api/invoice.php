<?php

session_start();
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$db = mysqli_connect("localhost", "root", "", "project");
if ($db->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$result = $db->query("SELECT date_completed, order_price, order_id, user_id, trip_id, branch_id FROM orders ORDER BY order_id DESC LIMIT 1");
$row = mysqli_fetch_row($result);
$result = $db->query("SELECT branch_addy FROM branch WHERE branch_id = '$row[5]'");
$row1 = mysqli_fetch_row($result);
$result = $db->query("SELECT addy FROM users WHERE user_id = '$row[3]'");
$row2 = mysqli_fetch_row($result);
$result = $db->query("SELECT model FROM car, trip  WHERE trip_id = '$row[4]' and car.car_id = trip.car_id");
$row3 = mysqli_fetch_row($result);
echo json_encode(array("date" => $row[0], "price" => $row[1], "orderID" => $row[2], "branch" => $row1[0], "address" => $row2[0], "car" => $row3[0]));

mysqli_close($db);
?>