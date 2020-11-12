jQuery(function ($) {
    $(document).ready(function () {
        function getListProduct(url) {
            if (url == "" || url == null) {
                url = "/api/dish/list";
            }
            $.ajax({
                type: "POST",
                url: url,
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify({}),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                },
                success: function (response) {
                    // loadCourse(response.data);
                    if (response.totalPage != 0) {
                        paging(response.totalPage, response.currentPage);
                    }


                    $('.loader').css("display", "none");
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                    // getCourse();
                }
            })
        }
        function paging(totalPage,currentPages){
            $('#pagination-test').twbsPagination({
                totalPages: totalPage,
                startPage: currentPages,
                visiblePages: 10,
                last:'Cuối cùng',
                next:'Tiếp theo',
                first:'Đầu tiên',
                prev:'Phía trước',
                onPageClick: function (event, page) {
                    if (currentPages != page) {
                        var url = "/api/dish/list";
                        url+="?page="+page;
                        getListProduct(url);
                    }
                }
            });
        }
        getListProduct("")
    })
})
