function getUser(id) {
    $.ajax({
        type: "GET",
        url: "/api/admin/group/"+id+"/teacher",
        // data: JSON.stringify(data),
        // dataType: "json",
        // contentType:"application/json",
        beforeSend:function(){
            $('.loader').css("display","block");
        },
        success: function (response) {

            loadData(response);
            $('.loader').css("display","none");
        },
        error: function(response){
            console.log("fail");
            console.log(response);
            alert("Tìm thất bại")
            $('.loader').css("display","none");
        }
    });
}