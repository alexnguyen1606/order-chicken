/**
 *
 *   @author:DAO QUANG BINH
 *
 *  November 12,2020
 *
 */
jQuery(function ($) {
    $(document).ready(function () {
        //load data
        function loadListDishCatData(data,url) {
            if (!data) data = {};
            if (!url) url = "/api/dish-category/list";
            return $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    // console.log(result);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }

        //init function
        async function initListDishCat() {
            let data = await loadListDishCatData();
            mapDishCatDataToTable(data);
        }

        //map function
        function mapDishCatDataToTable(data) {
            console.log(data)
            let cats = data.data;
            let appendData = ''
            $('#pagination').empty();
            $('#pagination').removeData("twbs-pagination");
            $('#pagination').unbind("page");
            cats.forEach((v,i) => {
                appendData +=
                `<tr>
                    <td>${v.name}</td>
                    <td class="text-right"><a data-id="${v.id}" class="edit-cat"><i class="far fa-edit"></i></a></td>
                 </tr>`
            })
            paging(data.totalPage,data.currentPage);
            $('#list tbody').html(appendData)
        }
        function paging(totalPage, currentPage) {
            if (!totalPage) return;
            $('#pagination').twbsPagination({
                totalPages: totalPage,
                startPage: currentPage,
                visiblePages: 10,
                last: 'Cuối cùng',
                next: 'Tiếp theo',
                first: 'Đầu tiên',
                prev: 'Phía trước',
                onPageClick: function (event, page) {
                    if (currentPage != page) {
                        var url = "/api/dish-category/list";
                        url += "?page=" + page;
                        loadListDishCatData("",url);
                    }
                }
            });
        }
        //run function
        initListDishCat();
    })
})