$(function () {
    //Enable check and uncheck all functionality
    $('.checkbox-toggle').click(function () {
        var clicks = $(this).data('clicks')
        if (clicks) {
            //Uncheck all checkboxes
            $('.mailbox-messages input[type=\'checkbox\']').prop('checked', false)
            $('.checkbox-toggle .far.fa-check-square').removeClass('fa-check-square').addClass('fa-square')
        } else {
            //Check all checkboxes
            $('.mailbox-messages input[type=\'checkbox\']').prop('checked', true)
            $('.checkbox-toggle .far.fa-square').removeClass('fa-square').addClass('fa-check-square')
        }
        $(this).data('clicks', !clicks)
    })

    //Handle starring for glyphicon and font awesome
    $('.mailbox-star').click(function (e) {
        e.preventDefault()
        //detect type
        var $this = $(this).find('a > i')
        var glyph = $this.hasClass('glyphicon')
        var fa = $this.hasClass('fa')
        //Switch states
        if (glyph) {
            $this.toggleClass('glyphicon-star')
            $this.toggleClass('glyphicon-star-empty')
        }
        if (fa) {
            $this.toggleClass('fa-star')
            $this.toggleClass('fa-star-o')
        }
    })
})

function OnOffRoot(btn) {
    var id = $(btn).attr('id_pers_root');
    //alert('clear');
    setValueUnit(btn);
    checkRoot(id);
}

function OnOffRoot2(btn) {
    if($(btn).hasClass('carett-down')){$(btn).removeClass('carett-down')}
    else{$(btn).addClass('carett-down')}

    var idPerRoot = $(btn).attr('id_pers_root');
    var name_poscode = $(btn).text();
    var codeUnit = $(btn).attr('code_unit')=='null'?'':$(btn).attr('code_unit');

    var id = $(btn).attr('id_pers_root');
   // if(idPerRoot==1) checkPermissionRootCommon(btn);
 if(checkUnitCode(codeUnit,idPerRoot)) {showPoscodeRoot(idPerRoot,name_poscode,codeUnit)};
    checkRoot(id);
}

function checkRoot(id) {
    if ($('#detail_item_' + id).hasClass('activee')) {
        $('#detail_item_' + id).removeClass('activee');
    } else {
        $('#detail_item_' + id).addClass('activee');
    }
}

function OnOffChild(btn) {
    // alert('clear');
    var id = $(btn).attr('id_detail_pers_root');
    checkChild(id);
}

function checkChild(id) {
    if ($('#action_item_' + id).hasClass('activee')) {
        $('#action_item_' + id).removeClass('activee');
    } else {
        $('#action_item_' + id).addClass('activee');
    }
}

function showPoscodeRoot(id,name_poscode,codeUnit) {
    // var id = $(btn).attr('id_poscode_root');
    //var name = $(btn).text();
    $('#name_unit').attr("id_unit", id);
    $('#name_position').val(name_poscode);
    $('#name_unit_form').text(name_poscode);
    $('#pcode').val(codeUnit);
    $('#pcode').attr('id_unit', id);
    $('#idUnit').val(id);
    $('#text_box_name_unit_competion').val(codeUnit);
    $('#text_box_name_unit_competion').attr('id_unit', id);
    $('#text_box_name_unit_competion_list').val(codeUnit);
    $('#text_box_name_unit').val(codeUnit);
}

function setValueUnit(btn) {
    var id = $(btn).attr('id_pers_root');
    var name = $(btn).text();
    $('#name_unit').attr("id_unit", id);
    $('#name_position').val(name);
    $('#name_unit_form').text(name);
    $('#unitCode').val(id);

}

function  checkPermissionRootCommon(btn) {
    var idPerRoot = $(btn).attr('id_pers_root');
    var codeUnit = $(btn).attr('code_unit')=='null'?'':$(btn).attr('code_unit');

    $.ajax({
        url: '/api/admin/user/check/' + idPerRoot,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            if(res) {
                var name_poscode = $(btn).text();
                $('#pcode').attr("id_unit", idPerRoot);
                // $('#name_positionCadidateRound').val(name_poscode);
                $('#name_unit_form').text(name_poscode);
                $('#pcode').val(codeUnit);
                $('#name_unit').attr("id_unit", idPerRoot);
                $('#text_box_name_unit_competion_list').attr('id_unit',idPerRoot);
                $('#text_box_name_unit_competion_list').val(codeUnit);
                $('#text_box_name_unit_competion').attr('id_unit',idPerRoot);
                $('#text_box_name_unit_competion').val(codeUnit);
            }

        },
        error: function (res) {
            console.log(res);
            //alert(console.log(res));
        }
    });
}