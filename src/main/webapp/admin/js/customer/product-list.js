jQuery(function ($) {
    $(document).ready(function () {
        function getCategory() {
            $.ajax({
                type: "GET",
                url: "/api/category/list",
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                // data: JSON.stringify(data),
                // dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {
                    bindingCatgeory(response.data);
                    $('.loader').css("display", "none");
                    getProductWithCategory();
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                }
            });
        }

        getCategory();

        function bindingCatgeory(data) {
            var row = "";
            $.each(data, function (i, v) {
                row += '<div class="col-md-12">';
                row += '<div class="col-md-12 text-left title-category"><h3>' + v.name + '</h3></div>';
                row += '<div class="col-md-12 mt-5 row item-category" data-id ="' + v.id + '" id="category_"' + v.id + '></div>';
                row += '</div>'
            });
            $('#list-product').empty();
            $('#list-product').append(row);
        }

        function getProductWithCategory() {
            $('.item-category').each(function (i, v) {
                fetchProductByCategoryId(v.getAttribute("data-id"));
            });
        }

        function fetchProductByCategoryId(categoryId) {
            categoryId = parseInt(categoryId);
            $.ajax({
                type: "GET",
                url: "/api/product/category/"+categoryId,
                // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                // data: JSON.stringify(data),
                // dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    $('.loader').css("display", "block");

                },
                success: function (response) {
                    $('.loader').css("display", "none");
                    bindingProduct(response.data,categoryId);
                }, error: function (jqXHR) {
                    $('.loader').css("display", "none");
                }
            });
        }
        function bindingProduct(data,categoryId) {
            var row = '<div class="col-md-12 mt-5 row">';
            $.each(data,function (i,v) {
                row+='<div class="col-md-3">';
                row+='<div class="card item-product text-center">';
                row+='<img class="card-img-top" src="/admin/image/product1.png" alt="">';
                row+='<div class="card-header">';
                row+='<p class="card-title title-product">'+v.name+'</p>';
                row+='</div>';
                row+='<div class="card-body text-center">';
                row+='<p class="card-text price">'+v.price+'</p>';
                row+='</div';
                row+='<div class="card-footer">';
                row+='<button class="btn btnAddToCard">Thêm vào giỏ hàng</button>';
                row+='</div';

                row+='</div>';
                row+='</div>';
            });
            row+='</div>';
            $('#category_'+categoryId).empty();
            $('#category_'+categoryId).append(row);
        }
    })
});