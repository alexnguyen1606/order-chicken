jQuery(function ($) {
    $(document).ready(function () {
        var userId = $('#userId').val();
        $.ajax( {
          type:"GET",
          url:"/api/user/"+userId,
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            contentType: "application/json",
            beforeSend:function () {

            },
            success:function (response) {
                $('.fullName').text('\ Chi tiết quá trình học '+response.fullName)
            },
            error:function () {

            }
        })
        $.ajax( {
            type:"GET",
            url:"/api/admin/course-join/user/"+userId,
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            contentType: "application/json",
            beforeSend:function () {
                $('.loader').css("display","block");
                if ($("#tableCourse tbody").html() == "") {
                    $("#tableCourse").DataTable({
                        "bLengthChange": false,
                        "language": {
                            "search": "Tìm kiếm:"
                            ,"emptyTable": "Chưa có khóa học"
                        }
                    });
                }
                else {
                    $("#tableUsers").DataTable().clear().draw();

                }
            },
            success:function (response) {
                $.each(response,function (i,v) {
                    var status = '';
                    if (v.finished==0||v.finished==null){
                        status='<span class="badge badge-warning">Chưa đạt</span>';
                    } else if (v.finished==1){
                        status='<span class="badge badge-success">Đạt</span>';
                    }
                    $('#tableCourse').DataTable().row.add([
                        i+1,v.courseName,v.courseCode,v.createdDate,status
                    ]).draw().node();
                })

            },
            error:function () {

            }
        })


    })
})