var currentPages ;
jQuery(function ($) {
    $(document).ready(function () {
        function getAllNews(url) {
            if (url=="" || url ==null){
                url='/api/admin/news/all';
            }
            var data = getDataSearch();
            $.ajax({
                type:"POST",
                url:url,
                data: JSON.stringify(data),
                dataType: "json",
                contentType:"application/json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                beforeSend: function () {
                     $('.loader').css("display","block");
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                },
                success: function (response) {
                    currentPages = response.currentPage;
                    if (response.totalPage!=0){
                        paging(response.totalPage,response.currentPage);
                    }

                    loadNews(response.data);
                    $('.loader').css("display","none");
                },error:function () {
                    $('.loader').css("display","none");
                }
            })
        };
        function loadNews(data) {
            var row = '';
            $.each(data,function (i,v) {
                var status = '';
                if (v.statusNew==1){
                    status='<i class="text-success fa fa-circle" title="Duyệt" ></i>';
                } else {
                    status='<i class="text-warning fa fa-circle" title="Nháp" ></i>';
                }
               row+='<tr>';
               row+='<td>'+(i+1)+'</td>';
               row+='<td class="text-center">';
               row+=status;
               row+='<a href="/admin/news/edit/'+v.id+'"><b>'+v.title+'</b></a>';
               row+='</td>';
               row+='<td class="text-center">'+v.nameCategory+'</td>';
               // row+='<td class="text-info text-center">';
               // row+='<p><i class="fa fa-building-o"></i><small>'+v.poscodeName+'</small></p>';
               // row+='</td>';
               row+='<td class="info-text row ">';
               row+='<div>Ngày tạo :'+v.createdDate+'<br>Người tạo :'+v.createdBy+'</div>';
               row+='</td>';
               row+='<td>';
               row+='<a class=" font-blue-steel " href="/admin/news/edit/'+v.id+'" title="Sửa"><i class="fa fa-pencil-square fa-2x"></i></a>';
               row+='<a class=" font-blue-steel " onclick="deleteNews('+v.id+')" title="xóa"><i class="fa fa-trash-o fa-2x"></i></a>'
               row+='</td>'
               row+='</tr>';
            });
            $('#tableNews').empty();
            $('#tableNews').append(row);
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
                        var url = "/api/admin/news/all";
                        url+="?page="+page;
                        getAllNews(url);
                    }
                }
            });
        }
        function getDataSearch() {
            var data = {};
            var formData = $('#search').serializeArray();
            $.each(formData,function (i,v) {
                data[v.name] = v.value;
            });
            return data;
        }
        function getCategoryNews(){
            $.ajax({
                type:"GET",
                url:"/api/admin/new-category/all",
                contentType:"application/json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                success:function (response) {

                    var row='';
                    $.each(response,function (i,v) {
                        row+='<option value="'+v.id+'">'+v.nameDetail+'</option>';
                    });
                    $('#id_detail_category').append(row);
                }
            })
        }
        $('#btnSearch').click(function () {
            getAllNews("");
        });
        $('#statusNew').change(function () {
            getAllNews("");
        });
        $('#id_detail_category').change(function () {
            getAllNews("");
        });
        $('#search').on('submit',function (e) {
            e.preventDefault();
            getAllNews("");
        });
        getCategoryNews();
        getAllNews("");
    })
});
function deleteNews(id) {
    if (confirm("Xác nhận xóa bài viết")) {
        $.ajax({
            type: "DELETE",
            url: "/api/admin/news/"+id,
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            //data: JSON.stringify(data),
            //dataType: "json",
            contentType: "application/json",
            beforeSend: function () {
                $('.loader').css("display", "block");
            },
            success: function (response) {
                alert('Xóa bài viết thành công!');
                $('.loader').css("display", "none");
                console.log(response);
                window.location.reload(true)
            },
            error: function (response) {
                //console.log("fail");
                alert("Xóa bài viết không thành công !");
                $('.loader').css("display", "none");
                console.log(response);
            }
        });
    }
}