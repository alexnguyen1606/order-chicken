function show_list_candidate_cancel() {
    sameGetListCancel($('#number_pages_cancel').val());
    $('#show_list_candidate_cancel_id').removeAttr('onclick');
}

$('#id_page_left_cancel').on('click', function () {
    if ($('#number_pages_cancel').val() > 1) {
        var number_page = $('#number_pages_cancel').val() - 1;
        sameGetListCancel(number_page);
        $('#number_pages_cancel').val(number_page);
    }
});
$('#id_page_right_cancel').on('click', function () {
    var number_page = parseInt($('#number_pages_cancel').val()) + 1;
    if(number_page<(Math.ceil($('#count_record_cancel').attr('count')/13))+1) {
        sameGetListCancel(number_page);
        $('#number_pages_cancel').val(number_page);
    }else{
        alert("Không còn bản ghi dữ liệu");
    }
});
$('.btn_search_cancel_icon').on('click', function () {
    var number_page = 1;
    $('#number_pages_cancel').val(1);
    sameGetListCancel(number_page);
});

function sameGetListCancel(number_page) {
    var dataArray = setArrayDataCancel();
    getListCancel(dataArray, number_page)
}

function setArrayDataCancel() {
    var dataArray = {};
    if ($('#input_name_search_cancel').val() != '') {
        dataArray['searchValue'] = $('#input_name_search_cancel').val();
    }
    return dataArray;
}

function getListCancel(dataArray, number_page) {
    var id_round_test = $('#id_round_test').val();

    dataArray["page"] = number_page;
    dataArray["maxPageItems"] = 13;
    $.ajax({
        url: '/api/admin/cancel-result/list/' + id_round_test,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        data: JSON.stringify(dataArray),
        dataType: 'json',
        contentType: "application/json",
        beforeSend: function () {
            $('.loader_cancel').css("display", "block");
        },
        success: function (res) {
            $('.loader_cancel').css("display", "none");
            var size = res.length;
            var row = '';
            $(res[0]).each(function (i, item) {
                var day = new Date(item.user.birthday);
                row += '<tr>'
                row += '<td>'
                row += ((parseInt(number_page) - 1) * 13) + (parseInt(i) + 1)
                row += '</td>'
                row += '<td >' + item.user.fullName +" | "+ item.user.email +' | '+
                    item.user.username+' | Điểm:'+item.point +'</td>'
                row += '<td>' + item.content + '</td>'
                row += '<td>' + item.counttest  + '</td>'
                row += '<td>'+item.modifiedBy+'</td>'
                row += '<td>'+new Date(item.timeCreate).toLocaleString()+'</td>'
                row += '</tr>'
            });
            $('#count_record_cancel').text(formatNumber(res[1], '.', ',') + " Bản ghi dữ liệu");
            $('#count_record_cancel').attr('count',res[1]);
            $('#table_candidate_cancel_list').html(row);
        }
    });
}





