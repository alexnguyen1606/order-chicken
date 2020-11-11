jQuery(function ($) {
    $(document).ready(function () {
        function paging(totalPage, currentPages) {
            $('#pagination-test').twbsPagination({
                totalPages: totalPage,
                startPage: currentPages,
                visiblePages: 10,
                last: 'Cuối cùng',
                next: 'Tiếp theo',
                first: 'Đầu tiên',
                prev: 'Phía trước',
                onPageClick: function (event, page) {
                    if (currentPages != page) {
                        var size = $('#size').val();
                        var url = "/api/admin/employee/list";
                        url += "?page=" + page;
                        url += "&size=" + size;
                        getListEmployee(url);
                    }
                }
            });
        }

        $('#size').on('change', function () {
            getListEmployee("");
        })

        function getListEmployee(url) {
            if (url == '' || url == null) {
                var size = $('#size').val();
                url = '/api/admin/employee/list';
                url += '?size=' + size;
            }
            var data = getDataSearch();
            $.ajax({
                type: "POST",
                url: url,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                },
                success: function (response) {
                    $('#count').text(response.count)
                    if (response.totalPage != 0) {
                        paging(response.totalPage, response.currentPage);
                    }
                    loadEmployee(response.data);
                    $('.loader').css("display", "none");
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            })
        }

        function loadEmployee(data) {
            var row = "";
            $.each(data, function (i, v) {
                console.log(v);
                var fullName = v.fullName;
                var email = v.email;
                var phoneNumber = v.phoneNumber;
                var birthOfDate = v.dateOfBirth;
                if (fullName == '' || fullName == null) {
                    fullName = "Chưa cập nhật";
                }
                if (email == '' || email == null || email == 'null') {
                    email = "Chưa cập nhật";
                }
                if (phoneNumber == '' || phoneNumber == null) {
                    phoneNumber = "Chưa cập nhật";
                }
                if (birthOfDate == '' || birthOfDate == null) {
                    birthOfDate = "Chưa cập nhật";
                } else {
                    birthOfDate = birthOfDate.split("-").reverse().join("-");
                }

                var status = '';
                if (v.status == false) {
                    status = 'Đã khóa';
                } else if (v.status = true) {
                    status = 'Đang hoạt động';
                }
                row += '<tr>';
                row += '<td><input type="checkbox" value="' + v.id + '" id="checkbox_' + v.id + '"></td>';
                row += '<td>' + status + '</td>';
                row += '<td>' + fullName + '</td>';
                row += '<td>' + v.academicLevel  + '</td>';
                row += '<td>' + email + '</td>';

                row += '<td>' + phoneNumber + '</td>';
                if (v.jobTitle) {
                    row += '<td>' + v.jobTitle.name + '</td>';
                }
                else {
                    row += '<td></td>';
                }
                row += '<td><button dataId="' + v.id + '"  data-toggle="modal" title="Chi tiết" data-target="#editModal" class="btn btn-xs btn-info edit"><i class="fa fa-pencil-square-o fa-2x"></i></button></td>';
                row += '</tr>';

            });
            $('#listEmployee').empty();
            $('#listEmployee').append(row);
        }

        $('#formSearch').on('submit', function (e) {
            e.preventDefault();
            getListEmployee("");
        });
        $('#filter-poscode').on('click', function (e) {
            e.preventDefault();
            getListEmployee("");
        })

        function getListCheck() {
            var staffs = $('#listEmployee').find('input[type=checkbox]:checked').map(function () {
                return $(this).val();
            }).get();
            return staffs;
        }

        $('#enable').on('click', function () {
            var employee = getListCheck();
            if (employee.length == 0) {
                alert("Chưa có nhân viên được chọn");
                throw "chưa chọn";
            }
            ;
            var data = {};
            data['listId'] = employee;
            $.ajax({
                type: "PUT",
                url: "/api/admin/employee/enable",
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
                    getListEmployee("");
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            })
        });
        $('#disable').on('click', function () {
            var employee = getListCheck();
            var data = {};
            console.log(employee);
            if (employee.length == 0) {
                alert("Chưa có nhân viên được chọn");
                throw "chưa chọn";
            }
            data['listId'] = employee;

            $.ajax({
                type: "PUT",
                url: "/api/admin/employee/disable",
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
                    getListEmployee("");
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            })
        });

        function getDataSearch() {
            var data = {};
            var formData = $('#formSearch').serializeArray();
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            var poscodeIds = [];
            if ($('.tree-poscode input:checked').length > 0) {
                $('.tree-poscode input:checked').each(function (i, v) {
                    poscodeIds.push(v.value);
                })
                data['poscodeIds'] = poscodeIds;
            }


            return data;
        }

        getListEmployee("");

        function getDetailEmployee(id) {
            $.ajax({
                type: "GET",
                url: "/api/admin/employee/detail/" + id,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    setInfoDetail(response.data);
                    $('.loader').css("display", "none");
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                }
            })
        }

        function setInfoDetail(data) {
            $('#id').val(data.id);
            $('#fullName').val(data.fullName);
            $('#employeeCode').val(data.employeeCode);
            $('#phoneNumber').val(data.phoneNumber);
            $('#email').val(data.email);
            $('#idJobTitle').val(data.idJobTitle);
            $('#idPosition').val(data.idPosition);
            $('#idUnit').val(data.idUnit);
            $('#positionOtherSide').val(data.positionOtherSide);
            $('#academicLevel').val(data.academicLevel)
            if (data.gender != null) {
                $('#gender').empty();
                if (data.gender == 1) {
                    $('#gender').append(' <option value="0">Nữ</option>');
                    $('#gender').append(' <option value="1" selected>Nam</option>');
                } else if (data.gender == 0) {
                    $('#gender').append(' <option value="0" selected>Nữ</option>');
                    $('#gender').append(' <option value="1" >Nam</option>');
                }
            }
            if (data.jobTitle != null) {
                $('#jobTitleName').val(data.jobTitle.name);
            }
            if (data.position != null) {
                $('#namePosition').val(data.position.name);
            }
            var row = '';
            if (data.status == true) {
                row += '<option value="true" selected>Hoạt động</option> <option value="false">Khóa</option>'
            } else {
                row += '<option value="true" >Hoạt động</option> <option value="false" selected>Khóa</option>'
            }
            $('#status').empty();
            $('#status').append(row);
            if (data.poscodeVnpost != null) {
                $('#text_box_name_unit_competion').val(data.poscodeVnpost.unitCode)
                $('#name_unit_form').text(data.poscodeVnpost.name);
            }
            if (data.dateOfBirth != null) {
                var dob = data.dateOfBirth;
                var array = dob.split('/');
                $('#dateOfBirth').val(array.reverse().join('-'));

            }
            $('#identityNumber').val(data.identityNumber)

        }

        $(document).on('click', '.edit', function (e) {
            var id = ($(this).attr("dataId"));
            if (id == null || id == '') {
                removeInfo();
            } else {
                $('#btnEdit').text("Cập nhật")
                getDetailEmployee(id);
            }
        });

        function removeInfo() {
            $('#btnEdit').text("Thêm mới")
            $('#id').val("");
            $('#fullName').val("");
            $('#employeeCode').val("");
            $('#dateOfBirth').val("");
            $('#phoneNumber').val("");
            $('#email').val("");
            $('#idJobTitle').val("");
            $('#jobTitleName').val("");
            $('#namePosition').val("");
            $('#idPosition').val("");
            $('#idUnit').val("");
            $('#text_box_name_unit_competion').val("")
            $('#name_unit_form').text("Chưa chọn đơn vị");
        }

        $('#check-all').click(function () {
            if ($(this).is(':checked')) {

                $('#listEmployee').find('input[type=checkbox]').prop("checked", true);
            } else {
                $('#listEmployee').find('input[type=checkbox]').prop("checked", false);
            }

        });
        $('#btnEdit').on('click', function () {
            var data = {};
            var formData = $('#formEdit').serializeArray();
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            if (data.fullName == '') {
                alert("Tên nhân viên không được để trống");
                throw "fullName is null";
            }
            if (data.idUnit == '') {
                alert("Đơn vị không được để trống");
                throw "fullName is null";
            }
            if (data.employeeCode == '') {
                alert("Mã nhân viên không được bỏ trống");
                throw "employeeCode is null";
            }
            if (data.id == "") {
                create(data);
            } else {
                update(data);
            }
        });

        function create(data) {
            $.ajax({
                type: "POST",
                url: "/api/admin/employee",
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
                    window.location.reload()
                    getListEmployee("");
                }, error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            })
        }

        function update(data) {
            $.ajax({
                type: "PUT",
                url: "/api/admin/employee",
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
                    window.location.reload()
                    getListEmployee("");
                }, error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            })
        }




        $(document).on('click', '.position', function (e) {
            var id = $(this).attr('dataId');
            var name = $(this).text();
            $('#idPosition').val(id);
            $('#namePosition').val(name);
            $('#position').empty();
        });

        $('#namePosition').on('keyup', function () {
            var search = $('#namePosition').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/position/search?search=" + search,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    var row = '';
                    $.each(response.data, function (i, v) {
                        row += '<li class="position list-group-item"  dataId="' + v.id + '"  >' + v.name + '</li>';
                    });
                    $('#position').empty();
                    $('#position').append(row);
                }, error: function (response) {

                }
            })
        });
        $('#namePosition').on('click', function () {
            var search = $('#namePosition').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/position/search?search=" + search,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    var row = '';
                    $.each(response.data, function (i, v) {
                        row += '<li class="position list-group-item"  dataId="' + v.id + '"  >' + v.name + '</li>';
                    });
                    $('#position').empty();
                    $('#position').append(row);
                }, error: function (response) {

                }
            })
        });
        $('#positionOut').on('mouseleave', function () {
            $('#position').empty();
        });

        $('#generate').on('click', function () {
            var data = {};
            var listId = getListCheck();
            if (listId.length == 0) {
                alert("Chưa có nhân viên được chọn")
                throw "id is null";
            }
            data['listId'] = listId;
            $.ajax({
                type: "POST",
                url: "/api/admin/user/generate",
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
                }, error: function (response) {
                    $('.loader').css("display", "none");
                }
            })
        })
    });


});