jQuery(function ($) {
    $(document).ready(function () {
        function init() {
            $.ajax({
                url: '/api/admin/setting/param/list',
                type: 'GET',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                // data : JSON.stringify(data),
                dataType: 'json',
                beforeSend:function() {
                    $('.spin').removeClass('display-none');
                },
                success: function (result) {
                    // location.reload(true);
                    var userTable = $("#param-table").DataTable({
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

                    result.forEach(function (v, i) {
                        console.log(v);
                        var statusStr = '';
                        if (v['statusConfigurationn'] == 0) {
                            statusStr += '<i class="fas fa-times"></i>';
                        } else {
                            statusStr += '<i class="fas fa-check"></i>';
                        }
                        var preview = ''
                        if (v.typeName == 'IMG') {
                            preview = '<img src="'+v['valueConfigurationn']+'">'
                        }
                        else if(v.typeName == 'URL') {
                            preview = '<iframe src="'+v['valueConfigurationn']+'" width="100%" height="306"></iframe>';
                        }
                        else {
                            preview = v['valueConfigurationn'];
                        }
                        userTable.row.add(['<a href="/admin/setting/param/edit/' + v['id'] + '">' + v['codeName'] + '</a>', preview, v['typeName'], statusStr]).draw()
                            .node();
                    })
                    $('.spin').addClass('display-none');
                },
                error: function (error) {
                    console.log(error);
                    if (error.status < 300) {
                        location.reload(true);
                    }
                    else {
                        $('.spin').addClass('display-none');
                        alert('Đã có lỗi xảy ra');
                    }
                }
            });
        }

        init();
    })
})