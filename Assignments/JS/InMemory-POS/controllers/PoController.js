let fullTotal = 0;
let orderID='O00-001';
let selectCusIds = $('#customerIds');
let selectItemIds = $('#itemIds');
let customerListElement;
let itemListElement

let selectedCusID="";
let selectedItemID="";

function nextOrderID(){
    let number =parseInt(orderID.slice(4), 10);
    number++;
    orderID = "O00-" + number.toString().padStart(3, "0");
    //console.log(orderID);
}

$('#currentOrderID').val(orderID);


function loadCustomerOptionIds(){
    selectCusIds.empty();
    selectCusIds.append($('<option selected>Select_ID</option>'));

    for (let index in customerList) {
        let option = $('<option value="'+index+'"> '+customerList[index].cid+' </option>');
        selectCusIds.append(option);
    }
}

function loadItemOptionIds(){
    selectItemIds.empty();
    selectItemIds.append($('<option selected>Select_ID</option>'));

    for (let index in itemList) {
        let option = $('<option value="'+index+'"> '+itemList[index].iId+' </option>');
        selectItemIds.append(option);
    }
}

//Date formatter
/*
let date=new Date();

let fullDay = date.getDay();
let fullMonth = date.getMonth()+1;
let fullYear = date.getFullYear();

let dateFormatter=`${fullDay}-${fullMonth}-${fullYear}`;

$('#dtf').val(dateFormatter);*/

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    $('#dtf').val(`${year}-${month}-${day}`);
}

function clearPoFields(){
    $('#itemIds option:contains("Select_ID")').prop('selected', true);
    $('#poItemDesc').val("");
    $('#poItemQtyOnHand').val("");
    $('#poItemUP').val("");
    $('#poItemQty').val("");
}

selectCusIds.click(function (){
    selectedCusID = $("#customerIds :selected").text();
    if (selectedCusID.length > 0){
        $("#customerIds").css("border-color",'white');
        let index = $("#customerIds").val();
        if (selectedCusID!=='Select_ID'){
            //console.log(selectedCusID+" "+index);

            customerListElement = customerList[Number(index)];
            //console.log(Number(index));
            $('#poCustomerName').val(customerListElement.name);
        }
    }
});

selectItemIds.click(function (){
    selectedItemID = $("#itemIds :selected").text();
    if (selectedItemID.length > 0 ){
        $("#itemIds").css("border-color",'white');
        let index = $("#itemIds").val();
        if (selectedItemID!=='Select_ID'){
            //console.log(selectedItemID+" "+index);

            itemListElement = itemList[Number(index)];

            $('#poItemDesc').val(itemListElement.desc);
            $('#poItemQtyOnHand').val(itemListElement.qty);
            $('#poItemUP').val(itemListElement.unitP);

        }else {

        }
    }
});

function qtyValidate(){

    if (/^\d+$/.test($('#poItemQty').val())){
        let qtyOnHand = $('#poItemQtyOnHand').val();
        $('#poItemQty').css("border-color",'white');

        if (qtyOnHand>Number($('#poItemQty').val())){
            $('#poItemQty').css("border-color",'white');
            return true;
        }else {
            $('#poItemQty').css("border-color",'red');
            return true;
        }

    }else {
        $('#poItemQty').css("border-color",'red');
        return false;
    }
}

$('#poItemQty').keyup(function (){
    if (/^\d+$/.test($('#poItemQty').val())){
        let qtyOnHand = $('#poItemQtyOnHand').val();
        $('#poItemQty').css("border-color",'white');

        if (qtyOnHand>=Number($('#poItemQty').val())){
            $('#poItemQty').css("border-color",'white');
        }else {
            $('#poItemQty').css("border-color",'red');
        }

    }else {
        $('#poItemQty').css("border-color",'red');
    }
});

function addItemToCartTable() {
    let cart = $("#pOTBody");
    cart.empty();

    for (let item of cartItem) {

        let tr = $('<tr> <td>'+ item.id +'</td> <td>'+ item.desc +'</td> <td>'+ item.bQty +'</td> <td>'+ item.Up +'</td> <td>'+ item.tot +'</td> </tr>');
        cart.append(tr);
    }
}

function searchCart(index){
    for (let i = 0; i < cartItem.length; i++) {
        if (cartItem[i].id==index){
            //console.log(i);
            return i;
        }
    }
    return -1;
}

function searchItem(id) {

    for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].iId === id) {
            return i;
        }
    }
    return -1;
}

$('#btnAddToCart').click(function (){

    if (selectedCusID.length > 0 && selectedItemID.length > 0 && selectedItemID!=='Select_ID' && selectedCusID!=='Select_ID'){
        let bItemId;
        let desc;
        let unitPrice;
        let qtyOnHand;
        let buyingQty;

        bItemId = $("#itemIds :selected").text();
        desc = $('#poItemDesc').val();
        qtyOnHand = $('#poItemQtyOnHand').val();
        unitPrice = $('#poItemUP').val();
        buyingQty = $('#poItemQty').val();

        let itemIndex = searchItem(itemListElement.iId);
        console.log(itemIndex);
        itemList[itemIndex].qty=Number(itemList[itemIndex].qty)-Number(buyingQty);

        addItemsToTable();


        if (qtyValidate() ){
            $('#poItemQty').css("border-color",'white');
            $('#poItemQty').css("border-color",'white');
            //making the total for the table row
            let total = eval(unitPrice+'*'+buyingQty);

            fullTotal+=total;

            //console.log(cartItem);

            if (searchCart(bItemId)>=0){
                let searchID = searchCart(bItemId);
                let newBQty = Number(cartItem[searchID].bQty)+Number(buyingQty);
                let newTot = Number(cartItem[searchID].tot)+total;

                cartItem[searchID].bQty=newBQty;
                cartItem[searchID].tot=newTot;

            }else {
                cartItem.push({id: bItemId ,desc: desc, Up: unitPrice,qty: qtyOnHand,bQty: buyingQty,tot:total});
            }

            //making and adding the row to the table
            /*let tr = $('<tr> <td>'+ itemId +'</td> <td>'+ desc +'</td> <td>'+ buyingQty +'</td> <td>'+ unitPrice +'</td> <td>'+ total +'</td> </tr>');
            $("#pOTBody").append(tr);*/
            addItemToCartTable();


            $('#maxTot').val(total);

            clearPoFields()

        }else {
            $('#poItemQty').css("border-color",'red');
        }
    }else {
        $("#customerIds").css("border-color",'red');
        $("#itemIds").css("border-color",'red');
    }
});

$('#deleteCartItem').click(function (event){
    event.preventDefault();

    //let selectedRows = $("#pOTBody").find("tr.selected");
    let selectedRows = $("#pOTBody tr.selected");
    console.log(selectedRows);

    selectedRows.find('td:first').text();
});

let subTotal;
$('#discount').keydown(function (event){

    if (event.key==='Enter'){
        if ($('#discount').val()!="0"){
            subTotal = fullTotal-Number($('#discount').val());

            $('#subTot').val(subTotal);
        }else if ($('#discount').val()=="0"){
            $('#subTot').val(fullTotal);
            subTotal = fullTotal-Number($('#discount').val());
        }
    }

});

//clearing fields
function clearAllFields() {
    cartItem=[];

}


//purchase Order
$('#purchaseOrder').click(function (){

    if (selectedCusID.length > 0 && selectedItemID.length > 0 && selectedItemID!=='Select_ID' && selectedCusID!=='Select_ID'){
        let orders = new Orders(orderID,customerListElement,$('#dtf').val(),cartItem,subTotal);
        //console.log(orders);

        //clearing fields
        $('#customerIds option:contains("Select_ID")').prop('selected', true);
        $('#poCustomerName').val("");
        $("#pOTBody").empty();
        $('#discount').val("");
        $('#subTot').val("");
        cartItem=[];


        Order.push(orders);
        addOrdersToTable();

        //incrementing next order id
        nextOrderID();
        $('#currentOrderID').val(orderID);
    }else {
        $("#customerIds").css("border-color",'red');
        $("#itemIds").css("border-color",'red');
    }

});