jQuery(function ($) {
    $(document).ready(function () {
        $('#startTime').on('change', function () {
            var value = $(this).val();
            $('#endTime').attr("min", value)
        });
        $('#endTime').on('change', function () {
            var value = $(this).val();
            $('#startTime').attr("max", value)
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
            data.typeUnit = "UNIT-JOIN";
            //load list unit
            let unitIds = [];
            $('.tree-poscode .edit-item:checked').each(function (i, v) {
                unitIds.push(v.value);
            })
            data.unitIds = unitIds;
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
            if (totalPage != 0) {

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

        $('#create-report').on('click',function () {
            var formData = $('#inputReport').serializeArray();
            var data = {};
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            data.typeUnit = "UNIT-JOIN";
            //load list unit
            let unitIds = [];
            $('.tree-poscode .edit-item:checked').each(function (i, v) {
                unitIds.push(v.value);
            })
            data.unitIds = unitIds;

            let url = "/api/admin/report/user/result-course-unit"

            $.ajax({
                type: "POST",
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
                    alert("Tạo báo cáo thành công");
                    location.reload();
                },
                error: function (response) {
                    $('.loader').css("display", "none");
                    // alert("Đã có lỗi xảy ra")
                    // location.reload();
                    console.log(response);
                }
            });
        })
        function init() {
            let url = '/api/admin/report/user/result-course-unit'
            loadReport(url);
        }
        function loadReport(url) {
            $.ajax({
                type: "GET",
                url: url,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('#pagination').empty();
                    $('#pagination').removeData("twbs-pagination");
                    $('#pagination').unbind("page");
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    $('.loader').css("display", "none");
                    mapDataToTable(response.data)
                    // console.log(response)

                    paging(response.totalPage,response.currentPage)
                },
                error: function (response) {
                    $('.loader').css("display", "none");
                    console.log('error',response);
                }
            });
        }
        function paging(totalPage, currentPages) {
            if (totalPage != 0) {
                $('#pagination').twbsPagination({
                    totalPages: totalPage,
                    startPage: currentPages,
                    visiblePages: 10,
                    last: 'Cuối cùng',
                    next: 'Tiếp theo',
                    first: 'Đầu tiên',
                    prev: 'Phía trước',
                    onPageClick: function (event, page) {
                        if (currentPages != page) {
                            let url = '/api/admin/report/user/result-course-unit';
                            url += "?page=" + page;
                            loadReport(url);
                        }
                    }
                });
            }

        }
        function mapDataToTable(data) {
            // console.log(data);
            let result = '';
            data.forEach((e,i) =>  {
                // console.log(window.location.origin)
                let createDate = new Date(e.createdDate) ;
                const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(createDate);
                const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(createDate);
                const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(createDate);
                result += `<tr>`;
                result += `<td><a href="https://view.officeapps.live.com/op/embed.aspx?src=${window.location.origin}${e.url}" target="_blank">${e.nameFile}</a></td>`;
                result += `<td>${day}/${month}/${year}</td>`;
                result += `<td>${e.createdBy}</td>`;
                result += `<td class="text-center"><a href="${e.url}" class="mr-2" title="Tải xuống" style="font-size:18px"><i class="fas fa-download" ></i></a> <a data-id="${e.id}" style="font-size:18px" class="color-red delete-btn" title="Xóa"><i class="fas fa-trash" ></i></a></td>`;
                result += `</tr>`;
            })
            // console.log(result)
            $('#list-user-table tbody').html(result);
        }
        init();
        $(document).on('click','.delete-btn',function () {
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

    })

})