function OnOffRootCategoryQuestionAdd(btn) {

    var id = $(btn).attr('id_pers_root');

    //alert('clear');
    setValueUnitCategoryQuestion(btn);

    checkRootCategoryQuestion(id);

}

function OnOffRoot2CategoryQuestionAdd(btn) {
    if($(btn).hasClass('carett-down')){$(btn).removeClass('carett-down')}
    else{$(btn).addClass('carett-down')}
    var id = $(btn).attr('id_pers_root');
    checkRootCategoryQuestionAdd(id);
     // if(id==1)checkPermissionRootCadidate(btn);
}
function  checkPermissionRootCadidate(btn) {
    var idPerRoot=$(btn).attr('id_pers_root');
    $.ajax({
        url: '/api/admin/questioncategory/check/' + idPerRoot,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {

            if(res.length>0){
                var  row = ' <option disabled selected="selected" value="0">[Chọn thư mục]</option>';
                if (res != null) {
                    $(res).each(function (index, items) {
                        row += '<option   value="' + items.id + '">' + items.nameCategory + '</option>';
                    });
                }
                $('#select_question_category').html(row);



                var name = $(btn).text();
                $('#name_unitCategoryQuestion').attr("id_unitCategoryQuestion", idPerRoot);
                $('#name_positionCategoryQuestion').val(name);
                $('#name_unit_formCategoryQuestion').text(name);
            }
        },
        error: function (res) {
            console.log(res);
            //alert(console.log(res));
        }
    });

}





function checkRootCategoryQuestionAdd(id) {
    if ($('#detail_item_CategoryQuestionAdd' + id).hasClass('activee')) {
        $('#detail_item_CategoryQuestionAdd' + id).removeClass('activee');
    } else {
        $('#detail_item_CategoryQuestionAdd' + id).addClass('activee');
    }
}

function getCategoryByUnitAdd(idPerRoot) {
    $.ajax({
        url: '/api/admin/questioncategory/' + idPerRoot,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            row = ' <option disabled selected="selected" value="0">[Chọn thư mục]</option>';
            if (res != null) {
                $(res).each(function (index, items) {
                    row += '<option   value="' + items.id + '">' + items.nameCategory + '</option>';
                });


            }
            $('#select_question_categoryAdd').html(row);


        },
        error: function (res) {
            console.log(res);
            // alert(console.log(res));
        }
    });

}


function checkChildCategoryQuestion(id) {
    if ($('#action_item_CategoryQuestion' + id).hasClass('activee')) {
        $('#action_item_CategoryQuestion' + id).removeClass('activee');

    } else {
        $('#action_item_CategoryQuestion' + id).addClass('activee');
    }
}

function showPoscodeRootCategoryQuestionAdd(id, name_poscode, codeUnit) {
    $('#name_unitCategoryQuestionAdd').attr("id_unitCategoryQuestion", id);
    $('#name_positionCategoryQuestionAdd').val(name_poscode);
    $('#name_unit_formCategoryQuestionAdd').text(name_poscode);
    $('#text_box_name_unit_add_categoryQuestion').val(codeUnit);

    getCategoryByUnitAdd(id);

}


$('#text_box_name_unit_add_categoryQuestion').change(function () {
    getCategoryByUnitAdd($('#text_box_name_unit_add_categoryQuestion').val());
});