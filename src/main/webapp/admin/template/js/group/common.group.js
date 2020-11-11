function edit() {
    var data = {};
    var formData = $('#formEdit').serializeArray();
    $.each(formData,function (i,v) {
        data[v.name] = v.value;
    })
    if (data.id==""){
        save(data)
    } else {
        update(data);
    }
}
function reset() {
    $(document).on('click','#btnReset').text("Thêm");
    $('#name2').val("");
    $('#description').val('');

}
function loadCatgory(id) {
    $('#btnEdit').text("Cập nhật");
    $.ajax({
        type: "GET",
        url: "/api/admin/group-user/"+id,
        //data: JSON.stringify(data),
        dataType: "json",
        //contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            $('#name2').val(response.name);
            $('#description').val(response.description);
            $('#id2').val(response.id)
            $('#pcode').val(response.idPoscode);
        },
        error: function (response) {
            //console.log("fail");
            alert("Không tìm thấy!");
            $('.loader').css("display", "none");
            console.log(response);
        }
    });
}
function save(data) {
    $.ajax({
        type: "POST",
        url: "/api/admin/group-user",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            alert('Thêm thành công!');
            console.log(response);
            window.location.reload(true);
        },
        error: function (response) {
            //console.log("fail");
            alert("Thêm không thành công !");
            $('.loader').css("display", "none");
            console.log(response);
        }
    });
}
function update(data) {
    $.ajax({
        type: "PUT",
        url: "/api/admin/group-user",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            alert('Cập nhật thành công!');
            console.log(response);
            window.location.reload(true);
        },
        error: function (response) {
            //console.log("fail");
            alert("Thêm không thành công !");
            $('.loader').css("display", "none");
            console.log(response);
        }
    });
}
function deleteCategory(id){
    if (confirm("Xác nhận xóa ?")) {
        $.ajax({
            type: "DELETE",
            url: "/api/admin/group-user/"+id,
            //data: JSON.stringify(data),
            dataType: "json",
            //contentType: "application/json",
            beforeSend: function () {
                $('.loader').css("display", "block");
            },
            success: function (response) {
                alert("Xóa thành công");
                window.location.reload(true);
            },
            error: function (response) {
                //console.log("fail");
                alert("Xóa không thành công !");
                $('.loader').css("display", "none");
                console.log(response);
            }
        });
    }

}

function openModal(id) {
    $('#myModal').modal();
    getUser(id);
}
function loadData(data) {

    $('#users').empty();

    $.each(data,function (i,v) {
        var row='';
        row+='<tr role="row" id="'+v.id+'">';
        row+='<td>'+v.fullName;
        row+='</td>';
        row+='<td>';
        row+=v.username;
        row+='</td>';
        row+='<td>' ;
        row+='<a class="btn btn-xs btn-danger" onclick="addUser('+v.id+')"><i class="fa fa-plus" aria-hidden="true" style="color: white"></i></a>';
        row+='</td>';
        row+='</tr>';
        $('#users').append(row);

    });
}
function addUser(idUser) {
    var  idGroup = $('#idGroup').val();
    var data = {};
    data['idGroup'] = idGroup;
    data['idUser'] = idUser;

    $.ajax({
        type: "POST",
        url: "/api/admin/group-join",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            alert("Thêm thành viên thành công");
            $('.loader').css("display", "block");
           getUser(idGroup);
        },
        error: function (response) {
            //console.log("fail");
            alert("Thêm thành viên không thành công !");
            $('.loader').css("display", "none");
            console.log(response);
        }
    });
}
function removeMember(idUser) {
    var  idGroup = $('#idGroup').val();
    var data = {};
    data['idGroup'] = idGroup;
    data['idUser'] = idUser;
    if (confirm("Xác nhận xóa khỏi nhóm")){
        $.ajax({
            type: "DELETE",
            url: "/api/admin/group-join",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            beforeSend: function () {
                $('.loader').css("display", "block");
            },
            success: function (response) {
                alert("Xóa thành viên thành công !");
                window.location.reload(true);
            },
            error: function (response) {
                //console.log("fail");
                alert("Xóa thành viên không thành công !");
                $('.loader').css("display", "none");
                console.log(response);
            }
        });
    }

}