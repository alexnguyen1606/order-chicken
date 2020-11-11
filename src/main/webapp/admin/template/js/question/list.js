var totalPages = null;
var currentPages = 1;
var count = 0;
jQuery(function ($) {
    $(document).ready(function () {
        $('#search').on('submit', function (e) {
            e.preventDefault();
            getListQuestion("");
        });

        function getListQuestion(url) {
            if (url == null || url == "") {
                url = "/api/admin/question/all";
            }
            var data = getData();
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
                }, success: function (serviceResult) {
                    totalPages = serviceResult.totalPage;
                    currentPages = serviceResult.currentPage;
                    loadQuestion(serviceResult.data);
                    if (serviceResult.totalPage > 0) {
                        paging(serviceResult.totalPage, serviceResult.currentPage);
                    }

                    $('.loader').css("display", "none");
                }, error: function () {
                    $('.loader').css("display", "none");
                }
            })
        }

        function getQuestionCategory() {
            $.ajax({
                type: "GET",
                url: "/api/admin/question-category/parent?size=100",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                success: function (response) {
                    var row = '';

                    $.each(response.data, function (i, v) {
                        row += '<option value="' + v.id + '">' + v.nameCategory + '</option>';
                        if (v.listChild.length > 0) {
                            row += showListChild(v.listChild);
                        }

                    });

                    $('#questionCategoryId').append(row);
                }, error: function () {

                }
            })
        }

        function showListChild(listChild) {
            var row = '';
            $.each(listChild, function (i, item) {
                    count++;
                    if (item.parentName != null) {
                        parentName = item.parentName;
                    }
                    var prefix = "";
                    if (count == 1) {
                        prefix = "&emsp; -- "
                    }
                    if (count == 2) {
                        prefix = "&emsp; &emsp; -- "
                    }
                    if (count == 3) {
                        prefix = "&emsp; &emsp; &emsp; --"
                    }
                    if (count == 4) {
                        prefix = "&emsp; &emsp; &emsp; --"
                    }
                    row += '<option value="' + item.id + '">' + prefix + item.nameCategory + '</option>';
                    if (item.listChild.length > 0) {
                        row += showListChild(item.listChild);
                    } else {
                        count--;
                    }
                }
            );
            return row;
        }

        function getLevelQuestion() {
            $.ajax({
                type: "GET",
                url: "/api/admin/question/level/all",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                success: function (response) {
                    var row = '';
                    $.each(response, function (i, v) {
                        row += '<option value="' + v.id + '">' + v.nameLevell + '</option>';
                    });
                    $('#levelId').append(row);
                }, error: function () {

                }
            })
        }

        function getData() {
            var data = {};
            var formData = $('#search').serializeArray();
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            return data;
        }

        function loadQuestion(data) {
            var row = '';
            $.each(data, function (i, v) {
                var status = '';
                if (v.statusQuestion == 1) {
                    status = '<i class="text-warning fa fa-circle"></i>';
                } else {

                    status = '<i class="text-success fa fa-circle"></i>';
                }
                var type = '/admin/question';
                switch (v.typeQuestion.id) {
                    case 1:
                        type += '/edit/true-false/' + v.id;
                        break;
                    case 2:
                        type += '/edit/single-choise/' + v.id;
                        break;
                    case 3:
                        type += '/edit/multi-choise/' + v.id;
                        break;
                    case 4:
                        type += '/edit/matching/' + v.id;
                        break;
                    case 5:
                        type += '/edit/' + v.id;
                        break;
                    default:
                        type += '/edit/' + v.id;
                        break;
                }
                row += '<tr id="question_' + v.id + '">';
                row += '<td width="10px">' + (i + 1) + '</td>';
                row += '<td>' + status + '</td>';
                row += '<td width="30%">' + v.question + '</td>';
                row += '<td>' + v.typeQuestion.nameType + '</td>';
                row += '<td>' + v.levell.nameLevell + '</td>';
                row += '<td class="text-info"><p><i class="fa fa-folder-o icon "></i>Ngày tạo: ' + v.createdDate + '</p>' +
                    '<p><i class="fa fa-file-text-o icon"></i>Người tạo: ' + v.createdBy + '</p></td>';
                row += '<td class="text-center">';
                row += '<a href="#" data-toggle="dropdown" id="dropFunction_' + v.id + '" data-hover="dropdown"role="button" aria-haspopup="true" aria-expanded="false">';
                row += ' <div class="label label-info"> <i class="fa fa-th"></i></div>';
                row += '</a>';
                row += '<div class="dropdown-menu " aria-labelledby="dropFunction_' + v.id + '">';
                row += '<a class="dropdown-item" href="' + type + '"><i\n' +
                    '                                            class="fa fa-pencil-square icon"></i>Sửa</a>';
                row += '<a class="dropdown-item" onclick="deleteQuestion(' + v.id + ')" \n' +
                    '                                       href="#"><i class="fa fa-trash icon"></i>Xóa</a>'
                row += '</div>'

                row += '</td>';
                row += '</tr>'
            });
            $('#listQuestion').empty();
            $('#listQuestion').append(row);
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
                    if (currentPages != page) {
                        var url = "/api/admin/question/all";
                        url += "?page=" + page;
                        getListQuestion(url);
                    }
                }
            });
        }

        function getTypeQuestion() {
            $.ajax({
                type: "GET",
                url: "/api/admin/question/type/all",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                success: function (response) {
                    var row = '';
                    row += ' <option value="">--Loại câu hỏi--</option>';
                    $.each(response.data, function (i, v) {
                        row += '<option value="' + v.id + '">' + v.nameType + '</option>';
                    });
                    $('#typeQuestionId').empty();
                    $('#typeQuestionId').append(row);

                }, error: function () {
                    console.log("error")
                }
            })
        };
        $('#btnSearch').click(function () {
            getListQuestion("");
        });
        $('#search').on("submit", function (e) {
            e.preventDefault();
            getListQuestion("");
        })
        getQuestionCategory();
        getLevelQuestion();
        getListQuestion("");
        // getTypeQuestion();
        $('#questionCategoryId').change(function () {
            getListQuestion("");
        })
        $('#status').change(function () {
            getListQuestion("");
        })
        $('#typeQuestionId').change(function () {
            getListQuestion("");
        });
        $('#levelId').change(function () {
            getListQuestion("");
        });
    });

});


function deleteQuestion(id) {
    if (confirm("Xác nhận xóa câu hỏi")) {
        $.ajax({
            type: "DELETE",
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            url: "/api/admin/question/" + id,
            //data: JSON.stringify(data),
            dataType: "json",
            // contentType:"application/json",
            beforeSend: function () {
                $('.loader').css("display", "block");
                $('.loader').css("background")
            },
            success: function (response) {
                console.log(response);
                alert("Xóa câu hỏi thành công");
                window.location.reload();
                $('.loader').css("display", "none");
                $('#question_' + id).remove();
            },
            error: function (response) {
                console.log(response);
                console.log("fail");
                $('.loader').css("display", "none");
                alert("Câu hỏi đang được sử dụng!");
            }
        });
    }
}

$('#importExcel').on('change', function () {
    var formData = new FormData();
    formData.append('multipartFile', $('#importExcel')[0].files[0]);
    $.ajax({
        url: '/api/admin/upload/excel',
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        type: 'POST',
        enctype: 'multipart/form-data',
        data: formData,
        processData: false,  // Important!
        contentType: false,
        cache: false,
        success: function (result) {
            $('#src').val(result);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('The following error occured: ' + textStatus, errorThrown);
        }
    });
});
$('#btnEdit').click(function () {
    var data = {};
    var formData = $('#questionForm').serializeArray();
    $.each(formData, function (i, v) {
        data[v.name] = v.value;
    });
    importExcel(data);
});

function importExcel(data) {
    $.ajax({
        type: "POST",
        url: "/api/admin/question/add/excel",
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            $('.loader').css("display", "none");
            alert("Thêm thành công " + response.totalItemImport + " câu hỏi");
            window.location.reload(true);
        },
        error: function (response) {

        }
    });
}

function downloadCategory() {
    $.ajax({
        type: "GET",
        url: "/api/admin/question-category/template",
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        // data: JSON.stringify(data),
        // dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            $('.loader').css("display", "none");
            console.log(response);
            window.location.href = "/admin/download/template/question-category?name=" + response;
        },
        error: function (response) {
            $('.loader').css("display", "none");
        }
    });
}