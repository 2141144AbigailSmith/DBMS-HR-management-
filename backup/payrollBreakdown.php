<?php 
require "connect.php";

// $id=$_POST['username'];
$id=$_GET['user'];
// $query = "select * from employee where employee_id=$id";
$query="SELECT * from payroll where employee_id=$id";
$result = mysqli_query($con, $query);

//for single row, no need array + use fetch_row
$row = mysqli_fetch_object($result);
echo json_encode($row);
?>