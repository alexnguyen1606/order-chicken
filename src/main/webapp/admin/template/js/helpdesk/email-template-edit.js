/**
 *
 * @author: Kien Le Trung
 *
 * 09:04 SA
 Tháng 10 26, 2020
 *
 */
jQuery(function ($) {
    $(document).ready(function () {
        var emailTemplateId = $("#id").val();
        if (emailTemplateId != null) {
            $.ajax({
                type: "GET",
                url: "/api/admin/helpdesk/email-template/" + emailTemplateId,
                headers: {Authorization: "Bearer" + localStorage.getItem("eln_token")},
                beforeSend: function () {
                    $(".loader").css("display", "block");
                },
                success: function (response) {
                    $("#code").val(response.code);
                    $("#name").val(response.name);
                    $("#subjects").val(response.subjects);
                    $("#content").val(response.content);
                    $(".loader").css("display", "none");

                },
                error: function (response) {
                    console.log(response.message);
                    $(".loader").css("display", "none");
                }
            })
        }
    })

});


$("#btnSaveEmailTemplate").click(function () {
    var data = {};
    var id = $("#id").val();
    var formEdit = $("#formEdit").serializeArray();

    $.each(formEdit, function (index, v) {
        data["" + v.name + ""] = v.value;
    })
    data["content"] = CKEDITOR.instances.content.getData();
    if (id == null || id == "") {
        postEmailTemplate(data);
    } else {
        putEmailTemplate(data);
    }

});

function postEmailTemplate(dataArray) {
    $.ajax({
        type: "POST",
        url: "/api/admin/helpdesk/email-template/create",
        headers: {Authorization: "Bearer" + localStorage.getItem("eln_token")},
        data: JSON.stringify(dataArray),
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: function () {
            $(".loader").css("display", "block");
        },
        success: function (response) {
            $(".loader").css("display", "none");
            alert(response.message);
            console.log(response);
            window.location.href = "/admin/helpdesk/email-template/";
        },
        error: function (response) {
            $(".loader").css("display", "none");
            console.log(response);
            alert(response.responseJSON.message);

        }
    })
};

function putEmailTemplate(dataArray) {
    $.ajax({
        type: "PUT",
        url: "/api/admin/helpdesk/email-template/update",
        headers: {Authorization: "Bearer" + localStorage.getItem("eln_token")},
        data: JSON.stringify(dataArray),
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: function () {
            $(".loader").css("display", "block");
        },
        success: function (response) {
            $(".loader").css("display", "none");
            alert(response.message);
            window.location.href = "/admin/helpdesk/email-template";

        },
        error: function (response) {
            $(".loader").css("display", "none");
            alert(response.responseJSON.message);
            console.log(response);
        }
    })
};
