jQuery(function ($) {
    $(document).ready(function () {
        function fetchVoucher() {
            var id = $('#id').val();
            if (id != "" && id != null) {
                $.ajax({
                    type: "GET",
                    url: "/api/admin/voucher/" + id,
                    // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    // data: JSON.stringify(data),
                    dataType: "json",
                    contentType: "application/json",
                    beforeSend: function () {
                        $('.loader').css("display", "block");
                    },
                    success: function (response) {
                        response = response.data;
                        $('#name').val(response.name);
                        $('#status').val(response.status);
                        $('#content').text(response.content);
                        $('#urlImg').val(response.urlImg);
                        $('#imgExam').attr("src", response.urlImg);
                        $('#code').val(response.code);
                        $('#discount').val(response.discount);
                        $('#startTime').val(response.startTimeString);
                        $('#endTime').val(response.endTimeString);
                        $('.loader').css("display", "none");
                        console.log(response)
                    }, error: function (jqXHR) {
                        $('.loader').css("display", "none");
                        // getCourse();
                    }
                });

                CKEDITOR.replace('content', {
                    filebrowserBrowseUrl: '/admin/ckfinder/ckfinder.html',
                    filebrowserImageBrowseUrl: '/admin/ckfinder/ckfinder.html?type=Images',
                    filebrowserFlashBrowseUrl: '/admin/ckfinder/ckfinder.html?type=Flash',
                    filebrowserUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                    filebrowserImageUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                    filebrowserFlashUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash'
                });
            } else {
                CKEDITOR.replace('content', {
                    filebrowserBrowseUrl: '/admin/ckfinder/ckfinder.html',
                    filebrowserImageBrowseUrl: '/admin/ckfinder/ckfinder.html?type=Images',
                    filebrowserFlashBrowseUrl: '/admin/ckfinder/ckfinder.html?type=Flash',
                    filebrowserUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                    filebrowserImageUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                    filebrowserFlashUploadUrl: '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash'
                });
            }
        }

        fetchVoucher();
        $('#formEdit').on('submit', function (e) {
            e.preventDefault();
            var formData = $('#formEdit').serializeArray();
            var data = {};
            $.each(formData, function (i, v) {
                data[v.name] = v.value;
            });
            data.content = CKEDITOR.instances.content.getData();
            if (data.id == "") {
                create(data);
            } else {
                update(data);
            }
        });

        function create(data) {
            $.ajax({
                type: "POST",
                url: "/api/admin/voucher",
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    alert(response.message);
                    $('.loader').css("display", "none");
                    window.location.href="/admin/voucher/list";
                }, error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        }

        function update(data) {
            $.ajax({
                type: "PUT",
                url: "/api/admin/voucher",
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {
                    alert(response.message);
                    $('.loader').css("display", "none");
                    window.location.href="/admin/voucher/list";
                }, error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                    // getCourse();
                }
            });
        }
    })
});