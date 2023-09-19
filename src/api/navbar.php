<?php
    session_start();
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);
    if (isset($_POST["Username"])){
      $_SESSION["username"] = $_POST["Username"];
    }
    if (isset($_SESSION["username"])) {
      $db = mysqli_connect("localhost", "root", "", "project");
      if ($db->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }
      $user = $_SESSION["username"];
      $s = "SELECT admin_val FROM users WHERE login_id = '$user'";
      $result = mysqli_query($db, $s);
      $row = mysqli_fetch_row($result);
      if ($row[0] == 1) {
        echo json_encode(array("status"=> "admin"));
      } else {
        echo json_encode(array("status"=> "reg"));
      }
    } else {
        echo json_encode(array("status"=> "none"));
    }
?>