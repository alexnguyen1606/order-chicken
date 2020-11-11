jQuery(function ($) {
    $(document).ready(function () {
        init();
        var roles = [];
        function init() {
            // $('.card').css("max-height",$('.create')[0].scrollHeight+'px');
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
                            row += '<input class="ml-2 edit-item px-4 " value="'+item.id+'" type="radio" checked name="units">'
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
                            if (roles.includes("TCT") || roles.includes(items.id)) {
                                row += '<input class="ml-2 edit-item px-4 " value="'+items.id+'" name="units" type="radio">'
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
    })
    $('#filter-poscode').on('mouseover',function () {
        $('.tree-poscode').removeClass('d-none');
    })
    $('#filter-poscode').on('mouseout',function () {
        $('.tree-poscode').addClass('d-none');
    })
})