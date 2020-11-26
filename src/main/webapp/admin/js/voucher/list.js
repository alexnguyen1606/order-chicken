jQuery(function ($) {
    $(document).ready(function () {
        function fetchVoucher(url) {
            if (url == "" || url == null) {
                url = "/api/admin/voucher/list"
            }
            var data = getDataSearch();
            $.ajax({
                type: "POST",
                url: url,
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
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
                    bindingVoucher(response.data);
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
                        var url = "/api/admin/voucher/list";
                        url += "?page=" + page;
                        fetchOrder(url);
                    }
                }
            });
        }

        function bindingVoucher(data) {
            var row = '';
            $.each(data, function (i, v) {
                var status = "Dừng hoạt động";
                if (v.status == 1) {
                    status = "Hoạt động"
                }
                var startTime = new Date(v.startTimeString);
                var endTime = new Date(v.endTimeString);
                startTime = startTime.getHours() + ":" + startTime.getMinutes() + " " + startTime.getDate() + "/" + (startTime.getMonth() + 1) + "/" + startTime.getFullYear();
                endTime = endTime.getHours() + ":" + endTime.getMinutes() + " " + endTime.getDate() + "/" + (endTime.getMonth() + 1) + "/" + endTime.getFullYear();
                row += '<tr>';
                row += '<td class="text-center"><input type="checkbox" id="checkbox_' + v.id + '" value="' + v.id + '"></td>';
                row += '<td class="text-center">' + (i + 1) + '</td>';
                row += '<td class="text-center">' + v.name + '</td>';
                row += '<td class="text-center">' + v.code + '</td>';
                row += '<td class="text-center">' + startTime + ' - ' + endTime + '</td>';
                row += '<td class="text-center">' + v.discount + '</td>';
                row += '<td class="text-center">' + status + '</td>';
                row += '<td class="text-center"><a href="/admin/voucher/edit/' + v.id + '" class="btn btn-primary"><i class="fa fa-edit"></i></a></td>';
                row += '</tr>';
            });
            $('#vouchers').empty();
            $('#vouchers').append(row);
        }

        $('#formSearch').on('submit', function (e) {
            e.preventDefault();
            fetchVoucher("");
        });
        fetchVoucher("");

        function getDataSearch() {
            var search = $('#search').val();
            return {'search': search};
        }

        function getIdsChecked() {
            var ids = [];
            $('#vouchers').find('input[type=checkbox]:checked').each(function () {
                ids.push($(this).val())
            });
            return ids;
        }

        $('#checkAll').click(function () {
            if ($(this).is(':checked')) {

                $('#vouchers').find('input[type=checkbox]').prop("checked", true);
            } else {
                $('#vouchers').find('input[type=checkbox]').prop("checked", false);
            }

        });
        $('#delete-btn').on('click', function () {
            var ids = getIdsChecked();
            if (ids.length == 0) {
                alert("Chưa có khuyến mại được chọn")
                throw "fail";
            }
            if (confirm('Xác nhận xóa')) {
                $.ajax({
                    type: "DELETE",
                    url: "/api/admin/voucher",
                    // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    data: JSON.stringify({"ids":ids}),
                    dataType: "json",
                    contentType: "application/json",
                    beforeSend: function () {
                        $('.loader').css("display", "block");
                    },
                    success: function (response) {
                        alert(response.message);
                        fetchVoucher("");
                        $('.loader').css("display", "none");
                    }, error: function (jqXHR) {
                        $('.loader').css("display", "none");
                        // getCourse();
                    }
                });
            }
        })
    })
});