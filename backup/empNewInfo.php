<?php 
require "connect.php";

$query = "SELECT e.*, j.job_title, d.name AS department_name 
FROM employee e 
JOIN job j ON e.job_id = j.job_id 
JOIN department d ON e.department_id = d.department_id 
WHERE e.employee_id > 5500";

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

?>