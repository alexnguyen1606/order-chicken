function OnOffRootCadidateRound(btn) {
    var id = $(btn).attr('id_pers_root');
    setValueUnitCadidateRound(btn);
    checkRootCadidateRound(id);
}


function checkRootCadidateRound(id) {
    if ($('#detail_item_CandidateAdd' + id).hasClass('activee')) {
        $('#detail_item_CandidateAdd' + id).removeClass('activee');
    } else {
        $('#detail_item_CandidateAdd' + id).addClass('activee');
    }
}

function checkChildCadidateRound(id) {
    if ($('#action_item_CandidateAdd' + id).hasClass('activee')) {
        $('#action_item_CandidateAdd' + id).removeClass('activee');
    } else {
        $('#action_item_CandidateAdd' + id).addClass('activee');
    }
}


function setValueUnitCadidateRound(btn) {
    var id = $(btn).attr('id_pers_root');
    var name = $(btn).text();
    $('#name_unitCadidateRound').attr("id_unitCategoryQuestion", id);
    $('#name_positionCadidateRound').val(name);
    $('#name_unit_formCadidateRound').text(name);
}

function showChildRootAddCadidate(btn) {
    var idPerRoot = $(btn).attr('id_pers_root');
    var name_poscode = $(btn).text();
    var codeUnit = $(btn).attr('code_unit')=='null'?'':$(btn).attr('code_unit');

    $.ajax({
        url: '/api/admin/treeunit/'+idPerRoot+'/childRound',
        headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '';
            if (res != null) {
                $(res).each(function (index, items) {
                    row += '<li>'
                    if(items.status ==1){
                        row += '<span  code_unit="' + items.unitCode + '"  id_pers_root=' + items.id + '  id="id_pers_root_' + items.id + '"   onclick="showChildRootAddCadidate(this)"  class="carett"><i class="fas fa-home text-warning"></i>&nbsp;' + items.name + '</span>'
                    }else{
                        row += '<span  code_unit="' + items.unitCode + '" id_pers_root=' + items.id + '  id="id_pers_root_' + items.id + '"   onclick="showChildRootAddCadidate(this)" style="cursor: pointer"><i class="far fa-dot-circle"></i>&nbsp;<i class="fas fa-campground  text-warning"></i></i>&nbsp;' + items.name + '</span>'
                    }
                    row+='<ul id="detail_item_CandidateAdd'+items.id+'" class="nested"  >'

                    row+='</ul>'
                    row+='</ul>'
                    row+='</li>'
                });
            }

            $('#detail_item_CandidateAdd'+idPerRoot).html(row);
            if($(btn).hasClass('carett-down')){$(btn).removeClass('carett-down')}
            else{$(btn).addClass('carett-down')}
            showPoscodeRootCadidateRound(idPerRoot,name_poscode,codeUnit);
            $(btn).removeAttr("onclick");
            checkRootCadidateRound(idPerRoot);
            $(btn).attr('onClick', 'OnOffRoot2CadidateRound(this);');
        },
        error: function(res){
            console.log(res);
            alert(console.log(res));
        }
    });
}
function  checkPermissionRootTCT(btn) {
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
                $('#name_unitCadidateRound').attr("id_unitCategoryQuestion", idPerRoot);
                $('#name_positionCadidateRound').val(name_poscode);
                $('#name_unit_formCadidateRound').text(name_poscode);
                $('#text_box_name_unit_add_candidate').val(codeUnit);
            }
        },
        error: function (res) {
            console.log(res);
            //alert(console.log(res));
        }
    });
}




function showPoscodeRootCadidateRound(id,name_poscode,codeUnit) {
    // var id = $(btn).attr('id_poscode_root');
    // var name = $(btn).text();
    $('#name_unitCadidateRound').attr("id_unitCategoryQuestion", id);
    $('#name_positionCadidateRound').val(name_poscode);
    $('#name_unit_formCadidateRound').text(name_poscode);
    $('#text_box_name_unit_add_candidate').val(codeUnit);
}

function OnOffRoot2CadidateRound(btn) {
    if($(btn).hasClass('carett-down')){$(btn).removeClass('carett-down')}
    else{$(btn).addClass('carett-down')}
    var idPerRoot = $(btn).attr('id_pers_root');
    var name_poscode = $(btn).text();
    var codeUnit = $(btn).attr('code_unit')=='null'?'':$(btn).attr('code_unit');
   // if(idPerRoot==1) checkPermissionRootTCT(btn);
    if(checkUnitCode(codeUnit,idPerRoot)) {showPoscodeRootCadidateRound(idPerRoot,name_poscode,codeUnit)};
    checkRootCadidateRound(idPerRoot);
}
