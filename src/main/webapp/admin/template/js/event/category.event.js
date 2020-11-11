var count = 0;
jQuery(function ($) {
    $(document).ready(function () {
        function getData() {
            var data = {};
            var formData = $('#formSearch').serializeArray();
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            })
            return data;
        }

        function getAllCategoryEvent(url) {
            if (url == "" || url == null) {
                url = "/api/admin/event-category/all-parent";
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
                    if (response.totalPage > 0) {
                        paging(response.totalPage, response.currentPage);
                    }
                    var row = showListCategory(response.data);
                    $('#listCategory').empty();
                    $('#listCategory').append(row);
                    count = 0;
                    $('.loader').css("display", "none");
                }, error: function (res) {
                    console.log("fail");
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            })
        }

        function showListCategory(data) {
            var row = '';
            $.each(data, function (i, item) {
                var isActive = '';
                if (item.isActive == 1) {
                    isActive = '<i class="text-success fa fa-circle" title="Hiển thị"></i>'
                } else {
                    isActive = '<i class="text-warning fa fa-circle" title="Ẩn">';
                }
                var parentName = '';
                if (item.parentName != null) {
                    parentName = item.parentName;
                }
                row += '<tr>';
                row += ' <td class="text-left">&emsp;' + item.nameDetail + '</td>';
                row += '<td class="text-left">' + item.description + '</td>';
                row += '<td class="text-center">' + isActive + '</td>';
                row += '<td>';
                row += '<button dataId="' + item.id + '" class="btn btn-xs btn-info loadCategory" title="Cập nhật"><i' +
                    '                 class="fa fa-pencil-square-o"></i></button>';
                row += '<button dataId="' + item.id + '" class="btn btn-xs btn-info btnDelete" title="Xóa"><i class="fa fa-trash"></i></button>';
                row + '</td>';
                row += '</tr>';
                if (item.listChild.length > 0) {
                    row += showListChild(item.listChild);
                }
            });
            return row;
        }

        function showListChild(data) {
            var row = '';
            $.each(data, function (i, item) {
                var isActive = '';
                if (item.isActive == 1) {
                    isActive = '<i class="text-success fa fa-circle" title="Hiển thị"></i>'
                } else {
                    isActive = '<i class="text-warning fa fa-circle" title="Ẩn">';
                }
                var parentName = '';
                count++;
                if (item.parentName != null) {
                    parentName = item.parentName;
                }
                var prefix = "";
                for (var x = 1; x <= count; x++) {
                    prefix += "&emsp;"
                }
                prefix += "&emsp;--";
                row += '<tr>';
                row += ' <td class="text-left">' + prefix + item.nameDetail + '</td>';
                row += '<td class="text-left">' + item.description + '</td>';
                row += '<td class="text-center">' + isActive + '</td>';
                row += '<td>';
                row += '<button dataId="' + item.id + '" class="btn btn-xs btn-info loadCategory" title="Cập nhật"><i' +
                    '                 class="fa fa-pencil-square-o"></i></button>';
                row += '<button dataId="' + item.id + '" class="btn btn-xs btn-info btnDelete" title="Xóa"><i class="fa fa-trash"></i></button>';
                row + '</td>';
                row += '</tr>';
                if (item.listChild.length > 0) {
                    row += showListChild(item.listChild);
                } else {
                    count--;
                }
            });
            return row;
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
                        var url = "/api/admin/event-category/all-parent";
                        url += "?page=" + page;
                        getAllCategoryEvent(url);
                    }
                }
            });
        }

        $('#formSearch').on('submit', function (e) {
            e.preventDefault();
            getAllCategoryEvent("");
        });
        getAllCategoryEvent("");

        $('#btnReset').click(function () {
            $('#btnEdit').text("Thêm");
            $('#name2').val("");
            $('#description').val('');
            $('#id2').val("");
            $('#parentId').val('');
            $('.category').text('Thêm danh mục');
            $('#isActive').val(1);
        });
        $('#btnEdit').click(function () {
            var data = {};
            var formData = $('#formEdit').serializeArray();
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            if (data.nameDetail == null || data.nameDetail == "") {
                alert("Tên danh mục không được để trông");
                throw "Tên danh mục không được để trông";
            }
            if (data.id == "") {
                save(data)
            } else {
                if (data.id == data.parentId) {
                    alert("Danh mục cha không được trùng danh mục con !");
                    throw 'Parent is not true';
                }
                update(data);
            }

        });

        function save(data) {
            $.ajax({
                type: "POST",
                url: "/api/admin/event-category",
                data: JSON.stringify(data),
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    // getAllCategoryEvent("");
                    // getParentCategory();
                    alert(response.message);
                    $('.loader').css("display", "none");
                    $('#btnReset').trigger('click');
                    window.location.reload();
                },
                error: function (response) {
                    alert(response.responseJSON.message);
                    $('.loader').css("display", "none");
                }
            });
        }

        function update(data) {
            $.ajax({
                type: "PUT",
                url: "/api/admin/event-category",
                data: JSON.stringify(data),
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    // getAllCategoryEvent("");
                    alert(response.message);
                    // getParentCategory();
                    $('.loader').css("display", "none");
                    $('#btnReset').trigger('click');
                    window.location.reload();
                },
                error: function (response) {
                    alert(response.responseJSON.message);
                    $('.loader').css("display", "none");
                }
            });
        };
        $(document).on('click', '.loadCategory', function () {
            var id = $(this).attr('dataId');
            $('#btnEdit').text("Cập nhật");
            $('.category').text('Sửa danh mục')
            $.ajax({
                type: "GET",
                url: "/api/admin/event-category/" + id,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    $('#name2').val(response.nameDetail);
                    $('#description').val(response.description);
                    $('#id2').val(response.id);
                    $('#parentId').val(response.parentId);
                    $('#isActive').val(response.isActive);
                    $('.loader').css("display", "none");
                },
                error: function (response) {
                    $('.loader').css("display", "none");
                    console.log(response);
                }
            });
        })
        $(document).on('click', '.btnDelete', function () {
            var id = $(this).attr('dataId');
            if (confirm("Xác nhận xóa ?")) {
                $.ajax({
                    type: "DELETE",
                    url: "/api/admin/event-category/" + id,
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    //data: JSON.stringify(data),
                    dataType: "json",
                    //contentType: "application/json",
                    beforeSend: function () {
                        $('.loader').css("display", "block");
                    },
                    success: function (response) {
                        alert(response.message);
                        $('.loader').css("display", "none");
                        $('#btnReset').trigger('click');
                        window.location.reload();
                        // getAllCategoryEvent('');
                    },
                    error: function (response) {
                        $('#btnReset').trigger('click');
                        $('.loader').css("display", "none");
                        alert(response.responseJSON.message);
                        console.log(response);
                    }
                });
            }
        });

        function getParentCategory() {
            $.ajax({
                type: "GET",
                url: '/api/admin/event-category/parent',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    $('#parentId').empty();
                    var row = '<option value="">Chọn danh mục cha</option>';
                    $.each(response.data, function (i, item) {
                        if (item.isActive == 1) {
                            row += '<option value="' + item.id + '"> <i class="fa fa-ban"></i>' + item.nameDetail + '</option>';
                            if (item.listChild.length > 0) {
                                row += showListChild2(item.listChild);
                            }
                        }
                    });
                    $('#parentId').html(row);
                    count = 0;
                }, error: function (response) {


                }
            })
        }

        getParentCategory();

        function showListChild2(listChild) {
            var row = '';
            $.each(listChild, function (i, item) {

                    count++;
                    var prefix = "";
                    if (count == 1) {
                        prefix = '&emsp;-- '
                    }
                    if (count == 2) {
                        prefix = "&emsp; &emsp; -- "
                    }
                    if (count == 3) {
                        prefix = "&emsp; &emsp; &emsp; --"
                    }
                    if (count == 4) {
                        prefix = "&emsp; &emsp; &emsp; --"
                    }
                    row += '<option value="' + item.id + '"><i class="fa fa-address-book-o" aria-hidden="true"></i>' + prefix + item.nameDetail + '</option>';
                    if (item.listChild.length > 0) {
                        row += showListChild2(item.listChild);
                    } else {
                        count--;
                    }

                }
            );
            return row;
        }

    })//end jQuery
});


