<?php 
require "connect.php";

function complaints()
{
    $query = "select * from complaints where employee_id=51";
}
$result = mysqli_query($con, $query);

//for single row, no need array + use fetch_row
$row = mysqli_fetch_object($result);
echo json_encode($row);
?>