var currentPages;
jQuery(function ($) {
    $(document).ready(function () {
        function paging(totalPage,currentPage){
            $('#pagination-test').twbsPagination({
                totalPages: totalPage,
                startPage: currentPage,
                visiblePages: 10,
                last:'Cuối cùng',
                next:'Tiếp theo',
                first:'Đầu tiên',
                prev:'Phía trước',
                onPageClick: function (event, page) {
                    if (currentPage != page) {
                        var url = "/api/admin/course-join/course";
                        url+="?page="+page;
                        url+="&size="+size;
                        loadUserJoin(url);
                    }
                }
            });
        }
        function findCourse() {
            var courseId = $('#courseId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/course/" + courseId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //  dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    //  $('.loader').css("display","block");
                },
                success: function (response) {
                    response = response.data;
                    if (response.id==null){
                        window.location.href="/admin/course/index";
                    }
                    $('.nameCourse').text(response.name);
                    $('#codeCourse').text(response.code);
                    if (response.price == null || response.price==0) {
                        $('#priceCourse').text("Miễn phí");
                    } else {
                        $('#priceCourse').text(response.price);
                    }
                    if (response.status == 0) {
                        $('#statusCourse').text('Đang hoạt động');
                        $('#statusCourse').addClass("label label-sucess");
                    } else {
                        $('#statusCourse').text('Nháp');
                        $('#statusCourse').addClass("label label-warning");
                    }
                    $('#descriptionCourse').html(response.description);
                    if (response.isOnline == 1) {
                        $('#isOnline').text("Online");
                    } else {
                        $('isOnline').text("Offline");
                    }
                    if (response.freedomRegister == 1) {
                        $('#freedomRegister').text("Có");
                    } else {
                        $('#freedomRegister').text("Không")
                    }
                    $('#startLearning').text(response.courseConfig.startLearning);
                    $('#endLearning').text(response.courseConfig.endLearning);
                    $('#startRegister').text(response.courseConfig.registerStart);
                    $('#endRegister').text(response.courseConfig.registerEnd);
                    if(response.courseConfig.registerEnd==''){
                        $('#register').remove();
                    }
                    $('#categoryName').text(response.categoryName);
                    $('#poscodeName').text(response.poscodeName);
                    loadChapter(response);
                    loadDocumenntInCourse(courseId);
                },
                error: function (response) {
                    console.log(response);
                    $('.loader').css("display", "none");
                }
            });
        }
        function loadDocumenntInCourse(id) {
            $.ajax({
                type: "GET",
                url: "/api/admin/document/course/" + id,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //  dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    //  $('.loader').css("display","block");
                },
                success: function (response) {
                    var row = '';
                    $.each(response,function (i,v) {
                        row+='<tr>';
                        row+='<td>'+(i+1)+'</td>';
                        row+='<td>'+v.name+'</td>';
                        row+='<td class="text-center">'+v.describes+'</td>';
                        row+='<td>';
                        row+='Tên: <a href="'+v.linkFile+'">'+v.linkFile+'</a>';
                        row+='<br>';
                        row+='Người tạo:'+v.createdBy;
                        row+='</td>';

                        row+='</td>';

                        row+='</tr>';
                    });
                    $('#document').append(row);

                },
                error: function (response) {

                }
            });
        }

        function getRole() {
            var courseId = $('#courseId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/user-role-action/course/" + courseId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //  dataType: "json",
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    var roles = [];
                    $.each(response,function (i,v) {
                        roles.push(v.codeAction);
                    });
                    if(roles.includes('ACTION_COURSE_REPORT')){
                        $('#report').css("display","block");
                    }else {
                        $('#report').remove();
                    }
                    if(roles.includes('ACTION_COURSE_CONFIG')){
                        $('.config').css("display","block");
                    }else {
                        $('.config').css("display","none");
                    }
                    if(roles.includes('ACTION_STUDENT_MANAGEMENT')){
                        $('#ACTION_STUDENT_MANAGEMENT').css('display','block');
                    }else {
                        $('#ACTION_STUDENT_MANAGEMENT').remove();
                    }
                    if(roles.includes('ACTION_DOCUMENT_MANAGEMENT')){
                        $('#ACTION_DOCUMENT_MANAGEMENT').css('display','block');
                    }else {
                        $('#ACTION_DOCUMENT_MANAGEMENT').remove();
                    }
                    if(roles.includes('ACTION_COMPETITION_MANAGEMENT')){
                     //   $('.ACTION_COMPETITION_MANAGEMENT').css('display','block');
                    }else {
                        $('.ACTION_COMPETITION_MANAGEMENT').remove();
                    }
                },
                error: function (response) {
                }
            });
        }
        function getStatistic() {
            var courseId = $('#courseId').val();
            $.ajax({
                type: "GET",
                url: "/api/statistic/course/" + courseId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //  dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    //  $('.loader').css("display","block");
                },
                success: function (response) {
                    $('.totalUser').text(response.totalUser);
                    $('#totalUser').text("Học viên / Tổng:"+response.totalUser);
                    $('#totalCourseWare').text(response.totalCourseWare);
                    $('#totalChapter').text("HỌC LIỆU / "+response.totalChapter+" CHƯƠNG MỤC");
                    $('#totalComment').text(response.totalComment);
                    $('#rate').text(response.rate);

                },
                error: function (response) {
                    console.log(response);
                    $('.loader').css("display", "none");
                }
            });
        };



        function typeCourse(data) {
            var type = '';
            switch (data) {
                case 'scorm':
                    type='<i class="lesson scorm"></i>';
                    break;
                case 'freedomlecture':
                    type='<i class="lesson freedom"></i>';
                    break;
                case 'powerpoint':
                    type='<i class="lesson powerpoint"></i>';
                    break;
                case 'video':
                    type='<i class="lesson video"></i>';
                    break;
            }
            return type;
        }
        function loadChapter(data) {
            var row = '';
            $.each(data.outline.chapters,function (i,v) {
                row+='<div class="panel-heading">';
                row+='<h4 class="panel-title">';
                row+='<a data-toggle="collapse" href="#c'+v.id+'" data-parent="#acccordionChude" aria-expanded="false" class="accordion-toggle accordion-toggle-style " >';
                row+=v.name +'</a>';
                row+='</h4>';
                row+='</div>';
                row+='<div class="divider" style="margin: 2px"></div>';
                row+='<div id="c'+v.id+'" aria-expanded="false" class="panel-collapse collapse ">';
                row+='<div class="panel-footer text-center col-md-12 col-sm-12 col-xs-12">';
                row+='<a href="/admin/chapter/detail/'+v.id+'" class="btn btn-outline green-steel">Quản lý học liệu</a>';
                row+='</div>'
                row+='<div class="timeline">';
                $.each(v.chapterCourseWares,function (i2,v2) {
                    row+='<div class="timeline-item text-center">';
                    row+='<div class="timeline-bage">'+typeCourse(v2.courseWare.courseWareType.code)+'</div>';

                    row+='<div class="timeline-body">';
                    row+='<div class="timeline-body-arrow"></div>';
                    row+=' <span class="timeline-body-head font-blue-steel">'+v2.courseWare.name+'</span>';
                    row+='</div>';
                    row+='</div>';
                });
                row+='</div>';
                row+='</div>';
            });
            $('#chapter').empty();
            $('#chapter').append(row);
        }
        $('#tab_3').click(function () {
            loadUserJoin("");
            loadUserManager();
        });
        $('#searchCourseJoin').on('submit',function (e) {
            e.preventDefault();
            loadUserJoin("");
        });
        function  getCourseJoinSearch() {
            var data ={};
            var formSearch = $('#searchCourseJoin').serializeArray();
            $.each(formSearch,function (i,v) {
                data[v.name] = v.value;
            });
            return data;
        }
        function loadUserJoin(url) {
            var data = getCourseJoinSearch();
            var courseId = $('#courseId').val();
            data['courseId'] = courseId;
            if(url==null || url==""){
                var sizes = $('#sizes').val();
                url = "/api/admin/course-join/course"+"?size="+sizes;
            }
            $.ajax({
                type: "POST",
                url: url,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                },
                success: function (response) {

                    if (response.totalPage!=0){
                        paging(response.totalPage,response.currentPage);
                    }
                    $('.loader').css("display", "none");
                    getUserJoin(response.data, courseId);

                },
                error: function (response) {
                    $('.loader').css("display", "none");
                }
            });

        }
        function loadUserManager() {
            var courseId = $('#courseId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/course-member/manager/course/" + courseId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    var row = '';
                    $.each(response, function (i, v) {
                        row += '<tr>';
                        row += '<td>';
                        row += i + 1;
                        row += '</td>';
                        row += '<td>';
                        row += v.username;
                        row += '</td>';
                        row+='<td>';
                        row += v.email;
                        row+='</td>';
                        row += '<td>';
                        row += v.fullName;
                        row += '</td>';
                        row += '<td>';
                        row += v.roleName;
                        row += '</td>';
                        row += '</tr>';
                    });
                    $('#tableTeacher').empty();
                    $('#tableTeacher').append(row);
                    $('.loader').css("display", "none");


                },
                error: function (response) {
                    console.log(response);
                    $('.loader').css("display", "none");
                }
            });
        }
        findCourse();
        getRole();
        function getUserJoin(data, courseId) {
            $('#tableUserJoin').empty();
            var row = '';
            $.each(data, function (i, v) {
                var status = '';
                if (v.status == 0) {
                    status += '<span class="badge badge-warning">Khóa</span>';
                } else {
                    status += '<span class="badge badge-success">Đã duyệt</span>';
                }
                var process = '';
                if (v.join == 0 || v.join == null) {
                    process += '<span class="badge badge-danger"><i class="fa fa-warning"></i>Chưa vào học</span>';
                } else {
                    process += '<span class="badge badge-warning">Đã vào học</span>';
                }
                var finished = '';
                if (v.finished == 0 || v.finished == null) {
                    finished += '<span class="badge badge-warning">Chưa đạt</span>';
                } else if (v.finished == 1) {
                    finished += '<span class="badge badge-success">Đạt</span>';
                }
                var jobTitle = "Chưa cập nhật";
                if(v.user.jobTitle!=null){
                    jobTitle = v.user.jobTitle.name;
                }
                row += '<tr>';
                row += '<td>' + (i + 1) + '</td>';
                row += '<td>' + v['user']['username'] + '</td>';
                row += '<td>' + v.user.fullName + '</td>';
                row +='<td>'+jobTitle+'</td> ';
                // row += '<td>';
                // row += status;
                // row += '</td>';
                row += '<td>';
                row += finished;
                row += '</td>';
                row += '<td>';
                row += process;
                row += '</td>';
                // row+='<td><a href="/admin/courseJoin/progress/'+courseId+'/'+v.user.id+'" class=" badge badge-success "><i class="fa fa-eye"></i>chi tiết</a></td>';

                row += '</tr>';
                $('#tableUserJoin').empty();
                $('#tableUserJoin').append(row);
            });
        };
        $('#tab_6').click(function () {
        });
        getCompetition();
        function getCompetition() {
            var courseId = $('#courseId').val();
            $.ajax({
                type: "GET",
                url: '/api/admin/course/' + courseId + '/competition',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    competition = response;
                    if (competition == null || competition=="" ) {
                        $('.add-competition').css("display", "block");
                    } else {
                        $('.info-competition').css("display", "block");
                        $('.delete-competition').css("display", "block");
                        $('.nameCompetition').text(competition.nameCompetition);
                        $('.categoryCompetition').text(competition.competitionCategory.nameCompetition);
                        $('.descripCompetition').html(competition.describe);
                        $('#btnConfigCompetition').attr("href","/admin/competition/edit/"+competition.id);
                        if(competition.poscodeVnpost!=null){
                            $('.poscodeName').text(competition.poscodeVnpost.name);
                        }


                    }
                    getRole();
                },
                error: function (response) {

                }
            })
        };
    })
})





$('#btnCompetition').click(function () {
    $('#modalCompetition').modal();
});

function addCompetition(competitionId, courseId) {
    var data = {};
    data['id'] = courseId;
    data['competitionId'] = competitionId;
    $.ajax({
        type: "POST",
        url: "/api/admin/course/competition",
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            alert("Thêm thành công")
            window.location.reload(true);
            $('.loader').css("display", "none");

        },
        error: function (response) {
            console.log(response);
            alert("Thêm không thành công")
            $('.loader').css("display", "none");
        }
    });
}

function deleteCompetition(competitionId, courseId) {
    if (!confirm("Xác nhận xóa cuộc thi")) {
        throw "Hủy xóa thi thành công";
    }
    var data = {};
    data['id'] = courseId;
    data['competitionId'] = competitionId;
    $.ajax({
        type: "DELETE",
        url: "/api/admin/course/competition",
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            alert("Xóa thành công")
            window.location.reload(true);
            $('.loader').css("display", "none");

        },
        error: function (response) {
            console.log(response);
            alert("Xóa không thành công")
            $('.loader').css("display", "none");
        }
    });
}