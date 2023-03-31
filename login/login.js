//GET VARS
var form = document.getElementById("form");
var userName = document.getElementById("username");
var passWord = document.getElementById("password");
var autosave = document.getElementById("autosave");
//WARNING DIVS 
var uWarn = document.getElementById("usernameWarning");
var pWarn = document.getElementById("passwordWarning");
//HEADER
var header = document.getElementById("welcome-txt");
var data='';
var globalUser='';

function validateForm(event) {
    event.preventDefault();
    //GET INPUT VALS 
    let valid = true
    const userNameVal = userName.value.trim();
    globalUser=userNameVal;
    const passWordVal = passWord.value.trim();
    //REGEX 
    const employeeRegex = /^5.*/;
    const pwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"); //NO NEED
    //VALIDITY 
    var unameValid, pwordValid;
    var employee, admin;

    //USERNAME
    if (userNameVal.length === 0) {
        
        setError(userName, 'username can\'t be empty');
        valid = false;
    }
    else if (userNameVal.length < 2 || userNameVal.length > 5) {
        setError(userName, 'username must be between 2-5 characters');
        valid = false;
    }
    else if (!userNameVal.match(employeeRegex) && userNameVal.toLowerCase() != 'admin') {
        setError(userName, 'Invalid user');
        valid = false;
    }
    else if (userNameVal * 1 < 51 || userNameVal * 1 > 5500) {
        setError(userName, 'Invalid employee username');
        valid = false;
    }
    else {
        setSuccess(userName);
        unameValid = 1;
    }

    //PASSWORD
    if (passWordVal === 0) {
        setError(passWord, 'pasword can\'t be empty');
        valid = false;
    }
    else if (!passWordVal.match(pwordRegex)) {
        setError(passWord, '8 - 10 characters long with alphanumerics,special characters upper and lower case');
        valid = false;
    }
    else {
        setSuccess(passWord);
        pwordValid = 1;
    }

    //all valid     
    // if (unameValid && pwordValid) {
    //     if (userNameVal === 'admin')
    //         window.open("http://127.0.0.1:5500/employee.html");
    //     if (userNameVal === '5141' || userNameVal === '5222' || userNameVal === '5378')
    //         alert('manager');
    // }
    console.log(userName.value);
    // return valid;
    //Check Creds and Redirect
    fd= new FormData();
    fd.append("username",userNameVal);
    fd.append("password",passWordVal);
    fetch("login.php",{
        method: "POST",
        body: fd
    })
    .then(function(response)
    {
        return response.text();
    })
    .then(function(data)
    {   
        console.log("DATA IS:");
        console.log(data);
        if(data==1)
        {
            document.cookie = "name="+userNameVal+"; SameSite=None; Secure";
            window.location.href="http://localhost/hr/startbootstrap-sb-admin-2-gh-pages/index.html";
        }
    });
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function doMyJob()
  {
    fetchDashBoard(getCookie('name'));
  }
function fetchDashBoard(user)
{
    console.log("IN FETCH DASH");

    fetch("empInfo.php?user="+user)
    .then(function(response)
    {
        return response.json();
    })
    .then(function(dataREC)
    {
        data=dataREC;
        console.log(data);
        writeToDashBoard();

    }) 
}

//Write to Dash!
function writeToDashBoard()
{
    console.log(data);
    let userName = document.getElementById("name");
    let empname = document.getElementById("empName");
    let empage = document.getElementById("age");
    let empgender = document.getElementById("gender");
    let empdoj = document.getElementById("doj");
    let empph = document.getElementById("ph");
    let empmail = document.getElementById("mail");
    let empcity = document.getElementById("city");
    let emppost = document.getElementById("post");
    let empdepartment = document.getElementById("department");
    let days_attended = document.getElementById("days_attended");
    let duration = document.getElementById("leave-duration");
    let type = document.getElementById("leave-type");
    let leaveLeft = document.getElementById("leave-left");
    let overtimeHrs = document.getElementById("overtime-hrs");
    let earnings = document.getElementById("earnings");
    let basicSalary = document.getElementById("basic-salary");
    let bonus = document.getElementById("bonus");
    let overtimePay = document.getElementById("overtime-pay");
    let tax = document.getElementById("tax");
    let netSalary = document.getElementById("net-salary");
    let dependentname = document.getElementById("dependentName");
    let dependentrelation = document.getElementById("relationship");
    let dependentcontact = document.getElementById("dependentContact");
    let complaintKeys = document.getElementsByClassName("complaint-keys")[0];
    let complainttitle = document.getElementById("complaint-title");
    let complaintstart = document.getElementById("complaint-start");
    let complaintend = document.getElementById("complaint-end");
    let performancetargets = document.getElementById("targets");
    let performance = document.getElementById("performance");
    let targetsProgressBar = document.getElementById("targetsProgressBar");

    console.log("HERE IS THE FINAL DATA:");
    console.log(data);
    userName.innerHTML = data.first_name;
    empname.innerHTML = data.first_name + " " + data.last_name;
    empage.innerHTML = data.age;
    empgender.innerHTML = data.gender;
    empdoj.innerHTML = data.doj;
    empph.innerHTML = data.ph_no;
    empmail.innerHTML = data.email_id;
    empcity.innerHTML = data.city;
    emppost.innerHTML = data.job_id;
    empdepartment.innerHTML = data.department_id;

    days_attended.innerHTML = data.days_attended + " days";
    duration.innerHTML = data.leave_duration + " days";
    type.innerHTML = data.majority_leave_type;
    leaveLeft.innerHTML = data.leave_left + " days";
    overtimeHrs.innerHTML = data.overtime_hrs + " hours";

    earnings.innerHTML = "$ " + data.net_salary;
    basicSalary.innerHTML = data.basic_salary;
    bonus.innerHTML = data.bonus;
    overtimePay.innerHTML = data.overtime_pay;
    netSalary.innerHTML = data.net_salary;
    tax.innerHTML = data.tax;

    dependentname.innerHTML = data.dep_firstname + " " + data.dep_lastname;
    dependentrelation.innerHTML = data.relationship;
    dependentcontact.innerHTML = data.contact_no;

    

    if(data.department_id == 1)
    {
        let percent = (data.targets_met/15)*100;
        targetsProgressBar.setAttribute('aria-valuenow', percent);
        targetsProgressBar.style.width = percent+'%';
        performancetargets.innerHTML = data.targets_met + "/15";
        //targetsProgressBar.ariaValueNow = data.targets_met;
    }
    
    if(data.department_id == 2)
    {
        let percent = (data.targets_met/10)*100;
        targetsProgressBar.setAttribute('aria-valuenow', percent);
        targetsProgressBar.style.width = percent+'%';
        performancetargets.innerHTML = data.targets_met + "/10";
        // targetsProgressBar.ariaValueNow = data.targets_met;
    }
    if(data.department_id == 3)
    {
        let percent = (data.targets_met/5)*100;
        targetsProgressBar.setAttribute('aria-valuenow', percent);
        targetsProgressBar.style.width = percent+'%';
         performancetargets.innerHTML = data.targets_met + "/5";
        // targetsProgressBar.ariaValueNow = data.targets_met;   
    }


    performance.innerHTML = data.performance + "/3";
    console.log("ct",data.complainttitle);
    console.log(typeof(data.complainttitle));
    if(typeof data.complainttitle == 'undefined')
    {
        console.log("YES UNDEFINED");
        complaintKeys.style.visibility = "hidden";
    }
    else{
        complaintKeys.style.visibility = "visible";
        //PROB: still not visible. dom reload?
    }

}


function generateReport(event) {
    //NOTE: using event as fn param, prevents pointer object op
    /*
    console.log("in report fn");
    
    console.log(globalPayrollData);
    console.log(globalLeaveData);
    console.log(globalDependentsData);
    console.log(globalBankData);
    console.log(globalComplaintsData);
    */
    console.log("in JSPDF fn");
    console.log(data);
    //set heading and description of heading
    var doc = new jsPDF("portrait");
    pageHeight = doc.internal.pageSize.height;
    //get pg nos
    var pageNumber = doc.internal.getNumberOfPages();
    doc.setFontSize(22);
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setTextColor(0, 0, 255)
    doc.text(20, 20, `Report for ${data.first_name} ${data.last_name}`);
    doc.setFontSize(18);
    doc.text(20, 30, 'Consolidated Employee Information');

    doc.setTextColor(0, 0, 0);
    doc.setFont("times");
    doc.setFontType("bolditalic");
    doc.setFontSize(16);
    doc.text(20, 50, 'Personal Information');

    //METHOD2: DIRECTLY FROM JSON
    doc.setFontSize(13);
    doc.setTextColor(100)
    doc.setFontType("helvetica");
    doc.text(20, 60, "First Name: " + data.first_name);
    doc.text(20, 70, "Last Name: " + data.last_name);
    doc.text(20, 80, "Age: " + data.age);
    doc.text(20, 90, "Gender: " + data.gender);
    doc.text(20, 100, "Date of Joining: " + data.doj);
    doc.text(20, 110, "Ph No: " + data.ph_no);
    doc.text(20, 120, "Email id: " + data.email_id);
    doc.text(20, 130, "City: " + data.city);
    doc.text(20, 140, "Job Post: " + data.job_id);
    doc.text(20, 150, "Department: " + data.department_id);

    //get table 
    var res = doc.autoTableHtmlToJson(document.getElementById("payroll-table"));
    //oc.autoTable(res.columns, res.data, { margin: { top: 80 } });

    //set table header
    var header1 = function (data) {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.setFont("times");
        doc.setFontType("bolditalic");
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text("Payroll Details", data.settings.margin.left, 50);
    };
    //adjust position and layout for table and headers 
    var optionsTableHeader = {
        addPageContent: header1,
        margin: {
            top: 0
        },
        startY: doc.autoTableEndPosY() + 55
    };
    //get height of table 
    payrollTableHeight = 300;
    if (payrollTableHeight >= pageHeight) {
        doc.addPage();
        payrollTableHeight = 0;
    }

    //convert table to pdf
    doc.autoTable(res.columns, res.data, optionsTableHeader);

    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont("times");
    doc.setFontType("bolditalic");
    doc.text(20, 30, "Leave Details");
    doc.setFontType("helvetica");
    doc.setFontSize(13);
    doc.text(20, 40, "Leave Duration: " + data.leave_duration);
    doc.text(20, 50, "Majority Leave Type: " + data.majority_leave_type);
    doc.text(20, 60, "Leave Left: " + data.leave_left);
    doc.text(20, 70, "Days Attended: " + data.days_attended);
    doc.text(20, 80, "Overtime Hours: " + data.overtime_hrs);

    //FINAL: save pdf
    doc.lineHeightProportion = 1;
    doc.setPage(pageNumber);
    doc.save("Employee Report");
}

function setError(input, message) {
    let target = input.id;
    if (target == 'username') {
        userName.classList.remove("success");
        userName.classList.add("input-warning");
        uWarn.style.visibility = "visible";
        uWarn.innerHTML = message;
    }
    else if (target == 'password') {
        passWord.classList.remove("success");
        passWord.classList.add("input-warning");
        pWarn.style.visibility = "visible";
        pWarn.innerHTML = message;
    }
    else {
        // window.alert("error");
    }
}

function setSuccess(input, message) {
    let target = input.id;
    if (target == 'username') {
        userName.classList.remove("input-warning");
        userName.classList.add("success");
        uWarn.style.visibility = "hidden";

        localStorage.setItem("name", input.value);
        header.innerHTML = "Welcome " + input.value;
    }
    if (target == 'password') {
        passWord.classList.remove("input-warning");
        passWord.classList.add("success");
        pWarn.style.visibility = "hidden";

        localStorage.setItem("password", input.value);
        console.log(localStorage.getItem("password"));
    }
    

}
