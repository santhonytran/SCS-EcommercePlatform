<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$rest_json = file_get_contents("php://input");
$_table = json_decode($rest_json, true);

$db = mysqli_connect("localhost", "root", "", "project");
if ($db->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = mysqli_query($db, "SELECT * FROM $_table");
while($r = mysqli_fetch_assoc($sql)) {
    $rows[] = $r;
}
print json_encode($rows); 
mysqli_close($db);

?>