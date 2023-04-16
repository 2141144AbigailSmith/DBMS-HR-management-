<?php 
require "connect.php";

$query = "select * from employee INNER JOIN payroll on employee.employee_id = payroll.employee_id INNER JOIN department on employee.department_id = department.department_id INNER JOIN job on employee.job_id = job.job_id INNER JOIN attendance on employee.employee_id = attendance.employee_id;";
$result = mysqli_query($con, $query);

//store in array so its easy for json 
$emparray = array();
if($result->num_rows > 0)
{
    while($row = mysqli_fetch_assoc($result)) 
    {
        $emparray[] = $row;
    }
    // var_dump($emparray);
    // echo "<br>JSON ENCODED";
    echo json_encode($emparray);
}

?>