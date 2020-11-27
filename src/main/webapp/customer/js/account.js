jQuery(function ($) {
    $(document).ready(function () {
        //ajax function
        function loadAccount() {
            let url = '/api/account';
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
        function ajaxEditAcc(data){
            let url = '/api/admin/account';
            let type = 'PUT' ;
            $.ajax({
                url: url,
                type: type,
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    alert("Cập nhật thành công")
                    window.location.reload();
                    // console.log(result);
                },
                error: function (error) {
                    alert("Cập nhật thất bại")
                    console.log(error);
                }
            });
        }
        function updatePassword(data){
            let url = '/api/account/password';
            let type = 'PUT' ;
            $.ajax({
                url: url,
                type: type,
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    alert("Cập nhật thành công")
                    window.location.reload();
                    // console.log(result);
                },
                error: function (error) {
                    alert("Cập nhật thất bại")

                    console.log(error);
                }
            });
        }


        //init function
        async function initLoadAccount() {
            let accData = await loadAccount();
            mapDataToForm(accData.data)
        }

        //map data function
        function mapDataToForm(data) {
            // console.log(data)
            let appendData = '';
            if (data.user) {

                $('#userName').val(data.user.name)
                $('#userAddress').val(data.user.address)
                $('#userPhone').val(data.user.phone)
                $('#userEmail').val(data.user.email)

                $('.gender').prop('checked',false);
                $('.gender[value='+data.user.gender+']').prop('checked',true)
                $('#userIdAccount').val(data.id)
                $('#userId').val(data.user.id)
            }
            $('#id').val(data.id)

        }
        function editData(target) {
            var formData = $(target).serializeArray();
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

        //handler function
        $('#detail-form').on('submit',function (e) {
            e.preventDefault();
            let data = editData('#detail-form');
            ajaxEditAcc(data);
        })
        $('#password-form').on('submit',function (e) {
            e.preventDefault();
            let data = editData('#password-form');
            if (!data.password) {
                alert('Mật khẩu không đc để trống');
                return;
            }
            if (data.password != data.repeatPassword) {
                alert('Mật khẩu và nhập lại mật khẩu không giống nhau');
                return;
            }
            updatePassword(data);
        })


        //call function
        initLoadAccount()
    })
})