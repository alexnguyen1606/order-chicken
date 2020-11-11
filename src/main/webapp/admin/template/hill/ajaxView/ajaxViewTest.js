function showTestCategorys() {
    $.ajax({
        url: '/api/admin/test-kit/list',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        beforeSend: function () {
            $('.loader').css("display", "block");
            //$('.loader').css("background")
        },
        success: function (res) {
            $('.loader').css("display", "none");
            var row = ''
            row += '<option value=""  selected>-Bộ đề-</option>'
            $(res).each(function (i, item) {
                row += '<option value="' + item.id + '">' + item.nameTest + '</option>'
            });
            $('#test_kit_value').html(row);
        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}


function showTestCategorysForAddEdit(id) {
    $.ajax({
        url: '/api/admin/test-kit/status/list',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '';
            row += '<option value=""  selected>-Bộ đề-</option>'
            $(res).each(function (i, item) {
                row += '<option value="' + item.id + '">' + item.nameTest + '</option>'
            });
            $('#test_kit_value').html(row);
        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}


function showViewStructDetailTestExam() {
    var id = $('#test_id').val();
    var arrayIndex = [];
    if (id != '') {

        $.ajax({
            url: '/api/admin/structdetailtest/test/' + id + '/list',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            type: 'POST',
            dataType: 'json',
            beforeSend: function () {
                $('.loader').css("display", "block");
                //$('.loader').css("background")
            },
            success: function (res) {
                $('.loader').css("display", "none");
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
                        // row+='<option selected="selected" disabled>[mức độ]</option>';
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
                        //    row+=' <option selected="selected" disabled>[Loại câu hỏi]</option>';
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
                        row += '<div class="row class_input_count_question' + index + '">'
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
                            row += ' <input name="nameInputQuestion[]"   onkeyup="checkNumberMaxQuesstion(this)" value="' + item.countTest + '" min="0" max_value="" style="height: 24px; width: 101px; margin-top: 5px;" type="text" id="countid_row_' + index + '" class="form-control "    >'

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
                countQuestionByIndexTest(arrayIndex);
            },
            error: function (res) {
                $('.loader_roundtest').css("display", "none");
            }
        });
    }
}

function countQuestionByIndexTest(arrayIndex) {


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

function getTest() {
    var id = $('#test_id').val();
    if (id != '') {
        $.ajax({
            url: '/api/admin/test/' + id,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            type: 'POST',
            dataType: 'json',
            success: function (res) {
                $('#name_test').val(res.name);

                CKEDITOR
                    .replace(
                        'content_detail',
                        {
                            filebrowserBrowseUrl : 'ckfinder/ckfinder.html',
                            filebrowserImageBrowseUrl : 'ckfinder/ckfinder.html?type=Images',
                            filebrowserFlashBrowseUrl : 'ckfinder/ckfinder.html?type=Flash',
                            filebrowserUploadUrl : 'ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                            filebrowserImageUploadUrl : 'ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                            filebrowserFlashUploadUrl : 'ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash'
                        });

                CKEDITOR.instances.content_detail.setData(res.description);

                //$("#test_kit_value").select2().select2('val', '' + res.testKit.id + '');

               /* if($("#test_kit_value").select2().select2('val')==null){
                    var row = '';
                    row += '<option value="' + res.testKit.id + '">' + res.testKit.nameTest + '</option>'
                    $('#test_kit_value').append(row);
                    //$("#test_kit_value").select2().select2('val', '' + res.testKit.id + '')
                    $('#test_kit_value').val('' + res.testKit.id + '').trigger('change');
                }*/
                $('#name_cate').attr('id_cate',res.testKit.id);
                $('#name_cate_show').text(res.testKit.nameTest);
            },
            error: function (res) {
                console.log(res);
                // alert(console.log(res));
            }
        });
    }
}