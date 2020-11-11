jQuery(function ($) {
    $(document).ready(function () {
        function findCourse() {
            var courseId = $('#courseId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/course/" + courseId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //  dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    //  $('.loader').css("display","block");
                },
                success: function (response) {
                    $('#courseName').val(response.data.name);

                }
            })
        }
        $('#btnAdd').click(function () {
            var data = {};
            var formData = $('#formEdit').serializeArray();
            $.each(formData,function (i,v) {
                data[v.name] = v.value;
            });
            if (data.src==""){
                alert("Chưa có thông tin file")
               throw "fail";
            }
            $.ajax({
                type: "POST",
                url: "/api/admin/user/student-user/import",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    response = response.data;
                    $('.loader').css("display", "none");
                    $('.responseError').empty();
                    var row = '';
                    row+='<p>Số lượng thêm: '+(response.totalSuccess+response.totalFail)+'</p>';
                    row+='<p>Số học viên thêm thành công: '+response.totalSuccess+'</p>';
                    row+='<p>Số học viên không thành công: '+response.totalFail+'</p>';
                    if (response.totalFail>0){
                        row+='<p>Thông tin lỗi: <a href="/admin/download/common?nameFile='+response.pathExcel+'">Tải xuống</a> </p>';
                    }
                    $('.responseError').append(row);
                    $('#src').val("");
                    $('#thumb-input').val("");
                },
                error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });

        });
        findCourse();
        $('.backForward').on('click',function () {
            window.history.back();
        })
    })
})
$('#thumb-input').on('change',function () {
    var formData = new FormData();
    formData.append('multipartFile',$('#thumb-input')[0].files[0]);
    $.ajax({
        url : '/api/admin/upload/excel',
        type : 'POST',
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        enctype: 'multipart/form-data',
        data : formData,
        processData: false,  // Important!
        contentType: false,
        cache: false,
        success : function(result) {
            // console.log(result);
            console.log(result);
            $('#src').val(result);

        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log( 'The following error occured: ' + textStatus, errorThrown );
        }
    });
});
