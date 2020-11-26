$('#formRegister').on('submit', function (e) {
    e.preventDefault();
    var formData = $('#formRegister').serializeArray();
    var data = {};
    $.each(formData, function (i, v) {
        data[v.name] = v.value;
    });
    if (data.password != data.repeatPassword) {
        alert("Lặp lại mật khẩu không khớp")
        throw "fail";
    }
    $.ajax({
        type: "POST",
        url: "/api/account",
        // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            $('.loader').css("display", "block");
        },
        success: function (response) {
            $('.loader').css("display", "none");
            alert(response.message);
            window.location.reload();
        }, error: function (response) {
            $('.loader').css("display", "none");
            console.log(response);
            alert(response.responseJSON.message);

        }
    });
});