function loadCatgory(id) {
    $('#btnEdit').text("Cập nhật");


    var data = {};
    data['id'] = id;
    var partner = {};
    console.log(data)
    $.ajax({
        type: "GET",
        url: "/api/admin/manager/partner/detail/" + id,
        // data: JSON.stringify(data),
        // dataType: "json",
        contentType: "application/json",
        success: function (partner) {
            $('#id').val(partner.id);
            $('#name').val(partner.name);
            $('#describes').val(partner.describes);
            $('#point').val(partner.point);
            $('#review').val(partner.review);
            $('#point').val(partner.field);

        },
        error: function (response) {
            console.log("fail");
            console.log(response);
        }
    });


}

function reset() {
    var partner = {};
    $('#btnEdit').text("Thêm");
    $('#id').val(partner.id);
    $('#name').val(partner.name);
    $('#describes').val(partner.describes);
    $('#point').val(partner.point);
    $('#review').val(partner.review);
    $('#point').val(partner.field);
}

function post(data) {
    $.ajax({
        type: "POST",
        url: "/api/admin/manager/partner",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success: function (partner) {
            alert("Thêm thành công!");
            window.location.reload(true);

        },
        error: function (response) {
            alert("Thêm không thành công !");
        }
    });

};

function edit() {
    var data = {};
    var id = $('#id').val();
    var formEdit = $('#formEdit').serializeArray();
    $.each(formEdit, function (index, v) {
        data["" + v.name + ""] = v.value;
    });
    if (data.name == "") {
        alert("Tên danh mục không được để trống !")
        throw "name partner is null"
    }
    if (id == "") {
        post(data);
    } else {
        put(data);
    }
};

function put(data) {
    $.ajax({
        type: "PUT",
        url: "/api/admin/manager/partner",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        success: function (partner) {
            alert("Cập nhật thành công !");
            window.location.href = "/admin/manager/partner";
        },
        error: function (response) {
            alert("Cập nhật không thành công !");
        }
    });

};

function deleteee() {
    var data = {};
    var staffs =$('#categoryList').find('tbody input[type=checkbox]:checked').map(function () {
        return $(this).val();
    }).get();
    if (staffs.length==0){
        alert("Chưa có danh mục nào được chọn");
        throw "Chưa có danh mục";
    }
    if(confirm("Xác nhận xóa")){
        data['ids'] = staffs;
        del(data);
    }

}
