jQuery(function ($) {
    $(document).ready(function () {
        $(document).on("click",".delete-page",function (e) {
            e.preventDefault();
            if(confirm("Xác nhận xóa?")){
                var id = $(this).attr('data-id');
                var data = {};
                data['id'] = id;
                $.ajax({
                    url : '/api/admin/page',
                    type : 'DELETE',
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType : 'application/json',
                    data : JSON.stringify(data),
                    dataType : 'json',
                    beforeSend:function() {
                        $('.spin').removeClass('display-none');
                    },
                    success : function(result) {
                        alert("Xóa thành công");
                        location.reload(true);

                    },
                    error : function(error) {
                        console.log(error);
                        $('.spin').addClass('display-none');
                        alert('Đã có lỗi xảy ra');
                        if (error.status < 300) {
                            // location.reload(true);
                        }
                    }
                });
            }

        })
        function init() {
            var pageTable = $("#page-table").DataTable({
                "language": {
                    "decimal":        "",
                    "emptyTable":     "Không có dữ liệu",
                    "info":           "Hiện từ _START_ đến _END_ của _TOTAL_ dữ liệu",
                    "infoEmpty":      "Hiện từ 0 đến 0 của 0 dữ liệu",
                    "infoFiltered":   "(Lọc từ _MAX_ trong tổng số dữ liệu)",
                    "infoPostFix":    "",
                    "thousands":      ",",
                    "lengthMenu":     "Hiện _MENU_ dữ liệu",
                    "loadingRecords": "Đang tải...",
                    "processing":     "Đang xử lý...",
                    "search":         "Tìm kiếm:",
                    "zeroRecords":    "Không có dữ liệu phù hợp",
                    "paginate": {
                        "first":      "Đầu tiên",
                        "last":       "Cuối cùng",
                        "next":       "Tiếp",
                        "previous":   "Trước"
                    },
                    "aria": {
                        "sortAscending":  ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    }
                }
            });
            $.ajax({
                url : '/api/admin/page/list',
                type : 'GET',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType : 'application/json',
                dataType : 'json',
                beforeSend:function() {
                    $('.spin').removeClass('display-none');
                },
                success : function(result) {

                    result.forEach(function (v,i) {
                        var code = '';
                        if (v.code == 'ABOUT_US') {
                            code += '<div>'+v.code+'<i class="fas fa-check ml-3"></i></div>';
                        }
                        else {
                            code += '<div>'+v.code+'<i class="fas fa-times ml-3"></i></div>'
                        }
                        pageTable.row.add([code,'<div>'+v.title+'</div>','<a class="btn btn-small btn-success" style="color: #fff"\n' +
                        '                                   href="/admin/setting/static-page/edit/'+v.id+'"><i class="fas fa-edit"></i></a>\n' +
                        '                                <a class="btn btn-small btn-danger delete-page" data-id="'+v.id+'"\n' +
                        '                                   style="color: #fff"><i class="fas fa-trash-alt"></i></a>'])
                            .draw()
                            .node();
                    })

                    $('.spin').addClass('display-none');
                },
                error : function(error) {
                    console.log(error);
                    $('.spin').addClass('display-none');
                    alert('Đã có lỗi xảy ra');
                    if (error.status < 300) {
                        // location.reload(true);
                    }
                }
            });
        }
        init();
    })
})