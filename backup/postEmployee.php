<?php
require "connect.php";
//VALIDATIONS
$emailvalid = 0;
$phonevalid= 0; 
$dobvalid = 0;
$dojvalid = 0;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    

    $email = $_POST['email'];
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailvalid = 1;
    }

    $phone = $_POST['ph_no'];
    if (ctype_digit($phone) || strlen($phone) != 10) {
        $phonevalid = 1;
    }

    $dob = $_POST['dob'];
    $min_date = new DateTime('1970-01-01');
    $max_date = new DateTime('2001-12-31');
    $given_date = new DateTime($dob);

    if ($given_date > $min_date && $given_date < $max_date) {
        $dobvalid = 1;
    }


    $doj = $_POST['doj'];
    $doj_year = date('Y', strtotime($doj));
    // Check if the doj year is not 2023
    if ($doj_year == '2023') {
        $dojvalid = 1;
    }

    if($emailvalid && $phonevalid && $dobvalid && $dojvalid)
    {
        echo "all valid";
        //generate employee id 
        function generateEmployeeId($con) {
            $lastEmployeeId = 0;
            $result = $con->query("SELECT MAX(employee_id) as maxid FROM employee");
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $lastEmployeeId = $row["maxid"];
            }
            $newEmployeeId = $lastEmployeeId + 1;
            return $newEmployeeId;
        }

        $employeeId = generateEmployeeId($con);
        $stmt = $con->prepare("insert into employee (employee_id, first_name, last_name, manager_id, job_id, department_id, dob, age, doj, ph_no, email_id, gender, ethnicity, marital_status, education_level, ssn, city) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?,?)");

        //check ifstmt returns false
        if ($stmt === false) {
            die("Error: " . $con->error);
        }

        //calc age from dob
        $dob = $_POST["dob"]; // inputted date of birth
        $today = new DateTime(); // today's date
        $birthdate = new DateTime($dob); // create a DateTime object from the date of birth
        $age = $birthdate->diff($today)->y; // get the difference between the two dates in years

        //get dep from job id 
        $department_id;
        $job_id = $_POST["job-id"];
        if ($job_id >= 1001 && $job_id <= 1004) {
            $department_id = 1;
        } 
        else if($job_id >= 2001 && $job_id <= 2004) {
            $department_id = 2;// set department ID for other job IDs
        }
        else if($job_id >= 3001 && $job_id <= 3004) {
            $department_id = 3;// set department ID for other job IDs
        }
        else {
            $department_id = 0;
        }

        $manager_id;
        //get manager id from dep 
        if($department_id == 1)
        {
            $manager_id = 5141;
        }
        else if($department_id == 2)
        {
            $manager_id = 5141;
        }
        else if($department_id == 3)
        {
            $manager_id = 5141;
        }
        else{
            $manager_id = 0;
        }

        //generate random ssn 
        $ssn = mt_rand(100, 999) . "-" . mt_rand(10, 99) . "-" . mt_rand(1000, 9999);


        $stmt->bind_param("dssiiisisdsssssss", $employeeId, $_POST["first-name"], $_POST["last-name"],$manager_id, $job_id, $department_id, $_POST["dob"], $age, $_POST["doj"], $_POST["ph_no"], $_POST["email"], $_POST["gender"], $_POST["ethnicity"], $_POST["marital_status"], $_POST["education_level"], $ssn, $_POST["address"]);
        // Execute the prepared statement and check if the insertion was successful
        if ($stmt->execute()) {
            echo "Insertion was successful.";
        } 
        else {
            echo "Error: " . $stmt->error;
        }

        // Close the prepared statement and database 
        $stmt->close();
    }
    else 
    {
        if($emailvalid == 0)
        {
            echo "email is invalid";
        }
        if($phonevalid == 0)
        {
            echo "phone no is invalid";
        }
        if($dobvalid == 0)
        {
            echo "dob is invalid";
        }
        if($dojvalid == 0)
        {
            echo "doj is invalid";
        }
    }

    }
    
?>