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

$sql = mysqli_query($db, "SELECT * FROM product");
while ($r = mysqli_fetch_assoc($sql)) {
    $product[] = $r;
}

$result = mysqli_query($db, "SELECT * FROM branch");
while ($r = mysqli_fetch_assoc($result)) {
    $row1[] = $r;
}

$user = $_POST["user"];
$loc = "SELECT addy  FROM users WHERE login_id = '$user'";
$result = mysqli_query($db, $loc);
$addy = mysqli_fetch_row($result);

$result = mysqli_query($db, "SELECT model FROM car");
while ($r = mysqli_fetch_assoc($result)) {
    $row3[] = $r;
}
echo json_encode(array("product" => $product, "branch" => $row1, "address" => $addy[0], "car" => $row3));

mysqli_close($db);
