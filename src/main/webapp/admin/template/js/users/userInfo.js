jQuery(function ($) {
    $(document).ready(function () {
        function getUserInfo() {
            var userId = $('#userId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/user/" + userId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    //  $('.loader').css("display","block");
                },
                success: function (response) {
                    $('.fullName').append(response.fullName);
                }
            })
        }
        getUserInfo();
    })
})
