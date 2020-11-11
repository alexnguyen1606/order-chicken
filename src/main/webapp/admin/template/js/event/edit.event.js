var category = '';
var count = 0;
jQuery(function ($) {
    $(document).ready(function () {
        function getEvent() {
            var id = $('#id').val();
            console.log(id);
            if (id != null && id != "") {
                $.ajax({
                        type: "GET",
                        url: "/api/admin/events/" + id,
                        contentType: "application/json",
                        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                        beforeSend: function () {
                            $('.loader').css("display", "block");
                        },
                        success: function (response) {
                            $('#title').val(response.title);
                            var status = '';
                            if (response.status == 0) {
                                status += '<option value="0" selected>Nháp</option>';
                                status += '<option value="1" >Hoạt động</option>'
                            } else {
                                status += '<option value="0" >Nháp</option>';
                                status += '<option value="1" selected>Hoạt động</option>'
                            }
                            ;
                            $('#status').empty();
                            $('#status').append(status);

                            var type = '';
                            if (response.type == 0) {
                                type += '<option value="0" selected>Nội bộ</option>';
                                type += '<option value="1" >Hoạt động</option>'
                            } else {
                                type += '<option value="0" >Nội Bộ</option>';
                                type += '<option value="1" selected>Bên ngoài</option>'
                            }
                            ;
                            $('#type').empty();
                            $('#type').append(type);
                            var highlinghtEvent = '';
                            if (response.highlinghtEvent == 0) {
                                highlinghtEvent += '<option value="0" selected>Không</option>';
                                highlinghtEvent += '<option value="1" >Có</option>'
                            } else {
                                highlinghtEvent += '<option value="0" >Không</option>';
                                highlinghtEvent += '<option value="1" selected>Có</option>'
                            }
                            ;
                            $('#highlinghtEvent').empty();
                            $('#highlinghtEvent').append(highlinghtEvent);
                            category = response.idCategory;
                            getCategoryEvent();

                            $('#timeStart').val(response.timeStart);
                            $('#timeEnd').val(response.timeEnd);
                            $('#tomtat').val(response.tomtat);
                            $('#content').text(response.content);
                            $('#thumb-img-src').val(response.image);
                            $('#avatar').val(response.image);
                            $('#thumb-img').attr("src", response.image);

                            $('.loader').css("display", "none");
                            CKEDITOR.replace('content', {
                                filebrowserBrowseUrl: '/admin/ckfinder/ckfinder.html',
                                filebrowserImageBrowseUrl: '/admin/ckfinder/ckfinder.html?type=Images',
                                filebrowserFlashBrowseUrl: '/admin/ckfinder/ckfinder.html?type=Flash',
                                filebrowserUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                                filebrowserImageUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                                filebrowserFlashUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash'
                            });
                        }
                    }
                )
            } else {
                getCategoryEvent();
                CKEDITOR.replace('content', {
                    filebrowserBrowseUrl: '/admin/ckfinder/ckfinder.html',
                    filebrowserImageBrowseUrl: '/admin/ckfinder/ckfinder.html?type=Images',
                    filebrowserFlashBrowseUrl: '/admin/ckfinder/ckfinder.html?type=Flash',
                    filebrowserUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                    filebrowserImageUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                    filebrowserFlashUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash'
                });
            }


        };

        function getCategoryEvent() {
            $.ajax({
                type: "GET",
                url: "/api/admin/event-category/parent",
                contentType: "application/json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                success: function (response) {
                    response = response.data;
                    var row = '';
                    $.each(response, function (i, item) {
                        row += '<option value="' + item.id + '"> ' + item.nameDetail + '</option>';
                        if (item.listChild.length > 0) {
                            row += showListChild2(item.listChild);
                        }
                    });
                    $('#idCategory').append(row);
                    if (category != "") {
                        $('#idCategory').val(category);
                    }
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
                        prefix = "&emsp; &emsp; &emsp; &emsp--"
                    }
                    row += '<option value="' + item.id + '">'+prefix + item.nameDetail + '</option>';
                    if (item.listChild.length > 0) {
                        row += showListChild2(item.listChild);
                    }else {
                        count--;
                    }
                }
            );
            return row;
        }

        getEvent();
    })
})
$('#btnEditNews').click(function () {
    var data = {};
    var formData = $('#formEdit').serializeArray();

    $.each(formData, function (i, v) {
        data[v.name] = v.value;
    })
    data['tomtat'] = $('#tomtat').val();
    data['content'] = CKEDITOR.instances.content.getData();
    if (data.title == "") {
        alert("Tiêu đề sự không được bỏ trống");
        $('#content').focus();
        throw "Content not be null";
    }
    if (data.timeStart == "" || data.timeStart == null) {
        alert("Thời gian bắt đầu sự kiện không hợp lệ");
        $('#timeStart').focus();
        throw "timeStart not be null";
    }
    if (data.timeEnd == "" || data.timeEnd == null) {
        alert("Thời gian kết thúc sự kiện không hợp lệ");
        $('#timeEnd').focus();
        throw "timeENd not be null";
    }
    if (data.timeEnd < data.timeStart) {
        alert("Thời gian sự kiện không hợp lệ");
        $('#timeStart').focus();
        throw "Time is invalide";
    }

    if (data.content == "") {
        alert("Nội dung không được bỏ trống");
        $('#content').focus();
        throw "Content not be null";
    }
    if (data.content.length <= 50) {
        alert("Nội dung không được ngắn hơn 50 ký tự");
        $('#content').focus();
        throw "Content not be null";
    }
    console.log(data);
    if (data.id == "") {
        save(data);
    } else {
        update(data);
    }
});

function save(data) {
    $.ajax({
        type: "POST",
        url: "/api/admin/events",
        data: JSON.stringify(data),
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            alert(response.message);
            console.log(response);
            window.location.href = "/admin/events/list";
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
        url: "/api/admin/events",
        data: JSON.stringify(data),
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            alert(response.message);
            window.location.href = "/admin/events/list";
        },
        error: function (response) {
            alert(response.responseJSON.message);
            $('.loader').css("display", "none");
            console.log(response);
        }
    });
}

$('#thumb-input').on('change', function () {
    var formData = new FormData();
    formData.append('multipartFile', $('#thumb-input')[0].files[0]);
    console.log(formData);
    $.ajax({
        url: '/api/admin/upload/images',
        type: 'POST',
        enctype: 'multipart/form-data',
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        data: formData,
        processData: false,  // Important!
        contentType: false,
        cache: false,
        beforeSend: function () {
            $('#loader').css("display", "block");
        },
        success: function (result) {
            // console.log(result);
            console.log(result);
            $('#thumb-img').attr("src", result);
            $('#thumb-img-src').val(result);
            $('#avatar').val(result);
            $('#loader').css("display", "none");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#loader').css("display", "none");
            console.log('The following error occured: ' + textStatus, errorThrown);
        }
    });
});

function setMinTimeEnd(e) {
    $('#timeEnd').attr("min", e.value)
}

function setMaxTimeStart(e) {
    $('#timeStart').attr('max', e.value);
}