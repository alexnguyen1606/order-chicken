'use strict';

// var stompClient = null;
var stompClient = null;
var currentSubscription;
var topic = null;
var username;
var code;
var socket;
var nextPage;
var roomId;
var codes={};
var addUserCurPage;
var addUserMaxPage;
var removeUserCurPage;
var removeUserMaxPage;
function loadUser() {
    var data = {};
    $.ajax({
        type: "POST",
        url: "/api/admin/current_user",
        data: JSON.stringify(data),
        dataType: "json",
        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
        contentType: "application/json",
        success: function (responesData) {
            // console.log(responesData);
            username = responesData[0];
            // console.log(username);

        }, error: function (response) {
            console.log("fail");
            console.log(response);

        }
    });
}

function loadChatLog(roomID, curPage) {
    var data = {};
    data['id'] = roomID;
    // console.log(curPage);
    if (curPage != '') {
        data['curPage'] = curPage;
    }
    if (nextPage != 0) {
        $.ajax({
            type: "POST",
            url: "/chatmess/api/chatmess",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (responesData) {
                // console.log(responesData);
                // console.log(curPage);
                responesData.reverse();
                if (curPage == '') {

                    responesData.forEach(function (e) {
                        renderMessage(e);
                        nextPage = e['maxPage'] - 1;

                    })
                    setTimeout(function () {
                        $('.message-modal-body').animate({
                            scrollTop: $('.message-modal-body').get(0).scrollHeight
                        }, 500);
                    }, 500);

                } else {
                    nextPage--;
                    // console.log(nextPage);
                    var strChat = '';
                    responesData.forEach(function (message) {
                        if (message.content != null) {
                            message.content = CryptoJS.AES.decrypt(message.content, code).toString(CryptoJS.enc.Utf8);
                        }
                        if (message.type == 'CHAT') {
                            var strChatContainer = 'card py-2 px-3 message-container';
                            if (message.sender == username) {
                                strChatContainer += ' my-mess';
                            }
                            strChat += '<div class="' + strChatContainer + '">';
                            if (message.sender != username) {
                                strChat += '<div class="sender  mb-2">' + message.sender + '</div>';
                            }

                            strChat += '<div class="content">' + $('<div/>', {
                                html: message.content
                                // get text content from element for decoded text
                            }).text() + '</div>';
                            strChat += '</div>';
                        }
                    })
                    var beforeHeight = $('#messageArea')[0].scrollHeight;
                    $('#messageArea').prepend(
                        strChat
                    );
                    var afterHeight = $('#messageArea')[0].scrollHeight;
                    var position = afterHeight - beforeHeight;
                    $('.message-modal-body').animate({
                        scrollTop: position
                    }, 0);
                }

            }, error: function (response) {
                console.log("fail");
                console.log(response);

            }
        });
    }

}

function connect(id) {
    $('#room').val(id);
    Cookies.set('name', username);
    $('#spinner').css("display", "flex");
    socket = new SockJS('/sock');
    stompClient = Stomp.over(socket);
    stompClient.debug = () => {
    };
    stompClient.connect({}, onConnected, onError);
    socket.onclose = function () {
        console.log("die");
        $('#spinner').css("display", "flex");
        alert("lost connection");
    };
    stompClient.onStompError = function () {
        $('#spinner').css("display", "flex");
        alert("lost connection");
    }
    stompClient.heartbeatOutgoing = 2000;
    stompClient.heartbeatIncoming = 2000;
}

function onConnected() {
    console.log('connecting');
    enterRoom($('#room').val());
    $('#spinner').css("display", "none");
}

function onError(error) {
    console.log('uh oh! service unavailable');
}

function enterRoom(newRoomId) {
    var roomId = newRoomId;
    Cookies.set('roomId', room);

    // roomIdDisplay.textContent = roomId;
    topic = `/chat-app/chat/${newRoomId}`;
    // console.log('before sub'+newRoomId);
    currentSubscription = stompClient.subscribe(`/chat-room/${roomId}`,
        onMessageReceived);

    // console.log('after sub')
    var username1 = username;
    // console.log(username1);
    stompClient.send(`${topic}/addUser`, {}, JSON.stringify({
        sender: username1,
        type: 'JOIN'
    }));
    // loadRoom(newRoomId);
    loadChatLog(newRoomId,"");
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    renderMessage(message);
    $('.message-modal-body').animate({
        scrollTop: $('.message-modal-body').get(0).scrollHeight
    }, 0);
}

function renderMessage(message) {
    // console.log(message);
    var strChat = '';
    if (message.content != null) {
        message.content = CryptoJS.AES.decrypt(message.content, code).toString(CryptoJS.enc.Utf8);
    }
    if (message.type == 'CHAT') {
        var strChatContainer = 'card py-2 px-3 message-container';
        if (message.sender == username) {
            strChatContainer += ' my-mess';
        }
        strChat += '<div class="' + strChatContainer + '">';
        if (message.sender != username) {
            strChat += '<div class="sender  mb-2">' + message.sender + '</div>';
        }

        strChat += '<div class="content">' + $('<div/>', {
            html: message.content
            // get text content from element for decoded text
        }).text() + '</div>';
        strChat += '</div>';
    }
    $('#messageArea').append(
        strChat
    );


}

function sendMessage(event) {
    event.preventDefault();

    var messageContent = $("#message").val().trim();

    if (!messageContent) return;
    var messageContent = CryptoJS.AES.encrypt(messageContent, code).toString();

    // console.log(messageContent);
    var username1 = username;
    var newRoomId = $('#room').val().trim();

    topic = `/chat-app/chat/${newRoomId}`;
    if (messageContent && stompClient) {
        var chatMessage = {
            sender: username1,
            content: messageContent,
            type: 'CHAT'
        };
        stompClient.send(`${topic}/sendMessage`, {}, JSON
            .stringify(chatMessage));
        document.querySelector('#message').value = '';
    }
}

function disconnect() {

    stompClient.disconnect(onDisConnect, {});

}

function onDisConnect() {
    currentSubscription.unsubscribe();
    $('#messageArea').empty();
    $("#all-user-room .all-users").empty();
    $('#all-user-room').removeClass("border-left");
    $('.toggle-all-user').removeClass("active");
    // $("#all-user-room").css('max-width', "0");
    // $("#all-user-room").css('padding', "0");
    // $("#all-user-room").css('max-height', "0");

    $("#add-user-room .all-users").empty();
    $('#add-user-room').removeClass("border-left");
    $('.toggle-add-user').removeClass("active");
    // $("#add-user-room").css('max-width', "0");
    // $("#add-user-room").css('padding', "0");
    // $("#add-user-room").css('max-height', "0");
}

$(document).ready(function () {

    loadUser();


    $('#chat-room').on('hidden.bs.modal', function () {
        disconnect();
    });
    messagebox.addEventListener('submit', sendMessage, true);

    $('.message-modal-body').scroll(function () {
        var pos = $('.message-modal-body').scrollTop();
        if (pos == 0) {
            loadChatLog(roomId, nextPage)
        }
    });
})
jQuery(function ($) {
    $(document).ready(function () {
        var notInList = [];
        $(document).on('click', '.open-chat', function () {
            roomId = $(this).attr('room-id');
            // console.log(roomId);
            $('.chat-title').text( $(this).text())
            code=codes[roomId];
            loadRoom(roomId);
            $('#chat-room').on('shown.bs.modal', connect(roomId));

        })
        $('.search-add-user').on('click',function () {
            var search = $('input[name=search-add-user]').val();

            loadAllCourseUser($('input[name=courseId]').val(),notInList,$('#addUserToChatRoom').attr('room-id'),search,"")
        })
        $('.search-remove-user').on('click',function () {
            var search = $('input[name=search-remove-user]').val();
            var data = {};
            data['id'] =$('#removeUserFromChatRoom').attr('room-id');
            data['searchUser'] = search;
            loadAllAvailableUser(data,"");
        })
        function loadRoom(roomID) {
            // console.log(roomId);
            $.ajax({
                type: "GET",
                url: "/api/admin/chatroom?id=" + roomID,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                dataType: "json",

                success: function (responesData) {
                    // console.log(responesData)
                    // code = responesData['code'];
                    // console.log(username);
                    nextPage = 1;
                    var data = {};
                    data['id']=roomID;

                    if (responesData['createdUser'] == username) {
                        $('.toggle-all-user').css("display", "none");
                        $('.toggle-add-user').css("display", "none");
                        $('#chat-room .modal-header').css("padding", "20px");
                        // loadAllAvailableUser(data,"");
                        // loadAllCourseUser($('input[name=courseId]').val(), responesData['userIds'], roomID, "", "");
                    } else {
                        // console.log($('.toggle-add-user'))
                        $('#chat-room .modal-header').css("padding", "0");
                        $('.toggle-all-user').css("display", 'none');
                        $('.toggle-add-user').css("display", "none");
                    }
                }, error: function (response) {
                    console.log("fail");
                    console.log(response);

                }
            });
        }
        function loadAllCourseUser(courseId, userIds, roomId, search, page) {
            var data = {};
            data['courseId'] = courseId;
            // console.log(data);
            var url = "/api/admin/course-join/course/chatroom/not_in?size=5";
            if (search != '') {
                data['username'] = search;
            }
            if (page != "") {
                url += "&page=" + page;
            }
            if (Array.isArray(userIds) && userIds.length) {
                data['notInList'] = userIds;
                notInList= userIds;
            }
            if (roomId != '') {
                data['chatRoomId'] = roomId;
            }
            $.ajax({
                type: "POST",
                url: url,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function() {
                    $('#add-user-pag').empty();

                    $('#add-user-pag').removeData("twbs-pagination");

                    $('#add-user-pag').unbind("page");
                },
                success: function (responesData) {
                    console.log(responesData)
                    var str = "";
                    for (var v of responesData.data) {
                        if (!userIds.includes(v['user']['id'])) {
                            console.log(v['user']);
                            str +=
                                "<div class='mb-2 user row justify-content-between align-items-center'>" +
                                    "<div class='col-sm-auto'>" +
                                        v['user']['username'] +
                                    "</div>" +
                                    "<div class='col-sm-auto'>" +
                                        "<input type='checkbox' class='add-user-checkbox' data-room-id='" + roomId + "' value='" + v['user']['id'] + "'>" +

                                        "</input>" +
                                    "</div>" +
                                "</div>"
                        }

                    }
                    $("#add-user-room .all-users").html(str);
                    $('#add-user-pag').twbsPagination({
                        totalPages: responesData.totalPage,
                        startPage: responesData.currentPage,
                        initiateStartPageClick: false,
                        first: '',
                        prev: '',
                        next: '',
                        last: '',
                        visiblePages: 5,
                        onPageClick: function (event, clickPage) {
                            // console.log('test');
                            data['currentPage'] = clickPage;
                            loadAllCourseUser(courseId, userIds, roomId, search, clickPage);
                        }
                    });

                }, error: function (jqXHR, textStatus, errorThrown) {
                    console.log('The following error occured: ' + textStatus, errorThrown);
                }
            });
        }

        function loadAllAvailableUser(data,page) {
            // console.log(roomId);
            var url = "/api/admin/chatroom/users";
            if (page != "") {
                url += "?page="+page;
            }
            $.ajax({
                type: "POST",
                url: url,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                beforeSend:function() {
                    $('#remove-user-pag').empty();

                    $('#remove-user-pag').removeData("twbs-pagination");

                    $('#remove-user-pag').unbind("page");
                },
                success: function (responesData) {
                    // console.log(responesData)
                    var str = "";
                    for (var v of responesData.data) {
                        str +=
                            "<div class='mb-2 user row justify-content-between align-items-center'>" +
                                "<div class='col-sm-auto'>" + v['username'] + "</div>" +
                                "<div class='col-sm-auto'>" +
                                    "<input type='checkbox' class='remove-user-checkbox' data-room-id='" + data['id'] + "' value='" + v['id'] + "'>" +

                                    "</input>" +
                                "</div>" +
                            "</div>"
                    }
                    $("#all-user-room .all-users").html(str);
                    $('#remove-user-pag').twbsPagination({
                        totalPages: responesData.totalPage,
                        startPage: responesData.currentPage,
                        initiateStartPageClick: false,
                        first: '',
                        prev: '',
                        next: '',
                        last: '',
                        visiblePages: 5,
                        onPageClick: function (event, clickPage) {
                            // console.log('test');
                            data['currentPage'] = clickPage;
                            loadAllAvailableUser(data,clickPage);
                        }
                    });

                }, error: function (jqXHR, textStatus, errorThrown) {
                    console.log('The following error occured: ' + textStatus, errorThrown);
                }
            });
        }
        function loadFirst() {
            var courseId = $('input[name=courseId]').val();
            // console.log(courseId);
            $.ajax({
                url: '/api/admin/chatroom/all?id=' + courseId,
                type: 'GET',
                contentType: 'application/json',
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    var strList = "";
                    var strDelete = "";
                    var removeTable = $('#remove-chat-table').DataTable({
                        "ordering": false,
                        "language": {
                            "decimal":        "",
                            "emptyTable":     "Không có dữ liệu",
                            "info":           "Hiện từ _START_ đến _END_ của _TOTAL_ dữ liệu",
                            "infoEmpty":      "Hiện từ 0 đến 0 của 0 dữ liệu",
                            "infoFiltered":   "(Lọc từ _MAX_ trong tổng số dữ liệu)",
                            "infoPostFix":    "",
                            "thousands":      ",",
                            "lengthMenu":     "Hiện _MENU_ dữ liệu",
                            "loadingRecords": "Đang tải...",
                            "processing":     "Đang xử lý...",
                            "search":         "Tìm kiếm:",
                            "zeroRecords":    "Không có dữ liệu phù hợp",
                            "paginate": {
                                "first":      "Đầu tiên",
                                "last":       "Cuối cùng",
                                "next":       "Tiếp",
                                "previous":   "Trước"
                            },
                            "aria": {
                                "sortAscending":  ": activate to sort column ascending",
                                "sortDescending": ": activate to sort column descending"
                            }
                        }
                    })
                    $.each(result, function (i, v) {
                        codes[v.id] = v.code;
                        strList += ' <div class="col-auto">' +
                            '<button type="button" data-toggle="modal" data-target="#chat-room" style="z-index:2" class="btn-circle btn-sm btn-danger open-chat position-relative" room-id="' + v.id + '">' +
                            v.name +
                            '</button>' ;
                        if (v.type != 'ALL') {
                            strList +=
                                '  <button type="button" class="btn-sm btn-secondary dropdown-toggle dropdown-toggle-split user-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                '    <span class="sr-only">Toggle Dropright</span>' +
                                '  </button>' +
                                '<div class="dropdown-menu px-4 py-1 dropright" style="min-width: 230px;">' +
                                '<div class="text-center">' +
                                '<a data-toggle="modal" room-name="'+v.name+'" room-id="'+v.id+'"  data-target="#addUserToChatRoom" class="w-100 position-relative modal-add-user d-flex justify-content-between" >' +
                                '<div>Thêm người dùng</div>' +
                                '<i class="fas fa-user-plus"></i>' +
                                '</a>' +
                                '</div>' +
                                '<div class="text-center ">' +
                                '<a data-toggle="modal" room-name="'+v.name+'" room-id="'+v.id+'" data-target="#removeUserFromChatRoom" class="w-100 modal-remove-user d-flex justify-content-between" >' +
                                '<div>Xóa người dùng</div>' +
                                '<i class="fas fa-user-times"></i>' +
                                '</a>' +
                                '</div>' +
                                '</div>';
                        }

                        strList += '</div>';

                        removeTable.row.add([v.name,'<input class="delete-id" class="form-check-input" type="checkbox" value="'+v.id+'" name="ids">']).draw()
                            .node();
                    })
                    $('.list-chat-room').html(strList);
                    // $('#remove-chatroom-form').html(strDelete);
                },
                error: function (error) {
                    console.log(error);
                    // location.reload(true);
                }
            });
            var data ={};
            data['courseId'] =courseId;
            loadCourseJoin(data);
        }
        function loadCourseJoin(data) {
            var url = '/api/admin/course-join/course';
            if (data['page']) {
                url += '?page='+data['page'];
            }
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                dataType: 'json',
                beforeSend: function() {
                    $('#add-room-pag').empty();

                    $('#add-room-pag').removeData("twbs-pagination");

                    $('#add-room-pag').unbind("page");
                },
                success: function (result) {
                    var str = "";
                    $.each(result.data, function (i,v) {
                        str += "<tr>" +
                            "<td>"+v['user']['username']+"</td>" +
                            "<td>"+v['user']['fullName']+"</td>" +
                            '<td><input type="checkbox" name="username_id" value="'+v['user']['id']+'"></td>' +
                            "</tr>"
                    })
                    $('#add-chat-room-table tbody').html(str);
                    $('#add-room-pag').twbsPagination({
                        totalPages: result.totalPage,
                        startPage: result.currentPage,
                        first:'',
                        prev:'',
                        next:'',
                        last:'',
                        initiateStartPageClick: false,
                        visiblePages: 10,
                        onPageClick: function (event, clickPage) {
                            data['page'] = clickPage;
                            loadCourseJoin(data);
                        }
                    });
                    // $('.list-chat-room').html(str);
                },
                error: function (error) {
                    console.log(error);
                    // location.reload(true);
                }
            });
        }

        $(document).on('click','.modal-remove-user',function () {
            var roomId = $(this).attr('room-id');
            var data = {
                'id' : roomId
            }
            $('#removeUserFromChatRoom .modal-header').html('<h5 class="mb-0">'+$(this).attr('room-name')+'</h5>')
            $('#removeUserFromChatRoom').attr('room-id',roomId);

            loadAllAvailableUser(data,'');

        })
        $(document).on('click','.modal-add-user',function () {
            var roomId = $(this).attr('room-id');
            var notInList = [];

            $('#addUserToChatRoom .modal-header').html('<h5 class="mb-0">'+$(this).attr('room-name')+'</h5>')
            $('#addUserToChatRoom').attr('room-id',roomId);
            loadAllCourseUser($('input[name=courseId]').val(),notInList,roomId,"","")

        })
        loadFirst();
    })
})