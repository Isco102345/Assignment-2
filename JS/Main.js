var BookName = document.getElementById("bookmarkName");
var UrlName = document.getElementById("bookmarkURL");

var inputField = document.getElementById("bookmarkName");
var errorIcon = document.getElementById("nameError");
var validIcon = document.getElementById("namevalid");
var urlField = document.getElementById("bookmarkURL");
var errorIconurl = document.getElementById("urlError")
var validIconurl = document.getElementById("urlValid");

/* var errorMessage = document.getElementById("errorMessage");
var errorText = document.getElementById("errorText");
var closeError = document.getElementById("closeError"); */

/* function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = "block"; 
}

closeError.addEventListener("click", function() {
    errorMessage.style.display = "none"; 
}); */

function showError(message) {
    Swal.fire({
        title: 'Error!',
        html: message,
        icon: 'error',
        confirmButtonText: 'Close'
    });
}

var allData = []

if (localStorage.getItem("All-Data") != null) {
    allData = JSON.parse(localStorage.getItem("All-Data"));
    Display();
}

function ValidName() {
    var regex = /^[A-z]?[a-z]{3,10}$/

    if (regex.test(BookName.value) == true) {
        inputField.classList.remove("error");
        inputField.classList.add("valid");
        errorIcon.style.display = "none";
        validIcon.style.display = "inline-block";
        return true;
    } else {
        inputField.classList.add("error");
        inputField.classList.remove("valid");
        errorIcon.style.display = "inline-block";
        validIcon.style.display = "none";
        /* return window.alert(`Site Name or Url is not valid, Please follow the rules below :

        Site name must contain at least 3 characters
        Site URL must be a valid one`) */

        showError(`Site Name or Url is not valid, Please follow the rules below :

         <ul>
                <li><i class="fa-regular fa-circle-right p-2"></i>Site name must contain at least 3 characters</li>
                <li><i class="fa-regular fa-circle-right p-2"></i>Site URL must be a valid one</li>
        </ul>`);
    }
}

function ValidUrl() {
    var regex = /^https:\/\/[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}([\/\w .-]*)*\/?$/

    if (regex.test(UrlName.value) == true) {
        UrlName.classList.remove("error");
        UrlName.classList.add("valid");
        errorIconurl.style.display = "none";
        validIconurl.style.display = "inline-block";
        return true;
    } else {
        UrlName.classList.add("error");
        UrlName.classList.remove("valid");
        errorIconurl.style.display = "inline-block";
        validIconurl.style.display = "none";
        /* return window.alert(`Site Name or Url is not valid, Please follow the rules below :

        Site name must contain at least 3 characters
        Site URL must be a valid one`) */

        showError(`Site Name or Url is not valid, Please follow the rules below :

            <ul>
                   <li><i class="fa-regular fa-circle-right p-2"></i>Site name must contain at least 3 characters</li>
                   <li><i class="fa-regular fa-circle-right p-2"></i>Site URL must be a valid one</li>
           </ul>`);
    }
}


function Run() {
    if (ValidName() == true && ValidUrl() == true) {
        getValues();
        clearValues();
        Display();
    }
}

function getValues() {
    var box = {
        bn: BookName.value,
        un: UrlName.value
    }
    allData.push(box)

    localStorage.setItem("All-Data", JSON.stringify(allData));
}

function clearValues() {
    BookName.value = "",
        UrlName.value = ""
}

function DeleteInput(index) {
    allData.splice(index, 1);
    localStorage.setItem("All-Data", JSON.stringify(allData));
    Display();
}

function VisitUrl(index) {
    var url = allData[index].un;
    if (url) {
        window.open(url, "_blank");
    }
}
function Display() {
    var cartona = ""
    for (var i = 0; i < allData.length; i++) {
        cartona += `
         <tr>
           <td>${i + 1}</td>
           <td>${allData[i].bn}</td>
           <td><button  onclick="VisitUrl(${i})" class="btn btn-visit"><i class="fa-regular fa-eye"></i> Visit</button></td>
           <td><button onclick="DeleteInput(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
          </tr>
        `
    }
    document.getElementById('demo').innerHTML = cartona;
}