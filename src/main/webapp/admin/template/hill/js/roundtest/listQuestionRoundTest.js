function show_question_round_test() {
    var idround = $('#id_round_test').val();
    var dataArray = {};
    $.ajax({
        url: '/api/admin/roundtest/question/show/' + idround,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        data: JSON.stringify(dataArray),
        dataType: 'json',
        contentType: "application/json",
        beforeSend: function () {
            $('.loader_question').css("display", "block");
            //$('.loader').css("background")
        },
        success: function (res) {

            if(res==0){
                var line = '<div class="class_title_question"><b>Đề thi tự sinh !</b> Hệ thống sẽ tự tạo đề thi cho mỗi thí sinh khi bắt đầu làm bài';
                $('.notification_question').html(line);
                $('.content_question_show').css('display','none');
                $('#onlick_show_question_round_test').removeAttr("onclick");
                $('.loader_question').css("display", "none");
                return;
            }else if(res==1){
                alert("Bạn cần cấu hình câu hỏi ở mục cấu hình vòng thi !");
                return;
            }
            $('.notification_question').css('display','none');
            $('.loader_question').css("display", "none");
            var row = '';
            $(res).each(function (index, item) {
                row += '<div class="row" style=" margin-top: 3px; border-top: 1px solid #b5b5bb80; padding-top: 14px; ">'
                row += '<div class="col-md-9">'
                row += '<h5>Nhóm câu hỏi số ' + (parseInt(index) + 1) + '</h5>'
                row += '<div class="title_question">'
                row += '<span class="title_infor color_title_question1">Số lượng:' + item.countQuestion + '</span>'
                row += '<span class="title_infor color_title_question2">Danh mục:' + item.categoryName + '</span>'
                row += '<span class="title_infor color_title_question3">Cấp độ:' + item.level + '</span>'
                row += '<span class="title_infor color_title_question4">Loại:' + item.typeQuestion + '</span>'
            //    row += '<span class="title_infor color_title_question5">Chuyện đề:' + item.tag + '</span>'
                row += '</div>'
                row += '</div>'
                row += '<div class="col-md-3">'
                row += '<button onclick="showQuestionRoundTest(this)" id_struct_detail_test="' + item.questionRoundTests[0].idStructDetailTest + '" type="button" class="btn btn-block bg-gradient-primary btn-sm check_update_question"> <i class="fas fa-plus"></i>&nbsp;Thêm câu hỏi vào cuối</button>'
                row += '</div>'
                row += '</div>'
                $(item.questionRoundTests).each(function (indexx, itemm) {
                    row += '<div class="card card-default" id="id_question_round_' + itemm.id + '">'
                    row += '<div class="card-header">'
                    row += '<h3 class="card-title">Câu hỏi số ' + (parseInt(indexx) + 1) + '</h3>'
                    row += '<button type="button" onclick="deleteQuestionRoundTest(this)" id_question_round="' + itemm.id + '" class="btn btn-block bg-gradient-danger btn-sm  class_delete_question_round check_update_question"><i class="far fa-trash-alt"></i>&nbsp;Xóa</button>'

                    row += '<div class="card-tools">'
                    row += '<button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>'
                    /*  row += '<button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i></button>'*/
                    row += '</div>'
                    row += '</div>'
                    row += '<!-- /.card-header -->'
                    row += '<div class="card-body">'
                    row += '<div class="row">'
                    row += '<div class="col-md-12 col-sm-6">'
                    row += '<div class="callout callout-info class_answer_form">'
                    if(itemm.question.url){
                        if(itemm.question.type==1) {
                            row += '<video id="videos" width="500px" height="230px" controls  >'
                            row += '<source src="'+itemm.question.url+'" type="video/mp4">'
                            row += 'Your browser does not support the video tag'
                            row += '</video>'
                        } else if(itemm.question.type==2) {
                            row +='<audio src="'+itemm.question.url+'" preload controls></audio>'

                         }
                    }

/*  if(res[2].courseWareTypeId==5){
                        if(res[2].type_video==1&& res[2].files!=null){
                    row += '<video id="videos" width="100%" height="600" controls style=" margin-top:-50px;">'
                                <source src="`+res[2].files+`" type="video/mp4">
         Your browser does not support the video tag.
     </video>` ;
                            }else if(res[2].type_video==2  && res[2].files!=null){
                                k+=`  <iframe width="100%" height="600"
          src="`+res[2].files+`">
         </iframe>`;
                            }else if(res[2].type_video==3 && res[2].files!=null){
                                k+=`<audio src="`+res[2].files+`" preload controls></audio>`;
                            }
*/
                    row += itemm.question.question
                    row += '</div>'
                    row += '<div class="col-md-12">'
                    row += '<div class="answer_question">'
                    if (itemm.question.typeQuestion.id != 4) {
                        $(itemm.listAnswerDTOS).each(function (indexxx, itemmm) {
                            row += '<div class="input-group margin_top_10px">'
                            row += '<div class="input-group-addon">'
                            row += '<span class="input-group-text">'
                            if (itemmm.answerCode == 0) {
                                row += '<input type="checkbox" disabled checked>&nbsp;' + itemmm.answer + '';
                            } else {
                                row += '<input type="checkbox" disabled  >&nbsp;' + itemmm.answer + '';
                            }
                            row += '</span>'
                            row += '</div>'
                            row += '<input type="text" value="' + itemmm.contents + '" readonly class="form-control">'
                            row += '</div>'
                        });
                    } else {
                        row += '<div class="row">'
                        row += '<div class="col-lg-6 ">'
                        $(itemm.listAnswerDTOS).each(function (indexxx, itemmm) {
                            if (!$.isNumeric(itemmm.answer)) {

                                row += '<div class="input-group margin_top_10px">'

                                row += '<div class="input-group-addon">'
                                row += '<span class="input-group-text">'
                                row += itemmm.answer + '&nbsp;&nbsp;<input disabled  value="' + itemmm.answerCode + '" style="width: 27px;text-align: right;height: 22px;" type="text">'
                                row += '</span>'
                                row += '</div>'
                                row += '<textarea  rows="3" cols="10" disabled class="form-control">' + itemmm.contents + '</textarea>'

                                row += '</div>'
                                row += '<!-- /input-group -->'
                            }

                        });
                        row += '</div>'
                        row += '<div class="col-lg-6 ">'
                        $(itemm.listAnswerDTOS).each(function (indexxx, itemmm) {

                            if ($.isNumeric(itemmm.answer)) {
                                row += '<div class="input-group margin_top_10px">'
                                row += '<div class="input-group-addon">'
                                row += '<span class="input-group-text">' + itemmm.answer + '</span>'
                                row += '</div>'
                                //row +='<input value="'+itemmm.contents+'" type="text" disabled class="form-control">'
                                row += '<textarea  rows="3" cols="10" disabled class="form-control">' + itemmm.contents + '</textarea>'
                                row += '</div>'
                                row += '<!-- /input-group -->'

                            }
                        });
                        row += '</div>'
                        row += '</div>'
                    }
                    row += '</div>'
                    row += '</div>'
                    row += '</div>'
                    row += '</div>'
                    row += ' </div>'
                    row += '</div>'
                    row += '<!-- /.post -->'
                });

            });
            $('#content_round_test_tab_2').html(row);
            $('#onlick_show_question_round_test').removeAttr("onclick");

            checkUpdateRoundTest(idround);
        },
        error: function (res) {
            alert("Bạn cần cấu hình câu hỏi ở mục cấu hình vòng thi !");
        }
    });
};



function deleteQuestionRoundTest(btn) {
    var r = confirm("Bạn có muốn xóa ?");
    if (r == true) {
        var idQuestionRound = $(btn).attr('id_question_round');
        $.ajax({
            url: '/api/admin/roundtest/question/delete/' + idQuestionRound,
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            type: 'DELETE',
            dataType: 'json',
            success: function (res) {
                if (res) {
                    $('#id_question_round_' + idQuestionRound).css('display', 'none');
                    show_question_round_test();
                    alert("Xóa thành công");
                } else {
                    alert("Xóa thất bại");
                }
            },
            error: function (res) {

            }
        });
    } else {

    }

}


function exportQuestionRoundTestNotAnsewr(btn) {
    var id = $(btn).attr('id_round_test_not_answer');
    $.ajax({
        url: '/api/admin/roundtest/question/export/notAnswer/' + id,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            if (res == 1) {
                alert("Export thất bại");
            } else {

                alert("Export thành công");
                var name = res;
                window.location.assign('/admin/roundtest/question/export/download?name=' + name);
            }
        },
        error: function (res) {
            if (res == 1) {
                alert("Export thất bại");
            } else {
                alert("Export thành công");
                var name = res.responseText;
                window.location.assign('/admin/roundtest/question/export/download?name=' + name);
            }
        }
    });
}

function getDownloadFileDocNotAnswer(name) {
    name = name.replace(".", "vnpost");
    $.ajax({
        url: '/admin/roundtest/question/export/notAnswer/' + name,
        type: 'GET',
        dataType: 'json',
        success: function (res) {
        },
        error: function (res) {
        }
    });
}

function getDownloadFileDocHaveAnswer(name) {
    name = name.replace(".", "vnpost");
    $.ajax({
        url: '/admin/roundtest/question/export/haveAnswer/' + name,
        type: 'GET',
        dataType: 'json',
        success: function (res) {
        },
        error: function (res) {
        }
    });
}

function exportQuestionRoundTestHaveAnsewr(btn) {
    var id = $(btn).attr('id_round_test_answer');
    $.ajax({
        url: '/api/admin/roundtest/question/export/haveAnswer/' + id,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            if (res == 1) {
                alert("Export thất bại");
            } else {
                alert("Export thành công");
                var name = res;
                window.location.assign('/admin/roundtest/question/export/download?name=' + name);
            }
        },
        error: function (res) {
            if (res == 1) {
                alert("Export thất bại");
            } else {
                // var name = res.responseText.replace(".", "vnpost");
                // window.location.assign('/admin/roundtest/question/export/download/' + name);
                var name = res.responseText;
                window.location.assign('/admin/roundtest/question/export/download?name=' + name);
                alert("Export thành công");

            }
        }
    });

}

