var count = 0;
jQuery(function ($) {
    $(document).ready(function () {
        function getAllCategory(url) {
            if (url == null || url == '') {
                url = '/api/admin/question-category/parent?size=5';
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
                }, success: function (serviceResult) {
                    console.log(serviceResult);
                    if (serviceResult.totalPage > 0) {
                        paging(serviceResult.totalPage, serviceResult.currentPage);
                    }
                    var row = showListCategory(serviceResult.data);
                    $('#listCategory').empty();
                    $('#listCategory').append(row);
                    count = 0;
                    $('.loader').css("display", "none");
                }, error: function () {
                    $('.loader').css("display", "none");
                }
            })
        };

        function showListCategory(data) {
            var row = '';
            console.log(data)
            $.each(data, function (i, v) {
                var poscodeName;
                var parentName = '';
                if (v.parentName != null) {
                    parentName = v.parentName;
                }
                if (v.poscodeName == '' || v.poscodeName == null) {
                    poscodeName = 'Tổng công ty';
                } else {
                    poscodeName = v.poscodeName;
                }
                var isActive = '';
                if (v.isActive == 1) {
                    isActive = '<i class="text-success fa fa-circle" title="Hiển thị"></i>'
                } else {
                    isActive = '<i class="text-warning fa fa-circle" title="Ẩn">';
                }
                row += '<tr>';
                row += '<td class="text-left">&emsp;' + v.nameCategory + '</td>';
                row += '<td>' + poscodeName + '</td>';
                row += '<td class="text-left">' + v.describes + '</td>';
                row += '<td class="text-center">' + isActive + '</td>';
                row += '<td class="text-center"><input type="checkbox" value="' + v.id + '" id="checkbox_' + v.id + '"></td>';
                row += '<td class="text-center"> <button onclick="loadCatgory(' + v.id + ')"  class="btn btn-xs btn-info"><i class="fa fa-pencil-square-o"></i> </td>'
                row += '</tr>';
                if (v.listChild.length > 0) {
                    row += showListChild2(v.listChild);
                }
            });
            return row;
        }

        function showListChild2(data) {
            var row = '';
            $.each(data, function (i, v) {
                count++;
                var prefix = "";
                for (var x = 1; x <= count; x++) {
                    prefix += "&emsp;"
                }
                if (count == 0) {
                    prefix += "&emsp;";
                }
                prefix += "--";

                var poscodeName;
                var parentName = '';
                if (v.parentName != null) {
                    parentName = v.parentName;
                }
                if (v.poscodeName == '' || v.poscodeName == null) {
                    poscodeName = 'Tổng công ty';
                } else {
                    poscodeName = v.poscodeName;
                }
                var isActive = '';
                if (v.isActive == 1) {
                    isActive = '<i class="text-success fa fa-circle" title="Hiển thị"></i>'
                } else {
                    isActive = '<i class="text-warning fa fa-circle" title="Ẩn">';
                }
                row += '<tr>';
                row += '<td class="text-left">' + prefix + v.nameCategory + '</td>';
                row += '<td>' + poscodeName + '</td>';
                row += '<td class="text-left">' + v.describes + '</td>';
                row += '<td class="text-center">' + isActive + '</td>';
                row += '<td class="text-center"><input type="checkbox" value="' + v.id + '" id="checkbox_' + v.id + '"></td>';
                row += '<td class="text-center"> <button onclick="loadCatgory(' + v.id + ')"  class="btn btn-xs btn-info"><i class="fa fa-pencil-square-o"></i> </td>';
                row += '</tr>';
                if (v.listChild.length > 0) {
                    row += showListChild2(v.listChild);
                } else {
                    count--;
                }
            });
            return row;
        }

        function getDataSearch() {
            var data = {};
            var formData = $('#formSearch').serializeArray();
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            return data;
        }

        function paging(totalPage, currentPage) {
            $('#pagination-test').twbsPagination({
                totalPages: totalPage,
                startPage: currentPage,
                visiblePages: 10,
                last: 'Cuối cùng',
                next: 'Tiếp theo',
                first: 'Đầu tiên',
                prev: 'Phía trước',
                onPageClick: function (event, page) {
                    if (currentPage != page) {
                        var url = "/api/admin/question-category/parent";
                        url += "?page=" + page;
                        url += "&size=5";
                        getAllCategory(url);
                    }
                }
            });
        }

        $('#btnReset').click(function () {
            var category = {};
            $('#btnEdit').text("Thêm");
            $('#id2').val(category.id);
            $('#name2').val(category.name);
            $('#describes').val(category.description);
            $('.category').text('Thêm danh mục');
            $('#parent').val(category.parent);
            $('#isActive').val(1);
        });

        function edit() {
            var data = {};

            var formEdit = $('#formEdit').serializeArray();
            $.each(formEdit, function (index, v) {
                data["" + v.name + ""] = v.value;
            });
            if (data.nameCategory == "") {
                alert("Tên danh mục không được để trống")
                throw "Tên danh mục không được bỏ trống";
            }
            // if (data.pcode == "") {
            //     alert("Đơn vị chưa được chọn")
            //     throw "cần thêm đơn vị";
            // }
            if (data.id == "") {
                post(data);
            } else {
                if (data.id == data.parent) {
                    alert("Danh mục con không được trùng danh mục cha");
                    throw "category false";
                }
                put(data);
            }

        };

        function post(data) {
            $.ajax({
                type: "POST",
                url: "/api/admin/question-category",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (category) {
                    //  getAllCategory("");
                    //     getParentCategory();
                    $('#btnReset').trigger('click');
                    $('.loader').css("display", "none");
                    alert(category.message);
                    window.location.reload();
                },
                error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });

        };

        function put(data) {
            $.ajax({
                type: "PUT",
                url: "/api/admin/question-category",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (category) {
                    // getAllCategory("");
                    // getParentCategory();
                    $('#btnReset').trigger('click');
                    $('.loader').css("display", "none");
                    alert(category.message);
                    window.location.reload();
                },
                error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });

        };
        $('#btnEdit').on('click', function () {
            edit();
        });
        getAllCategory("");
        $('#btnDelete').click(function () {
            deleteCategory();
        });

        function deleteCategory() {
            var data = {};
            var staffs = $('#categoryList').find('tbody input[type=checkbox]:checked').map(function () {
                return $(this).val();
            }).get();
            data['ids'] = staffs;
            if (staffs.length == 0) {
                alert("Chưa chọn danh mục");
                throw "Not have category";
            }
            if (confirm("Xác nhận xóa")) {
                del(data);
            }

        }

        function del(data) {
            $.ajax({
                type: "DELETE",
                url: "/api/admin/question-category",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (category) {
                    alert(category.message);
                    // getAllCategory("");
                    $('#btnReset').trigger('click');
                    $('.loader').css("display", "none");
                    window.location.reload();
                },
                error: function (response) {
                    alert(response.responseJSON.message);
                    $('.loader').css("display", "none");
                    $('#listCategory').find('input[type=checkbox]').prop("checked", false);
                }
            });
        }

        $('#formSearch').on('submit', function (e) {
            e.preventDefault();
            getAllCategory("");
        })

        function getParentCategory() {
            $.ajax({
                type: "GET",
                url: '/api/admin/question-category/parent',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    $('#parent').empty();
                    var row = '<option value="">Chọn danh mục cha</option>';
                    $.each(response.data, function (i, item) {
                        row += '<option value="' + item.id + '">' + item.nameCategory + '</option>';
                        if (item.listChild.length > 0) {
                            row += showListChild(item.listChild);
                        }


                    });
                    $('#parent').html(row);
                }, error: function (response) {
                }
            })
        }

        getParentCategory();

        function showListChild(listChild) {
            var row = '';
            $.each(listChild, function (i, item) {

                    count++;
                    if (item.parentName != null) {
                        parentName = item.parentName;
                    }
                    var prefix = "";
                    if (count == 1) {
                        prefix = "&emsp; -- "
                    }
                    if (count == 2) {
                        prefix = "&emsp; &emsp; -- "
                    }
                    if (count == 3) {
                        prefix = "&emsp; &emsp; &emsp; --"
                    }
                    if (count == 4) {
                        prefix = "&emsp; &emsp; &emsp; &emsp; --"
                    }
                    row += '<option value="' + item.id + '">' + prefix + item.nameCategory + '</option>';
                    if (item.listChild.length > 0) {
                        row += showListChild(item.listChild);
                    } else {
                        count--;
                    }


                }
            );
            return row;
        }
    })

});


$('#btnCheckAll').click(function () {
    if ($(this).is(':checked')) {

        $('#listCategory').find('input[type=checkbox]').prop("checked", true);
    } else {
        $('#listCategory').find('input[type=checkbox]').prop("checked", false);
    }

});

function loadCatgory(id) {
    $('#btnEdit').text("Cập nhật");
    $('.category').text('Sửa danh mục')
    $.ajax({
        type: "GET",
        url: "/api/admin/question-category/" + id,
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        contentType: "application/json",
        success: function (category) {
            $('#id2').val(category.id);
            $('#name2').val(category.nameCategory);
            $('#describes').val(category.describes);
            $('#pcode').val(category.pcode);
            $('#parent').val(category.parent);
            $('#isActive').val(category.isActive);
            $('#shares').val(category.shares);

        },
        error: function (response) {
            console.log("fail");
            console.log(response);
        }
    });


}

