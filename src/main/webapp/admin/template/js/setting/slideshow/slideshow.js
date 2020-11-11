var oldId = [];
$('#create .image-input').on('change',function () {
    var formData = new FormData();
    formData.append('image', $(this)[0].files[0]);
    console.log("test")
    $.ajax({
        url : '/api/admin/user/image',
        type : 'POST',
        enctype: 'multipart/form-data',
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        data : formData,
        processData: false,  // Important!
        contentType: false,
        cache: false,
        success : function(result) {
            // console.log(result);
            // console.log(result);
            var strImage = '<div class="position-relative max-width-100 " style="width:fit-content"><img src="'+result+'" class="max-width-100 mt-2"><a class="position-absolute btn btn-default btn-small btn-circle removeImg" style="top:10px;right:10px"><i class="fas fa-times"></i></a></div>';
            var strInput = "<input type='hidden' name='imageUrl' value='"+result+"'>";
            var strTitleinput = '<input name="title" class="form-control my-1" placeholder="title" data-for="'+result+'">';
            var strDescription = '<textarea class="form-control my-1" data-for="'+result+'" name="description" placeholder="mô tả"></textarea>';
            var strPosition = '<select class="form-control" data-for="'+result+'" name="position">' +
                '<option value="left">' +
                'Trái' +
                '</option>' +
                '<option value="right">' +
                'Phải' +
                '</option>'+
                '</select>';
            $('#create #show-image-container').append(strImage);
            $('#create #show-image-container').append(strTitleinput);
            $('#create #show-image-container').append(strDescription);
            $('#create #show-image-container').append('Vị trí:'+strPosition);
            $('#create #image-input-container').append(strInput);
        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log( 'The following error occured: ' + textStatus, errorThrown );
        }
    });
});
$('#update .image-input').on('change',function () {
    var formData = new FormData();
    formData.append('image', $(this)[0].files[0]);
    console.log("test")
    $.ajax({
        url : '/api/admin/user/image',
        type : 'POST',
        enctype: 'multipart/form-data',
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        data : formData,
        processData: false,  // Important!
        contentType: false,
        cache: false,
        success : function(result) {
            // console.log(result);
            // console.log(result);
            var strImage = '<div class="position-relative max-width-100 " style="width:fit-content"><img src="'+result+'" class="max-width-100 mt-2"><a class="position-absolute btn-default btn btn-small btn-circle removeImg" style="top:10px;right:10px"><i class="fas fa-times"></i></a></div>';
            var strInput = "<input type='hidden' data-id='' name='imageUrl' value='"+result+"'>";
            var strTitleinput = '<input name="title" class="form-control my-1" name="title" placeholder="title" data-for="'+result+'">';
            var strDescription = '<textarea class="form-control my-1" data-for="'+result+'" name="description" placeholder="mô tả"></textarea>';
            var strPosition = '<select class="form-control" name="position" data-for="'+result+'">' +
                '<option value="left">' +
                'Trái' +
                '</option>' +
                '<option value="right">' +
                'Phải' +
                '</option>'+
                '</select>';
            $('#update #show-image-container').append(strImage);
            $('#update #show-image-container').append(strTitleinput);
            $('#update #show-image-container').append(strDescription);
            $('#update #show-image-container').append('Vị trí:'+strPosition);
            $('#update #image-input-container').append(strInput);
        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log( 'The following error occured: ' + textStatus, errorThrown );
        }
    });
});
$("#submit-add").click(function () {
    var data = {};
    data['code'] = $("#slideShowCode").val();

    var slideShows = [];

    $.each($('#create input[name=imageUrl]'),function (i,v) {
        var slideShow = {};
        slideShow['urlImage'] = $(this).val();
        slideShow['title'] = $('input[name=title][data-for="'+$(this).val()+'"]').val();
        slideShow['description'] = $('textarea[name=description][data-for="'+$(this).val()+'"]').val();
        slideShow['position'] = $('select[name=position][data-for="'+$(this).val()+'"] option:selected').val();
        slideShows.push(slideShow);
    })
    data['slideShows'] = slideShows;
    if (data['code'] == "") {
        alert("Cần nhập mã SlideShow");
    }
    else {
        $.ajax({
            url : '/api/admin/slideshow',
            type : 'POST',
            contentType : 'application/json',
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            data : JSON.stringify(data),
            dataType : 'json',
            beforeSend:function() {
                $('.spin').removeClass('display-none');
            },
            success : function(result) {
                // console.log(result);
                location.reload(true);
            },
            error : function(jqXHR, textStatus, errorThrown) {
                $('.spin').addClass('display-none');
                alert('Đã có lỗi xảy ra');
                console.log( 'The following error occured: ' + textStatus, errorThrown );
            }
        });
    }

})
$(document).on('click','.toggle-tab', function (e) {
    e.preventDefault();
    $('.tab-pane').removeClass("active");
    $('.tab-pane').removeClass("show");
    var id = $(this).attr('href');
    $(id).addClass("active");
    if ($('#update').hasClass('active')) {
        $("#update #slideShowCode").val($(this).attr('data-id'));
        $('#update #show-image-container').empty();
        $('#update #image-input-container').empty();
        $.ajax({
            url : '/api/admin/slideshow?code='+$(this).attr('data-id'),
            type : 'GET',
            contentType : 'application/json',
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            // data : JSON.stringify(data),
            dataType : 'json',
            beforeSend:function() {
                $('.spin').removeClass('display-none');
            },
            success : function(result) {
                console.log(result);
                oldId = [];
                // location.reload(true);e
                $.each(result,function (i,v) {
                    var strImage = '<div class="position-relative max-width-100 " style="width:fit-content"><img src="'+v.urlImage+'" class="max-width-100 mt-2"><a class="position-absolute btn btn-default btn-small btn-circle removeImg" style="top:10px;right:10px"><i class="fas fa-times"></i></a></div>';
                    var strInput = "<input type='hidden' data-id='"+v.id+"' name='imageUrl' value='"+v.urlImage+"'>";
                    if (v.title != null) {
                        var strTitleinput = '<input name="title" class="form-control my-1" placeholder="title" data-for="'+v.urlImage+'" value="'+v.title+'">';
                    }
                    else {
                        var strTitleinput = '<input name="title" class="form-control my-1" placeholder="title" data-for="'+v.urlImage+'" value="">';
                    }
                    if (v.description != null) {
                        var strDescription = '<textarea class="form-control my-1" data-for="'+v.urlImage+'" name="description" placeholder="mô tả" value="'+v.description+'">'+v.description+'</textarea>';
                    }
                    else {
                        var strDescription = '<textarea class="form-control my-1" data-for="'+v.urlImage+'" name="description" placeholder="mô tả"></textarea>';
                    }
                    var strPosition = '<select class="form-control" name="position" data-for="'+v.urlImage+'">';
                    strPosition += '<option value="left" ';
                    if (v.position == 'left') {
                        strPosition += 'selected="selected"';
                    }
                    strPosition +=  '>Trái</option>';
                    strPosition += '<option value="right" ';
                    if (v.position == 'right') {
                        strPosition += 'selected="selected"';
                    }
                    strPosition +=  '>Phải</option>';
                    strPosition +=   '</select>';
                    $('#update #show-image-container').append(strImage);
                    $('#update #show-image-container').append(strTitleinput);
                    $('#update #show-image-container').append(strDescription);
                    $('#update #show-image-container').append(strPosition);
                    $('#update #image-input-container').append(strInput);
                    oldId.push(v.id);
                })
                $('.spin').addClass('display-none');
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log( 'The following error occured: ' + textStatus, errorThrown );
                $('.spin').addClass('display-none');
                alert('Đã có lỗi xảy ra');
            }
        });
    }
    $(id).delay(300).queue(function (next) {

        $(id).addClass("show");
        next();
    });

});
$('#submit-change').click(function () {
    var data = {};
    var slideShows = [];

    var newIds = [];
    $.each($('#update input[name=imageUrl]'),function (i,v) {
        var item = {};
        item['id'] = v.getAttribute('data-id');
        item["urlImage"] = v.value;
        item['code'] = $('#update #slideShowCode').val();
        item['title'] = $('input[name=title][data-for="'+$(this).val()+'"]').val();
        item['description'] = $('textarea[name=description][data-for="'+$(this).val()+'"]').val();
        item['position'] = $('select[name=position][data-for="'+$(this).val()+'"] option:selected').val();
        newIds.push(v.getAttribute('data-id'));
        slideShows.push(item);
        // console.log(item);
    });
    data["slideShows"] = slideShows;
    data['oldIds'] = oldId;
    data['newIds'] = newIds;
    // console.log(data);
    $.ajax({
        url : '/api/admin/slideshow',
        type : 'PUT',
        contentType : 'application/json',
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        data : JSON.stringify(data),
        dataType : 'json',
        beforeSend:function() {
            $('.spin').removeClass('display-none');
        },
        success : function(result) {
            // console.log(result);
            location.reload(true);
        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log( 'The following error occured: ' + textStatus, errorThrown );
            $('.spin').addClass('display-none');
            alert('Đã có lỗi xảy ra');
        }
    });
})
jQuery(function ($) {
    $(document).ready(function () {
        $(document).on('click','.removeImg',function () {
            var src = $(this).closest("div").find("img").attr("src");
            $(this).closest("div").find("img").remove();
            $('input[value="'+src+'"]').remove();
            $('input[name=title][data-for="'+src+'"]').remove();
            $('textarea[name=description][data-for="'+src+'"]').remove();
            $('select[name=position][data-for="'+src+'"]').remove();
            console.log(src);
        });
        $('.delete-slide').click(function () {
            if(confirm("Xác nhận xóa Slide")){
                var data = {};
                var codes = [];
                $.each($('input[name=code]:checked'),function (i,v) {
                    codes.push(v.value);
                })
                data['codes'] = codes;
                $.ajax({
                    url : '/api/admin/slideshow',
                    type : 'DELETE',
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType : 'application/json',
                    data : JSON.stringify(data),
                    dataType : 'json',
                    beforeSend:function() {
                        $('.spin').removeClass('display-none');
                    },
                    success : function(result) {
                        // console.log(result);
                        alert("Xóa thành công")
                        location.reload(true);
                    },
                    error : function(jqXHR, textStatus, errorThrown) {
                        console.log( 'The following error occured: ' + textStatus, errorThrown );
                        $('.spin').addClass('display-none');
                        alert('Đã có lỗi xảy ra');
                    }
                });
            }

        })
        function init() {
            var slideTable = $("#slideshow-table").DataTable({
                "ordering": false,
                "language": {
                    "decimal":        "",
                    "emptyTable":     "Không có dữ liệu",
                    "info":           "Hiện từ _START_ đến _END_ của _TOTAL_ dữ liệu",
                    "infoEmpty":      "Hiện từ 0 đến 0 của 0 dữ liệu",
                    "infoFiltered":   "(Lọc từ _MAX_ trong tổng số dữ liệu)",
                    "infoPostFix":    "",
                    "thousands":      ",",
                    "lengthMenu":     "Hiện _MENU_ dữ liệu",
                    "loadingRecords": "Đang tải...",
                    "processing":     "Đang xử lý...",
                    "search":         "Tìm kiếm:",
                    "zeroRecords":    "Không có dữ liệu phù hợp",
                    "paginate": {
                        "first":      "Đầu tiên",
                        "last":       "Cuối cùng",
                        "next":       "Tiếp",
                        "previous":   "Trước"
                    },
                    "aria": {
                        "sortAscending":  ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    }
                }
            });
            $.ajax({
                url : '/api/admin/slideshow/code',
                type : 'GET',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType : 'application/json',
                dataType : 'json',
                beforeSend:function() {
                    $('.spin').removeClass('display-none');
                },
                success : function(result) {


                    result.forEach(function (v,i) {
                        var code ='';
                        if (v == "HOME" || v == 'MOBILE') {
                            code += v + '<i class="fas fa-check ml-3"></i>';
                        }
                        else {
                            code = v + '<i class="fas fa-times ml-3"></i>';
                        }
                        slideTable.row.add(['<input type="checkbox" value="'+v+'" name="code">',code,'<a class="btn btn-small btn-primary edit-slide toggle-tab" data-id="'+v+'" href="#update" style="color: #fff">\n' +
                        '                                                <i class="far fa-edit"></i></a>'])
                            .draw()
                            .node();
                    })

                    $('.spin').addClass('display-none');
                },
                error : function(error) {
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
    })
})

