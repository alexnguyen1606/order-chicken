/**
 *
 *   @author:DAO QUANG BINH
 *
 *  November 12,2020
 *
 */
jQuery(function ($) {
    $(document).ready(function () {
        //ajax
        function loadListDishCatData(data,param) {
            if (!data) data = {};
            let url = "/api/dish-category/list";
            var url_string = window.location.href; //window.location.href
            var curUrl = new URL(url_string);
            var search = curUrl.searchParams.get("search");
            if (search) data.name = search;
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
        function deleteListDish() {
            let ids = [];
            $('input[name=ids]:checked').each((i,v) => {
                ids.push(v.value);
            })
            let data = {};
            data.ids =ids;
            let url ="/api/dish-category/delete"
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    // console.log(result);
                    alert("Xóa thành công");
                    window.location.reload();
                },
                error: function (error) {
                    alert("Danh mục đã tồn tại sản phẩm, xóa thất bại!");
                    window.location.reload();
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
                    <td>
                        <input type="checkbox" name="ids" value="${v.id}">
                    </td>
                    <td>${v.name}</td>
                    <td class="text-center"><a data-id="${v.id}" class="edit-cat"><i class="far fa-edit"></i></a></td>
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

        //handler
        $('#delete-btn').click(function () {
            deleteListDish();
        })
        //run function
        initListDishCat();
    })
})