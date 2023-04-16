var empDets;
fetch(
    `empAllInfo.php`
).then((res) => res.json())
    .then(function (data) {
        globalAllEmpData = data;
        console.log("globalAllEmpData ", globalAllEmpData);
        setAllEmpData(globalAllEmpData)
});

fetch(
    `performanceAllInfo.php`
).then((res) => res.json())
.then(function (data) {
    globalAllPerfData = data;
    console.log("globalAllPerfData ", globalAllPerfData);
    setAllPerfData(globalAllPerfData)
});

function setAllEmpData(globalAllEmpData)
{
    console.log(globalAllEmpData.length);
    let totalEmps = document.getElementById("total-emps");
    totalEmps.innerHTML = globalAllEmpData.length;
}

function setAllPerfData(globalAllPerfData)
{
    console.log(globalAllPerfData);
    let avgPerf = document.getElementById("avg-performance");
    avgPerf.innerHTML = globalAllPerfData.performance;
}