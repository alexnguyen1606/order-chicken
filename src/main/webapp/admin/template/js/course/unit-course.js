$(document).ready(function(){
    var numberOfUnit = 1;
   // console.log(numberOfUnit);
    $('#btn_add_unit_competion').click(function(){
        // console.log($('#list_unit_competion label').length);
        if ($('#list_unit_competion label').length > numberOfUnit) {
            numberOfUnit = $('#list_unit_competion label').length;
        }
        var row='';
        row+= '<div class="d-flex p-0 col-12">'
        row+=' <label id="label'+numberOfUnit+'"  class="col-md-3 col-form-label label-normal"></label>'
        row+='<div class="col-md-6" id="rowUnit'+numberOfUnit+'">'
        row+='<div class="dropdown" style="width: 100%">'
        row+='<div class="form_unit">'
        row+='<input name="idPoscodeCourse[]"  index="'+numberOfUnit+'"  type="text" id_unit="" value="" class="form-control class_box_id_unit" onkeyup="getNamePoscodeById(this)" id="text_box_name_unit_competion'+numberOfUnit+'" placeholder="Mã đơn vị">'
        row+='<input  type="hidden" id_unit="" name="email" class="form-control class_name_unit" id="name_unit'+numberOfUnit+'" placeholder="">'
        row+='<span id="name_unit">Đơn vị:<span class="class_name_unit_form" id="name_unit_form'+numberOfUnit+'">--Chưa có thông tin--<span></span></span></span>'
        row+='</div>'
        row+='<div class="dropdown-content showlistUnit'+numberOfUnit+'" style="width: 625px;">'
        row+='</div>'
        row+='</div>'
        row+='</div>'
        row+='<div class="col-md-2 class_remove'+numberOfUnit+'">'
        row+='<button id="'+numberOfUnit+'"  type="button" class=" btn_small_40 btn btn-block btn-outline-danger btn-sm remove_unit_competition" title="Xóa"><i class="fas fa-remove"></i></button>'
        row+='</div>'
        row+='</div>';
        $('#list_unit_competion').append(row);
        showUnitParentByid("showlistUnit"+numberOfUnit,numberOfUnit);
        numberOfUnit++;
    });
    $(document).on('click', '.remove_unit_competition', function(){
        var button_id = $(this).attr("id");
        $('#rowUnit'+button_id+'').remove();
        $('#label'+button_id+'').remove();
        $('.class_remove'+button_id+'').remove();
    });

});

function  showUnitParentByid(classIaddpen,i) {
    $.ajax({
        url: '/api/admin/treeunit/parent',
        headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '';
            $(res).each(function (index, item) {
                row += '<li>'
                row += '<span  code_unit="'+item.unitCode+'"   index="'+i+'" id="id_pers_root_'+item.id+'" id_pers_root'+i+'="'+item.id+'" onclick="showChildRootAppend(this)" class="carett">&nbsp;<i class="far fa-building text-success"></i>&nbsp;'+item.name+'</span>'
                row += '<ul id="detail_item_'+i+'_'+item.id+'" class="nested">'
                row += '</ul>'
                row += '</li>'
            });
            $('.'+classIaddpen).html(row);
        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}


function showChildRootAppend(btn) {
    var i=$(btn).attr('index');
    var idPerRoot=$(btn).attr('id_pers_root'+i);
    var name_poscode = $(btn).text();
    var codeUnit = $(btn).attr('code_unit')=='null'?'':$(btn).attr('code_unit');

    $.ajax({
        url: '/api/admin/treeunit/'+idPerRoot+'/childRound',
        headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row='';
            if (res != null) {
                $(res).each(function (index, items) {
                    row += '<li>'
                    if(items.status ==1){
                        row += '<span  code_unit="'+items.unitCode+'" index="'+i+'" id_pers_root'+i+'="'+items.id+'"  id="id_pers_root_' + items.id + '"   onclick="showChildRootAppend(this)"  class="carett"><i class="fas fa-home text-warning"></i>&nbsp;' + items.name + '</span>'
                    }else{
                        row += '<span  code_unit="'+items.unitCode + '" index="'+i+'" id_pers_root'+i+'="'+items.id+'"  id="id_pers_root_' + items.id + '"   onclick="showChildRootAppend(this)" style="cursor: pointer"><i class="far fa-dot-circle"></i>&nbsp;<i class="fas fa-campground  text-warning"></i></i>&nbsp;' + items.name + '</span>'
                    }
                    row+='<ul id="detail_item_'+i+'_'+items.id+'" class="nested"  >'
                    row+='</ul>'
                    row+='</ul>'
                    row+='</li>'
                });
            }


            $('#detail_item_'+i+'_'+idPerRoot).html(row);
            if(checkUnitCode(codeUnit)) {showPoscodeRootCompetiton(idPerRoot,name_poscode,codeUnit,i)};
            checkRoot2Conpetition(idPerRoot,i);
            $(btn).removeAttr("onclick");
            $(btn).attr('onclick', 'OnOffRoot2Competition(this);');
        },
        error: function(res){
            console.log(res);
            alert(console.log(res));
        }
    });




}
function checkRoot2Conpetition(id,i){

    if( $('#detail_item_'+i+'_'+id).hasClass('activee')){
        $('#detail_item_'+i+'_'+id).removeClass('activee');


    }else{
        $('#detail_item_'+i+'_'+id).addClass('activee');

    }

}

function OnOffRoot2Competition(btn){
    var i=$(btn).attr('index');
    var idPerRoot=$(btn).attr('id_pers_root'+i);
    var name_poscode = $(btn).text();
    var codeUnit = $(btn).attr('code_unit')=='null'?'':$(btn).attr('code_unit');
    if(checkUnitCode(codeUnit)) {showPoscodeRootCompetiton(idPerRoot,name_poscode,codeUnit,i)};

    checkRoot2Conpetition(idPerRoot,i);

}

function showPoscodeRootCompetiton(id,name_poscode,codeUnit,i){
    // var id = $(btn).attr('id_poscode_root');
    // var i = $(btn).attr('index');


   // var name = $(btn).text();
    $('#name_unit'+i).attr("id_unit",id);
    $('#name_position'+i).val(name_poscode);
    $('#name_unit_form'+i).text(name_poscode);
    $('#pcode').val(id);
    $('#text_box_name_unit_competion'+i).val(codeUnit);
    $('#text_box_name_unit_competion_list'+i).val(codeUnit);
    $('#text_box_name_unit_competion'+i).attr('id_unit',id);
    $('#text_box_name_unit'+i).val(codeUnit);

}