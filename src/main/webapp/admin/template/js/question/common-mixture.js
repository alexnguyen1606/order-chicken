var question = {};

jQuery(function ($) {
    $(document).ready(function () {
        $(document).on('click','.btn_remove' , function () {
            var formData = $('#formAnswer').serializeArray();
            if (formData.length==0){
                alert("Không có câu hỏi để xóa");
                throw "Không có trường để xóa";
            }
            var lenght = 0;
            $.each(formData,function (i,v) {
                if (v.name.startsWith("id")){
                    lenght+=1;
                }
            });
            if (lenght==0){
                throw ('fail');
            }
            if (confirm("Xác nhận xóa")) {
                lenght-=1;
                $('#item_'+lenght).remove();
            }
            console.log(aphabet)
            // if (confirm("Xác nhận xóa")) {
            //     var button_id = $(this).attr("id");
            //     $('#item_' + button_id + '').remove();
            // }

        });
        function getQuestion() {
            var questionId = $('#questionId').val();
            if (questionId!="" && questionId!=null){
                $.ajax({
                    type:"GET",
                    url:"/api/admin/question/"+questionId,
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType:"application/json",
                    beforeSend:function () {

                    },
                    success:function (response) {
                        question = response;
                        console.log(response);
                        $('#question').text(response.question);
                        $('#explain').text(response.explain);
                        $('#statusQuestion').empty();
                        var typeQuestion = response.typeQuestion.id;
                        $('#typeQuestionId').empty();
                        if(typeQuestion ==1 || typeQuestion==2 || typeQuestion == 5){
                            $('#typeQuestionId').append('<option value="2" selected >Một lựa chọn</option>');
                            $('#typeQuestionId').append('<option value="3" >Nhiều lựa chọn</option>')
                        }else {
                            $('#typeQuestionId').append('<option value="2" >Một lựa chọn</option>');
                            $('#typeQuestionId').append('<option value="3" selected >Nhiều lựa chọn</option>')
                        }
                        if (question.statusQuestion==0){
                            $('#statusQuestion').append('<option value="0" selected>Hoạt động</option>');
                            $('#statusQuestion').append('<option value="1" >Nháp</option>');
                        } else {
                            $('#statusQuestion').append('<option value="0" >Hoạt động</option>');
                            $('#statusQuestion').append('<option value="1" selected>Nháp</option>');
                        }
                        if(response.url!=null || response.url!=''){
                            $('#url').val(response.url);
                        }
                        if(response.type!=null ){
                            $('#typeVideo').empty();
                            if(response.type==1){
                                $('#typeVideo').append(' <label class="col-form-label">Loại video</label>');
                                $('#typeVideo').append(' <input type="radio" name="type" value="1" checked>');
                                $('#typeVideo').append(' <label class="col-form-label">Mp3</label>');
                                $('#typeVideo').append(' <input type="radio" name="type" value="2" >');
                            }else if(response.type==2) {
                                $('#typeVideo').append(' <label class="col-form-label">Loại video</label>');
                                $('#typeVideo').append(' <input type="radio" name="type" value="1" >');
                                $('#typeVideo').append(' <label class="col-form-label">Mp3</label>');
                                $('#typeVideo').append(' <input type="radio" name="type" value="2" checked >');
                            }

                        }
                        CKEDITOR.replace('question',{
                            height:'100px',
                            filebrowserBrowseUrl : '/admin/ckfinder/ckfinder.html',
                            filebrowserImageBrowseUrl : '/admin/ckfinder/ckfinder.html?type=Images',
                            filebrowserFlashBrowseUrl : '/admin/ckfinder/ckfinder.html?type=Flash',
                            filebrowserUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                            filebrowserImageUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                            filebrowserFlashUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash'
                        });
                        getLevel();
                        getCategory();
                    },error:function () {
                        CKEDITOR.replace('question',{
                            height:'100px',
                            filebrowserBrowseUrl : '/admin/ckfinder/ckfinder.html',
                            filebrowserImageBrowseUrl : '/admin/ckfinder/ckfinder.html?type=Images',
                            filebrowserFlashBrowseUrl : '/admin/ckfinder/ckfinder.html?type=Flash',
                            filebrowserUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                            filebrowserImageUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                            filebrowserFlashUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash'
                        })
                    }
                })
            }else {
                getLevel();
                getCategory();
                CKEDITOR.replace('question',{
                    height:'100px',
                    filebrowserBrowseUrl : '/admin/ckfinder/ckfinder.html',
                    filebrowserImageBrowseUrl : '/admin/ckfinder/ckfinder.html?type=Images',
                    filebrowserFlashBrowseUrl : '/admin/ckfinder/ckfinder.html?type=Flash',
                    filebrowserUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                    filebrowserImageUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                    filebrowserFlashUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash',
                    removeButtons : 'Styles,Format,Font,FontSize,Bold,Italic,Underline,Strike,Subscript,Superscript'


                })

            }

        }
        function getLevel() {
            $.ajax({
                type:"GET",
                url:"/api/admin/question/level/all",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType:"application/json",
                beforeSend:function () {

                },
                success:function (response) {
                    var row = '';
                    if (question.id==""||question.id==null){
                        $.each(response,function (i,v) {
                            row+=' <option value="'+v.id+'" >'+v.nameLevell+'</option>';
                        })
                    } else {
                        $.each(response,function (i,v) {
                            if (v.id==question.levell.id){
                                row+=' <option value="'+v.id+'" selected >'+v.nameLevell+'</option>';
                            } else {
                                row+=' <option value="'+v.id+'" >'+v.nameLevell+'</option>';
                            }
                        })
                    }
                    $('#levelId').empty();
                    $('#levelId').append(row);
                },error:function () {

                }
            })
        }
        function getCategory() {
            $.ajax({
                type:"GET",
                url:"/api/admin/question-category/all",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType:"application/json",
                beforeSend:function () {

                },
                success:function (response) {
                    response = response.data;
                    var row='';
                    $.each(response,function (i,item) {
                        row+='<option value="'+item.id+'">'+item.nameCategory+'</option>';
                        if(item.listChild.length>0){
                            row+=showListChild(item.listChild);
                        }
                    });
                    $('#questionCategoryId').empty();
                    $('#questionCategoryId').append(row);
                    if(question.questionCategoryId!=null){
                        $('#questionCategoryId').val(question.questionCategoryId)
                    }
                },error:function () {

                }
            })
        }
        function showListChild(listChild) {
            var row = '';
            $.each(listChild, function (i, item) {
                    row+='<option value="'+item.id+'"> -- '+item.nameCategory+'</option>';
                    if (item.listChild.length > 0) {
                        row += showListChild(item.listChild);
                    }
                }
            );
            return row;
        }
        getQuestion();
    })
});


