jQuery(function ($) {
    $(document).ready(function () {
        function getListProduct(url) {
            if (url == "" || url == null) {
                url = "/api/dish/list";
            }
            var data = {};
            data.status = "ACTIVE";
            data.search = $('#search').val();
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
                    loadProduct(response.data);
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
        function loadProduct(data) {
            $('#products').empty();
            var row = "";
            $.each(data,function (i,v) {
                var priceString =  v.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
                row+='<tr>';
                row+='<td class="text-center">'+v.id+'</td>';
                row+='<td class="text-center">'+v.name+'</td>';
                row+='<td class="text-center">'+priceString+'</td>';
                row+='<td class="text-center"><a class="addProduct" data-id='+v.id+' data-price="'+v.price+'" data-name="'+v.name+'"><i class="fa fa-plus"></i></a></td>';
                row+='</tr>';
            });
            $('#products').append(row);
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
        getListProduct("");
        $('#formSearch').on('submit',function (e) {
            e.preventDefault();
            getListProduct("");
        });
    })
})
