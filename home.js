var selectedRow = null
// submitting values
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}
// read the values
function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["lname"] = document.getElementById("lname").value;
    formData["dob"] = document.getElementById("dob").value;
    formData["city"] = document.getElementById("city").value;
    formData["number"] = document.getElementById("number").value;

    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell5 = newRow.insertCell(1);
    cell5.innerHTML = data.lname;
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = data.dob;
   
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell3 = newRow.insertCell(4);
    cell3.innerHTML = data.number;
    cell4 = newRow.insertCell(5);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}
// reset the values
function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("lname").value = "";

    document.getElementById("dob").value = "";
    document.getElementById("city").value = "";
    document.getElementById("number").value = "";
    selectedRow = null;
}

// edit values
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = "";
    document.getElementById("lname").value = "";

    document.getElementById("dob").value = selectedRow.cells[1].innerHTML;
    document.getElementById("city").value = selectedRow.cells[2].innerHTML;
    document.getElementById("number").value = selectedRow.cells[3].innerHTML;
}
// update values
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.lname;

    selectedRow.cells[2].innerHTML = formData.dob;
    selectedRow.cells[3].innerHTML = formData.city;
    selectedRow.cells[4].innerHTML = formData.number;
}
// delete values
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
// validate user input
function validate() {
    isValid = true;
    var letter=/^[a-zA-Z ]*$/;
    // validate full name
    if (document.getElementById("fullName").value == "" ) 
    {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } 
    else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide") )
        {
            document.getElementById("fullNameValidationError").classList.add("hide");
            alert("Invalid Name Formate (Alphabets Allowed") ;
            return false;
        }
    }
    // validate date of birth
    if(document.getElementById("dob").value==""){
        alert('DOB should not be empty' );
        return false;
    }
    // validate the city
    if(document.getElementById("city").value==""){
        alert('City should not be empty');
        return false;
    }
    // validate the mobile number
    var mobileformate=/^(\+\d{1,3}[- ]?)?\d{10}$/;

    if((document.getElementById("number").value).length<10)
        {
            alert("10 Digits Allowed In Mobile Number");
            return false;
        }
        else{
            if(mobileformate.test(document.getElementById("number").value)==false)
            {
                alert("Mobile Number Should Not Be Alphabets");
                return false;

            }
        }
    return isValid;
}