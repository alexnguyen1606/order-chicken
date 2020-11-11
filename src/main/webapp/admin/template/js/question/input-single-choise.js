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
                            row+='<input name="answer" class="input-group-text" style="border: 1px solid #ececec;width: 40px;text-align: center;pointer-events: none;" value="'+v.answer+'">';
                            row+='<input type="hidden" name="id_'+i+'" value="'+v.id+'">';
                            row+='<input type="radio" name="checkRadio"  '+check+' id="checkAnswer_'+i+'" value="'+i+'">';
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
        $('#btnEdit').click(function () {
            var data = {};
            var dataAnswer = [];
            var formData = $('#formMultiChoise').serializeArray();
            var formAnswer = $('#formAnswer').serializeArray();
            var answers = [];
            var answersIds = [];
            var contents = []
            $.each(formData,function (i,v) {
                data[v.name] = v.value;
            });

            $.each(formAnswer,function (i,v) {
                if (v.name.startsWith("contents"))  {
                    contents.push(v.value);
                }
                if (v.name.startsWith("id_"))  {
                    answersIds.push(v.value);
                }
                if(v.name=='answer'){
                    answers.push(v.value);
                }
            });
            for (var i in answers){
                var answer = {};
                answer['contents'] = contents[i];
                answer['answer'] = answers[i];
                answer['id'] = answersIds[i];
                var check = $("input[name=checkRadio]:checked").val();
                if (check==i){
                    answer['answerCode'] =0;
                } else {
                    answer['answerCode'] =1;
                }
                dataAnswer.push(answer);
            }

            data['answers'] = dataAnswer;
            data['question'] = CKEDITOR.instances.question.getData();
            //data['explain'] = CKEDITOR.instances.explain.getData();
            data['explain'] = $('#explain').val();
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
            if ($('#formAnswer input[type=radio]:checked').length <= 0){
                alert("Chưa chọn đáp án cho câu hỏi")
                throw "Đáp án không được để trống";
            }
            if(data.answers.length<2){
                alert("Số lượng đáp án cần lớn hơn 1")
                throw "Đáp án không được để trống";
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
                if (v.name.startsWith("id")){
                    lenght+=1;
                }
            });

            console.log(formData);
            console.log(lenght);
            var row = '';

            row+='<div class="col-md-6" id="item_'+lenght+'">';
            row+='<label>Đáp án '+(lenght+1)+'</label>';
            row+=' <span class="input-group-text">';
            row+='<input type="hidden" name="id_'+lenght+'" value="">';
            row+='<input type="radio" name="checkRadio"   id="checkAnswer_'+lenght+'" value="'+lenght+'">';
            row+='<input name="answer" class="input-group-text" style="border: 1px solid #ececec;width: 40px;text-align: center;pointer-events: none;" value="'+aphabet[lenght]+'">';
            row+='<textarea name="contents"  required class="form-control" rows="1"></textarea>';
            row+='</span>';
            row+='</div>';

            $('#formAnswer').append(row);
        });
        $('#createContinous').click(function () {
            var data = {};
            var dataAnswer = [];
            var formData = $('#formMultiChoise').serializeArray();
            var formAnswer = $('#formAnswer').serializeArray();
            var answers = [];
            var answersIds = [];
            var contents = []
            $.each(formData,function (i,v) {
                data[v.name] = v.value;
            });

            $.each(formAnswer,function (i,v) {
                if (v.name.startsWith("contents"))  {
                    contents.push(v.value);
                }
                if (v.name.startsWith("id_"))  {
                    answersIds.push(v.value);
                }
                if(v.name=='answer'){
                    answers.push(v.value);
                }
            });
            for (var i in answers){
                var answer = {};
                answer['contents'] = contents[i];
                answer['answer'] = answers[i];
                answer['id'] = answersIds[i];
                var check = $("input[name=checkRadio]:checked").val();
                if (check==i){
                    answer['answerCode'] =0;
                } else {
                    answer['answerCode'] =1;
                }
                dataAnswer.push(answer);
            }

            data['answers'] = dataAnswer;
            data['question'] = CKEDITOR.instances.question.getData();
            //data['explain'] = CKEDITOR.instances.explain.getData();
            data['explain'] = $('#explain').val();
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
            if ($('#formAnswer input[type=radio]:checked').length <= 0){
                alert("Chưa chọn đáp án cho câu hỏi")
                throw "Đáp án không được để trống";
            }
            if(data.answers.length<2){
                alert("Số lượng đáp án cần lớn hơn 1")
                throw "Đáp án không được để trống";
            }
            createContinous(data);
        });
        function createContinous(data) {
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
                    console.log(response);
                    $('.loader').css("display","none");
                    alert(response.message);
                    window.location.href="/admin/question/add/single-choise/"+data.questionCategoryId+"/"+data.levelId;
                },
                error: function(response){
                    $('.loader').css("display","none");
                    alert(response.responseJSON.message) ;
                }
            });
        }
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
                    console.log(response);
                    $('.loader').css("display","none");
                    alert(response.message);
                    window.location.href="/admin/question/list";
                },
                error: function(response){
                    $('.loader').css("display","none");
                    alert(response.responseJSON.message) ;
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
                    alert(response.message)
                    window.location.href="/admin/question/list";
                },
                error: function(response){
                    $('.loader').css("display","none");
                    alert(response.responseJSON.message) ;
                }
            });
        }
    })
});
