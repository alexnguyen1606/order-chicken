function showCometionCategorysParentEdit() {
    $.ajax({
        url: '/api/admin/competitionCategory/parent',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
            $('.loader').css("display", "block");
            //$('.loader').css("background")
        },
        success: function (res) {
            showCometionCategorysParentEditTree();
            $('#updateStatus').prop( "disabled", true );
            $('.deleteCategory').prop( "disabled", true );
            $('.loader').css("display", "none");
            var row = '';
            $(res).each(function (index, item) {
                row += '<li>'
                if(item.checkHaveChilds==0){
                    if(item.status ==0){
                        row += '<span   id="id_cate_root_' + item.id + '"  id_cate_root="' + item.id + '" onclick="showChildCate(this)" class="carett">&nbsp;<i title="Mở" class="fas fa-bookmark text-success"></i>&nbsp;' + item.nameCompetition + '</span>'
                    }else{
                        row += '<span   id="id_cate_root_' + item.id + '"  id_cate_root="' + item.id + '" onclick="showChildCate(this)" class="carett">&nbsp;<i title="Khóa" class="fas fa-bookmark text-warning"></i>&nbsp;' + item.nameCompetition + '</span>'
                    }
                    row += '&nbsp;<input type="checkbox" value="' + item.id + '"  class="check-box-element" name="checkList"  id="checkbox_' + item.id + '"/>'
                }else{
                    if(item.status ==0){
                        row += '<span   id="id_cate_root_' + item.id + '"  id_cate_root="' + item.id + '" onclick="showChildCate(this)" class="carett">&nbsp;<i title="Mở" class="far fa-dot-circle text-success"></i>&nbsp;' + item.nameCompetition + '</span>'
                    }else{
                        row += '<span   id="id_cate_root_' + item.id + '"  id_cate_root="' + item.id + '" onclick="showChildCate(this)" class="carett">&nbsp;<i title="Khóa" class="far fa-dot-circle text-warning"></i>&nbsp;' + item.nameCompetition + '</span>'
                    }
                    row += '&nbsp;<input type="checkbox" value="' + item.id + '"  class="check-box-element" name="checkList"  id="checkbox_' + item.id + '"/>'
                }
                row += '<ul id="detail_item_cate' + item.id + '" class="nested">'
                row += '</ul>'
                row += '</li>'
            });
            $('.showlistCate').html(row);

        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}

function  showChildCate(btn) {
    var idCateRoot = $(btn).attr('id_cate_root');
    var name_cate = $(btn).text();


    $.ajax({
        url: '/api/admin/competitionCategory/' + idCateRoot + '/child',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            var row = '';
            if (res != null) {
                $(res).each(function (index, items) {
                    row += '<li>'
                    if(items.level ==1){
                        if(items.status==0){
                            row += '<span    id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"   onclick="showChildCate(this)"  class="carett"><i title="Mở" class="fas fa-home text-success"></i>&nbsp;' + items.nameCompetition + '</span>'
                        }else{
                            row += '<span    id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"   onclick="showChildCate(this)"  class="carett"><i title="Khóa" class="fas fa-home text-warning"></i>&nbsp;' + items.nameCompetition + '</span>'
                        }
                        row += '&nbsp;<input type="checkbox" value="' + items.id + '"  class="check-box-element" name="checkList"  id="checkbox_' + items.id + '"/>'
                    }else{
                        if(items.status==0){
                            row += '<span   id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"   onclick="OnOffActive(this)" style="cursor: pointer"><i title="Mở" class="far fa-dot-circle text-success"></i>&nbsp;</i>&nbsp;' + items.nameCompetition + '</span>'
                        }else{
                            row += '<span   id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"   onclick="OnOffActive(this)" style="cursor: pointer"><i title="Khóa" class="far fa-dot-circle text-warning"></i>&nbsp;</i>&nbsp;' + items.nameCompetition + '</span>'
                        }
                        row += '&nbsp;<input type="checkbox" value="' + items.id + '"  class="check-box-element" name="checkList"  id="checkbox_' + items.id + '"/>'
                    }
                    row += '<ul id="detail_item_cate' + items.id + '" class="nested">'
                    row += '</ul>'
                    row += '</ul>'
                    row += '</li>'
                });
            }

            if($(btn).hasClass('carett-down')){$(btn).removeClass('carett-down')}
            else{$(btn).addClass('carett-down')}

            $('#detail_item_cate' + idCateRoot).html(row);
            editCategoryTest(btn);
            if(row!=''){activeCate(idCateRoot)};
            $(btn).removeAttr("onclick");
            $(btn).attr('onclick', 'OnOffActive(this);');
        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}


function activeCate(id) {
    if ($('#detail_item_cate' + id).hasClass('activee')) {
        $('#detail_item_cate' + id).removeClass('activee');
    } else {
        $('#detail_item_cate' + id).addClass('activee');
    }
}

function OnOffActive(btn) {
    editCategoryTest(btn);
    if($(btn).hasClass('carett-down')){$(btn).removeClass('carett-down')}
    else{$(btn).addClass('carett-down')}

    var idCateRoot = $(btn).attr('id_cate_root');
    var name_cate = $(btn).text();
    if($('#detail_item_cate'+idCateRoot +' ul').length>0){ activeCate(idCateRoot)};
}