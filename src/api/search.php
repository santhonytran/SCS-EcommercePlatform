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
    $arr = array();
    if (isset($_POST['userid'])){
        try{
            $selected_table = $_POST['userid'];
            $get_col = "SELECT order_id, date_issued, date_completed, order_price FROM orders WHERE user_id ='$selected_table'";
            $result = $db->query($get_col);
            if (mysqli_num_rows($result) > 0) {
                while($data = mysqli_fetch_assoc($result)) {
                    $row = array("order_id" => $data['order_id'], "date_issued" => $data['date_issued'], "date_completed" => $data['date_completed'], "order_price" => $data['order_price']);
                    array_push($arr, $row);
                }
                echo json_encode(array("sent"=> true, "rows" => $arr));
            }
        } catch(Throwable $e){
            echo json_encode(array("sent"=> false));
        }
    }

    if (isset($_POST['orderid'])){
        try{
            $selected_table = $_POST['orderid'];
            $get_col = "SELECT order_id, date_issued, date_completed, order_price FROM orders WHERE order_id ='$selected_table'";
            $result = $db->query($get_col);
            if (mysqli_num_rows($result) > 0) {
                while($data = mysqli_fetch_assoc($result)) {
                    $row = array("order_id" => $data['order_id'], "date_issued" => $data['date_issued'], "date_completed" => $data['date_completed'], "order_price" => $data['order_price']);
                    array_push($arr, $row);
                    
                }
                echo json_encode(array("sent"=> true, "rows" => $arr));
            }
        } catch(Throwable $e){
            echo json_encode(array("sent"=> false));
        }
    }
        

?>