jQuery(function ($) {
    $(document).ready(function () {
        var user = [];
        $(document).on('click', '.nav-toggle', function () {
            $('#toogle-modal').addClass("show");
            $('#toogle-modal-import').addClass('show')
            $('#permition-name').text($(this).text());
            $('.title-permission-div').addClass("show");
        });

        $(document).on("click", ".delete-user", function () {
            if (confirm("Xác nhận xóa")) {
                var data = {};
                data["codenamePermistion"] = $(this).attr('data-code');
                var ids = [];
                ids.push($(this).attr('data-id'));
                data['idUsers'] = ids;
                $.ajax({
                    url: '/api/admin/permission/user',
                    type: 'DELETE',
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    beforeSend:function() {
                        $('.spin').removeClass('display-none');
                    },
                    success: function (result) {
                        alert("Xóa thành công");
                        location.reload(true);

                    },
                    error: function (error) {
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
        $("#add-user").on('shown.bs.modal', function (e) {
            var data = {};
            data['codename'] = $('.nav-toggle.active').attr("aria-controls");
            $('#codenamePermistion').val($('.nav-toggle.active').attr("aria-controls"));
            $('.search-no-per-btn').attr('data-for',data['codename']);
            $('.tree-poscode .edit-item:checked').prop('checked',false);
            loadUserNoPermission(data);
        })
        $('#importUser').on('shown.bs.modal',function (e) {
            $('#codePermission').val($('.nav-toggle.active').attr("aria-controls"));
            $('#permissionName').val($('#permition-name').text());
        })

        function loadUserNoPermission(data) {
            $.ajax({
                url: '/api/admin/user/no-permistion',
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                dataType: 'json',
                beforeSend: function () {
                    $('#spinner').css("display", 'block');
                    $('#add-user-table tbody').empty();
                    $('#pag-addUser').empty();

                    $('#pag-addUser').removeData("twbs-pagination");

                    $('#pag-addUser').unbind("page");

                },
                success: function (result) {
                    var strAppend = '';
                    console.log(result)
                    $.each(result.data, function (i, v) {
                        strAppend += "<tr><td><input name='idUser' value='" + v.id + "' type='checkbox'></td>" +
                            "<td>" + v.username + "</td>" +
                            "<td>"+v.fullName+"</td>" ;
                        if (v.poscodeVnpost != null) {
                            strAppend += "<td>" + v.poscodeVnpost.name + "</td>";
                        } else {
                            strAppend += "<td>Tổng công ty</td>";
                        }
                        strAppend+="</tr>";
                    });
                    $('#add-user-table tbody').append(strAppend);
                    $('#spinner').css('display', 'none');
                    if (result.totalPage != 0) {
                        $('#pag-addUser').twbsPagination({
                            totalPages: result.totalPage,
                            startPage: result.currentPage,
                            initiateStartPageClick: false,
                            first: '<<',
                            prev: '<',
                            next: '>',
                            last: '>>',
                            visiblePages: 5,
                            onPageClick: function (event, clickPage) {
                                // console.log('test');
                                data['currentPage'] = clickPage;
                                loadUserNoPermission(data);
                            }
                        });
                    }
                },
                error: function (error) {
                    console.log(error);
                    if (error.status < 300) {
                        // location.reload(true);
                    }
                }
            });
        }
        $(document).on('click','.search-no-per-btn',function () {
            var data = {};
            data['codename'] = $(this).attr('data-for');
            data['search'] = $('input[name=search-no-per]').val();
            var poscodeIds = [];
            $('.tree-poscode .edit-item:checked').each(function (i,v) {
                poscodeIds.push(v.value);
            });
            data['poscodeIds'] =poscodeIds;
            loadUserNoPermission(data);
        })
        $('#filter-poscode').on('click',function () {
            var data = {};
            data['codename'] = $('.search-no-per-btn').attr('data-for');
            data['search'] = $('input[name=search-no-per]').val();
            var poscodeIds = [];
            $('.tree-poscode .edit-item:checked').each(function (i,v) {
                poscodeIds.push(v.value);
            })
            data['poscodeIds'] =poscodeIds;
            loadUserNoPermission(data);
        })
        $("#save-add-user-form").click(function () {
            var data = {}, idUsers = [];
            data['codenamePermistion'] = $('#codenamePermistion').val();
            $.each($('input[name=idUser]:checked'), function () {
                idUsers.push($(this).val());
            })
            data['idUsers'] = idUsers;
            $.ajax({
                url: '/api/admin/permission/user',
                type: 'POST',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                beforeSend: function() {
                    $('#spinner').css("display", 'block');
                },
                success: function (result) {
                    location.reload(true);

                },
                error: function (error) {
                    console.log(error);
                    if (error.status < 300) {
                        // location.reload(true);
                    }
                }
            });
        })

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
                    user = responesData;
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
            $.ajax({
                url: '/api/admin/permission',
                type: 'GET',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                dataType: 'json',
                success: function (result) {
                    // console.log(result);
                    result.forEach(function (v, i) {
                        if (user.includes("ROLE_SUPER_ADMIN") || (!user.includes("ROLE_SUPER_ADMIN") && v.codename != "ROLE_SUPER_ADMIN")) {
                            $('#role-list').append('<a href="#' + v.codename + '" aria-controls="' + v.codename + '" class="nav-toggle"\n' +
                                '                               data-toggle="tab" role="tab">' + v.namePermistion + '</a>');
                            $('#nav-tabContent').append('<div class="tab-pane fade" id="' + v.codename + '" role="tabpanel">' +
                                '<div class="row my-2 align-items-center">' +
                                '<input name="search" data-for="' + v.codename + '" class="form-control col-sm-6" placeholder="Tìm kiếm">' +
                                '<a data-for="' + v.codename + '" class="btn-sm search-btn btn-default col-sm-auto ml-2"><i class="fas fa-search"></i></a>' +
                                '</div>' +
                                '                                <table class="w-100" id="table-' + v.codename + '">' +
                                '                                    <thead>' +
                                '                                    <th>Tài khoản</th>' +
                                '                                    <th>Họ tên</th>' +
                                '                                    <th>Đơn vị</th>' +
                                '                                    <th></th>' +
                                '                                    </thead>' +
                                '                                    <tbody>' +
                                '                                    </tbody>' +
                                '                                </table>' +
                                '<div class="col-sm-12 col-xs-12 my-2">\n' +
                                '            <ul class="pagination justify-content-center" id="pag-' + v.codename + '" data-for="' + v.codename + '"></ul>\n' +
                                '        </div>' +
                                '</div>')

                        }
                    });
                    $.each($('.nav-toggle'), function () {
                        var data = {};
                        data["codename"] = $(this).attr("aria-controls");
                        // console.log('test');
                        loadUserByPermissionCodeAndSearch(data);
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
        }

        $(document).on('click', '.search-btn', function () {
            var codename = $(this).attr("data-for");
            var search = $('input[name=search][data-for=' + codename + ']').val();
            var data = {};
            data['codename'] = codename;
            data['search'] = search;
            $('#pag-' + data["codename"]).empty();

            $('#pag-' + data["codename"]).removeData("twbs-pagination");

            $('#pag-' + data["codename"]).unbind("page");
            loadUserByPermissionCodeAndSearch(data);
        })

        function loadUserByPermissionCodeAndSearch(data) {
            $.ajax({
                url: '/api/admin/permission/users',
                type: 'POST',
                contentType: 'application/json',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: 'json',
                beforeSend:function() {
                    $('.spin').removeClass('display-none');
                },
                success: function (result) {
                    // location.reload(true);
                    // console.log(result);
                    // console.log(data);
                    var str = '';
                    $.each(result.data, function (item, v) {
                        // console.log(v);
                        str += "<tr>";
                        str += "<td>" + v.username + "</td>";
                        str += "<td>" + v.fullName + "</td>";
                        if (v.poscodeVnpost != null) {
                            str += "<td>" + v.poscodeVnpost.name + "</td>";
                        } else {
                            str += "<td></td>";
                        }

                        str += "<td><a class='delete-user' data-id='" + v.id + "' data-code='" + data["codename"] + "'><i class='fas fa-trash'></i></a></td>"
                        str += "</tr>";

                    })
                    $("#" + data["codename"] + " tbody").html(str);
                    if (result.totalPage != 0) {
                        $('#pag-' + data["codename"]).twbsPagination({
                            totalPages: result.totalPage,
                            startPage: result.currentPage,
                            initiateStartPageClick: false,
                            first: '',
                            prev: '<',
                            next: '>',
                            last: '',
                            visiblePages: 5,
                            onPageClick: function (event, clickPage) {
                                // console.log('test');
                                data['currentPage'] = clickPage;
                                loadUserByPermissionCodeAndSearch(data);
                            }
                        });
                    }
                    $('.spin').addClass('display-none');
                },
                error: function (error) {
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
        $('#btnImport').on('click',function (e) {
            e.preventDefault();
            var formData = new FormData();
            if (!$('#file-input')[0].files[0]) {
                alert("Bạn chưa chọn file");
                return;
            }
            formData.append('multipartFile', $('#file-input')[0].files[0]);
            uploadExcel(formData);
        })
        function uploadExcel(formData) {

            $.ajax({
                url : '/api/admin/upload/excel',
                type : 'POST',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                enctype: 'multipart/form-data',
                data : formData,
                processData: false,  // Important!
                contentType: false,
                cache: false,
                beforeSend:function() {
                    $('#spinner-import').css('display','block');
                },
                success : function(result) {
                    // console.log(result);
                    importUser(result);
                    $('#spinner-import').css('display','none');

                },
                error : function(jqXHR, textStatus, errorThrown) {
                    console.log( 'The following error occured: ' + textStatus, errorThrown );
                    $('#spinner-import').css('display','none');

                    alert('Đã có lỗi xảy ra');
                }
            });
        }
        function importUser(src) {
            let data = {};
            data.src = src;
            data.codePermission = $('#codePermission').val();
            $.ajax({
                type: "POST",
                url: "/api/admin/permission/excel",
                data: JSON.stringify(data),
                dataType: "json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend:function() {
                    $('#spinner-import').css('display','block');
                },
                success: function (responesData) {
                    alert("Cập nhật thành công")
                    window.location.reload();
                    $('#spinner-import').css('display','none');

                }, error: function (response) {
                    console.log("fail",response);
                    $('#spinner-import').css('display','none');
                    alert('Đã có lỗi xảy ra');
                }
            });
        }
    })
})
