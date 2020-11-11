var count = 0;
jQuery(function ($) {
        $(document).ready(function () {

                function getParentCategory() {
                    $.ajax({
                        type: "GET",
                        url: '/api/admin/course-category/parent',
                        headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                        contentType: "application/json",
                        beforeSend: function () {

                        },
                        success: function (response) {
                            $('#parentId').empty();
                            var row = '<option value="">Chọn danh mục cha</option>';
                            $.each(response.data, function (i, item) {
                                if (item.isActive == 1) {
                                    row += '<option value="' + item.id + '">' + item.name + '</option>';

                                } else {
                                    row += '<option value="' + item.id + '"><i class="fa fa-ban"></i>' + item.name + '</option>';
                                }

                                if (item.listChild.length > 0) {
                                    count = 0;
                                    row += showListChild2(item.listChild);
                                }

                            });
                            $('#parentId').html(row);
                            count = 0;
                        }, error: function (response) {


                        }
                    })
                }

                getParentCategory();

                function showListChild2(listChild) {
                    var row = '';
                    $.each(listChild, function (i, item) {
                            count++;
                            var prefix = "";
                            for (var x = 1; x <= count; x++) {
                                prefix += '&emsp;'
                            }
                            if (item.isActive == 1) {
                                row += '<option value="' + item.id + '"> ' + prefix + item.name + '</option>';
                            } else {
                                row += '<option value="' + item.id + '"><i class="fa fa-ban" ></i>' + prefix + item.name + '</option>';
                            }

                            if (item.listChild.length > 0) {
                                row += showListChild2(item.listChild);
                            } else {
                                count--;
                            }

                        }
                    );
                    return row;
                }
            }
        )
    }
)