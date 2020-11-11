jQuery(function ($) {
    $(document).ready(function () {
        var page = getCurParam("page");
        var search = getCurParam("search");
        var size =  getCurParam("size");
        $('#disable').click(function () {
            var status = 0;
            updateStatus(status);
        });
        $('#enable').click(function () {
            var status = 1;
            updateStatus(status);
        });

        function updateStatus(status) {
            // console.log(status);
            var data = {};
            var ids = [];
            $.each($('input[name=ids]:checked'), function (item, v) {
                ids.push(v.value);
                // console.log();
            });
            data['ids'] = ids;
            data['status'] = status;
            // console.log(data);
            $.ajax({
                url: '/api/admin/user/status',
                type: 'PUT',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                beforeSend:function() {
                    $('.spin').removeClass('display-none');
                },
                success: function (result) {
                    alert("Cập nhật thành công");
                    location.reload(true);

                },
                error: function (error) {
                    console.log(error);

                    if (error.status < 300) {
                        alert("Cập nhật thành công");
                        location.reload(true);
                    }
                    else {
                        alert("Cập nhật thất bại!");
                        $('.spin').addClass('display-none');
                    }
                }
            });
        }

        // var userTable = $("#user-table").DataTable();
        $('#check-all').click(function () {
            var rows = $('#user-table tbody tr');
            // console.log(rows);
            if ($(this).is(":checked")) {
                rows.each(function (i, v) {
                    console.log($(this));
                    $(this).find(".id-user").prop('checked', 'true');
                })
            } else {
                console.log("test");
                rows.each(function (i, v) {
                    $(this).find(".id-user").prop('checked', false);
                })
            }
        });

        function getCurParam(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return '';
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
        $('#searchForm').on('submit',function (e) {
            e.preventDefault();
            init(1);
        })
        $('#filter-poscode').click(function () {
            init(1);
        })
        function init(thisPage) {
            if(!thisPage) thisPage = page
            var thisSize = $('select[name=size]').val();
            var thisSearch = '';
            if (!search){
                thisSearch = $('#search').val();
            }
            var idPoscode = '';
            $('.tree-poscode .edit-item:checked').each(function (i,v) {
                var arrLength = $('.tree-poscode .edit-item:checked').length;
                idPoscode += v.value;
                if (i < (arrLength-1)) idPoscode += ','
            })
            $.ajax({
                url: '/api/admin/user/list?page=' + thisPage + "&search=" + thisSearch + '&size=' + thisSize + '&poscode=' +idPoscode,
                type: 'GET',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                dataType: 'json',
                beforeSend:function() {
                  $('.spin').removeClass('display-none');
                  $('tbody').empty();
                    $('#pagination').empty();

                    $('#pagination').removeData("twbs-pagination");

                    $('#pagination').unbind("page");
                },
                success: function (result) {
                    console.log(result);
                    var strAppend = "";
                    result.data.forEach(function (v, i) {
                        var strStatus = "";
                        if (v.status == 1) {
                            strStatus += '<i class="fas fa-check" style="color:#008000"></i>';
                        }
                        if (v.status == 0) {
                            strStatus += ' <i class="fas fa-times" style="color: #ff0000"></i>';
                        }
                        strAppend += '<tr>' +
                            '                    <td class="align-middle">' +
                            '                        <input type="checkbox" name="ids" class="id-user" value="' + v.id + '">' +
                            '                    </td>' +
                            '                    <td class="align-middle">' +
                            strStatus + v.username +
                            '                    </td>' +
                            '                    <td class="align-middle">' +
                            v.email +
                            '                    </td>' +
                            '                    <td class="align-middle">' +
                            v.fullName +
                            '                    </td >' +
                            '                    <td class="align-middle">'
                            if(v.poscodeVnpost != null) {
                                strAppend +=v.poscodeVnpost.name
                            }
                            else {
                                strAppend += "Tổng công ty";
                            }

                            strAppend +='                    </td>' +

                            '                    <td class="align-middle">' +
                            '                       <a class="m-0 btn btn-sm btn-primary" style="color:#fff" href="/admin/setting/user/edit/' + v.id + '"><i class="fas fa-edit"></i></a>' +
                            '                    </td>' +
                            '                </tr>';
                    })
                    $('#user-table tbody').append(strAppend);
                    if (result.totalPage == 0) result.totalPage = 1
                    $('#pagination').twbsPagination({
                        totalPages: result.totalPage,
                        startPage: result.currentPage,
                        initiateStartPageClick: false,
                        first:'Đầu tiên',
                        prev:'Trước',
                        next:'Sau',
                        last:'Cuối cùng',

                        visiblePages: 10,
                        onPageClick: function (event, clickPage) {
                            init(clickPage)
                        }
                    });
                    $('.spin').addClass('display-none')
                },
                error: function (error) {
                    console.log(error);
                    $('.spin').addClass('display-none')
                    if (error.status < 300) {
                        // location.reload(true);
                    }
                }
            });

        }
        $('#number-of-item').on('change',function () {
            init(1);
        })
        init();
    })
})

