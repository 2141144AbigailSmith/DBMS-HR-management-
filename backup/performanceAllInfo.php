<?php 
require "connect.php";

$query = "select * from performance";
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


function dep1()
{
    echo "In dep1 fn";   
}

?>