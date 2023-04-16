<?php 
$con = mysqli_connect("localhost:3307","root","mysql","aqube");
function getEmployeeData($con) {
    $query = "SELECT e.employee_id, e.name, d.department_name, j.job_title, p.salary, pf.rating, c.complaint_text, a.attendance_date
    FROM employee e
    INNER JOIN department d ON e.department_id = d.department_id
    INNER JOIN job j ON e.job_id = j.job_id
    INNER JOIN payroll p ON e.employee_id = p.employee_id
    INNER JOIN performance pf ON e.employee_id = pf.employee_id
    INNER JOIN complaints c ON e.employee_id = c.employee_id
    INNER JOIN attendance a ON e.employee_id = a.employee_id";
    $result =mysqli_query($con, $query);

    $emparray = array();
    if($result->num_rows > 0)
    {
        while($row = mysqli_fetch_assoc($result)) 
        {
            $emparray[] = $row;
        }
        echo json_encode($emparray);
    }
    echo json_encode($emparray);

}
getEmployeeData($con);

?>