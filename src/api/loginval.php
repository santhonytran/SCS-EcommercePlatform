<?php
function generateRandomSalt(){
    return base64_encode(random_bytes(12));
}
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
if (empty($_POST['username']) && empty($_POST['password'])) die();
$db = mysqli_connect("localhost", "root", "", "project");
if ($db->connect_error) {
    echo "adasdasas";
    die("Connection failed: asdasdas" . $conn->connect_error);
    
}


$username = $_POST["username"];
$password = $_POST["password"];

$result = $db -> query("SELECT login_salt FROM users WHERE login_id = '$username'");

$num = mysqli_num_rows($result);
$row = mysqli_fetch_row($result);
if ($num == 0){
    $error = "Invalid Username or Password.";
    echo json_encode(array("sent"=> false, "session" => ""));
}else{
    $salt = $row[0];
    $password = md5($password.$salt);
}

$result = $db->query("SELECT * FROM users WHERE login_id = '$username' AND login_password = '$password'");

$num = mysqli_num_rows($result);

if ($num == 0){
    $error = "Invalid Username or Password.";
    echo json_encode(array("sent"=> false, "session" => ""));
}else{
    $_SESSION['username'] = $_POST['username'];
    echo json_encode(array("sent"=> true, "session" => $_SESSION['username']));
}
mysqli_close($db);
?>