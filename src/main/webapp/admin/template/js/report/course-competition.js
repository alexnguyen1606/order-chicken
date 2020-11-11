var url = window.location.origin + "/admin/download/report/course/general?nameFile=";
jQuery(function ($) {
    $(document).ready(function () {
        $('#download_report').click(function () {
            var formData = $('#inputReport').serializeArray();
            var data = {};
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            $.ajax({
                type: "PUT",
                url: "/api/admin/report/course/competition",
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
                    getListReported("")
                },
                error: function (response) {
                    $('.loader').css("display", "none");
                    if (response.status == 400) {
                        alert(response.responseJSON.message);
                    }
                    if (response.status == 504) {
                        alert("Báo cáo đang được hệ thống xử lý. Xin vui lòng quay trở lại sau !");
                    }


                }
            });
        });

        function getCompetittion() {
            var data = {};
            var unitIds = getUnitIds();
            data['unitIds'] = unitIds;
            data['courseName'] = $('#courseName').val();
            $.ajax({
                type: "PUT",
                url: "/api/admin/report/course-competition",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    $('.loader').css("display", "none");
                    console.log(response)
                    var row = "";
                    $.each(response.data, function (i, v) {
                        row += '<option value="' + v.id + '">' + v.name + '</option>';
                    });
                    $('#courseId').empty();
                    $('#courseId').append(row);


                },
                error: function (response) {
                    $('.loader').css("display", "none");
                }
            });
        }

        getCompetittion();

        function getListReported(url) {
            if (url == null || url == "") {
                url = "/api/admin/report/course/competition/all";
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
                        var url = "/api/admin/report/course/competition/all";
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
                row += '<tr id="item_' + v.id + '">';
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
            $('.edit-item:checked').each(function (i,v) {
                unitIds.push(v.value);
            });
            return unitIds;
        }
        $('#filter').on('click',function () {
            getCompetittion();
        })
    })
});
