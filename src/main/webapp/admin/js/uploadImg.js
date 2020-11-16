/**
 *
 *   @author:DAO QUANG BINH
 *
 *  November 16,2020
 *
 */

jQuery(function ($) {
    $(document).ready(function () {
        function uploadApi(file) {
            var formData = new FormData();
            formData.append('multipartFile', file);

            return $.ajax({
                url: '/api/upload/images',
                type: 'POST',
                enctype: 'multipart/form-data',
                data : formData,
                processData: false,  // Important!
                contentType: false,
                cache: false,
                success: function (result) {
                    console.log(result);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }

        //add listener
        $('#img').on('change',function () {
            uploadImg();
        })

        //handler function
        async function uploadImg() {
            if ($('#img')[0].files[0]) {
                let url = await uploadApi($('#img')[0].files[0])
                $('#urlImg').val(url);
                $('#imgExam').attr("src",url)
                $('#imgExam').removeClass('d-none');
            }
            else {
                $('#imgExam').addClass('d-none');
                $('#urlImg').val('');
            }
        }
    })
})