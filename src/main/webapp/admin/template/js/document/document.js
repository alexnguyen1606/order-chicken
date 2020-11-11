var document = {};
    jQuery(function ($) {
    $(document).ready(function () {
        function getDocument() {
            var documentId = $("#id").val();
            if (documentId != null) {
                $.ajax({
                    type: "GET",
                    url: "/api/admin/document/" + documentId,
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("eln_token"),
                    },
                    contentType: "application/json",
                    beforeSend: function () {
                        //  $('.loader').css("display","block");
                    },
                    success: function (response) {
                        document = response;
                        console.log(response);
                        $("#name").val(response.name);
                        $("#idDocumentCategory").val(response.idDocumentCategory);
                        $("#describes").val(response.describes);
                        $("#idPrioritize").val(response.idPrioritize);
                        $("#linkFile").val(response.linkFile);
                        $("#idLimit").val(response.idLimit);
                        $("#shares").val(response.shares);
                        $("#status").val(response.status);
                        $("#sizes").val(response.sizes);
                        $("#originName").val(response.originName);
                        $("#old_name_file").html(response.originName);
                        $("#size_old").html(response.sizes);
                        $("#allowedDownload").val(response.allowedDownload);
                    },
                    error: function (response) {
                    },
                });
            }
        }

        function getDocumentCategory() {
            $.ajax({
                type: "GET",
                url: "/api/admin/document-category/all",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("eln_token"),
                },
                contentType: "application/json",
                beforeSend: function () {
                   //   $('.loader').css("display","block");
                },
                success: function (response) {
                    var row = "";
                    $.each(response, function (i, v) {
                        row += "<option ";
                        if (v.id == document.idDocumentCategory) {
                            row += 'selected="selected" ';
                        }
                        row += 'value="' + v.id + '" >';
                        row += v.nameDocument + "</option>";
                    });
                    $("#idDocumentCategory").append(row);
                },
                error: function (response) {
                },
            });
        }

        getDocument();
        getDocumentCategory();
    });
});

$("#btnSaveDocument").click(function () {
    var data = {};
    var id = $("#id").val();
    var formEdit = $("#formEdit").serializeArray();
    $.each(formEdit, function (index, v) {
        data["" + v.name + ""] = v.value;
    });
    if (data.name == "") {
        alert("Tên tài liệu không được để trống !");
        throw "name partner is null";
    }
    if (id == "") {
        if ($("#file-input").get(0).files.length === 0) {
            alert("File không được để trống");
            throw "s";
        }
        postDocument(data);
    } else {
        putDocument(data);
    }
});

function postDocument(dataArray) {
    $.ajax({
        type: "POST",
        url: "/api/admin/document",
        headers: {Authorization: "Bearer " + localStorage.getItem("eln_token")},
        data: JSON.stringify(dataArray),
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: function () {
            $(".loader").css("display", "block");
            //$('.loader').css("background")
        },
        success: function (response) {
            $(".loader").css("display", "none");
            console.log("Thêm mới thành công");
            alert("Thêm mới thành công");
            console.log(response);
            window.location.href = "/admin/document/category";
        },
        error: function (response) {
            console.log("Thêm mới thất bại");
            alert("add fail");
            console.log(response);
        },
    });
}

function putDocument(data) {
    $.ajax({
        type: "PUT",
        url: "/api/admin/document",
        data: JSON.stringify(data),
        headers: {Authorization: "Bearer " + localStorage.getItem("eln_token")},
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $(".loader").css("display", "block");
        },
        success: function (response) {
            console.log("Thêm Thành Công");
            //alert(response.message);
            alert("Cập nhật thành công");
            window.location.href = "/admin/document/category";
        },
        error: function (response) {
            console.log("fail");
            alert("cập nhật không thành công");
            $(".loader").css("display", "none");
            console.log(response);
        },
    });
}


function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}

function removeAccentAndSpace(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(" ", "");
    return str;
}

$("#file-input").on("change", function (e) {
    var formData = new FormData();

    var fileName = e.target.files[0].name;
    $("#originName").val(fileName);

    formData.append("multipartFile", $("#file-input")[0].files[0]);
    var name2 = removeAccentAndSpace(
        uuidv4() + "-" + $("#file-input")[0].files[0].name
    );
    var name = name2.replace(/\s+/g, "");
    formData.append("name", name);
    var total = [].slice
        .call(this.files)
        .map(function (x) {
            return x.size || x.fileSize;
        })
        .reduce(function (a, b) {
            return a + b;
        }, 0);

    if (Math.floor(total / 1024 / 1024) == 0) {
        $("#total").html("Dung Lượng File: " + Math.floor(total / 1024) + " KB");
        $("#sizes").val(Math.floor(total / 1024) + " KB");
        $("#total2").html("Dung Lượng File: " + Math.floor(total / 1024) + " KB");
    } else {
        $("#total").html(
            "Dung Lượng File: " + Math.floor(total / 1024 / 1024) + " MB"
        );
        $("#sizes").val(Math.floor(total / 1024 / 1024) + " MB");
        $("#total2").html("Dung Lượng File: " + Math.floor(total / 1024) + " KB");
    }
    if (total > 1000000000) {
        alert("Vượt quá 1GB dung lượng cho phép");
        $("#progress-text1").text(
            " File vượt quá 1GB dung lượng cho phép"
        );

        $('#progress1').val(0);
        $("#btnSaveDocument").prop("disabled", true);
        throw "fail";
    } else {
        $("#btnSaveDocument").prop("disabled", true);
        $("#spin-progress").css("display", "block");
    }

    $("#linkFile").val("/e-learning/admin/download/document?name=" + name);
    $.ajax({
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener(
                    "progress",
                    function (e) {
                        var percent_loaded = Math.ceil((e.loaded / e.total) * 100);
                        if (percent_loaded == 100) {
                            $("#spin-progress").css("display", "block");
                        }
                        if (percent_loaded < 100) {
                            $("#btnSaveDocument").prop("disabled", true);
                        }
                        $("#progress-text1").text(
                            percent_loaded + "% File Upload Thành Công.."
                        );
                        // $('#progress-text2').text(percent_loaded+'% has been uploaded..');
                        $("#progress").css("width", percent_loaded + "%");
                        if (e.lengthComputable) {
                            $("progress").attr({
                                value: e.loaded,
                                max: e.total,
                            });
                        }
                    },
                    false
                );
            }
            return myXhr;
        },
        url: "/api/admin/upload/document",
        type: "POST",
        headers: {Authorization: "Bearer " + localStorage.getItem("eln_token")},
        enctype: "multipart/form-data",
        data: formData,
        processData: false, // Important!
        contentType: false,
        cache: false,
        beforeSend: function () {
            //  $('.loader').css("display","block");
        },
        success: function (result) {
            $("#spin-progress").css("display", "none");
            $("#btnSaveDocument").prop("disabled", false);
            console.log(result);
            $("#linkFile").val("/e-learning/admin/download/document?name=" + result);
            $("#file-input").val(result);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#alert").css("display", "block");
            $("#btnSaveDocument").prop("disabled", false);
            $("#spin-progress").css("display", "none");
            // $('#alert').css("display","block");
            console.log("The following error occured: " + textStatus, errorThrown);
        },
    });
});