var currentPages;
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

        function getAllCatgoryNews(url) {
            var data = getData();
            if (url == "" || url == null) {
                url = '/api/admin/new-category/all-parent';
            }
            $.ajax({
                type: "POST",
                url: url,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                data: JSON.stringify(data),
                dataType: "json",
                beforeSend: function () {
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                    $('.loader').css("display", "block");
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
                },
                error: function (response) {
                    $('.loader').css("display", "none");
                }
            });
        }

        getAllCatgoryNews("");

        function showListCategory(data) {
            var row = "";
            $.each(data, function (i, item) {
                var parentName = '';
                var isActive = '';
                if (item.isActive == 1) {
                    isActive = '<i class="text-success fa fa-circle" title="Hiển thị"></i>'
                } else {
                    isActive = '<i class="text-warning fa fa-circle" title="Ẩn">';
                }
                if (item.parentName != null) {
                    parentName = item.parentName;
                }
                row += '<tr>';
                row += '<td class="text-left">&emsp;' + item.nameDetail + '</td>';
                row += '<td class="text-left">' + item.description + '</td>';
                row += '<td class="text-center">' + isActive + '</td>'
                row += '<td>';
                row += '<button  dataId="' + item.id + '" class="btn btn-xs btn-info loadCategory " title="Cập nhật"><i class="fa fa-pencil-square-o"></i></button>';
                row += '<button dataId="' + item.id + '" class="btn btn-xs btn-info btnDelete" title="Xóa"><i class="fa fa-trash"></i></button>';
                row += '</td>';
                row += '</tr>';
                if (item.listChild.length > 0) {

                    row += showListChild(item.listChild)
                }
            });
            return row;
        }

        function showListChild(data) {
            var row = '';
            $.each(data, function (i, item) {
                    count++;
                    var parentName = '';
                    var isActive = '';
                    if (item.isActive == 1) {
                        isActive = '<i class="text-success fa fa-circle" title="Hiển thị"></i>'
                    } else {
                        isActive = '<i class="text-warning fa fa-circle" title="Ẩn">';
                    }
                    if (item.parentName != null) {
                        parentName = item.parentName;
                    }
                    var prefix = "";
                    for (var x = 1; x <= count; x++) {
                        prefix += "&emsp;"
                    }
                    prefix += "--";
                    row += '<tr>';
                    row += '<td class="text-left">' + prefix + item.nameDetail + '</td>';
                    row += '<td class="text-left">' + item.description + '</td>';
                    row += '<td class="text-center">' + isActive + '</td>'
                    row += '<td>';
                    row += '<button  dataId="' + item.id + '" class="btn btn-xs btn-info loadCategory " title="Cập nhật"><i class="fa fa-pencil-square-o"></i></button>';
                    row += '<button dataId="' + item.id + '" class="btn btn-xs btn-info btnDelete" title="Xóa"><i class="fa fa-trash"></i></button>';
                    row += '</td>';
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
                        var url = "/api/admin/new-category/all-parent";
                        url += "?page=" + page;
                        getAllCatgoryNews(url);
                    }
                }
            });
        }

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
                save(data);
            } else {
                if (data.id == data.parentId) {
                    alert("Danh mục cha không được trùng đơn vị con");
                    throw "category false";
                }
                update(data);
            }


        });
        $('#formSearch').on('submit', function (e) {
            e.preventDefault();
            getAllCatgoryNews("");
        });

        function update(data) {
            $.ajax({
                type: "PUT",
                url: "/api/admin/new-category",
                data: JSON.stringify(data),
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    alert(response.message);
                    $('#btnReset').trigger('click');
                    $('.loader').css("display", "none");
                    window.location.reload();
                    // getAllCatgoryNews("");
                    // getParentCategory();
                },
                error: function (response) {
                    //console.log("fail");
                    alert(response.responseJSON.message);
                    $('.loader').css("display", "none");
                    console.log(response);
                }
            });
        }

        $(document).on('click', '.btnDelete', function () {
            var id = $(this).attr('dataId');
            if (confirm("Xác nhận xóa ?")) {
                $.ajax({
                    type: "DELETE",
                    url: "/api/admin/new-category/" + id,
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    //data: JSON.stringify(data),
                    dataType: "json",
                    //contentType: "application/json",
                    beforeSend: function () {
                        $('.loader').css("display", "block");
                    },
                    success: function (response) {
                        $('.loader').css("display", "none");
                        // getAllCatgoryNews('');
                        $('#btnReset').trigger('click');
                        alert(response.message);

                        window.location.reload(true);
                    },
                    error: function (response) {
                        $('#btnReset').trigger('click');
                        alert(response.responseJSON.message);
                        $('.loader').css("display", "none");
                        console.log(response);
                    }
                });
            }
        });
        $(document).on('click', '.loadCategory', function () {
            var id = $(this).attr('dataId');
            $('#btnEdit').text("Cập nhật");
            $('.category').text('Sửa danh mục')
            $.ajax({
                type: "GET",
                url: "/api/admin/new-category/" + id,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
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
                    //console.log("fail");
                    alert("Thêm không thành công !");
                    $('.loader').css("display", "none");
                    console.log(response);
                }
            });
        });

        function save(data) {
            $.ajax({
                type: "POST",
                url: "/api/admin/new-category",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    alert(response.message);
                    $('#btnReset').trigger('click');
                    $('.loader').css("display", "none");
                    // getParentCategory();
                    // getAllCatgoryNews("");
                    window.location.reload();

                },
                error: function (response) {
                    //console.log("fail");
                    alert(response.responseJSON.message);
                    $('#btnReset').trigger('click');
                    $('.loader').css("display", "none");
                    console.log(response);
                }
            });
        }

        $('#btnReset').click(function () {
            var category = {}
            $('#btnEdit').text("Thêm");
            $('#name2').val(category.name);
            $('#description').val(category.description);
            $('#id2').val(category.id);
            $('#parentId').val(category.parentId);
            $('#isActive').val(1);
            $('.category').text('Thêm danh mục')
        });
        getParentCategory();

        function getParentCategory() {
            $.ajax({
                type: "GET",
                url: '/api/admin/new-category/parent',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    $('#parentId').empty();
                    var row = '<option value="">Chọn danh mục cha</option>';
                    $.each(response.data, function (i, item) {
                        if (item.isActive == 1) {
                            row += '<option value="' + item.id + '">' + item.nameDetail + '</option>';
                            if (item.listChild.length > 0) {
                                count = 0;
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

        function showListChild2(listChild) {
            var row = '';
            $.each(listChild, function (i, item) {
                    if (item.isActive == 1) {
                        count++;
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
                            prefix = "&emsp; &emsp; &emsp; --"
                        }
                        row += '<option value="' + item.id + '">' + prefix + item.nameDetail + '</option>';
                        if (item.listChild.length > 0) {
                            row += showListChild2(item.listChild);
                        } else {
                            count--;
                        }
                    }

                }
            );
            return row;
        }
    })
});


