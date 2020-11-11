jQuery(function ($) {
    $(document).ready(function () {
        var URL = "http://stackoverflow.com/questions/10767815/remove-everything-before-the-last-occurrence-of-a-character";


        $('#video_file').on('change', function (e) {
            var formData = new FormData();
            var fileName = e.target.files[0].name;
            var subFix = fileName.substring(fileName.lastIndexOf('.')+1);
            if(subFix!="mp3" && subFix!="mp4" ){
                alert("Loại file không hợp lệ");
                throw "file not valid"
            }
            $('#originName').val(fileName);

            formData.append('multipartFile', $('#video_file')[0].files[0]);
            var total = [].slice.call(this.files).map(function (x) {
                return x.size || x.fileSize;
            }).reduce(function (a, b) {
                return (a + b);
            }, 0);
            if (Math.floor(total / 1024 / 1024) == 0) {
                $('#total').html('Dung Lượng File: ' + Math.floor(total / 1024) + ' KB');
                $('#size').val(Math.floor(total / 1024) + ' KB');
                $('#total2').html('Dung Lượng File: ' + Math.floor(total / 1024) + ' KB');
            } else {
                $('#total').html('Dung Lượng File: ' + Math.floor(total / 1024 / 1024) + ' MB');
                $('#size').val(Math.floor(total / 1024 / 1024) + ' MB');
                $('#total2').html('Dung Lượng File: ' + Math.floor(total / 1024) + ' KB');
            }
            if (total > 50000000) {
                alert('Vượt quá dung lượng cho phép');
                $('#btnSaveMultimedia').prop("disabled", true);
                throw "file to biggg";
            } else {
                $('#btnSaveMultimedia').prop("disabled", false);

            }
            $.ajax({
                xhr: function () {
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
                        myXhr.upload.addEventListener('progress', function (e) {
                            var percent_loaded = Math.ceil((e.loaded / e.total) * 100);
                            if (percent_loaded == 100) {
                                $('#spin-progress').css("display", "block");
                            }
                            if (percent_loaded < 100) {
                                $('#btnSaveMultimedia').prop("disabled", true);
                            }
                            $('#progress-text1').text(percent_loaded + '% File Upload Thành Công..');
                            // $('#progress-text2').text(percent_loaded+'% has been uploaded..');
                            $('#progress').css('width', percent_loaded + '%');
                            if (e.lengthComputable) {
                                $('progress').attr({
                                    value: e.loaded,
                                    max: e.total,
                                });
                            }
                        }, false);
                    }
                    return myXhr;
                },
                url: '/api/admin/upload/question/media',
                type: 'POST',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                enctype: 'multipart/form-data',
                data: formData,
                processData: false,  // Important!
                contentType: false,
                cache: false,
                beforeSend: function () {
                    //  $('.loader').css("display","block");
                },
                success: function (result) {
                    var url = result.data.src;
                    $('#url').val(url);
                    var type=url.substring(url.lastIndexOf('.')+1);
                    if(type=="mp3"){
                        $('.type-media').val(2);
                    }else if(type=="mp4"){
                        $('.type-media').val(1);
                    }else {
                        $('.type-media').val(1);
                        $('#url').val("");
                    }



                    $('.loader').css("display", "none");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $('.loader').css("display", "none");

                }
            });
        });

        $(document).on('change', '#video_link', function () {
            var videoLink = $(this).val();
            var result = videoLink.replace("watch?v=", "embed/");
            $('#files').val(result);


        })
        $(document).on('click', '.type-media', function (e) {
            var questionId = $('#questionId');
            if ($(this).val() == 1) {
                $('#video_file').attr("accept", ".mp4")
            } else {
                $('#video_file').attr("accept", ".mp3")
            }
        })





    })
});
