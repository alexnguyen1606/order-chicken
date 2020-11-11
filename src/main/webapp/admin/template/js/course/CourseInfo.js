jQuery(function ($) {
    $(document).ready(function () {
        function getCourseInfo() {
            var courseId = $('#courseId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/course/" + courseId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    //  $('.loader').css("display","block");
                },
                success: function (response) {
                    response = response.data;
                    console.log(response)
                    $('.courseName').text(response.name)
                }
            })
        }
        getCourseInfo();
    });
})