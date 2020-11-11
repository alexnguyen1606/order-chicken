function show_list_candidate_confirm() {
    sameGetListConfirm($('#number_pages_confirm').val());
    $('#show_list_candidate_confirm_id').removeAttr('onclick');
}

$('#id_page_left_confirm').on('click', function () {
    if ($('#number_pages_confirm').val() > 1) {
        var number_page = $('#number_pages_confirm').val() - 1;
        sameGetListConfirm(number_page);
        $('#number_pages_confirm').val(number_page);
    }
});
$('#id_page_right_confirm').on('click', function () {
    var number_page = parseInt($('#number_pages_confirm').val()) + 1;
    if(number_page<(Math.ceil($('#count_record_confirm').attr('count')/13))+1) {
        sameGetListConfirm(number_page);
        $('#number_pages_confirm').val(number_page);
    }else{
        alert("Không còn bản ghi dữ liệu");
    }
});
$('.btn_search_confirm_icon').on('click', function () {
    var number_page = 1;
    $('#number_pages_confirm').val(1);
    sameGetListConfirm(number_page);
});

function sameGetListConfirm(number_page) {
    var dataArray = setArrayDataConfirm();
    getListConfirm(dataArray, number_page)
}

function setArrayDataConfirm() {
    var dataArray = {};
    if ($('#input_name_search_confirm').val() != '') {
        dataArray['nameUser'] = $('#input_name_search_confirm').val();
    }
    return dataArray;
}

function getListConfirm(dataArray, number_page) {
    var id_round_test = $('#id_round_test').val();
    //var id_struct_detail=$('#id_struct_detail').val();
    dataArray["page"] = number_page;
    dataArray["maxPageItems"] = 13;
    $.ajax({
        url: '/api/admin/candidate/confirm/user/' + id_round_test,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        data: JSON.stringify(dataArray),
        dataType: 'json',
        contentType: "application/json",
        beforeSend: function () {
            $('.loader_confirm').css("display", "block");
            //$('.loader').css("background")
        },
        success: function (res) {
            $('.loader_confirm').css("display", "none");
            var size = res.length;
            var row = '';
            $(res[0]).each(function (i, item) {
                var day = new Date(item.user.birthday);
                row += '<tr>'
                row += '<td>'
                row += '<input type="checkbox" value="' + item.user.id + '"  class="check-box-element" name="checkList"  id="checkbox_' + item.id + '"/>'
                row += '</td>'
                row += '<td>'
                row += ((parseInt(number_page) - 1) * 13) + (parseInt(i) + 1)
                row += '</td>'
                row += '<td >&nbsp;' + item.user.fullName + '</td>'
                row += '<td>' + item.user.email + '</td>'
                row += '<td>' + day.toLocaleDateString() + '</td>'
                if (item.user.sex == 1) {
                    row += '<td>nam</td>'
                } else {
                    row += '<td>Nữ</td>'
                }
                if(item.user.poscodeVnpost!=null){
                    row += '<td>' + item.user.poscodeVnpost.name + '</td>'
                }else{
                    row += '<td>Tổng công ty</td>'
                }


                if (item.groupTest != null) {
                    row += '<td  id="class_name_candidate_' + item.id + '">' + item.groupTest.nameGroup + '</td>'
                } else {
                    row += '<td  id="class_name_candidate_' + item.id + '"></td>'
                }
                row += '</tr>'
            });
            $('#count_record_confirm').text(formatNumber(res[1], '.', ',') + " Bản ghi dữ liệu");
            $('#count_record_confirm').attr('count',res[1]);
            $('#table_candidate_confirm_list').html(row);
        }
    });
}

$("#checkAllCustomConfirm").change(function () {  //"select all" change
    var status = this.checked; // "select all" checked status
    $('#table_candidate_confirm_list input[type=checkbox]').each(function () { //iterate all listed checkbox items
        this.checked = status; //change ".checkbox" checked status
    });
});
$('#table_candidate_confirm_list input[type=checkbox]').change(function () { //".checkbox" change
    //uncheck "select all", if one of the listed checkbox item is unchecked
    if (this.checked == false) { //if this item is unchecked
        $("#checkAllCustomConfirm")[0].checked = false; //change "select all" checked status to false
    }
    //check "select all" if all checkbox items are checked
    if ($('#table_candidate_confirm_list input[type=checkbox]:checked').length == $('#table_category_competition_list input[type=checkbox]').length) {
        $("#checkAllCustomConfirm")[0].checked = true; //change "select all" checked status to true
    }
});

function onListCandidateConfirm() {
    var dataArray = $('#table_candidate_confirm_list input[type=checkbox]:checked').map(function () {
        return $(this).val();
    }).get();
    return dataArray;
}

$('#candidate_confirm').on('click', function () {
    var dataArray = onListCandidateConfirm();
    var id_round_test = $('#id_round_test').val();
    if (dataArray.length > 0) {
        $.ajax({
            url: '/api/admin/candidate/confirm/' + id_round_test,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            type: 'PUT',
            data: JSON.stringify(dataArray),
            dataType: 'json',
            contentType: "application/json",
            success: function (res) {
                if (res == 0) {
                    $("#checkAllCustomConfirm")[0].checked = false;
                    alert("Xác nhận thành công");
                    sameGetListConfirm(1);
                    show_list_candidate();
                } else {
                    alert("Xác nhận thất bại");
                }
            },
            error: function (res) {
                $("#checkAllCustomConfirm")[0].checked = false;
                alert("Cập nhật thất bại");
            }
        });
    }
});


$('#cancel_confirm').on('click', function () {
    var dataArray = onListCandidateConfirm();
    var id_round_test = $('#id_round_test').val();
    if (dataArray.length > 0) {
        $.ajax({
            url: '/api/admin/candidate/cancel/confirm/' + id_round_test,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            type: 'DELETE',
            data: JSON.stringify(dataArray),
            dataType: 'json',
            contentType: "application/json",
            success: function (res) {
                if (res) {
                    alert("Hủy duyệt thành công");
                    $("#checkAllCustomConfirm")[0].checked = false;
                    sameGetListConfirm(1);
                } else {
                    $("#checkAllCustomConfirm")[0].checked = false;
                    alert("Hủy duyệt thất bại");
                }
            },
            error: function (res) {
                $("#checkAllCustomConfirm")[0].checked = false;
                alert("Hủy duyệt thất bại");
            }
        });
    }
});





