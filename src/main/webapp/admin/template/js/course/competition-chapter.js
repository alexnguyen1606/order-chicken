jQuery(function ($) {
    $(document).ready(function () {
        function getCompetitionForChapter() {
            var chapterId = $('#chapterId').val();
            var url = "/api/admin/course/competition/chapter/" + chapterId;
            $.ajax({
                type: "GET",
                url: url,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    var competition = response.data;
                    $('.nameCompetition').text(competition.nameCompetition);
                    if (competition.competitionCategory != null) {
                        $('.categoryCompetition').text(competition.competitionCategory.nameCompetition);
                    }
                    if (competition.poscodeVnpost != null) {
                        $('.poscodeName').text(competition.poscodeVnpost.name);
                    }
                    $('.descripCompetition').html(competition.describe);
                    $('#btnConfigCompetition').attr("href", "/admin/competition/edit/" + competition.id);
                    $('#competitionForChapter').css("display", "block");
                },
                error: function (response) {
                    //$('#competitionForChapter').remove();
                }
            });
        }

        function pagingCompetition(totalPage, currentPage) {
            $('#pagination-competition').twbsPagination({
                totalPages: totalPage,
                startPage: currentPage,
                visiblePages: 10,
                last: 'Cuối cùng',
                next: 'Tiếp theo',
                first: 'Đầu tiên',
                prev: 'Phía trước',
                onPageClick: function (event, page) {
                    if (page != currentPage) {
                        var url = "/api/admin/course/competition/chapter";
                        url += "?page=" + page;
                        getCompetition(url);
                    }
                }
            });
        }

        function getDataSearchCompetition() {
            var data = {};
            var formData = $('#formSearchCompetition').serializeArray();
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            return data;
        }

        function getCompetition(url) {
            var data = getDataSearchCompetition();
            if (url == '' || url == null) {
                url = "/api/admin/course/competition/chapter";
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
                    $('#pagination-competition').empty();
                    $('#pagination-competition').removeData("twbs-pagination");
                    $('#pagination-competition').unbind("page");
                },
                success: function (response) {
                    $('.loader').css("display", "none");
                    var row = '';
                    $.each(response.data, function (i, v) {
                        row += '<tr>';
                        row += '<td>' + v.nameCompetition + '</td>';
                        row += '<td>' + v.describe + '</td>';
                        row += '<td><a class="btn btn-xs btn-danger addCompetition"  dataId="' + v.id + '" ><i\n' +
                            '                                    class="fa fa-plus" aria-hidden="true" style="color: white"></i></a></td>';
                        row += '</tr>';
                    });
                    $('#tableCompetition').empty();
                    $('#tableCompetition').append(row);
                    if (response.totalPage != 0) {
                        pagingCompetition(response.totalPage, response.currentPage)
                    }
                },
                error: function (response) {
                    $('.loader').css("display", "none");
                }
            });

        }

        $('#formSearchCompetition').on('submit', function (e) {
            e.preventDefault();
            getCompetition("");
        });
        $('#modalCompetitionForChapter').on('click', function () {
            getCompetition("");
        });
        $(document).on('click', '.addCompetition', function () {
            var chapterId = $('#chapterId').val();
            var competitionId = $(this).attr('dataId');
            var data = {};
            data['chapterId'] = chapterId;
            data['competitionId'] = competitionId;
            addCompetition(data);
        });

        function addCompetition(data) {
            $.ajax({
                type: "POST",
                url: "/api/admin/course/competition/chapter",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    getCompetitionForChapter();
                    getCompetition();
                    alert(response.message);
                },
                error: function (response) {
                    alert(response.responseJSON.message);
                }
            });
        }

        $(document).on('click', '#deleteCompetition', function () {
            var chapterId = $('#chapterId').val();
            if (!confirm("Xác nhận xóa phần thi")) {
                throw "stop delete";
            }
            $.ajax({
                type: "DELETE",
                url: "/api/admin/course/competition/chapter/" + chapterId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //dataType: "json",
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    getCompetitionForChapter();
                    getCompetition("");
                    $('#competitionForChapter').css("display", "none");
                    alert(response.message);
                },
                error: function (response) {
                    alert(response.responseJSON.message);
                }
            });
        });
        getCompetitionForChapter();

    });
})