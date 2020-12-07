jQuery(function ($) {
    $(document).ready(function () {
        function fetchReport(url) {
            if (url == "" || url == null) {
                url = "/api/admin/report"
            }
            $.ajax({
                type: "GET",
                url: url,
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                // data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                },
                success: function (response) {
                    bindingReport(response.data);
                    if (response.totalPage != 0) {
                        paging(response.totalPage, response.currentPage);
                    }
                    $('.loader').css("display", "none");
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            });
        }

        function bindingReport(data) {
            var row = "";
            $.each(data, function (i, v) {
                var startTime = getDate(v.startTimeString);
                var endTime = getDate(v.endTimeString);
                row += '<tr>';
                row += '<td class="text-center"><input type="checkbox" id="checkbox_' + v.id + '" value="' + v.id + '"></td>';
                row += '<td class="text-center">' + (i + 1) + '</td>';
                row += '<td class="text-center">' + v.id + '</td>';
                row += '<td class="text-center">' + startTime + '</td>';
                row += '<td class="text-center">' + endTime + '</td>';
                row += '<td class="text-center">' + v.totalCharge + '</td>';
                row += '<td class="text-center">' + v.totalPriceTake + '</td>';
                row += '<td class="text-center"><a href="/admin/download/report?name=' + v.fileName + '"><i class="fa fa-download"></i></a></td>';
                row += '</tr>';
            });

            $('#reports').empty();
            $('#reports').append(row)
        }

        function getDate(data){
            var date = new Date(data);
            var time = date.getDate() +"/"+(date.getMonth()+1)+"/"+date.getFullYear();
            return time;
        }

        function getIdsChecked() {
            var ids = [];
            $('#reports').find('input[type=checkbox]:checked').each(function () {
                ids.push($(this).val())
            });
            return ids;
        }
        $('#checkAll').click(function () {
            if ($(this).is(':checked')) {

                $('#reports').find('input[type=checkbox]').prop("checked", true);
            } else {
                $('#reports').find('input[type=checkbox]').prop("checked", false);
            }

        });
        $('#formExport').on('submit',function (e) {
            e.preventDefault();
            $('#exportReport').trigger('click');
        });
        $('#exportReport').on('click',function () {
            var data = {};
            data.startTime = $('#startTime').val();
            data.endTime = $('#endTime').val();
            $.ajax({
                type: "POST",
                url: "/api/admin/report",
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.message);
                    window.location.reload();
                }, error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        });
        $('#delete-btn').on('click',function () {
            if (!confirm("Xác nhận xóa")){
                throw "fail";
            }
           var ids = getIdsChecked();
            if (ids.length ==0){
                alert("Chưa có mục nào được chọn");
                throw "fail";
            }
            $.ajax({
                type: "DELETE",
                url: "/api/admin/report",
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify({'ids':ids}),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.message);
                    window.location.reload();
                }, error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        });

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
                    if (currentPages != page) {
                        var url = "/api/admin/report";
                        url += "?page=" + page;
                        fetchOrder(url);
                    }
                }
            });
        }

        fetchReport("");
    })
});