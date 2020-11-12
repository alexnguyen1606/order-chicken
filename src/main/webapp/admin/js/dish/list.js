jQuery(function ($) {
    $(document).ready(function () {
        //load data
        function loadListDishData(data) {
            if (!data) data = {};
            return $.ajax({
                url: '/api/dish/list',
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
        async function initListDish() {
            let data = await loadListDishData();
            console.log(data)
        }

        //run function
        initListDish();
    })
})