/**
 *
 * @author: Kien Le Trung
 *
 * 11:04 SA
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
            $("#file_download").val(response.file_download);
            $("#size").val(response.size);
            $("#originName").val(response.originName);
            $("#old_name_file").html(response.originName);
            $("#size_old").html(response.size);
            $("#duration").html(response.duration);
            $("#idFileScorm").html(response.idFileScorm);
            $("#totalQuitz").html(response.totalQuitz);
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

$("#btnSaveScorm").click(function () {
  var data = {};
  var id = $("#id").val();
  var formEdit = $("#formEdit").serializeArray();
  $.each(formEdit, function (index, v) {
    data["" + v.name + ""] = v.value;
  });
  data["description"] = CKEDITOR.instances.description.getData();
  if (data.name == "") {
    alert("Tên học liệu không được để trống !");

    // throw "name partner is null"
  }
  if (id == "") {
    if ($("#file-input").get(0).files.length === 0) {
      alert("File không được để trống");
      $("#btnSaveScorm").prop("disabled", true);
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
  $("#btnSaveScorm").prop("disabled", true);

  formData.append("multipartFile", $("#file-input")[0].files[0]);

  var fileName = e.target.files[0].name;
  $("#originName").val(fileName);

  console.log(fileName);
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
  if (total > 1000000000) {
    alert("Vượt quá 1GB dung lượng cho phép ");
    $("#progress-text1").text(
        " File vượt quá 1GB dung lượng cho phép"
    );
    $('#progress1').val(0);
    $("#btnSaveDocument").prop("disabled", true);

    return;
  }
  // else {
  //     $('#btnSaveScorm').prop("disabled", false);
  // }
  // if ($('#files').val() == "") {
  //     alert('Xin vui lòng chọn file..');
  //     $('#btnSaveScorm').prop("disabled", true);
  //     return;
  // }

  $.ajax({
    xhr: function () {
      var myXhr = $.ajaxSettings.xhr();
      if (myXhr.upload) {
        myXhr.upload.addEventListener(
          "progress",
          function (e) {
            var percent_loaded = Math.ceil((e.loaded / e.total) * 100);
            // console.log(percent_loaded);
            if ((percent_loaded = 100)) {
              $("#spin-progress").css("display", "block");
            }
            if (percent_loaded < 100) {
              $("#btnSaveScorm").prop("disabled", true);
            }
            console.log(percent_loaded);
            $("#progress-text1").text(
              percent_loaded + "% File Upload Thành Công.."
            );
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
    url: "/api/admin/upload/courseware/scorm",
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
      $("#files").val(result.src);
      $("#duration").val(result.totalFileSlide);
      $("#idFileScorm").val(result.idFileScorm);
      $("#totalQuitz").val(result.totalFileQuitz);


      $("#file_download").val(fileName);
      $("#btnSaveScorm").prop("disabled", false);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#btnSaveScorm").prop("disabled", false);
      $("#spin-progress").css("display", "none");
      console.log("The following error occured: " + textStatus, errorThrown);
    },
  });
});
// $(function () {
//     $('#file-input').on('change', function () {
//         var total = [].slice.call(this.files).map(function (x) {
//             return x.size || x.fileSize;
//         }).reduce(function (a, b) {
//             return (a + b);
//         }, 0);
//
//         if (total > 100000000) {
//             alert('Vượt quá dung lượng cho phép');
//             $('#btnSaveDocument').prop("disabled", true);
//         } else {
//             $('#btnSaveDocument').prop("disabled", false);
//         }
//
//         if (Math.floor(total / 1024 / 1024) == 0) {
//             $('#total').html('Dung Lượng File: ' + Math.floor(total / 1024) + ' KB');
//             $('#sizes').html('Dung Lượng File: ' + Math.floor(total / 1024) + ' KB');
//             $('#total2').html('Dung Lượng File: ' + Math.floor(total / 1024) + ' KB');
//         } else {
//             $('#total').html('Dung Lượng File: ' + Math.floor(total / 1024 / 1024) + ' MB');
//             $('#sizes').html('Dung Lượng File: ' + Math.floor(total / 1024 / 1024) + ' MB');
//             $('#total2').html('Dung Lượng File: ' + Math.floor(total / 1024) + ' KB');
//         }
//
//     })
// })
