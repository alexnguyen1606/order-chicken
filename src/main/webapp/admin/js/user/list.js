jQuery(function ($) {
    $(document).ready(function () {
        //load data function
        function loadAccount(page, data) {
            let url = '/api/admin/account/list';
            if (!data) data = {};
            let urlString = window.location.href
            let curUrl = new URL(urlString);
            let search = curUrl.searchParams.get("search");
            if (search) data.search=search;
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

        //function init
        async function initLoadAccountList(page) {
            let listAcc = await loadAccount(page);
            loadAccountToTable(listAcc.data)
            paging(listAcc.totalPage,listAcc.currentPage);
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
                        initLoadAccountList(currentPage);
                    }
                }
            });
        }

        //map data function
        function loadAccountToTable(data) {
            let appendData = '';
            if (data.length <= 0) return;
            data.forEach((v, i) => {
                let name = v.user ? (v.user.name ? v.user.name : v.userName) : v.userName;
                let phone = v.user ?(v.user.phone ? v.user.phone : '') :'';
                let totalPaid = 0;
                if(v.totalPaid) totalPaid = v.totalPaid;
                totalPaid = (totalPaid).toLocaleString('vi-Vi', {
                    style: 'currency',
                    currency: 'VND',
                });
                appendData += `
                <tr>
                    <td>${name}</td>
                    <td>${phone}</td>
                    <td>${totalPaid}</td>
                    <td><a href="/admin/account/edit?id=${v.id}"><i class="far fa-edit"></i></a></td>
                </tr>
                `;
            })
            $('#list-user tbody').html(appendData);
            console.log(data)
        }

        //call function
        initLoadAccountList();
    })
})