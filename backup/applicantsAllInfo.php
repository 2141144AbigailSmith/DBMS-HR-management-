<?php 
require "connect.php";
$query = "select * from applicant";
$result = mysqli_query($con, $query);

$applicantarray = array();
if($result->num_rows > 0)
{
    while($row = mysqli_fetch_assoc($result)) 
    {
        $applicantarray[] = $row;
    }
    echo json_encode($applicantarray);
}
?>