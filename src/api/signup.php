<?php
function generateRandomSalt(){
        return base64_encode(random_bytes(12));
}
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

$fname = $_POST["fname"];
$lname = $_POST["lname"];
$email = $_POST["email"];
$username = $_POST["username"];
$password = $_POST["password"];
$phone = $_POST["phone"];
$addr = $_POST["address"];
$postal = $_POST["postal"];
$salt = generateRandomSalt();
$password = md5($password.$salt);

$result = $db->query("SELECT * FROM users WHERE login_id = '$username'");

$num = mysqli_num_rows($result);

if ($num == 1){
    $error = "Username Already Taken.";
    echo json_encode(array("sent"=> false, "session" => ""));
}else{
    $_SESSION['username'] = $_POST['username'];
    $reg = "INSERT into users(first_name, last_name, phone, email, addy, postal, login_id, login_salt, login_password, balance, admin_val) values ('$fname','$lname','$phone','$email','$addr','$postal','$username','$salt','$password', 0, false)";
    mysqli_query($db, $reg);
    echo json_encode(array("sent"=> true, "session" => $_SESSION['username']));
}
mysqli_close($db);
?>