jQuery(function ($) {
    $(document).ready(function () {
        function findCourse() {
            var courseId = $('#courseId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/course/" + courseId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //  dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    //  $('.loader').css("display","block");
                },
                success: function (response) {
                    $('#courseName').text(response.data.name);

                }
            })
        };
        function getAllDocumentByCourseId() {
            var courseId = $('#courseId').val();

            $.ajax({
                type: "GET",
                url: " /api/admin/document/course/" + courseId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //  dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                     $('.loader').css("display","block");
                },
                success: function (response) {
                    $('.loader').css("display","none");
                    $('#courseName').text(response.name);
                    var row='';
                    console.log(response);
                    $.each(response,function (i,v) {
                        row+='<tr id="'+v.id+'">';
                        row+='<td>'+(i+1)+'</td>';
                        row+='<td width="40%" >'+v.name+'</td>';
                        row+='<td><br>'+v.describes+'</td>';
                        row+='<td class="info_text text-center font-grey-mint">';
                        row+='Tên: <a href="'+v.linkFile+'">'+v.linkFile+'</a>';
                        row+='<br>Ngày tạo: '+v.timeCreate;
                        row+='<br>Người tạo: '+v.createdBy;
                        row+='</td>';
                        row+='<td><a class="btn btn-xs btn-danger btnDeleteDocument" idData="'+v.id+'"><i class="fa fa-trash" aria-hidden="true" style="color: white"></i></a>';
                        row+='</td>';
                        row+='</tr>';
                    })
                    $('#listDocument').empty();
                    $('#listDocument').append(row);
                }
            })
        };
        getAllDocumentByCourseId();
        findCourse();
        $('#showModal').on('click',function () {
            getDocument("");
        });
        function paging(totalPage,currentPage){
            $('#pagination-document').twbsPagination({
                totalPages: totalPage,
                startPage: currentPage,
                visiblePages: 10,
                last:'Cuối cùng',
                next:'Tiếp theo',
                first:'Đầu tiên',
                prev:'Phía trước',
                onPageClick: function (event, page) {
                    if (currentPage != page) {
                        var url = "/api/admin/document/course";
                        url+="?page="+page;
                        getDocument(url);
                    }
                }
            });
        }
        function pagingDocumentForCourse(totalPage,currentPages){
            $('#pagination-document-course').twbsPagination({
                totalPages: totalPage,
                startPage: currentPages,
                visiblePages: 10,
                last:'Cuối cùng',
                next:'Tiếp theo',
                first:'Đầu tiên',
                prev:'Phía trước',
                onPageClick: function (event, page) {
                    if (currentPages != page) {
                        var url = "/api/admin/document/course";
                        url+="?page="+page;
                        getDocument(url);
                    }
                }
            });
        };
        function getData() {
            var data = {};
            var formData = $('#formSearch').serializeArray();
            $.each(formData,function (i,v) {
                data[''+v.name+''] = v.value;
            });

            return data;
        }
        function getDocument(url) {
            var data = getData();
            if(url=='' || url==null){
                url = '/api/admin/document/course';
            }
            $.ajax({
                type: "PUT",
                url: url,
                headers: { "Authorization": "Bearer "+localStorage.getItem('eln_token') },
                data: JSON.stringify(data),
                dataType: "json",
                contentType:"application/json",
                beforeSend:function(){
                    $('.loader').css("display","block");
                    $('#pagination-document').empty();
                    $('#pagination-document').removeData("twbs-pagination");
                    $('#pagination-document').unbind("page");
                },
                success: function (response) {
                    $('.loader').css("display","none");
                    if(response.totalPage!=0){
                        paging(response.totalPage,response.currentPage);
                    }
                    loadDocument(response.data);
                },
                error: function(response){

                    $('.loader').css("display","none");
                    console.log("fail");
                    console.log(response);
                }
            });

        }

        function loadDocument(data) {
            var row='';
            $.each(data,function (i,v) {
                var poscodeName =v.poscodeName;
                if (v.poscodeName!=''){
                    poscodeName='Tổng công ty'
                }
                row+='<tr>';
                row+='<td>';
                row+='<p>'+v.name+'</p>'
                row+='<i class="fa fa-building-o icon"></i>';
                row+=poscodeName;
                row+='</td>';
                row+='<td>'+v.describes+'</td>';
                row+='<td>';
                row+='Tên: '+v.originName;
                // row+='<br>';
                // row+='Loại:<span class="badge badge-info">'+v.type+' </span>';
                row+='<br>';
                row+='Người tạo:'+v.createdBy;
                row+='</td>';

                row+='<td>';
                row+='<a class="btn btn-xs btn-danger btnAddDocument" idData="'+v.id+'"><i class="fa fa-plus" aria-hidden="true" style="color: white"></i></a>';
                row+='</td>';
                row+=' </tr>';
            });
            $('#documentList').empty();
            $('#documentList').append(row);
        }

        $('#formSearch').on('submit',function (e) {
            e.preventDefault();
            getDocument('');

        });
        $(document).on('click','.btnAddDocument',function () {
            var idDoc = $(this).attr("idData");
            addDocument(idDoc);
        });
        $(document).on('click','.btnDeleteDocument',function () {
            var idDoc = $(this).attr("idData");
            var courseId = $('#courseId').val();
            deleteDocument(idDoc,courseId);
        });
        function addDocument(idDocument) {
            var data ={}
            var idCourse = $('#courseId').val();
            data['courseId'] = idCourse;
            data['id'] = idDocument;
            $.ajax({
                type: "POST",
                url: "/api/admin/document/course",
                headers: { "Authorization": "Bearer "+localStorage.getItem('eln_token') },
                data: JSON.stringify(data),
                dataType: "json",
                contentType:"application/json",
                beforeSend:function(){
                    $('.loader').css("display","block");
                    $('.loader').css("background")
                },
                success: function (response) {
                    console.log(response);
                    alert(response.message);
                    $('.loader').css("display","none");
                   getDocument("");
                   getAllDocumentByCourseId();
                },
                error: function(response){
                    alert("Thêm không thành công")
                    $('.loader').css("display","none");

                }
            });
        }
        function deleteDocument(idDocument,courseId) {
            if (!confirm("Xác nhận xóa")){
                throw "not allow delete";
            }
            var data ={}
            data['courseId'] = courseId;
            data['id'] = idDocument;
            $.ajax({
                type: "DELETE",
                url: "/api/admin/document/course",
                headers: { "Authorization": "Bearer "+localStorage.getItem('eln_token') },
                data: JSON.stringify(data),
                dataType: "json",
                contentType:"application/json",
                beforeSend:function(){
                    $('.loader').css("display","block");
                    $('.loader').css("background")
                },
                success: function (response) {
                    $('.loader').css("display","none");
                    alert("Xóa thành công");
                    getAllDocumentByCourseId();
                },
                error: function(response){
                    alert("Xóa không thành công")
                    $('.loader').css("display","none");
                    console.log("fail");
                    console.log(response);
                }
            });
        };

    })
});





function getAllDocumentByCourseId() {
    var courseId = $('#courseId').val();

    $.ajax({
        type: "GET",
        url: " /api/admin/document/course/" + courseId,
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        //data: JSON.stringify(data),
        //  dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display","block");
        },
        success: function (response) {
            $('.loader').css("display","none");
            $('#courseName').text(response.name);
            var row='';
            $.each(response,function (i,v) {
                row='<tr id="'+v.id+'">';
                row+='<td>'+(i+1)+'</td>';
                row+='<td width="40%" >'+v.name+'</td>';
                row+='<td><br>'+v.describes+'</td>';
                row+='<td class="info_text text-center font-grey-mint">';
                row+='Tên: <a href="'+v.linkFile+'">'+v.origin_name+'</a>';
                row+='<br>Ngày tạo: '+v.createdDate;
                row+='<br>Người tạo: '+v.createdBy;
                row+='</td>';
                row+='<td><a class="btn btn-xs btn-danger" onclick="deleteDocument('+v.id+','+courseId+')"><i class="fa fa-trash" aria-hidden="true" style="color: white"></i></a>';
                row+='</td>';
                row+='</tr>';
            })
            $('#listDocument').empty();
            $('#listDocument').append(row);
        }
    })
}