jQuery(function ($) {
    $(document).ready(function () {
        function getListVoucher() {
            $.ajax({
                type: "GET",
                url: "/api/voucher/list",
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                // data: JSON.stringify(data),
                // dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {
                    bindingVoucher(response.data);
                    $('.loader').css("display", "none");
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                }
            });
        }
        function bindingVoucher(data) {
            var  row = "";
            $.each(data,function (i,v) {
                row+='<div class="my-3">';
                row+='<a href="/voucher/'+v.id+'" >  <img src="'+v.urlImg+'"></a>';
                row+='</div>'
            });
            $('#vouchers').empty();
            $('#vouchers').append(row);
        }
        getListVoucher();
    })
});