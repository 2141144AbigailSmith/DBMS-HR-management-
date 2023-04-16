<?php 
require "connect.php";
$x = $_POST['functionName'];

function byPost()
{
    $query = "select job_title, count(*) as num from job inner join employee on job.job_id = employee.job_id group by employee.job_id";
}

$result = mysqli_query($con, $query);

$data = array();
while ($row = mysqli_fetch_object($result)) {
    $data[] = $row;
}

// Return the results as JSON
header('Content-Type: application/json');
echo json_encode($data);