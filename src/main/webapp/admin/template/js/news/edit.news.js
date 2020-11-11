var count = 0;
jQuery(function ($) {
    $(document).ready(function () {
        function getNews() {
            var id = $('#newsId').val();
            if (id!=null && id!=""){
                $.ajax({
                    type: "GET",
                    url: "/api/admin/news/"+id,
                    contentType: "application/json",
                    headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                    beforeSend: function () {
                        $('.loader').css("display", "block");
                    },
                    success: function (response) {
                        response = response.data;
                        $('#title').val(response.title);
                        $('#thumb-img-src').val(response.images);
                        $('#avatar').val(response.images);
                        $('#thumb-img').attr("src",response.images);
                        var status = '';
                        if (response.statusNew==1){
                            status+='<option value="0" >Nháp</option>';
                            status+='<option value="1" selected></c:if>Hoạt động</option>';
                        } else {
                            status+='<option value="0" selected >Nháp</option>';
                            status+='<option value="1" >Hoạt động</option>'
                        }
                        $('#statusNew').empty();
                        $('#statusNew').append(status);

                        var type ='';
                        if(response.type==0){
                            type+='  <option value="0" selected>Nội bộ</option> <option value="1" >Bên ngoài</option>'
                        }
                        else {
                            type+='<option value="0" >Nội bộ</option> <option value="1" selected >Bên ngoài</option>'
                        };
                        $('#type').empty();
                        $('#type').append(type);

                        var highLight = '';
                        if (response.highlightNew==1){
                            highLight+=' <option value="0" >Không</option>\n' +
                                '                                        <option value="1" selected >Có</option>'
                        } else {
                            highLight+=' <option value="0" selected >Không</option>\n' +
                                '                                        <option value="1" >Có</option>'
                        };
                        $('#highlightNew').empty();
                        $('#highlightNew').append(highLight);

                        $('#content').val(response.content);
                        $('#tomtat').val(response.tomtat);
                        getCategoryNews(response.id_detail_category);

                        $('.loader').css("display", "none");
                        CKEDITOR.replace('content', {
                            filebrowserBrowseUrl : '/admin/ckfinder/ckfinder.html',
                            filebrowserImageBrowseUrl : '/admin/ckfinder/ckfinder.html?type=Images',
                            filebrowserFlashBrowseUrl : '/admin/ckfinder/ckfinder.html?type=Flash',
                            filebrowserUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                            filebrowserImageUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                            filebrowserFlashUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash'


                        });
                    },
                    error: function (response) {
                        $('.loader').css("display", "none");
                    }
                });
            }else {
                getCategoryNew();
                CKEDITOR.replace('content', {
                    filebrowserBrowseUrl : '/admin/ckfinder/ckfinder.html',
                    filebrowserImageBrowseUrl : '/admin/ckfinder/ckfinder.html?type=Images',
                    filebrowserFlashBrowseUrl : '/admin/ckfinder/ckfinder.html?type=Flash',
                    filebrowserUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Files',
                    filebrowserImageUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Images',
                    filebrowserFlashUploadUrl : '/admin/ckfinder/core/connector/java/connector.java?command=QuickUpload&amp;type=Flash'


                });
            }


        };
        function getCategoryNews(categoryId){
            $.ajax({
                type:"GET",
                url:"/api/admin/new-category/parent",
                contentType:"application/json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                success:function (response) {
                    response = response.data;
                    var row='';
                    $.each(response,function (i,item) {
                        row+='<option value="'+item.id+'">'+item.nameDetail+'</option>';
                        if(item.listChild.length>0){
                            row+=showListChild2(item.listChild);
                        }

                    });
                    $('#id_detail_category').append(row);
                    $('#id_detail_category').val(categoryId);
                }
            })
        };

        function getCategoryNew(){
            $.ajax({
                type:"GET",
                url:"/api/admin/new-category/parent",
                contentType:"application/json",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                success:function (response) {
                    response = response.data;
                    var row='';
                    $.each(response,function (i,item) {
                        row+='<option value="'+item.id+'">'+item.nameDetail+'</option>';
                        if(item.listChild.length>0){
                            row+=showListChild2(item.listChild);
                        }
                          //  row+='<option value="'+v.id+'">'+v.nameDetail+'</option>';

                    });
                    $('#id_detail_category').append(row);
                }
            })
        };
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
                    row+='<option value="'+item.id+'">'+prefix+item.nameDetail+'</option>';
                    if (item.listChild.length > 0) {
                        row += showListChild2(item.listChild);
                    }else {
                        count--;
                    }
                }
            );
            return row;
        }
        getNews();
    })
})
$('#btnEditNews').click(function () {
    var data = {};
    var formData = $('#formEdit').serializeArray();

    $.each(formData,function (i,v) {
        data[v.name] = v.value;
    })
   // data['tomtat'] = CKEDITOR.instances.tomtat.getData();
    data['content'] = CKEDITOR.instances.content.getData();
    if (data.title==""){
        alert("Tiêu đề bài viết không được bỏ trống");
        $('#content').focus();
        throw "Content not be null";
    }
    if (data.content==""){
        alert("Nội dung không được bỏ trống");
        $('#content').focus();
        throw "Content not be null";
    }

    if (data.content.length<=50){
        alert("Nội dung không được ngắn hơn 50 ký tự");
        $('#content').focus();
        throw "Content not be null";
    }

    if (data.id==""){
        save(data);
    } else {
        update(data);
    }
});
function save(data){
    $.ajax({
        type: "POST",
        url: "/api/admin/news",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            alert(response.message);
            window.location.href = "/admin/news/list";
        },
        error: function (response) {
            //console.log("fail");
            alert(response.responseJSON.message);
            $('.loader').css("display", "none");
            console.log(response);
        }
    });
}
function update(data){
    $.ajax({
        type: "PUT",
        url: "/api/admin/news",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            alert(response.message);
            console.log(response);
            window.location.href = "/admin/news/list";
        },
        error: function (response) {
            //console.log("fail");
            alert(response.responseJSON.message);
            $('.loader').css("display", "none");
            console.log(response);
        }
    });
}
$('#thumb-input').on('change',function () {
    var formData = new FormData();
    formData.append('multipartFile', $('#thumb-input')[0].files[0]);
    console.log(formData);
    $.ajax({
        url : '/api/admin/upload/images',
        type : 'POST',
        enctype: 'multipart/form-data',
        data : formData,
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        processData: false,  // Important!
        contentType: false,
        cache: false,
        beforeSend: function () {
            $('#loader').css("display", "block");
        },
        success : function(result) {
            // console.log(result);
            console.log(result);
            $('#thumb-img').attr("src",result);
            $('#thumb-img-src').val(result);
            $('#avatar').val(result);
            $('#loader').css("display", "none");
        },
        error : function(jqXHR, textStatus, errorThrown) {
            $('#loader').css("display", "none");
            console.log( 'The following error occured: ' + textStatus, errorThrown );
        }
    });
});
