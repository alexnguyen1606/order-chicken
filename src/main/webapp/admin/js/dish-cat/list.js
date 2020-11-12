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
        function loadListDishCatData(data) {
            if (!data) data = {};
            return $.ajax({
                url: '/api/dish-category/list',
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

        //init function
        async function initListDishCat() {
            let data = await loadListDishCatData();
            mapDishCatDataToTable(data);
        }

        //map function
        function mapDishCatDataToTable(data) {
            let cats = data.data;
            let appendData = ''
            cats.forEach((v,i) => {
                appendData +=
                `<tr>
                    <td>${v.name}</td>
                    <td class="text-right"><a data-id="${v.id}" class="edit-cat"><i class="far fa-edit"></i></a></td>
                 </tr>`
            })
            $('#list tbody').html(appendData)
        }

        //run function
        initListDishCat();
    })
})