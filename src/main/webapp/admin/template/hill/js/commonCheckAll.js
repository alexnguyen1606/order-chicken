$(document).ready(function () {
    $(".login_click").click(function () {
        $(".form_login_action").show();
        $("#form_register").hide();
        $(this).addClass("login100_form_title")
        $(".register_click").removeClass("login100_form_title")
    });
    $(".register_click").click(function () {
        $(".form_login_action").hide();
        $("#form_register").show();
        $(this).addClass("login100_form_title")
        $(".login_click").removeClass("login100_form_title")
    });
    $(".btn_primary_button").click(function () {
        $(this).addClass("set_background")
    });
});

function bindCheckAllCheckBox(id) {
    $('#' + id).on('change', function () {
        if ((this).checked) {
            //enable All Checkbox
            $(this).closest('table').find('input[type=checkbox]').prop('checked', true);
        } else {
            //disable all checkbox
            $(this).closest('table').find('input[type=checkbox]').prop('checked', false);
        }
    });
}

function enableOrDisableDeleteAll() {
    $('input[type=checkbox]').click(function () {
        if ($(this).attr('id') == 'checkAll' && $(this).prop('checked') == false) {
            $(this).closest('table').find('input[type=checkbox]').prop('checked', false);
        }
        if ($('input[type=checkbox]:checked').length > 0) {
            $('#deleteAll').prop('disabled', false)
        } else {
            $('#deleteAll').prop('disabled', true)
        }


    });
}

function enableOrDisableChangeStatus() {
    $('input[type=checkbox]').click(function () {
        if ($(this).attr('id') == 'checkAll' && $(this).prop('checked') == false) {
            $(this).closest('table').find('input[type=checkbox]').prop('checked', false);
        }
        if ($('input[type=checkbox]:checked').length > 0) {
            $('#changeStatus').prop('disabled', false)
        } else {
            $('#changeStatus').prop('disabled', true)
        }
    });
}

function autoCheckboxAll(id) {
    var toltalCheckbox = $('#' + id).closest('table').find('tbody input[type=checkbox]').length;
    var tableObj = $('#' + id).closest('table');
    $(this).on('change', function () {
        var toltalCheckboxChecked = $(tableObj).find('tbody input[type=checkbox]:checked').length;
        if (toltalCheckboxChecked == toltalCheckbox) {
            $('#' + id).prop('checked', true);
        } else {
            $('#' + id).prop('checked', false);
        }
    });
}


$("#checkAllCustom").change(function () {  //"select all" change
    var status = this.checked; // "select all" checked status
    $('#table_candidate_list input[type=checkbox]').each(function () { //iterate all listed checkbox items
        this.checked = status; //change ".checkbox" checked status
    });
});

$('#table_candidate_list input[type=checkbox]').change(function () { //".checkbox" change
    //uncheck "select all", if one of the listed checkbox item is unchecked
    if (this.checked == false) { //if this item is unchecked
        $("#checkAllCustom")[0].checked = false; //change "select all" checked status to false
    }
    //check "select all" if all checkbox items are checked
    if ($('#table_candidate_list input[type=checkbox]:checked').length == $('#table_candidate_list input[type=checkbox]').length) {
        $("#checkAllCustom")[0].checked = true; //change "select all" checked status to true
    }
});
