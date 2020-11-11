var currentPages = 1;
var count = 0;
jQuery(function ($) {
    $(document).ready(function () {
        getAllCategory("");
         $("#btn_save_group2").css("display", "block");
         $("#btn_exit_group").css("display", "block");
        document.getElementById("updateCategory").style.display = 'none';
        document.getElementById("createCategory").style.display = 'block';
        function getData() {
            var data = {};
            var formData = $('#formSearch').serializeArray();
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            return data;
        }

        $('#formSearch').on('submit', function (e) {
            e.preventDefault();
            getAllCategory("");
        });

        function paging(totalPage, currentPage) {
            $("#pagination-test").twbsPagination({
                totalPages: totalPage,
                startPage: currentPage,
                visiblePages: 10,
                last: "Cuối cùng",
                next: "Tiếp theo",
                first: "Đầu tiên",
                prev: "Phía trước",
                onPageClick: function (event, page) {
                    if (currentPage != page) {
                        var url = "/api/admin/document-category/all-parent";
                        url += "?page=" + page;
                        getAllCategory(url);
                    }
                },
            });
        }

        function getAllCategory(url) {
            if (url == "" || url == null) {
                url = '/api/admin/document-category/all-parent';
            }
            var data = getData();
            $.ajax({
                type: "POST",
                url: url,
                headers: {Authorization: "Bearer " + localStorage.getItem("eln_token")},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");

                },
                success: function (category) {
                    if (category.totalPage > 0) {
                        paging(category.totalPage, category.currentPage)
                    }
                    console.log(category)
                    var row = showListCategory(category.data);
                    count = 0;
                    $("#listCategory").empty();
                    $("#listCategory").append(row);
                    $('.loader').css("display", "none");
                },
                error: function (category) {
                    $('.loader').css("display", "block");
                }
            });
        }

        function showListCategory(data) {
            var row = "";
            $.each(data, function (i, item) {
                if(item.status == 1)
                {
                    documentCategoryStatus=    '<i class="text-success fa fa-circle" <="" i=""></i>';
                }
                else
                {
                    documentCategoryStatus= '<i class="text-warning fa fa-circle" title="Đã khóa"></i>';
                }

                row += '<tr>';
                row += '<td  style="text-align: left">' + item.nameDocument + '</td>';
                row += '<td style="text-align: center">' + item.describes + '</td>';
                row += '<td style="text-align: center">'+documentCategoryStatus+'</td>'
                row +=
                    '<td><button onclick="loadDocumentCaByID(' +
                    item.id +
                    ')" class="btn btn-default btn-sm "> <i class="far fa-edit"></i> </button> ' +
                    '<button onclick="deleteDocument(' +
                    item.id +
                    ')" class="btn btn-default btn-sm "> <i class="far fa-trash-alt"></i> </button></td>';
                row += ' </tr>';
                if (item.listChild.length > 0) {
                    count=0;
                    row += showListChild(item.listChild);
                }
            });
            return row;
        }

        function showListChild(data) {
            var row = '';
            $.each(data, function (i, item) {
                count++;
                var parentName = '';
                if (item.parentName != null) {
                    parentName = item.parentName;
                }
                var childSpace = '';
                for (var x = 1; x <= count; x++) {
                    childSpace += '&emsp;';
                }
                if(item.status == 1)
                {
                    documentCategoryStatus=    '<i class="text-success fa fa-circle" <="" i=""></i>';
                }
                else
                {
                    documentCategoryStatus= '<i class="text-warning fa fa-circle" title="Đã khóa"></i>';
                }

                childSpace += '<i class="fas fa-arrow-circle-right"></i> &emsp; ' ;
                row += '<tr>';
                row += '<td style="text-align: left">' + childSpace + item.nameDocument + '</td>';
                row += '<td style="text-align: center">' + item.describes + '</td>';
                row += '<td style="text-align: center">'+documentCategoryStatus+'</td>'
                row += '<td><button onclick="loadDocumentCaByID(' + item.id + ')" class="btn btn-default btn-sm "> <i class="far fa-edit"></i> </button> ' +
                    '<button onclick="deleteDocument(' + item.id + ')" class="btn btn-default btn-sm "> <i class="far fa-trash-alt"></i> </button></td>';
                row += ' </tr>';
                if (item.listChild.length > 0) {
                    row += showListChild(item.listChild);
                } else {
                    count--;
                }
            });
            return row;
        }

        getParentCategory();

        function getParentCategory() {
            $.ajax({
                type: "GET",
                url: '/api/admin/document-category/parent',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                },
                success: function (response) {
                    $('#parent').empty();
                    var row = '<option value="">Chọn danh mục cha</option>';
                    $.each(response.data, function (i, item) {
                        row += '<option value="' + item.id + '">' + item.nameDocument + '</option>';
                        if (item.listChild.length > 0) {
                            row += showListChild2(item.listChild);
                        }
                    });
                    count = 0;
                    $('#parent').html(row);
                    count = 0;
                }, error: function (response) {
                }
            })
        }

        function showListChild2(listChild) {
            var row = '';
            $.each(listChild, function (i, item) {
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
                    row += '<option value="' + item.id + '">' + prefix + item.nameDocument + '</option>';
                    if (item.listChild.length > 0) {
                        row += showListChild2(item.listChild);
                    } else {
                        count--;
                    }
                }
            );
            return row;
        }

        ////////////////////////////////

        $("#btn_save_group").on("click", function () {
            if ($("#nameDocument").val() != "") {
                // if ($("#id").val() == $("#parent").val()) {
                //     alert("Danh mục cha trùng với danh mục con");
                // } else {
                var dataArray = {};
                dataArray["nameDocument"] = $("#nameDocument").val();
                dataArray["describes"] = $("textarea[name='text_area_detail']").val();
                dataArray["status"] =$("#status").val();
                dataArray["parent"] = $("#parent").val();
                save(dataArray);
                // }
            } else {
                alert("Tên danh mục không được để trống");
            }
        });

        function save(dataArray) {
            $.ajax({
                url: "/api/admin/document-category/create",
                headers: {Authorization: "Bearer " + localStorage.getItem("eln_token")},
                type: "POST",
                data: JSON.stringify(dataArray),
                dataType: "json",
                contentType: "application/json",
                success: function (response) {
                    alert(response.message);
                    window.location.reload();
                },
                error: function (response) {
                    alert(response.responseJSON.message);
                },
            });
        }
    });
});

function deleteDocument(id) {
    if (!confirm("Xác nhận xóa danh mục")) {
        throw "Do not delete";
    }

    $.ajax({
        type: "DELETE",
        url: "/api/admin/document-category/" + id,
        headers: {Authorization: "Bearer " + localStorage.getItem("eln_token")},
        contentType: "application/json",
        success: function (response) {
            console.log(response);
            alert(response.message);
            window.location.href = "/admin/document/category/list";
        },
        error: function (response) {
            alert(response.responseJSON.message);
            window.location.href = "/admin/document/category/list";
        },
    });
}

function loadDocumentCaByID(id) {
    var data = {};
    data["id"] = id;
    var category = {};

    $("#btn_update_group").css("display", "block");
    $("#btn_save_group2").css("display", "none");
    $("#btn_exit_group").css("display", "block");

    document.getElementById("updateCategory").style.display = 'block';
    document.getElementById("createCategory").style.display = 'none';


    console.log(data);
    $.ajax({
        type: "GET",
        url: "/api/admin/document/list/detail/" + id,
        headers: {Authorization: "Bearer " + localStorage.getItem("eln_token")},
        contentType: "application/json",
        processData: false,
        success: function (response2) {
            //document =response;
            console.log(response2);
            $("#nameDocument").val(response2.nameDocument);
            $("#describes").val(response2.describes);
            $("#status").val(response2.status);
            $("#id").val(response2.id);
            $("#parent").val(response2.parent);
        },
        error: function (response) {
            console.log(this.url);
            console.log("fail");
            alert("Xóa không thành công !");
            console.log(response);
        },
    });
    event.preventDefault();
}

function putDocumentCate(dataArray) {
    $.ajax({
        type: "PUT",
        url: "/api/admin/document-category",
        data: JSON.stringify(dataArray),
        headers: {Authorization: "Bearer " + localStorage.getItem("eln_token")},
        dataType: "json",
        contentType: "application/json",
        success: function (category) {
            alert(category.message);
            window.location.href = "/admin/document/category/list";
        },
        error: function (category) {
            alert(category.responseJSON.message);
        },
    });
}



$("#btn_update_group").on("click", function () {
    if ($("#nameDocument").val() != "") {
        if ($("#id").val() == $("#parent").val()) {
            alert("Danh mục cha trùng với danh mục con");
        } else {
            var dataArray = {};
            dataArray["id"] = $("#id").val();
            dataArray["nameDocument"] = $("#nameDocument").val();
            dataArray["describes"] = $("textarea[name='text_area_detail']").val();
            dataArray["status"] = $("#status").val();
            dataArray["parent"] = $("#parent").val();
            putDocumentCate(dataArray);
        }
    } else {
        alert("Bạn cần điền đầy đủ thông tin");
    }
});

$("#btn_exit_group").on("click", function () {
    $("#nameDocument").val("");
    $("#describes").val("");

   // $("#btn_save_group").css("display", "block");
  //  $("#btn_update_group").css("display", "none");
    $("#btn_exit_group").css("display", "block");
    $("#btn_save_group2").css("display", "block");

    document.getElementById("btn_update_group").style.display = 'none';
    document.getElementById("updateCategory").style.display = 'none';
    document.getElementById("createCategory").style.display = 'block';
    document.getElementById("btn_save_group2").style.display = 'block';

  //  showbutton();
});

function showbutton() {
    //  alert("pok");
    $("#btn_save_group2").css("display","block");
    $("#btn_exit_group").css("display","block");
}
