//GET VARS
var form = document.getElementById("form");
var userName = document.getElementById("user-name");
//WARNING DIVS 
var passWord = document.getElementById("password");
var uWarn = document.getElementById("usernameWarning");
var pWarn = document.getElementById("passwordWarning");
//HEADER
var header = document.getElementById("header");

//if user has already inputted form before, insert saved values
window.addEventListener('load', (event) => {
    let savedName = localStorage.getItem("name");
    let savedEmail = localStorage.getItem("email");
    if (savedName != null) {
        userName.defaultValue = savedName;
    }
    if (savedEmail != null) {
        email.defaultValue = savedEmail;
    }
});

form.addEventListener('submit', event => {
    //stops from producing NOT FOUND error
    event.preventDefault();
    validateForm();
});


function validateForm() {
    //GET INPUT VALS 
    const userNameVal = userName.value.trim();
    const passWordVal = passWord.value.trim();
    //REGEX 
    const employeeRegex = /^5.*/;
    const pwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    //VALIDITY 
    var unameValid, pwordValid;
    var employee, admin;

    //USERNAME
    if (userNameVal.length === 0) {
        setError(userName, 'username can\'t be empty');
    }
    else if (userNameVal.length < 2 || userNameVal.length > 5) {
        setError(userName, 'username must be between 2-5 characters');
    }
    else if(!userNameVal.match(employeeRegex) && userNameVal.toLowerCase() != 'admin')
    {
        setError(userName, 'Invalid user');
    }
    else if(userNameVal*1 < 51 || userNameVal*1 >5500)
    {
        setError(userName, 'Invalid employee username');
    }
    else {
        setSuccess(userName);
        unameValid = 1;
    }

    //PASSWORD
    if (passWordVal === 0) {
        setError(passWord, 'pasword can\'t be empty');
    }
    else if (!passWordVal.match(pwordRegex)) {
        setError(passWord, '8 - 10 characters long with alphanumerics,special characters upper and lower case');
    }
    else {
        setSuccess(passWord);
        pwordValid = 1;
    }

    //all valid 
    if(unameValid && pwordValid)
    {
        if(userNameVal === 'admin')
        window.open("http://127.0.0.1:5500/employee.html");
        if(userNameVal === '5141' || userNameVal === '5222' || userNameVal === '5378')
        alert('manager');
    }
}

function setError(input, message) {
    let target = input.id;
    if (target == 'user-name') {
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
        window.alert("error");
    }
}

function setSuccess(input) {
    let target = input.id;
    if (target == 'user-name') {
        userName.classList.remove("input-warning");
        userName.classList.add("success");
        uWarn.style.visibility = "hidden";

        localStorage.setItem("name", input.value);
        header.innerHTML = "Welcome " + input.value;
        console.log(localStorage.getItem("name"));
    }
    else if (target == 'password') {
        passWord.classList.remove("input-warning");
        passWord.classList.add("success");
        pWarn.style.visibility = "hidden";

        localStorage.setItem("password", input.value);
        console.log(localStorage.getItem("password"));
    }
    else {
        window.alert("error");
    }
}

