var course = {};
var count;
jQuery(function ($) {
    $(document).ready(function () {

        function getCourse() {
            var courseId = $('#id').val();
            if (courseId != null && courseId != "") {
                $.ajax({
                    type: "GET",
                    url: "/api/admin/course/" + courseId,
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType: "application/json",
                    beforeSend: function () {
                        //  $('.loader').css("display","block");
                    },
                    success: function (response) {
                        response = response.data;
                        course = response;
                        $('#name').val(response.name);
                        $('#categoryId').val(response.categoryId);
                        $('#code').val(response.code);
                        $('#price').val(response.price);
                        $('#description').html(response.description);
                        $('#courseConfigId').val(response.courseConfig.id);
                        $('#startLearning').val(response.courseConfig.startLearning);
                        $('#endLearning').val(response.courseConfig.endLearning);
                        $('#ends').val(response.courseConfig.ends);
                        $('#starts').val(response.courseConfig.starts);
                        $('#startRegister').val(response.courseConfig.registerStart);
                        $('#endRegister').val(response.courseConfig.registerEnd);
                        $('#thumb-img').attr("src", response.avatar);
                        $('#avatar').val(response.avatar);
                        $('#outlineId').val(response.outline.id);
                        $('#percentFinish').val(response.percentFinish);
                        $('#isHasCertificate').val(response.isHasCertificate);
                        $('#status').empty();
                        if (response.status == 1) {
                            $('#status').append('<option value="0" id="disable">Nh??p </option>');
                            $('#status').append('<option value="1" id="enable" selected >Ho???t ?????ng </option>');
                        } else {
                            $('#status').append('<option value="0" id="disable" selected >Nh??p </option>');
                            $('#status').append('<option value="1" id="enable">Ho???t ?????ng </option>');
                        }
                        if (response.highlight == 1) {
                            $('#highlight').attr("checked", "checked");
                        }
                        if (response.stepbystep == 1) {
                            $('#stepbystep').attr("checked", "checked");
                        }
                        if (response.showName == 1) {
                            $('#showName').attr("checked", "checked")
                        }
                        if (response.courseConfig.freedomRegister == 1) {
                            $('#enableRegister').attr("selected", "selected");
                        } else {
                            $('#disableRegister').attr("selected", "selected");
                        }
                        // var approveAuto = ''
                        // if (response.courseConfig.approveAuto==1){
                        //     approveAuto+='<option value="0" id="disableApproveAuto">Kh??ng</option>';
                        //     approveAuto+='<option value="1" selected id="enableApproveAuto">C??</option>';
                        // } else {
                        //     approveAuto+='<option value="0" selected id="disableApproveAuto">Kh??ng</option>';
                        //     approveAuto+='<option value="1" id="enableApproveAuto">C??</option>';
                        // }
                        // $('#approveAuto').empty();
                        // $('#approveAuto').append(approveAuto);
                        // $('#approveAuto').trigger('click');
                        var rowChapter = '';
                        $.each(response.outline.chapters, function (i, v) {
                            rowChapter += '<tr id="row_chapter_' + v.id + '">';
                            rowChapter += '<input type="hidden" name="percentFinish" value="' + v.percentFinish + '" >';
                            rowChapter += '<td class="a">' + (i + 1) + '<input type="hidden" name="id" value="' + v.id + '"></td>';
                            rowChapter += '<td><input class="form-control" name="name" value="' + v.name + '"></td>';
                            rowChapter += '<td>';
                            rowChapter += '<button class="btn btn-icon btn_remove btn-danger" type="button" id="' + v.id + '"title="x??a"><i class="fa fa-trash-o icon"></i>X??a ch????ng m???c</button>';
                            rowChapter += '</td>';
                            rowChapter += '</tr>';
                        });
                        $('#listchapter').append(rowChapter);
                        changeApproveAuto();
                    },
                    error: function (response) {

                    }
                });
            }

        }

        function getUnitMapping() {
            var courseId = $('#id').val();
            if (courseId != null && courseId != "") {
                $.ajax({
                    type: "GET",
                    url: "/api/admin/course-unit-mapping/course/" + courseId,
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType: "application/json",
                    beforeSend: function () {
                        //  $('.loader').css("display","block");
                    },
                    success: function (response) {
                        var data = response.data;
                        if (data.length > 0) {
                            var row = '';
                            $.each(data, function (i, v) {
                                row += ' <label id="label' + i + '"  class="col-md-3 col-form-label label-normal"></label>'
                                row += '<div class="col-md-6" id="rowUnit' + i + '">'
                                row += '<div class="dropdown" style="width: 100%">'
                                row += '<div class="form_unit">'
                                row += '<input name="courseUnitMapping"  index="' + i + '"  type="text" id_unit="' + v.idPoscode + '" value="' + v.idPoscode + '" class="form-control class_box_id_unit" onkeyup="getNamePoscodeById(this)" id="text_box_name_unit_competion' + i + '" placeholder="M?? ????n v???">'
                                row += '<input  type="hidden" id_unit="' + v.idPoscode + '" name="email" class="form-control class_name_unit" id="name_unit' + i + '" placeholder="">'
                                row += '<span id="name_unit">????n v???:<span class="class_name_unit_form" id="name_unit_form' + i + '">' + v.poscodeName + '<span></span></span></span>'
                                row += '</div>'
                                row += '<div class="dropdown-content showlistUnit showlistUnit' + i + '" style="width: 625px;">'
                                row += '</div>'
                                row += '</div>'
                                row += '</div>'
                                row += '<div class="col-md-2 class_remove' + i + '">'
                                row += '<button id="' + i + '"  type="button" class=" btn_small_40 btn btn-block btn-outline-danger btn-sm remove_unit_competition" title="X??a"><i class="fas fa-remove"></i></button>'
                                row += '</div>'
                                showUnitParentByid("showlistUnit" + i, i);
                            });
                            $('#list_unit_competion').empty();
                            $('#list_unit_competion').html(row);

                        }
                    },
                    error: function (response) {

                    }
                });
            }
        }

        function getCategory() {
            $.ajax({
                type: "GET",
                url: "/api/admin/course-category/parent",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    //  $('.loader').css("display","block");
                },
                success: function (response) {
                    var row = '';
                    response = response.data;
                    console.log(response)
                    $.each(response, function (i, item) {
                        row += '<option value="' + item.id + '">' + item.name + '</option>';
                        if (item.listChild.length > 0) {
                            count = 0;
                            row += showListChild2(item.listChild);
                        }
                    });
                    $('#categoryId').append(row);
                    if (course.categoryId != null) {
                        $('#categoryId').val(course.categoryId);
                    }


                },
                error: function (response) {

                }
            });
        }

        function showListChild2(listChild) {
            var row = '';
            $.each(listChild, function (i, item) {
                    count++;
                    var prefix = "";
                    for (var x = 1; x <= count; x++) {
                        prefix += "&emsp;"
                    }
                    prefix += "--";
                    row += '<option value="' + item.id + '">' + prefix + item.name + '</option>';
                    if (item.listChild.length > 0) {
                        row += showListChild2(item.listChild);
                    } else {
                        count--;
                    }
                }
            );
            return row;
        }

        function changeApproveAuto() {
            var value = $("#freedomRegister option:selected").val();
            console.log(value);

            var element = document.querySelector("#register")
            if (value == "1") {
                element.style.display = "block";
                $('#startRegister').val(course.courseConfig.registerStart);
                $('#endRegister').val(course.courseConfig.registerEnd);
            } else if (value == "0") {
                element.style.display = "none";
                $('#startRegister').val("");
                $('#endRegister').val("");
            }
        }


        getCourse();
        getUnitMapping();
        getCategory();
        $('#approveAuto').on('click', function () {
            var value = $(this).val();
            var element = document.querySelector("#register")
            if (value == 1) {
                $('#freedomRegister').attr('disabled', 'disabled');
                element.style.display = "none";
            } else if (value == 0) {
                $('#freedomRegister').removeAttr('disabled');

            }
        });
        $('#freedomRegister').on('click', function () {
            var value = $(this).val();
            var element = document.querySelector("#register");
            if (value == "1") {
                element.style.display = "block";
            } else if (value == "0") {
                element.style.display = "none";
            }
        });

    })
});
$(document).ready(function () {


    function changeApproveAuto() {
        var value = $("#freedomRegister option:selected").val();
        console.log(value);
        var element = document.querySelector("#register")
        if (value == "1") {
            element.style.display = "block";
        } else if (value == "0") {
            element.style.display = "none";
        }
    }

    changeApproveAuto();

});


$('#starts').clockpicker({
    placement: 'top',
    align: 'right',
    autoclose: true,
    'default': '20:48'
});
$('#ends').clockpicker({
    placement: 'top',
    align: 'right',
    autoclose: true,
    'default': '20:48'
});


$('#btnEditCourse').click(function () {
    var data = {};
    var outline = {};
    var chapters = [];

    var formOutline = $('#formOutline').serializeArray();
    var formData = $('#formEdit').serializeArray();
    var formChapter = $('#formChapter').serializeArray();
    var formConfig = $('#formConfig').serializeArray();

    var dataConfig = {};
    var dataChapter = {};

    $.each(formConfig, function (index, v) {
        if (v.name == "ends") {
            if (v.value == "") {
                alert("Th???i gian h???c trong ng??y kh??ng h???p l???");
                throw "time is not true";
            }
            dataConfig["" + v.name + ""] = "2020-10-10 " + v.value;
        } else if (v.name == "starts") {
            if (v.value == "") {
                alert("Th???i gian h???c trong ng??y kh??ng h???p l???");
                throw "time is not true";
            }
            dataConfig["" + v.name + ""] = "2020-10-10 " + v.value;
        } else {
            dataConfig["" + v.name + ""] = v.value;
        }
    });

    if (dataConfig.freedomRegister == "0") {
        dataConfig['registerStart'] = "";
        dataConfig['registerEnd'] = "";
    }
    $.each(formOutline, function (i, v) {
        outline[v.name] = v.value;
    });

    var listChapterName = [];
    var listChapterId = [];
    var listPercentFinishChapter = [];
    $.each(formChapter, function (index, v) {

        if (v.name == "id") {
            listChapterId.push(v.value);

        } else if (v.name == "name") {
            listChapterName.push(v.value);
        } else if (v.name == "percentFinish") {
            listPercentFinishChapter.push(v.value);
        }
    });
    for (var i in listChapterId) {
        var chapter = {};
        chapter['name'] = listChapterName[i];
        chapter['id'] = listChapterId[i];
        chapter['percentFinish'] = listPercentFinishChapter[i];
        chapters.push(chapter);
    }
    outline['chapters'] = chapters;

    var listUnit = getListPoscode();
    $.each(formData, function (index, v) {
        if (v.name == "description") {
            //data["" + v.name + ""] = CKEDITOR.instances.description.getData();
            data["" + v.name + ""] = v.value;
        } else if (v.name == "courseUnitMapping") {
            /*if (v.value!='' && (!listUnit.includes(v.value) )){

                listUnit.push(v.value);
            }
*/
        } else {
            data["" + v.name + ""] = v.value;
        }

    });
    if (dataConfig.freedomRegister == '' || dataConfig.freedomRegister == null) {
        dataConfig.freedomRegister = 0;
    }
    data['courseUnitMapping'] = listUnit;
    data['pcode'] = $('#pcode').val();
    dataChapter['id'] = $('#outlineId').val();
    data['courseConfig'] = dataConfig;
    data['outline'] = outline;

    if (data['name'] == '') {
        alert('T??n kh??a h???c kh??ng ???????c ????? tr???ng !');
        throw "Name course cant null !";
    }
    if (data.price < 0) {
        alert("Gi?? ti???n kh??ng h???p l???");
        throw "price is not true";
    }
    if (data['courseConfig']['startLearning'] == '') {
        alert("Ng??y b???t ?????u h???c kh??ng ???????c b??? tr???ng");
        throw "startLearning is null";
    }

    if (data['courseConfig']['endLearning'] == '') {
        alert("Ng??y k???t th??c h???c kh??ng ???????c b??? tr???ng");
        throw "endLearning is null";
    }
    if (data['courseConfig']['freedomRegister'] == 1) {
        if (data['courseConfig']['registerStart'] == '') {
            alert("Th???i gian b???t ?????u ????ng k?? kh??ng ???????c b??? tr???ng");
            throw "start is null";
        }

    }
    if (data['courseConfig']['freedomRegister'] == 1) {
        if (data['courseConfig']['registerEnd'] == '') {
            alert("Th???i gian k???t th??c ????ng k?? kh??ng ???????c b??? tr???ng");
            throw "end is null";
        }
    }

    if (data['courseConfig']['starts'] == '') {
        alert("Th???i gian b???t ?????u h???c trong ng??y kh??ng ???????c b??? tr???ng");
        throw "start is null";
    }

    if (data['courseConfig']['ends'] == '') {
        alert("Th???i gian k???t th??c h???c trong ng??y kh??ng ???????c b??? tr???ng");
        throw "end is null";
    }
    if (data.courseConfig.ends < data.courseConfig.starts) {
        alert("Th???i gian h???c trong kh??ng h???p l??? ");
        throw "start bigger end";
    }
    if (data['courseConfig']['startLearning'] > data['courseConfig']['endLearning']) {
        alert("Th???i gian b???t ?????u kh??a h???c kh??ng th??? l???n h??n th???i gian k???t th??c kh??a h???c")
        throw "startLearning cannot bigger than endLearning";
    }
    if (data['courseConfig']['endLearning'] <= data['courseConfig']['registerEnd']) {
        alert("Th???i gian ????ng k?? kh??ng h???p l???");
        throw "Time register not true";
    }
    if (data.registerStart == "") {
        data['registerStart'] = "2020-10-10";
    }
    if (data.registerEnd == "") {
        data['registerEnd'] = "2020-10-10";
    }
    console.log(data);
    if (data.id == "") {
        postCourse(data);
    } else {
        putCourse(data);
    }
});

function getListPoscode() {
    var lists = [];
    $("input[name='idPoscodeCourse[]']").each(function () {
        if ($(this).attr('id_unit') != 'null' && $(this).attr('id_unit') != '') {
            lists.push($(this).attr('id_unit'));
        }
    });
    return lists;
}


function postCourse(data) {
    console.log(data);
    $.ajax({
        type: "POST",
        url: "/api/admin/course",
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            alert(response.message);
            window.location.href = "/admin/course/detail/" + response.data.id;
        },
        error: function (response) {
            alert(response.responseJSON.message);
            $('.loader').css("display", "none");
            console.log(response);
        }
    });
}

function putCourse(data) {
    console.log(data);
    $.ajax({
        type: "PUT",
        url: "/api/admin/course",
        data: JSON.stringify(data),
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            console.log("add success");
            alert(response.message);
            //alert("C???p nh???t th??nh c??ng")
            window.location.href = "/admin/course/detail/" + data.id + "?statistic=active";
        },
        error: function (response) {
            console.log("fail");
            alert(response.responseJSON.message);
            $('.loader').css("display", "none");
            console.log(response);
        }
    });
}

function checkEndlearning() {
    var end = $('#endLearning').val();
    var start = $('#startLearning').val();
    if (end < start) {
        alert("Th???i gian b???t ?????u kh??a h???c kh??ng ???????c l???n h??n th???i gian k???t th??c ")
        return false;
    } else {
        return true;
    }
}

function checkRegister() {
    var end = $('#endRegister').val();
    var start = $('#startRegister').val();
    var endLearn = $('#endLearning').val();
    if (start > end) {
        alert("Th???i gian k???t th??c ????ng k?? kh??a h???c kh??ng ???????c l???n h??n th???i gian b???t ?????u ????ng k??")
        document.getElementById("endRegister").focus();
        return false;
    } else if (end > endLearn) {
        alert("th???i gian k???t th??c ????ng k?? kh??ng ???????c l???n h??n th???i gian k???t th??c kh??a h???c");
        document.getElementById("endRegister").focus();

        return false;

    } else {
        return true;
    }
}

function checkTimelearn() {
    var start = $('#start').val();
    var end = $('#end').val();
    if (start > end) {
        alert("Th???i gian k???t th??c bu???i h???c ph???i l???n h??n th???i gian b???t ?????u bu???i h???c");
        document.getElementById("end").focus();
        return false;
    } else {
        return true;
    }
}

function deleteCourse(id) {
    if (!confirm("X??c nh???n x??a kh??a h???c")) {
        throw "Do not delete";
    }
    $.ajax({
        type: "DELETE",
        url: "/api/admin/course/" + id,
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        contentType: "application/json",
        success: function (response) {
            console.log("add success");
            alert('X??a th??nh c??ng!');
            console.log(response);
            window.location.href = "/admin/course/index";
        },
        error: function (response) {
            console.log("fail");
            alert("X??a kh??ng th??nh c??ng !");
            console.log(response);
        }
    });

}

$('#thumb-input').on('change', function () {
    var formData = new FormData();
    formData.append('multipartFile', $('#thumb-input')[0].files[0]);

    $.ajax({
        url: '/api/admin/upload/images',
        type: 'POST',
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        enctype: 'multipart/form-data',
        data: formData,
        processData: false,  // Important!
        contentType: false,
        cache: false,
        beforeSend: function () {
            $('#loader').css("display", "block");
        },
        success: function (result) {
            // console.log(result);
            console.log(result);
            $('#thumb-img').attr("src", result);
            $('#thumb-img-src').val(result);
            $('#avatar').val(result);
            $('#loader').css("display", "none");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#loader').css("display", "none");
            console.log('The following error occured: ' + textStatus, errorThrown);
        }
    });
});

function validDateStudyMin(e) {
    $('#endLearning').attr("min", e.value);
    //console.log(e.value)
}

function validDateStudyMax(e) {
    $('#startLearning').attr("max", e.value);
    //console.log(e.value)
}

function validDateRegisterMin(e) {
    $('#endRegister').attr("min", e.value);
}

function validDateRegisterMax(e) {
    $('#startRegister').attr("max", e.value);
}

function validTimeStudy(e) {
    //  $('#end').attr("min",e.value);

}



