function GetListTest(dataArray,number_page){
    dataArray["page"]=number_page;
    dataArray["maxPageItems"]=13;
    $.ajax({
        url: '/api/admin/test/list',
        headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
        type: 'POST',
        data: JSON.stringify(dataArray),
        dataType:'json',
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
            //$('.loader').css("background")
        },
        success: function (res) {
            $('.loader').css("display", "none");
            var row = '';
            $(res.testDTOList).each(function (i, item) {
                var day = new Date(item.timeCreate);
               // day = $.datepicker.formatDate('dd MM yyyy HH:MM:SS',day);

                row+='<tr id="tr_test'+item.id+'">'
                row+='<td>'
                row+=((parseInt(number_page)-1)*13) +(parseInt(i)+1);
                row+='</td>';
                row+='<td>'
                row+=item.name;
                row+='</td>';
                row+='<td>'+item.countQuestion+'</td>';
                row+='<td>'+item.user.fullName+'</td>';
                row+='<td>'+day.toLocaleDateString()+' '+day.toLocaleTimeString()+'</td>';
                row+='<td>';
                row+='<div class="input-group-addon">';
                row+='<div   class="label label-info"  data-toggle="dropdown">';
                row+='<i class="fas fa-th icon-th"></i>';
                row+='</div>';
                row+='<ul class="dropdown-menu item-drop-competition">';
                row+='<a href="/admin/test/'+item.id+'/edit"><li class="dropdown-item"><i class="fas fa-cog"></i>&nbsp;Thiết lập</li></a>';
                row+='<a id_test="'+item.id+'" onclick="removeTest(this)" href="#"><li class="dropdown-item"><i class="far fa-trash-alt"></i>&nbsp;Xóa</li></a>';
                row+='</ul>';
                row+='</div>';
                row+='</td>';
                row+='</tr>';
            });
            $('#count_record').text(res.count +" Bản ghi dữ liệu");
            $('#count_record').attr('count',res.count);
            $('#data_list_test').html(row);
        }
    });
}
$('.btn_save_test').on('click',function () {
    var dataArray = {};
    //console.log('1');
    if(validateFormTest() &&  checkChooseQuestionSourceValue2()){
        console.log('2');
        dataArray["id_test_kit"]=$('#name_cate').attr('id_cate');
        dataArray["name"]=$('#name_test').val();
        dataArray["description"]= CKEDITOR.instances.content_detail.getData();


        var listStructTest = [];
        var countGroup =$('#sum_group').attr('index_group');
        var listCount = $("input[name='nameInputQuestion[]']").map(function(){if($(this).val()!=0){return $(this).val();}}).get();

        var count = $("input[name='nameInputQuestion[]']").map(function(){if($(this).val()!=0){return $(this).val();}}).get().length;
        for (var i=0 ;i<count;i++){
           // listStructTest.push($('.list_tag_show' + i + 'list_tag_show' + i).val());
            listStructTest.push(null);
            listStructTest.push($('#selectLevel' + i).val());
            listStructTest.push($('#id_row_' + i + 'id_row_' + i).val());
            listStructTest.push($('#selectType' + i).val());
            listStructTest.push(listCount[i]);


        }
        dataArray["listStructTest"] = listStructTest;
        if($('#test_id').val()!=''){
            dataArray["id"]=  $('#test_id').val();
        }
        $('html,body').scrollTop(0);
        $.ajax({
            url: '/api/admin/test/edit',
            headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
            type: 'POST',
            data: JSON.stringify(dataArray),
            dataType:'json',
            contentType: "application/json",
            beforeSend: function () {
                $('.loader').css("display", "block");
                //$('.loader').css("background")
            },
            success: function (res) {
             //   console.log(res);
                $('.loader').css("display", "none");
                alert("Thêm thành công");
                setTimeout(
                    function()
                    {
                        window.location.href="/admin/test/list"
                    }, 2000);

            },
            error :function (res) {
                console.log(res);
                alert("Thất bại");
            }
        });
    }


});

function  checkChooseQuestionSourceValue2() {

        if($("#sum_count_question").attr('index_count') =='0'){
            $('#check_group_question').css("display", "block");
            return false;
        }else{
            $('#check_group_question').css("display", "none");
            return true;
        }
}
function validateFormTest() {
    if($('#name_cate').attr('id_cate')==''
        || $('#name_test').val()==''
    ){
        if($('#name_cate').attr('id_cate')=='' ){
            $('#test_kit_value_check').css("display", "block");

        }else{
            $('#test_kit_value_check').css("display", "none");

        }

        if($('#name_test').val()==''){
            $('#name_test_check').css("display", "block");

        }else{
            $('#name_test_check').css("display", "none");

        }
    	 return false;
        }else {

            return true;
        }
        return false;
}


function  show_question_test() {

    var idtest = $('#test_id').val();
    var dataArray = {};
    $.ajax({

        url: '/api/admin/test/question/show/'+ idtest,
        headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
        type: 'POST',
        data: JSON.stringify(dataArray),
        dataType: 'json',
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
            //$('.loader').css("background")
        },
        success: function (res) {
            $('.loader').css("display", "none");
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
              //  row += '<span class="title_infor color_title_question5">Chuyện đề:' + item.tag + '</span>'
                row += '</div>'
                row += '</div>'
                row += '<div class="col-md-3">'
                row += '<button   onclick="showQuestionRoundTest(this)" id_struct_detail_test="' + item.questionRoundTests[0].idStructDetailTest + '" type="button" class="btn btn-block bg-gradient-primary btn-sm "> <i class="fas fa-plus"></i>&nbsp;Thêm câu hỏi vào cuối</button>'
                row += '</div>'
                row += '</div>'
                $(item.questionRoundTests).each(function (indexx, itemm) {
                    row += '<div class="card card-default" id="id_question_round_' + itemm.id + '">'
                    row += '<div class="card-header">'
                    row += '<h3 class="card-title">Câu hỏi số ' + (parseInt(indexx) + 1) + '</h3>'
                    row += '<button type="button" onclick="deleteQuestionRoundTest(this)" id_question_round="' + itemm.id + '" class="btn btn-block bg-gradient-danger btn-sm  class_delete_question_round"><i class="far fa-trash-alt"></i>&nbsp;Xóa</button>'

                    row += '<div class="card-tools">'
                    row += '<button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>'
                   /* row += '<button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i></button>'*/
                    row += '</div>'
                    row += '</div>'
                    row += '<!-- /.card-header -->'
                    row += '<div class="card-body">'
                    row += '<div class="row">'
                    row += '<div class="col-md-12 col-sm-6">'
                    row += '<div class="callout callout-info class_answer_form">'
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
            $('#content_test_tab_2').html(row);
            $('#onlick_show_question_test').removeAttr("onclick");
        },
        error: function (res) {
        }
    });
};


function  deleteQuestionRoundTest(btn) {
    var r = confirm("Bạn có muốn xóa ?");
    if(r == true){
        var idQuestion = $(btn).attr('id_question_round');
        $.ajax({

            url: '/api/admin/test/question/delete/'+idQuestion,
            headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
            type: 'DELETE',
            dataType: 'json',
            success: function (res) {
                if(res){
                    $('#id_question_round_'+idQuestion).css('display','none');
                    show_question_test();
                    alert("Xóa thành công");

                }else {
                    alert("Xóa thất bại");
                }


            },
            error: function (res) {

            }
        });
    }else{

    }

}

function showQuestionRoundTest(btn) {
    $('html,body').scrollTop(0);
    $('.loader').css("display", "block");
    var id_struct_detail_test=$(btn).attr('id_struct_detail_test');

    var showUrl = '/admin/test/load/show/question/'+id_struct_detail_test;
    $('#myModalAddQuestionTest').load(showUrl,'',function () {
        //$('.wrapper').css('display','none');
        $('#myModalAddQuestionTest').modal();

    });
}


function  removeTest(btn) {
    var r = confirm("Bạn có muốn xóa ?");
    if(r == true){
        var id = $(btn).attr('id_test');
        $.ajax({

            url: '/api/admin/test/delete/'+id,
            headers: { "Authorization": 'Bearer ' +localStorage.getItem("eln_token") },
            type: 'DELETE',
            dataType: 'json',
            beforeSend: function () {
                $('.loader').css("display", "block");
                //  $('.loader').css("display", "none");
                //$('.loader').css("background")
            },
            success: function (res) {
                $('.loader').css("display", "none");
                if(res){
                    $('#tr_test'+id).css('display','none');
                    var dataArray={};
                    var number_page = 1;
                    GetListTest(dataArray,number_page);
                    alert("Xóa thành công");
                }else {
                    alert("Xóa thất bại,bài thi đã được sử dụng");
                }
            },
            error: function (res) {

            }
        });
    }else{

    }
}

function exportQuestionTestNotAnsewr(btn) {
    var id = $(btn).attr('id_test_not_answer');
    $.ajax({
        url: '/api/admin/test/export/notAnswer/' + id,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        beforeSend: function () {
            $('.loader').css("display", "block");
            //  $('.loader').css("display", "none");
            //$('.loader').css("background")
        },
        success: function (res) {
            $('.loader').css("display", "none");
            if (res == 1) {
                alert("Export thất bại");
            } else {

                alert("Export thành công");
                var name = res.responseText;
                window.location.assign('/admin/test/export/download?name=' + name);
            }
        },
        error: function (res) {
            $('.loader').css("display", "none");
            if (res == 1) {
                alert("Export thất bại");
            } else {
                alert("Export thành công");
                var name =res.responseText;
                window.location.assign('/admin/test/export/download?name=' + name);
            }
        }
    });
}



function exportQuestionTestHaveAnsewr(btn) {
    var id = $(btn).attr('id_test_answer');
    $.ajax({
        url: '/api/admin/test/export/haveAnswer/' + id,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        type: 'POST',
        dataType: 'json',
        beforeSend: function () {
            $('.loader').css("display", "block");
            //  $('.loader').css("display", "none");
            //$('.loader').css("background")
        },
        success: function (res) {
            $('.loader').css("display", "none");
            if (res == 1) {
                alert("Export thất bại");
            } else {
                alert("Export thành công");
                var name =res.responseText;
                window.location.assign('/admin/test/export/download?name=' + name);
            }
        },
        error: function (res) {
            $('.loader').css("display", "none");
            if (res == 1) {
                alert("Export thất bại");
            } else {
                alert("Export thành công");
                 var name =res.responseText;
                window.location.assign('/admin/test/export/download?name=' + name);


            }
        }
    });

}
