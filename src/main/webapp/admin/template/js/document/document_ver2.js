var totalPages = null;
var currentPages = 1;
jQuery(function ($) {
  $(document).ready(function () {
    $("#search").on("submit", function (e) {
      e.preventDefault();
      getDocumentList("");
    });

    function getDocumentList(url) {
      if (url == null || url == "") {
        url = "/api/admin/document/allDocument";
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
        beforeSend: function () {
          $(".loader").css("display", "block");
          $("#pagination-test").empty();
          $("#pagination-test").removeData("twbs-pagination");
          $("#pagination-test").unbind("page");
        },
        success: function (serviceResult) {
       //   totalPages = serviceResult.totalPages;
       //   currentPages = serviceResult.currentPage;
          loadDocumentList(serviceResult.data);
          if (serviceResult.totalPage > 0) {
            paging(serviceResult.totalPage, serviceResult.currentPage);
          }

          $(".loader").css("display", "none");
        },
        error: function () {
          $(".loader").css("display", "none");
        },
      });
    }

    function getData() {
      var data = {};
      var formData = $("#search").serializeArray();
      $.each(formData, function (i, v) {
        data[v.name] = v.value;
      });
      return data;
    }

    function loadDocumentList(data) {
      var row = "";
      $.each(data, function (i, v) {
        var status = "";
        var idPrioritize = "";
        var idLimit = "";
        var share = "";
        var today = new Date(v.timeCreate);
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var horse = today.getHours();
        var minute = today.getMinutes();
        // var second = today.getSeconds();
        /////////     tinh trang /////////
        if (v.status == 1) {
          status = ' <i class="text-success fa fa-circle" </i>';
        } else {
          status = '<i class="text-warning fa fa-circle" title="???? kh??a"></i>';
        }

        ///time modifiedDate
        // if (v.lastUpdate != null) {
        //     modifiedDate = v.lastUpdate;
        // }

        //////////   muc do uu tien //////////
        if (v.idPrioritize == 1) {
          idPrioritize = "Cao";
        } else if (v.idPrioritize == 2) {
          idPrioritize = "Trung B??nh";
        } else {
          idPrioritize = "Th???p";
        }

        /////////   gioi han khoa hoc /////////
        if (v.idLimit == 1) {
          idLimit = "Ri??ng cho c??c h???c li???u,kh??a h???c";
        } else if (v.idLimit == 2) {
          idLimit = "Ch??? c?? th??? xem sau khi ????ng nh???p";
        } else if (v.idLimit == 3) {
          idLimit = "M???i ng?????i ?????u c?? th??? xem";
        } else {
          idLimit = "";
        }
        ///link file ///
        var linkkk = "";
        var linkk_final = "";
        linkkk = v.linkFile;
        // linkk_final = linkkk.slice(36);

        ///// chia se cho don vi khac /////

        if (v.shares == 1) {
          share = "???????c chia s??? cho ????n v??? kh??c";
        } else {
          share = "D??ng cho n???i b???";
        }

        //// don vi///
        var poscodeee = "";
        if (v.poscodeName == null) {
          poscodeee = "T??i li???u thu???c t???ng c??ng ty";
        } else {
          poscodeee = v.poscodeName;
        }
        ///////////////// show button detail
        // var button_detail = '';
        // var type_file2 = v.linkFile;
        // if (type_file2.indexOf('.zip') != -1 | type_file2.indexOf('.rar') != -1) {
        //     // button_detail = '  <button <a href="/admin/download/document?name=' + v.linkFile + '" > Chi ti???t </a></button>';
        //     button_detail = '<a href="/admin/download/document?name=' + v.linkFile + '" class="btn btn-warning btn-sm info coursewareDetail">Chi ti???t</a>';
        //
        // } else {
        //     button_detail = '<button  class="btn btn-warning btn-sm info coursewareDetail"  data-id="' + v.id + '" data-toggle="modal" data-target="#exampleModal"> Chi ti???t </button>';
        // }

        var alloweddownload_Button = "";
        if (v.allowedDownload == 1) {
          alloweddownload_Button =
            '<a href="' +
            v.linkFile +
            '" class="btn btn-info bg-gradient-success btn-sm">T???i v???</a>';
        } else {
          alloweddownload_Button =
            '<a href="#" class="btn btn-info bg-gradient-success btn-sm disabled">T???i v???</a>';
        }

        var alloweddownload = "";
        if (v.allowedDownload == 1) {
          alloweddownload = "<small>  File c?? quy???n t???i xu???ng </small>  ";
        } else {
          alloweddownload = "<small> File Kh??ng c?? quy???n t???i xu???ng </small> ";
        }

        row += '<tr id="question_' + v.id + '">';
        row += '<td width="10px">' + (i + 1) + "</td>";
        row += "<td>" + status + "</td>";
        row +=
          "<td>" +
          v.name +
          " " +
          "<br><small>" +
          v.nameDocumentCategory +
          "</small> " +
          "<br><small>" +
          share +
          "</small> " +
          ' <p class="info_text text-info"><i class="fa fa-building-o icon"></i><small>' +
          poscodeee +
          "</small></p> </td>";
        row +=
          "<td> T??n file : <a>" +
          v.originName +
          ' </a> <a class="badge badge-warning">' +
          v.sizes +
          "</a> " +
          "<br>" +
          alloweddownload +
          "" +
          " <br> <small> Ng??y T???o </small>:" +
          "<small> " +
          v.createdDate +
          " </small>" +
          "<br><small> Ng??y C???p Nh???t </small>:" +
          "<small> " +
          v.modifiedDate +
          " </small>" +
          "<br><small>Ng?????i T???o: " +
          v.createdBy +
          "  </small> </td>";
        row += "<td> " +'<div class="max-lines">' + v.describes + "..."+ '</div>'+ "</td>";
        // row += "<td>" + idPrioritize + "</td>";
        row += "<td>" + idLimit + "</td>";
        // row += '<td> <a class="btn btn-info btn-sm" href="/admin/document/category/edit/' + v.id + '">s???a </a>' +
        //     ' <button onclick="deleteDocument(' + v.id + ')" class="btn btn-danger btn-sm delete "> x??a </button> ' +
        //     '+button_detail+ ' </td>';
        row +=
          '<td> <a class="btn btn-info btn-sm" href="/admin/document/category/edit/' +
          v.id +
          '">S???a </a> ' +
          ' <button onclick="deleteDocument(' +
          v.id +
          ')" class="btn btn-danger btn-sm delete "> X??a </button>' +
          ' <button  class="btn btn-warning btn-sm info coursewareDetail"  data-id="' +
          v.id +
          '" data-toggle="modal" data-target="#exampleModal">  Chi ti???t </button>' +
          " " +
          alloweddownload_Button +
          " </td> ";

        row += "</td>";
        row += "</tr>";
      });
      $("#listDocument").empty();
      $("#listDocument").append(row);
    }

    function paging(totalPages, currentPage) {
      $("#pagination-test").twbsPagination({
        totalPages: totalPages,
        startPage: currentPage,
        visiblePages: 10,
        last: "Cu???i c??ng",
        next: "Ti???p theo",
        first: "?????u ti??n",
        prev: "Ph??a tr?????c",
        onPageClick: function (event, page) {
          if (currentPages != page) {
            var url = "/api/admin/document/allDocument";
            url += "?page=" + page;
            getDocumentList(url);
          }
        },
      });
    }

    function getDocumentCategory() {
      $.ajax({
        type: "GET",
        url: "/api/admin/document-category/all",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("eln_token"),
        },
        contentType: "application/json",
        beforeSend: function () {
          //  $('.loader').css("display","block");
        },
        success: function (response) {
          var row = "";
          $.each(response, function (i, v) {
            row += '<option ';
            // if (v.id == document.idDocumentCategory) {
            //   row += 'selected="selected" ';
            // }
            row += 'value="' + v.id + '" >';
            row += v.nameDocument + "</option>";
          });
          $("#idDocumentCategory").append(row);
        },
        error: function (response) {},
      });
    }

    $("#btnSearch").click(function () {
      getDocumentList("");
    });
    $("#search").on("submit", function (e) {
      e.preventDefault();
      getDocumentList("");
    });
    getDocumentList("");
    $("#status").change(function () {
      getDocumentList("");
    });
    getDocumentList("");
    $("#allowedDownload").change(function () {
      getDocumentList("");
    });
    getDocumentList("");
    $("#idDocumentCategory").change(function () {
      getDocumentList("");
    });
    $("#shares").change(function () {
      getDocumentList("");
    });
    getDocumentCategory();
  });

  $(document).on("click", ".coursewareDetail", function () {
    var id = $(this).attr("data-id");
    getCourseWareID(id);
  });

  function getCourseWareID(id) {
    $.ajax({
      type: "GET",
      url: "/api/admin/document/" + id,
      headers: { Authorization: "Bearer " + localStorage.getItem("eln_token") },
      contentType: "application/json",
      beforeSend: function () {
        $(".loader-modal").css("display", "block");
        $("#coursewareDetail").empty();
        $("#name_detail").empty();
      },
      success: function (response) {
        $("#coursewareDetail").empty();
        var type_file = response.linkFile;
        var linkFile_result = "";
        if (
          (type_file.indexOf(".doc") != -1) |
          (type_file.indexOf(".docx") != -1) |
          (type_file.indexOf(".pptx") != -1) |
          (type_file.indexOf(".xls") != -1) |
          (type_file.indexOf(".xlsx") != -1)
        ) {
          main_contain =
            '<iframe width="100%" height="100%" src="https://view.officeapps.live.com/op/embed.aspx?src=https://study.vnpost.vn' +
            response.linkFile +
            '" </iframe>';
          name_detail = response.name;
        } else if (type_file.indexOf(".mp4") != -1) {
          main_contain =
            '<video width="100%" height="100%" controls><source src="' +
            response.linkFile +
            '" type="video/mp4"></video>';
          name_detail = response.name;
        } else if (type_file.indexOf(".mp3") != -1) {
          main_contain =
            '<video width="100%" height="50" controls><source src="' +
            response.linkFile +
            '" type="video/mp4"></video>';
          name_detail = response.name;
        } else if (
          (type_file.indexOf(".jpg") != -1) |
          (type_file.indexOf(".png") != -1) |
          (type_file.indexOf(".jpeg") != -1)
        ) {
          name_detail = response.name;
          main_contain =
            '<img src="' +
            response.linkFile +
            '" style="width: 100%;height: 100%;position: absolute;\n' +
            "    margin: auto;\n" +
            "    top: 0;\n" +
            "    left: 0;\n" +
            "    right: 0;\n" +
            '    bottom: 0;" >';
        } else if (type_file.indexOf(".pdf") != -1) {
          name_detail = response.name;

          // main_contain = '<iframe src="https://docs.google.com/viewer?url=http://elearning-uat.vnpost.vn'+response.linkFile+'&embedded=true"  height="100%" width="100%"></iframe>';
          main_contain =
            '<embed src="https://drive.google.com/viewerng/\n' +
              'viewer?embedded=true&url=https://study.vnpost.vn' +
            response.linkFile +
            '"  height="100%" width="100%"></embed>';
          // main_contain = '<embed src="https://drive.google.com/viewerng/viewer?embedded=true&url=http://elearning-uat.vnpost.vn' + response.linkFile + '" style="width: 100%">';
        } else if (
          (type_file.indexOf(".zip") != -1) |
          (type_file.indexOf(".rar") != -1)
        ) {
          var linkkk = "";
          var linkk_final = "";
          linkkk = response.linkFile;
          linkk_final = linkkk.slice(36);
          name_detail = response.name;
          main_contain =
            'T??n file: <a href="' +
            response.linkFile +
            '">' +
            linkk_final +
            " </a>";
        } else {
          main_contain = "File Kh??ng ????ng ?????nh d???ng cho ph??p   ";
        }
        // main_contain ='sd';
        // name_detail ='22';
        $("#coursewareDetail").append(main_contain);
        $(".loader-modal").css("display", "none");
        $("#name_detail").append(name_detail);
      },
      error: function (response) {
        $(".loader-modal").css("display", "none");
      },
    });
  }
});

function deleteDocument(id) {
  if (!confirm("X??c nh???n x??a t??i li???u")) {
    throw "Do not delete";
  }
  $.ajax({
    type: "DELETE",
    url: "/api/admin/document/" + id,
    headers: { Authorization: "Bearer " + localStorage.getItem("eln_token") },
    contentType: "application/json",
    success: function (response) {
      // console.log("add success");
      // alert(response.message);
      // console.log(response);
      alert("X??a th??nh c??ng");
      window.location.href = "/admin/document/category";
    },
    error: function (response) {
      console.log("fail");
      alert("X??a kh??ng th??nh c??ng !");
      console.log(response);
    },
  });
}
