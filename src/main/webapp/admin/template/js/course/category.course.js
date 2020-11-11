var count = 0;
jQuery(function ($) {
    $(document).ready(function () {
        function getData() {
            var data = {};
            var formData = $('#formSearch').serializeArray();
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            return data;
        }

        function getAllCategory(url) {
            if (url == null || "" === url) {
                url = "/api/admin/course-category/parent?size=5";
            }
            var data = getData();
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
                    if (response.totalPage != 0) {
                        paging(response.totalPage, response.currentPage);
                    }
                    showListCategory(response.data);
                    $('.loader').css("display", "none");
                    count = 0;
                }, error: function (response) {
                    $('.loader').css("display", "none");

                }
            })

        };

        function showListCategory(data) {
            var row = '';
            $('#listCategory').empty();
            $.each(data, function (i, item) {
                var parentName = '';
                if (item.parentName != null) {
                    parentName = item.parentName;
                }
                var isActive = '';
                if (item.isActive == 1) {
                    isActive = '<i class="text-success fa fa-circle" title="Hiển thị"></i>'
                } else {
                    isActive = '<i class="text-warning fa fa-circle" title="Ẩn">';
                }
                row += '<tr>';
                row += '<td class="text-left"> &emsp;' + item.name + '</td>';
                row += '<td class="text-center">' + item.description + '</td>';
                row += '<td class="text-center">' + isActive + '</td>';
                row += '<td><input type="checkbox" value="' + item.id + '" id="checkbox_' + item.id + '"></td>';
                row += '<td><button onclick="loadCatgory(' + item.id + ')" class="btn btn-xs btn-info"><i class="fa fa-pencil-square-o fa-2x"></i></button></td>';
                row += '</tr>';
                if (item.listChild.length > 0) {
                    count = 0;
                    row += showListChild(item.listChild);
                }
            });
            $('#listCategory').append(row);
        }

        function showListChild(listChild) {
            var row = '';
            $.each(listChild, function (i, item) {
                    count++;
                    var parentName = '';
                    if (item.parentName != null) {
                        parentName = item.parentName;
                    }
                    var isActive = '';
                    if (item.isActive == 1) {
                        isActive = '<i class="text-success fa fa-circle" title="Hiển thị"></i>'
                    } else {
                        isActive = '<i class="text-warning fa fa-circle" title="Ẩn">';
                    }
                    var prefix = "";
                    for (var x = 1; x <= count; x++) {
                        prefix += "&emsp;"
                    }
                    prefix += "--";
                    row += '<tr>';
                    row += '<td class="text-left">  ' + prefix + item.name + '</td>';
                    row += '<td class="text-center">' + item.description + '</td>';
                    row += '<td class="text-center">' + isActive + '</td>';
                    row += '<td><input type="checkbox" value="' + item.id + '" id="checkbox_' + item.id + '"></td>';
                    row += '<td><button onclick="loadCatgory(' + item.id + ')" class="btn btn-xs btn-info"><i class="fa fa-pencil-square-o fa-2x"></i></button></td>';
                    row += '</tr>';
                    if (item.listChild.length > 0) {
                        row += showListChild(item.listChild);
                    } else {
                        count--;
                    }

                }
            );
            return row;
        }

        $('#formSearch').on('submit', function (e) {
            e.preventDefault();
            getAllCategory("");
        });

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
                        var url = "/api/admin/course-category/parent";
                        url += "?page=" + page;
                        url += "&size=5";
                        getAllCategory(url);
                    }
                }
            });
        }

        getAllCategory("");
        $(document).on('click', '#btnReset', function () {
            var category = {};
            $('#btnEdit').text("Thêm");
            $('#id2').val(category.id);
            $('#name2').val(category.name);
            $('#description2').val(category.description);
            $('#parentId').val(category.parentId);
            $('.category').text("Thêm danh mục")
        });
        $('#btnEdit').click(function () {
            var data = {};
            var id = $('#id2').val();
            var formEdit = $('#formEdit').serializeArray();
            $.each(formEdit, function (index, v) {
                data["" + v.name + ""] = v.value;
            });
            if (data.name == "") {
                alert("Tên danh mục không được để trống !")
                throw "name category is null"
            }
            if (id == "") {
                post(data);
            } else {
                if (data.id == data.parentId) {
                    alert("Danh mục cha trùng với danh mục con")
                    throw "parent id is nott true";
                }
                put(data);
            }

        });
        $('#btnDelete').click(function () {
            var data = {};
            var staffs = $('#categoryList').find('tbody input[type=checkbox]:checked').map(function () {
                return $(this).val();
            }).get();
            if (staffs.length == 0) {
                alert("Chưa có danh mục nào được chọn");
                throw "Chưa có danh mục";
            }
            if (confirm("Xác nhận xóa")) {
                data['ids'] = staffs;
                del(data);
            }

        });

        function post(data) {
            $.ajax({
                type: "POST",
                url: "/api/admin/course-category",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (category) {
                    alert(category.message);
                    $('#btnReset').trigger('click');
                    $('.loader').css("display", "none");
                    window.location.reload();
                    // getAllCategory("");
                    // getParentCategory();

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
                url: "/api/admin/course-category",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (category) {
                    alert(category.message);
                    $('#btnReset').trigger('click');
                    $('.loader').css("display", "none");
                    // getAllCategory("");
                    // getParentCategory();
                    window.location.reload();
                },
                error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });

        };

        function del(data) {
            $.ajax({
                type: "DELETE",
                url: "/api/admin/course-category",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    alert(response.message);
                    //getAllCategory();
                    $('#btnReset').trigger('click');
                    $('.loader').css("display", "none");
                    window.location.reload();
                },
                error: function (response) {
                    $('#btnReset').trigger('click');
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        }

        $('#btnCheckAll').click(function () {
            if ($(this).is(':checked')) {

                $('#listCategory').find('input[type=checkbox]').prop("checked", true);
            } else {
                $('#listCategory').find('input[type=checkbox]').prop("checked", false);
            }

        });
    })
});

function loadCatgory(id) {
    $('#btnEdit').text("Cập nhật");
    $('.category').text("Sửa danh mục")
    var data = {};
    data['id'] = id;
    var category = {};
    console.log(data)
    $.ajax({
        type: "GET",
        url: "/api/admin/course-category/detail/" + id,
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        // data: JSON.stringify(data),
        // dataType: "json",
        contentType: "application/json",
        success: function (category) {

            $('#id2').val(category.id);
            $('#name2').val(category.name);
            $('#description2').val(category.description);
            $('#parentId').val(category.parentId);
            $('#isActive').val(category.isActive);

        },
        error: function (response) {
            console.log("fail");
            console.log(response);
        }
    });

}
