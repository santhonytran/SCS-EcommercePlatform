<?php
function generateRandomSalt(){
    return base64_encode(random_bytes(12));
}

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$db = mysqli_connect("localhost", "root", "", "project");
if ($db->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$shipping = $_POST["shipping"];
$user = $_POST["user"];
$trip_time = 0;
if ($shipping == 6.99) {
    $trip_time = 1;
} else if ($shipping == 5.99) {
    $trip_time = 2;
}

$uid = "SELECT user_id FROM users WHERE login_id = '$user'";
$result = mysqli_query($db, $uid);
$user_id = mysqli_fetch_row($result);

$destination_code = 1;
$distance = 50;
$branch = $_POST["branch"];
$branch_check = "SELECT branch_id FROM branch WHERE branch_addy = '$branch'";
$result = mysqli_query($db, $branch_check);
$branch_id = mysqli_fetch_row($result);

$car = $_POST["car"];
$car_check = "SELECT car_id FROM car WHERE model = '$car'";
$result = mysqli_query($db, $car_check);
$car_id = mysqli_fetch_row($result);

$total = $_POST["cost"];
$card_name = $_POST["name"];
$num = $_POST["num"];
$expiry = $_POST["expiry"];
$cvv = $_POST["cvv"];

$salt = generateRandomSalt();
$salted_card_name = md5($card_name.$salt);
$salted_card_num = md5($num.$salt);
$salted_expiry = md5($expiry.$salt);
$salted_cvv = md5($cvv.$salt);

$tripAdd = "INSERT into trip(destination_code, trip_price, distance, branch_id, car_id)
VALUES ($destination_code, $shipping, $distance, $branch_id[0], $car_id[0])";
mysqli_query($db, $tripAdd);

$trip_id = mysqli_insert_id($db);
$shoppingAdd = "INSERT into shopping(shopping_price, branch_id) values ($total, $branch_id[0])";
mysqli_query($db, $shoppingAdd);
$receipt_id = mysqli_insert_id($db);

$insertOrder = "INSERT into orders(date_issued, date_completed, order_price, payment_code, user_id, trip_id, receipt_id, branch_id, card_name, card_num, expiry, cvv, salt)
VALUES (CURDATE(), CURDATE()+ INTERVAL $trip_time DAY, $total, 1, $user_id[0], $trip_id, $receipt_id, $branch_id[0], '$salted_card_name', '$salted_card_num', '$salted_expiry', '$salted_cvv', '$salt')";
mysqli_query($db, $insertOrder);

mysqli_close($db);
