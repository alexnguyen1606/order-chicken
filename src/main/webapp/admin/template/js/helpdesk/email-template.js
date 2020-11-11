var currentPage = 1;
var count = 0;

jQuery(function ($) {
    $(document).ready(function () {
        getAllEmailTemplate("");

        function getAllEmailTemplate(url) {
            if (url == "" || url == null) {
                url = "/api/admin/helpdesk/email-template/list";
            }
            var data = getData();
            $.ajax({
                type: "POST",
                url: url,
                headers: {Authorization: "Bearer " + localStorage.getItem("eln_token")},
                data: JSON.stringify(data),
                contentType: "application/json",
                beforeSend: function () {
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                },
                success: function (response) {
                    if (response.totalPage > 0) {
                        paging(response.totalPage, response.currentPage)
                    }
                    console.log(response);
                    var row = showListEmailTemplate(response.data,response.currentPage,10);
                    //count = 0;
                    $("#listEmailTemplate").empty();
                    $("#listEmailTemplate").append(row);
                },
                error: function (response) {
                    console.log(response);
                },

            })
        }

        function paging(totalPage, currentPage) {
            $("#pagination-test").twbsPagination(
                {
                    totalPages: totalPage,
                    startPage: currentPage,
                    visiblePages: 10,
                    last: "Cuối cùng",
                    next: "Tiếp theo",
                    first: "Đầu tiên",
                    prev: "Phía trước",
                    onPageClick: function (event, page) {
                        if (currentPage != page) {
                            var url = "/api/admin/helpdesk/email-template/list";
                            url += "?page=" + page;
                            getAllEmailTemplate(url);
                        }
                    }
                }
            )
        }
        function showListEmailTemplate(data,currentPage,itemPerPage) {
            var row = "";
            $.each(data, function (i, item) {
                row += '<tr>';
             //   row +='<td></td>'
                row += '<td>' + (((parseInt(currentPage) - 1) * itemPerPage) + (parseInt(i) + 1)) + '</td>'
                row += '<td  style="text-align: left">' + item.code + '</td>';
                row += '<td  style="text-align: left">' + item.name + '</td>';
                row += '<td  style="text-align: left">' + item.subjects + '</td>';
                row += '<td  style="text-align: left">' + item.content + '</td>'
                row +=
                    '<td><button onclick="location.href=\'/admin/helpdesk/email-template/edit/' + item.id + '\';"  class="btn btn-default btn-sm "> <i class="far fa-edit"></i> </button> ' +
                    '<button onclick="deleteEmailTemplateById(' + item.id + ')" class="btn btn-default btn-sm "> <i class="far fa-trash-alt"></i> </button></td>';
                row += ' </tr>';
            });
            return row;
        }

        function getData() {
            var data = {};
            var formData = $('formSearch').serializeArray();
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            return data;
        }
    })
});


function deleteEmailTemplateById(id) {
    if (!confirm("Xác nhận xoá mẫu email")) {
        throw "Do not delete";
    }
    $.ajax({
        type: "DELETE",
        url: "/api/admin/helpdesk/email-template/" + id,
        headers: {Authorization: "Bearer" + localStorage.getItem("eln_token")},
        contentType: "application/json",
        success: function (response) {
            alert(response.message);
            window.location.reload();
        },
        error: function (response) {
            alert(response.message);
            console.log(response);
        }
    })
}