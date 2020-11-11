var url = window.location.origin + "/admin/download/report/course/general?nameFile=";
jQuery(function ($) {
    $(document).ready(function () {
        $('#download_report').click(function () {
            var formData = $('#inputReport').serializeArray();
            var data = {};
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            data["unitIds"] = getUnitIds();
            $.ajax({
                type: "PUT",
                url: "/api/admin/report/course/general",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    $('.loader').css("display", "none");
                    alert("Xuất báo cáo thành công");
                    window.location.reload();
                },
                error: function (response) {

                    $('.loader').css("display", "none");
                    if (response.status == 400) {
                        alert(response.responseJSON.message);
                        throw "fail";
                    }
                    if (response.status == 504) {
                        alert("Báo cáo đang được hệ thống xử lý. Xin vui lòng quay trở lại sau !");
                    }
                    console.log(response)
                }
            });
            $('#startTime').val("");
            $('#endTime').val("");
        });

        $('#listCourse').on('click', function () {
            getCourse("")
        });

        function getCourse(url) {
            var formData = $('#inputReport').serializeArray();
            var data = {};
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            data["unitIds"] = getUnitIds();
            if (url == "") {
                url = "/api/admin/report/course/list/general"
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
                    $('#pagination-course').empty();
                    $('#pagination-course').removeData("twbs-pagination");
                    $('#pagination-course').unbind("page");
                },
                success: function (response) {
                    $('.loader').css("display", "none");
                    if (response.totalPage > 0) {
                        pagingCourse(response.totalPage, response.currentPage);
                    }
                    loadCourse(response.data);
                },
                error: function (response) {
                    $('.loader').css("display", "none");
                    $('#tableCourse').empty();
                }
            });
        }

        function pagingCourse(totalPage, currentPages) {
            $('#pagination-course').twbsPagination({
                totalPages: totalPage,
                startPage: currentPages,
                visiblePages: 10,
                last: 'Cuối cùng',
                next: 'Tiếp theo',
                first: 'Đầu tiên',
                prev: 'Phía trước',
                onPageClick: function (event, page) {
                    if (currentPages != page) {
                        var url = "/api/admin/report/course/list/general";
                        url += "?page=" + page;
                        getCourse(url);
                    }
                }
            });
        }

        function loadCourse(data) {
            var row = '';
            $.each(data, function (i, v) {

                var status = '';
                if (v.status == 0) {
                    status = '<i class="text-warning fa fa-circle icon"></i>';
                } else {
                    status = '<i class="text-success fa fa-circle icon"></i>';
                }
                var poscodeName = v.poscodeName;
                if (poscodeName == '' || poscodeName == null) {
                    poscodeName = "Tổng công ty"
                }
                row += '<tr>';
                row += '<td class="text-left">' + status;
                row += '<a ><b>' + v.name + '</b></a>';
                row += '</td>';
                row += '<td class="text-left">' + v.categoryName + '</td>';
                row += '<td><p><i class="fa fa-building-o icon"></i><small>' + poscodeName + '</small></p></td>'
                row += '</tr>';
            });
            $('#tableCourse').empty();
            $('#tableCourse').append(row);
        }

        $('#startTime').on('change', function () {
            var value = $(this).val();
            $('#endTime').attr("min", value)
        });
        $('#endTime').on('change', function () {
            var value = $(this).val();
            $('#startTime').attr("max", value)
        });

        function getListReported(url) {
            if (url == null || url == "") {
                url = "/api/admin/report/course/general/all";
            }
            var data = {};
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
                    $('.loader').css("display", "none");
                    loadData(serviceResult.data);
                    if (serviceResult.totalPage > 0) {
                        paging(serviceResult.totalPage, serviceResult.currentPage);
                    }
                }, error: function () {
                    $('.loader').css("display", "none");
                }
            })
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
                        var url = "/api/admin/report/course/general/all";
                        url += "?page=" + page;
                        getListReported(url);
                    }
                }
            });
        }

        function loadData(data) {
            var row = "";
            $.each(data, function (i, v) {
                var date = new Date(v.createdDate);
                var timeCreated = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                row += '<tr>';
                // row += '<td>' + (i + 1) + '</td>';
                row += '<td>' + '<a href="https://view.officeapps.live.com/op/embed.aspx?src=' + url + v.nameFile + '"  target="_blank" style="cursor: pointer;">' + v.nameFile + '</a>' + '</td>';
                row += '<td>' + timeCreated + '</td>';
                row += '<td>' + v.notify + '</td>';
                row += '<td>' + v.createdBy + '</td>';
                row += '<td class=""><a href="/admin/download/report/course/general?nameFile=' + v.nameFile + '" class="mr-2" title="Tải xuống" style="font-size:18px"><i class="fas fa-download" ></i></a>';
                row += '</a> <a data-id="' + v.id + '" style="font-size:18px" class="color-red deleteReport" title="Xóa"><i class="fas fa-trash" ></i></a>';
                row += '</td>';
                row += '</tr>';
            });
            $('#tableReport').empty();
            $('#tableReport').append(row);
        }

        getListReported("");
        $(document).on('click', '.deleteReport', function () {
            var id = $(this).attr('data-id');
            if (!confirm("Xác nhận xóa báo cáo")) {
                throw "fail";
            }
            $.ajax({
                type: "DELETE",
                url: "/api/admin/report/" + id,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                }, success: function (serviceResult) {
                    // $('#item_'+id).remove();
                    getListReported("")
                    $('.loader').css("display", "none");
                    alert(serviceResult.message);
                }, error: function () {
                    alert("Xóa không thành công")
                    $('.loader').css("display", "none");
                }
            })
        });

        function getUnitIds() {
            var unitIds = [];
            $('.edit-item:checked').each(function (i, v) {
                unitIds.push(v.value);
            });
            return unitIds;
        }
    })
});
