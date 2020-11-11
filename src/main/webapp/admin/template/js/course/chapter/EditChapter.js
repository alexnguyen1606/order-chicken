jQuery(function ($) {
    $(document).ready(function () {
        $('#btnAddChapter').click(function () {
            var courseId = $('#id').val();
            if (courseId == "" || courseId == null) {
                addChapter();
            } else {
                $.ajax({
                    type: "GET",
                    url: "/api/admin/course-join/check-learned/" + courseId,
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType: "application/json",
                    beforeSend: function () {
                        //  $('.loader').css("display","block");
                    },
                    success: function (response) {
                        if (response.data) {
                            alert("Không thể thêm chương mục ( đã có học viên tham gia học)");
                            throw "Fail";

                        } else {
                            addChapter();
                        }
                    },
                    error: function (response) {
                        alert("Không thể xóa chương mục ( đã có học viên tham gia học)");
                    }
                });
            }
        });

        function addChapter() {
            var row = '';
            var index = 1;
            var formData = $('#formChapter').serializeArray();
            $.each(formData, function (i, v) {
                if (v.name == 'id') {
                    index += 1;
                }
            });
            row += '<tr id="row_chapter_' + index + '" >';
            row += '<input type="hidden" name="percentFinish" value="100" >';
            row += '<td>' + index + '<input type="hidden" name="id" value=""></td>';
            row += '<td><input class="form-control" name="name" value="Chương ' + index + '"> </td>';
            row += '<td><a class="btn_remove font-blue-steel " id="' + index + '" '
                + 'title="xóa"><i class="fa fa-trash-o"></i></a></td> ';
            row += "</tr>";
            $('#listchapter').append(row);
        }

        $(document).on('click', '.btn_remove', function () {
            var courseId = $('#id').val();
            var button_id = $(this).attr("id");
            if (courseId == "" || courseId==null) {
                deleteChapter(button_id)
            }else {
                $.ajax({
                    type: "GET",
                    url: "/api/admin/course-join/check-learned/" + courseId,
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType: "application/json",
                    beforeSend: function () {
                        //  $('.loader').css("display","block");
                    },
                    success: function (response) {
                        if (response.data) {
                            alert("Không thể xóa chương mục ( đã có học viên tham gia học)");
                            throw "Fail";
                        } else {
                            deleteChapter(button_id);
                        }
                    },
                    error: function (response) {
                        alert("Không thể xóa chương mục ( đã có học viên tham gia học)");
                    }
                });
            }

        });
        function deleteChapter(button_id) {
            if (confirm("Xác nhận xóa")) {
                $('#row_chapter_' + button_id + '').remove();
            }
        }
    });
});