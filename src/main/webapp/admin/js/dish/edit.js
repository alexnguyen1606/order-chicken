/**
 *
 *   @author:DAO QUANG BINH
 *
 *  November 12,2020
 *
 */
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
        function loadListDishCatData(data,url) {
            if (!data) data = {};
            if (!url) url = "/api/dish-category/list?size=99999";
            return $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    // console.log(result);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
        function editDish(data) {
            if (!data) data = {};
            let url = "/api/dish/";
            return $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    alert('Thêm món ăn thành công')
                    window.location.href="/admin/dish/list";
                    // console.log(result);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
        function loadDishData(id) {
            let url = "/api/dish?id="+id;

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

        //etc
        function buildCreateDataDish() {
            var formData = $('#formEdit').serializeArray();
            var data = {};

            $.each(formData, function (key, value) {
                data[value.name] = value.value;
            });
            if (!data.name) {
                alert("Tên danh mục không được để trống");
                return;
            }
            editDish(data);
        }
        //init function
        async function initEditDish() {
            let dishCatData = await loadListDishCatData();
            mapCatToForm(dishCatData.data);
            let urlString = window.location.href
            let curUrl = new URL(urlString);
            let id = curUrl.searchParams.get("id");
            if (id) {
                let dishData = await loadDishData(id);
                mapDishToForm(dishData.data)
            }
        }

        //map function
        function mapCatToForm(data) {
            if (!data) return;
            if (data.length<=0) return;
            let appendData = '';
            data.forEach((v,i) => {
                appendData += `<option value="${v.id}">${v.name}</option>`
            })
            $('#idCategory').html(appendData)
        }
        function mapDishToForm(data) {
            $('#name').val(data.name);
            $('#price').val(data.price);
            $('#unit').val(data.unit);
            $('#id').val(data.id)
            if(data.urlImg) {
                $('#urlImg').val(data.urlImg);
                $('#imgExam').attr('src',data.urlImg);
                $('#imgExam').removeClass('d-none');
            }
            $('#content').val(data.content);
            $('#idCategory option[value='+data.dishCategory.id+']').attr('selected',true);
            $('input[name=status]:checked').attr('checked',false)
            $('input[value='+data.status+']').attr('checked',true)
        }

        //add handler
        $('#btnEdit').click(function () {
            buildCreateDataDish()
        })


        $('#btnReset').click(function () {
            $('#formEdit input').val("");
        })


        //call function
        initEditDish();
    })
})