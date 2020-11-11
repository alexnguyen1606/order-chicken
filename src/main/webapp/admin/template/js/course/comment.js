jQuery(function ($) {
    $(document).ready(function () {
        function findCourse() {
            var courseId = $('#courseId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/course/" + courseId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                     $('.loader').css("display","block");
                },
                success: function (response) {
                    data = response.data;
                    $('.nameCourse').text(data.name);
                    $('.loader').css("display","none");
                },
                error: function (response) {
                    console.log(response);
                    $('.loader').css("display", "none");
                }
            });
        }
        function getComment(url) {
            var courseId = $('#courseId').val();
            if (url==null || url==""){
                url = "/api/admin/course-comment/course?id=" + courseId;
            }
            $.ajax({
                type: "GET",
                url: url,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display","block");
                },
                success: function (response) {
                    data = response.data;
                    if (response.totalPage>0){
                        paging(response.totalPage,response.currentPage,courseId);
                    }
                    var row= '';
                    $.each(data,function (i,v) {
                        row+='<tr>';
                        row+='<td>'+(i+1)+'</td>';
                        row+='<td>'+v.fullName+'</td>';
                        row+='<td>'+v.contents+'</td>';
                        row+='<td>'+v.createdDate+'</td>'
                        row+='</tr>';
                    });
                    $('#listComment').empty();
                    $('#listComment').append(row);
                },
                error: function (response) {
                    console.log(response);
                    $('.loader').css("display", "none");
                }
            });
        }
        function paging(totalPage,currentPage,courseId){
            $('#pagination-test').twbsPagination({
                totalPages: totalPage,
                startPage: currentPage,
                visiblePages: 10,
                last:'Cuối cùng',
                next:'Tiếp theo',
                first:'Đầu tiên',
                prev:'Phía trước',
                onPageClick: function (event, page) {
                        var url = "/api/admin/course-comment/course?id=";
                        url+=courseId;
                        url+="&page="+page;
                        getComment(url);

                }
            });
        }
        getComment("");
        findCourse();

    })
})