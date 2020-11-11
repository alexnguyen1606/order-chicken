var currentPages = 1;
jQuery(function ($) {
    $(document).ready(function () {
        function getAllUserJoinCourse(url) {
            if (url=="" || url==null){
                url='/api/admin/course-join/all'
            }
            var data = getDataSearch();
            $.ajax({
                type: "POST",
                url: url ,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display","block");
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                },
                success: function (response) {
                    if (response.totalPage>0){
                        paging(response.totalPage,response.currentPage);
                    }
                    loadUserJoin(response.data);
                    currentPages=response.currentPage;
                    $('.loader').css("display","none");
                },error:function () {
                    $('.loader').css("display","none");
                }
            })
        }
        function paging(totalPage,currentPage){
            $('#pagination-test').twbsPagination({
                totalPages: totalPage,
                startPage: currentPage,
                visiblePages: 10,
                last:'Cuối cùng',
                next:'Tiếp theo',
                first:'Đầu tiên',
                prev:'Phía trước',
                onPageClick: function (event, page) {
                    if (currentPage != page) {
                        var url = "/api/admin/course-join/all";
                        url+="?page="+page;
                        getAllUserJoinCourse(url);
                    }
                }
            });
        }
        function loadUserJoin(data){
            var row = '';
            $.each(data,function (i,v) {
                var poscodeName = v.poscodeName;
                if (v.poscodeName=='' || v.poscodeName==null){
                    poscodeName='Tổng công ty'
                }
                console.log(v);
                row+='<tr>';
                row+='<td>'+(i+1)+'</td>';
                row+='<td>'+v.username+'</td>';
                row+='<td>'+v.email+'</td>';
                row+='<td><span class="text-uppercase">'+v.fullName+'</span></td>';
                row+='<td>'+poscodeName+'</td>';
                row+='<td class="text-center">';
                row+='<a href="/admin/course/user/'+v.id+'" class="btn btn-xs btn-info"  ' +
                    'title="" ><i class="fa fa-pencil-square-o icon" aria-hidden="true"></i>Chi tiết</a>';
                row+='</td>';
                row+='</tr>'
            });
            $('#tableUsers').empty();
            $('#tableUsers').append(row);
        }

        function getDataSearch(){
            var data = {};
            var formData= $('#search').serializeArray();
            $.each(formData,function (i,v) {
                data[v.name]= v.value;
            })
            return data;
        }
        $('#search').on('submit',function (e) {
            e.preventDefault();
            getAllUserJoinCourse("");
        })
        $('#btnSearch').click(function () {
            getAllUserJoinCourse("");
        })
        getAllUserJoinCourse("");
    })
})