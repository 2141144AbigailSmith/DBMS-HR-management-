<?php
require "connect.php";
session_start();

$username=$_POST['username'];
$password=$_POST['password'];

$sql = "select * from login where user_id=$username";
$res = mysqli_query($con, $sql);

if(mysqli_num_rows($res)>0)
{
    $row = mysqli_fetch_assoc($res);
    if($username==isset($row['user_id']))
    {
        if($password==$row['password'])
        {
            echo 1;
        }
        else{
            echo 0;
        }
    }
    else
    echo -1;
}
//SAAD's
/*
if($username='5140') 
{
    if($password=='Saad@123')
    {
        echo 1;
    }
    else
    {
        echo 0;
    }
}
else
{
    echo -1;
}
?>
*/