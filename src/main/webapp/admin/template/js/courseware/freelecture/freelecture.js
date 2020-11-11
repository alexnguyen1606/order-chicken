jQuery(function ($) {
  $(document).ready(function () {
    function getFreeLecture() {
      var token = localStorage.getItem("eln_token");
      $.ajax({
        type: "GET",
        url: "/api/admin/courseWare/allFreeLecture",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("eln_token"),
        },
        contentType: "application/json",
        beforeSend: function () {
          $(".loader").css("display", "block");
          if ($("#freelecture-table4 tbody").html() == "") {
            $("#freelecture-table4").DataTable({
              language: {
                paginate: {
                  previous: "Trước",
                  next: "Sau",
                },
              },
              oLanguage: {
                sSearch: "Tìm Kiếm:",
                sPrevious: "Trang Trước",
                sNext: "Trang Tiếp Theo",
                sLast: "Trang Cuối Cùng",
                sEmptyTable: "Không có dữ liệu",
                sInfo: "Hiển thị _TOTAL_ trang  (_START_ Trong tổng số _END_)",
                sInfoEmpty: "Không có mục nào để hiển thị",
                sLengthMenu: "Hiển Thị _MENU_ Dòng",
              },
            });
          } else {
            $("#freelecture-table4").DataTable().clear().draw();
          }
        },
        success: function (response) {
          console.log(response);
          $.each(response, function (i, v) {
            var image_scorm = "";
            var name_scorm = "";
            var status = "";
            var share = "";
            var today = new Date(v.createdDate);
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            var horse = today.getHours();
            var minute = today.getMinutes();
            var second = today.getSeconds();

            /////hinh anh hoc lieu ////
            // if(v.courseWareType.id == 1)
            // {
            //     name_scorm = '';
            // }

            /////////     tinh trang /////////
            if (v.status == 1) {
              status =
                ' <i class="text-success fa fa-circle" style="text-align: center" </i>';
            } else {
              status =
                '<i class="text-warning fa fa-circle" title="Đã khóa"></i>';
            }

            ///// chia se cho don vi khac /////

            if (v.shares == 1) {
              share = "Được chia sẻ cho đơn vị khác";
            } else {
              share = "Dùng cho nội bộ";
            }

            var poscodeee = "";
            if (v.poscodeName == null) {
              poscodeee = "Học liệu thuộc tổng công ty";
            } else {
              poscodeee = v.poscodeName;
            }

            $("#freelecture-table4")
              .DataTable()
              .row.add([
                i + 1,
                status,
                v.name +
                  "<br><small>" +
                  share +
                  "</small>" +
                  // + '<p class="info_text text-info"><i class="fa fa-building-o icon"></i><small>' + v.poscodeVnpost.name + '</small></p>'
                  // + '<p class="info_text text-info"><i class="fa fa-building-o icon"></i><small>' + '"ds"' + '</small></p>'
                  // , v.courseWareType.name + '<br>' + '<img class="img" src="' + v.courseWareType.images + '" />'
                  '<p class="info_text text-info"><i class="fa fa-building-o icon"></i><small>' +
                  poscodeee +
                  "</small></p>",
                v.courseWareType.name +
                  "<br>" +
                  '<img  style="height: 50px ;width: 50px" src="' +
                  v.courseWareType.images +
                  '"/>',
                "Nội Dung Học Liệu: " +
                  '<div class="max-lines"> ' +
                  v.content +
                  " " +
                  "..." +
                  " </div>" +
                  "<br><small>Ngày Tạo : " +
                  mm +
                  "-" +
                  dd +
                  "-" +
                  yyyy +
                  " & " +
                  horse +
                  ":" +
                  minute +
                  ":" +
                  second +
                  "</small>" +
                  "<br><small>Người Tạo: " +
                  v.createdBy +
                  "  </small>",
                v.description,
                '<a class="btn btn-info btn-sm" href="/admin/courseware/freelectures/edit/' +
                  v.id +
                  '"> <i class="fas fa-pencil-alt"> </i>sửa </a>' +
                  '  <button onclick="deleteCourse_Ware(' +
                  v.id +
                  ')" class="btn btn-danger btn-sm delete "> xóa </button>' +
                  '<button  class="btn btn-warning btn-sm info coursewareDetail"  data-id="' +
                  v.id +
                  '" data-toggle="modal" data-target="#exampleModal">' +
                  ' <i class="fa fa-info-circle "> Chi tiết' +
                  "</button>",
              ])
              .draw()
              .node();
          });
          $(".loader").css("display", "none");
        },
        error: function (res) {
          console.log("fail");
          $(".loader").css("display", "none");
          //
        },
      });
    }
    $(document).on("click", ".coursewareDetail", function () {
      var id = $(this).attr("data-id");
      getCourseWareID(id);
    });

    function getCourseWareID(id) {
      $.ajax({
        type: "GET",
        url: "/api/admin/courseWare/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("eln_token"),
        },
        contentType: "application/json",
        beforeSend: function () {
          $(".loader-modal").css("display", "block");
          $("#coursewareDetail").empty();
          $("#name_detail").empty();
        },
        success: function (response) {
          $("#coursewareDetail").empty();
          ///scorm
          if (response.courseWareType.id == 1) {
            name_detail = response.name;
            main_contain =
              '<div class="col-md-12"><iframe class="col-md-12 position-absolute" style="height: 100%" src="' +
              response.files +
              '" ></iframe></div>';
          } else if (response.courseWareType.id == 3) {
            ////tai lieu tu do
            name_detail = response.name;
            main_contain = response.content;
          } else if (response.courseWareType.id == 4) {
            // office
            main_contain =
              '<iframe width="100%" height="100%" src="' +
              response.files +
              '"</iframe>';
          } else if (
            response.courseWareType.id == 5 &&
            response.type_video == 1
          ) {
            main_contain =
              '<video width="100%" height="100%" controls><source src="' +
              response.files +
              '" type="video/mp4"></video>';
          } else if (
            response.courseWareType.id == 5 &&
            response.type_video == 2
          ) {
            name_detail = response.name;
            main_contain =
              '<iframe width="100%" height="100%"  src="' +
              response.files +
              '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
          } else if (
            response.courseWareType.id == 5 &&
            response.type_video == 3
          ) {
            name_detail = response.name;
            main_contain =
              '<audio src="' + response.files + '" preload controls></audio>';
          }

          $("#coursewareDetail").append(main_contain);

          $(".loader-modal").css("display", "none");
          $("#name_detail").append(name_detail);
        },
        error: function (response) {
          $(".loader-modal").css("display", "none");
        },
      });
    }

    getFreeLecture();
  });
});

function deleteCourse_Ware(id) {
  if (!confirm("Xác nhận xóa tài liệu")) {
  }
  $.ajax({
    type: "DELETE",
    url: "/api/admin/courseWare/" + id,
    headers: { Authorization: "Bearer " + localStorage.getItem("eln_token") },
    contentType: "application/json",
    success: function (response) {
      console.log("add success");
      alert("Xóa thành công!");
      console.log(response);
      window.location.href = "/admin/courseware/freelectures/index";
    },
    error: function (response) {
      console.log("fail");
      alert("Xóa không thành công !");
      console.log(response);
    },
  });
}
