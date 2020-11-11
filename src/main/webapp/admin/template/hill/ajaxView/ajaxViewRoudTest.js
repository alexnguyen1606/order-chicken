function showViewRoundTest() {
    var id = $('#id_round_test').val();
    if (id != '') {
        $.ajax({
            url: '/api/admin/roundtest/' + id,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                $('.loader_roundtest').css("display", "block");
                //$('.loader').css("background")
            },
            success: function (res) {
                $('.loader_roundtest').css("display", "none");
                var count = '';
                $("#href_back_competition").attr('href','/admin/competition/edit/'+res.competition.id);
                $('#input_id_competion').val(res.competition.id);
                $('#input_name_round_test').val(res.nameRound);

                if (res.statusRound == 0) {
                    $("#text_status_round_test").val('0');
                } else {
                    $("#text_status_round_test").val('1');
                }
                $('#text_code_round_test').val(res.codeRoundTest);

                if(res.competition.checkcourseware==0){
                    if (res.timeEnd == null) {
                        $("#customRadio1").prop("checked", true);
                        $('.input_time').css('display', 'none');
                    } else {
                        $("#customRadio2").prop("checked", true);
                       var time_start = new Date(res.timeStart);
                        var time_end = new Date(res.timeEnd);
                        /*  console.log(res);
                         console.log(time_start);
                         console.log(time_end);
                         console.log("----------");
                         console.log(res.timeStart);
                         console.log(res.timeEnd);
                         console.log("----------");
                         console.log(time_start.toJSON().slice(0, 19));
                         console.log(time_end.toJSON().slice(0, 19));*/

                        $('#input_time_start3').val(time_start.toJSON(0,9).slice(0, 10)+"T"+time_start.toTimeString().slice(0, 8));
                        $('#input_time_end3').val(time_end.toJSON(0,9).slice(0, 10)+"T"+time_end.toTimeString().slice(0, 8));
                        $('.input_time').css('display', 'block');

                    }
                }else{
                    $('.form_time_round_test').css('display','none');
                    $('#input_time_start3').val("");
                    $('#input_time_end3').val("");

                    $('.form_config_test').css('display','none');
                    $('#show_list_candidate_confirm_id').css('display','none');
                }
                if(res.competition.timeEnd!=null){
                    var time_start = new Date(res.competition.timeStart);
                    var time_end = new Date(res.competition.timeEnd);


                    $('#input_time_end3').attr("max",time_end.toJSON(0,9).slice(0, 10)+"T"+time_end.toTimeString().slice(0, 8));
                    $('#input_time_start3').attr("min",time_start.toJSON(0,9).slice(0, 10)+"T"+time_start.toTimeString().slice(0, 8));
                }

               // if(res.timeRound){
                    $('#time_round_test_count').val(parseInt(res.timeRound) / 60);
              //  }

                if(res.autoCreateQuestion==0){
                    $("#rundomRound").prop( "checked", true);
                }else{
                    $("#rundomRound").prop( "checked", false);
                }

                if (res.sourceQuestion == 0) {
                    $('#select_question_source').val('0');

                } else if (res.sourceQuestion == 1) {
                    $('#select_question_source').val('1');
                    getTestByIdRoundTest(id);
                    $('#test_choose').css('display', 'block');
                    $('#test_kit_choose').css('display', 'block');
                }
             //   if(res.maxPoint){
                    $('#max_point_round_test').val(res.maxPoint);
                    $('#min_point_round_test').val(res.minPoint);
              //  }

                if (res.doAgain != null) {
                    if (res.doAgain == 1) {
                        $("#customRadio_work_1").prop("checked", true);
                    } else {
                        $("#customRadio_work_2").prop("checked", true);
                        $('#input_max_work_round').val(res.maxWork);
                        $('.label_max_work_round_test').css("display","block");
                    }
                }
                if (res.mixCompetition != null) {
                    if (res.mixCompetition.id == 1) {
                        $('#question_mix_1').prop("checked", true)
                    } else if (res.mixCompetition.id == 2) {
                        $('#question_mix_2').prop("checked", true)
                    } else if (res.mixCompetition.id == 3) {
                        $('#question_mix_3').prop("checked", true)
                    }
                }

                if (res.mixAnswer != null) {
                    if (res.mixAnswer == 0) {
                        $('#mix_answer_2').prop("checked", true)
                    } else if (res.mixAnswer == 1) {
                        $('#mix_answer_1').prop("checked", true)
                    }
                }
                if (res.mixAnswer != null) {
                    if (res.mixAnswer == 0) {
                        $('#mix_answer_2').prop("checked", true)
                    } else if (res.mixAnswer == 1) {
                        $('#mix_answer_1').prop("checked", true)
                    }
                }
                if (res.showResutl != null) {
                    if (res.showResutl == 0) {
                        $('#result_show_1').prop("checked", true);
                        $('#id_answer_show').css('display', 'block');
                    } else if (res.showResutl == 1) {
                        $('#result_show_2').prop("checked", true);
                    }
                }
                if (res.showAnswer != null) {
                    if (res.showAnswer == 0) {
                        $('#answer_show_1').prop("checked", true);
                        $('#id_answer_show').css('display', 'block');
                        $('#id_explain_show').css('display', 'block');
                    } else if (res.showAnswer == 1) {
                        $('#answer_show_2').prop("checked", true);
                    }
                }
                if (res.showExplain != null) {
                    if (res.showExplain == 0) {
                        $('#explain_show_1').prop("checked", true);
                        $('#id_explain_show').css('display', 'block');
                    } else if (res.showExplain == 1) {
                        $('#explain_show_2').prop("checked", true);
                    }
                }
                if (res.fullTickAnswer != null) {
                    if (res.fullTickAnswer == 0) {
                        $('#all_check_1').prop("checked", true);
                    } else if (res.fullTickAnswer == 1) {
                        $('#all_check_2').prop("checked", true);
                    }
                }
                var line = '<div class="class_title_candidates">Thí sinh tham dự phải đăng ký chờ duyệt, có trong danh sách thí sinh , hoặc dùng mã vòng thi để được thi </div> <br> <span>Mã vòng thi là <b>' + res.codeRoundTest + '</b></span>'
                $('.class_cadidates_form').html(line);
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
                CKEDITOR.instances.content.setData(res.describes);


                 showViewStructDetailTest();

                checkUpdateRoundTest(res.id);
            },
            error: function (res) {
            }
        });
    }
}
function  checkUpdateRoundTest(idRound) {
    $.ajax({
        url: '/api/admin/roundtest/check/update/' + idRound,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('.change_max_min_point').css('display', 'none');
              //  $('.check_update_question').css('display', 'none');
            } else {
                $('.check_update_question').css('display', 'none');
                $('#btn_save_all').css('display', 'none');

            }
        },
        error: function (res) {

        }
    });
}
function getTestByIdRoundTest(id) {
    if (id != '') {
        $.ajax({
            url: '/api/admin/test-kit/' + id,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            type: 'POST',
            dataType: 'json',
            success: function (res) {
                var row = '';
              /*  row = '<option disabled selected="selected" value="' + res.testKit.id + '">' + res.testKit.nameTest + '</option>';
                $('#select_list_test_kit_round').html(row);*/
                $('#name_cate').attr('id_cate',res.testKit.id);
                $('#name_cate_show').text(res.testKit.nameTest);


                var row2 = '<option  selected="selected" value="' + res.id + '">' + res.name + '</option>'
                $('#select_test_round_test').html(row2);
            },
            error: function (res) {
                $('.loader_roundtest').css("display", "none");
            }
        });

    }
}

$('#customRadio1').on('click', function () {
    $('#input_time_start3').val("");
    $('#input_time_end3').val("");
});

function getAddPointRoundTest() {
    var id = $('#id_round_test').val();
    if (id != '') {

        $.ajax({
            url: '/api/admin/addpoint/roundtest/' + id,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                if (res.length > 0) {
                    $('#value_kho_add_id').val(res[0]);
                    $('#value_tb_add_id').val(res[1]);
                    $('#value_de_add_id').val(res[2]);
                    $('#value_rk_add_id').val(res[3]);
                }
            },
            error: function (res) {
                $('.loader_roundtest').css("display", "none");
            }
        });
    }
}

function getSubPointRoundTest() {
    var id = $('#id_round_test').val();
    if (id != '') {
        $.ajax({
            url: '/api/admin/subpoint/roundtest/' + id,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                var row = '';
                if (res.length > 0) {
                    $('#value_kho_sub_id').val(res[0]);
                    $('#value_tb_sub_id').val(res[1]);
                    $('#value_de_sub_id').val(res[2]);
                    $('#value_rk_sub_id').val(res[3]);
                }
            },
            error: function (res) {

                $('.loader_roundtest').css("display", "none");
            }
        });

    }
}

function fire_ajax_submit(idRound) {
    //var formData = new FormData();
    var form = $('#formImport')[0];
    var formData = new FormData(form);
    formData.append('fileExcel', $('#uploadFile')[0].files[0]);
    $.ajax({
        url: '/api/admin/candidate/read/import/list/' + idRound,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        enctype: 'multipart/form-data',
        data: formData,
        processData: false,  // Important!
        contentType: false,
        cache: false,
        success: function (res) {
            // console.log(result);
            // console.log(result);
            var row = '';
            $(res).each(function (index, item) {
                if(!item.email){
                    item.email='';
                }
                if(!item.birthday){
                    item.birthday='';
                }
                if(!item.name){
                    item.name='';
                }
                if(!item.unit){
                    item.unit='';
                }

                row += '<tr>'
                row += '<td>' + parseInt(index+1)+ '</td>'
                row += '<td>' + item.username + '</td>'
                row += '<td>' + item.name + '</td>'
                if (item.sex == 1) {
                    row += '<td>Nam</td>'
                } else if (item.sex == 0) {
                    row += '<td>Nữ</td>'
                } else {
                    row += '<td> </td>'
                }
                row += '<td>' + item.birthday + '</td>'
                row += '<td>' + item.unit + '</td>'
                if (item.status == false) {
                    row += '<td style="color: red">User name không tồn tại</td>'
                } else {
                    row += '<td style="color: blue">Đối tượng hợp lệ</td>'
                }
                row += '</tr>'
            });
            $('#data_list_competition').html(row);
            show_list_candidate();
            alert("Thêm thành công");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Thêm thất bại");
        }
    });
};


function showViewStructDetailTest() {
    var arrayIndex = [];
    var id = $('#id_round_test').val();
    if (id != '') {
        $.ajax({
            url: '/api/admin/structdetailtest/list/' + id,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            type: 'POST',
            dataType: 'json',
            success: function (res) {
                var row = '';
                if (res.length > 0) {
                    $(res).each(function (index, item) {
                        row += '<tr  id="row' + index + '">'
                        row += '<td>'
                        row += '<div class="btn_remove_class_round">'
                        row += '<button type="button" name="remove" id="' + index + '" class="btn_small_100_px btn_remove btn btn-block btn-danger btn-sm">Xóa nhóm</button>'
                        row += '</div>'
                        row += ' <label id="name_row_' + index + '">' + item.nameGroup + '</label>'
                        row += '<div class="row">'
                        row += '<div class="col-md-2">'
                        row += '<label class="label-normal">Phân loại câu hỏi</label>'
                        row += '</div>'
                        row += '<div class="col-md-10">'
                        row += '<div class="row">'
                        row += '<div class="type_goup_test">'
                        row += '<div class="form_small_round_test">'
                        if(item.questionCategoryStruct.poscodeName!=null){
                            row += '<a onclick="showmodelTypeQuestion(this)"  id="id_row_' + index + '"   class="label-normal a_round_test">' + item.questionCategoryStruct.poscodeName + ',' + item.questionCategoryStruct.nameCategory + '&nbsp;<i class="fas fa-edit"></i></a>'
                        }else{
                            row += '<a onclick="showmodelTypeQuestion(this)"  id="id_row_' + index + '"   class="label-normal a_round_test">Tổng công ty VNPOST ,' + item.questionCategoryStruct.nameCategory + '&nbsp;<i class="fas fa-edit"></i></a>'
                        }
                        //row += '<a onclick="showmodelTypeQuestion(this)"  id="id_row_' + index + '"   class="label-normal a_round_test">' + item.questionCategoryStruct.poscodeName + ',' + item.questionCategoryStruct.nameCategory + '&nbsp;<i class="fas fa-edit"></i></a>'
                        row += '<input type="hidden" name="name_unit_category[]" value="' + item.questionCategoryStruct.id + '"  id="id_row_' + index + 'id_row_' + index + '" class="form-control name_list" />'
                        row += '</div>'
                        row += '<div class="form_small_round_test">'
                        row += '<div class="form-group">'
                        row += '<select onclick="loadlevell(this)" onchange="onChangeSelect(this)" id="selectLevel' + index + '" class="select_type_groud" >'
                        if (item.levell != null) {
                            row += '<option selected="selected"  value="' + item.levell.id + '">' + item.levell.nameLevell + '</option>';
                        } else {
                            row += '<option selected="selected" disabled>[mức độ]</option>';
                        }
                        row += '<option value="0">option 2</option>';
                        row += '<option value="0">option 3</option>';
                        row += '<option value="0">option 4</option>';
                        row += '<option value="0">option 5</option>';
                        row += '</select>';
                        row += '</div>';
                        row += '</div>';
                        row += '<div class="form_small_round_test">';
                        row += '<div class="form-group">';
                        row += '<select  onclick="loadKindQuestion(this)" onchange="onChangeSelect(this)"  id="selectType' + index + '"  class="select_type_groud" >'
                        if (item.typeQuestion != null) {

                            row += '<option selected="selected"  value="' + item.typeQuestion.id + '">' + item.typeQuestion.nameType + '</option>'
                        } else {
                            row += ' <option selected="selected" disabled>[Loại câu hỏi]</option>';
                        }
                        row += '<option value="0">option 2</option>';
                        row += '<option value="0">option 3</option>';
                        row += '<option value="0">option 4</option>';
                        row += '<option value="0">option 5</option>';
                        row += '</select>'
                        row += '</div>'
                        row += '</div>'
                        row += '</div>'
                        row += '</div>'
                        row += '</div>'
                        row += '</div>'
                        row += '<div class="row class_input_count_question'+ index + '">'
                        row += '<div class="col-md-2">'
                        row += '<label class="label-normal showmaxquestion">Số lượng câu hỏi</label>'
                        row += '</div>'
                        row += '<div class="col-md-10 " >'
                        row += '<div class="row">'
                        row += '<div class="col-md-2" style="margin-left: 30px;">'
                        row += '<div class="form-group showmaxquestion keyUpinput">'
                        if (item.typeQuestion != null) {
                            row += ' <input name="nameInputQuestion[]"   onkeyup="checkNumberMaxQuesstion(this)" value="' + item.countTest + '" min="0" max_value="" style="height: 24px; width: 101px; margin-top: 5px;" type="text" id="countid_row_' + index + '" class="form-control "    >'

                        }else{
                            row += ' <input name="nameInputQuestion[]" disabled onkeyup="checkNumberMaxQuesstion(this)" value="' + item.countTest + '" min="0" max_value="" style="height: 24px; width: 101px; margin-top: 5px;" type="text" id="countid_row_' + index + '" class="form-control "    >'

                        }
                        row += ' </div>'
                        row += '</div>'
                        row += ' <div class="col-md-6" style="margin-left: 25px;">'
                        row += '<div class="form-group showmaxquestion">'
                        row += '<label class=" label-normal label_normal_blue" id="textcountid_row_' + index + '"  ></label>'
                        row += '</div>'
                        row += '</div>'
                        row += '</div>'
                        row += '<div class="row" id="textWarning_' + index + '" style="display: none;">'
                        row += '<span class="text_warning_size" >Bạn đã nhập quá số lượng câu hỏi tối đa</span>'
                        row += '</div>'
                        row += '</div>'
                        row += '</div>'
                        row += '</td>'
                        row += '</tr>'

                        arrayIndex.push(index);
                    });
                }
                $('#body_round_test').html(row);
                countQuestionRoundTest();


                function getSumGroup() {
                    return parseInt($('.table_question_group tr').length);
                }

                $('#sum_group').attr('index_group', parseInt(getSumGroup()));
                $('#sum_group').text('Tổng số nhóm câu hỏi dự kiến trong đề thi là ' + getSumGroup());
                countQuestionRoundByIndex(arrayIndex);
                checkPointerEvents();
                if($('#select_question_source').val()==1){
                    $('.autoCreateCheckBox').css('display','none');
                }
            },
            error: function (res) {
                $('.loader_roundtest').css("display", "none");
            }
        });
    }
};
function countQuestionRoundByIndex(arrayIndex) {


    $(arrayIndex).each(function (index, id) {
        var dataArray = {}
        if ($('#id_row_' + id + 'id_row_' + id).val() != "") {

            if ($('#selectLevel' + id).val() != null) {
                dataArray["id_levell"] = $('#selectLevel' + id).val();
            }
            if ($('#id_row_' + id + 'id_row_' + id).val() != null) {
                dataArray["id_question_category"] = $('#id_row_' + id + 'id_row_' + id).val();
            }
            if ($('#selectType' + id).val() != null) {
                dataArray["id_type_question"] = $('#selectType' + id).val();
            }
            $.ajax({
                url: '/api/admin/question/count',
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                type: 'POST',
                data: JSON.stringify(dataArray),
                dataType: 'json',
                contentType: "application/json",
                success: function (res) {
                    var count = '';
                    count = res;
                    $('#countid_row_' + id).attr('max_value', count);
                },
                error: function (res) {
                }
            });
        }
    });
};

function getListGroup() {
    var id = $('#id_round_test').val();
    if (id != "") {
        $.ajax({
            url: '/api/admin/grouptest/' + id + '/list',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                var row = '';
                row += '<option   selected="selected" value="">--Nhóm thi--</option>'
                $(res).each(function (index, item) {
                    row += '<option value="' + item.id + '">' + item.nameGroup + '</option>'
                });
                $('#id_group_member').html(row);
                getListActionCandidates(res);
            },
            error: function (res) {
            }
        });
    }
}

function getListActionCandidates(res) {
    var id = $('#id_round_test').val();
    if (id != "") {
        var row = '';
        row += '<li onclick="unlockCandidate()" class="dropdown-item"><a><i class="fas fa-unlock-alt"></i></i>&nbsp;Mở thi</a></li>'
        row += '<li onclick="onlockCandidate()" class="dropdown-item"><a ><i class="fas fa-lock"></i>&nbsp;Khóa thi</a></li>'
        row += '<li  onclick="removeCandidate()" class="dropdown-item"><a ><i class="fa fa-times" aria-hidden="true"></i>&nbsp;Xóa thí sinh</a></li>'
        $(res).each(function (index, item) {
            row += '<li onclick="gotoGroup(this)" style="white-space:unset !important;" name_group="'+item.nameGroup+'" id_group="' + item.id + '" class="dropdown-item"> Chuyển nhóm&nbsp;<i class="fas fa-long-arrow-alt-right"></i>&nbsp;' + item.nameGroup + ' </li>\n'
        });
        row += '<li onclick="outGroup()" class="dropdown-item"><a ><i class="fas fa-sign-out-alt"></i>&nbsp;Loại khỏi nhóm</a></li>'
        $('#list_option_action_cadicate').html(row);
    }
}

function  checkPointerEvents() {
    if($('#select_question_source').val()==1){
        $('#struct_test_round').css("pointer-events","none");
    }else{
        $('#struct_test_round').css("pointer-events","all");
    }
}

