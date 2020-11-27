jQuery(function ($) {
    $(document).ready(function () {
        //ajax function
        function loadListDishData(data) {
            if (!data) data = {};
            let url = '/api/dish/list';
            let urlString = window.location.href
            let curUrl = new URL(urlString);
            let page = curUrl.searchParams.get("page");
            if (page) {
                url += `?page=${page}`
            }
            let search = curUrl.searchParams.get("search");
            if (search) data.name=search;
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
        function deleteDish(data) {
            if (!data) data = {};
            let url = '/api/dish/delete';
            return $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    // console.log(result);
                    alert("Xóa thành công")
                    window.location.reload();
                },
                error: function (error) {
                    alert("Xóa thất bại")
                    console.log(error);
                }
            });
        }

        //init function
        async function initListDish() {
            let data = await loadListDishData();
            mapDataToTable(data.data)
            paging(data.totalPage, data.currentPage);
        }

        //etc
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
                        var url = "/admin/dish/list";
                        let urlString = window.location.href
                        let curUrl = new URL(urlString);
                        let search = curUrl.searchParams.get("search");
                        if (search) {
                            url += "?search=" + search;
                            url += "&page=" + page;
                        }
                        else {
                            url += "?page=" + page;
                        }
                        window.location.href = url
                    }
                }
            });
        }

        //map data function
        function mapDataToTable(data) {
            if (data.length <= 0) return;
            let appendData = '';
            data.forEach((v, i) => {
                let status = '';
                if (v.status == "ACTIVE") {
                    status = 'Đang hoạt động'
                }
                if (v.status == "INACTIVE") {
                    status = 'Dừng hoạt động'
                }
                appendData += `
                    <tr>
                    <td>
                    <input type="checkbox" name="ids" value="${v.id}">
                    </td>
                    <td>
                    ${v.name}
                    </td>
                    <td>
                    ${v.dishCategory.name}
                    </td>
                    <td>
                    ${v.price}
                    </td>
                    <td>
                    ${status}
                    </td>
                    <td>
                    <a href="/admin/dish/edit?id=${v.id}"><i class="far fa-edit"></i></a>
                    </td>
                    </tr>
                `;
            })
            $('#listTable tbody').html(appendData)
        }

        //run function
        initListDish();

        //add handler
        $('#delete-btn').click(function () {
            let ids = [];
            $('input[name=ids]:checked').each((i,v) =>{
                ids.push(v.value)
            })
            let data = {};
            data.ids = ids;
            deleteDish(data);
        })
    })
})