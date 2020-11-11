var aphabet=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
jQuery(function ($) {
    $(document).ready(function () {
        function getAnswer(){
            var questionId  = $('#questionId').val();
            if (questionId!=null && questionId!=""){
                $.ajax({
                    type:"GET",
                    url:"/api/admin/question/"+questionId+"/answers",
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType:"application/json",
                    beforeSend:function () {

                    },success:function (response) {
                        var row ='';
                        $.each(response,function (i,v) {
                            var check = '';
                            if (v.answerCode==0){
                                check='checked';
                            }
                            row+='<div class="col-md-6" id="item_'+i+'" >';
                            row+='<label>Đáp án '+(i+1)+'</label>';
                            row+='<span class="input-group-text">';
                            row+='<input type="hidden" name="id_'+i+'" value="'+v.id+'">';
                            row+='<input type="checkbox" name="checkRadio"  '+check+' id="checkAnswer_'+i+'" value="'+i+'">';
                            row+='<input name="answer" class="input-group-text" style="border: 1px solid #ececec;width: 40px;text-align: center;pointer-events: none;" value="'+v.answer+'">';
                            row+=' <textarea name="contents" value="'+v.contents+'"  class="form-control" rows="1">'+v.contents+'</textarea>';
                            row+='</span>';
                            row+='</div>';
                        }) ;
                        $('#formAnswer').append(row);
                    }
                });
            }
        }
        getAnswer();
    })
});

$('#btnEdit').click(function () {
    var data = {};
    var dataAnswer = [];
    var formData = $('#formMultiChoise').serializeArray();
    var formAnswer = $('#formAnswer').serializeArray();
    var answers = [];
    var contents=[];
    var answersIds = [];
    $.each(formData,function (i,v) {
        data[v.name] = v.value;
    });

    $.each(formAnswer,function (i,v) {
        if (v.name.startsWith("answer"))  {
            answers.push(v.value);
        }
        if (v.name.startsWith("id_"))  {
            answersIds.push(v.value);
        }
        if (v.name=='contents'){
            contents.push(v.value);
        }
    });
    for (var i in answers){
        var answer = {};
        answer['contents'] = contents[i];
        answer['id'] = answersIds[i];
        answer['answer'] = answers[i];
        if ($('#checkAnswer_' + i).is(":checked")){
            answer['answerCode'] =0;
        } else {
            answer['answerCode'] =1;
        }
        dataAnswer.push(answer);
    }

    data['answers'] = dataAnswer;
    data['question'] = CKEDITOR.instances.question.getData();
    //data['explain'] = CKEDITOR.instances.explain.getData();
    data['explain'] =$('#explain').val();

    if (data['question']==''){
        alert("Câu hỏi không được để trống")
        throw "Câu hỏi không được để trống";

    }
    $.each(data.answers,function (i,v) {
        if (v.contents=='' || v.contents==null){
            alert("Đáp án không được để trống")
            throw "Đáp án không được để trống";
        }
    });
    if ($('#formAnswer input[type=checkbox]:checked').length <= 0){
        alert("Chưa chọn đáp án")
        throw "Đáp án không được để trống";
    }
    if(data.answers.length<2){
        alert("Số lượng đáp án cần lớn hơn 1")
        throw "Đáp án không được để trống";
    }
    console.log(data);
    if(data.typeQuestionId!=3){
        var count=0;
       $.each(data.answers,function (i,v) {
           if(v.answerCode==0){
               count++;
           }
           if(count>1){
               alert("Số lượng câu trả lời dúng không phù hợp loại câu hỏi")
               throw "Anser is not true";
           }
       })
    }
    if (data.id==''){
        add(data);
    } else if (data.id!='') {
        update(data)
    }
});
$('#btnAddAnswer').click(function () {
    var formData = $('#formAnswer').serializeArray();

    var lenght = 0;
    $.each(formData,function (i,v) {
        if (v.name.startsWith("answer")){
            lenght+=1;
        }
    });
    var row = '';

    row+='<div class="col-md-6" id="item_'+lenght+'">';
    row+='<label>Đáp án '+(lenght+1)+'</label>';
    row+='<span class="input-group-text">';
    row+='<input type="hidden" name="id_'+lenght+'" value="">';
    row+='<input type="checkbox"   id="checkAnswer_'+lenght+'" value="'+lenght+'">';
    row+='<input name="answer" class="input-group-text" style="border: 1px solid #ececec;width: 40px;text-align: center;pointer-events: none;" value="'+aphabet[lenght]+'">';
    row+='<textarea name="contents" required class="form-control" rows="1"></textarea>';
    row+='</span>';
    row+='</div>';


    $('#formAnswer').append(row);
});
function add(data) {
    $.ajax({
        type: "POST",
        url: "/api/admin/question",
        data: JSON.stringify(data),
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        dataType: "json",
        contentType:"application/json",
        beforeSend:function(){
            $('.loader').css("display","block");
            $('.loader').css("background")
        },
        success: function (response) {

            $('.loader').css("display","none");
            alert(response.message)
            window.location.href="/admin/question/list";
        },
        error: function(response){
            $('.loader').css("display","none");
            console.log(response)
            alert(response.responseJSON.message);
        }
    });
}
function update(data) {
    $.ajax({
        type: "PUT",
        url: "/api/admin/question",
        data: JSON.stringify(data),
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        dataType: "json",
        contentType:"application/json",
        beforeSend:function(){
            $('.loader').css("display","block");
            $('.loader').css("background")
        },
        success: function (response) {
            console.log(response);
            $('.loader').css("display","none");
            alert("Cập nhật thành công")
            window.location.href="/admin/question/list";
        },
        error: function(response){
            console.log("fail");
            $('.loader').css("display","none");
            alert("Cập nhật không thành công") ;
        }
    });
}