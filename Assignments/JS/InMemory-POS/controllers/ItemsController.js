let selectedItemRow;
let itemIndex;
let itemId;
let lastITr;

//regex for item fields
const itemNameRegex = /^[a-zA-Z0-9\s]+$/;
const itemPriceRegex = /^\d+(\.\d{1,2})?$/;
const itemQuantityRegex = /^\d+$/;


//buttons
const btnItemAdd = $("#btnItemAdd");
const tblItems = $("#tblItemBody");
const btnItemUpdate = $("#btnItemUpdate");
const btnItemDelete = $("#btnItemDelete");
const btnItemClear = $("#btnItemClear");

//Item fields
const itemIdF = $('#Iid');
const itemDescF = $('#ItemDesc');
const itemPF = $('#UPrice');
const itemQtyF = $('#Qty');

//increase item id
function incrementItemId(currentID) {
    if (currentID==='no'){
        itemId='I00-001';
    }else {
        let number =parseInt(currentID.slice(4), 10);
        number++;
        itemId = "I00-" + number.toString().padStart(3, "0");
    }
}

incrementItemId('no');
itemIdF.val(itemId);

function clearItemFields() {
    itemIdF.val("");
    itemDescF.val("");
    itemPF.val("");
    itemQtyF.val("");

    itemDescF.focus();
}



btnItemUpdate.prop('disabled',true);
btnItemDelete.prop('disabled',true);

function addItem() {
    let iID = itemIdF.val();
    let itemDesc = itemDescF.val();
    let itemPrice = itemPF.val();
    let itemQty = itemQtyF.val();

    //adding the customer to the list and to the table
    itemList.push(new Items(iID ,itemDesc,itemQty, itemPrice));
    addItemsToTable();
    console.log(itemList);
    loadItemOptionIds();

    clearItemFields();

    incrementItemId(lastITr.find('td:first').text());
    itemIdF.val(itemId);

    btnItemUpdate.prop('disabled',false);
    btnItemDelete.prop('disabled',false);
}

function addItemsToTable() {
    tblItems.empty();

    for (let item of itemList) {
        let row = $('<tr> <td>'+ item.iId +'</td> <td>'+ item.desc +'</td> <td>'+ item.unitP +'</td> <td>'+ item.qty +'</td> </tr>');
        lastITr =row;
        tblItems.append(row);
    }
}

//Button Add function
btnItemAdd.click(function (){

    if (validateItemFields()){
        addItem();
    }
});

tblItems.dblclick(function (event){

    btnItemUpdate.prop('disabled',false);
    btnItemDelete.prop('disabled',false);
    btnItemAdd.prop('disabled',true);

    selectedItemRow = event.target.closest("tr");
    //getting the index of the selected customer
    //itemIndex = itemList.findIndex(itemList => itemList.iId === selectedItemRow.cells[0].textContent);
    itemIndex = findItem(selectedItemRow.cells[0].textContent);
    console.log(itemIndex)

    itemIdF.val(selectedItemRow.cells[0].textContent);
    itemDescF.val(selectedItemRow.cells[1].textContent);
    itemPF.val(selectedItemRow.cells[2].textContent);
    itemQtyF.val(selectedItemRow.cells[3].textContent);

});


function findItem(selectedItem) {
    for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].iId === selectedItem) {
            return i;
        }
    }

    return -1;
}

//Button delete function
btnItemUpdate.click(function (){

    if (confirm("Are you sure you want to Update this Item?")) {

        let iID = itemIdF.val();
        let itemDesc = itemDescF.val();
        let itemPrice = itemPF.val();
        let itemQty = itemQtyF.val();

        selectedItemRow.cells[0].textContent=iID;
        selectedItemRow.cells[1].textContent=itemDesc;
        selectedItemRow.cells[2].textContent=itemPrice;
        selectedItemRow.cells[3].textContent=itemQty;

        clearItemFields();

        incrementItemId(lastITr.find('td:first').text());
        itemIdF.val(itemId);

        //updating the selected customer from the list
        itemList[itemIndex].iId=iID;
        itemList[itemIndex].desc=itemDesc;
        itemList[itemIndex].unitP=itemPrice;
        itemList[itemIndex].qty=itemQty;

        console.log(itemList);

        btnItemUpdate.prop('disabled',true);
        btnItemDelete.prop('disabled',true);
        btnItemAdd.prop('disabled',false);
    }
});

btnItemDelete.click(function (){

    if (confirm("Are you sure you want to delete this Customer?")) {
        selectedItemRow.remove();

        //removing the selected customer from the list
        itemList.splice(itemIndex,1);
        console.log(itemList);

        clearItemFields();

        incrementItemId(lastITr.find('td:first').text());
        itemIdF.val(itemId);

        btnItemUpdate.prop('disabled',true);
        btnItemDelete.prop('disabled',true);
        btnItemAdd.prop('disabled',false);
    }

});

btnItemClear.click(function (){
    clearItemFields();
});

$('#Iid,#ItemDesc,#UPrice,#Qty').keyup(function (event){
    console.log(event.key)

    if (event.key ==='Tab'){
        event.preventDefault();
    }
});

itemDescF.keyup(function (event){


    if (itemNameRegex.test(itemDescF.val())){

        itemDescF.css('border-color', '#dee2e6');

        if (event.key ==='Enter'){
            itemPF.focus();
        }

    }else {
        itemDescF.css('border-color', 'red');
    }

});

itemPF.keyup(function (event){
    if (itemPriceRegex.test(itemPF.val())){
        itemPF.css('border-color', '#dee2e6');
        if (event.key ==='Enter'){

            itemQtyF.focus();
        }
    }else {
        itemPF.css('border-color', 'red');
    }

});

itemQtyF.keyup(function (event){

    if (itemQuantityRegex.test(itemQtyF.val())){
        itemQtyF.css('border-color', '#dee2e6');

        if (event.key ==='Enter'){
            addItem();
        }
    }else {
        itemQtyF.css('border-color', 'red');
    }
});

function validateItemFields(){
    if (!itemNameRegex.test(itemDescF.val())){
        itemDescF.focus();
        itemDescF.css('border-color', 'red');
        return false;
    }
    if (!itemPriceRegex.test(itemPF.val())){
        cusAddressF.focus();
        cusAddressF.css('border-color', 'red');
        return false;
    }
    if (!itemQuantityRegex.test(itemQtyF.val())){
        cusContactF.focus();
        cusContactF.css('border-color', 'red');
        return false;
    }

    cusNameF.css('border-color', '#dee2e6');
    cusAddressF.css('border-color', '#dee2e6');
    cusContactF.css('border-color', '#dee2e6');
    return true;
}