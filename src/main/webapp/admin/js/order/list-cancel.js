jQuery(function ($) {
    $(document).ready(function () {
        function fetchOrder(url) {
            if (url=="" || url==null){
                url = "/api/admin/order/list/cancel"
            }
            var search = $('#search').val();
            var data = {'search':search};
            $.ajax({
                type: "PUT",
                url: url,
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                },
                success: function (response) {
                    bindingOrder(response.data);
                    if (response.totalPage != 0) {
                        paging(response.totalPage, response.currentPage);
                    }
                    $('.loader').css("display", "none");
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            });
        }
        function paging(totalPage,currentPages){
            $('#pagination-test').twbsPagination({
                totalPages: totalPage,
                startPage: currentPages,
                visiblePages: 10,
                last:'Cuối cùng',
                next:'Tiếp theo',
                first:'Đầu tiên',
                prev:'Phía trước',
                onPageClick: function (event, page) {
                    if (currentPages != page) {
                        var url = "/api/admin/order/list/cancel";
                        url+="?page="+page;
                        fetchOrder(url);
                    }
                }
            });
        }
        function bindingOrder(data) {
            var row = "";
            $.each(data,function (i,v) {
                var totalPriceString = v.totalPrice.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
                row+='<tr>';
                // row+='<td class="text-center"><input type="checkbox" id="checkbox_'+v.id+'" value="'+v.id+'"></td>';
                row+='<td class="text-center">'+v.id+'</td>';
                row+='<td class="text-center">'+v.customerName+'</td>';
                row+='<td class="text-center">'+v.customerPhone+'</td>';
                row+='<td class="text-center">'+v.deliveryTime+'</td>';
                row+='<td class="text-center">'+totalPriceString+'</td>';
                row+='<td class="text-center">'+v.statusString+'</td>';
                row+='<td class="text-center"><button type="button" data-id="'+v.id+'" class="btn btn-info order-info" data-toggle="modal"' +
                    '                           data-target="#modalInfo"><i class="fa fa-info"></i></button></td>';
                row+='</tr>';
            });
            $('#orders').empty();
            $('#orders').append(row);
        }
        fetchOrder("");
    })
});