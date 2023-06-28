document.getElementById("item");

document.getElementById("item").style.display="none";
document.getElementById("orders").style.display="none";
document.getElementById("placeOrder").style.display="none";

document.getElementById("btnCustomer").addEventListener("click", function(){

    document.getElementById("customers").style.display="block";
    document.getElementById("item").style.display="none";
    document.getElementById("orders").style.display="none";
    document.getElementById("placeOrder").style.display="none";

});
document.getElementById("btnItem").addEventListener("click", function(){
    document.getElementById("customers").style.display="none";
    document.getElementById("item").style.display="block";
    document.getElementById("orders").style.display="none";
    document.getElementById("placeOrder").style.display="none";
});
document.getElementById("btnOrder").addEventListener("click", function(){
    document.getElementById("customers").style.display="none";
    document.getElementById("item").style.display="none";
    document.getElementById("orders").style.display="block";
    document.getElementById("placeOrder").style.display="none";
});
document.getElementById("btnPlaceOrder").addEventListener("click", function(){
    getTodayDate();
    document.getElementById("customers").style.display="none";
    document.getElementById("item").style.display="none";
    document.getElementById("orders").style.display="none";
    document.getElementById("placeOrder").style.display="block";
});
