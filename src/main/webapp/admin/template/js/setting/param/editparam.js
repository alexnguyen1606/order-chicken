$('select[name=typeName]').on('change',function () {
    var type = $(this).val();
    if (type == "TEXT") {
        var val = $('input[name=valueConfigurationn]').val();
        $('#value-container').empty();
        $('#value-container').html('<textarea  name="valueConfigurationn" class="form-control" value="'+val+'" id="valuearea">'+val+'</textarea>');
        CKEDITOR
            .replace(
                'valuearea',
                {
                    filebrowserBrowseUrl : 'ckfinder/ckfinder.html',
                    filebrowserImageBrowseUrl : 'ckfinder/ckfinder.html?type=Images',
                    filebrowserFlashBrowseUrl : 'ckfinder/ckfinder.html?type=Flash',
                    filebrowserUploadUrl : 'ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                    filebrowserImageUploadUrl : 'ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                    filebrowserFlashUploadUrl : 'ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash'
                });
    }
    else if (type != "TEXT") {
        var val = $('input[name=valueConfigurationn]').val();
        if (!val && $('#valuearea').length != 0) {
            val = CKEDITOR.instances.valuearea.getData();
        }
        $('#value-container').empty();
        $('#value-container').html('<input  type="text" name="valueConfigurationn" class="form-control" value="'+val+'">');
    }
});
if ($('#valuearea').length != 0) {
    CKEDITOR
        .replace(
            'valuearea',
            {
                filebrowserBrowseUrl : 'ckfinder/ckfinder.html',
                filebrowserImageBrowseUrl : 'ckfinder/ckfinder.html?type=Images',
                filebrowserFlashBrowseUrl : 'ckfinder/ckfinder.html?type=Flash',
                filebrowserUploadUrl : 'ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                filebrowserImageUploadUrl : 'ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                filebrowserFlashUploadUrl : 'ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash'
            });
}
if ($('#delete-param')) {
    $('#delete-param').click(function () {
        var id=  $('#id-param').val();

        $.ajax({
            type: "DELETE",
            url: "/api/admin/setting/param",
            data: JSON.stringify(id),
            dataType: "json",
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            contentType: "application/json",
            beforeSend:function() {
                $('.spin').removeClass('display-none');
            },
            success: function () {
                window.location.href = "/admin/setting/param";

            }, error: function (response) {
                if (response.status < 300) {
                    window.location.href = "/admin/setting/param";
                }
                console.log("fail");
                console.log(response);
                $('.spin').addClass('display-none');
                alert('Đã có lỗi xảy ra');

            }
        });
    })
}
$('#submit-edit-param').click(function (e) {
    var data = {},
        formData = $('#add-param').serializeArray();
    $.each(formData,function (item,v) {
        // console.log(v);
        data[v['name']] = v["value"];
    });
    if ($('#valuearea').length != 0) {
        data['valueConfigurationn'] = CKEDITOR.instances.valuearea.getData();
    }
    if (data['codeName'] == "" || data['valueConfigurationn'] == "") {
        alert("Thêm tham số không thành công!");
    }
    else {
        $.ajax({
            type: "POST",
            url: "/api/admin/setting/param",
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            beforeSend:function() {
                $('.spin').removeClass('display-none');
            },
            success: function (responesData) {
                alert("Thêm tham số thành công");
                window.location.href = "/admin/setting/param";

            }, error: function (response) {
                console.log("fail");
                console.log(response);
                $('.spin').addClass('display-none');
                alert('Đã có lỗi xảy ra');
            }
        });
    }
    // console.log(data);

    e.preventDefault();
})
function getCurId() {
    var vars = document.createElement('a');
    // var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    //     vars[key] = value;
    // });
    vars.href = window.location.href;
    var id = vars.pathname.replace("/admin/setting/param/edit","").replace("/","");
    return id;
}

function init() {
    var curId = getCurId();
    if (curId != ''){

        $.ajax({
            type: "GET",
            url: "/api/admin/setting/param/?id="+curId,
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            dataType: "json",
            contentType: "application/json",
            beforeSend:function() {
                $('.spin').removeClass('display-none');
            },
            success: function (responesData) {
                // window.location.href = "/admin/setting/param";
                console.log(responesData);
                $('select[name=typeName] option[value='+responesData.typeName+']').attr("selected","selected");
                $('input[name=codeName]').val(responesData.codeName);
                $('input[name=valueConfigurationn]').val(responesData.valueConfigurationn);
                $('select[name=statusConfigurationn] option[value='+responesData.statusConfigurationn+']').attr("selected","selected");
                $('#add-param').append('<input name="id" value="'+responesData.id+'" id="id-param" type="hidden">')
                $('.spin').addClass('display-none');
            }, error: function (response) {
                console.log("fail");
                console.log(response);
                $('.spin').addClass('display-none');
                alert('Đã có lỗi xảy ra');
            }
        });
    }
}
init();
