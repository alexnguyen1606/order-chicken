jQuery(function ($) {
    $(document).ready(function () {
        var user = [];
        function init() {
            var data = {};
            $.ajax({
                type: "POST",
                url: "/api/admin/current_user",
                data: JSON.stringify(data),
                dataType: "json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend:function() {
                    $('.spin').removeClass('display-none');
                },
                success: function (responesData) {
                    // console.log(responesData);
                    user = responesData;
                    // username = responesData[0];
                    // console.log(username);
                    initCallBack();

                }, error: function (response) {
                    console.log("fail");
                    console.log(response);
                    $('.spin').addClass('display-none');
                    alert('Đã có lỗi xảy ra');

                }
            });
        }
        function initCallBack() {
            var permissionTable = $("#table-permission").DataTable({
                "ordering": false,
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
                url: '/api/admin/permission',
                type: 'GET',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                dataType: 'json',
                success: function (result) {
                    // console.log(result);
                    result.forEach(function (v,i) {
                        // console.log(v);
                        var strEdit = '';
                        var strDelete = ''
                        if (v.codename != "ROLE_SUPER_ADMIN" || !user.includes(v.codename)) {
                            strEdit += '<a class="btn btn-sm btn-primary permissionDetails" data-toggle="modal" data-target="#permissionDetails" style="color:#fff" data-id="'+v.id+'"><i class="fas fa-edit"></i></a>';
                        }
                        if (v.codename != "ROLE_SUPER_ADMIN" && v.codename != "ROLE_MOD" && v.codename != "ROLE_TEACHER") {
                            strDelete += '<a class="btn btn-sm btn-danger deletePermission ml-2"  style="color:#fff" data-id="'+v.id+'"><i class="fas fa-trash"></i></a>'
                        }
                        permissionTable.row.add([v.namePermistion,v.codename,strEdit+strDelete])
                            .draw()
                            .node();
                    })
                    $('.spin').addClass('display-none');
                },
                error: function (error) {
                    console.log('failed');
                    console.log(error);
                    $('.spin').addClass('display-none');
                    alert('Đã có lỗi xảy ra');
                    if (error.status < 300) {
                        // location.reload(true);
                    }
                }
            });
            $.ajax({
                url: '/api/admin/permission/detail/list',
                type: 'GET',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                dataType: 'json',

                success: function (result) {
                    // console.log(result);
                    var appendStr = '';
                    result.forEach(function (v,i) {
                        // console.log(v);
                        if (v.url == '/admin') {
                            appendStr +=
                                '<tr>' +
                                '<td>'+v.nameDetail+'</td>' +
                                '<td><input type="checkbox" name="ids" checked="checked" class="disabled-checkbox" value="'+v.id+'"></td>' +
                                '</tr>';
                        }
                        else {
                            appendStr +=
                                '<tr>' +
                                '<td>'+v.nameDetail+'</td>' +
                                '<td><input type="checkbox" name="ids" value="'+v.id+'"></td>' +
                                '</tr>';
                        }

                    })
                    $('#details').append(appendStr);
                    $('#details-new').append(appendStr);

                },
                error: function (error) {
                    console.log('failed');
                    console.log(error);
                    if (error.status < 300) {
                        // location.reload(true);
                    }
                }
            });
        }
        var oldId = [];
        init();
        $(document).on('click','a.permissionDetails',function () {
            // console.log('test');
            var id = $(this).attr("data-id")
            $.ajax({
                url: '/api/admin/permission/detail/list/'+id,
                type: 'GET',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                dataType: 'json',
                beforeSend:function () {
                    $('input[name=ids]').removeAttr("checked")
                    $('#permissionDetails input[name=id]').val(id);
                },
                success: function (result) {
                    // console.log(result);
                    // var appendStr = '';
                    oldId = [];
                    result.forEach(function (v,i) {
                        // console.log(v);
                        oldId.push(v.id);
                        $('#permissionDetails input[name=ids][value='+v.id+']').attr("checked","checked");
                        $('input.disabled-checkbox').attr("checked","checked");
                    })
                    // console.log($('#permissionDetails input[name=id]').val())
                    // $('#details').append(appendStr);

                },
                error: function (error) {
                    console.log('failed');
                    console.log(error);
                    if (error.status < 300) {
                        // location.reload(true);
                    }
                }
            });
        })
        $('#addBtn').click(function () {
            var data ={};
            data['codename'] = $('#modalAddRole input[name=codename]').val();
            data['namePermistion'] = $('#modalAddRole input[name=namePermistion]').val();
            var listDetailPermisstions = [];
            $.each($('#modalAddRole input[name=ids]:checked'),function (i,v) {
                // console.log(v.value);
                listDetailPermisstions.push(v.value);
            })
            data['detailPermisstions'] = listDetailPermisstions;
            console.log(data);
            if (data['namePermistion'] == "" || data['codename'] == "") {
                alert("Chưa nhập đủ thông tin")
            }
            else {
                $.ajax({
                    url: '/api/admin/permission',
                    type: 'POST',
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    beforeSend: function() {
                        $('#spinner-modal').removeClass('display-none');
                    },
                    success: function (result) {
                        // console.log(result);
                        location.reload(true);
                    },
                    error: function (error) {
                        console.log('failed');
                        alert('Mã hoặc Tên nhóm đặt bị trùng lặp');
                        console.log(error);
                        if (error.status < 300) {
                            // location.reload(true);
                        }
                    }
                });
            }

        })
        $(document).on('click','.deletePermission',function () {
            if (confirm("Xác nhận xóa ?")) {
                var id = $(this).attr('data-id');
                console.log(id)
                $.ajax({
                    url: '/api/admin/permission/'+id,
                    type: 'DELETE',
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType: 'application/json',

                    dataType: 'json',
                    success: function (result) {
                        // console.log(result);
                        alert('Thành công');
                        location.reload(true);
                    },
                    error: function (error) {
                        console.log('failed');

                        console.log(error);
                        if (error.status < 300) {
                            alert('Thành công');
                            location.reload(true);
                        }else {
                            alert('Xóa thất bại');
                        }
                    }
                });
            }
        })
        $('#submitChangMapping').click(function () {
            var data ={};
            data['id'] = $('#permissionDetails input[name=id]').val();
            var detailPermisstions = [];
            $.each($('#permissionDetails input[name=ids]:checked'),function (i,v) {
                detailPermisstions.push(v.value);
            });
            data['detailPermisstions'] = detailPermisstions;
            data['oldDetailId'] = oldId;
            $.ajax({
                url: '/api/admin/permission',
                type: 'PUT',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    // console.log(result);
                    location.reload(true);
                },
                error: function (error) {
                    console.log('failed');

                    console.log(error);
                    if (error.status < 300) {
                        location.reload(true);
                    }
                    else {
                        alert('Lỗi xảy ra');
                    }
                }
            });
        })
    })
})