jQuery(function ($) {
    $(document).ready(function () {
        function getListOrderd() {
            $.ajax({
                type: "GET",
                url: "/api/order/list",
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                // data: JSON.stringify(data),
                // dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {
                    bindingOrder(response.data);
                    $('.loader').css("display", "none");
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                }
            });
        }
        function bindingOrder(data) {
            var row = "";
            $.each(data,function (i,v) {
                var totalPrice = v.totalPrice.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
                row+='<tr>';
                row+='<td>'+v.id+'</td>';
                row+='<td>'+totalPrice+'</td>';
                row+='<td>'+v.totalNumber+'</td>';
                row+='<td>'+v.deliveryTime+'</td>';
                row+='<td>'+v.statusString+'</td>';
                row+='<td><a href="/order/'+v.id+'"><button class="btn btn-primary" style="background: #B3521F;">Chi tiết</button></a></td>';
                row+='</tr>';
            })
            $('#orderedList').empty();
            $('#orderedList').append(row);
        }
        getListOrderd();
    })
});