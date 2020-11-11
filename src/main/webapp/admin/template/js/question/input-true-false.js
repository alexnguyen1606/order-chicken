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
                            row+='<div class="col-md-6" >';
                            row+='<span class="input-group-text">';
                            row+='<input type="hidden" name="id_'+i+'" value="'+v.id+'">';
                            row+='<input type="radio" name="checkRadio"  '+check+' id="checkAnswer_'+i+'" value="'+i+'">';
                            row+=' <input name="answer" class="input-group-text" style="border: 1px solid #ececec;width: 40px;text-align: center;pointer-events: none;" value="'+v.answer+'">';
                            row+=' <textarea name="contents" value="'+v.contents+'" style="pointer-events: none" class="form-control" rows="1">'+v.contents+'</textarea>';
                            row+='</div>';
                        }) ;
                        $('#formAnswer').append(row);
                    }
                });
            }
        }
        $(document).on('click','#createContinous',function () {
            var data = {};
            var dataAnwser=[];

            var formData = $('#formTrueFalse').serializeArray();
            var formAnswer = $('#formAnswer').serializeArray();
            console.log(formAnswer);
            $.each(formData,function (i,v) {
                data[v.name] = v.value;
            });

            var answers = [];
            var contents=[];
            var ids = [];
            $.each(formAnswer,function (i,v) {
                if (v.name.startsWith("answer")){
                    answers.push(v.value);
                }
                if(v.name=="contents"){
                    contents.push(v.value);
                }
                if (v.name.startsWith("id")){
                    ids.push(v.value);
                }
            });
            for (var i in answers){
                var answer = {};
                answer['answer'] = answers[i];
                answer['contents'] = contents[i];
                if (ids.length!=0 && ids[i]!=''){
                    answer['id'] = ids[i];
                }
                var check = $("input[name=checkRadio]:checked").val();
                if (check==i){
                    answer['answerCode'] =0;
                } else {
                    answer['answerCode'] =1;
                }
                dataAnwser.push(answer);
            }
            data['answers'] = dataAnwser;
            data['question'] = CKEDITOR.instances.question.getData();
            data['explain'] = $('#explain').val();

            if (data['question']==''){
                alert("Nội dung câu hỏi không được để trống")
                throw "Câu hỏi không được để trống";

            }
            $.each(data.answers,function (i,v) {
                if (v.contents=='' || v.contents==null){
                    alert("Đáp án không được để trống")
                    throw "Đáp án không được để trống";
                }
            });
            addContinous(data);
        });

        getAnswer();
        $('#btnEdit').click(function () {
            var data = {};
            var dataAnwser=[];

            var formData = $('#formTrueFalse').serializeArray();
            var formAnswer = $('#formAnswer').serializeArray();
            console.log(formAnswer);
            $.each(formData,function (i,v) {
                data[v.name] = v.value;
            });

            var answers = [];
            var contents=[];
            var ids = [];
            $.each(formAnswer,function (i,v) {
                if (v.name.startsWith("answer")){
                    answers.push(v.value);
                }
                if(v.name=="contents"){
                    contents.push(v.value);
                }
                if (v.name.startsWith("id")){
                    ids.push(v.value);
                }
            });
            for (var i in answers){
                var answer = {};
                answer['answer'] = answers[i];
                answer['contents'] = contents[i];
                if (ids.length!=0 && ids[i]!=''){
                    answer['id'] = ids[i];
                }
                var check = $("input[name=checkRadio]:checked").val();
                if (check==i){
                    answer['answerCode'] =0;
                } else {
                    answer['answerCode'] =1;
                }
                dataAnwser.push(answer);
            }
            data['answers'] = dataAnwser;
            data['question'] = CKEDITOR.instances.question.getData();
            data['explain'] = $('#explain').val();

            if (data['question']==''){
                alert("Nội dung câu hỏi không được để trống")
                throw "Câu hỏi không được để trống";

            }
            $.each(data.answers,function (i,v) {
                if (v.contents=='' || v.contents==null){
                    alert("Đáp án không được để trống")
                    throw "Đáp án không được để trống";
                }
            });

            console.log(data);
            if (data.id==''){
                add(data);
            } else if (data.id!='') {
                update(data)
            }

        });
        function addContinous(data) {
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
                    window.location.href="/admin/question/add/true-false/"+data.questionCategoryId+"/"+data.levelId;
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
                    console.log("fail");
                    $('.loader').css("display","none");
                    alert(response.responseJSON.message) ;
                }
            });
        }
        function update(data) {
            $.ajax({
                type: "PUT",
                url: "/api/admin/question",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
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
                    alert(response.responseJSON.message) ;
                }
            });
        }
    });
});
