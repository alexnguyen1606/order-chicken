jQuery(function ($) {
    $(document).ready(function () {
        var oldCourseRoleActionIds = [];
        function init() {
            loadListCourseRole();
            loadListAction();
        }
        function loadListCourseRole() {
            var courseRoleTable = $("#table-list-course-role").DataTable({
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
                url: '/api/admin/course-role/list',
                type: 'GET',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                dataType: 'json',
                beforeSend:function() {
                    $('.spin').removeClass("display-none")
                },
                success: function (result) {

                    result.data.forEach((v,i) => {
                        // console.log(v)
                        var strEdit = '<a class="btn btn-sm btn-primary roleCourseDetail" data-toggle="modal" data-target="#roleCourseDetail" style="color:#fff" data-id="'+v.id+'"><i class="fas fa-edit"></i></a>';
                        var strDelete = '<a class="btn btn-sm btn-danger deleteRoleCourse ml-2"  style="color:#fff" data-id="'+v.id+'" data-name="'+v.name+'"><i class="fas fa-trash"></i></a>'
                        courseRoleTable.row.add([v.name,strEdit+strDelete])
                            .draw()
                            .node();
                    })
                    $('.spin').addClass("display-none")

                },
                error: function (error) {
                    $('.spin').addClass("display-none")

                }
            });
        }
        function loadListAction() {
            var actionTable = $("#table-list-action").DataTable({
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
            var addNewTable = $('#table-list-action-add-new').DataTable({
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
                url: '/api/admin/course-role/detail',
                type: 'GET',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                dataType: 'json',
                beforeSend:function() {
                    $('.spin').removeClass("display-none")
                },
                success: function (result) {

                    result.data.forEach((v,i) => {
                        // console.log(v)
                        actionTable.row.add([v.nameAction,'<input type="checkbox" class="actions" name="actions" value="'+v.id+'">'])
                            .draw()
                            .node();
                        addNewTable.row.add([v.nameAction,'<input type="checkbox" class="actions" name="actions" value="'+v.id+'">'])
                            .draw()
                            .node();
                    })
                    $('.spin').addClass("display-none")

                },
                error: function (error) {
                    $('.spin').addClass("display-none")

                }
            });
        }
        init();
        $(document).on('click','.roleCourseDetail',function (e) {
            var idRoleCourse = $(this).attr('data-id');
            $('#updateBtn').attr('data-id',idRoleCourse) ;
            // console.log(idRoleCourse)
            $.ajax({
                url: '/api/admin/course-role/detail/'+idRoleCourse,
                type: 'GET',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                dataType: 'json',
                beforeSend:function() {
                    $('.spin').removeClass("display-none")
                    $('input[name=actions]').prop('checked', false);
                    oldCourseRoleActionIds = [];
                },
                success: function (result) {

                    result.data.forEach((v,i) => {
                        oldCourseRoleActionIds.push(v.id);
                        $('#roleCourseDetail input.actions[value='+v.id+']').prop('checked', true);
                    })
                    $('.spin').addClass("display-none")

                },
                error: function (error) {
                    $('.spin').addClass("display-none")

                }
            });
        })
        $(document).on('click','#updateBtn',function () {
            var courseRoleActionIds = [];
            $.each($('#roleCourseDetail input.actions:checked'),function (i,v) {
                courseRoleActionIds.push(v.value);
            })
            var id = $(this).attr('data-id');
            var data = {
                courseRoleActionIds: courseRoleActionIds,
                id:id,
                oldCourseRoleActionIds:oldCourseRoleActionIds
            }
            $.ajax({
                url: '/api/admin/course-role',
                type: 'PUT',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(data),
                beforeSend:function() {
                    $('.spin').removeClass("display-none")

                },
                success: function (result) {
                    alert("Cập nhật thành công");
                    location.reload();
                },
                error: function (error) {
                    $('.spin').addClass("display-none")
                    alert("Cập nhật thất bại");
                }
            });
        })
        $(document).on('click','#addBtn',function () {

            var name = $('#modalAddRole input[name=name]').val();
            if (!name) {
                alert("Tên nhóm giảng viên không thể để trống");
                return;
            }
            var courseRoleActionIds = [];
            $.each($('#table-list-action-add-new input.actions:checked'),function (i,v) {
                courseRoleActionIds.push(v.value);
            })
            var data = {
                courseRoleActionIds: courseRoleActionIds,
                name:name
            }
            $.ajax({
                url: '/api/admin/course-role',
                type: 'POST',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(data),
                beforeSend:function() {
                    $('.spin').removeClass("display-none")

                },
                success: function (result) {
                    alert("Tạo mới thành công");
                    location.reload();
                },
                error: function (error) {
                    $('.spin').addClass("display-none")
                    alert("Tạo mới thất bại");
                }
            });
        })
        $(document).on('click','.deleteRoleCourse',function () {
            if (confirm("Xác nhận xóa nhóm giảng viên " + $(this).attr('data-name'))) {
                $.ajax({
                    url: '/api/admin/course-role/'+$(this).attr('data-id'),
                    type: 'DELETE',
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType: 'application/json',
                    dataType: 'json',
                    beforeSend:function() {
                        $('.spin').removeClass("display-none")

                        oldCourseRoleActionIds = [];
                    },
                    success: function (result) {
                        alert("Xóa nhóm giảng viên thành công");
                        location.reload();
                        $('.spin').addClass("display-none")

                    },
                    error: function (error) {
                        alert("Xóa nhóm giảng viên thất bại")
                        $('.spin').addClass("display-none")

                    }
                });
            }

        })
    })
})
