$(document).ready(function(){
	//var i=$('#sum_group').attr('index_group');
	$('#add').click(function(){
		var i=$('#sum_group').attr('index_group');
		i++;
		var row='';	 
				row+='<tr  id="row'+i+'">'
				row+='<td>'
				row+='<label >Nhóm câu hỏi số '+i+'</label>'
				row+='<div class="row">'
				row+='<div class="col-md-2">'
				row+='<label class="label-normal">Phân loại câu hỏi</label>'
				row+='</div>'
				row+='<div class="col-md-10">'
				row+='<div class="type_goup_test">'
				row+='<div class="form_small_round_test">'
				row+='<a class="label-normal a_round_test">Lựa chọn danh mục&nbsp;<i class="fas fa-edit"></i></a>'
				row+='</div>'
				row+='<div class="form_small_round_test">'
				row+='<div class="form-group">  '
				row+='<select  class="select_type_groud" >'
				row+='<option selected  disabled="disabled">[Mức độ]</option>'
			 
 				row+='</select>'
				row+='</div>'
				row+='</div>'
				row+='<div class="form_small_round_test">'
				row+='<div class="form-group"> '
				row+='<select   class="select_type_groud" >'
				row+='<option selected disabled>[Loại câu hỏi]</option>'
			 
 				row+='</select>'
				row+='</div>'
				row+='</div>'
				row+='<div class="form_small_round_test">'
				row+='<div class="form-group">'
				row+='<input style="height: 29px; width: 120px;" type="email" name="email"  id="exampleInputEmail1" placeholder="[tag]">'
				row+='</div>'
				row+='</div>'
				row+='</div>'			
				row+='</div>'
				row+='</div>'
				row+='</td>'
				row+=' <td><button type="button" name="remove" id="'+i+'" class="btn_small_100_px btn btn-block btn_remove btn-outline-danger btn-sm">Xóa vòng thi</button></td>' 
				row+='</tr>'
		 
		
		
		$('#dynamic_field').append(row);
		 $('#sum_group').attr('index_group',parseInt($('#sum_group').attr('index_group'))+1)
       $('#sum_group').text('Tổng số nhóm câu hỏi trong đề thi là '+i)
	});
	
	$(document).on('click', '.btn_remove', function(){
		var button_id = $(this).attr("id"); 
		$('#row'+button_id+'').remove();
		var index_now=$('#sum_group').attr('index_group');
		$('#sum_group').attr('index_group',parseInt(index_now)-1);
		 $('#sum_group').text('Tổng số nhóm câu hỏi trong đề thi là '+(parseInt(index_now)-1));
	});
	 
	
	
});


$('#customRadio2').on('click',function(){
	$('.input_time').css('display','block');
	
});
$('#customRadio1').on('click',function(){
	$('.input_time').css('display','none');
	$('#input_time_start').val("");
	$('#input_time_end').val("");
});

$('#customRadio_work_1').on('click',function(){
	$('.label_max_work_round_test').css('display','none');
	
});
$('#customRadio_work_2').on('click',function(){
	$('.label_max_work_round_test').css('display','block');
	
});


$('#result_show_1').on('click',function(){
	$('#id_answer_show').css('display','block');
	
	
});

$('#result_show_2').on('click',function(){
	$('#id_answer_show').css('display','none');
	$('#id_explain_show').css('display','none');
	$('#answer_show_2').prop( "checked", true );
	$('#explain_show_2').prop( "checked", true );
	
});
$('#answer_show_1').on('click',function(){
	$('#id_explain_show').css('display','block');
});
$('#answer_show_2').on('click',function(){
	$('#id_explain_show').css('display','none');
	$('#explain_show_2').prop( "checked", true );
});

$('#select_question_source').on('change', function() {
	
	if($('#select_question_source').val()==1){
		   $('#test_choose').css('display','block');
		   $('#test_kit_choose').css('display','block');
		   $('#struct_test_round').css('display','none');

		   $('.autoCreateCheckBox').css('display','none');
		   $("#rundomRound").prop( "checked", false);
	}else{
		 $('#test_choose').css('display','none');
		 $('#test_kit_choose').css('display','none');
		 $('#struct_test_round').css('display','block');

		 $('.autoCreateCheckBox').css('display','inline-flex');
		 $("#rundomRound").prop( "checked", true);

	}
	checkPointerEvents() ;
	

    
});

$('#evnet_click_test_kit').on('click',function(){
	 $.ajax({
         url: '/api/admin/competition/add',
		 headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
         type: 'GET',
         dataType: 'json',
         contentType: 'application/json',
         data: JSON.stringify(dataArray),
         success: function (res) {
        	 $('#input_id_competition').val(res.id);
            alert('Thêm thành công');
            showRoundTest(res.id);
         },
         error: function (res) {
        	 alert('Có lỗi xảy ra');
         }
     });
});






