function getValueRoundTest(id_round_test) {
    $.ajax({
        url: '/api/admin/roundtest/' + id_round_test,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            $('#name_round_test').text(" Vòng thi " + res.nameRound);
            $('#time_round_test').text((parseInt(res.timeRound) / 60) + " phút");
            $('#describes_round_test').html(res.describes);
        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}

function getValueCandidate(id_user, countTime, id_round_test) {
    $.ajax({
        url: '/api/admin/candidate/' + id_user + "/" + countTime + "/" + id_round_test,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            $('#id_name_cadidates').text(res.user.fullName);
            $('#id_name_point').text(res.point);
            $('#id_name_cadidates').text(res.user.fullName);

            var resutl = '';
            if (res.status == 0) {
                resutl = '<span>Kết quả : <span class="badge bg-primary">Đạt</span></span>';
            } else {
                resutl = '<span>Kết quả : <span class="badge bg-danger">Chưa đạt</span></span>';
            }
            $('#show_result_detail').html(resutl);
            $('#result_round').text(res.result);
            var time_start = new Date(res.timestart);
            $('#do_test_at').text(time_start.toLocaleString());
            var time_end = new Date(res.timeend);
            $('#end_test_at').text(time_end.toLocaleString());
        },
        error: function (res) {
            console.log(res);
            alert(console.log(res));
        }
    });
}

function getListQuestionByCountIdUserIdRound(id_user, countTime, id_round_test) {
    $.ajax({
        url: '/api/admin/roundtest/question/' + id_user + "/" + countTime + "/" + id_round_test + "/list",
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            var row = '';
            $(res).each(function (index, item) {
                if (item.isCorrect == 1) {
                    row += '<div class="card" style="background: #faebd77a;">'
                }
                if (item.isCorrect != 1) {
                    row += '<div class="card" style="background: #8bc34a45;">'
                }
                row += '<div class="card-body">'
                row += '<div class="question_corect">'
                if (item.isCorrect == 0) {
                    row += '<span class="badge bg-green">Đúng</span>&nbsp;<b>Câu&nbsp;' + (parseInt(index) + 1) + '&nbsp;</b><span class="badge bg-primary">+' + item.addOrSub + '&nbsp;điểm</span>'
                }
                if (item.isCorrect == 1) {
                    row += '<span class="badge bg-danger">Sai</span>&nbsp;<b>Câu&nbsp;' + (parseInt(index) + 1) + '&nbsp;</b><span class="badge bg-primary">' + item.addOrSub + '&nbsp;điểm</span>'
                }
                row += '</div>'
                row += '<br>'
                row += '<div class="question_result">'
                row += '<span>'
             /*   if(item.type==1) {
                    row += '<video id="videos" width="500px" height="230px" controls  >'
                    if(item.url){
                        row += '<source src="'+item.url+'" type="video/mp4">'
                    }
                    row += 'Your browser does not support the video tag'
                    row += '</video>'
                } else if(item.type==2) {
                    if(item.url){
                        row +='<audio src="'+item.url+'" preload controls></audio>'
                    }
                }*/

                if(item.url){
                    if(item.type==1) {
                        row += '<video id="videos" width="500px" height="230px" controls  >'
                        row += '<source src="'+item.url+'" type="video/mp4">'
                        row += 'Your browser does not support the video tag'
                        row += '</video>'
                    } else if(item.type==2) {
                        row +='<audio src="'+item.url+'" preload controls></audio>'

                    }
                }
                row += item.question
                row += '</span>'
                row += '</div>'
                row += '<br>'
                if (item.typeQuestion.id != 4) {
                    //row += '<c:forEach items="${item.listAnswerDTOS}" var="itemm" varStatus="loopp">'
                    $(item.listAnswerDTOS).each(function (index2, itemm) {
                        row += '<div class="col-md-12">'
                        row += '<div class="form-group class_magin_0 clearfix" style="margin-bottom: 3px">'
                        row += '<div class="icheck-primary d-inline" >'

                        if (itemm.youChose == 0) {
                            row += '<input type="radio" id="radioPrimaryyy' + (parseInt(index2) + 1) + '" checked>'
                        }
                        if (itemm.youChose != 0) {
                            row += '<input type="radio" id="radioPrimaryyy' + (parseInt(index2) + 1) + '"  >'
                        }
                        row += '<label for="radioPrimary' + (parseInt(index2) + 1) + '">'
                        row += '</label>'
                        row += '</div>'
                        row += '<div class="icheck-success d-inline">'
                        if (itemm.answerCode == 0) {
                            row += '<input type="radio"    checked id="radioSuccessss' + (parseInt(index2) + 11) + '">'
                        }
                        if (itemm.answerCode == 1) {
                            row += '<input type="radio"   id="radioSuccessss' + (parseInt(index2) + 11) + '">'
                        }
                        row += '<label for="radioSuccess' + (parseInt(index2) + 11) + '">'
                        row += itemm.answer +'.&nbsp; '
                        row += itemm.contents
                        row += '</label>'
                        row += '</div>'
                        row += '</div>'
                        row += '</div>'
                    });
                };
                if (item.typeQuestion.id == 4) {
                    row += '<div class="row">'
                    row += '<div class="col-lg-6 ">'
                    row += '<c:forEach items="${item.listAnswerDTOS}" var="itemm" varStatus="loopp">'
                    $(item.listAnswerDTOS).each(function (index2, itemm) {

                        // row += '<c:set var="numberAsString">${itemm.answer}</c:set>'
                        if (!$.isNumeric(itemm.answer)) {
                            if(itemm.answer==null || itemm.answer=='null' ){
                                itemm.answer=''
                            }
                            if(itemm.youChose==null  || itemm.youChose=='null' ){
                                itemm.youChose=''
                            }


                            row += '<div class="input-group margin_top_10px">'
                            row += '<div class="input-group-addon">'
                            row += '<span class="input-group-text">'
                            row += itemm.answer + '&nbsp;&nbsp;<input disabled  value="' + itemm.youChose + '" style=" width: 27px;text-align: center;;height: 22px;background: #007bff59;border: none;" type="text">'
                            row += '&nbsp;<input disabled  value="' + itemm.answerCode + '" style="width: 27px;height: 22px;background: #28a7457d;border: none;text-align: center;" type="text">'
                            row += '</span>'
                            row += '</div>'
                            row += '<textarea  rows="3" cols="10" disabled class="form-control">' + itemm.contents + '</textarea>'
                            row += '</div>'
                        }
                    });
                    row += '</div>'
                    row += '<div class="col-lg-6 ">'
                    // row += '<c:forEach items="${item.listAnswerDTOS}" var="itemm" varStatus="loopp">'
                    $(item.listAnswerDTOS).each(function (index2, itemm) {
                        //row += '<c:set var="numberAsString">${itemm.answer}</c:set>'
                        //row += '<c:if test="${numberAsString.matches('[0 - 9] + ')}">'
                        if ($.isNumeric(itemm.answer)) {
                            row += '<div class="input-group margin_top_10px">'
                            row += '<div class="input-group-addon">'
                            row += '<span class="input-group-text">' + itemm.answer + '&nbsp;</span>'
                            row += '</div>'
                            row += '<textarea  rows="3" cols="10" disabled class="form-control">' + itemm.contents + '</textarea>'
                            row += '</div>'
                        }
                    });
                    row += '</div>'
                    row += '</div>'
                }
                if(item.explain){
                    row += '<div style="color: #fd7e14">' + item.explain + '</div>';
                }
                    row += '</div>'
                    row += '</div>'
            });
            $('#question_round_list').html(row);
            $('#id_length_question_round').val(res.length);
            $('#count_round_test_question').text(" " + res.length + " Câu hỏi");
            $('#id_length_round').text(res.length);
        },
        error: function (res) {
            console.log(res);
           // alert(console.log(res));
        }
    });
}