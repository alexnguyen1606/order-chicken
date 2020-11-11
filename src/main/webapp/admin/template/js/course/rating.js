jQuery(function ($) {
    $(document).ready(function () {
        function getCourse() {
            var courseId = $('#courseId').val();
            if (courseId!=null && courseId!=""){
                $.ajax({
                    type: "GET",
                    url: "/api/admin/course/" + courseId,
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType: "application/json",
                    beforeSend: function () {
                          $('.loader').css("display","block");
                        $('#pagination-test').empty();
                        $('#pagination-test').removeData("twbs-pagination");
                        $('#pagination-test').unbind("page");
                    },
                    success: function (response) {
                        response =response.data;
                        $('.courseName').text(response.name);
                        $('.loader').css("display","none");
                    },
                    error: function (response) {
                        $('.loader').css("display","none");
                    }
                });
            }

        }
        function paging(totalPage,currentPages,courseId){
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
                        var url = "/api/admin/course/rating";
                        url+="/"+courseId
                        url+="?page="+page;
                        getAllRate(url);
                    }
                }
            });
        }
        function getAllRate(url) {
            var courseId = $('#courseId').val();
            if(url==null || url==""){
                url = "/api/admin/course/rating/"+courseId;
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
                    if(response.totalPage!=0){
                        paging(response.totalPage,response.currentPage,courseId);
                    }
                    var row = "";
                    $.each(response.data,function (i,v) {
                        row+='<tr>';
                        row+='<td>'+(i+1)+'</td>';
                        row+='<td>'+v.user.fullName+'</td>';
                        row+='<td>'+checkValue(v.valuess)+'</td>';
                        row+='<td>'+v.createdDate+'</td>';
                        row+='</tr>';
                    });
                    $('#listRate').empty();
                    $('#listRate').append(row);
                    $('.loader').css("display","none");
                },
                error: function (response) {
                    $('.loader').css("display","none");
                }
            });
        }
        function checkValue(value){
            var row = "";
            switch (value) {
                case 1:
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    break;
                case 2:
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                   break;
                case 3:
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    break;
                case 4:
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    break;
                case  5:
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    break;
                default:
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    row +='  <i class="fa fa-star" aria-hidden="true" style="color: #f05f2a"></i>';
                    break;
            }
            return row;
        }
        getAllRate("");
        getCourse();

    })
})