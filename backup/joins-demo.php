<?php
require "connect.php";
$query = "select employee.age, complaints.type from employee inner join complaints on employee.employee_id = complaints.employee_id where employee.age=45";
$result = mysqli_query($con, $query);
/*
$f=$_GET('f');
echo $f;
*/

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
else 
echo("No data");