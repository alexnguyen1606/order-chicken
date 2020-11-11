function showUnitParentCategory() {
    $.ajax({
        url: '/api/admin/treeunit/parent',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '';
            $(res).each(function (index, item) {
                row += '<li>'
                row += '<span  code_unit="'+item.unitCode+'" id="id_pers_root_' + item.id + '" id_pers_root="' + item.id + '" onclick="showChildRootCategoryQuestion(this)" class="carett">&nbsp;<i class="far fa-building text-success"></i>&nbsp;' + item.name + '</span>'

                row += ' <ul id="detail_item_CategoryQuestion' + item.id + '" class="nested">'

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


function showUnitParentCandidates() {
    $.ajax({
        url: '/api/admin/treeunit/parent',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '';
            $(res).each(function (index, item) {
                row += '<li>'
                row += '<span  code_unit="'+item.unitCode+'" id="id_pers_root_' + item.id + '" id_pers_root="' + item.id + '" onclick="showChildRootAddCadidate(this)" class="carett">&nbsp;<i class="far fa-building text-success"></i>&nbsp;' + item.name + '</span>'

                row += ' <ul id="detail_item_CandidateAdd' + item.id + '" class="nested">'

                row += '</ul>'
                row += '</li>'
            });
            $('.showlistUnitCandidates').html(row);
        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}



