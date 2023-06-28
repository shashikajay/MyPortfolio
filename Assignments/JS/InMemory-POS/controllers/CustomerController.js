let selectedCustomerRow;
let customerIndex;
let cusId;
let lastTr;

//customer fields
const cusIDF = $('#cid');
const cusNameF = $('#Name');
const cusAddressF = $('#Address');
const cusContactF = $('#contact');

//buttons
const btnAdd = $("#btnAdd");
const tblCustomers = $("#tblCustomers");
const btnUpdate = $("#btnUpdate");
const btnDelete = $("#btnDelete");
const btnClear = $("#btnClear");

//id increment
function incrementCusId(currentID) {
    if (currentID==='no'){
        cusId='C00-001';
    }else {
        let number =parseInt(currentID.slice(4), 10);
        number++;
        cusId = "C00-" + number.toString().padStart(3, "0");
        console.log(cusId);
    }
}




incrementCusId('no');
cusIDF.val(cusId);

function clearCustomerFields() {
    cusIDF.val("");
    cusNameF.val("");
    cusNameF.focus();
    cusAddressF.val("");
    cusContactF.val("");

}



btnUpdate.prop('disabled',true);
btnDelete.prop('disabled',true);


function addCustomer(){
    let cusID = cusIDF.val();
    let cusName = cusNameF.val();
    let cusAddress = cusAddressF.val();
    let cusContact = cusContactF.val();

    //adding the customer to the list and to the table
    customerList.push( new Customer(cusID,cusName,cusAddress,cusContact));
    addCustomersToTable()

    customerList[0].name;

    console.log(customerList);
    loadCustomerOptionIds();

    clearCustomerFields();

    btnUpdate.prop('disabled',false);
    btnDelete.prop('disabled',false);

    incrementCusId(lastTr.find('td:first').text());
    cusIDF.val(cusId);
}

function addCustomersToTable() {
    tblCustomers.empty();

    for (let customer of customerList) {
        let row = $('<tr> <td>'+ customer.cid +'</td> <td>'+ customer.name +'</td> <td>'+ customer.address +'</td> <td>'+ customer.contact +'</td> </tr>');
        tblCustomers.append(row);
        lastTr =row;
    }
}

//Button Add function
btnAdd.click(function (){

    if (validateFields()){
        addCustomer();
    }

});

tblCustomers.dblclick(function (event){

    btnUpdate.prop('disabled',false);
    btnDelete.prop('disabled',false);
    btnAdd.prop('disabled',true);

    selectedCustomerRow = event.target.closest("tr");

    //getting the index of the selected customer
    customerIndex=findCustomerIndex(selectedCustomerRow.cells[0].textContent);

    console.log(customerIndex)

    cusIDF.val(selectedCustomerRow.cells[0].textContent);
    cusNameF.val(selectedCustomerRow.cells[1].textContent);
    cusAddressF.val(selectedCustomerRow.cells[2].textContent);
    cusContactF.val(selectedCustomerRow.cells[3].textContent);

});


//searching for a customer
function findCustomerIndex(selectedCustomerId) {

    for (let i = 0; i < customerList.length; i++) {
        if (customerList[i].cid === selectedCustomerId) {
            return i;
        }
    }

    return -1;
}

//Button delete function
btnUpdate.click(function (){

    if (confirm("Are you sure you want to Update this Customer?")) {
        let cusID = cusIDF.val();
        let cusName = cusNameF.val();
        let cusAddress = cusAddressF.val();
        let cusContact = cusContactF.val();

        selectedCustomerRow.cells[0].textContent=cusID;
        selectedCustomerRow.cells[1].textContent=cusName;
        selectedCustomerRow.cells[2].textContent=cusAddress;
        selectedCustomerRow.cells[3].textContent=cusContact;

        clearCustomerFields();



        //updating the selected customer from the list
        customerList[customerIndex].cid=cusID;
        customerList[customerIndex].name=cusName;
        customerList[customerIndex].address=cusAddress;
        customerList[customerIndex].contact=cusContact;

        console.log(customerList);

        btnUpdate.prop('disabled',true);
        btnDelete.prop('disabled',true);
        btnAdd.prop('disabled',false);

        //getting the first td of the last tr and
        incrementCusId(lastTr.find('td:first').text());
        cusIDF.val(cusId);
    }
});

btnDelete.click(function (){

    if (confirm("Are you sure you want to delete this Customer?")) {
        selectedCustomerRow.remove();

        //removing the selected customer from the list
        customerList.splice(customerIndex,1);
        console.log(customerList);

        clearCustomerFields();

        btnUpdate.prop('disabled',true);
        btnDelete.prop('disabled',true);
        btnAdd.prop('disabled',false);

        incrementCusId(lastTr.find('td:first').text());
        cusIDF.val(cusId);
    }

});

btnClear.click(function (){
    clearCustomerFields();
});

$('#cid, #Name, #Address, #contact').keyup(function (event){
    console.log(event.key)

    if (event.key ==='Tab'){
        event.preventDefault();
    }
});

cusNameF.keyup(function (event){


    if (/^[A-Za-z]+$/.test(cusNameF.val())){

        cusNameF.css('border-color', '#dee2e6');

        if (event.key ==='Enter'){
            cusAddressF.focus();
        }

    }else {
        cusNameF.css('border-color', 'red');
    }

});

cusAddressF.keyup(function (event){
    if (/^[A-Za-z\s.'-]+$/.test(cusAddressF.val())){
        cusAddressF.css('border-color', '#dee2e6');
        if (event.key ==='Enter'){

            cusContactF.focus();
        }
    }else {
        cusAddressF.css('border-color', 'red');
    }

});

cusContactF.keyup(function (event){

    if (/^(?:\+94|0)(?:\d{9}|\d{2}-\d{7})$/.test(cusContactF.val())){
        cusContactF.css('border-color', '#dee2e6');

        if (event.key ==='Enter'){
            addCustomer();
        }
    }else {
        cusContactF.css('border-color', 'red');
    }
});

function validateFields(){
    if (!/^[A-Za-z]+$/.test(cusNameF.val())){
        cusNameF.focus();
        cusNameF.css('border-color', 'red');
        return false;
    }
    if (!/^[A-Za-z\s.'-]+$/.test(cusAddressF.val())){
        cusAddressF.focus();
        cusAddressF.css('border-color', 'red');
        return false;
    }
    if (!/^(?:\+94|0)(?:\d{9}|\d{2}-\d{7})$/.test(cusContactF.val())){
        cusContactF.focus();
        cusContactF.css('border-color', 'red');
        return false;
    }

    cusNameF.css('border-color', '#dee2e6');
    cusAddressF.css('border-color', '#dee2e6');
    cusContactF.css('border-color', '#dee2e6');
    return true;
}