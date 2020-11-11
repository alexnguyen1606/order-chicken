/**
 *
 * @author: Kien Le Trung
 *
 * 01:26 SA
 23 Tháng 04, 2020
 *
 */
var totalPages = null;
var currentPages = 1;
jQuery(function($) {
  $(document).ready(function() {
    $("#search").on("submit", function(e) {
      e.preventDefault();
      getCourseWareList("");
    });

    function getCourseWareList(url) {
      if (url == null || url == "") {
        url = "/api/admin/courseWare/all";
      }
      var data = getData();
      $.ajax({
        type: "POST",
        url: url,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("eln_token"),
        },
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function() {
          $(".loader").css("display", "block");
          $("#pagination-test").empty();
          $("#pagination-test").removeData("twbs-pagination");
          $("#pagination-test").unbind("page");
        },
        success: function(serviceResult) {
          totalPages = serviceResult.totalPages;
          currentPages = serviceResult.currentPage;
          loadCourseWareList(serviceResult.data);
          if (serviceResult.totalPage > 0) {
            paging(serviceResult.totalPage, serviceResult.currentPage);
          }

          $(".loader").css("display", "none");
        },
        error: function() {
          $(".loader").css("display", "none");
        },
      });
    }

    function getData() {
      var data = {};
      var formData = $("#search").serializeArray();
      $.each(formData, function(i, v) {
        data[v.name] = v.value;
      });
      return data;
    }

    function loadCourseWareList(data) {
      var row = "";
      $.each(data, function(i, v) {
        var status = "";
        var share = "";
        var today = new Date(v.createdDate);
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var horse = today.getHours();
        var minute = today.getMinutes();
        var second = today.getSeconds();
        var edit = "";

        var noidunghoclieu = "";
        ////noi dung hoc lieu///
        if (v.files == null) {
          noidunghoclieu =
              '<div class="max-lines"> ' + v.content + " " + "..." + " </div>";
        } else if (
            v.type_video == null &&
            v.files != null &&
            v.courseWareType.id == 4
        ) {
          var name_file = v.files;
          office22 = name_file.replace(
              "https://view.officeapps.live.com/op/embed.aspx?src=http://elearning-uat.vnpost.vn/admin/download/courseware?name=",
              ""
          );
          noidunghoclieu =
              'Tên File : <a href="/admin/download/courseware?name=' +
              office22 +
              '">' +
              v.originName +
              " </a> " +
              '<a class="badge badge-warning">' +
              v.size +
              "</a>";
        } else if (
            v.type_video == null &&
            v.files != null &&
            v.courseWareType.id == 1
        ) {
          noidunghoclieu =
              'Tên File : <a href="/admin/download/courseware?name=' +
              v.files +
              '">' +
              v.originName +
              " </a> " +
              '<a class="badge badge-warning">' +
              v.size +
              "</a>";
        } else if (v.type_video == 1 && v.files != null) {
          noidunghoclieu =
              v.originName+
              '<br><a>Dung lượng : </a> <a class="badge badge-warning">' +
              v.size +
              "</a>";
        } else if (v.type_video == 2 && v.files != null) {
          noidunghoclieu =
              v.originName;
        } else if (v.type_video == 3 && v.files != null) {
          noidunghoclieu =
              v.originName
              '<a class="badge badge-warning">' +
              v.size +
              "</a>";
        }

        /// sua ////
        if (v.courseWareType.id == 1) {
          edit =
              '<a class="btn btn-info btn-sm" href="/admin/courseware/scorm/edit/' +
              v.id +
              '"> <i class="fas fa-pencil-alt"> </i>Sửa </a>';
        } else if (v.courseWareType.id == 3) {
          edit =
              '<a class="btn btn-info btn-sm" href="/admin/courseware/freelectures/edit/' +
              v.id +
              '"> <i class="fas fa-pencil-alt"> </i>Sửa </a>';
        } else if (v.courseWareType.id == 4) {
          edit =
              '<a class="btn btn-info btn-sm" href="/admin/courseware/powerpoint/edit/' +
              v.id +
              '"> <i class="fas fa-pencil-alt"> </i>Sửa </a>';
        } else if (v.courseWareType.id == 5) {
          edit =
              '<a class="btn btn-info btn-sm" href="/admin/courseware/video/edit/' +
              v.id +
              '"> <i class="fas fa-pencil-alt"> </i>Sửa </a>';
        }
        // else if(v.courseWareType.id ==  5 )
        // {
        //     edit == '" +ds+"';
        // }

        /////////     tinh trang /////////
        if (v.status == 1) {
          status =
              ' <i class="text-success fa fa-circle" style="text-align: center" </i>';
        } else {
          status = '<i class="text-warning fa fa-circle" title="Đã khóa"></i>';
        }

        ///// chia se cho don vi khac /////

        if (v.shared == 1) {
          share = "Được chia sẻ cho đơn vị khác";
        } else {
          share = "Dùng cho nội bộ";
        }
        var poscodeee = "";
        if (v.poscodeName == null) {
          poscodeee = "Tài liệu thuộc tổng công ty";
        } else {
          poscodeee = v.poscodeName;
        }
        //// don vi///
        var poscodeee = "";
        if (v.poscodeName == null) {
          poscodeee = "Học liệu thuộc tổng công ty";
        } else {
          poscodeee = v.poscodeName;
        }

        row += '<tr id="question_' + v.id + '">';
        row += '<td width="10px">' + (i + 1) + "</td>";
        row += '<td style="text-align: center">' + status + "</td>";
        row += '<td style="text-align: left"> ' + v.name + " <br>" + " <small>" + share + "</small> " + '<p class="info_text text-info"><i class="fa fa-building-o icon"></i><small>' + poscodeee + "</small></p> </td>";
        row += '<td style="text-align: center"> ' + v.courseWareType.name + ' <br> <img  style="height: 50px ;width: 50px" src="' + v.courseWareType.images + '"/>  </td>';
        row += "<td>" + v.description + "</td>";
        row += "<td>" + noidunghoclieu + " <br>" + " <small>Ngày Tạo : " + mm + "-" + dd + "-" + yyyy + " & " + horse + ":" + minute + ":" + second + "</small> <br>" + "<small>Người Tạo: " + v.createdBy + "  </small> </td>";
        row += "<td>" + edit + " " + '<button onclick="deleteCourse_War2e(' + v.id + ')" class="btn btn-danger btn-sm delete "><i class="fa fa-trash "> </i> Xóa </button>' + '<button  class="btn btn-warning btn-sm info coursewareDetail"  data-id="' + v.id + '" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-info-circle "></i> Chi tiết </button>  </td>';
        row += "</tr>";
      });
      $("#listCourseWare").empty();
      $("#listCourseWare").append(row);
    }

    function paging(totalPages, currentPage) {
      $("#pagination-test").twbsPagination({
        totalPages: totalPages,
        startPage: currentPage,
        visiblePages: 10,
        last: "Cuối cùng",
        next: "Tiếp theo",
        first: "Đầu tiên",
        prev: "Phía trước",
        onPageClick: function(event, page) {
          if (currentPages != page) {
            var url = "/api/admin/courseWare/all";
            url += "?page=" + page;
            getCourseWareList(url);
          }
        },
      });
    }

    $("#btnSearch").click(function() {
      getCourseWareList("");
    });
    $("#search").on("submit", function(e) {
      e.preventDefault();
      getCourseWareList("");
    });
    getCourseWareList("");
    $("#status").change(function() {
      getCourseWareList("");
    });
    getCourseWareList("");
    $("#typeCourseWareCode").change(function() {
      getCourseWareList("");
    });
    getCourseWareList();
  });


  $(document).on("click", ".coursewareDetail", function() {
    var id = $(this).attr("data-id");
    getCourseWareID(id);
  });

  function getCourseWareID(id) {
    $.ajax({
      type: "GET",
      url: "/api/admin/courseWare/" + id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("eln_token")
      },
      contentType: "application/json",
      beforeSend: function() {
        $(".loader-modal").css("display", "block");
        $("#coursewareDetail").empty();
        $("#name_detail").empty();
      },
      success: function(response) {
        $("#coursewareDetail").empty();
        ///scorm
        if (response.courseWareType.id == 1) {
          // scrom
          $("#exampleModal").addClass("scrom");
          // $('#coursewareDetail').addClass('paging');
          name_detail = response.name;
          main_contain =
              '<div class="w-100" style="height:100%"><iframe class="col-md-12 position-absolute" style="height: 100%" src="' +
              response.files +
              '" ></iframe></div>';
          //'<div class="col-md-12"><iframe class="col-md-12 position-absolute" style="height: 100%" src="' + response.files + '" ></iframe></div>';
        } else if (response.courseWareType.id == 3) {
          ////tai lieu tu do
          name_detail = response.name;
          main_contain = response.content;
        } else if (response.courseWareType.id == 4) {
          // office
          name_detail = response.name;
          var responsefile = response.files;
          var filess =
              "https://view.officeapps.live.com/op/embed.aspx?src=https://study.vnpost.vn" +
              responsefile;
          main_contain =
              '<iframe width="100%" height="100%" src="' + filess + '"</iframe>';
        } else if (
            response.courseWareType.id == 5 &&
            response.type_video == 1
        ) {
          name_detail = response.name;
          main_contain =
              '<video width="50' +
              '%"    controls><source src="' +
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
              '<audio width="100%" height="50" src="' + response.files + '" preload controls></audio>';
        }

        $("#coursewareDetail").append(main_contain);

        $(".loader-modal").css("display", "none");
        $("#name_detail").append(name_detail);
      },
      error: function(response) {
        $(".loader-modal").css("display", "none");
      },
    });
  }
});

function deleteCourse_War2e(id) {
  if (!confirm("Xác nhận xóa tài liệu")) {
    throw "Do not delete";
  }
  $.ajax({
    type: "DELETE",
    url: "/api/admin/courseWare/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("eln_token")
    },
    contentType: "application/json",
    success: function(response) {
      console.log("add success");
      alert("Xóa thành công!");
      console.log(response);
      window.location.href = "/admin/courseware/all";
    },
    error: function(response) {
      console.log("fail");
      alert("Học liệu đang được sử dụng !");
      console.log(response);
    },
  });
}