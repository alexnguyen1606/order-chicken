jQuery(function ($) {
    $(document).ready(function () {
        function findCourse() {
            var courseId = $('#courseId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/course/" + courseId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                },
                success: function (response) {
                    console.log(response);
                    $('.courseName').text(response.data.name);

                }, error: function (response) {
                    console.log(response);
                }
            })
        };

        function findCourseWare() {
            var courseWareId = $('#courseWareId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/courseWare/" + courseWareId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //  dataType: "json",
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    console.log('/ ' + response.name);
                    $('.courseWareName').text('/ ' + response.name);

                }, error: function (response) {
                    console.log(response);
                }
            })
        };

        function findCoureWareProcess(url) {
            var courseWareId = $('#courseWareId').val();
            var courseId = $('#courseId').val();
            var chapterId = $('#chapterId').val();
            if (url == "" || url == "") {
                url = "/api/admin/course-ware/process/" + courseId + "/" + courseWareId + '/' + chapterId;
            }
            $.ajax({
                type: "GET",
                url: url,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                },
                success: function (response) {
                    console.log(response.data)
                    if (response.totalPage > 0) {
                        paging(response.totalPage, response.currentPage);
                    }
                    loadData(response.data);
                    $('.loader').css("display", "none");

                }, error: function (response) {
                    console.log(response);
                }
            });
        }

        function paging(totalPage, currentPages) {
            $('#pagination-test').twbsPagination({
                totalPages: totalPage,
                startPage: currentPages,
                visiblePages: 10,
                last: 'Cuối cùng',
                next: 'Tiếp theo',
                first: 'Đầu tiên',
                prev: 'Phía trước',
                onPageClick: function (event, page) {
                    var courseWareId = $('#courseWareId').val();
                    var courseId = $('#courseId').val();
                    var chapterId = $('#chapterId').val();
                    if (currentPages != page) {
                        var url = "/api/admin/course-ware/process/" + courseId + "/" + courseWareId + '/' + chapterId;
                        url += "?page=" + page;
                        findCoureWareProcess(url);
                    }
                }
            });
        }

        function loadData(data) {
            var row = '';
            $.each(data, function (i, v) {
                var status = '';
                if (v.status == 0 || v.status == null) {
                    status = '<span class="badge badge-danger"><i class="fa fa-warning"></i>Chưa hoàn thành</span>';
                } else if (v.status == 1) {
                    status = '<span class="badge badge-warning">Hoàn thành</span>';
                }
                var progress = Math.round(v.percentFinished);
                var jobTitle = "Chưa cập nhật";
                if (v.jobTitleName != null) {
                    jobTitle = v.jobTitleName;
                }
                row += '<tr>';
                row += '<td>' + (i + 1) + '</td>';
                row += '<td>' + v.user.fullName + '<p>' + v.user.username + '</p></td>';
                row += '<td>' + jobTitle + '</td>';
                row += '<td>' + status + '</td>';
                row += '<td><div class="progress-bar progress-bar-striped bg-info" title="' + progress + '%" role="progressbar" style="width: ' + progress + '% " aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"><span style="color: black">' + progress + '%</span></div></td>'
                row += '<td>Số lần xem:' + v.totalView + '</td>';
                row += '<td>Lần truy cập cuối:' + v.modifiedDate + '</td>';
                row += '<tr>';

            });
            $('#courseWareProcess').empty();
            $('#courseWareProcess').append(row);
        }

        findCoureWareProcess("");
        findCourseWare();
        findCourse();
    })
})