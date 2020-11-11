jQuery(function ($) {
    $(document).ready(function () {
        function loadRequestCourse() {
            var courseId = $('#courseId').val();
            var data = {};
            data['idCourse'] = courseId;
            $.ajax({
                type: "POST",
                url: "/api/admin/course/request/all",
                data: JSON.stringify(data),
                dataType: "json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                }, success: function (response) {
                    var row = '';

                    $.each(response.data, function (i, v) {
                        var poscodeName = '';
                        if (v.poscodeName == '') {
                            poscodeName = 'Tổng công ty';
                        }
                        row += '<tr>';
                        row += '<td><input type="checkbox" id="checkbox_' + v.id + '" value="' + v.id + '"></td>';
                        row += '<td>' + v.user.fullName + '</td>';
                        row += '<td>' + v.createdBy + '</td>';
                        row += '<td>' + poscodeName + '</td>';
                        row += '</tr>';
                    });
                    $('#tableRequest').empty();
                    $('#tableRequest').append(row);
                    if (response.data.length > 0) {
                        $('#alert-data').css("display", "block");
                    }

                    $('.loader').css("display", "none");
                }, error: function () {
                    $('#alert-data').css("display", "block");
                    $('.loader').css("display", "none");
                }
            })
        }

        $('#checkRequest').on('click', function () {
            loadRequestCourse();
        });
        $('#acceptBtn').click(function () {
            var data = {};
            data['ids'] = getIdsRequest();
            if (data['ids'].length == 0) {
                alert("Chưa có học viên nào được chọn");
                throw "Not user chosen";
            }
            $.ajax({
                type: "POST",
                url: "/api/admin/course/request/accept",
                data: JSON.stringify(data),
                dataType: "json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                }, success: function (response) {
                    loadRequestCourse();
                    $('.loader').css("display", "none");
                    alert(response.message);
                    window.location.reload();
                }, error: function () {
                    alert("Duyệt học viên không thành công")
                    $('.loader').css("display", "none");
                }
            })
        });
        $('#declineBtn').click(function () {
            var data = {};
            data['ids'] = getIdsRequest();
            if (data['ids'].length == 0) {
                alert("Chưa có học viên nào được chọn");
                throw "Not user chosen";
            }
            $.ajax({
                type: "PUT",
                url: "/api/admin/course/request/decline",
                data: JSON.stringify(data),
                dataType: "json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                }, success: function (response) {
                    loadRequestCourse();
                    $('.loader').css("display", "none");
                    alert('Hủy thành công')
                }, error: function () {
                    $('.loader').css("display", "none");
                }
            })
        });
        function getIdsRequest() {
            var ids = [];
            $('#tableRequest').find('input[type=checkbox]:checked').each(function () {
                ids.push($(this).val())
            });
            return ids;
        }
        $('#checkAllRequest').click(function () {
            if ($(this).is(':checked')) {

                $('#tableRequest').find('input[type=checkbox]').prop("checked", true);
            } else {
                $('#tableRequest').find('input[type=checkbox]').prop("checked", false);
            }

        });
    })
});