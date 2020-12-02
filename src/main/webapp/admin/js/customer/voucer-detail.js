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
            $('#code').html("Mã khuyến mãi:"+data.code);
            var endTime = getDate(data.endTimeString);
            var startTime = getDate(data.startTimeString);
            $('.apply').text("Thời gian áp dụng khuyến mại : "+startTime+" - "+endTime);
        }
        function getDate(data) {
            var time = new Date(data);
            var time = time.getDate() +"/"+(time.getMonth()+1)+"/"+time.getFullYear();
            return time;
        }

        getDetail();
    })
});