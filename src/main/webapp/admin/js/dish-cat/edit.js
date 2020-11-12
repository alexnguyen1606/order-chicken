/**
 *
 *   @author:DAO QUANG BINH
 *
 *  November 12,2020
 *
 */
jQuery(function ($) {
    $(document).ready(function () {
        //load data
        function getDishCatData(id) {
            let url = '/api/dish-category';
            if (id) url = url + "?id=" + id;
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
        function createDishCat(data) {
            let url ="/api/dish-category"
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    window.location.reload();
                    // console.log(result);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
        //etc
        function buildCreateDataDishCat() {
            var formData = $('#formEdit').serializeArray();
            var data = {};

            $.each(formData, function (key, value) {
                data[value.name] = value.value;
            });
            if (!data.name) {
                alert("Tên danh mục không được để trống");
                return;
            }
            createDishCat(data);
        }
        async function editHandler(btn) {
            let id = $(btn).attr('data-id');
            let data = await getDishCatData(id);
            mapDishCatToEdit(data.data)
        }

        //map function
        function mapDishCatToEdit(data) {
            let name = data.name;
            let id = data.id;
            $('#name').val(name);
            $("#id").val(id);
        }

        //add handler
        $('#btnEdit').click(function () {
            buildCreateDataDishCat();
        })

        $(document).on('click','.edit-cat',function () {
            editHandler($(this));
        })

        $('#btnReset').click(function () {
            $('#formEdit input').val("");
        })
    })
})