function showCometionCategorysParent() {
    $.ajax({
        url: '/api/admin/competitionCategory/parent',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            var row = '';
            $(res).each(function (index, item) {
                row += '<li>'
                if(item.checkHaveChilds==0){
                    row += '<span   id="id_cate_root_' + item.id + '"  id_cate_root="' + item.id + '" onclick="showChildCate(this)" class="carett">&nbsp;<i class="fas fa-bookmark text-success"></i>&nbsp;' + item.nameCompetition + '</span>'
                }else{
                    row += '<span   id="id_cate_root_' + item.id + '"  id_cate_root="' + item.id + '" onclick="showChildCate(this)" class="carett">&nbsp;<i class="far fa-dot-circle text-success"></i>&nbsp;' + item.nameCompetition + '</span>'
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
                        row += '<span    id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"   onclick="showChildCate(this)"  class="carett"><i class="fas fa-home text-warning"></i>&nbsp;' + items.nameCompetition + '</span>'
                    }else{
                        row += '<span   id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"   onclick="OnOffActive(this)" style="cursor: pointer"><i class="far fa-dot-circle"></i>&nbsp;<i class="fas fa-campground  text-warning"></i></i>&nbsp;' + items.nameCompetition + '</span>'
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
            showInforCate(idCateRoot,name_cate);
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

function  showChildCateStatusOn(btn) {
    var idCateRoot = $(btn).attr('id_cate_root');
    var name_cate = $(btn).text();

    $.ajax({
        url: '/api/admin/competitionCategory/' + idCateRoot + '/child/statusOn',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            var row = '';
            if (res != null) {
                $(res).each(function (index, items) {
                    row += '<li>'
                    if(items.level ==1){
                        row += '<span    id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"   onclick="showChildCateStatusOn(this)"  class="carett"><i class="fas fa-home text-warning"></i>&nbsp;' + items.nameCompetition + '</span>'
                    }else{
                        row += '<span   id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"   onclick="OnOffActive(this)" style="cursor: pointer"><i class="far fa-dot-circle"></i>&nbsp;<i class="fas fa-campground  text-warning"></i></i>&nbsp;' + items.nameCompetition + '</span>'
                    }
                    row += '<ul id="detail_item_cate' + items.id + '" class="nested">'
                    row += '</ul>'
                    row += '</ul>'
                    row += '</li>'
                });
            }

            $('#detail_item_cate' + idCateRoot).html(row);
            if($(btn).hasClass('carett-down')){$(btn).removeClass('carett-down')}
            else{$(btn).addClass('carett-down')}
            showInforCate(idCateRoot,name_cate);
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
    if($(btn).hasClass('carett-down')){$(btn).removeClass('carett-down')}
    else{$(btn).addClass('carett-down')}

    var idCateRoot = $(btn).attr('id_cate_root');
    var name_cate = $(btn).text();
    showInforCate(idCateRoot,name_cate);
    if($('#detail_item_cate'+idCateRoot +' ul').length>0){ activeCate(idCateRoot)};
}
function  showInforCate(idCate,name) {
    $('#name_cate').attr("id_cate", idCate);
  //  $('#name_position').val(name);
    $('#name_cate_show').text(name);

}

function showCometionCategorysParentStatusOn() {
    $.ajax({
        url: '/api/admin/competitionCategory/parent/statusOn',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            var row = '';
            $(res).each(function (index, item) {
                row += '<li>'
                if(item.checkHaveChilds==0){
                    row += '<span   id="id_cate_root_' + item.id + '"  id_cate_root="' + item.id + '" onclick="showChildCateStatusOn(this)" class="carett">&nbsp;<i class="fas fa-bookmark text-success"></i>&nbsp;' + item.nameCompetition + '</span>'
                }else{
                     row += '<span   id="id_cate_root_' + item.id + '"  id_cate_root="' + item.id + '" onclick="showChildCateStatusOn(this)" class="carett">&nbsp;<i class="far fa-dot-circle text-success"></i>&nbsp;' + item.nameCompetition + '</span>'
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


$('#select_list_test_kit_round').on('change', function () {
    selectTestRounds();
});

$('.clear_form').on('click',function () {
    $('#name_cate_show').html('--Chọn danh mục--');
    $('#name_cate').attr('id_cate','');
});
$('.clear_form_round').on('click',function () {
    $('#name_cate_show').html('--Chọn bộ đề--');
    $('#name_cate').attr('id_cate','');
});

function showTestCategorysParentStatusOn() {
    $.ajax({
        url: '/api/admin/test-kit/parent/statusOn',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            var row = '';
            $(res).each(function (index, item) {
                row += '<li>'
                if(item.checkHaveChilds==0){
                    row += '<span   id="id_cate_root_' + item.id + '"  id_cate_root="' + item.id + '" onclick="showChildCateTestStatusOn(this)" class="carett">&nbsp;<i class="fas fa-bookmark text-success"></i>&nbsp;' + item.nameTest + '</span>'
                }else{
                     row += '<span   id="id_cate_root_' + item.id + '"  id_cate_root="' + item.id + '" onclick="showChildCateTestStatusOn(this)" class="carett">&nbsp;<i class="far fa-dot-circle text-success"></i>&nbsp;' + item.nameTest + '</span>'
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

function showTestCategorysParent() {
    $.ajax({
        url: '/api/admin/test-kit/parent',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            var row = '';
            $(res).each(function (index, item) {
                row += '<li>'
                if(item.checkHaveChilds==0){
                    row += '<span   id="id_cate_root_' + item.id + '"  id_cate_root="' + item.id + '" onclick="showChildCateTest(this)" class="carett">&nbsp;<i class="fas fa-bookmark text-success"></i>&nbsp;' + item.nameTest + '</span>'
                }else{
                     row += '<span   id="id_cate_root_' + item.id + '"  id_cate_root="' + item.id + '" onclick="showChildCateTest(this)" class="carett">&nbsp;<i class="far fa-dot-circle text-success"></i>&nbsp;' + item.nameTest + '</span>'
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

function  showChildCateTest(btn) {
    var idCateRoot = $(btn).attr('id_cate_root');
    var name_cate = $(btn).text();
    $.ajax({
        url: '/api/admin/test-kit/' + idCateRoot + '/child',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            var row = '';
            if (res != null) {
                $(res).each(function (index, items) {
                    row += '<li>'
                    if(items.level ==1){
                        row += '<span    id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"   onclick="showChildCateTest(this)"  class="carett"><i class="fas fa-home text-warning"></i>&nbsp;' + items.nameTest + '</span>'
                    }else{
                        row += '<span   id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"   onclick="showChildCateTest(this)" style="cursor: pointer"><i class="far fa-dot-circle"></i>&nbsp;<i class="fas fa-campground  text-warning"></i></i>&nbsp;' + items.nameTest + '</span>'
                    }
                    row += '<ul id="detail_item_cate' + items.id + '" class="nested">'
                    row += '</ul>'
                    row += '</ul>'
                    row += '</li>'
                });
            }

            $('#detail_item_cate' + idCateRoot).html(row);
            if($(btn).hasClass('carett-down')){$(btn).removeClass('carett-down')}
            else{$(btn).addClass('carett-down')}
            showInforCate(idCateRoot,name_cate);
            if(row!=''){activeCate(idCateRoot)};
            if(!$('.form_cate_test_round').attr('id_cate')){
                $(btn).removeAttr("onclick");
                $(btn).attr('onclick', 'OnOffActive(this);');
            }

        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        },complete: function (data) {
            if( $('.form_cate_test_round').attr('id_cate')){
                $('.loader_roundtest').css("display", "block");
                selectTestRounds();
            };
        }
    });


}


function  showChildCateTestStatusOn(btn) {
    var idCateRoot = $(btn).attr('id_cate_root');
    var name_cate = $(btn).text();
    $.ajax({
        url: '/api/admin/test-kit/' + idCateRoot + '/child/statusOn',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            var row = '';
            if (res != null) {
                $(res).each(function (index, items) {
                    row += '<li>'
                    if(items.level ==1){
                        row += '<span    id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"   onclick="showChildCateTestStatusOn(this)"  class="carett"><i class="fas fa-home text-warning"></i>&nbsp;' + items.nameTest + '</span>'
                    }else{
                        row += '<span   id_cate_root=' + items.id + '  id="id_cate_root' + items.id + '"   onclick="showChildCateTestStatusOn(this)" style="cursor: pointer"><i class="far fa-dot-circle"></i>&nbsp;<i class="fas fa-campground  text-warning"></i></i>&nbsp;' + items.nameTest + '</span>'
                    }
                    row += '<ul id="detail_item_cate' + items.id + '" class="nested">'
                    row += '</ul>'
                    row += '</ul>'
                    row += '</li>'
                });
            }

            $('#detail_item_cate' + idCateRoot).html(row);
            if($(btn).hasClass('carett-down')){$(btn).removeClass('carett-down')}
            else{$(btn).addClass('carett-down')}
            showInforCate(idCateRoot,name_cate);
            if(row!=''){activeCate(idCateRoot)};
            if(!$('.form_cate_test_round').attr('id_cate')){
                $(btn).removeAttr("onclick");
                $(btn).attr('onclick', 'OnOffActive(this);');
            }

        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        },complete: function (data) {
            if( $('.form_cate_test_round').attr('id_cate')){
                $('.loader_roundtest').css("display", "block");
                selectTestRounds();
            };
        }
    });


}
