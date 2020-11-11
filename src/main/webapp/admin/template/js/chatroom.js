$('#add-btn').click(function () {
    var formData = $('#add-chatroom-form').serializeArray();
    var data = {};

    $.each(formData, function (key, value) {
        data[value.name] = value.value;
    });
    if (data['name'] == "") {
        alert("Không được để trống tên chat room")
        return;
    }
    var userId = [];
    $.each($('input[name=username_id]:checked'), function () {
        userId.push($(this).val());
    });
    data['userIds'] = userId;
    // console.log(data);
    $.ajax({
        url: '/api/admin/chatroom',
        type: 'POST',
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (result) {
            location.reload(true);

        },
        error: function (error) {
            console.log(error);
        }
    });
})
$('#remove-btn').click(function () {
    var ids = [];
    $.each($('#remove-chatroom-form input[name="ids"]:checked'), function () {
        ids.push($(this).val());
    });
    var data = {};
    data["ids"] = ids;
    $.ajax({
        url: '/api/admin/chatroom',
        type: 'DELETE',
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (result) {
            location.reload(true);

        },
        error: function (error) {
            location.reload(true);
        }
    });

})
jQuery(function ($) {
    $(document).ready(function () {
        $(document).on('click', '.remove-user-from-chatroom', function () {
            // console.log("test")
            var userDiv = $(this).closest(".user");
            var data = {};
            data['id'] = $(this).attr('data-room-id');
            data['userId'] = $(this).attr('data-id');
            var str = "<div class='mb-2 user row justify-content-between align-items-center'><div class='col-sm-auto'>" + userDiv.find("div:first-child").text() + "</div><div class='col-sm-auto'><a class='btn add-user-to-chatroom' data-room-id='" + data['id'] + "' data-id='" + data['userId'] + "'><i class='fas fa-plus'></i></a></div></div>"
            $.ajax({
                url: '/api/admin/chatroom/user?user_id=' + $(this).attr('data-id') + '&chatroom_id=' + $(this).attr('data-room-id'),
                type: 'DELETE',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                // data : JSON.stringify(data),
                // dataType : 'json',
                success: function (result) {
                    // location.reload(true);
                    userDiv.remove();
                    alert("success");
                    $("#add-user-room .all-users").append(str);
                },
                error: function (error) {
                    alert("fail");
                }
            });
        })
        $(document).on('click', '.add-user-to-chatroom', function () {
            // console.log("test")
            var userDiv = $(this).closest(".user");
            var data = {};
            data['id'] = $(this).attr('data-room-id');
            data['userId'] = $(this).attr('data-id');
            // console.log();
            var str = "<div class='mb-2 user row justify-content-between align-items-center'><div class='col-sm-auto'>" + userDiv.find("div:first-child").text() + "</div><div class='col-sm-auto'><a class='btn remove-user-from-chatroom' data-room-id='" + data['id'] + "' data-id='" + data['userId'] + "'><i class='fas fa-times'></i></a></div></div>"

            $.ajax({
                url: '/api/admin/chatroom/user',
                type: 'POST',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    // location.reload(true);
                    userDiv.remove();
                    alert("success");
                    $("#all-user-room .all-users").append(str);
                },
                error: function (error) {
                    alert("fail");
                }
            });
        })
        $('#remove-user-btn').click(function () {
            var UserIds = [];
            $('input.remove-user-checkbox:checked').each(function (i,v) {
                UserIds.push(v.value);
            });
            var data = {
                id: $('#removeUserFromChatRoom').attr('room-id'),
                userIds: UserIds
            }
            $.ajax({
                url: '/api/admin/chatroom/users/remove',
                type: 'POST',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    location.reload(true);
                    alert("success");
                },
                error: function (error) {
                    alert("fail");
                }
            });
        })
        $('#add-user-btn').click(function () {
            var UserIds = [];
            $('input.add-user-checkbox:checked').each(function (i,v) {
                UserIds.push(v.value);
            });
            var data = {
                id: $('#addUserToChatRoom').attr('room-id'),
                userIds: UserIds
            }
            $.ajax({
                url: '/api/admin/chatroom/user',
                type: 'POST',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    location.reload(true);
                    alert("success");
                },
                error: function (error) {
                    alert("fail");
                }
            });
        })

        $('.search-add-room').click(function () {
            var courseId = $('input[name=courseId]').val();
            var data ={};
            data['courseId'] =courseId;
            data['username'] = $('input[name=search-add-room]').val();
            loadCourseJoin(data);
        })

    })
})
