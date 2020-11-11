/**
 *
 * @author: Kien Le Trung
 *
 * 9:11 SA
 Tháng 6 02, 2020
 *
 */

var office = {};
jQuery(function ($) {
  $(document).ready(function () {
    function getOffice() {
      var officeId = $("#id").val();
      if (officeId != null) {
        $.ajax({
          type: "GET",
          url: "/api/admin/courseWare/" + officeId,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("eln_token"),
          },
          contentType: "application/json",
          beforeSend: function () {
            //  $('.loader').css("display","block");
          },
          success: function (response) {
            freelecture = response;
            console.log(response);
            $("#name").val(response.name);
            $("#shared").val(response.shared);
            $("#status").val(response.status);
            $("#description").val(response.description);
            $("#content").val(response.content);
            $("#files").val(response.files);
            $("#size").val(response.size);
            $("#originName").val(response.originName);
            $("#old_name_file").html(response.originName);
            $("#size_old").html(response.size);
            // $('#status').val(response.status);
            // changeApproveAuto();
          },
          error: function (response) {},
        });
      }
    }

    getOffice();
  });
});

$("#btnSaveOffice").click(function () {
  var data = {};
  var id = $("#id").val();
  var formEdit = $("#formEdit").serializeArray();
  $.each(formEdit, function (index, v) {
    data["" + v.name + ""] = v.value;
  });
  data["description"] = CKEDITOR.instances.description.getData();
  if (data.name == "") {
    alert("Tên học liệu không được để trống !");
    throw "name partner is null";
  }
  // if(data.files == "")
  // {
  //     alert("Chưa upload file học liệu")
  //     throw "file học liệu null"
  // }
  if ($("#files").val() == "") {
    alert("Chưa upload file thành công");
    return;
  }
  if (id == "") {
    if ($("#file-input").get(0).files.length === 0) {
      alert("File không được để trống");
      $("#btnSaveOffice").prop("disabled", true);
      throw "s";
    }
    postOffice(data);
  } else {
    putOffice(data);
  }
});

function postOffice(dataArray) {
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

function putOffice(data) {
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

$("#file-input").on("change", function (e) {
  var formData = new FormData();
  $("#btnSaveOffice").prop("disabled", true);
  formData.append("multipartFile", $("#file-input")[0].files[0]);

  var fileName = e.target.files[0].name;
  $("#originName").val(fileName);

  var total = [].slice
    .call(this.files)
    .map(function (x) {
      return x.size || x.fileSize;
    })
    .reduce(function (a, b) {
      return a + b;
    }, 0);
  if (Math.floor(total / 1024 / 1024) == 0) {
    $("#total").html("Dung Lượng File: " + Math.floor(total / 1024) + " KB");
    $("#size").val(Math.floor(total / 1024) + " KB");
    $("#total2").html("Dung Lượng File: " + Math.floor(total / 1024) + " KB");
  } else {
    $("#total").html(
      "Dung Lượng File: " + Math.floor(total / 1024 / 1024) + " MB"
    );
    $("#size").val(Math.floor(total / 1024 / 1024) + " MB");
    $("#total2").html("Dung Lượng File: " + Math.floor(total / 1024) + " KB");
  }
  if (total > 50000000) {
    alert("Vượt quá dung lượng cho phép");
    $("#progress-text1").text(
        " File vượt quá 1GB dung lượng cho phép"
    );

    $('#progress1').val(0);
    $("#btnSaveOffice").prop("disabled", true);
    throw "fail";
  } else {
    $("#btnSaveOffice").prop("disabled", false);
  }
  $.ajax({
    xhr: function () {
      var myXhr = $.ajaxSettings.xhr();
      if (myXhr.upload) {
        myXhr.upload.addEventListener(
          "progress",
          function (e) {
            var percent_loaded = Math.ceil((e.loaded / e.total) * 100);
            if (percent_loaded == 100) {
              $("#spin-progress").css("display", "block");
            }
            $("#progress-text1").text(
              percent_loaded + "% File Upload Thành Công.."
            );
            // $('#progress-text2').text(percent_loaded+'% has been uploaded..');
            $("#progress").css("width", percent_loaded + "%");
            if (e.lengthComputable) {
              $("progress").attr({
                value: e.loaded,
                max: e.total,
              });
            }
          },
          false
        );
      }
      return myXhr;
    },
    url: "/api/admin/upload/courseware/office",
    type: "POST",
    headers: { Authorization: "Bearer " + localStorage.getItem("eln_token") },
    enctype: "multipart/form-data",
    data: formData,
    processData: false, // Important!
    contentType: false,
    cache: false,
    success: function (result) {
      $("#spin-progress").css("display", "none");
      console.log(result);
      $("#files").val(result);
      $("#btnSaveOffice").prop("disabled", false);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#btnSaveOffice").prop("disabled", false);
      $("#spin-progress").css("display", "none");
      console.log("The following error occured: " + textStatus, errorThrown);
    },
  });
});
// $(function () {
//   $("#file-input").on("change", function () {
//     var total = [].slice
//       .call(this.files)
//       .map(function (x) {
//         return x.size || x.fileSize;
//       })
//       .reduce(function (a, b) {
//         return a + b;
//       }, 0);
//
//     if (total > 100000000) {
//       alert("Vượt quá 100MB dung lượng cho phép");
//       $("#btnSaveOffice").prop("disabled", true);
//     } else {
//       $("#btnSaveOffice").prop("disabled", false);
//     }
//
//     if (Math.floor(total / 1024 / 1024) == 0) {
//       $("#total").html("Dung Lượng File: " + Math.floor(total / 1024) + " KB");
//       $("#sizes").html("Dung Lượng File: " + Math.floor(total / 1024) + " KB");
//       $("#total2").html("Dung Lượng File: " + Math.floor(total / 1024) + " KB");
//     } else {
//       $("#total").html(
//         "Dung Lượng File: " + Math.floor(total / 1024 / 1024) + " MB"
//       );
//       $("#sizes").html(
//         "Dung Lượng File: " + Math.floor(total / 1024 / 1024) + " MB"
//       );
//       $("#total2").html("Dung Lượng File: " + Math.floor(total / 1024) + " KB");
//     }
//   });
// });
