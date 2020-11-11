/**
 *
 * @author: Kien Le Trung
 *
 * 2:24 CH
 Tháng 6 12, 2020
 *
 */
jQuery(function ($) {
    $(document).ready(function () {
        function getmailcontact() {
            var token = localStorage.getItem('eln_token');
            $.ajax({
                type: "GET",
                url: "/api/admin/support/all",
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                success: function (response) {
                    console.log(response);
                    var row = '';
                    $.each(response, function (i, v) {
                        var time4 = v.timeCreate;
                        //var ss =
                        var dateTimeString = moment(time4).format("DD-MM-YYYY ");
                        row+='<tr>';
                        row+='<td class="text-center">'+v.id+'</td>';
                        row+='<td class="text-center">'+$('<div/>', {
                            html: v.namemail
                            // get text content from element for decoded text
                        }).text()+'</td>';
                        row+='<td class="text-center">'+$('<div/>', {
                            html: v.email
                            // get text content from element for decoded text
                        }).text()+'</td>';
                        row+='<td class="text-center">'+$('<div/>', {
                            html: v.contents
                            // get text content from element for decoded text
                        }).text()+'</td>';
                        row+='<td class="text-center">'+dateTimeString+'</td>';
                        row+='<td><button onclick="deleteC('+v.id+')" class="btn btn-danger btn-sm delete "> xóa </button></td>';
                        row+='</tr>'

                    });


                    $('#mailcontact').empty();
                    $('#mailcontact').append(row);
                }
            })
        };

        getmailcontact();
    });

});

function deleteC(id) {
    if (!confirm("Xác nhận xóa ")) {
        throw "Do not delete";
    }
    $.ajax({
        type: "DELETE",
        url: "/api/admin/support/" + id,
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        contentType: "application/json",
        success: function (response) {
            console.log("add success");
            alert('Xóa thành công!');
            console.log(response);
            window.location.href = "/admin/helpdesk/index2";
        },
        error: function (response) {
            console.log("fail");
            alert("Xóa không thành công !");
            console.log(response);
        }
    });

}

