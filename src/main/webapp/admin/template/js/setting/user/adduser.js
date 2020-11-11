
$('#add-user-form').on('submit',function (e) {
    var formdata = $(this).serializeArray();
    var data = {};
    // console.log(formdata);
    $.each(formdata,function (i,v) {
        if(v.name=="poscodeId"){
            if( $('#pcode').attr('id_unit')!=''){
                data[v['name']] = $('#pcode').attr('id_unit');
            }
        }else{
            data[v['name']] = v['value'];
        }

    })
    data['status'] = "1";
    // console.log(data);
    // if(data["confirm-password"] == data["password"]) {
        $.ajax({
            url : '/api/admin/user',
            type : 'POST',
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            contentType : 'application/json',
            data : JSON.stringify(data),
            dataType : 'json',
            beforeSend:function() {
                $('.spin').removeClass('display-none');
            },
            success : function(result) {
                // console.log(result);
                window.location.href = "/admin/setting/user";
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log( 'The following error occured: ' + textStatus, errorThrown );
                $('.spin').addClass('display-none');
                alert('Đã có lỗi xảy ra');
            }
        });
    // }
    // else {
    //     alert("mật khẩu và xác nhận mật khẩu không giống nhau");
    // }

    e.preventDefault();
})
$('#provine').change(function () {
    changeProvince($(this).val(),"","");

});
function changeProvince(id,districtId,communeId) {
    if(id != '') {
        $.ajax({
            url : '/api/admin/district?provine-id='+id,
            type : 'GET',
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            contentType : 'application/json',
            // data : JSON.stringify($(this).val()),
            dataType : 'json',
            beforeSend:function() {
                $('.spin').removeClass('display-none');
            },
            success : function(result) {
                // console.log(result);
                var str = '';
                $.each(result, function (i,v) {
                    if (v['id'] == districtId) {
                        str += '<option selected="selected" value="'+v['id']+'">'+v['name']+'</option>';
                    }else {
                        str += '<option value="'+v['id']+'">'+v['name']+'</option>';
                    }

                });
                if (districtId == "") {
                    updateWard(result[0]['id'],communeId)
                }
                else {
                    updateWard(districtId,communeId)
                }
                $('#district').html(str);
                // console.log(result[0]['id']);

                $('.spin').addClass('display-none');
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log( 'The following error occured: ' + textStatus, errorThrown );
                $('.spin').addClass('display-none');
                alert('Đã có lỗi xảy ra');
            }
        });
    }
}
$('#district').on('change',function () {
    updateWard($(this).val(),"");
})
function updateWard(districtId,communeId) {
    if (districtId != '') {
        $.ajax({
            url: '/api/admin/ward?district-id=' + districtId,
            type: 'GET',
            contentType: 'application/json',
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            // data : JSON.stringify($(this).val()),
            dataType: 'json',
            beforeSend:function() {
                $('.spin').removeClass('display-none');
            },
            success: function (result) {
                // console.log(result);
                var str = '';
                $.each(result, function (i, v) {
                    if (communeId == v['id']) {
                        str += '<option selected="selected" value="' + v['id'] + '">' + v['name'] + '</option>';
                    }
                    else {
                        str += '<option value="' + v['id'] + '">' + v['name'] + '</option>';
                    }
                });
                $('#ward').html(str);
                $('.spin').addClass('display-none');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('The following error occured: ' + textStatus, errorThrown);
                $('.spin').addClass('display-none');
                alert('Đã có lỗi xảy ra');
            }
        });
    }
}

$('#thumb-input').on('change',function () {
    var formData = new FormData();
    // console.log();
    if ($('#thumb-input')[0].files[0]) {
        formData.append('image', $('#thumb-input')[0].files[0]);
        $.ajax({
            url : '/api/admin/user/image',
            type : 'POST',
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            enctype: 'multipart/form-data',
            data : formData,
            processData: false,  // Important!
            contentType: false,
            cache: false,
            beforeSend:function() {
                $('.spin').removeClass('display-none');
            },
            success : function(result) {
                // console.log(result);
                console.log(result);
                $('#thumb-img').attr("src",result);
                $('#thumb-img-src').val(result);
                $('.spin').addClass('display-none');
                $('#delete-thumb').removeClass("display-none");
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log( 'The following error occured: ' + textStatus, errorThrown );
                $('.spin').addClass('display-none');
                $('#delete-thumb').addClass("display-none");
                alert('Đã có lỗi xảy ra');
            }
        });
    }
    else {
        $('#delete-thumb').addClass("display-none");
        $('#thumb-img').attr("src","");
        $('#thumb-img-src').val("");
        $('.spin').addClass('display-none');
    }

});
$('#delete-thumb').on('click',function () {
    $('#thumb-input').val("");
    $('#thumb-img').attr("src","");
    $('#thumb-img-src').val("");
    $('.spin').addClass('display-none');
    $('#delete-thumb').addClass("display-none");
})
function getCurId() {
    var vars = document.createElement('a');
    // var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    //     vars[key] = value;
    // });
    vars.href = window.location.href;
    var id = vars.pathname.replace("/admin/setting/user/edit","").replace("/","");
    return id;
}
function mappingResult(result) {
    if (result.id) $('input[name=id]').val(result.id);
    if (result.username) $('input[name=username]').val(result.username);
    if (result.email) $('input[name=email]').val(result.email);
    if (result.fullName)  $('input[name=fullName]').val(result.fullName);
    // console.log($('select[name=gender] option[value='+result.gender+']').text());
    if (result.gender == 0 || result.gender) $('select[name=gender] option[value='+result.gender+']').attr("selected","selected");
    if (result.phoneNumber) $('input[name=phoneNumber]').val(result.phoneNumber);
    if (result.birthDateFomatted) $('input[name=birthday]').val(result.birthDateFomatted);
    if (result.poscodeVnpost) $('#name_unit_form').html(result.poscodeVnpost.name);
    if (result.poscodeVnpost.unitCode!=null) $('#pcode').val(result.poscodeVnpost.unitCode);
    if (result.imageUsers) {
        $('#thumb-img').attr("src",result.imageUsers);
        $("#thumb-img-src").val(result.imageUsers);
    }
    if (result.provinceId) {
        if (!result.districtId) {
            result.districtId = "";
        }
        if (!result.idCommuneVnpost) {
            result.idCommuneVnpost = "";
        }
        $('#provine option[value='+result.provinceId+']').attr('selected','selected');
        changeProvince(result.provinceId,result.districtId,result.idCommuneVnpost);
    }
    if (result.place) $('input[name=place]').val(result.place);
    $('input[name=username]').addClass("disabled");
}
function init() {
    $.ajax({
        url: '/api/admin/province',
        type: 'GET',
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        contentType: 'application/json',
        dataType: 'json',
        beforeSend:function() {
            $('.spin').removeClass('display-none');
        },
        success: function (result) {
            // console.log(result);
            // mappingResult(result);
            var str = "";
            result.forEach(function (v,i) {
                str += "<option value='"+v.id+"'>" +
                    v.description +
                    "</option>";
            });
            $('#provine').append(str);
            $('.spin').addClass('display-none');
            initCallback();
        },
        error: function (error) {
            console.log(error);
            $('.spin').addClass('display-none');
            alert('Đã có lỗi xảy ra');
            if (error.status < 300) {
                // location.reload(true);
            }
        }
    });
}
function initCallback() {
    var id = getCurId();
    if (id != ''){
        $('input[name=password]').attr("disabled",true);
        $('input[name=confirm-password]').attr("disabled",true);
        $.ajax({
            url: '/api/admin/user/'+id,
            type: 'GET',
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            contentType: 'application/json',
            dataType: 'json',
            beforeSend:function() {
                $('.spin').removeClass('display-none');
            },
            success: function (result) {
                console.log(result);
                mappingResult(result);
                $('.for-create').css("display","none");
                $('.spin').addClass('display-none');
            },
            error: function (error) {
                console.log(error);
                $('.spin').addClass('display-none');
                alert('Đã có lỗi xảy ra');
                if (error.status < 300) {
                    // location.reload(true);
                }
            }
        });
    }
}
init();