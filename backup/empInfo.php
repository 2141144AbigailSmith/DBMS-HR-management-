<?php 
require "connect.php";

// $id=$_POST['username'];
$id=$_GET['user'];
// $query = "select * from employee where employee_id=$id";
$query="SELECT * from employee LEFT join payroll on employee.employee_id=payroll.employee_id LEFT JOIN attendance on employee.employee_id=attendance.employee_id LEFT JOIN dependents on employee.employee_id=dependents.employee_id LEFT JOIN performance on employee.employee_id=performance.employee_id LEFT JOIN complaints on employee.employee_id=complaints.employee_id where employee.employee_id=$id";
$result = mysqli_query($con, $query);

//for single row, no need array + use fetch_row
$row = mysqli_fetch_object($result);
echo json_encode($row);
?>