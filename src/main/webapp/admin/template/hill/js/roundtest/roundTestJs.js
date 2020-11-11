$(document).ready(function () {
    //var i=$('#sum_group').attr('index_group');
    $('#add').click(function () {
        var i = parseInt($('.table_question_group tr').length) - 1;
        i++;
        var row = '';
        row += '<tr  id="row' + i + '">'
        row += '<td>'
        row += '<div class="btn_remove_class_round">'
        row += '<button type="button"  name="remove" id="' + i + '" class="btn_small_100_px btn_remove btn btn-block btn-danger btn-sm">Xóa nhóm </button>'
        row += '</div>'
        row += '<label id="name_row_' + i + '" style="font-size: 14px" >Nhóm câu hỏi số ' + parseInt(i + 1) + '</label>'
        row += '<div class="row">'
        row += '<div class="col-md-2">'
        row += '<label style="font-size: 14px" class="label-normal">Phân loại câu hỏi</label>'
        row += '</div>'
        row += '<div class="col-md-10">'
        row += '<div class="type_goup_test">'
        row += '<div class="form_small_round_test">'
        row += '<a onclick="showmodelTypeQuestion(this)" id="id_row_' + i + '" class="label-normal a_round_test">Lựa chọn danh mục&nbsp;<i class="fas fa-edit"></i></a>'
        row += '<input type="hidden" name="name_unit_category[]"  id="id_row_' + i + 'id_row_' + i + '" class="form-control name_list" />';
        row += '</div>'
        row += '<div class="form_small_round_test">'
        row += '<div class="form-group">  '
        row += '<select onclick="loadlevell(this)" onchange="onChangeSelect(this)" id="selectLevel' + i + '" class="select_type_groud" >'
        row += '<option selected  disabled="disabled">[Mức độ]</option>'
        row += '<option>option 2</option>'
        row += '<option>option 3</option>'
        row += '<option>option 4</option>'
        row += '<option>option 5</option>'
        row += '</select>'
        row += '</div>'
        row += '</div>'
        row += '<div class=" form_small_round_test">'
        row += '<div class="form-group"> '

        row += '<select  onclick="loadKindQuestion(this)" onchange="onChangeSelect(this)" id="selectType' + i + '"  class="select_type_groud" >'
        row += '<option selected disabled>[Loại câu hỏi]</option>'
        row += '<option>option 2</option>'
        row += '<option>option 3</option>'
        row += '<option>option 4</option>'
        row += '<option>option 5</option>'
        row += '</select>'
        row += '</div>'
        row += '</div>'

        row += '</div>'
        row += '</div>'
        row += '</div>'
        row += '<div class="row class_input_count_question' + i + '"  style="display: none">'
        row += '<div class="col-md-2">'
        row += '<label class="label-normal">Số lượng câu hỏi</label>'
        row += '</div>'
        row += '<div class="col-md-10 ">'
        row += '<div class="row">'
        row += '<div class="col-md-2" style="margin-left: 30px;">'
        row += '<div class="form-group keyUpinput">'
        row += '<input min="0" value="0" disabled name="nameInputQuestion[]" onkeyup="checkNumberMaxQuesstion(this)"     max_value=""  id="countid_row_' + i + '"  style="height: 24px; width: 101px; margin-top: 5px;" type="text" class="form-control"   ">'
        row += '</div>'
        row += '</div>'
        row += '<div class="col-md-6" style="margin-left: 25px;">'
        row += '<div class="form-group keyUpinput">'
        row += '<label  id="textcountid_row_' + i + '" class=" label-normal label_normal_blue " style="color: #3f51b5 !important;"></label>' //Số lượng câu hỏi lớn nhất có thể là
        row += '</div>'
        row += '</div>'
        row += '</div>'
        row += '<div class="row" id="textWarning_' + i + '" style="display: none;">'
        row += '<span class="text_warning_size" >Bạn đã nhập quá số lượng câu hỏi tối đa</span>'
        row += '</div>'
        row += '</div>'
        row += '</div>'
        row += '</td>'
        row += '</tr>'
        $('#dynamic_field').append(row);
        $('#sum_group').attr('index_group', parseInt(getSumGroup()));
        $('#sum_group').text('Tổng số nhóm câu hỏi dự kiến trong đề thi là ' + getSumGroup());
    });

    function getSumGroup() {
        return parseInt($('.table_question_group tr').length);
    }

    $(document).on('click', '.btn_remove', function () {
        var button_id = $(this).attr("id");
        var count = parseInt($('.table_question_group tr').length);
        if (button_id != '0') {
            $('#row' + button_id + '').remove();
            var index_now = $('#sum_group').attr('index_group');
            $('#sum_group').attr('index_group', parseInt(index_now) - 1);
            $('#sum_group').text('Tổng số nhóm câu hỏi dự kiến trong đề thi là ' + getSumGroup());

            if (button_id != count) {
                for (var i = button_id; i < count - 1; i++) {
                    $('.list_tag_show' + (parseInt(i) + 1) + 'list_tag_show' + (parseInt(i) + 1)).attr('class', 'list_tag_show' + (parseInt(i)) + 'list_tag_show' + (parseInt(i)));
                    $('#selectLevel' + (parseInt(i) + 1)).attr('id', 'selectLevel' + (parseInt(i)));
                    $('#id_row_' + (parseInt(i) + 1) + 'id_row_' + (parseInt(i) + 1)).attr('id', 'id_row_' + (parseInt(i)) + 'id_row_' + (parseInt(i)));
                    $('#selectType' + (parseInt(i) + 1)).attr('id', 'selectType' + (parseInt(i)));

                    $('#name_row_' + (parseInt(i) + 1)).text("Nhóm câu hỏi số " + (parseInt(i) + 1));
                    $('#name_row_' + (parseInt(i) + 1)).attr('id', 'name_row_' + parseInt(i));
                    $('#row' + (parseInt(i) + 1)).attr('id', 'row' + (parseInt(i)));
                    $('#id_row' + (parseInt(i) + 1)).attr('id', 'id_row' + (parseInt(i)));
                    $('#list_tag_show' + (parseInt(i) + 1)).attr('id', 'list_tag_show' + (parseInt(i)));
                    $('.list_tag_show' + (parseInt(i) + 1)).attr('id_input_hiden', 'list_tag_show' + (parseInt(i)));
                    $('#list_tag_show' + (parseInt(i) + 1)).attr('class', 'dropdown-content_category list_tag_show' + (parseInt(i)));
                    $('.list_tag_show' + (parseInt(i) + 1) + 'list_tag_show' + (parseInt(i) + 1)).attr('tag_class', 'list_tag_show' + (parseInt(i)));
                    $('.class_input_count_question' + (parseInt(i) + 1)).attr('class', 'row class_input_count_question' + (parseInt(i)));
                    $('#textcountid_row_' + (parseInt(i) + 1)).attr('id', 'textcountid_row_' + (parseInt(i)));
                    $('#textWarning_' + (parseInt(i) + 1)).attr('id', 'textWarning_' + (parseInt(i)));
                    $('#countid_row_' + (parseInt(i) + 1)).attr('id', 'countid_row_' + (parseInt(i)));
                    $('#' + (parseInt(i) + 1)).attr('id', (parseInt(i)));
                }
            }
        }
    });
});


$('#customRadio2').on('click', function () {
    $('.input_time').css('display', 'block');

});
$('#customRadio1').on('click', function () {
    $('.input_time').css('display', 'none');
    $('#input_time_start').val("");
    $('#input_time_end').val("");
});

$('#customRadio_work_1').on('click', function () {
    $('.label_max_work_round_test').css('display', 'none');

});
$('#customRadio_work_2').on('click', function () {
    $('.label_max_work_round_test').css('display', 'block');

});


$('#result_show_1').on('click', function () {
    $('#id_answer_show').css('display', 'block');
});

$('#result_show_2').on('click', function () {
    $('#id_answer_show').css('display', 'none');
    $('#id_explain_show').css('display', 'none');
    $('#answer_show_2').prop("checked", true);
    $('#explain_show_2').prop("checked", true);
});

$('#answer_show_1').on('click', function () {
    $('#id_explain_show').css('display', 'block');
});
$('#answer_show_2').on('click', function () {
    $('#id_explain_show').css('display', 'none');
    $('#explain_show_2').prop("checked", true);
});

/*$('#select_question_source').on('change', function () {

    if ($('#select_question_source').val() == 1) {
        $('#test_choose').css('display', 'block');
        $('#test_kit_choose').css('display', 'block');
        $('#struct_test_round').css('display', 'none');

    } else {
        $('#test_choose').css('display', 'none');
        $('#test_kit_choose').css('display', 'none');
        $('#struct_test_round').css('display', 'block');
        $('.btn_add_round_test').css('display', 'block');
        $('.btn_small_100_px').css('display', 'block');
    }
    checkPointerEvents();
});*/

$(document).on('change','#select_question_source',function () {
    if($('#select_question_source').val()==1){
        $('#test_choose').css('display','block');
        $('#test_kit_choose').css('display','block');
        $('#struct_test_round').css('display','none');

        $('.autoCreateCheckBox').css('display','none');
        $("#rundomRound").prop( "checked", false);
    }else{
        $('#test_choose').css('display','none');
        $('#test_kit_choose').css('display','none');
        $('#struct_test_round').css('display','block');
        $('.btn_small_100_px').css('display', 'block');

        $('.autoCreateCheckBox').css('display','inline-flex');
        $("#rundomRound").prop( "checked", false);
    }
    checkPointerEvents() ;
});/*$('#select_question_source').on('change', function() {





});*/

function countQuestion(btn) {
    var id = btn.substring(btn.length - 1, btn.length);
    var dataArray = {}
    if ($('#id_row_' + id + 'id_row_' + id).val() != "") {
        if ($('.list_tag_show' + id).val() != '') {
            dataArray["id_tag"] = $('.list_tag_show' + id + 'list_tag_show' + id).val();
        }
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
                $('.class_input_count_question' + id).css('display', 'block');
                //$('.class_input_count_question'+id).remove('style');
                $('.class_input_count_question' + id).css('display', 'flex');
                $('#countid_row_' + id).val(count);
                $('#textcountid_row_' + id).text("Số lượng câu hỏi lớn nhất có thể là " + count);

                $('#countid_row_' + id).attr('max_value', count);
                countQuestionRoundTest();
            },
            error: function (res) {
            }
        });
    }
};

function checkNumberMaxQuesstion(btn) {
    console.log(($(btn).val()));
    if(!$.isNumeric($(btn).val())){
        $(btn).val("");
        return
    }
    var max_value = parseInt($(btn).attr('max_value'));
    var val_input = parseInt($(btn).val());
    var id_hover = $(btn).attr('id');
    var id = id_hover.substring(id_hover.length - 1, id_hover.length);
    if (val_input > max_value || val_input<0) {
        $('#' + id_hover).val(0);
        $('#textWarning_' + id).css('display', 'block');
    } else {
        $('#textWarning_' + id).css('display', 'none');
    }
    countQuestionRoundTest();
}

function countQuestionRoundTest() {
    var arr = $("input[name='nameInputQuestion[]']").map(function () {
        return $(this).val();
    }).get();
    var count = 0;
    $(arr).each(function (index, item) {
        count = parseInt(count) + parseInt(item);
    });
    $('#sum_count_question').text("Tổng số câu hỏi dự kiến trong đề thi là " + count)
    $('#sum_count_question').attr('index_count', count);
}

function loadlevell(btn) {
    $.ajax({
        url: '/api/admin/levell/list',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '<option selected   value="" >[Mức độ]</option>';
            $(res).each(function (index, item) {
                row += '<option value="' + item.id + '">' + item.nameLevell + '</option>'
                $(btn).html(row);
            });
        },
        error: function (res) {
            alert('Có lỗi xảy ra');
        }
    });
    $(btn).removeAttr("onclick");
}

function loadKindQuestion(btn) {

    $.ajax({
        url: '/api/admin/typequestion/list',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '<option selected value="" >[Loai câu hỏi]</option>';
            $(res).each(function (index, item) {
                row += '<option value="' + item.id + '">' + item.nameType + '</option>'
                $(btn).html(row);
            });
        },
        error: function (res) {
            alert('Có lỗi xảy ra');
        }
    });
    $(btn).removeAttr("onclick");
}

function showlistTags(btn) {
    var class_show_list = $(btn).attr('id_input_hiden');
    $.ajax({
        url: '/api/admin/tag/list',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '';
            $(res).each(function (index, items) {
                row += '<p onclick="clickTags(this)"  style="text-align: left; "  tag_class="' + class_show_list + '"  name_tag="' + items.name + '" id_tag="' + items.id + '">' + items.name + '</p>';
            });
            $('.' + class_show_list).html(row);
        },
        error: function (res) {
            alert('Có lỗi xảy ra');
        }
    });
};

function searchTagThis(btn) {

    var class_show_list = $(btn).attr('id_input_hiden');
    var name = $(btn).val();
    if (name == '') {
        name = 'all';
    }
    $.ajax({
        url: '/api/admin/tag/search/' + name,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '';
            if (res != null) {
                $(res).each(function (index, items) {
                    row += '<p onclick="clickTags(this)" class="' + class_show_list + '' + class_show_list + '" style="text-align: left; "  tag_class="' + class_show_list + '"  name_tag="' + items.name + '" id_tag="' + items.id + '">' + items.name + '</p>';
                });
            }
            $('.' + class_show_list).html(row);
        },
        error: function (res) {
            alert('Có lỗi xảy ra');
        }
    });
}

function clickTags(btn) {
    var class_and_id_input = $(btn).attr('tag_class');
    var name_tag = $(btn).attr('name_tag');
    var id_tag = $(btn).attr('id_tag');
    $('.' + class_and_id_input).val(name_tag);
    $('#' + class_and_id_input).val(id_tag);
    countQuestion(class_and_id_input);
}

function onChangeSelect(btn) {
    var id = $(btn).attr("id");
    var index = id.substring(id.length - 1, id.length);
    var value = $('#selectLevel'+index).val();
    if(!value){
        $('#countid_row_'+index).attr('disabled', true);
    }else{
        $('#countid_row_'+index).attr('disabled', false);
    }
    countQuestion(id);

}

function selectTestKits() {
    $('.showlistCate').toggleClass('show');
    showTestCategorysParentStatusOn();
};

function selectTestRounds() {
    var id_test_kit = $('#name_cate').attr('id_cate');
    if (id_test_kit != null) {
        $.ajax({
            url: '/api/admin/test/list/' + id_test_kit,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            type: 'POST',
            dataType: 'json',
            beforeSend: function () {
                $('.loader_roundtest').css("display", "block");
                //$('.loader').css("background")
            },
            success: function (res) {
                $('.loader_roundtest').css("display", "none");
                var row = '<option disabled selected="selected" value="0">--Chọn đề thi--</option>';
                if (res != null) {
                    $(res).each(function (index, item) {
                        row += '<option value="' + item.id + '">' + item.name + '</option>'
                    });
                }
                $('#select_test_round_test').html(row);
                //$('#select_test_round_test').removeAttr("onclick");
            },
            error: function (res) {
                alert('Có lỗi xảy ra');
            }
        })
    }
}

$('#btn_save_all').on('click', function () {
    var dataArray = {};
    $('html,body').scrollTop(0);
    if (validateFormRoundTest() && checkChooseQuestionSource()
        && checkChooseTimeRound() &&
        checkChooseQuestionSourceValue0()
        && validateAddSubPoint()
    ) {
        dataArray["nameRound"] = $('#input_name_round_test').val();
        dataArray["describes"] = CKEDITOR.instances.content.getData();
        dataArray["statusRound"] = $('#text_status_round_test').val();
        dataArray["codeRoundTest"] = $('#text_code_round_test').val();
        //dataArray["id_unit"]=$('#name_unit').attr('id_unit');
        if ($('input[name="customRadio"]:checked').val() == '1') {
            dataArray["timeEnd"] = moment($('#input_time_end3').val()).toDate();
            dataArray["timeStart"] = moment($('#input_time_start3').val()).toDate();
        }
        //dataArray["timeStart"]=$('#input_time_end').val();
        dataArray["timeRound"] = $('#time_round_test_count').val();
        dataArray["condition_id"] = $('input[name="customRadio_condi"]:checked').val();
        dataArray["giveCertificate"] = $('input[name="customRadio2"]:checked').val();
        dataArray["id_competition"] = $('#input_id_competion').val();
        if ($('#select_question_source').val() == '1') {
            dataArray["test_id"] = $("#select_test_round_test").select2('val');
        }
        dataArray["sourceQuestion"] = $('#select_question_source').val();
        dataArray["maxPoint"] = 100;
        dataArray["minPoint"] = $('#min_point_round_test').val();


        if($('#rundomRound').is(':checked')){
            dataArray["autoCreateQuestion"] = 0;
        }else{
            dataArray["autoCreateQuestion"] = 1;
        }
        if($('#select_question_source').val()==1){
            dataArray["autoCreateQuestion"] = 1;
        }
        var add = [];
        add.push($('#value_kho_add_id').val());
        add.push($('#value_tb_add_id').val());
        add.push($('#value_de_add_id').val());
        add.push($('#value_rk_add_id').val());
        dataArray["add"] = add;
        var sub = [];
        sub.push($('#value_kho_sub_id').val());
        sub.push($('#value_tb_sub_id').val());
        sub.push($('#value_de_sub_id').val());
        sub.push($('#value_rk_sub_id').val());
        dataArray["sub"] = sub;
        var listStructTest = [];
        var countGroup = $('#sum_group').attr('index_group');
        var listCount = $("input[name='nameInputQuestion[]']").map(function () {
            if ($(this).val() != 0) {
                return $(this).val();
            }
        }).get();
        var count = $("input[name='nameInputQuestion[]']").map(function () {
            if ($(this).val() != 0) {
                return $(this).val();
            }
        }).get().length;
        for (var i = 0; i < count; i++) {
          //  listStructTest.push($('.list_tag_show' + i + 'list_tag_show' + i).val());
            listStructTest.push(null);
            listStructTest.push($('#selectLevel' + i).val());
            listStructTest.push($('#id_row_' + i + 'id_row_' + i).val());
            listStructTest.push($('#selectType' + i).val());
            listStructTest.push(listCount[i]);
        }
        dataArray["listStructTest"] = listStructTest;
        dataArray["doAgain"] = $('input[name="customRadio_work"]:checked').val();


        if ($('#input_max_work_round').val() == '') {
            dataArray["maxWork"] = 0;
        } else {
            dataArray["maxWork"] = $('#input_max_work_round').val();
        }

        if($('input[name="customRadio_work"]:checked').val()==1){
            dataArray["maxWork"] = 1;
        }
        dataArray["mixQuestion"] = $('input[name="question_mix"]:checked').val();
        dataArray["mixAnswer"] = $('input[name="mix_answer"]:checked').val();
        dataArray["showResutl"] = $('input[name="result_show"]:checked').val();
        dataArray["showAnswer"] = $('input[name="answer_show"]:checked').val();
        dataArray["showExplain"] = $('input[name="explain_show"]:checked').val();
        dataArray["fullTickAnswer"] = $('input[name="all_check"]:checked').val();
        dataArray["id"] = $('#id_round_test').val();
        $.ajax({
            url: '/api/admin/roundtest/edit',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            type: 'POST',
            data: JSON.stringify(dataArray),
            dataType: 'json',
            contentType: "application/json",
            beforeSend: function () {
                $('.loader').css("display", "block");
                $('.loader').css("background")
            },
            success: function (res) {
                $('.loader').css("display", "none");
               // console.log(res);
                if(res){
                    alert("Cập nhật thành công");
                }else{
                    alert("Không thể cật nhập,Vòng thi đã có thí sinh làm bài thi");
                }

                location.reload();
            },
            error: function (res) {
                console.log(res);
                alert("Không thể cập nhật,Vòng thi đã có thí sinh làm bài thi");
            }
        });
    }
});


function  validateAddSubPoint() {

    if ($('#value_kho_add_id').val() =='' || $('#value_tb_add_id').val() ==''  || $('#value_de_add_id').val() ==''
        || $('#value_rk_add_id').val()  ==''  || $('#value_kho_sub_id').val() ==''  || $('#value_tb_sub_id').val()  =='' ||
        $('#value_de_sub_id').val() ==''   || $('#value_rk_sub_id').val() =='' ) {
        $('#errorAndSubPoint').css("display", "block");
        return false;
    }else{
        $('#errorAndSubPoint').css("display", "none");
        return true;
    }
}

function validateFormRoundTest() {

    if ($('#input_name_round_test').val() == ''
        || $('#name_unit').attr('id_unit') == ''
        || $('#time_round_test_count').val() == ''
        || $('#min_point_round_test').val() == '' ||
        parseInt($('#time_round_test_count').val())<=0 ||
        parseInt($('#min_point_round_test').val()) >100 ||
        parseInt($('#min_point_round_test').val()) <0
    ) {
        if ($('#input_name_round_test').val() == '') {
            $('#name_check_round').css("display", "block");
        } else {
            $('#name_check_round').css("display", "none");
        }

        if ($('#name_unit').attr('id_unit') == '') {
            $('#unit_check_round').css("display", "block");

        } else {
            $('#unit_check_round').css("display", "none");

        }
        if ($('#time_round_test_count').val() == '' || parseInt($('#time_round_test_count').val())<0) {
            $('#time_check_round').css("display", "block");

        } else {
            $('#time_check_round').css("display", "none");

        }

        if ($('#min_point_round_test').val() == ''||  parseInt($('#min_point_round_test').val())<0 || parseInt($('#min_point_round_test').val()) >99) {
            $('#min_point_check_round').css("display", "block");
        } else {
            $('#min_point_check_round').css("display", "none");
        }
        return false;
    } else {

        return true;
    }
    return false;

};

function checkChooseQuestionSource() {
    if ($('#select_question_source').val() == '1') {
        if ($("#select_test_round_test").val() == null) {
            $('#choose_test_one').css("display", "block");
            return false;
        } else {
            $('#choose_test_one').css("display", "none");
            return true;
        }
        return false;
    }

    return true;

}


function checkChooseQuestionSourceValue0() {
    //if($('#rundomRound').is(':checked')){return true;}
    if ($('#select_question_source').val() == '0') {
        if ($("#sum_count_question").attr('index_count') == '0') {
            $('#check_group_question').css("display", "block");
            return false;
        } else {
            $('#check_group_question').css("display", "none");
            return true;
        }
        return false;
    }
    return true;
}

function checkChooseTimeRound() {
    if ($('input[name="customRadio"]:checked').val() == '1') {
        if ($("#input_time_start").val() == '' || $("#input_time_end").val() == '') {

            if ($("#input_time_start").val() == '') {
                $('#time_start_check_round').css("display", "block");

            } else {
                $('#time_start_check_round').css("display", "none");

            }
            if ($("#input_time_end").val() == '') {
                $('#time_end_check_round').css("display", "block");

            } else {
                $('#time_end_check_round').css("display", "none");

            }

            return false;

        } else {
            return true;
        }


        return true;
    }

    return true;

}

$('#text_box_name_unit').keyup(function () {
    var idPosCode = $('#text_box_name_unit').val();
    $.ajax({
        url: '/api/admin/treeunit/' + idPosCode + '/poscode',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '';
            if (res != null) {
                $('#name_unit_form').text(res.name);
                $('#name_unit').attr('name_unit', res.id);
            }
        },
        error: function (res) {

        }
    });
});

$('.change_max_min_point').on('click',function () {
   if(  $('#min_point_round_test').val()<=0 || $('#min_point_round_test').val()>100){
       alert("Xin kiểm tra lại, tỷ lệ phải nhỏ hơn 100 %");
       return;
   }
    var idround = $('#id_round_test').val();
    var dataArray ={};
    dataArray['maxPoint'] = 100;
    dataArray['minPoint'] =  $('#min_point_round_test').val();
    $.ajax({
        url: '/api/admin/roundtest/change/minMax/' + idround,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'PUT',
        data: JSON.stringify(dataArray),
        dataType: 'json',
        contentType: "application/json",
        beforeSend: function () {
            $('.loader_roundtest').css("display", "block");
           // $('.loader').css("background")
        },
        success: function (res) {
            $('.loader_roundtest').css("display", "none");
            alert("Cập nhật điều kiện hoàn thành thành công");
            location.reload();
        },
        error: function (res) {
            alert("Thất bại");
        }
    });
});


$(document).ready(function () {
    var idRoundTest=$('#id_round_test').val();
    $("#btnSavevAddCadidateRemote").click(function (event) {
        //stop submit the form, we will post it manually.
        event.preventDefault();
        showInformationRemote(idRoundTest);
    });
});

function showInformationRemote(idRound) {
    //var formData = new FormData();
    var form = $('#formImportRemote')[0];
    var formData = new FormData(form);
    formData.append('fileExcel', $('#uploadFileRemote')[0].files[0]);
    $.ajax({
        url: '/api/admin/candidate/read/import/remote/list/' + idRound,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        enctype: 'multipart/form-data',
        data: formData,
        processData: false,  // Important!
        contentType: false,
        cache: false,
        success: function (res) {
            res = res.data;
            var row='';
            row+='<p>&nbsp;&nbsp;Đã xóa '+res[0]+' thí sinh  </p>'
            row+='<p  >&nbsp;&nbsp;Chưa xóa do thí sinh đã thi <span style="color: red">'+res[1]+' thí sinh</span></p>'
            row+='<p  >&nbsp;&nbsp;Chưa xóa do username không tồn tại <span style="color: red">'+res[2]+' thí sinh</span></p>'
            $('.information-remote').html(row);

            show_list_candidate();
            alert("Xóa thành công");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Xóa thất bại");
        }
    });
};