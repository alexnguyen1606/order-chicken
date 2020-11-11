/**
 *
 * @author: Kien Le Trung
 *
 * 2:35 CH
 Tháng 5 26, 2020
 *
 */
var multimedia = {};
jQuery(function ($) {
  $(document).ready(function () {
    function getfreeLecture() {
      var freeLectureId = $("#id").val();
      if (freeLectureId != null) {
        $.ajax({
          type: "GET",
          url: "/api/admin/courseWare/" + freeLectureId,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("eln_token"),
          },
          contentType: "application/json",
          beforeSend: function () {
            //  $('.loader').css("display","block");
          },
          success: function (response) {
            multimedia = response;
            console.log(response);
            $("#name").val(response.name);
            $("#shared").val(response.shared);
            $("#status").val(response.status);
            $("#description").val(response.description);
            $("#content").val(response.content);
            // $('#status').val(response.status);
            // changeApproveAuto();
          },
          error: function (response) {},
        });
      }
    }

    getfreeLecture();
  });
});

$("#btnSaveFreeLecture").click(function () {
  var data = {};
  var id = $("#id").val();
  var formEdit = $("#formEdit").serializeArray();
  $.each(formEdit, function (index, v) {
    data["" + v.name + ""] = v.value;
  });
  if (data.name == "") {
    alert("Tên học liệu không được để trống !");
    throw "name partner is null";
  }
  data["content"] = CKEDITOR.instances.content.getData();
  if (data.content == "") {
    alert("Nội dung không được bỏ trống");
    $("#content").focus();
    throw "Content not be null";
  }
  data["description"] = CKEDITOR.instances.description.getData();
  if (data.name == "") {
    alert("Tên danh mục không được để trống !");
    // throw "name partner is null"
  }
  if (id == "") {
    postFreeLecture(data);
  } else {
    putFreeLecture(data);
  }
});

function postFreeLecture(dataArray) {
  $.ajax({
    type: "POST",
    url: "/api/admin/courseWare",
    headers: { Authorization: "Bearer " + localStorage.getItem("eln_token") },
    data: JSON.stringify(dataArray),
    dataType: "JSON",
    contentType: "application/json",
    beforeSend: function () {
      $(".loader").css("display", "block");
      //$('.loader').css("background")
    },
    success: function (response) {
      $(".loader").css("display", "none");
      console.log("Thêm mới thành công");
      alert("Thêm mới thành công");
      console.log(response);
      window.location.href = "/admin/courseware/all";
    },
    error: function (response) {
      console.log("Thêm mới thất bại");
      alert("add fail");
      console.log(response);
    },
  });
}

function putFreeLecture(data) {
  $.ajax({
    type: "PUT",
    url: "/api/admin/courseWare/update",
    data: JSON.stringify(data),
    headers: { Authorization: "Bearer " + localStorage.getItem("eln_token") },
    dataType: "json",
    contentType: "application/json",
    beforeSend: function () {
      $(".loader").css("display", "block");
    },
    success: function (response) {
      console.log("Thêm Thành Công");
      //alert(response.message);
      alert("Cập nhật thành công");
      window.location.href = "/admin/courseware/all";
    },
    error: function (response) {
      console.log("fail");
      alert("cập nhật không thành công");
      $(".loader").css("display", "none");
      console.log(response);
    },
  });
}
