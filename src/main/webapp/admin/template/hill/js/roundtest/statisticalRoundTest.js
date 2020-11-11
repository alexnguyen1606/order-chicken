function show_list_candidate_statistical() {
    sameGetListstatistical($('#number_pages_statistical').val());
    $('#show_list_candidate_statistical_id').removeAttr('onclick');
};

$('#id_page_left_statistical').on('click', function () {
    if ($('#number_pages_statistical').val() > 1) {
        var number_page = $('#number_pages_statistical').val() - 1;
        sameGetListstatistical(number_page);
        $('#number_pages_statistical').val(number_page);

    }
});
$('#id_page_right_statistical').on('click', function () {
    var number_page = parseInt($('#number_pages_statistical').val()) + 1;
    if(number_page<(Math.ceil($('#count_record_statistical').attr('count')/13))+1) {
        sameGetListstatistical(number_page);
        $('#number_pages_statistical').val(number_page);
    }else{
        alert("Không còn bản ghi dữ liệu");
    }
});

$('.btn_search_icon_statistical').on('click', function () {

    var number_page = 1;
    $('#number_pages_statistical').val(1);
    sameGetListstatistical(number_page);

});

function sameGetListstatistical(number_page) {
    var dataArray = setArrayDatastatistical();
    getListstatistical(dataArray, number_page)
}

function setArrayDatastatistical() {
    var dataArray = {};
    if ($('#input_name_statistical_search').val() != '') {
        dataArray['nameUser'] = $('#input_name_statistical_search').val();
    }
    if ($('#id_status_statistical_member').val() != '') {
        dataArray['idStatusTestMember'] = $('#id_status_statistical_member').val();
    }

    return dataArray;
}

function getListstatistical(dataArray, number_page) {
    var id_round_test = $('#id_round_test').val();
    //var id_struct_detail=$('#id_struct_detail').val();
    dataArray["page"] = number_page;
    dataArray["maxPageItems"] = 13;
    $.ajax({
        url: '/api/admin/candidate/statistical/list/' + id_round_test,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        data: JSON.stringify(dataArray),
        dataType: 'json',
        contentType: "application/json",
        beforeSend: function () {
            $('.loader_statistical').css("display", "block");
            //$('.loader').css("background")
        },
        success: function (res) {
            $('.loader_statistical').css("display", "none");
            var size = res.length;
            var row = '';
            $(res[0]).each(function (i, item) {
                var day = new Date(item.user.birthday);
                row += '<tr>'
                row += '<td>'
                row += ((parseInt(number_page) - 1) * 13) + (parseInt(i) + 1)
                row += '</td>'
                row += '<td>'
                row += '<div   >';
                row += '<b>' + item.user.fullName + '</b>';
                row += '</div>';
                row += '<div  >';
                row += '<span>' + item.user.username + '&nbsp;| &nbsp;' + item.user.email + '</span>';
                row += '</div>';
                row += '</td>';

                if (item.counttest != 0) {
                    row += '<td>'
                    if (item.status == 0) {
                        row += '<span class="badge bg-primary">Đạt</span>'
                    } else {
                        row += '<span class="badge bg-danger">Chưa Đạt</span>'
                    }
                    row += '</td>'
                    row += '<td>'
                    row += '<div class="font-origin" >';
                    row += '<span>Số lần thi:&nbsp; ' + item.counttest + '</span>';
                    row += '</div>';
                    row += '<div class="font-origin" >';
                    var mediumPoint = parseFloat(item.mediumPoint).toFixed(2);
                    row += '<span>Điểm trung bình:&nbsp; ' + mediumPoint + '</span>';
                    row += '</div>';
                    row += '<div class="font-blue-steel" >';
                    row += '<span>Điểm cao nhất:&nbsp; ' + item.maxPoint + '</span>';
                    row += '</div>';
                    row += '<div class="font-blue-steel" >';
                    var result = (item.maxPoint/item.sumPoint)*100;
                    if(!result){
                        result=0;
                    }
                    var persentQuestion = (item.result/item.totalQuestion)*100;
                    if(!persentQuestion){
                        persentQuestion=0;
                    }
                    row += '<span>Tỉ lệ điểm:&nbsp; ' + result.toFixed(2) + '%</span>';
                    row += '<p>Tỉ lệ đáp án đúng:&nbsp; ' + persentQuestion.toFixed(2) + '%</p>';
                    row += '</div>';
                    row += '</td>';
                    row += '<td>';
                    $(item.candidateCountCustomDTOS).each(function (index, items) {
                        var timestamp = items.timeStart;
                        var time_start = moment(timestamp).format('DD-MM-YYYY h:mm:ss A');

                        row += '<div >';
                        row += '<span>Lần ' + items.countTime + '&nbsp;,Lúc&nbsp;' + time_start + ',&nbsp;Điểm&nbsp;' + items.point + '</span>&nbsp;&nbsp;<a href="/admin/detail/roundtest/result/' + item.user.id + '/' + items.countTime + '/' + id_round_test + '">' +
                            ' <i title="Xem chi tiết"  class="class_icon_see_detail far fa-eye"></i></a>';
                        if(index== item.candidateCountCustomDTOS.length-1){
                            row += '&nbsp;<a id_user="'+item.user.id+'" countTime="'+items.countTime+'" style="color:  red" onclick="destroyResult(this)"><i title="Hủy kết quả thi"  class="fa fa-times" aria-hidden="true"></i></a>';
                        }
                        row += '</div>';

                    });
                    row += '</td>';
                    row += '</tr>'
                } else {
                    row += '<td>'
                    row += '<span class="badge bg-gray">Chưa thi</span>'
                    row += '</td>';
                    row += '<td>'

                    row += '</td>';
                    row += '<td>'

                    row += '</td>';
                }
            });
            var page = $('#number_pages_statistical').val();
            $('#count_record_onpage').text((page * 12) + "-" + (parseInt(((page * 12))) + parseInt((12)) + " bản ghi "));
            $('#count_record_statistical').text(formatNumber(res[1], '.', ',') + " Bản ghi dữ liệu");
            $('#count_record_statistical').attr('count',res[1]);

            $('#table_candidate_statistical_list').html(row);
        }
    });
}


function formatNumber(nStr, decSeperate, groupSeperate) {
    nStr += '';
    x = nStr.split(decSeperate);
    x1 = x[0];
    25
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + groupSeperate + '$2');
    }
    return x1 + x2;
}



function destroyResult(btn) {
    $('#btnSavevCancelExam').attr('id_user',$(btn).attr('id_user'));
    $('#btnSavevCancelExam').attr('countTime', $(btn).attr('countTime'));
    $('#content_cancel').val('');
   $('#myModalCancelFromExcel').modal('show');
}

$(document).on('click','#btnSavevCancelExam',function () {
    cancelExam($('#btnSavevCancelExam').attr('id_user'), $('#btnSavevCancelExam').attr('countTime'));
});
function cancelExam(code,sumcountTest) {
    if(code=='' || sumcountTest=='' || $('#content_cancel').val()=='' ){
        alert("Bạn cần điền lý do hủy kết quả thi");
        return;
    }

    var r = confirm("Xác nhận hủy kết quả thi");
    if(r){
        var id_round_test = $('#id_round_test').val();
        var dataArray ={};
        dataArray["code"] =code;
        dataArray["sumCounttest"] = sumcountTest;
        dataArray["explanCancel"] = $('#content_cancel').val();

        $.ajax({
            url: '/api/admin/candidate/delete/counttest/'+id_round_test,
            beforeSend: function () {
                $('.loader_cancel').css("display", "block");
                //$('.loader').css("background")
            },
            headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
            type: 'DELETE',
            data: JSON.stringify(dataArray),
            dataType: 'json',
            contentType: "application/json",
            success: function (res) {
                $('.loader_cancel').css("display", "none");
                if(res){
                    alert("Xóa thành công");
                    $('#myModalCancelFromExcel').modal('hide');
                    var data={};
                    getListstatistical(data,1);
                }else{
                    alert("Xóa thất bại");
                }
            },
            error: function(res){
                alert("Xóa thất bại");
            }
        });
    }
}

$('.btn_search_top_statistical').on('click',function () {
    var id_round_test = $('#id_round_test').val();

    var top = $('#top_member').val();
    if(top==''){
        $('.loader_statistical').css("display", "none");
    alert("Xin hãy chọn số thí sinh có điểm cao nhất !");
        return;
    }
    $.ajax({
        url: '/api/admin/candidate/statistical/top/'+top+'/' + id_round_test,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
            $('.loader_statistical').css("display", "block");
        },
        success: function (res) {
            $('.loader_statistical').css("display", "none");
            $('#myModalTopStatistical').modal('show');
            var size = res.length;
            var row = '';
            $(res).each(function (i, item) {
                var day = new Date(item.user.birthday);
                row += '<tr>'
                row += '<td>'
                row += parseInt(i)+1
                row += '</td>'
                row += '<td>'
                row += '<div   >';
                row += '<b>' + item.user.fullName + '</b>';
                row += '</div>';
                row += '<div  >';
                row += '<span>' + item.user.username + '&nbsp;| &nbsp;' + item.user.email + '</span>';
                row += '</div>';
                row += '</td>';

                if (item.counttest != 0) {
                    row += '<td>'
                    if (item.status == 0) {
                        row += '<span class="badge bg-primary">Đạt</span>'
                    } else {
                        row += '<span class="badge bg-danger">Chưa Đạt</span>'
                    }
                    row += '</td>'
                    row += '<td>'
                    row += '<div class="font-origin" >';
                    row += '<span>Số lần thi:&nbsp; ' + item.counttest + '</span>';
                    row += '</div>';
                    row += '<div class="font-origin" >';
                    var mediumPoint = parseFloat(item.mediumPoint).toFixed(2);
                    row += '<span>Điểm trung bình:&nbsp; ' + mediumPoint + '</span>';
                    row += '</div>';
                    row += '<div class="font-blue-steel" >';
                    row += '<span>Điểm cao nhất:&nbsp; ' + item.maxPoint + '</span>';
                    row += '</div>';
                    row += '<div class="font-blue-steel" >';
                    var result = (item.maxPoint/item.sumPoint)*100;
                    if(!result){
                        result=0;
                    }
                    var persentQuestion = (item.result/item.totalQuestion)*100;
                    if(!persentQuestion){
                        persentQuestion=0;
                    }
                    row += '<span>Tỉ lệ điểm:&nbsp; ' + result.toFixed(2) + '%</span>';
                    row += '<p>Tỉ lệ đáp án đúng:&nbsp; ' + persentQuestion.toFixed(2) + '%</p>';
                    row += '</div>';
                    row += '</td>';
                    row += '<td>';
                    $(item.candidateCountCustomDTOS).each(function (index, items) {
                        var timestamp = items.timeStart;
                        var time_start = moment(timestamp).format('DD-MM-YYYY h:mm:ss A');

                        row += '<div >';
                        row += '<span>Lần ' + items.countTime + '&nbsp;,Lúc&nbsp;' + time_start + ',&nbsp;Điểm&nbsp;' + items.point + '</span>&nbsp;&nbsp;<a href="/admin/detail/roundtest/result/' + item.user.id + '/' + items.countTime + '/' + id_round_test + '">' +
                            ' <i title="Xem chi tiết"  class="class_icon_see_detail far fa-eye"></i></a>';
                        if(index== item.candidateCountCustomDTOS.length-1){
                            row += '&nbsp;<a id_user="'+item.user.id+'" countTime="'+items.countTime+'" style="color:  red" onclick="destroyResult(this)"><i title="Hủy kết quả thi"  class="fa fa-times" aria-hidden="true"></i></a>';
                        }
                        row += '</div>';

                    });
                    row += '</td>';
                    row += '</tr>'
                } else {
                    row += '<td>'
                    row += '<span class="badge bg-gray">Chưa thi</span>'
                    row += '</td>';
                    row += '<td>'

                    row += '</td>';
                    row += '<td>'

                    row += '</td>';
                }
            });

            $('#data_list_TopStatistical').html(row);
        }
    });
});