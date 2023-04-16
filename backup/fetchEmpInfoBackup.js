//event listeners 
window.addEventListener('load', init());
var xyz;
//IIFE FETCH API - WORKS BETTER
/*
const getEmpData = async () => {
    var response = await fetch('empInfo.php');
    var data = await response.json();
    globalEmpData = data;
    console.log(globalEmpData);
    xyz=data;
    return data;
};
const getPayrollData = async () => {
    var response = await fetch('payrollInfo.php');
    var data = await response.json();
    globalPayrollData = data;
    return data;
}
const getLeaveData = async () => {
    var response = await fetch('leaveInfo.php');
    var data = await response.json();
    globalLeaveData = data;
    return data;
}
const getComplaintsData = async () => {
    var response = await fetch('complaintsInfo.php');
    var data = await response.json();
    globalComplaintsData = data;
    return data;
}
const getDependentsData = async () => {
    var response = await fetch('dependentsInfo.php');
    var data = await response.json();
    globalDependentsData = data;
    return data;
}
const getBankData = async () => {
    var response = await fetch('bankInfo.php');
    var data = await response.json();
    globalBankData = data;
    return data;
}
(async () => {
    await getEmpData();
    console.log("ASYNC FN: ", globalEmpData);
    empSetDets(globalEmpData);
    await getPayrollData();
    console.log("ASYNC FN: ", globalPayrollData);
    await getLeaveData();
    console.log("ASYNC FN: ", globalLeaveData);
    await getComplaintsData();
    console.log("ASYNC FN: ", globalComplaintsData);
    await getDependentsData();
    console.log("ASYNC FN: ", globalDependentsData);
    await getBankData();
    console.log("ASYNC FN: ", globalBankData);
})();
*/
//CANT delete: - call all fns in async
function init() {
    console.log("in init fn");

    fetch(
        `empInfo.php`
    ).then((res) => res.json())
        .then(function (data) {
            empDets = data;
            console.log("empDets ", empDets);
            empSetDets(data);
        });

    fetch(
        `leaveInfo.php`
    ).then((res) => res.json())
        .then(function (data2) {
            leaveDets = data2;
            console.log("leaveDets ", leaveDets);
            empSetLeave(data2)
        })

    fetch('payrollInfo.php')
        .then((res) => res.json())
        .then(function (data2) {
            payrollDets = data2;
            console.log("payrollDets ", payrollDets);
            empSetPayroll(data2)
        })

    fetch('dependentsInfo.php')
        .then((res) => res.json())
        .then(function (data2) {
            dependentsDets = data2;
            console.log("dependentsDets ", dependentsDets);
            empSetDependents(data2)
        })

    fetch('complaintsInfo.php')
        .then((res) => res.json())
        .then(function (data) {
            complaintsDets = data;
            console.log("complaintsDets ", complaintsDets);
            empSetComplaints(data)
        })

    fetch('bankInfo.php')
        .then((res) => res.json())
        .then(function (data2) {
            empSetBank(data2)
        })

    fetch('performanceInfo.php')
        .then((res) => res.json())
        .then(function (data2) {
            empSetPerformance(data2)
        })
}
//reportBtn.onclick = generateReport(event);

//welcome user function by settting the name
function empSetDets(data) {
    //NOTE: due to scope of storedData, it throws undefined error
    //TODO: based on time, change greeting msg
    let userName = document.getElementById("name");
    let name = document.getElementById("empName");
    let age = document.getElementById("age");
    let gender = document.getElementById("gender");
    let doj = document.getElementById("doj");
    let ph = document.getElementById("ph");
    let mail = document.getElementById("mail");
    let city = document.getElementById("city");
    let post = document.getElementById("post");
    let department = document.getElementById("department");

    console.log("in set emp fn");
    console.log(data);
    let empName = data.first_name;
    userName.textContent = ` ${empName}`;

    name.innerHTML = data.first_name + " " + data.last_name;
    age.innerHTML = data.age;
    gender.innerHTML = data.gender;
    doj.innerHTML = data.doj;
    ph.innerHTML = data.ph_no;
    mail.innerHTML = data.email_id;
    city.innerHTML = data.city;
    post.innerHTML = data.job_id;
    department.innerHTML = data.department_id;
}

function empSetLeave(data) {
    console.log("in setLeave fn");
    console.log(data);

    let days_attended = document.getElementById("days_attended");
    let duration = document.getElementById("leave-duration");
    let type = document.getElementById("leave-type");
    let leaveLeft = document.getElementById("leave-left");
    let overtimeHrs = document.getElementById("overtime-hrs");

    days_attended.innerHTML = data.days_attended + " days";
    duration.innerHTML = data.leave_duration + " days";
    type.innerHTML = data.majority_leave_type;
    leaveLeft.innerHTML = data.leave_left + " days";
    overtimeHrs.innerHTML = data.overtime_hrs + " hours";
}

function empSetPayroll(data) {
    console.log("in payroll fn");
    console.log(data);

    let earnings = document.getElementById("earnings");
    let basicSalary = document.getElementById("basic-salary");
    let bonus = document.getElementById("bonus");
    let overtimePay = document.getElementById("overtime-pay");
    let tax = document.getElementById("tax");
    let netSalary = document.getElementById("net-salary");

    earnings.innerHTML = "$ " + data.net_salary;
    basicSalary.innerHTML = data.basic_salary;
    bonus.innerHTML = data.bonus;
    overtimePay.innerHTML = data.overtime_pay;
    netSalary.innerHTML = data.net_salary;
    tax.innerHTML = data.tax;

}

function empSetBank(data) {
    console.log("in bank fn");
    console.log(data);
}

function empSetDependents(data) {
    console.log("in dependents fn");
    console.log(data);

    let name = document.getElementById("dependentName");
    let relation = document.getElementById("relationship");
    let contact = document.getElementById("dependentContact");

    name.innerHTML = data.dep_firstname + " " + data.dep_lastname;
    relation.innerHTML = data.relationship;
    contact.innerHTML = data.contact_no;
}

function empSetComplaints(data) {
    console.log("in complaints fn");
    console.log(data);

    //TODO: display no of complaints - data.length
    let title = document.getElementById("complaint-title");
    let start = document.getElementById("complaint-start");
    let end = document.getElementById("complaint-end");

    title.innerHTML = data.type;
    start.innerHTML = data.issue_date;
    end.innerHTML = data.close_date;
}

function empSetPerformance(data) {
    //set percentage based on total targets specified in performance.xcel
    let targets = document.getElementById("targets");
    let performance = document.getElementById("performance");

    targets.innerHTML = data.targets_met;
    performance.innerHTML = data.performance + "/3";
}

//jsPDF download report 
/*
function generateReport()
{
    console.log("in JSPDF fn");
    var doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(20, 20, 'title goes here');
    doc.setFontSize(16);
    doc.text(20, 30, 'content goes here');

    doc.save("Employee Report");
}
*/
//JSPDF fn
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
    console.log(globalEmpData);
    //set heading and description of heading
    var doc = new jsPDF("portrait");
    pageHeight = doc.internal.pageSize.height;
    //get pg nos
    var pageNumber = doc.internal.getNumberOfPages();
    doc.setFontSize(22);
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setTextColor(0, 0, 255)
    doc.text(20, 20, `Report for ${globalEmpData.first_name} ${globalEmpData.last_name}`);
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
    doc.text(20, 60, "First Name: " + globalEmpData.first_name);
    doc.text(20, 70, "Last Name: " + globalEmpData.last_name);
    doc.text(20, 80, "Age: " + globalEmpData.age);
    doc.text(20, 90, "Gender: " + globalEmpData.gender);
    doc.text(20, 100, "Date of Joining: " + globalEmpData.doj);
    doc.text(20, 110, "Ph No: " + globalEmpData.ph_no);
    doc.text(20, 120, "Email id: " + globalEmpData.email_id);
    doc.text(20, 130, "City: " + globalEmpData.city);
    doc.text(20, 140, "Job Post: " + globalEmpData.job_id);
    doc.text(20, 150, "Department: " + globalEmpData.department_id);

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
    doc.text(20, 40, "Leave Duration: " + globalLeaveData.leave_duration);
    doc.text(20, 50, "Majority Leave Type: " + globalLeaveData.majority_leave_type);
    doc.text(20, 60, "Leave Left: " + globalLeaveData.leave_left);
    doc.text(20, 70, "Days Attended: " + globalLeaveData.days_attended);
    doc.text(20, 80, "Overtime Hours: " + globalLeaveData.overtime_hrs);

    //FINAL: save pdf
    doc.lineHeightProportion = 1;
    doc.setPage(pageNumber);
    doc.save("Employee Report");
}
//other fns 
function openComplaint()
{

}
/*ALT METHODS FOR JSPDF

//set height for personal info div
//METHOD1:get perosnal info from dvi
      doc.fromHTML($('.personalDets').get(0), 15, 15, {
        addPageContent: header2,
        'width': 100, 
        'elementHandlers': specialElementHandlers
      });
      var header2 = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text("Personal Information", data.settings.margin.left, 50, 50, 50);
    }
      //props for personaldets div
    var specialElementHandlers = {
        '#getPDF': function(element, renderer){
          return true;
        },
        '.controls': function(element, renderer){
          return true;
        }
      };
      personalInfoDivHeight = 300;
      if(personalInfoDivHeight >= pageHeight)
      {
        doc.addPage();
        personalInfoDivHeight = 0;
      }

      //METHOD2: DIRECTLY FROM JSON
    doc.text(20, 50,
        "First Name: " + globalEmpData.first_name +
        "Last Name: " + globalEmpData.last_name, );

      //FOR TABLe
    //doc.fromHTML('<html><head><title>hi</title></head><body>' + name.innerHTML + `</body></html>`,optionsPersonalDivHeader);

*/