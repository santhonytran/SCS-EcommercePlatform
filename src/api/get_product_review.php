<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$rest_json = file_get_contents("php://input");
$_prod_name = json_decode($rest_json, true);

$db = mysqli_connect("localhost", "root", "", "project");
if ($db->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_prod_name)){
    $query = "SELECT prod_id FROM product WHERE '$_prod_name' = prod_name";
    $qresult = mysqli_query($db, $query);
    $qrow = mysqli_fetch_row($qresult);

    $prod_id = $qrow[0];


    $sql= mysqli_query($db, "SELECT preview_text, preview_rate, first_name, last_name FROM users u, review_products r WHERE prod_id = '$prod_id' AND u.user_id = r.user_id");
    $num = mysqli_num_rows($sql);
    if($num > 0){
        while($r = mysqli_fetch_assoc($sql)) {
            $rows[] = $r;
        }
        print json_encode($rows); 
    }

}

mysqli_close($db);

?>
