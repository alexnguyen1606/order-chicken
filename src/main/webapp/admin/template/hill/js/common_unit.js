$(document).on('keyup','#text_box_name_unit',function () {
    var idPosCode = $('#text_box_name_unit').val();
    getvaluePoscode('name_unit', 'name_unit_form', idPosCode, 'id_unit');
});

$(document).on('keyup','#text_box_name_unit_competion_list',function () {
    var idPosCode = $('#text_box_name_unit_competion_list').val();
    getvaluePoscode('name_unit', 'name_unit_form', idPosCode, 'id_unit');
});


$(document).on('keyup','#text_box_name_unit_add_candidate',function () {
    var idPosCode = $('#text_box_name_unit_add_candidate').val();
    getvaluePoscode('name_unitCadidateRound', 'name_unit_formCadidateRound', idPosCode, 'id_unitcategoryquestion');
});





function getNamePoscodeById(btn) {
    var idPosCode = $(btn).val();
    var i = $(btn).attr('index');
    getvaluePoscode('name_unit' + i, 'name_unit_form' + i, idPosCode, 'id_unit');
};
function getNamePoscodeByIdForUser(btn) {
    var idPosCode = $(btn).val();
    //var i = $(btn).attr('index');
    getvaluePoscode('pcode', 'name_unit_form', idPosCode, 'id_unit');
};



$(document).on('keyup','#text_box_name_unit_add_categoryQuestion',function () {
    var idPosCode = $('#text_box_name_unit_add_categoryQuestion').val();
    getvaluePoscode('name_unitCategoryQuestionAdd', 'name_unit_formCategoryQuestionAdd', idPosCode, 'id_unitcategoryquestion');

    if ($('#select_question_categoryAdd').children('option').length == 1) {
        var id = $('#name_unitCategoryQuestionAdd').attr('id_unitcategoryquestion').trim();
        if (id != '') {
            getCategoryByUnitAdd(id);
        }
    }
});


$(document).on('keyup','#text_box_name_unit_CategoryQuestion',function () {
    var idPosCode = $('#text_box_name_unit_CategoryQuestion').val();
    getvaluePoscode('name_unitCategoryQuestion', 'name_unit_formCategoryQuestion', idPosCode, 'id_unitCategoryQuestion');

    if ($('#select_question_category').children('option').length == 1) {
        var id = $('#name_unitCategoryQuestion').attr('id_unitcategoryquestion').trim();
        if (id != '') {
            getCategoryByUnit(id);
        }
    }
});


$(document).on('keyup','#text_box_name_unit_competion',function () {
        var idPosCode = $('#text_box_name_unit_competion').val();
    getvaluePoscode('name_unit', 'name_unit_form', idPosCode, 'id_unit');
});


function getvaluePoscode(nameunit, name_unit_form, idPosCode, attr_name) {
    if(!$.isNumeric(idPosCode) || idPosCode ==''){
        setTextNullForm(nameunit, name_unit_form, idPosCode, attr_name);
        return;
    }
    $.ajax({
        url: '/api/admin/treeunit/' + idPosCode + '/poscode',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '';

            if (res != null && idPosCode!='' ) {
                $('#' + name_unit_form).text(res.name);
                $('#' + nameunit).attr('name_unit', res.id);
                $('#' + nameunit).attr(attr_name, res.id);
                $('#text_box_name_unit_competion').attr('id_unit', res.id);
            } else {
                $('#' + name_unit_form).text("--Chọn đơn vị--");
                $('#' + nameunit).attr('name_unit', '');
                $('#' + nameunit).attr(attr_name, '');
                $('#text_box_name_unit_competion').attr('id_unit', '');
            }
        },
        error: function (res) {
            setTextNullForm();
        }
    });
}

function setTextNullForm(nameunit, name_unit_form, idPosCode, attr_name) {
    $('#' + name_unit_form).text("--Chọn đơn vị--");
    $('#' + nameunit).attr('name_unit', '');
    $('#' + nameunit).attr(attr_name, '');
    $('#text_box_name_unit_competion').attr('id_unit','');
}

function checkUnitCode(unitCode,idPerRoot) {
    if(idPerRoot==1 || idPerRoot==6 || idPerRoot==7 ) return true;
    unitCode = unitCode.split("-").join("");
    var numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;
    if(numberRegex.test(unitCode)) return true;
    return false;
}


