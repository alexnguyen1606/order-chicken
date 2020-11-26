jQuery(function ($) {
    $(document).ready(function () {
        //load data function
        function loadAccount() {
            let url = '/api/admin/account';
            let urlString = window.location.href
            let curUrl = new URL(urlString);
            let id = curUrl.searchParams.get("id");
            if (!id) return ;
            $('input[name=userName]').prop('disabled',true);
            $('input[name=password]').prop('disabled',true);
            url += `?id=${id}`
            return $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                success: function (result) {
                    // console.log(result);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
        function ajaxCreateAcc(data){
            let url = '/api/admin/account';
            let type= (data.id) ? 'PUT' : 'POST';
            $.ajax({
                url: url,
                type: type,
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    alert("Thành công")
                    window.location.reload();
                    // console.log(result);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }

        //function init
        async function initLoadAccount() {
            let accData = await loadAccount();
            mapDataToForm(accData.data)
        }



        //map data function
        function mapDataToForm(data) {
            console.log(data)
            let appendData = '';
            $('input[name=userName]').val(data.userName)
            $('#userName').val(data.user.name)
            $('#userAddress').val(data.user.address)
            $('#userPhone').val(data.user.phone)
            $('#userEmail').val(data.user.email)
            $('.gender').prop('checked',false);
            $('.gender[value='+data.user.gender+']').prop('checked',true)
            $('.status').prop('checked',false)
            $('.status[value='+data.status+']').prop('checked',true)
            $('#id').val(data.id)
            $('#userIdAccount').val(data.id)
            $('#userId').val(data.user.id)
            
        }

        //call function
        initLoadAccount();

        //get data to edit
        function editData() {
            var formData = $('#edit-form').serializeArray();
            var data = {};
            data['user'] = {};

            $.each(formData, function (key, value) {
                if (value.name.includes('user.')) {
                    data.user[value.name.replace('user.','')] = value.value
                }
                else {
                    data[value.name] = value.value;
                }
            });
            return data;
        }
        
        //handler
        $('#edit-btn').on('click',function () {
            let data = editData();
            ajaxCreateAcc(data);
            // console.log(data)
        })
    })
})