$(document).ready(function(){

		var i=1;
		$('#add').click(function(){
			if($('#select_status_courseware').val()==0){
			i++;
			$('#dynamic_field').append('<tr  id="row'+i+'"><td><i class="text-warning   fa fa-circle"></i></td><td><input type="text" name="name[]" placeholder="Nhập vòng thi" class="form-control name_list" /></td><td>Nháp</td><td><button type="button" name="remove" id="'+i+'" class="btn_small_40 btn btn-block btn-outline-danger btn-sm btn_remove">Xóa vòng thi</button></td></tr>');

			}else{
				alert("Khóa học chỉ được cấu hình một vòng thi");
			}
		});


	$(document).on('click', '.btn_remove', function(){
		var button_id = $(this).attr("id"); 
		$('#row'+button_id+'').remove();
	});
});


$(document).on('change','#select_status_courseware',function () {
		if($('#select_status_courseware').val()==0){
			$('.from_time_exam').css('display','flex');
			$('.competitionSpecial').css('display','flex');
		}else{
			$('.from_time_exam').css('display','none');
			$('.competitionSpecial').css('display','none');
			$('#input_time_start2').val('');
			$('#input_time_end2').val('');
		}
});



$('#btn_save_all').on('click',function(){
	if(validateForm()){
	var dataArray = {};
	var values =[];
	$("input[name='name[]']").each(function() {
		if($(this).val()!=''){
			 values.push($(this).val());
		}
	});
	dataArray["listPoscode"] = getListPoscodeCompetition();
    var id = $('#input_id_competition').val();
    dataArray["nameCompetition"]=$('#input_name_competition').val();
    if($('#input_id_competition').val() !=""){
    	 dataArray["id"]=id;
    }
    dataArray["checkcourseware"] = $('#select_status_courseware').val();

    dataArray["status_search_value"] = $('#select_status_competition').val();
    dataArray["category_value"] = $("#name_cate").attr('id_cate');
    dataArray["describe"] = CKEDITOR.instances.content.getData();
    if(values.length>0){
    	dataArray["listArray"] = values;
    }
    dataArray["highlight"] = $("input[name='customRadio3']:checked").val();
    if ($('#input_id_competition').val() !="") {
		dataArray["imageCompetition"] = $('#xImagePath').val().replace("/public/image/",'');
		dataArray["timeEnd"] = moment($('#input_time_end2').val()).toDate();
		dataArray["timeStart"] =moment($('#input_time_start2').val()).toDate();
		editCompotition(dataArray, $('#input_id_competition').val());
    }
    else {
		dataArray["imageCompetition"] = $('#xImagePath').val();
		dataArray["timeEnd"] = $("#input_time_end2").val();
		dataArray["timeStart"] = $("#input_time_start2").val();
        addCompotition(dataArray);
    }
    }
});	


function getListPoscodeCompetition(){
	var lists =[];
	$("input[name='idPoscodeCompetition[]']").each(function() {
		if($(this).attr('id_unit')!='null' && $(this).attr('id_unit')!=''){
			lists.push($(this).attr('id_unit'));
		}
	});
	return  lists;
}


$('#customRadio2').on('click',function(){
	$('.input_time').css('display','block');
});

$('#customRadio1').on('click',function(){
	$('.input_time').css('display','none');
	$('#input_time_start').val("");
	$('#input_time_end').val("");
});
function  addCompotition(dataArray) {
	 $.ajax({
         url: '/api/admin/competition/add',
		 beforeSend: function () {
			 $('.loader').css("display", "block");
		 },
		 headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
         type: 'POST',
         dataType: 'json',
         contentType: 'application/json',
         data: JSON.stringify(dataArray),
         success: function (res) {
			 $('.loader').css("display", "none");
        	 $('#input_id_competition').val(res.id);
            alert('Thêm thành công');
            showRoundTest(res.id);
         },
         error: function (res) {
        	 alert('Có lỗi xảy ra,Có thể tên cuộc thi bị trùng ');
			 $('.loader').css("display", "none");
         }
     });
}

function  editCompotition(dataArray) {
	if(dataArray.checkcourseware ==1 && $('#body_round_test tr').length>=2){
		alert("Cuộc thi lớn hơn 2 vòng thi ,không thể cập nhật sang cuộc thi dành cho khóa học");
		return;
	}

	 $.ajax({
        url: '/api/admin/competition/edit',
	 	beforeSend: function () {
			 $('.loader').css("display", "block");
	 	},
	 	headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(dataArray),

        success: function (res) {
        	$('.loader').css("display", "none");

			if(res.code == 200){
				alert('Cập nhật thành công');
				showRoundTest(res.data.id);
			} else
			if(res.code==401){
				alert(res.message);
			}
        },
        error: function (res, textStatus, xhr) {
       	 alert('Có lỗi xảy ra,cuộc thi đã được sử dụng trong khóa học');
		$('.loader').css("display", "none");
        }
    });
}



function  showRoundTest(id) {
	$.ajax({
        url: '/api/admin/roundtest/'+id,
		headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
        type: 'POST',
        dataType: 'json',
        success: function (res) {
        	var row = '';	
		     $(res).each(function (index, item)  {
		    	 row+='<tr>'
		    	 if(item.statusRound ==1){
		    		 row+='<td><i class="text-warning   fa fa-circle"></i> ' 
		    	 }else{
		    		 row+='<td><i class="text-success   fa fa-circle"></i> '
		    	 }
				
				 row+='<td><input type="text" readonly placeholder="Nhập vòng thi" value="'+item.nameRound+'"  class="form-control name_list" /></td>'
				 if(item.statusRound ==0){
					 row+='<td><span>Duyệt</span></td>'
				 }else{
					 row+='<td><span>Nháp</span></td>'
				 }
				 row+='<td>'
				 row+='<div class="row">'
				 row+=' <div class="col-md-4">'
				 row+='<a type="button" href="/admin/roundtest/'+item.id+'/edit"  id="'+item.id+'" class="  btn btn-block btn-info btn-sm"><i class="fas fa-cog"></i>&nbsp; Cấu hình</a>';
				 row+='</div>'
				 row+=' <div class="col-md-4">'
				 row+='<a type="button" id_round="'+item.id+'" onclick="CoppyRoundTest(this)"  id="'+item.id+'" class="color_white  btn btn-block btn-info btn-sm"><i class="fa fa-files-o" aria-hidden="true"></i>&nbsp; Sao chép</a>';
				 row+='</div>'
				 row+='<div class="col-md-4">'
				 row+='<button onclick="removeRoundTest(this)" id_competition="'+item.competition.id+'" type="button" id_round="'+item.id+'" class="btn_remove_round   btn btn-block btn-outline-danger btn-sm">Xóa vòng thi</button>';
				 row+='</div>'
				 row+='<div> '
				 row+='</td> '
				 row+='</tr>'
		     });
		     
		     $('#body_round_test').html(row);
        },
        error: function (res) {
       	 alert('Có lỗi xảy ra');
        }
    });
}

function removeRoundTest(btn){
	var id_round=$(btn).attr('id_round');
	var id_competition=$(btn).attr('id_competition');	
	 $.ajax({
         url: '/api/admin/roundtest/'+id_round+'/'+id_competition+'/off',
		 headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
         type: 'PUT',
         dataType: 'json',
         success: function (res) {
        	 alert('Xóa thành công');
        	 showRoundTest(res);
         },
         error: function (res) {
        	 alert('Có lỗi xảy ra');
         }
     });
}

function validateForm(){
	        if($('input[name="name[]').val()==''     || $('#input_name_competition').val()=='' || $("#name_cate").attr('id_cate')==''     ){
	            if($('input[name="name[]').val()=='' ){
	                $('input[name="name[]').css("border", "1px solid red");
	            }else{
	                $('input[name="name[]').css("border", '1px solid #ced4da');
	            }
	            if($('#content').val()==''){
	                $('#content').css("border", "1px solid red");
	            }else{
	                $('#content').css("border", '1px solid #ced4da');
	            }
	            if($('#input_name_competition').val()==''){
	                $('#input_name_competition').css("border", "1px solid red");
	            }else{
	                $('#input_name_competition').css("border", '1px solid #ced4da');
	            }
	            // if($('#xImagePath').val()==''){
	            //     $('.image_upload').css("border", "1px solid red");
	            // }else{
	            //     $('.image_upload').css("border", '1px solid #ced4da');
	            // }
	            if($("#name_cate").attr('id_cate')==''){
	            	$('.form_cate').css("border", "1px solid red");
	            }else{
	                $('.form_cate').css("border", '1px solid #ced4da');
	            }


	            return false;
	        }else {

	            return true;
	        }
}




function CoppyRoundTest(btn){
	var id_round = $(btn).attr('id_round');
	$('#idRoundOld').val(id_round);
	$('#myModalListRoundTest').modal();
	sameGetListRoundTest($('#number_pages_add').val(),id_round);

}




$('#id_page_left_add').on('click',function(){
	if($('#number_pages_add').val()>1){
		var number_page = $('#number_pages_add').val()-1;
		sameGetListRoundTest(number_page,$('#idRoundOld').val());
		$('#number_pages_add').val(number_page);
	}
});
$('#id_page_right_add').on('click',function(){
	var number_page = parseInt($('#number_pages_add').val())+1;
	sameGetListRoundTest(number_page,$('#idRoundOld').val());
	$('#number_pages_add').val(number_page);
});

$('.btn_search_icon_add_cadidate').on('click',function(){
	var number_page = 1;
	$('#number_pages_add').val(1);
	sameGetListRoundTest(number_page);
});

function  sameGetListRoundTest(number_page,id_round) {
	var dataArray=setArrayDataRoundTest();
	getListRoundTest(dataArray,number_page,id_round)
}

function setArrayDataRoundTest(){
	var dataArray={};
	if($('#type_name_competition').is(':checked')){
		if($('#name_search').val()!=''){
			dataArray['searchValue'] =$('#name_search').val();
		}
	}else{
		if($('#name_search').val()!=''){
			dataArray['nameRound'] =$('#name_search').val();
		}
	}
	return dataArray;
}

function getListRoundTest(dataArray,number_page,id_round){
	dataArray["page"]=number_page;
	dataArray["maxPageItems"]=13;
	$.ajax({
		url: '/api/admin/roundtest/'+id_round+'/coppy/list',
		headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
		type: 'POST',
		data: JSON.stringify(dataArray),
		dataType:'json',
		contentType: "application/json",
		beforeSend: function () {
			$('.loader').css("display", "block");
		},
		success: function (res) {
			$('.loader').css("display", "none");
			var row = '';

			$(res[0]).each(function (i, item) {
				row+='<tr>'
				row+='<td>'
				row+=(((parseInt(number_page)-1)*13) +(parseInt(i)+1))
				row+='</td>'
				row+='<td >'+item.nameRound+'</td>'
				row+='<td>'+item.competition.nameCompetition+'</td>'
				if(item.competition.poscodeVnpost!=null){
					row+='<td>'+item.competition.poscodeVnpost.name+'</td>'
				}else{
					row+='<td>Tổng công ty</td>'
				}

				row+='<td><button onclick="coppyRound(this)" id_round_old="'+id_round+'" id_round_new="'+item.id+'" class="btn btn-outline-success btn-sm">Thêm</button></td>'
			});
			var page = $('#number_pages_add').val();
			$('#count_record_add').text(res[1] +" Bản ghi dữ liệu");
			$('#table_round_add_list').html(row);
		}
	});
}

function  coppyRound(btn) {
	var id_round_old = $(btn).attr('id_round_old');
	var id_round_new = $(btn).attr('id_round_new');
	$.ajax({
		url: '/api/admin/roundtest/'+id_round_old+'/coppy/'+id_round_new+'/edit',
		headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
		type: 'PUT',
		beforeSend: function () {
			$('.loader').css("display", "block");
		},
		success: function (res) {
			$('.loader').css("display", "none");
			if (res){
				alert("Thêm thành công");
				location.reload();
			}else{
				alert("Thêm thất bại,Vòng thi đã có thí sinh làm bài thi ," +
					" hoặc vòng thi bạn chọn chưa được cấu hình hoàn chỉnh");
			}
		}
	});
};

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



$("#checkAllCustomAdd").change(function(){  //"select all" change
	var status = this.checked; // "select all" checked status
	$('#table_candidate_add_list input[type=checkbox]').each(function(){ //iterate all listed checkbox items
		this.checked = status; //change ".checkbox" checked status
	});
});

$('#table_candidate_add_list input[type=checkbox]').change(function(){ //".checkbox" change
	//uncheck "select all", if one of the listed checkbox item is unchecked
	if(this.checked == false){ //if this item is unchecked
		$("#checkAllCustomAdd")[0].checked = false; //change "select all" checked status to false
	}
	//check "select all" if all checkbox items are checked
	if ($('#table_candidate_add_list input[type=checkbox]:checked').length == $('#table_candidate_add_list input[type=checkbox]').length ){
		$("#checkAllCustomAdd")[0].checked = true; //change "select all" checked status to true
	}
});


function onListUser(){
	var dataArray =$('#table_candidate_add_list input[type=checkbox]:checked').map(function () {
		return $(this).val();
	}).get();

	return dataArray;
}

$('#btnSavevAddCadidate').on('click',function () {
	var id_add_round=$('#id_round_test').val();
	var dataArray = onListUser();
	$.ajax({
		url: '/api/admin/candidate/add/user/'+id_add_round,
		headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
		type: 'POST',
		data: JSON.stringify(dataArray),
		dataType:'json',
		contentType: "application/json",
		success: function (res) {
			if(res=='0'){
				alert("Thêm thành công !");
				show_list_candidate();
			}else{
				alert("Người này đã có trong vòng thi");
			}


		},
		error:function (res) {
			alert("Người này đã có trong vòng thi");
		}
	});


});


$('#type_name_competition').on('click',function () {
	if($('#type_name_competition').is(':checked')){
		$('#name_search').attr('placeholder','Tên cuộc thi');
	}else{
		$('#name_search').attr('placeholder','Tên vòng thi');
	}

});



$(document).on('change','#input_time_start2',function () {
		$('#input_time_end2').attr("min",$('#input_time_start2').val());
});

$(document).on('change','#input_time_end2',function () {
	$('#input_time_start2').attr("max",$('#input_time_end2').val());
});