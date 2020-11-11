var aphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var sub = [];
jQuery(function ($) {
    $(document).ready(function () {
        function getAnswer() {
            var questionId = $('#questionId').val();
            if (questionId != null && questionId != "") {
                $.ajax({
                    type: "GET",
                    url: "/api/admin/question/" + questionId + "/answers/is-null",
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType: "application/json",
                    beforeSend: function () {

                    }, success: function (response) {
                        var row = '';
                        $.each(response, function (i, v) {

                            row += '<div class="input-group mb-2" id="item_question_' + i + '">';
                            row += '<input type="hidden" name="id" value="' + v.id + '">';
                            row += '<input type="hidden" name="answer" value="' + v.answer + '">';
                            row += '<div class="input-group-prepend">';
                            row += '<span class="input-group-text">' + v.answer + '</span>';
                            row += '</div>';
                            row += '<textarea name="contents" rows="2" cols="10" value="' + v.contents + '"\n' +
                                '                                                      class="form-control">' + v.contents + '</textarea>';
                            row += '</div>';
                        });
                        $('#formQuestion').append(row);
                    }
                });
            }
        }

        function getQuestionAnswer() {
            var questionId = $('#questionId').val();
            if (questionId != null || questionId != "") {
                $.ajax({
                    type: "GET",
                    url: "/api/admin/question/" + questionId + "/answers/not-null",
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType: "application/json",
                    beforeSend: function () {

                    }, success: function (response) {
                        var row = '';
                        $.each(response, function (i, v) {
                            var check = '';
                            if (v.answerCode == 0) {
                                check = 'checked';
                            }
                            row += '<div id="item_answer_' + i + '" class="input-group mb-2">';
                            row += '<input type="hidden" value="' + v.id + '" name="id">';
                            row += '<div class="input-group-prepend">';
                            row += '<span class="input-group-text">';
                            row += '<input name="answer" class="input-group-text" style="width: 40px;text-align: center;pointer-events: none;" ';
                            row += ' value="' + v.answer + '"';
                            row += '</span>';
                            row += '<span class="input-group-text">';
                            row += '<input name="answer_code" class="" value="' + v.answerCode + '"';
                            row += ' style="width: 35px;text-align: right;height: 22px;" min="1" type="number"';
                            row += '</span>';
                            row += '</div>';
                            row += '<textarea type="text" name="contents" class="form-control"\n' +
                                '                                                  value="' + v.contents + '">' + v.contents + '</textarea>';
                            row += '</div>';
                        });
                        $('#formAnswer').append(row);
                    }
                });
            }
        }

        getQuestionAnswer();
        getAnswer();
        $('#createContinous').click(function () {
            var data = {};
            var formData = $('#formMatching').serializeArray();
            var formAnswer = $('#formAnswer').serializeArray();
            var formQuestion = $('#formQuestion').serializeArray();
            var answers = [];
            var contentAnswers = [];
            var idAnswer = [];
            var answerCode = [];
            var answerValue = [];
            var idQuestion = [];
            var questionCode = [];
            var contentQuestions = [];

            $.each(formAnswer, function (i, v) {
                if (v.name == 'contents') {
                    contentAnswers.push(v.value);
                }
                if (v.name == 'id') {
                    idAnswer.push(v.value);
                }
                if (v.name == 'answer_code') {
                    answerCode.push(v.value);
                }
                if (v.name == 'answer') {
                    answerValue.push(v.value);
                }
            });
            for (var i in contentAnswers) {
                var answerItem = {};
                answerItem['contents'] = contentAnswers[i];
                answerItem['id'] = idAnswer[i];
                answerItem['answerCode'] = answerCode[i];
                answerItem['answer'] = answerValue[i];
                answers.push(answerItem);
            }

            $.each(formQuestion, function (i, v) {
                if (v.name == 'contents') {
                    contentQuestions.push(v.value);
                }
                if (v.name == 'id') {
                    idQuestion.push(v.value);
                }
                if (v.name == 'answer') {
                    questionCode.push(v.value);
                }
            });
            for (var i in contentQuestions) {
                var questionItem = {};
                questionItem['id'] = idQuestion[i];
                questionItem['answer'] = questionCode[i];
                questionItem['contents'] = contentQuestions[i];
                answers.push(questionItem);
            }


            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            data['question'] = CKEDITOR.instances.question.getData();
            //  data['explain'] = CKEDITOR.instances.explain.getData();
            data['explain'] = $('#explain').val();
            data['answers'] = answers;
            if (data['question'] == '') {
                alert("Câu hỏi không được để trống")
                throw "Câu hỏi không được để trống";

            }
            for (var i in contentAnswers) {
                if (contentAnswers[i] == '' || contentAnswers[i] == null) {
                    alert("Đáp án không được để trống")
                    throw "Đáp án không được để trống";
                }
            }
            var countQuestion = 0;
            var countAnswer = 0;
            $.each(data.answers, function (i, v) {
                if (v.contents == '' || v.contents == null) {
                    alert("Đáp án không được để trống")
                    throw "Đáp án không được để trống";
                }
                if (v.answer_code == null || v.answer_code == "") {
                    countQuestion++;
                } else {
                    countAnswer++;
                }
            });
           createAndContinous(data)

        });
        function createAndContinous(data) {
            $.ajax({
                type: "POST",
                url: "/api/admin/question",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                    $('.loader').css("background")
                },
                success: function (response) {
                    console.log(response);
                    $('.loader').css("display", "none");
                    alert("Thêm thành công")
                    window.location.href = "/admin/question/add/matching/"+data.questionCategoryId+"/"+data.levelId;
                },
                error: function (response) {
                    $('.loader').css("display","none");
                    alert(response.responseJSON.message) ;
                }
            });
        }
    });
});
$('#btnAddAnswer').click(function () {


    var formData = $('#formAnswer').serializeArray();
    var lenght = 0;
    $.each(formData, function (i, v) {
        if (v.name.startsWith("id")) {
            lenght += 1;
        }
    });
    var row = '';
    row += '<div id="item_answer_' + lenght + '" class="input-group mb-2">';
    row += '<input type="hidden" name="id">';
    row += '<div class="input-group-prepend">';
    row += '<span class="input-group-text">';
    row += '<input name="answer" class="input-group-text" style="border: 1px solid #ececec;width: 40px;text-align: center;pointer-events: none;" value="' + aphabet[lenght] + '">';
    row += '</span>';
    row += '<span class="input-group-text">';
    row += '<input  name="answer_code" class="" value="1" style="width: 35px;text-align: right;height: 22px;" min="1" type="number">';
    row += '</span>';
    row += '</div>';
    row += '<textarea  type="text" name="contents" class="form-control" value=""></textarea>';

    row += '</div>';
    $('#formAnswer').append(row);
});

$('#btnAddQuestion').click(function () {
    var formData = $('#formQuestion').serializeArray();
    var lenght = 0;
    $.each(formData, function (i, v) {
        if (v.name.startsWith("id")) {
            lenght += 1;
        }
    });

    var row = '';
    row += '<div class="input-group mb-2" id="item_question_' + lenght + '">';
    row += '<input type="hidden" name="id">';
    row += '<input type="hidden" name="answer" value="' + (lenght + 1) + '">';
    row += '<div class="input-group-prepend">';
    row += '<span class="input-group-text">' + (lenght + 1) + '</span>';
    row += '</div>'
    row += '<textarea  name="contents" rows="2" cols="10"  class="form-control"></textarea>'

    row += '</div>';
    $('#formQuestion').append(row);
});


function removeAnswer(id) {
    var formData = $('#formAnswer').serializeArray();
    var lenght = 0;
    if (formData.length == 0) {
        alert("Không có câu trả lời để xóa");
        throw "Không có trường để xóa";
    }
    $.each(formData, function (i, v) {
        if (v.name.startsWith("id")) {
            lenght += 1;
        }
    });
    if (lenght > 0) {
        lenght -= 1;
    }
    if (confirm("Xác nhận xóa")) {

        $('#item_answer_' + lenght).remove();

    }


}

function deleteAll() {
    $('#formAnswer').empty();
    aphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    sub = [];
    $('#formQuestion').empty();
}

function removeQuestion(id) {
    var formData = $('#formQuestion').serializeArray();
    if (formData.length == 0) {
        alert("Không có câu hỏi để xóa");
        throw "Không có trường để xóa";
    }
    var lenght = 0;
    $.each(formData, function (i, v) {
        if (v.name.startsWith("id")) {
            lenght += 1;
        }
    });
    if (lenght == 0) {
        throw ('fail');
    }
    if (confirm("Xác nhận xóa")) {
        lenght -= 1;
        $('#item_question_' + lenght).remove();
    }
}

$('#btnEdit').click(function () {
    var data = {};
    var formData = $('#formMatching').serializeArray();
    var formAnswer = $('#formAnswer').serializeArray();
    var formQuestion = $('#formQuestion').serializeArray();
    var answers = [];
    var contentAnswers = [];
    var idAnswer = [];
    var answerCode = [];
    var answerValue = [];
    var idQuestion = [];
    var questionCode = [];
    var contentQuestions = [];

    $.each(formAnswer, function (i, v) {
        if (v.name == 'contents') {
            contentAnswers.push(v.value);
        }
        if (v.name == 'id') {
            idAnswer.push(v.value);
        }
        if (v.name == 'answer_code') {
            answerCode.push(v.value);
        }
        if (v.name == 'answer') {
            answerValue.push(v.value);
        }
    });
    for (var i in contentAnswers) {
        var answerItem = {};
        answerItem['contents'] = contentAnswers[i];
        answerItem['id'] = idAnswer[i];
        answerItem['answerCode'] = answerCode[i];
        answerItem['answer'] = answerValue[i];
        answers.push(answerItem);
    }

    $.each(formQuestion, function (i, v) {
        if (v.name == 'contents') {
            contentQuestions.push(v.value);
        }
        if (v.name == 'id') {
            idQuestion.push(v.value);
        }
        if (v.name == 'answer') {
            questionCode.push(v.value);
        }
    });
    for (var i in contentQuestions) {
        var questionItem = {};
        questionItem['id'] = idQuestion[i];
        questionItem['answer'] = questionCode[i];
        questionItem['contents'] = contentQuestions[i];
        answers.push(questionItem);
    }


    $.each(formData, function (i, v) {
        data[v.name] = v.value;
    });
    data['question'] = CKEDITOR.instances.question.getData();
    //  data['explain'] = CKEDITOR.instances.explain.getData();
    data['explain'] = $('#explain').val();
    data['answers'] = answers;
    if (data['question'] == '') {
        alert("Câu hỏi không được để trống")
        throw "Câu hỏi không được để trống";

    }
    for (var i in contentAnswers) {
        if (contentAnswers[i] == '' || contentAnswers[i] == null) {
            alert("Đáp án không được để trống")
            throw "Đáp án không được để trống";
        }
    }
    var countQuestion = 0;
    var countAnswer = 0;
    $.each(data.answers, function (i, v) {
        if (v.contents == '' || v.contents == null) {
            alert("Đáp án không được để trống")
            throw "Đáp án không được để trống";
        }
        if (v.answer_code == null || v.answer_code == "") {
            countQuestion++;
        } else {
            countAnswer++;
        }
    });

    if (data.id == '') {
        add(data);
    } else if (data.id != '') {
        update(data)
    }
});

function add(data) {
    $.ajax({
        type: "POST",
        url: "/api/admin/question",
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
            $('.loader').css("background")
        },
        success: function (response) {
            console.log(response);
            $('.loader').css("display", "none");
            alert("Thêm thành công");
            window.location.href = "/admin/question/list";
        },
        error: function (response) {
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
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
            $('.loader').css("background")
        },
        success: function (response) {
            console.log(response);
            $('.loader').css("display", "none");
            alert("Cập nhật thành công")
            window.location.href = "/admin/question/list";
        },
        error: function (response) {
            $('.loader').css("display","none");
            alert(response.responseJSON.message) ;
        }
    });
}


