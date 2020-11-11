jQuery(function ($) {
    $(document).ready(function () {
        $("#add-page").on("submit",function (e) {
            var dataForm = $(this).serializeArray();
            var data = {}
            $.each(dataForm,function (i,v) {
                data[v["name"]] = v["value"];
            });
            data["pageContent"] = CKEDITOR.instances['page-content'].getData();

            $.ajax({
                url : '/api/admin/page',
                type : 'POST',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType : 'application/json',
                data : JSON.stringify(data),
                dataType : 'json',
                beforeSend:function() {
                    $('.spin').removeClass('display-none');
                },
                success : function(result) {
                    window.location.href="/admin/setting/static-page";

                },
                error : function(error) {
                    console.log(error);
                    $('.spin').addClass('display-none');
                    alert('Đã có lỗi xảy ra');
                    if (error.status < 300) {
                        // location.reload(true);
                    }
                }
            });

            e.preventDefault();
        })
        function getCurId() {
            var vars = document.createElement('a');
            // var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            //     vars[key] = value;
            // });
            vars.href = window.location.href;
            var id = vars.pathname.replace("/admin/setting/static-page/edit","").replace("/","");
            return id;
        }

        function init() {
            var curId = getCurId();
            if (curId != ''){
                $.ajax({
                    type: "GET",
                    url: "/api/admin/page?id="+curId,
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    dataType: "json",
                    contentType: "application/json",
                    beforeSend:function() {
                        $('.spin').removeClass('display-none');
                    },
                    success: function (responesData) {
                        // window.location.href = "/admin/setting/param";
                        $('input[name=id]').val(responesData.id);
                        // console.log(responesData);

                        $('input[name=code]').val(responesData.code);
                        $('input[name=title]').val(responesData.title);
                        $('#page-content').text(responesData.pageContent);
                        $('#page-content').val(responesData.pageContent);
                        CKEDITOR.instances['page-content'].setData(responesData.pageContent);
                        $('.spin').addClass('display-none');

                    }, error: function (response) {
                        console.log("fail");
                        console.log(response);
                        $('.spin').addClass('display-none');
                        alert('Đã có lỗi xảy ra');
                    }
                });
            }
        }
        init();
    })
})