jQuery(function ($) {
        $(document).ready(function () {
            $('#importExcelDeleteUser').on('change', function (e) {
                var formData = new FormData();
                var fileName = e.target.files[0].name;
                var subFix = fileName.substring(fileName.lastIndexOf('.')+1);
                if(subFix!="xlsx" && subFix!="xls" ){
                    alert("Loại file không hợp lệ");
                    throw "file not valid"
                }
                formData.append('multipartFile', $('#importExcelDeleteUser')[0].files[0]);
                $.ajax({
                    url: '/api/admin/upload/excel',
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    data: formData,
                    processData: false,  // Important!
                    contentType: false,
                    cache: false,
                    success: function (result) {
                        $('#src').val(result);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('The following error occured: ' + textStatus, errorThrown);
                    }
                });
            });
            function deleteUser() {
                var ids = [];
                ids = getIds();
                if (ids.length == 0) {
                    alert("Chưa người dùng nào được chọn");
                } else {
                    if (confirm("Xác nhận xóa")) {
                        var data = {};
                        data['ids'] = ids;
                        data['courseId'] = $('#courseId').val();
                        $.ajax({
                            type: "DELETE",
                            url: "/api/admin/course-join",
                            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                            data: JSON.stringify(data),
                            dataType: "json",
                            contentType: "application/json",
                            beforeSend: function () {
                                $('.loader').css("display", "block");
                            },
                            success: function (response) {
                                $('.loader').css("display", "none");
                                alert("Xóa thành công");
                                window.location.reload();
                            },
                            error: function (response) {
                                $('.loader').css("display", "none");
                                alert("Xóa không thành công");
                                window.location.reload();
                            }
                        });
                    }
                }
                $('#checkAll').prop('checked',false);
            }

            $('#checkAll').click(function () {
                if ($(this).is(':checked')) {
                    $('#userList').find('input[type=checkbox]').prop("checked", true);
                    console.log($('#orderList').find('input[type=checkbox]'));
                } else {
                    $('#userList').find('input[type=checkbox]').prop("checked", false);
                }

            });
            function getIds() {
                var ids = [];
                $('#userList').find('input[type=checkbox]:checked').each(function () {
                    ids.push($(this).val())
                });
                return ids;
            }

            $('#btnDeleteUser').on('click', function () {
                deleteUser();
            });
            $('#btnDeleteUserExcel').on('click',function () {
                if (!confirm("Xác nhận xóa học viên")){
                    throw "Cancel delete";
                }
                var data = {};
                var formData = $('#deleteUserForm').serializeArray();
                $.each(formData,function (i,v) {
                   data[v.name] = v.value;
                });
                $.ajax({
                    type: "DELETE",
                    url: "/api/admin/user/course/excel",
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    data: JSON.stringify(data),
                    dataType: "json",
                    contentType: "application/json",
                    beforeSend: function () {
                        $('.loader').css("display", "block");
                    },
                    success: function (response) {
                        $('.loader').css("display", "none");
                        alert(response.message);
                        window.location.reload();
                    },
                    error: function (response) {
                        $('.loader').css("display", "none");
                        alert(response.responseJSON.message);
                        window.location.reload();
                    }
                });
            });

        })
    }
)