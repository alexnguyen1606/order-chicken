function loaddocumentcatgory(id) {
    // $('#btnEdit').text("Cập nhật");
    var data = {};
    data["id"] = id;
    var category = {};
    console.log(data);
    $.ajax({
        type: "GET",
        url: "/api/admin/document/list/detail/" + id,
        headers: {Authorization: "Bearer " + localStorage.getItem("eln_token")},
        // data: JSON.stringify(data),
        // dataType: "json",
        contentType: "application/json",
        success: function (category) {
            $("#id2").append(category.id);
            $("#name2").append(category.nameDocument);
            $("#description2").append(category.describes);
            $("#parent").append(category.parent);
        },
        error: function (response) {
            console.log("fail");
            console.log(response);
        },
    });
}

$("#btn_exit_group").on("click", function () {
    $("#nameDocument").val("");
    $("#describes").val("");
    $("#btn_update_group").css("display", "none");
    $("#btn_save_group2").css("display", "block");
    $("#btn_exit_group").css("display", "none");
});

$("#btn_update_group").on("click", function () {
    if ($("#nameDocument").val() != "") {
        if ($("#id").val() == $("#parent").val()) {
            alert("Danh mục cha trùng với danh mục con");
        } else {
            var dataArray = {};
            dataArray["id"] = $("#id").val();
            dataArray["nameDocument"] = $("#nameDocument").val();
            dataArray["describes"] = $("textarea[name='text_area_detail']").val();
            dataArray["parent"] = $("#parent").val();

            putDocumentCate(dataArray);
        }
    } else {
        alert("Bạn cần điền đầy đủ thông tin");
    }
});

$("#btn_save_group").on("click", function () {
    if ($("#nameDocument").val() != "") {
        if ($("#id").val() == $("#parent").val()) {
            alert("Danh mục cha trùng với danh mục con");
        } else {
            var dataArray = {};
            dataArray["nameDocument"] = $("#nameDocument").val();
            dataArray["describes"] = $("textarea[name='text_area_detail']").val();
            dataArray["parent"] = $("#parent").val();
            save(dataArray);
        }
    } else {
        alert("Bạn cần điền đầy đủ thông tin");
    }
});

function save(dataArray) {
    $.ajax({
        url: "/api/admin/document/list",
        headers: {Authorization: "Bearer " + localStorage.getItem("eln_token")},
        type: "POST",
        data: JSON.stringify(dataArray),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            if (res == 0) {
                alert("Thêm thành công");
                getAllCategory();
            } else {
                alert("Thêm Thành công ");
                window.location.reload();

                function getAllCategory() {
                    $.ajax({
                        type: "GET",
                        url: "/api/admin/document/list/all",
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("eln_token"),
                        },
                        // data: JSON.stringify(data),
                        // dataType: "json",
                        contentType: "application/json",
                        success: function (category) {
                            var parentName = "";
                            if (item.parentName != null) {
                                parentName = item.parentName;
                            }
                            var row = "";
                            $.each(category, function (i, item) {
                                row += "<tr>";
                                row += '<td class="text-center">' + item.nameDocument + "</td>";
                                row += '<td class="text-center">' + item.describes + "</td>";
                                row += '<td class="text-center">' + parentName + "</td>";
                                row +=
                                    '<td><button onclick="loadDocumentCaByID(' +
                                    item.id +
                                    ')" class="btn btn-warning btn-sm "> Sửa </button> ' +
                                    '<button onclick="deleteDocument(' +
                                    item.id +
                                    ')" class="btn btn-warning btn-sm "> Xóa </button></td>';
                                // row += '<td></td>';
                                // row += '</tr>'
                            });
                            $("#listCategory").empty();
                            $("#listCategory").append(row);
                        },
                    });
                }

                getAllCategory();
                loadDocumentCategoryParent();
            }
        },
        error: function (res) {
            alert("Tên danh mục đã tồn tại");
        },
    });
}

jQuery(function ($) {
    $(document).ready(function () {
        function getAllCategory() {
            $.ajax({
                type: "GET",
                url: "/api/admin/document/list/all",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("eln_token"),
                },
                // data: JSON.stringify(data),
                // dataType: "json",
                contentType: "application/json",
                success: function (category) {
                    var row = "";
                    $.each(category, function (i, item) {
                        var parentName2 = "";
                        if (item.parentName != null) {
                            parentName2 = item.parentName;
                        }

                        row += "<tr>";
                        row += '<td class="text-center">' + item.nameDocument + "</td>";
                        row += '<td class="text-center">' + item.describes + "</td>";
                        row += '<td class="text-center">' + parentName2 + "</td>";
                        row +=
                            '<td><button onclick="loadDocumentCaByID(' +
                            item.id +
                            ')" class="btn btn-warning btn-sm "> Sửa </button> ' +
                            '<button onclick="deleteDocument(' +
                            item.id +
                            ')" class="btn btn-warning btn-sm "> Xóa </button></td>';
                        row += "</tr>";
                    });
                    $("#listCategory").empty();
                    $("#listCategory").append(row);
                },
            });
        }

        getAllCategory();
        loadDocumentCategoryParent();
    });
});

function deleteDocument(id) {
    if (!confirm("Xác nhận xóa danh mục")) {
        throw "Do not delete";
    }

    $.ajax({
        type: "DELETE",
        url: "/api/admin/document/list/" + id,
        headers: {Authorization: "Bearer " + localStorage.getItem("eln_token")},
        contentType: "application/json",
        success: function (response) {
            alert("Xóa thành công!");
            window.location.href = "/admin/document/category/list";
        },
        error: function (response) {
            alert("Danh mục đang được sử dụng !");
            window.location.href = "/admin/document/category/list";
        },
    });
}

function loadDocumentCaByID(id) {
    var data = {};
    data["id"] = id;
    var category = {};
    // $('#btn_save_group2').text("Cập nhật");
    $("#btn_update_group").css("display", "block");
    $("#btn_save_group").css("display", "none");
    $("#btn_exit_group").css("display", "block");

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
        url: "/api/admin/document/list",
        data: JSON.stringify(dataArray),
        headers: {Authorization: "Bearer " + localStorage.getItem("eln_token")},
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            alert("Cập nhật thành công");
            window.location.href = "/admin/document/category/list";
        },
        error: function (response) {
            console.log("fail");
            alert("cập nhật không thành công");
            console.log(response);
        },
    });
}

function loadDocumentCategoryParent() {
    $.ajax({
        type: "GET",
        url: "/api/admin/document/list/all",
        headers: {Authorization: "Bearer " + localStorage.getItem("eln_token")},
        contentType: "application/json",
        beforeSend: function () {
            //  $('.loader').css("display","block");
        },
        success: function (response) {
            var row = "";
            var row = '<option value="">Chọn danh mục cha</option>';
            $.each(response, function (i, v) {
                row += "<option ";
                var namedocumentParent = "";
                if (v.parent != null) {
                    namedocumentParent = "-- " + v.nameDocument + "   ";
                }
                if (v.parent == null) {
                    namedocumentParent = "" + v.nameDocument + "   ";
                }
                if (v.id == document.parent) {
                    row += 'selected="selected" ';
                }
                row += 'value="' + v.id + '" >';
                row += namedocumentParent + "</option>";
            });
            $("#parent").append(row);
            $("#parentInput").append(row);
        },
        error: function (response) {
        },
    });
}

// function loadDocumentCategoryParent() {
//     $.ajax({
//         type: "GET",
//         url: "/api/admin/document/list/all",
//         headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
//         contentType: "application/json",
//         beforeSend: function () {
//             //  $('.loader').css("display","block");
//         },
//         success: function (response) {
//             var row = '';
//             $.each(response, function (i, v) {
//                 row += '<option ';
//                 if (v.id == document.idDocumentCategory) {
//                     row += 'selected="selected" ';
//                 }
//                 row += 'value="' + v.id + '" >';
//                 row += v.nameDocument + '</option>';
//             });
//             $('#parent').append(row);
//         },
//         error: function (response) {
//         }
//     });
// }
