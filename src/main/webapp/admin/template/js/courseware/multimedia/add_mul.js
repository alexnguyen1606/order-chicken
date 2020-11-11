/**
 *
 * @author: Kien Le Trung
 *
 * 4:14 CH
 Tháng 6 02, 2020
 *
 */
var office = {};
jQuery(function ($) {
  $(document).ready(function () {
    // var ytApiKey = "AIzaSyAZhCzCW3XkLsWzR_vj0i9kA-_V7wDNdO0";
    // var videoId = "27rBJxpoWUY";

    // $.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + videoId + "&key=" + ytApiKey, function(data) {
    //   // alert(data.items[0].snippet.title);
    //   console.log(data);
    //   alert(data.items[0].contentDetails.duration);
    // });
    function getMultimedia() {
      var multimediaId = $("#id").val();
      if (multimediaId != null) {
        $.ajax({
          type: "GET",
          url: "/api/admin/courseWare/" + multimediaId,
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
            $("#files").val(response.files);
            $("#type_video").val(response.type_video);
            $("#size").val(response.size);
            $("#originName").val(response.originName);
            $("#old_name_file").html(response.originName);
            $("#size_old").html(response.size);
            $("#duration").val(response.duration);
            $("#old_file_youtube").attr("href",response.files);

            // $('#status').val(response.status);
            // changeApproveAuto();
          },
          error: function (response) {},
        });
      }
    }
    getMultimedia();
  });
});

$("#btnSaveMultimedia").click(function () {
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
  // if ($('#video_file').get(0).files.length === 0) {
  //     alert("File không được để trống")
  //     throw  "s"
  // }\
  if ($("#files").val() == "") {
    alert("Chưa upload file thành công");
    return;
  }
  if (id == "") {
    postMultimedia(data);
  } else {
    putMultimedia(data);
  }
});
function postMultimedia(dataArray) {
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
function putMultimedia(data) {
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
// ----------------------------------------------------------------------------------
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
  );
}
function removeAccentAndSpace(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(" ", "");
  return str;
}
//------------------------------------------------------------------------------------
// $("#mp3_file").on("change", function (e) {
//   var formData = new FormData();
//
//   var fileName = e.target.files[0].name;
//   $("#originName").val(fileName);
//
//   // formData.append("multipartFile", $("#mp3_file")[0].files[0]);
//   // formData.append("name", uuidv4() + "-" + $("#mp3_file")[0].files[0].name);
//   // formData["name"] = removeAccentAndSpace(formData["name"]);
//
//
//
//
//
//   formData.append("multipartFile", $("#mp3_file")[0].files[0]);
//   var name2 = removeAccentAndSpace(
//       uuidv4() + "-" + $("#video_file")[0].files[0].name
//   );
//   var name = name2.replace(/\s+/g, "");
//   formData.append("name", name);
//   var total = [].slice
//     .call(this.files)
//     .map(function (x) {
//       return x.size || x.fileSize;
//     })
//     .reduce(function (a, b) {
//       return a + b;
//     }, 0);
//   if (Math.floor(total / 1024 / 1024) == 0) {
//     $("#total").html("Dung Lượng File: " + Math.floor(total / 1024) + " KB");
//     $("#size").val(Math.floor(total / 1024) + " KB");
//     $("#total2").html("Dung Lượng File: " + Math.floor(total / 1024) + " KB");
//   } else {
//     $("#total").html(
//       "Dung Lượng File: " + Math.floor(total / 1024 / 1024) + " MB"
//     );
//     $("#size").val(Math.floor(total / 1024 / 1024) + " MB");
//     $("#total2").html("Dung Lượng File: " + Math.floor(total / 1024) + " KB");
//   }
//   if (total > 100000000) {
//     alert("Vượt quá 100MB dung lượng cho phép");
//     $("#btnSaveMultimedia").prop("disabled", true);
//     throw "fail";
//   } else {
//     $("#btnSaveMultimedia").prop("disabled", false);
//   }
//   $("#files").val("/e-learning/courseware/video/" + formData["name"]);
//
//   $.ajax({
//     xhr: function () {
//       var myXhr = $.ajaxSettings.xhr();
//       if (myXhr.upload) {
//         myXhr.upload.addEventListener(
//           "progress",
//           function (e) {
//             var percent_loaded = Math.ceil((e.loaded / e.total) * 100);
//             if (percent_loaded == 100) {
//               $("#spin-progress").css("display", "block");
//             }
//             if (percent_loaded < 100) {
//               $("#btnSaveMultimedia").prop("disabled", true);
//             }
//             $("#progress-text1").text(
//               percent_loaded + "% File Upload Thành Công.."
//             );
//             $("#progress").css("width", percent_loaded + "%");
//             if (e.lengthComputable) {
//               $("progress").attr({
//                 value: e.loaded,
//                 max: e.total,
//               });
//             }
//           },
//           false
//         );
//       }
//       return myXhr;
//     },
//     url: "/api/admin/upload/courseware/multimedia/video_file",
//     type: "POST",
//     headers: { Authorization: "Bearer " + localStorage.getItem("eln_token") },
//     enctype: "multipart/form-data",
//     data: formData,
//     processData: false, // Important!
//     contentType: false,
//     cache: false,
//     success: function (result) {
//       // console.log(result);
//       $("#spin-progress").css("display", "none");
//       $("#btnSaveMultimedia").prop("disabled", false);
//       console.log(result);
//       // $('#file-input').attr("src",result);
//       $("#files").val("/e-learning/courseware/video/" + result);
//       $("#mp3_file").val(result);
//       // $('#sizes').val(result);
//     },
//     error: function (jqXHR, textStatus, errorThrown) {
//       $("#spin-progress").css("display", "none");
//       $("#alert").css("display", "block");
//
//       console.log("The following error occured: " + textStatus, errorThrown);
//     },
//   });
// });
$("#mp3_file").on("change", function (e) {

  var formData = new FormData();
  var fileName = e.target.files[0].name;
  $("#originName").val(fileName);

  formData.append("multipartFile", $("#mp3_file")[0].files[0]);
  var name2 = removeAccentAndSpace(
      uuidv4() + "-" + $("#mp3_file")[0].files[0].name
  );

  var name = name2.replace(/\s+/g, "");
  formData.append("name", name);
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
    alert("Vượt quá 1GB dung lượng cho phép");
    $("#progress-text1").text(
        " File vượt quá 1GB dung lượng cho phép"
    );

    $('#progress1').val(0);

    $("#btnSaveMultimedia").prop("disabled", true);
    return;
  } else {
    $("#btnSaveMultimedia").prop("disabled", false);
  }

  $("#files").val("/e-learning/courseware/video/" + name);
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
              if (percent_loaded < 100) {
                $("#btnSaveMultimedia").prop("disabled", true);
              }
              $("#progress-text1").text(
                  percent_loaded + "% File Upload Thành Công.."
              );
              // $('#progress-text2').text(percent_loaded+'% has been uploaded..');
              $("#proress").css("width", percent_loaded + "%");
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
    url: "/api/admin/upload/courseware/multimedia/mp3_file",
    type: "POST",
    headers: { Authorization: "Bearer " + localStorage.getItem("eln_token") },
    enctype: "multipart/form-data",
    data: formData,
    processData: false, // Important!
    contentType: false,
    cache: false,
    beforeSend: function () {
      //  $('.loader').css("display","block");
    },
    success: function (result) {
      $("#spin-progress").css("display", "none");
      $("#btnSaveMultimedia").prop("disabled", false);
      console.log(result);
      // $("#files").val("/e-learning/courseware/video/" + result);
      // $("#video_file").val(result);
      $("#spin-progress-youtube").css("display", "none");
      $("#duration").val(result.duration);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#alert").css("display", "block");
      $("#btnSaveMultimedia").prop("disabled", false);
      $("#spin-progress").css("display", "none");
      // $('#alert').css("display","block");
      console.log("The following error occured: " + textStatus, errorThrown);
    },
  });
});
//----------------------------------------------------------------------------------
$("#video_file").on("change", function (e) {
  var myVideos = [];

  window.URL = window.URL || window.webkitURL;
  document.getElementById('video_file').onchange = setFileInfo;

  function setFileInfo() {
    var files = this.files;
    myVideos.push(files[0]);
    var video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = function() {
      window.URL.revokeObjectURL(video.src);
      var duration = Math.round(video.duration);
      myVideos[myVideos.length - 1].duration = duration;
      updateInfos();
    }

    video.src = URL.createObjectURL(files[0]);;
  }


  function updateInfos() {
    var infos = document.getElementById('duration');
    infos.textContent = "";
    for (var i = 0; i < myVideos.length; i++) {
      // infos.textContent += myVideos[i].name + " duration: " + myVideos[i].duration + '\n';
      // infos.textContent += myVideos[i].duration;
      $("#duration").val(myVideos[i].duration);
      $("#infos").HTML(myVideos[i].duration);
    }
  }
  var formData = new FormData();
  var fileName = e.target.files[0].name;
  $("#originName").val(fileName);

  formData.append("multipartFile", $("#video_file")[0].files[0]);
  var name2 = removeAccentAndSpace(
    uuidv4() + "-" + $("#video_file")[0].files[0].name
  );

  var name = name2.replace(/\s+/g, "");
  formData.append("name", name);
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
    alert("Vượt quá 1GB dung lượng cho phép");
    $("#progress-text1").text(
        " File vượt quá 1GB dung lượng cho phép"
    );

    $('#progress1').val(0);
    $("#btnSaveMultimedia").prop("disabled", true);
    return;
  } else {
    $("#btnSaveMultimedia").prop("disabled", false);
  }

  $("#files").val("/e-learning/courseware/video/" + name);
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
            if (percent_loaded < 100) {
              $("#btnSaveMultimedia").prop("disabled", true);
            }
            $("#progress-text1").text(
              percent_loaded + "% File Upload Thành Công.."
            );
            // $('#progress-text2').text(percent_loaded+'% has been uploaded..');
            $("#proress").css("width", percent_loaded + "%");
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
    url: "/api/admin/upload/courseware/multimedia/video_file",
    type: "POST",
    headers: { Authorization: "Bearer " + localStorage.getItem("eln_token") },
    enctype: "multipart/form-data",
    data: formData,
    processData: false, // Important!
    contentType: false,
    cache: false,
    beforeSend: function () {
      //  $('.loader').css("display","block");
    },
    success: function (result) {
      $("#spin-progress").css("display", "none");
      $("#btnSaveMultimedia").prop("disabled", false);
      console.log(result);
      $("#files").val("/e-learning/courseware/video/" + result);
      $("#video_file").val(result);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#alert").css("display", "block");
      $("#btnSaveMultimedia").prop("disabled", false);
      $("#spin-progress").css("display", "none");
      // $('#alert').css("display","block");
      console.log("The following error occured: " + textStatus, errorThrown);
    },
  });
});
function disableBtn() {
  document.getElementById("btnSaveMultimedia").disabled = true;
  $("#spin-progress-youtube").css("display", "block");
}
function enableBtn() {
  document.getElementById("btnSaveMultimedia").disabled = false;
  $("#spin-progress-youtube").css("display", "none");
}
//---------------------------------------------------------------------------------
$(document).on("change", "#video_link", function () {
  disableBtn();
  var videoLink = $(this).val();
  var url = videoLink;
  var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

  if(videoid != null) {
   console.log("video id = ",videoid[1]);
   var youtubeID = videoid[1];
    var result = "https://www.youtube.com/embed/"+videoid[1];
    console.log(result);
    $("#files").val(result);

    function getTimeVideoYoutube() {
      var ytApiKey = "AIzaSyAZhCzCW3XkLsWzR_vj0i9kA-_V7wDNdO0";
      var videoId = youtubeID;
      var urlAPI = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=" + videoId + "&key=" + ytApiKey;
      var urlAPI2 = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + videoId + "&key=" + ytApiKey;
      $(document).ready(function () {
        disableBtn();
        $.ajax({
          type: 'GET',
          url: urlAPI,
          success: function (data) {
            console.log(data);
            //  alert(data.items[0].contentDetails.duration);
            $("#duration").val(convertISO8601ToSeconds(data.items[0].contentDetails.duration));
            // $("#originName").val(data.items[0]);
          },
          error:function (data) {
            alert("Có lỗi trong quá trình xử lý, vui lòng thử lại");
            $("#spin-progress-youtube").css("display", "none");
            document.getElementById("btnSaveMultimedia").disabled = true;
          }
        });
      });
      $(document).ready(function () {
        disableBtn();
        $.ajax({
          type: 'GET',
          url: urlAPI2,
          success: function (data) {
            console.log(data);
            //  alert(data.items[0].contentDetails.duration);
            // $("#duration").val(convertISO8601ToSeconds(data.items[0].contentDetails.duration));
            $("#originName").val(data.items[0].snippet.title);
          },
          error:function (data) {
            alert("Có lỗi trong quá trình xử lý, vui lòng thử lại");
            $("#spin-progress-youtube").css("display", "none");
            document.getElementById("btnSaveMultimedia").disabled = true;
          }
        });
      });
    }
    getTimeVideoYoutube();
    function convertISO8601ToSeconds(input) {

      var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
      var hours = 0, minutes = 0, seconds = 0, totalseconds;

      if (reptms.test(input)) {
        var matches = reptms.exec(input);
        if (matches[1]) hours = Number(matches[1]);
        if (matches[2]) minutes = Number(matches[2]);
        if (matches[3]) seconds = Number(matches[3]);
        totalseconds = hours * 3600  + minutes * 60 + seconds;
      }
      enableBtn();
      return (totalseconds);

    }
  } else {
    alert("Vui lòng kiểm tra lại định dạng link Youtube");
    $("#btnSaveMultimedia").prop("disabled", true);
    $("#spin-progress-youtube").css("display", "none");

  }
});
$(document).ready(function () {
  $("#video_file").hide();
  $("#schoolContainer")
    .change(function () {
      var val = $(this).val();

      if (val == "video_link") {

        $("#old_file_youtube").show();
        $("#video_link").show();
        $("#type_video").val(2);
        $("#video_link").removeAttr("disabled");
        $("#levi").hide();
        $("#size_old").hide();
        $("#old_name_file").hide();
        $("#textUpload").hide();

        $("#btnSaveMultimedia").prop("disabled", false);

      } else {
        $("#old_file_youtube").hide();
        $("#video_link").hide();
        $("#video_link").attr("disabled", true);
        $("#levi").show();
        $("#size_old").show();
        $("#old_name_file").show();
        $("#textUpload").show();
      }

      if (val == "video_file") {
        $("#video_file").show();
        $("#type_video").val(1);
        $("#video_file").removeAttr("disabled");

      } else {
        $("#video_file").hide();
        $("#video_file").attr("disabled", true);
        // $('#files').attr('disabled',true);
      }

      if (val == "mp3_file") {
        $("#mp3_file").show();
        $("#type_video").val(3);
        $("#mp3_file").removeAttr("disabled");
      } else {
        $("#mp3_file").hide();
        $("#mp3_file").attr("disabled", true);
      }
    })
    .change();
});

var myVideos = [];
window.URL = window.URL || window.webkitURL;
document.getElementById('video_file').onchange = setFileInfo;
function setFileInfo() {
  var files = this.files;
  myVideos.push(files[0]);
  var video = document.createElement('video');
  video.preload = 'metadata';

  video.onloadedmetadata = function() {
    window.URL.revokeObjectURL(video.src);
    var duration = video.duration;
    myVideos[myVideos.length - 1].duration = duration;
    updateInfos();
  }

  video.src = URL.createObjectURL(files[0]);;
}


function updateInfos() {
  var infos = document.getElementById('duration');
  infos.textContent = "";
  for (var i = 0; i < myVideos.length; i++) {
    // infos.textContent += myVideos[i].name + " duration: " + myVideos[i].duration + '\n';
    // infos.textContent += myVideos[i].duration;
    $("#duration").val(myVideos[i].duration);
    $("#infos").HTML(myVideos[i].duration);
  }
}

