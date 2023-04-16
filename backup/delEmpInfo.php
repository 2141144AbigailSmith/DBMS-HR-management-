<?php 
require "connect.php";

// $id=$_POST['username'];
$id=$_GET['id'];
// $query = "select * from employee where employee_id=$id";
$query="SELECT e.*, j.job_title, d.name AS department_name 
FROM employee e 
JOIN job j ON e.job_id = j.job_id 
JOIN department d ON e.department_id = d.department_id 
where e.employee_id=$id";
$result = mysqli_query($con, $query);
$data = array();

while($row = mysqli_fetch_object($result)) {
    $data[] = $row; // append each row to the array
}
//for single row, no need array + use fetch_row
//$row = mysqli_fetch_object($result);
echo json_encode($data);
?>