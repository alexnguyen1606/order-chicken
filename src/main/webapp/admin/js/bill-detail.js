jQuery(function ($) {
    $(document).ready(function () {
        function getBill(){
            var orderId = $('#id').val();
            getOrderDetails(orderId);
            getOrderInfo(orderId);
        }
        getBill();
        function getOrderDetails(orderId) {
            $.ajax({
                type: "GET",
                url: "/api/admin/order-detail/order/" + orderId,
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                // data: JSON.stringify(data),
                // dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {
                    bindingOrderDetail(response.data)
                    $('.loader').css("display", "none");
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            });
        }

        function bindingOrderDetail(data) {
            var row = "";
            $.each(data, function (i, v) {
                var price = v.price;
                var nameProduct = v.productName;
                var idProduct = v.idDish;
                var priceString = parseInt(price).toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
                var totalPrice = parseInt(v.totalPrice).toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
                row += '<tr id="product_id_' + idProduct + '" data-id="' + idProduct + '">';
                row += '<td class="text-center">' + nameProduct + '</td>';
                row += '<td class="text-center">' + priceString + '</td>';
                row += '<td class="text-center">';
                row += '<span class="pl-1 pr-1 items" data-item="1" data-id="' + idProduct + '" id="product_added_amount_' + idProduct + '">' + v.number + '</span>';
                row += '</td>';
                row += '<td class="text-center"><p class="totalPricePerProduct" id="product_added_price_' + idProduct + '" data-price="' + price + '">' + totalPrice + '</p></td>';
                row += '</tr>';
            });
            $('#productOrdered').empty();
            $('#productOrdered').append(row);
        }

        function getOrderInfo(orderId) {
            $.ajax({
                type: "GET",
                url: "/api/admin/order/" + orderId,
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                // data: JSON.stringify(data),
                // dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {
                    bindingOrderInfo(response.data);
                    $('.loader').css("display", "none");
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            });
        }

        function bindingOrderInfo(data) {
            $('#totalItem').text(data.totalNumber);
            $('.totalPrice').text("Tổng tiền:"+data.totalPrice.toLocaleString('it-IT', {style: 'currency', currency: 'VND'}));
            $('.name').text("Tên khách hàng :"+data.customerName);
            $('.note').text("Ghi chú :"+data.note);
            $('.phone').text("Số điện thoại :"+data.customerPhone);
            $('.address').text("Địa chỉ nhận :"+data.customerAddress);
            $('#deliveryTime').val(data.deliveryTime);

            if (data.payment=="COD"){
                $('.payment').html('Phương thức thanh toán: Tiền mặt');
            } else {
                $('.payment').text('Phương thức thanh toán: Chuyển khoản');
            }
            $('.orderId').text("SỐ HÓA ĐƠN: "+data.id);
            var createdDate = new Date(data.createdDate);
            createdDate = createdDate.getDate() + "/"+(createdDate.getMonth()+1)+"/"+createdDate.getFullYear()
            $('.createdDate').text("Thời gian: "+createdDate);

        }
    })
});