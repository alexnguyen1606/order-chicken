$('#jobTitleName').on('keyup', function () {

    var search = $('#jobTitleName').val();
    if (search == null || search == "") {
        $('#idJobTitle').val("");
    }
    $.ajax({
        type: "GET",
        url: "/api/admin/job-title/search?search=" + search,
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        contentType: "application/json",
        beforeSend: function () {

        },
        success: function (response) {
            var row = '';
            $.each(response.data, function (i, v) {
                row += '<li class="jobTitle list-group-item" style="cursor: pointer"  dataId="' + v.id + '"  dataName="' + v.name + '">' + v.name + " --- " + v.nameLevel + '</li>';
            });
            $('#jobTitle').empty();
            $('#jobTitle').append(row);
        }, error: function (response) {

        }
    })
});
$('#jobTitleName').on('click', function () {
    var search = $('#jobTitleName').val();
    $.ajax({
        type: "GET",
        url: "/api/admin/job-title/search?search=" + search,
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        contentType: "application/json",
        beforeSend: function () {

        },
        success: function (response) {
            var row = '';
            $.each(response.data, function (i, v) {
                row += '<li class="jobTitle list-group-item " style="cursor: pointer"  dataId="' + v.id + '" dataName="' + v.name + '"  >' + v.name + " --- " + v.nameLevel + '</li>';
            });
            $('#jobTitle').empty();
            $('#jobTitle').append(row);
        }, error: function (response) {

        }
    })
});
$(document).on('click', '.jobTitle', function (e) {
    var id = $(this).attr('dataId');
    var name = $(this).attr('dataName')
    // var name = $(this).text();
    $('#idJobTitle').val(id);
    $('#jobTitleName').val(name);
    $('#jobTitle').empty();
});
$('#jobTitleOut').on('mouseleave', function () {
    $('#jobTitle').empty();
});