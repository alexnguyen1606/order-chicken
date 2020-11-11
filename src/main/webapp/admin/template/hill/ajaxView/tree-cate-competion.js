function showCometionCategorysParentEditTree() {
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
            $('#updateStatus').prop( "disabled", true );
            $('.deleteCategory').prop( "disabled", true );
            $('.loader').css("display", "none");
            var row = '';
            $(res).each(function (index, item) {
                row += '<li>'
                if(item.checkHaveChilds==0){
                    if(item.status ==0){
                        row += '<span   id="id_cate_root_tree' + item.id + '"  id_cate_root="' + item.id + '" onclick="showChildCateTree(this)" class="carett">&nbsp;<i title="Mở" class="fas fa-bookmark text-success"></i>&nbsp;' + item.nameCompetition + '</span>'
                    }else{
                        row += '<span   id="id_cate_root_tree' + item.id + '"  id_cate_root="' + item.id + '"  class="carett">&nbsp;<i title="Khóa" class="fas fa-bookmark text-warning"></i>&nbsp;' + item.nameCompetition + '</span>'
                    }
                  //  row += '&nbsp;<input type="checkbox" value="' + item.id + '"  class="check-box-element" name="checkList"  id="checkbox_' + item.id + '"/>'
                }else{
                    if(item.status ==0){
                        row += '<span   id="id_cate_root_tree' + item.id + '"  id_cate_root="' + item.id + '" onclick="showChildCateTree(this)" class="carett">&nbsp;<i title="Mở" class="far fa-dot-circle text-success"></i>&nbsp;' + item.nameCompetition + '</span>'
                    }else{
                        row += '<span   id="id_cate_root_tree' + item.id + '"  id_cate_root="' + item.id + '"   class="carett">&nbsp;<i title="Khóa" class="far fa-dot-circle text-warning"></i>&nbsp;' + item.nameCompetition + '</span>'
                    }
                  //  row += '&nbsp;<input type="checkbox" value="' + item.id + '"  class="check-box-element" name="checkList"  id="checkbox_' + item.id + '"/>'
                }
                row += '<ul id="detail_item_cate_tree' + item.id + '" class="nested">'
                row += '</ul>'
                row += '</li>'
            });
            $('.showlistCateTree').html(row);

        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}

function  showChildCateTree(btn) {
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
                            row += '<span    id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"   onclick="showChildCateTree(this)"  class="carett"><i title="Mở" class="fas fa-home text-success"></i>&nbsp;' + items.nameCompetition + '</span>'
                        }else{
                            row += '<span    id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"      class="carett"><i title="Khóa" class="fas fa-home text-warning"></i>&nbsp;' + items.nameCompetition + '</span>'
                        }
                      //  row += '&nbsp;<input type="checkbox" value="' + items.id + '"  class="check-box-element" name="checkList"  id="checkbox_' + items.id + '"/>'
                    }else{
                        if(items.status==0){
                            row += '<span   id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"   onclick="OnOffActiveTree(this)" style="cursor: pointer"><i title="Mở" class="far fa-dot-circle text-success"></i>&nbsp;</i>&nbsp;' + items.nameCompetition + '</span>'
                        }else{
                            row += '<span   id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"     style="cursor: pointer"><i title="Khóa" class="far fa-dot-circle text-warning"></i>&nbsp;</i>&nbsp;' + items.nameCompetition + '</span>'
                        }
                    //    row += '&nbsp;<input type="checkbox" value="' + items.id + '"  class="check-box-element" name="checkList"  id="checkbox_' + items.id + '"/>'
                    }
                    row += '<ul id="detail_item_cate_tree' + items.id + '" class="nested">'
                    row += '</ul>'
                    row += '</ul>'
                    row += '</li>'
                });
            }

            if($(btn).hasClass('carett-down')){$(btn).removeClass('carett-down')}
            else{$(btn).addClass('carett-down')}

            $('#detail_item_cate_tree' + idCateRoot).html(row);
            showInforCateTree(idCateRoot,name_cate)
            if(row!=''){activeCateTree(idCateRoot)};
            $(btn).removeAttr("onclick");
            $(btn).attr('onclick', 'OnOffActiveTree(this);');
        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}


function activeCateTree(id) {
    if ($('#detail_item_cate_tree' + id).hasClass('activee')) {
        $('#detail_item_cate_tree' + id).removeClass('activee');
    } else {
        $('#detail_item_cate_tree' + id).addClass('activee');
    }
}


$('.clear_form').on('click',function () {
    clear_from();
});

function  clear_from() {
    $('#name_cate_show').html('--Chọn danh mục--');
    $('#name_cate_tree').attr('id_cate','');
}

function OnOffActiveTree(btn) {
    if($(btn).hasClass('carett-down')){$(btn).removeClass('carett-down')}
    else{$(btn).addClass('carett-down')}

    var idCateRoot = $(btn).attr('id_cate_root');
    var name_cate = $(btn).text();
    showInforCateTree(idCateRoot,name_cate);
    if($('#detail_item_cate_tree'+idCateRoot +' ul').length>0){ activeCateTree(idCateRoot)};
}

function   showInforCateTree(idCate,nameParent){
    if(idCate){
        $('#name_cate_tree').attr("id_cate", idCate);
    }else{
        $('#name_cate_tree').attr("id_cate",'');
    }

    if(nameParent){
        $('#name_cate_show').text(nameParent);
    }else{
        $('#name_cate_show').html('--Chọn danh mục--');
    }

}


function  selectCategoryCompetition(btn) {
    $('.showlistCateTree').toggleClass('show');
}