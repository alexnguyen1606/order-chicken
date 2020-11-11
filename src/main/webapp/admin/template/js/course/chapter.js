jQuery(function ($) {
    $(document).ready(function () {
        var course = {};
        $('.btnClose').on('click', function () {
            findCourseWareByChapterId();
        });

        function findCourse() {
            var chapterId = $('#chapterId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/course/chapter/" + chapterId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //  dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    //  $('.loader').css("display","block");
                },
                success: function (response) {
                    course = response;
                    $('.courseName').text(response.name);
                    $('.courseName').attr("href", "/admin/course/detail/" + response.id);
                    $('.courseLink').attr("href", "/admin/course/edit/" + response.id);
                    var rowChapter = '';
                    $.each(response.outline.chapters, function (i, v) {
                        rowChapter += '<a class="dropdown-item" href="/admin/chapter/detail/' + v.id + '"><i class="fa fa-book"></i>' + v.name + '</a>';
                    });
                    $('#listChapter').append(rowChapter);
                    $('#courseId').val(response.id);
                }
            })
        }

        function findChapterById() {
            var chapterId = $('#chapterId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/chapter/" + chapterId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //  dataType: "json",
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    $('#percentFinish').val(response.percentFinish)
                    $('.chapterName').text(response.name);
                    loadCourseWare(response.chapterCourseWares)

                }
            })
        };

        function findCourseWareByChapterId() {
            var chapterId = $('#chapterId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/courseWare/chapter/" + chapterId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //  dataType: "json",
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {

                    loadCourseWare(response);

                }
            })
        };

        function typeCourse(data) {
            var type = '';
            switch (data) {
                case 'scorm':
                    type = '<i class="lesson scorm"></i>';
                    break;
                case 'freedomlecture':
                    type = '<i class="lesson freedom"></i>';
                    break;
                case 'powerpoint':
                    type = '<i class="lesson powerpoint"></i>';
                    break;
                case 'video':
                    type = '<i class="lesson video"></i>';
                    break;
            }
            return type;
        }

        function loadCourseWare(data) {
            var chapterId = $('#chapterId').val();
            var row = '';
            $.each(data, function (i, v) {
                var linkedit = '';
                if (v.courseWareType.id == 1) {
                    linkedit = '/admin/courseware/scorm/edit/' + v.id;
                } else if (v.courseWareType.id == 3) {
                    linkedit = '/admin/courseware/freelectures/edit/' + v.id;
                } else if (v.courseWareType.id == 4) {
                    linkedit = '/admin/courseware/powerpoint/edit/' + v.id;
                } else if (v.courseWareType.id == 5) {
                    linkedit = '/admin/courseware/video/edit/' + v.id;
                }
                var courseWare = v;
                var type = typeCourse(courseWare.courseWareType.code);
                row += '<tr id="' + courseWare.id + '">';
                row += '<td>' + (i + 1) + '</td>';
                row += '<td class="text-center" width="40%">' + courseWare.name + '</td>';
                row += ' <td class="text-center">' + type + '</td>';
                row += '<td width="120" class="text-center">';
                row += '<button type="button" class="btn btn-square btn-xs btn-primary updown up" value="up"';
                row += 'title="Lên trên"> <i class="fa fa-arrow-up" aria-hidden="true"></i></button>';
                row += '<button type="button" class="btn btn-square btn-xs btn-success updown down" value="up"';
                row += ' title="xuống dưới"> <i class="fa fa-arrow-down" aria-hidden="true"></i></button>';
                row += '</td>';
                row += '<td  class="text-center">';
                row += '<a href="#" data-toggle="dropdown" onclick="' + menuFunction(this) + '" idItem="' + courseWare.id + '" onmousemove="" id="dropFunction_' + courseWare.id + '" data-hover="dropdown"  role="button" aria-haspopup="true" aria-expanded="false" >';
                row += '<div class="label label-info"><i class="fa fa-th"></i></div>';
                row += '</a>';
                row += '<div class="dropdown-menu "  aria-labelledby="dropFunction_' + courseWare.id + '">';
                row += ' <a class="dropdown-item" href="' + linkedit + '" ><i class="fa fa-pencil-square icon"></i>Sửa</a>';
                row += '<div class="divider"></div>';
                row += '<a class="dropdown-item detailCourseWare" data-toggle="modal" data-id="' + courseWare.id + '" data-target="#modalDetailCourseWare"><i class="fa fa-eye icon"></i>Chi tiết</a>';
                row += '<a class="dropdown-item process-course-ware" data-id="' + courseWare.id + '"><i class="fa fa-exchange icon"></i>Tiến trình</a>';
                row += '<a class="dropdown-item process-finish" data-id="' + courseWare.id + '" data-toggle="modal" data-target="#process-finish-course-ware" ><i class="fa fa-exchange icon"></i>Điều kiện hoàn thành</a>';
                row += '<div class="divider"></div>';
                row += '<a class="dropdown-item" onclick="deleteCourseWare(this,' + chapterId + ')" idItem="' + courseWare.id + '" href="#"><i class="fa fa-trash icon"></i>Xóa</a>';
                row += '</div>';
                row += '</td>';
                row += '</tr>'
            });
            $('#listCourseWare').empty();
            $('#listCourseWare').append(row);

        }

        $(document).on('click', '.process-course-ware', function () {
            var courseWareId = $(this).attr('data-id');
            var courseId = $('#courseId').val();
            var chapterId = $('#chapterId').val();
            window.location.href = '/admin/courseware/process/' + courseId + '/' + courseWareId + '/' + chapterId;
        });
        findChapterById();
        findCourse();
        findCourseWareByChapterId();
        $(document).on('click', '.up,.down', function () {
            var row = $(this).parents('tr:first');
            if ($(this).is('.up')) {
                $('#btnSavePosition').removeClass("disabled");
                row.insertBefore(row.prev());

            } else {
                $('#btnSavePosition').removeClass("disabled");
                row.insertAfter(row.next());

            }
        });
        $(document).on('click', '.detailCourseWare', function () {
            var id = $(this).attr('data-id');
            getDetailCourseWare(id);
        });

        function getDetailCourseWare(id) {
            $.ajax({
                type: "GET",
                url: "/api/admin/courseWare/" + id,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    $('#detailCourseWare').empty();
                    var idType = response.courseWareType.id;
                    var preFix = "https://view.officeapps.live.com/op/embed.aspx?src=http://elearning-uat.vnpost.vn";
                    switch (idType) {
                        case 5:
                            if (response.type_video == "2") {
                                $('#detailCourseWare').append('<div class="col-md-12" style="padding-bottom: 56.55%"><iframe class="col-md-12 position-absolute" style="height: 100%" src="' + response.files + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>')
                            } else if (response.type_video == "1") {
                                $('#detailCourseWare').append('<video class="col-md-12" controls><source src="' + response.files + '" type="video/mp4"> cc </video>');
                            }else if(response.type_video=="3"){
                                $('#detailCourseWare').append('<audio class="col-md-12" controls><source src="' + response.files + '" type="audio/mpeg"> cc </audio>');
                            }
                            $('.loader').css("display", "none");
                            break;
                        case 1:
                            $('#detailCourseWare').append('<div class="col-md-12" style="padding-bottom: 56.55%"><iframe class="col-md-12 position-absolute" style="height: 100%" src="' + response.files + '" ></iframe></div>');
                            break;
                        case 4:
                            $('#detailCourseWare').append('<div class="col-md-12" style="padding-bottom: 56.55%"><iframe class="col-md-12 position-absolute" style="height: 100%" src="' + (preFix + response.files) + '" ></iframe></div>');
                            break;
                        case 2:
                            break;
                        case 3:
                            $('#detailCourseWare').html(response.content);
                            break;
                        default:
                            $('.loader').css("display", "none");
                            break;
                    }
                    $('.loader').css("display", "none");

                },
                error: function (response) {

                }
            });
        };
        $('#openModalCourseWare').on('click', function () {
            getChapter("");
        });

        function getChapter(url) {
            var data = getData();
            if (url == null || url == "") {
                url = "/api/admin/courseWare";
            }
            $.ajax({
                type: "PUT",
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
                    console.log(response);
                    $('.loader').css("display", "none");
                    if (response.totalPage>0){
                        paging(response.totalPage, response.currentPage);
                    }
                    loadData(response.data);


                },
                error: function (response) {
                    console.log("fail");
                    console.log(response);

                }
            });
        }

        function paging(totalPage, currentPage) {
            $('#pagination-test').twbsPagination({
                totalPages: totalPage,
                startPage: currentPage,
                visiblePages: 10,
                last: 'Cuối cùng',
                next: 'Tiếp theo',
                first: 'Đầu tiên',
                prev: 'Phía trước',
                onPageClick: function (event, page) {
                    if (currentPage != page) {
                        var url = "/api/admin/courseWare";
                        url += "?page=" + page;
                        getChapter(url);
                    }
                }
            });
        }

        $('#formUpdateChapter').on('submit', function (e) {
            e.preventDefault();
            var formData = $('#formUpdateChapter').serializeArray();
            var data = {};
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            $.ajax({
                type: "PUT",
                url: "/api/admin/chapter",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {

                    $('.loader').css("display", "none");
                    window.location.reload();
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            })

        })
        $(document).on('click', '.addCourseWare', function (e) {
            var id = $(this).attr("dataId");
            var courseId = $('#courseId').val();
            var chapterId = $('#chapterId').val();
            var data = {};
            data['courseWareId'] = id;
            data['chapterId'] = chapterId;
            data['courseId'] = courseId;
            add(data);
        });
        $(document).on('click', '.process-finish', function (e) {
            var courseWareId = $(this).attr("data-id");
            $('#courseWareId').val(courseWareId);
            var chapterId=$('#chapterId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/chapterCourseWare/"+courseWareId+"/"+chapterId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                // data: JSON.stringify(data),
                // dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    $('#percentFinished').val(response.data.percentFinished);
                    $('.loader').css("display", "none");
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            });

        });
        $('#form-update-process-course-ware').on('submit', function (e) {
            e.preventDefault();
            var dataForm = $('#form-update-process-course-ware').serializeArray();
            var data = {};
            $.each(dataForm, function (i, v) {
                data[v.name] = v.value;
            });
            $.ajax({
                type: "PUT",
                url: "/api/admin/chapterCourseWare/progress-finish",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {

                    $('.loader').css("display", "none");
                    alert("Cập nhật thành công");
                    window.location.reload();
                }, error: function (response) {
                    console.log(response);
                    alert("Cập nhật không thành công")
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            });

        })
        function loadData(data) {

            $('#courseWareList').empty();
            $.each(data, function (i, v) {
                var createdDate = new Date(v.createdDate);
                var row = '';
                var type = '';
                var code = v.courseWareType.code;
                switch (code) {
                    case 'homework':
                        type = '<i class="lesson homework"></i>';
                        break;
                    case 'scorm':
                        type = '<i class="lesson scorm"></i>';
                        break;
                    case 'freedomlecture':
                        type = '<i class="lesson freedom"></i>';
                        break;
                    case 'powerpoint':
                        type = '<i class="lesson powerpoint"></i>';
                        break;
                    case 'video':
                        type = '<i class="lesson video"></i>';
                        break;
                    case 'interactive':
                        type = '<i class="lesson interactive"></i>';
                        break;
                    default:
                        type = '<i class="lesson homework"></i>';
                        break;
                }
                var poscode = v.poscodeName;
                if (poscode == '' || poscode == null) {
                    poscode = "Tổng công ty"
                }
                row += '<tr role="row" id="' + v.id + '">';
                row += '<td>' + v.name;
                row += '<p class="text_info font-blue-steel">';
                row += '<i class="fa fa-building-o icon"></i>';
                row += poscode;
                row += '</p>';
                row += '</td>';
                row += type;
                row += '<td>';
                row += type;
                row += '</td>';
                row += '<td>'
                row += 'Ngày tạo:' + createdDate.toLocaleTimeString() + ' ' + createdDate.toLocaleDateString();
                row += '<br>';
                row += 'Người tạo:' + v.createdBy;
                row += '</td>';

                row += '<td>';
                row += '<a class="btn btn-xs btn-danger addCourseWare"  dataId="' + v.id + '"><i class="fa fa-plus" aria-hidden="true" style="color: white"></i></a>';
                row += '</td>';
                row += '</tr>';
                $('#courseWareList').append(row);

            });
        }


        function add(data) {
            $.ajax({
                type: "POST",
                url: "/api/admin/chapterCourseWare",
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
                    alert(response.message);
                    $('#'+data.courseWareId).remove();
                    // getChapter("");
                },
                error: function (response) {
                    console.log("fail");
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        }
        $('#btnSearch').click(function () {
            getChapter("");

        });
        $('#formSearch').on('submit', function (e) {
            e.preventDefault();
            getChapter("");
        });


    });

});
//end jQuery
$('.up,.down').click(function () {
    var row = $(this).parents('tr:first');
    console.log("choeck row")
    if ($(this).is('.up')) {
        $('#btnSavePosition').removeClass("disabled");
        row.insertBefore(row.prev());

    } else {
        $('#btnSavePosition').removeClass("disabled");
        row.insertAfter(row.next());

    }

});


function getData() {
    var data = {};
    var formData = $('#formSearch').serializeArray();
    $.each(formData, function (index, v) {
        data["" + v.name + ""] = v.value;
    });
    return data;
}



function getChapter(url) {
    var data = getData();
    if (url == null || url == "") {
        url = "/api/admin/courseWare";
    }
    $.ajax({
        type: "PUT",
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
            console.log(response);
            $('.loader').css("display", "none");
            loadData(response.data);
                if (response.totalPage>0){
                    paging(response.totalPage,response.currentPage);
                }


        },
        error: function (response) {
            console.log("fail");
            console.log(response);

        }
    });
}





function savePosition(chapterId) {
    if (!$('#btnSavePosition').hasClass("disabled")) {
        var ids = [];
        var data = {};
        data['chapterId'] = chapterId;
        $('#listCourseWare').find('tr').each(function () {

            ids.push($(this).attr("id"));
        });
        data['ids'] = ids;
        console.log(data);
        $.ajax({
            type: "PUT",
            url: "/api/admin/chapterCourseWare",
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            beforeSend: function () {

            },
            success: function (response) {
                console.log(response);
                alert("Lưu vị trí thành công");
                window.location.reload(true);
            },
            error: function (response) {
                console.log("fail");
                console.log(response);
                alert("Lưu vị trí không thành công");
            }
        });
    }

}

function menuFunction(btn) {
    var id = $(btn).attr("idItem");
}

function deleteCourseWare(btn, chapterId) {
    if (confirm("Xác nhận xóa học liệu")) {
        var id = $(btn).attr("idItem");
        var data = {};
        data['courseWareId'] = id;
        data['chapterId'] = chapterId;

        $.ajax({
            type: "DELETE",
            url: "/api/admin/chapterCourseWare",
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            beforeSend: function () {

            },
            success: function (response) {
                console.log(response);
                alert(response.message);
                window.location.reload(true);
            },
            error: function (response) {
                alert(response.responseJSON.message);

            }
        });
    }

}
