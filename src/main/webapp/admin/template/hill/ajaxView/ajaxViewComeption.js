function showCometionCategorys(id) {
    $.ajax({
        url: '/api/admin/competitionCategory/all',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            var row = '<option value=""   selected>--Danh mục--</option>'
            $(res).each(function (index, item) {

                row += '<option value="' + item.id + '">' + item.nameCompetition + '</option>'
            });
            $('#' + id).html(row);
        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}



function showCometionCategorysByStatus(id) {
    $.ajax({
        url: '/api/admin/competitionCategory/statusOn',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            var row = '<option value=""   selected>--Danh mục--</option>'
            $(res).each(function (index, item) {

                row += '<option value="' + item.id + '">' + item.nameCompetition + '</option>'
            });
            $('#' + id).html(row);
        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}



function showUnitParent() {
    $.ajax({
        url: '/api/admin/treeunit/parent',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '';
            $(res).each(function (index, item) {
                row += '<li>'
                row += '<span  code_unit=' + item.unitCode + ' id="id_pers_root_' + item.id + '" id_pers_root="' + item.id + '" onclick="showChildRootCompetition(this)" class="carett">&nbsp;<i class="far fa-building text-success"></i>&nbsp;' + item.name + '</span>'
                row += '<ul id="detail_item_' + item.id + '" class="nested">'
                row += '</ul>'
                row += '</li>'
            });
            $('.showlistUnit').html(row);

        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}

function showChildRootCompetition(btn) {

    var idPerRoot = $(btn).attr('id_pers_root');
    var name_poscode = $(btn).text();
    var codeUnit = $(btn).attr('code_unit')=='null'?'':$(btn).attr('code_unit');

    $.ajax({
        url: '/api/admin/treeunit/' + idPerRoot + '/childRound',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '';
            if (res != null) {
                $(res).each(function (index, items) {
                    row += '<li>'
                    if(items.status ==1){
                        row += '<span  code_unit="' + items.unitCode + '"  id_pers_root=' + items.id + '  id="id_pers_root_' + items.id + '"   onclick="showChildRootCompetition(this)"  class="carett"><i class="fas fa-home text-warning"></i>&nbsp;' + items.name + '</span>'
                    }else{
                        row += '<span  code_unit=' + items.unitCode + ' id_pers_root=' + items.id + '  id="id_pers_root_' + items.id + '"   onclick="showChildRootCompetition(this)" style="cursor: pointer"><i class="far fa-dot-circle"></i>&nbsp;<i class="fas fa-campground  text-warning"></i></i>&nbsp;' + items.name + '</span>'
                    }
                    row += '<ul id="detail_item_' + items.id + '" class="nested">'
                    row += '</ul>'
                    row += '</ul>'
                    row += '</li>'
                });
            }
            $('#detail_item_' + idPerRoot).html(row);
            if($(btn).hasClass('carett-down')){$(btn).removeClass('carett-down')}
            else{$(btn).addClass('carett-down')}
            if(checkUnitCode(codeUnit,idPerRoot)) {showPoscodeRoot(idPerRoot,name_poscode,codeUnit)};
            checkRoot(idPerRoot);
            $(btn).removeAttr("onclick");
            $(btn).attr('onclick', 'OnOffRoot2(this);');
        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}


function setValueCompetition() {
    var id = $('#id_competition').val();
    if (id != '') {
        $.ajax({
            url: '/api/admin/competition/edit/' + id,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            beforeSend: function () {
                $('.loader').css("display", "block");
                //$('.loader').css("background")
            },
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                $('.loader').css("display", "none");
                var row = '';
                $('#input_name_competition').val(res[0].nameCompetition);
                $('#input_id_competition').val(res[0].id);
                if (res[0].statusCompetition == 0) {
                    $("#select_status_competition").val('0');
                } else {
                    $("#select_status_competition").val('1');
                }
                if (res[0].checkcourseware == 0) {
                    $("#select_status_courseware").val('0');
                    $('.from_time_exam').css('display','flex')
                } else {
                    $("#select_status_courseware").val('1');
                    $('.from_time_exam').css('display','none');
                    $('#input_time_start2').val('');
                    $('#input_time_end2').val('');
                }




                $('#name_cate_show').text(res[0].competitionCategory.nameCompetition);
                $('#name_cate').attr('id_cate',res[0].competitionCategory.id);

                if (res[0].poscodeVnpost != null) {
                    $('#name_unit_form').text(res[0].poscodeVnpost.name);
                    $('#text_box_name_unit_competion').attr('id_unit', res[0].poscodeVnpost.id);
                    $('#text_box_name_unit_competion').val(res[0].poscodeVnpost.unitCode);
                    $('#name_unit').attr('id_unit', res[0].poscodeVnpost.id);
                } else {
                    $('#name_unit_form').text('Tổng công ty');
                    $('#text_box_name_unit_competion').attr('id_unit', "");
                    $('#text_box_name_unit_competion').val('');
                    $('#name_unit').attr('id_unit', '');
                }

                if (res[0].timeStart == null) {
                    $("#customRadio1").prop("checked", true);
                } else {
                    $("#customRadio2").prop("checked", true);
                    $('.input_time').css('display','block');
                    var time_start = new Date(res[0].timeStart);
                    var time_end = new Date(res[0].timeEnd);

                    var time_start = new Date(res[0].timeStart);
                        var time_end = new Date(res[0].timeEnd);
                       /* console.log(res[0]);
                        console.log(time_start);
                        console.log(time_end);
                        console.log("----------");
                        console.log(res[0].timeStart);
                        console.log(res[0].timeEnd);
                        console.log("----------");
                        console.log(time_start.toJSON().slice(0, 19));
                        console.log(time_end.toJSON().slice(0, 19));*/


                    $('#input_time_start2').val(time_start.toJSON(0,9).slice(0, 10)+"T"+time_start.toTimeString().slice(0, 8));
                    $('#input_time_end2').val(time_end.toJSON(0,9).slice(0, 10)+"T"+time_end.toTimeString().slice(0, 8));
                }

                if (res[0].highlight == 0) {
                    $("#customRadio3").prop("checked", true);
                } else {
                    $("#customRadio4").prop("checked", true);
                }
                $('#imgpreview').attr('src',res[0].imageCompetition);
                $('#xImagePath').val(res[0].imageCompetition);
                CKEDITOR
                    .replace(
                        'content',
                        {
                            filebrowserBrowseUrl : 'ckfinder/ckfinder.html',
                            filebrowserImageBrowseUrl : 'ckfinder/ckfinder.html?type=Images',
                            filebrowserFlashBrowseUrl : 'ckfinder/ckfinder.html?type=Flash',
                            filebrowserUploadUrl : 'ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                            filebrowserImageUploadUrl : 'ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                            filebrowserFlashUploadUrl : 'ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash'
                        });
                CKEDITOR.instances.content.setData(res[0].describe);
                 console.log(res[0].imageCompetition);
                showRoundTest(id);
            },
            error: function (res) {
                console.log(res);
                alert(console.log(res));
            }
        });
    }
}

function showListUnitCompetion(id) {
    var id = $('#id_competition').val();
    if (id != '') {
        $.ajax({
            url: '/api/admin/poscom/list/' + id,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            type: 'POST',
            dataType: 'json',
            success: function (res) {
                var row = '';
                $(res).each(function (index, item) {
                    var unitCode =item.poscodeVnpost.unitCode==null?'':item.poscodeVnpost.unitCode;
                    var i = parseInt(index) + 1;
                    row += ' <label id="label' + i + '"  class="col-sm-2 col-form-label label-normal"></label>'
                    row += '<div class="col-sm-7" id="rowUnit' + i + '">'
                    row += '<div class="dropdown" style="width: 100%">'
                    row += '<div class="form_unit">'
                    row += '<input name="idPoscodeCompetition[]"  index="' + i + '"  type="text" id_unit="' + item.poscodeVnpost.id + '" value="' + unitCode + '" class="form-control class_box_id_unit" onkeyup="getNamePoscodeById(this)" id="text_box_name_unit_competion' + i + '" placeholder="Mã đơn vị">'
                    row += '<input  type="hidden" id_unit="' + item.poscodeVnpost.id + '" name="email" class="form-control class_name_unit" id="name_unit' + i + '" placeholder="">'
                    row += '<span id="name_unit">Đơn vị:<span class="class_name_unit_form" id="name_unit_form' + i + '">' + item.poscodeVnpost.name + '<span></span></span></span>'
                    row += '</div>'
                    row += '<div class="dropdown-content showlistUnit' + i + '" style="width: 625px;">'
                    row += '</div>'
                    row += '</div>'
                    row += '</div>'
                    row += '<div class="col-sm-2 class_remove' + i + '">'
                    row += '<button id="' + i + '"  type="button" class=" btn_small_40 btn btn-block btn-outline-danger btn-sm remove_unit_competition" title="Xóa"><i class="fas fa-remove"></i></button>'
                    row += '</div>'
                    showUnitParentByid("showlistUnit" + i, i);
                });
                $('#list_unit_competion').append(row);
            },
            error: function (res) {
                console.log(res);
                alert(console.log(res));
            }
        });
    }
}



