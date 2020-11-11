var currentPages;
var count=0;
jQuery(function ($) {
    $(document).ready(function () {
        function paging(totalPage,currentPage) {
            $('#pagination-test').twbsPagination({
                totalPages: totalPage,
                startPage: currentPage,
                visiblePages: 10,
                last:'Cuối cùng',
                next:'Tiếp theo',
                first:'Đầu tiên',
                prev:'Phía trước',
                onPageClick: function (event, page) {
                    if (currentPage != page) {
                        var url = "/api/admin/events/all";
                        url += "?page=" + page;
                        getAllEvent(url);
                    }
                }
            });
        }

        function getDataSearch() {
            var data = {};
            var formData = $('#search').serializeArray();
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            return data;
        }

        function getCategoryEvent() {
            $.ajax({
                type: "GET",
                url: "/api/admin/event-category/parent",
                contentType: "application/json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                success: function (response) {
                    var row = '<option value="">Chọn danh mục cha</option>';
                    $.each(response.data, function (i, item) {
                        row += '<option value="' + item.id + '">' + item.nameDetail + '</option>';
                        if (item.listChild.length > 0) {
                            row += showListChild2(item.listChild);
                        }
                    });
                    count=0;
                    $('#idCategory').empty();
                    $('#idCategory').append(row);
                }
            })

        }
        function showListChild2(listChild) {
            var row = '';
            $.each(listChild, function (i, item) {
                    count++;
                    var prefix = "";
                    if (count == 1) {
                        prefix = "&emsp; -- "
                    }
                    if (count == 2) {
                        prefix = "&emsp; &emsp; -- "
                    }
                    if (count == 3) {
                        prefix = "&emsp; &emsp; &emsp; --"
                    }
                    if (count == 4) {
                        prefix = "&emsp; &emsp; &emsp; --"
                    }
                    row += '<option value="' + item.id + '">' + prefix + item.nameDetail + '</option>';
                    if (item.listChild.length > 0) {
                        row += showListChild2(item.listChild);
                    } else {
                        count--;
                    }
                }
            );
            return row;
        }
        getCategoryEvent();
        function getAllEvent(url) {
            if (url == "" || url == null) {
                url = '/api/admin/events/all';
            }
            var data = getDataSearch();
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                beforeSend: function () {
                    $('.loader').css("display", "block");
                    $('#pagination-test').empty();
                    $('#pagination-test').removeData("twbs-pagination");
                    $('#pagination-test').unbind("page");
                },
                success: function (response) {
                    currentPages = response.currentPage;
                    if (response.totalPage != 0) {
                        paging(response.totalPage,response.currentPage);
                    }
                    loadEvent(response.data);
                    $('.loader').css("display", "none");
                }, error: function () {
                    $('.loader').css("display", "none");
                }
            })
        }

        function loadEvent(data) {
            var row = '';
            $.each(data, function (i, v) {
                var status = '';
                if (v.status == 1) {
                    status = '<i class="text-success fa fa-circle" title="Hiển thị"></i>'
                } else {
                    status = '<i class="text-warning fa fa-circle" title="Ẩn">';
                }
                row += '<tr>';
                row += '<td>' + (i + 1) + '</td>';
                row += '<td class="text-center">';
                row += status;
                row += '<a href="/admin/events/edit/' + v.id + '"><b>' + v.title + '</b></a>';
                row += '</td>';
                row += '<td class="text-center">' + v.nameCategory + '</td>';
                // row+='<td class="text-info text-center"><p><i class="fa fa-building-o"></i><small>'+v.poscodeName+'</small></p></td>';
                row += '<td class="info-text text-center"><p>';
                row += '<i class="fa fa-clock-o"></i><small>' + v.timeStart + ' - ' + v.timeEnd + '</small>';
                row += '</p></td>';
                row += '<td class="info-text row ">';
                row += '<div>Ngày tạo :' + v.createdDate + '<br>Người tạo :' + v.createdBy + '</div>';
                row += '</td>'
                row += '<td><a class=" font-blue-steel " href="/admin/events/edit/' + v.id + '" title="Sửa"><i class="fa fa-pencil-square fa-2x"></i></a>';
                row += '<a class=" font-blue-steel " onclick="deleteNews('+v.id+')" title="Sửa"><i class="fa fa-trash fa-2x"></i></a>'
                '</td>';
                row += '</tr>';
            });
            $('#tableEvent').empty();
            $('#tableEvent').append(row);
        }

        getAllEvent("");
        $('#btnSearch').click(function () {
            getAllEvent("");
        });
        $('#status').change(function () {
            getAllEvent("");
        });
        $('#idCategory').change(function () {
            getAllEvent("");
        });
        $('#search').on('submit', function (e) {
            e.preventDefault();
            getAllEvent("");
        });
    })
})

function deleteNews(id) {
    if (confirm("Xác nhận xóa bài viết")) {
        $.ajax({
            type: "DELETE",
            url: "/api/admin/events/" + id,
            headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            //dataType: "json",
            contentType: "application/json",
            beforeSend: function () {
                $('.loader').css("display", "block");
            },
            success: function (response) {
                alert('Xóa sự kiện thành công!');
                $('.loader').css("display", "none");
                console.log(response);
                window.location.reload(true)
            },
            error: function (response) {
                //console.log("fail");
                alert("Xóa bài viết không thành công !");
                $('.loader').css("display", "none");
                console.log(response);
            }
        });
    }

}