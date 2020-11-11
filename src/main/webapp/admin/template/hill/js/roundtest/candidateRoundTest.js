
function  show_list_candidate(){
    sameGetListCandidate($('#number_pages').val());
     $('#show_list_candidate_id').removeAttr('onclick');
};

$('#id_page_left').on('click',function(){
    if($('#number_pages').val()>1){
        var number_page = $('#number_pages').val()-1;
        sameGetListCandidate(number_page);
        $('#number_pages').val(number_page);
    }
});
$('#id_page_right').on('click',function(){
    var number_page = parseInt($('#number_pages').val())+1;
    if(number_page<(Math.ceil($('#count_record').attr('count')/13))+1) {
        sameGetListCandidate(number_page);
        $('#number_pages').val(number_page);
    }else{
        alert("Không còn bản ghi dữ liệu");
    }
});

$('.btn_search_icon').on('click',function(){
    var number_page = 1;
    $('#number_pages').val(1);
    sameGetListCandidate(number_page);
});

function  sameGetListCandidate(number_page) {
    var dataArray=setArrayData();
    getListCandidate(dataArray,number_page)
}

function setArrayData(){
    var dataArray={};
    if($('#input_name_search').val()!=''){
        dataArray['nameUser'] =$('#input_name_search').val();
    }
    if($('#id_group_member').val()!=''){
        dataArray['idGroupMember'] =$('#id_group_member').val();
    }
    if($('#id_status_test_member').val()!=''){
        dataArray['idStatusTestMember'] =$('#id_status_test_member').val();
    }
    return dataArray;
}

function getListCandidate(dataArray,number_page){
    var id_round_test=$('#id_round_test').val();
    //var id_struct_detail=$('#id_struct_detail').val();
    dataArray["page"]=number_page;
    dataArray["maxPageItems"]=13;
    $.ajax({
        url: '/api/admin/candidate/list/'+id_round_test,
        headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
        type: 'POST',
        data: JSON.stringify(dataArray),
        dataType:'json',
        contentType: "application/json",
        beforeSend: function () {
            $('.loader_candidates').css("display", "block");
            //$('.loader').css("background")
        },
        success: function (res) {
            $('.loader_candidates').css("display", "none");
            var  size=res.length;
            var row = '';
            $(res[0]).each(function (i, item) {
                var day = new Date(item.usersDTO.birthday);
                row+='<tr>'
                row+='<td>'
                row+='<input type="checkbox" value="'+item.usersDTO.id+'"  class="check-box-element" name="checkList"  id="checkbox_'+item.usersDTO.id+'"/>'
                row+='</td>'
                row+='<td>'
                row+=((parseInt(number_page)-1)*13) +(parseInt(i)+1)
                row+='</td>'
                if(item.lockCandidate ==0){
                    row+='<td ><i title="Thí sinh được thi" id="class_status_candidate_'+item.usersDTO.id+'" class="text-success fa fa-circle"></i>&nbsp;'+item.usersDTO.fullName+'</td>'
                }else{
                    row+='<td ><i title="Thí sinh không được thi"  id="class_status_candidate_'+item.usersDTO.id+'" class="text-warning   fa fa-circle"></i>&nbsp;'+item.usersDTO.fullName+'</td>'
                }
                if(item.usersDTO.email!=null){
                    row+='<td>'+item.usersDTO.email+'</td>'
                }else{
                    row+='<td></td>'
                }
                if(item.usersDTO.birthday!=null){
                    row+='<td>'+day.toLocaleDateString()+'</td>'
                }else{
                    row+='<td></td>'
                }
                if(item.usersDTO.gender==1){
                    row+='<td>nam</td>'
                }else{
                    row+='<td>Nữ</td>'
                }

                if(item.usersDTO.poscodeVnpost!=null){
                    row+='<td>'+item.usersDTO.poscodeVnpost.name+'</td>'
                }else{
                    row += '<td>Tổng công ty</td>'
                }

                if(item.groupTest.nameGroup !=null){
                    row+='<td  id="class_name_candidate_'+item.usersDTO.id+'">'+item.groupTest.nameGroup+'</td>'
                }else{
                    row+='<td  id="class_name_candidate_'+item.usersDTO.id+'"></td>'
                }
                row+='</tr>'
            });
            var page = $('#number_pages').val();
            $('#count_record_onpage').text((page*12)+"-"+(parseInt(((page*12)))+parseInt((12))+" bản ghi "));
            $('#count_record').text(formatNumber(res[1],'.',',') +" Bản ghi dữ liệu");
            $('#count_record').attr('count',res[1]);

            $('#table_candidate_list').html(row);
        }
    });
}


function formatNumber(nStr, decSeperate, groupSeperate) {
    nStr += '';
    x = nStr.split(decSeperate);
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + groupSeperate + '$2');
    }
    return x1 + x2;
}

function onListCandidate(){
    var dataArray =$('#table_candidate_list input[type=checkbox]:checked').map(function () {
        return $(this).val();
    }).get();
    if(dataArray.length<=0){
        alert("Vui lòng chọn thí sinh");
        return ;
    }
    return dataArray;
}

function unlockCandidate(){
    var id_round_test=$('#id_round_test').val();
    var dataArray = onListCandidate();
    $.ajax({
        url: '/api/admin/candidate/unlock/'+id_round_test,
        headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
        type: 'PUT',
        data: JSON.stringify(dataArray),
        dataType: 'json',
        contentType: "application/json",
        success: function (res) {
            if(res==0){
                alert("Cập nhật thành công");
                updateStatus(0,dataArray);
                sameGetListCandidate(1);
                $("#checkAllCustom")[0].checked = false;
            }
        },
        error: function(res){
            alert("Cập nhật thất bại");
        }
    });
}
function  updateStatus(status,dataArray) {
    $(dataArray).each(function (i, item) {
        if(status==0){
            $('#class_status_candidate_'+item).removeClass('text-warning');
            $('#class_status_candidate_'+item).addClass('text-success');

        }else{
            $('#class_status_candidate_'+item).removeClass('text-success');
            $('#class_status_candidate_'+item).addClass('text-warning');
        }
    });
}
function onlockCandidate(dataArray){
    var id_round_test=$('#id_round_test').val();
    var dataArray = onListCandidate();
    $.ajax({
        url: '/api/admin/candidate/lock/'+id_round_test,
        headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
        type: 'PUT',
        data: JSON.stringify(dataArray),
        dataType: 'json',
        contentType: "application/json",
        success: function (res) {
            if(res==0){
                alert("Cập nhật thành công");
                updateStatus(1,dataArray);
                sameGetListCandidate(1);
                $("#checkAllCustom")[0].checked = false;
            }
        },
        error: function(res){
            alert("Cập nhật thất bại");
        }
    });
}

function  removeCandidate(dataArray) {
    var id_round_test=$('#id_round_test').val();
    var dataArray = onListCandidate();
    $.ajax({
        url: '/api/admin/candidate/delete/'+id_round_test,
        headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
        type: 'DELETE',
        data: JSON.stringify(dataArray),
        dataType: 'json',
        contentType: "application/json",
        success: function (res) {
            if(res==0){
                alert("Xóa thành công");
                sameGetListCandidate(1);
                $("#checkAllCustom")[0].checked = false;
            }else{
                alert("Xóa thất bại,Thí sinh đã làm bài thi");
            }
        },
        error: function(res){
            alert("Xóa thất bại,Thí sinh đã làm bài thi");
        }
    });
}

function  gotoGroup(btn) {

    var id_round_test=$('#id_round_test').val();
    var id_group = $(btn).attr('id_group');
    var name_group = $(btn).attr('name_group');
    var dataArray = onListCandidate();
    $.ajax({
        url: '/api/admin/candidate/groups/'+id_group+'/'+id_round_test,
        headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
        type: 'PUT',
        data: JSON.stringify(dataArray),
        dataType: 'json',
        contentType: "application/json",
        success: function (res) {
            if(res==0){
                alert("Cập nhật thành công");
                updateGroup(name_group,dataArray);
                sameGetListCandidate(1);
                $("#checkAllCustom")[0].checked = false;
            }
        },
        error: function(res){
            alert("Cập nhật thất bại");
        }
    });
}
function  outGroup(){
    var id_round_test=$('#id_round_test').val();
    var dataArray = onListCandidate();
    $.ajax({
        url: '/api/admin/candidate/out/groups/'+id_round_test,
        headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
        type: 'PUT',
        data: JSON.stringify(dataArray),
        dataType: 'json',
        contentType: "application/json",
        success: function (res) {
            if(res==0){
                alert("Cập nhật thành công");
                updateOutGroup(dataArray);
                sameGetListCandidate(1);
                $("#checkAllCustom")[0].checked = false;
            }
        },
        error: function(res){
            alert("Cập nhật thất bại");
        }
    });
}
function  updateOutGroup(dataArray) {
    $(dataArray).each(function (i, item) {
        $('#class_name_candidate_'+item).text('');
    });
}

function  updateGroup(name,dataArray) {
    $(dataArray).each(function (i, item) {
        $('#class_name_candidate_'+item).text(name);
    });
}
