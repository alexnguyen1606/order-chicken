jQuery(function ($) {
    $(document).ready(function () {
        $('#btnEdit').click(function () {
            var data  = {};
            var formEdit = $('#formEdit').serializeArray();
            $.each(formEdit,function (i,v) {
                data[v.name] = v.value;
            })
            console.log(data);
            importExcel(data);
        });

        $('#importExcel').on('change',function () {
            var formData = new FormData();
            formData.append('multipartFile',$('#importExcel')[0].files[0]);

            $.ajax({
                url : '/api/admin/upload/excel',
                type : 'POST',
                enctype: 'multipart/form-data',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data : formData,
                processData: false,  // Important!
                contentType: false,
                cache: false,
                success : function(result) {
                    console.log(result);

                    $('#src').val(result);
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    console.log( 'The following error occured: ' + textStatus, errorThrown );
                }
            });
        });
        function importExcel(data) {
            $.ajax({
                type: "POST",
                url: "/api/admin/course/import-student-from-excel",
                data: JSON.stringify(data),
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");
                },
                success: function (response) {
                    $('.loader').css("display", "none");
                    alert("Thêm thành công "+response.totalImportSucess+" trong số "+response.totalItemImport+" học viên");
                    window.location.href="/admin/course/index";
                },
                error: function (response) {
                    $('.loader').css("display", "none");
                    alert(response.responseJSON.message);
                }
            });
        }
    })
})

