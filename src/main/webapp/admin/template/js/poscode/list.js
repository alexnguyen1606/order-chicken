jQuery(function ($) {
    $(document).ready(function () {
        init();
        var roles = [];
        function init() {
            $('.card').css("max-height",$('.create')[0].scrollHeight+'px');
            $.ajax({
                url: '/api/admin/current_user',
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                type: 'POST',
                dataType: 'json',
                beforeSend:function() {
                  $('.spin').removeClass('display-none');
                },
                success: function (res) {
                    // console.log(res)
                    $('.spin').addClass('display-none');

                    roles = res;
                    loadListUnit(res);
                },
                error: function (res) {
                    console.log(res);
                    alert(console.log(res));
                    $('.spin').addClass('display-none');

                }
            });

        }
        function loadListUnit(roles) {
            $.ajax({
                url: '/api/admin/treeunit/parent',
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                type: 'POST',
                dataType: 'json',
                beforeSend:function() {
                    $('.spin').removeClass('display-none');
                },
                success: function (res) {

                    $(res).each(function (index, item) {
                        var row = '';
                        row += '<li>'
                        row += '<div class="d-flex justify-content-between">'
                        row += '<div  code_unit="' + item.unitCode + '" id="id_pers_root_for_edit_' + item.id + '" id_pers_root="' + item.id + '" class="showChildRoot carett showChildRoot">&nbsp;<i class="far fa-building text-success"></i>&nbsp;' + item.name + '</div>'
                        if (roles.includes("TCT") || roles.includes(item.id)) {
                            row += '<div class="ml-2 edit-item px-4 " data-id="'+item.id+'" style="cursor: pointer"><i class="fas fa-edit"></i><span class="ml-1">Sửa</span></div>'
                        }
                        row += '</div>'
                        row += '<div class="detail-parent"><ul id="detail_item_for_edit_' + item.id + '" class="nested"></div>'
                        row += '</ul>'
                        row += '</li>';
                        $('.tree-poscode').append(row);
                        showChildRoot($('#id_pers_root_for_edit_' + item.id),roles);
                    });

                    $('.spin').addClass('display-none');

                },
                error: function (res) {
                    console.log(res);
                    alert(console.log(res));
                    $('.spin').addClass('display-none');

                }
            });
        }

        function showChildRoot(btn,roles) {
            var idPerRoot = btn.attr('id_pers_root');
            var name_poscode = btn.text();
            var codeUnit = btn.attr('code_unit') == 'null' ? '' : btn.attr('code_unit');

            $.ajax({
                url: '/api/admin/treeunit/' + idPerRoot + '/childRound',
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                type: 'POST',
                dataType: 'json',
                beforeSend:function() {
                    $('.spin').removeClass('display-none');
                },
                success: function (res) {
                    $('.spin').addClass('display-none');

                    var row = '';
                    if (res != null) {
                        $(res).each(function (index, items) {
                            row += '<li>'
                            row += '<div class="d-flex justify-content-between">'
                            if (items.status == 1) {
                                row += '<div  code_unit="' + items.unitCode + '"  id_pers_root=' + items.id + '  id="id_pers_root_for_edit_' + items.id + '" class="carett showChildRootForEdit"><i class="fas fa-home text-warning"></i>&nbsp;' + items.name + '</div>'

                            } else {
                                row += '<div  code_unit="' + items.unitCode + '" id_pers_root=' + items.id + '  id="id_pers_root_for_edit_' + items.id + '"  class="showChildRootForEdit" style="cursor: pointer"><i class="far fa-dot-circle"></i>&nbsp;<i class="fas fa-campground  text-warning"></i></i>&nbsp;' + items.name + '</div>'

                            }
                            if (roles.includes("TCT") || roles.includes(item.id)) {
                                row += '<div class="ml-2 edit-item px-4 " data-id="'+items.id+'" style="cursor: pointer"><i class="fas fa-edit"></i><span class="ml-1">Sửa</span></div>'
                            }
                            row += '</div>'
                            row += '<div class="detail-parent"><ul id="detail_item_for_edit_' + items.id + '" class="nested">'
                            row += '</ul>'
                            row += '</div>'
                            row += '</ul>'
                            row += '</li>'
                        });
                    }
                    $('#detail_item_for_edit_' + idPerRoot).html(row);
                    btn.addClass('show-in-out');
                    checkRoot(idPerRoot);
                },
                error: function (res) {
                    console.log(res);
                    $('.spin').addClass('display-none');

                    alert(console.log(res));
                }
            });
        }

        $(document).on('click', '.showChildRootForEdit:not(.show-in-out)', function () {
            showChildRoot($(this),roles);
        })
        $(document).on('click', '.show-in-out', function () {
            var btn = $(this);
            var toggle = $('#detail_item_for_edit_' + btn.attr('id_pers_root'));
            toggle.toggleClass('activee');

        })

        function checkRoot(id) {
            if ($('#detail_item_for_edit_' + id).hasClass('activee')) {
                $('#detail_item_for_edit_' + id).removeClass('activee');
            } else {
                $('#detail_item_for_edit_' + id).addClass('activee');
            }
        }

        //create
        $('#cancel-create').click(function () {
            $('#create-form input').val("");
            $('#create-form #name_unit_form').text("--Chưa có thông tin--");
        })
        $('#create-btn').click(function () {
            $('#create-form').submit();
        })
        $('#create-form').on('submit', function (e) {
            if (!$(this)[0].reportValidity()) return false;
            var formdata = $(this).serializeArray();
            var data = {};
            $.each(formdata, function (i, v) {
                data[v['name']] = v['value'];
            })
            data['idParent'] = $('#create-form input[name=idParent]').attr('id_unit');
            if (!data['idParent']) {
                alert("Cần chọn đơn vị cha");
                return;
            }
            $.ajax({
                url: '/api/admin/poscode',
                method: 'POST',
                dataType: 'json',
                contentType: "application/json",
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                data: JSON.stringify(data),
                beforeSend: function () {
                    $('.spin').removeClass("display-none")
                },
                success: function (response) {
                    alert("Thêm thành công");
                    location.reload();
                },

                error: function(response){
                    alert("Thêm thất bại")
                    console.log(response);
                    $('.spin').addClass("display-none");
                }

            });
            // console.log(data);
            e.preventDefault();
        });

        //update
        $('#cancel-update').click(function () {
            $('.update').addClass("hidden");
        });
        $(document).on('click','.edit-item',function () {

            $.ajax({
                url: '/api/admin/poscode/'+$(this).attr("data-id"),
                method: 'GET',
                dataType: 'json',
                contentType: "application/json",
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                beforeSend: function () {
                    $('.spin').removeClass("display-none")
                    if ($('.update').hasClass('hidden')) $('.update').removeClass("hidden");
                    $('#update-form option').removeAttr("selected");
                },
                success: function (response) {
                    mapInfoToForm(response.data)
                    $('.spin').addClass("display-none");
                },

                error: function(response){
                    console.log('error',response);
                    $('.spin').addClass("display-none");

                }

            });
        })
        function mapInfoToForm(data) {
            $('#update-form input[name=name]').val(data.name);
            $('#update-form input[name=unitCode]').val(data.unitCode);
            $('#update-form input[name=id]').val(data.id);
            $('#update-form input[name=priority]').val(data.priority);

            $('#update-form option[value='+data.virtualUnit+']').attr("selected",true);
            if (data.idParent) {
                $('#update-form input[name=idParent]').val(data.parent.unitCode);
                $('#update-form #name_unit_form').text(data.parent.name);
                $('#update-form input[name=idParent]').attr('name_unit',data.idParent)
                $('#update-form input[name=idParent]').attr('id_unit',data.idParent)
            }
        }
        $('#update-btn').click(function () {
            $('#update-form').submit();
        })
        $('#update-form').on('submit',function (e) {
            if (!$(this)[0].reportValidity()) return false;
            var formdata = $(this).serializeArray();
            var data = {};
            $.each(formdata, function (i, v) {
                data[v['name']] = v['value'];
            })
            data['idParent'] = $('#update-form input[name=idParent]').attr('id_unit');
            $.ajax({
                url: '/api/admin/poscode',
                method: 'PUT',
                dataType: 'json',
                contentType: "application/json",
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                data: JSON.stringify(data),
                beforeSend: function () {
                    $('.spin').removeClass("display-none")
                },
                success: function (response) {
                    alert("Cập nhât thành công");
                    location.reload();
                },

                error: function(response){
                    alert("Cập nhât thất bại")
                    console.log(response);
                    $('.spin').addClass("display-none");
                }

            });
            e.preventDefault();
        })
    })
})
