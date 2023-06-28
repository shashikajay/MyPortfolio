function addOrdersToTable(){
    let orderTable = $("#allOrderTable");
    orderTable.empty();

    for (let order of Order) {

        let tr = $('<tr> <td>'+ order.oId +'</td> <td>'+ order.date +'</td> <td>'+ order.customer.name +'</td>  <td>'+ order.subTotal +'</td> </tr>');
        orderTable.append(tr);
    }
}