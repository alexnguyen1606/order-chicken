jQuery(function ($) {
    $(document).ready(function () {
        function getDetail() {
            var id = $('#id').val();
            $.ajax({
                type: "GET",
                url: "/api/voucher/" + id,
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
            $('#imgVoucher').attr("src",data.urlImg);
            $('#content').html(data.content);
        }

        getDetail();
    })
});