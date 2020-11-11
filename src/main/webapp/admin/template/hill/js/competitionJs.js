$(document).ready(function () {
    var dataArray = {};
    var number_page = 1;
    getListCompetition(dataArray, number_page);
});

function getListCompetition(dataArray, number_page) {
    dataArray["page"] = number_page;
    dataArray["maxPageItems"] = 13;
    $.ajax({
        url: '/api/admin/competition/list',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        data: JSON.stringify(dataArray),
        dataType: 'json',
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
            //$('.loader').css("background")
        },
        success: function (res) {
            $('.loader').css("display", "none");
            var row = '';
            $(res[0]).each(function (i, items) {
                row += '<tr>'
                row += '<td>' + (((parseInt(number_page) - 1) * 13) + (parseInt(i) + 1)) + '</td>'
                row += '<td>'
                if (items.statusCompetition == 0) {
                    row += '<i class="text-success fa fa-circle"></i>&nbsp;' + items.nameCompetition + '<br/>';
                } else {
                    row += '<i class="text-warning   fa fa-circle"></i>&nbsp;' + items.nameCompetition + '<br/>';
                }
                if (items.poscodeVnpost != null) {
                    row += '<i class="fa fa-building-o icon_building"></i>&nbsp;' + items.poscodeVnpost.name+'<br/>';
                } else {
                    row += '<i class="fa fa-building-o icon_building"></i>&nbsp;Tổng công ty <br/>';
                }
                if(items.checkcourseware ==0){
                    row += '<i class="far fa-file-alt"></i>&nbsp; Cuộc thi độc lập<br/>'
                }else{
                    row += '<i class="far fa-file-alt"></i>&nbsp; Cuộc thi cho khóa học<br/>'
                }

                row += ' </td>';
                if (items.timeStart != null) {
                    var time_create2 = moment(new Date(items.timeStart)).format('DD/MM/YYYY');
                    var time_end2 = moment(new Date(items.timeEnd)).format('DD/MM/YYYY');
                    row += '<td>' + time_create2 +"<br>-> "+ time_end2+'</td>';

                } else {
                    row += '<td>Không giới hạn</td>';
                }
                row += '<td>' + items.countCandiates + '</td>';
                row += '<td class="font-origin">';
                $(items.qroundTestDTOList).each(function (index, itemss) {
                    row += '<div class="font-origin" >';
                    row += '<b>Vòng thi ' + parseInt(index + 1) + ' :&nbsp; ' + itemss.nameRound + '</b>';
                    row += '</div>';
                    row += '<div class="font-origin">';
                    if(itemss.autoCreateQuestion==0){
                        row +=  '<i class="far fa-clock"></i>&nbsp;'+ (parseInt(itemss.timeRound) / 60) + ' phút';
                    }else{
                        row += '<i class="far fa-clock"></i>&nbsp;' + itemss.countQuestion + ' Câu hỏi , ' + (parseInt(itemss.timeRound) / 60) + ' phút';
                    }
                  //  row += '<i class="far fa-clock"></i>&nbsp;' + itemss.countQuestion + ' Câu hỏi , ' + (parseInt(itemss.timeRound) / 60) + ' phút';
                    row += '</div>';
                    row += '<div class="font-origin">';
                    if(itemss.autoCreateQuestion==0){
                        row += '<i class="far fa-file-word"></i>&nbsp; Đề tự sinh';
                    }else{
                        row += '<i class="far fa-file-word"></i>&nbsp; Đề cố định';
                    }
                    row += '</div>';
                    row += '<div class="font-origin">';
                    var time_startcheck = new Date(itemss.timeStart);
                    var time_startcheck1 = moment(time_startcheck).format('DD/MM/YYYY');
                    if (itemss.timeStart == null || '31-12-1899' == time_startcheck1) {

                        row += '<i class="far fa-calendar-alt"></i>&nbsp; Không giới hạn thời điểm vào thi';
                    } else {
                        var time_start = new Date(itemss.timeStart);
                        var time_end = new Date(itemss.timeEnd);

                        var timestamp1 = time_start;
                        var time_start = moment(timestamp1).format('DD/MM/YYYY h:mm:ss A');

                        var timestamp2 = time_end;
                        var time_end = moment(timestamp2).format('DD/MM/YYYY h:mm:ss A');
                        row += '<i class="far fa-calendar-alt"></i>&nbsp;' + time_start + ' -> '
                            + time_end + '';
                    }
                    row += '</div>';
                    row += '<br/>';
                });
                row += '</td>;'
                row += '<td>';
                row += '<div class="input-group-addon">';
                row += '<div   class="label label-info"  data-toggle="dropdown">';
                row += '<i class="fas fa-th icon-th"></i>';
                row += '</div>';
                row += '<ul class="dropdown-menu item-drop-competition">';
                row += '<a href="/admin/competition/edit/' + items.id + '"><li class="dropdown-item"><i class="fas fa-cog"></i>&nbsp;Thiết lập </li></a>';
                row += '<a id_competition="' + items.id + '" onclick="removeCompetition(this)" href="#"><li class="dropdown-item"><i class="far fa-trash-alt"></i>&nbsp;Xóa</li></a>';
                //row += ' <li class="dropdown-item"><a href="/admin/roundtest/' + items.id + '/edit"><i class="far fa-chart-bar"></i>&nbsp;Thống kê</a></li>';
                row += '</ul>';
                row += '</div>';
                row += '</td>';
                row += '</tr>';
            });

            $('#data_list_competition').html(row);

            $('#class_size_record').text(res[1] + " cuộc thi  ");
            $('#class_size_record').attr('count',res[1]);

        },
        error: function (res) {
            $('.loader').css("display", "none");
        }
    });
}

function removeCompetition(btn) {
    var idCompe = $(btn).attr('id_competition');
    var dataArray = [];
    dataArray.push(idCompe);
    $.ajax({
        url: '/api/admin/competition/delete',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'DELETE',
        data: JSON.stringify(dataArray),
        dataType: 'json',
        contentType: "application/json",
        success: function (res) {
            if (res) {
                alert("Xóa thành công");
                window.location = "/admin/competition/list";
            } else {
                alert("Hệ thống không cho phép xóa cuộc thi này");
            }
        },
        error: function (res) {
            console.log(res);
            alert("Xóa thất bại");
        }
    });
}
