var about = document.getElementById("about-us");
var services = document.getElementById("services");
function openTab(tabName) {
    var i;
    var tab = document.getElementsByClassName("tab");
    for (i = 0; i < tab.length; i++) {
      tab[i].style.display = "none";  
      
    }
    document.getElementById(tabName).style.display = "block";  
  }

  about.addEventListener('click', function() {
    about.style.backgroundColor = "lightgrey";
    //TODO: make h3 into button tag
  })