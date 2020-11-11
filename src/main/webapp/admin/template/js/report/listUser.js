$('#filter-poscode').on('mouseover',function () {
    $('.tree-poscode').removeClass('d-none');
})
$('#filter-poscode').on('mouseout',function () {
    $('.tree-poscode').addClass('d-none');
})
$(document).on('change','.edit-item',function () {
    if( $('.edit-item:checked').length > 0) {
    $('#filter-label').text("Lọc theo đơn vị")
    }
    else {
        $('#filter-label').text("Tất cả các đơn vị")

    }
})
jQuery(function ($) {
    $(document).ready(function () {
        function init() {
            let url = '/api/admin/report/user/list'
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
                            let url = '/api/admin/report/user/list';
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
        $('#create-report:not(.disabled)').click(function () {
            let idUnits = [];
            $('.edit-item:checked').each(function (index) {
                idUnits.push($(this).val());
            })
            let data = {}
            data.idUnits = idUnits;
            $.ajax({
                url: '/api/admin/report/user/list',
                type: 'POST',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                beforeSend: function () {
                    $('#create-loading').removeClass("d-none");
                    $('#create-report').addClass('disabled')
                },
                success: function (result) {
                    alert("Tạo báo cáo thành công")
                    location.reload(true);
                    $('#create-loading').addClass("d-none");
                    $('#create-report').removeClass('disabled')

                },
                error: function (error) {
                    console.log(error);
                    alert("Báo cáo đang được hệ thống xử lý. Xin vui lòng quay trở lại sau!")
                    $('#create-loading').addClass("d-none");
                    $('#create-report').removeClass('disabled')
                }
            });
        })
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
