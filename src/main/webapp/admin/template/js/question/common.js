var question = {};
var count = 0;
jQuery(function ($) {
    $(document).ready(function () {
        $(document).on('click', '.btn_remove', function () {
            var formData = $('#formAnswer').serializeArray();
            if (formData.length == 0) {
                alert("Không có câu hỏi để xóa");
                throw "Không có trường để xóa";
            }
            var lenght = 0;
            $.each(formData, function (i, v) {
                if (v.name.startsWith("id")) {
                    lenght += 1;
                }
            });
            if (lenght == 0) {
                throw ('fail');
            }
            if (confirm("Xác nhận xóa")) {
                lenght -= 1;
                $('#item_' + lenght).remove();
            }
            console.log(aphabet)
            // if (confirm("Xác nhận xóa")) {
            //     var button_id = $(this).attr("id");
            //     $('#item_' + button_id + '').remove();
            // }

        });

        function getQuestion() {
            var questionId = $('#questionId').val();
            if (questionId != "" && questionId != null) {
                $.ajax({
                    type: "GET",
                    url: "/api/admin/question/" + questionId,
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    contentType: "application/json",
                    beforeSend: function () {

                    },
                    success: function (response) {
                        question = response;
                        console.log(question)
                        $('#question').text(response.question);
                        $('#explain').text(response.explain);
                        $('#statusQuestion').val(question.statusQuestion);
                        if (response.url != null || response.url != '') {
                            $('#url').val(response.url);
                            $('#detailMultimedia').empty();
                            if (response.type == 1) {
                                $('#detailMultimedia').append('<video class="col-md-12" controls><source src="' + $('#url').val() + '" type="video/mp4"> cc </video>');
                            } else if (response.type == 2) {
                                $('#detailMultimedia').append('<audio controls>\n' +
                                    '  <source src="' + $('#url').val() + '" type="audio/ogg">\n' +
                                    'Your browser does not support the audio element.\n' +
                                    '</audio>')
                            }
                        }

                        if (response.type != null) {
                            $('#typeVideo').empty();
                            if (response.type == 1) {
                                $('#typeVideo').append(' <label class="col-form-label">Loại video</label>');
                                $('#typeVideo').append(' <input type="radio" name="type" value="1" checked>');
                                $('#typeVideo').append(' <label class="col-form-label">Mp3</label>');
                                $('#typeVideo').append(' <input type="radio" name="type" value="2" >');
                            } else if (response.type == 2) {
                                $('#typeVideo').append(' <label class="col-form-label">Loại video</label>');
                                $('#typeVideo').append(' <input type="radio" name="type" value="1" >');
                                $('#typeVideo').append(' <label class="col-form-label">Mp3</label>');
                                $('#typeVideo').append(' <input type="radio" name="type" value="2" checked >');
                            }

                        }
                        CKEDITOR.replace('question', {
                            height: '100px',
                            filebrowserBrowseUrl: '/admin/ckfinder/ckfinder.html',
                            filebrowserImageBrowseUrl: '/admin/ckfinder/ckfinder.html?type=Images',
                            filebrowserFlashBrowseUrl: '/admin/ckfinder/ckfinder.html?type=Flash',
                            filebrowserUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                            filebrowserImageUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                            filebrowserFlashUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash'
                        });
                        getLevel();
                        getCategory();
                    }, error: function () {
                        CKEDITOR.replace('question', {
                            height: '100px',
                            filebrowserBrowseUrl: '/admin/ckfinder/ckfinder.html',
                            filebrowserImageBrowseUrl: '/admin/ckfinder/ckfinder.html?type=Images',
                            filebrowserFlashBrowseUrl: '/admin/ckfinder/ckfinder.html?type=Flash',
                            filebrowserUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                            filebrowserImageUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                            filebrowserFlashUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash'
                        })
                    }
                })
            } else {
                getLevel();
                getCategory();
                CKEDITOR.replace('question', {
                    height: '100px',
                    filebrowserBrowseUrl: '/admin/ckfinder/ckfinder.html',
                    filebrowserImageBrowseUrl: '/admin/ckfinder/ckfinder.html?type=Images',
                    filebrowserFlashBrowseUrl: '/admin/ckfinder/ckfinder.html?type=Flash',
                    filebrowserUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                    filebrowserImageUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                    filebrowserFlashUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash',
                    removeButtons: 'Styles,Format,Font,FontSize,Bold,Italic,Underline,Strike,Subscript,Superscript'


                })

            }

        }

        function getLevel() {
            $.ajax({
                type: "GET",
                url: "/api/admin/question/level/all",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    var row = '';
                    if (question.id == "" || question.id == null) {
                        $.each(response, function (i, v) {
                            row += ' <option value="' + v.id + '" >' + v.nameLevell + '</option>';
                        })
                    } else {
                        $.each(response, function (i, v) {
                            if (v.id == question.levell.id) {
                                row += ' <option value="' + v.id + '" selected >' + v.nameLevell + '</option>';
                            } else {
                                row += ' <option value="' + v.id + '" >' + v.nameLevell + '</option>';
                            }
                        })
                    }
                    $('#levelId').empty();
                    $('#levelId').append(row);
                    if ($('#level').val() != "") {
                        $('#levelId').val($('#level').val())
                    }
                    ;
                }, error: function () {

                }
            })
        }

        function getCategory() {
            $.ajax({
                type: "GET",
                url: "/api/admin/question-category/parent",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {

                },
                success: function (response) {
                    response = response.data;
                    var row = '';
                    $.each(response, function (i, item) {
                        row += '<option value="' + item.id + '">' + item.nameCategory + '</option>';
                        if (item.listChild.length > 0) {
                            row += showListChild(item.listChild);
                        }

                    });

                    $('#questionCategoryId').empty();
                    $('#questionCategoryId').append(row);
                    if (question.questionCategoryId != null) {
                        $('#questionCategoryId').val(question.questionCategoryId)
                    }
                    if ($('#categoryId').val() != "") {
                        $('#questionCategoryId').val($('#categoryId').val());
                    }
                }, error: function () {

                }
            })
        }

        function showListChild(listChild) {
            var row = '';
            $.each(listChild, function (i, item) {
                    count++;
                    if (item.parentName != null) {
                        parentName = item.parentName;
                    }
                    var prefix = "";
                    for (var x = 1; x <= count; x++) {
                        prefix += "&emsp;"
                    }
                    prefix += "--";
                    row += '<option value="' + item.id + '">' + prefix + item.nameCategory + '</option>';
                    if (item.listChild.length > 0) {
                        row += showListChild(item.listChild);
                    } else {
                        count--;
                    }
                }
            );
            return row;
        }

        getQuestion();

        $(document).on('click', '#preview', function () {
            var type = $('.type-media').val();
            $('#detailMultimedia').empty();
            if ($('#url').val() == "") {
                $('#detailMultimedia').append("<h2>Chưa có nội dung</h2>");
                return;
            }
            if (type == 1) {
                $('#detailMultimedia').append('<video class="col-md-12" controls><source src="' + $('#url').val() + '" type="video/mp4"> cc </video>');
            } else if (type == 2) {
                $('#detailMultimedia').append('<audio controls>\n' +
                    '  <source src="' + $('#url').val() + '" type="audio/ogg">\n' +
                    'Your browser does not support the audio element.\n' +
                    '</audio>')
            }
        })
    })
});


