<?php 
require "connect.php";

// $id=$_POST['username'];
$id=$_GET['id'];
// Delete employee record
$query = "DELETE FROM employee WHERE employee_id = $id";
$result = mysqli_query($con, $query);

if ($result) {
    // Return success message
    echo json_encode(array('success' => true, 'message' => 'Employee record has been deleted.'));
} else {
    // Return error message
    echo json_encode(array('success' => false, 'message' => 'Error deleting employee record.'));
}
?>