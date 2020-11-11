function downloadTemplate(name) {

    $.ajax({
        type: "GET",
        url: "/api/admin/download/template?name=" + name,
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        success: function (response) {
            console.log("success");
            console.log(response)
        },error:function (response) {
            console.log("error");
            console.log(response);
        }
    })
}