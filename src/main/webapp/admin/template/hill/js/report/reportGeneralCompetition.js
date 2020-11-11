//var url_elearning_office = "https://view.officeapps.live.com/op/embed.aspx?src=http://elearning-uat.vnpost.vn"
//var url_elearning_office  = "https://view.officeapps.live.com/op/embed.aspx?src=http://localhost:8080"
var url_elearning_office  = "https://view.officeapps.live.com/op/embed.aspx?src=https://study.vnpost.vn"

//var localhost = "http://elearning-uat.vnpost.vn"
//var localhost  = "http://localhost:8080"
var localhost = "https://study.vnpost.vn"
jQuery(function ($) {


    $(document).ready(function () {

        showReportCompetitionGeneral('');

        $('.btn-search-report').on('click', function (e) {
            showReportCompetitionGeneral('');
        });

        function showReportCompetitionGeneral(url) {
            if (url == null || url == "") {
                url = "/api/admin/report/competition/list/general";
            }
            var dataArray = {};
            if ($('.time-create').val() != '') {
                dataArray['createdDate'] = $('.time-create').val();
            }
            dataArray["idUnit"] = $('#name_unit').attr('id_unit');
            $.ajax({
                url: url,
                type: "POST",
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                data: JSON.stringify(dataArray),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                    $("#pagination-test").empty();
                    $("#pagination-test").removeData("twbs-pagination");
                    $("#pagination-test").unbind("page");
                },
                success: function (res) {
                    $('.loader').css("display", "none");
                    if (Object.keys(res.data).length > 0) {

                        if (res.totalPage > 0) {
                            paging(res.totalPage, res.currentPage);
                        }
                        loadCompetitionlGeneral(res.data, res.currentPage);

                    } else {
                        alert("Báo cáo không có dữ liệu")
                    }


                },
                error: function (res) {
                    console.log(res);
                    alert("Có lỗi sảy ra");
                }
            });
        }

        function loadCompetitionlGeneral(data, currentPage) {
            var row = '';
            $(data).each(function (i, items) {
                var date = new Date(items.createdDate)
                row += '<tr>'
                row += '<td>' + (((parseInt(currentPage) - 1) * 10) + (parseInt(i) + 1)) + '</td>'
                row += '<td><a href="https://view.officeapps.live.com/op/embed.aspx?src=' + localhost + items.url + '" target="_blank">' + items.nameFile + '</a></td>';
                row += '<td>'
                row += date.toLocaleString('vi');
                row += '</td>'
                row += '<td>'
                row += items.createdBy;
                row += '</td>'
                row += '<td>'
                row += '<td class="text-center"><a href="' + items.url + '" class="mr-2" title="Tải xuống" style="font-size:18px"><i class="fas fa-download" ></i></a> <a data-id="' + items.id + '" style="font-size:18px" class="color-red delete-btn" title="Xóa"><i class="fas fa-trash" ></i></a></td>';
                row += '</td>'
            });
            $('.data-competition-general').html(row);

        }

        function loadCompetitionlBeforeExport(data, currentPage) {
            var row = '';
            $(data).each(function (i, items) {
                var date = new Date(items.createdDate)
                row += '<tr>'
                row += '<td>' + (((parseInt(currentPage) - 1) * 10) + (parseInt(i) + 1)) + '</td>'
                row += '<td>'
                row += items.nameCompetition
                row += '</td>'
                row += '<td>'
                row += items.competitionCategory.nameCompetition
                row += '</td>'
                row += '<td>'
                if(items.poscodeVnpost){
                    row += items.poscodeVnpost.name
                }else{
                    row +=  'Tổng công ty'
                }

                row += '</td>'
            });
            $('.dataSeeCompetition').html(row);

        }



        function getListIdUnits() {
            return $('.tree-poscode input[type=checkbox]:checked').map(function () {
                return $(this).val();
            }).get();
        }


        $('#find_report_exam').on('click', function () {
            showReportCompetitionGeneral('');
        });

        function paging(totalPages, currentPages) {
            $("#pagination-test").twbsPagination({
                totalPages: totalPages,
                startPage: currentPages,
                visiblePages: 10,
                last: "Cuối cùng",
                next: "Tiếp theo",
                first: "Đầu tiên",
                prev: "Phía trước",
                onPageClick: function (event, page) {
                    if (currentPages != page) {
                        var url = "/api/admin/report/competition/list/general";
                        url += "?page=" + page;
                        showReportCompetitionGeneral(url);
                    }
                },
            });
        }


        $('#class_see_report_online').on('click', function (e) {

            var dataArray = {};
            if ($('#to-date').val() != '' && $('#from-date').val() != '') {
                dataArray["from"] = $('#from-date').val();
                dataArray["to"] = $('#to-date').val();
                dataArray["idUnit"] = $('#name_unit').attr('id_unit');
                $.ajax({
                    url: "/api/admin/report/competition/create/general",
                    headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                    type: "POST",
                    data: JSON.stringify(dataArray),
                    dataType: "json",
                    contentType: "application/json",
                    beforeSend: function () {
                        $('.loader').css("display", "block");
                        //$('.loader').css("background")
                    },
                    success: function (res) {
                        if (res.code == 400) {
                            alert(" Không có dữ liệu ");
                        } else {
                            alert("Tạo báo cáo thành công");
                        }
                        showReportCompetitionGeneral("");
                    }
                });
            } else {
                alert("Xin hãy chọn thời gian bắt đầu và thời gian kết thúc");
            }

        });

        function showBeforeExport(url){
            if (url == null || url == "") {
                url = "/api/admin/report/competition/list/see-before-export";
            }
            if ($('#to-date').val() != '' && $('#from-date').val() != '') {

                var dataArray = {};
                dataArray['id_unit'] = $('#name_unit').attr('id_unit');
                dataArray["timeStart"] = $('#from-date').val();
                dataArray["timeEnd"] = $('#to-date').val();
                $.ajax({
                    url: url,
                    type: "POST",
                    headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                    data: JSON.stringify(dataArray),
                    dataType: "json",
                    contentType: "application/json",
                    beforeSend: function () {
                        $('.loader').css("display", "block");
                        $("#pagination-competition").empty();
                        $("#pagination-competition").removeData("twbs-pagination");
                        $("#pagination-competition").unbind("page");
                    },
                    success: function (res) {

                        $('.loader').css("display", "none");
                        if (Object.keys(res.data).length > 0) {

                            if (res.totalPage > 0) {
                                pagingCompetition(res.totalPage, res.currentPage);
                            }
                            loadCompetitionlBeforeExport(res.data, res.currentPage);

                        } else {
                            alert("Báo cáo không có dữ liệu")
                        }


                    },
                    error: function (res) {
                        console.log(res);
                        alert("Có lỗi sảy ra");
                    }
                });
            } else {

                alert("Xin chọn thời gian bắt đầu và thời gian kết thúc")
            }
        }

        $('#listCompetition').on('click', function () {
            showBeforeExport('');
        });

        function pagingCompetition(totalPages, currentPages) {
            $("#pagination-competition").twbsPagination({
                totalPages: totalPages,
                startPage: currentPages,
                visiblePages: 10,
                last: "Cuối cùng",
                next: "Tiếp theo",
                first: "Đầu tiên",
                prev: "Phía trước",
                onPageClick: function (event, page) {
                    if (currentPages != page) {
                        var url = "/api/admin/report/competition/list/see-before-export";
                        url += "?page=" + page
                        showBeforeExport(url);
                    }
                },
            });


        };


    });

    $(document).on('change', '#from-date', function () {
        $('#to-date').attr("min", $('#from-date').val());
    });

    $(document).on('change', '#to-date', function () {
        $('#from-date').attr("max", $('#to-date').val());
    });


    $(document).on('click', '.delete-btn', function () {
        let id = $(this).attr('data-id');
        $.ajax({
            url: `/api/admin/report/user/list/${id}`,
            type: 'DELETE',
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function () {
                $('.loader').css("display", "block");
            },
            success: function (result) {
                alert("Xóa báo cáo thành công")
                location.reload(true);
                $('.loader').css("display", "none");
            },
            error: function (error) {
                alert("Đã có lỗi xảy ra")
                console.log(error);
                $('.loader').css("display", "none");
            }
        });
    })
});

// function showModalCompetition(btn) {
//     var url = $(btn).attr("url_excem");
//     $('#iframe-report').attr('src', "" +
//         url_elearning_office + url);
//     $('#downloadReport').attr('href', "" +
//         localhost + url);
//     $('#modal-report-exam-general').modal();
// }