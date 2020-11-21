$('#formEdit').on('submit', function (e) {
    console.log("submit");
    e.preventDefault();
    var formData = $('#formEdit').serializeArray();
    var data = {};
    $.each(formData, function (i, v) {
        data[v.name] = v.value;
    });
    var idsDish = [];
    var listNumberItem = [];
    var cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    $.each(cartItems,function (i,v) {
        idsDish.push(v.id);
        listNumberItem.push(v.quantity);
    });
    data['idsDish'] = idsDish;
    data['listNumberItem'] = listNumberItem;
    $.ajax({
        type: "POST",
        url: "/api/order",
        // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            alert(response.message);
            $('.loader').css("display", "none");
            window.location.href = "/product/list"
          resetStorage();
        }, error: function (response) {
            $('.loader').css("display", "none");
            alert(response.responseJSON.message);

        }
    });
});
function resetStorage(){
    sessionStorage.setItem("cartItems",JSON.stringify([]));
    sessionStorage.setItem("totalProduct",JSON.stringify(0));
    sessionStorage.setItem("totalPrice",JSON.stringify(0));
}
$('#completedOrder').on('click', function () {
    $('#totalPrice2').val($('#totalPrice').text());
    var price = $('#totalPrice').attr("data-total-price");
    $('#totalPrice2').attr("data-price", price);
    $('#totalPricePaid').val($('#totalPrice').text());
});
$('#checkVoucher').on('click', function () {
    var voucherCode = $('#voucherCode').val();
    $.ajax({
        type: "GET",
        url: "/api/voucher/valid?code=" + voucherCode,
        // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        // data: JSON.stringify(data),
        // dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            $('.loader').css("display", "none");
            $('#alertVoucher').text(response.data.discount + " % ");
            var totalPrice = parseInt($('#totalPrice').attr("data-total-price"));
            var discount = response.data.discount / 100;
            var totalPriceAfter = totalPrice * discount;
            $('#totalPricePaid').val(totalPriceAfter.toLocaleString('it-IT', {style: 'currency', currency: 'VND'}));
        }, error: function (response) {
            $('.loader').css("display", "none");
            $('#alertVoucher').text(response.responseJSON.message);

        }
    });
})