jQuery(function ($) {
    $(document).ready(function () {
        init()
        function init() {
            loadListEmail("","","");
        }
        function loadListEmail(search,page,size) {
            $.ajax({
                type: "GET",
                url: "/api/admin/helpdesk/list?search=" + search + "&page=" + page + "&size=" + size,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function() {
                    $('#list-mail tbody').empty();
                    $('.spin').removeClass("display-none");
                },
                success: function (response) {
                    console.log(response);
                    var appendStr = '';
                    response.data.forEach(function (v,i) {
                        var createTime = convertDate(v.timeCreate);
                        // console.log(createTime);
                        appendStr +=
                            '<tr>' +

                            '<td>'+(i+1)+'</td>' +
                            '<td>'+v.email+'</td>' +
                            '<td>'+createTime+'</td>' +
                            '</tr>';
                    });
                    if (response.totalPage == 0) response.totalPage = 1;
                    $('#pagination').twbsPagination({
                        totalPages: response.totalPage,
                        startPage: response.currentPage,
                        initiateStartPageClick: false,
                        first:'Đầu tiên',
                        prev:'Trước',
                        next:'Sau',
                        last:'Cuối cùng',

                        visiblePages: 10,
                        onPageClick: function (event, clickPage) {
                            loadListEmail (search,clickPage,size);
                        }
                    });
                    $('#list-mail tbody').append(appendStr)
                    $('.spin').addClass("display-none");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('The following error occured: ' + textStatus, errorThrown);
                    $('.spin').addClass("display-none");

                }
            })
        }
        $('#quantity').on('change',function () {
            loadListEmail("","",$(this).val());
        })
    })
})
function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}