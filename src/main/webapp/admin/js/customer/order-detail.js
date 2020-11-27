jQuery(function ($) {
    $(document).ready(function () {
        function orderDetail() {
            var id = $('#id').val();
            $.ajax({
                type: "GET",
                url: "/api/order-detail/order/"+id,
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                // data: JSON.stringify(data),
                // dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {
                    bindingOrderDetail(response.data);
                    $('.loader').css("display", "none");
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                }
            });
        }
        function orderInfo() {
            var id = $('#id').val();
            $.ajax({
                type: "GET",
                url: "/api/order/"+id,
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
                }
            });
        }
        function bindingOrderDetail(data) {
            var row = "";
            $.each(data,function (i,v) {
                var totalPrice = v.totalPrice.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
                var price = v.price.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
                row+='<tr>';
                row+='<td>'+v.productName+'</td>';
                row+='<td class="text-center">'+price+'</td>';
                row+='<td class="text-center">'+v.number+'</td>';
                row+='<td class="text-center">'+totalPrice+'</td>';
                row+='</tr>';
            });
            $('#orderDetailList').empty();
            $('#orderDetailList').append(row);
        }
        function bindingOrderInfo(data) {
            if (data.status==0){
                $('#cancelOrder').css("display","inline-block")
            }
            $('#name').text('Thời gian nhận: '+data.deliveryTime);
            $('#phone').text('Số điện thoại: '+data.customerPhone);
            $('#address').text('Địa chỉ: '+data.customerAddress);
            if (data.payment=='TRANFER'){
                $('#payment').text('Hình thức thanh toán: Chuyển khoản');
            } else {
                $('#payment').text('Hình thức thanh toán: Thanh toán khi nhận hàng');
            }
            $('#status').text('Trạng thái: '+data.statusString);
            $('#totalItemDetail').text(data.totalNumber);
            var totalPrice = data.totalPrice.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
            $('#totalPriceDetail').text(totalPrice);

        }
        orderDetail();
        orderInfo();
        $('#cancelOrder').on('click',function () {
            if (!confirm("Xác nhận hủy đơn")){
                throw "fail";
            }
            var id = $('#id').val();
            $.ajax({
                type: "PUT",
                url: "/api/order/cancel/"+id,
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                // data: JSON.stringify(data),
                // dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {
                    alert(response.message);
                    $('.loader').css("display", "none");
                    window.location.href="/order/list"
                }, error: function (response) {
                    alert(response.responseJSON.message);
                    $('.loader').css("display", "none");
                }
            });
        })
    })
});