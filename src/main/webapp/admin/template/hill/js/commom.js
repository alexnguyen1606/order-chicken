function showChildRoot(btn) {
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
                        row += '<span  code_unit="' + items.unitCode + '"  id_pers_root=' + items.id + '  id="id_pers_root_' + items.id + '"   onclick="showChildRoot(this)"  class="carett"><i class="fas fa-home text-warning"></i>&nbsp;' + items.name + '</span>'
                    }else{
                        row += '<span  code_unit="' + items.unitCode + '" id_pers_root=' + items.id + '  id="id_pers_root_' + items.id + '"   onclick="showChildRoot(this)" style="cursor: pointer"><i class="far fa-dot-circle"></i>&nbsp;<i class="fas fa-campground  text-warning"></i></i>&nbsp;' + items.name + '</span>'
                    }
                    row += '<ul id="detail_item_' + items.id + '" class="nested">'
                    row += '</ul>'
                    row += '</ul>'
                    row += '</li>'
                });
            }
            $('#detail_item_' + idPerRoot).html(row);
         //   if(idPerRoot==1)checkPermissionRootCommon(btn);
           if(checkUnitCode(codeUnit,idPerRoot)) {showPoscodeRoot(idPerRoot,name_poscode,codeUnit)};
            checkRoot(idPerRoot);
            $(btn).removeAttr("onclick");
            $(btn).attr('onclick', 'OnOffRoot2(this);');
            if($(btn).hasClass('carett-down')){$(btn).removeClass('carett-down')}
            else{$(btn).addClass('carett-down')}
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
                row += '<span  code_unit="'+item.unitCode+'" id="id_pers_root_' + item.id + '" id_pers_root="' + item.id + '" onclick="showChildRoot(this)" class="carett">&nbsp;<i class="far fa-building text-success"></i>&nbsp;' + item.name + '</span>'
                row += '<ul id="detail_item_' + item.id + '" class="nested">'
                row += '</ul>'
                row += '</li>'
            });
            $('.showlistUnitCategory').html(row);

        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}




