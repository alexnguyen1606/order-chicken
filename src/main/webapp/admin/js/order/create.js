jQuery(function ($) {
    $(document).ready(function () {
        $(document).on('click', '.addProduct', function () {
            var price = $(this).attr("data-price");
            var idProduct = $(this).attr("data-id");
            var nameProduct = $(this).attr("data-name");
            var priceString = parseInt(price).toLocaleString('it-IT', {style: 'currency', currency: 'VND'});

            if ($('#product_id_' + idProduct).length > 0) {
                addProduct(idProduct, parseInt(price));
            } else {
                var row = '';
                row += '<tr id="product_id_' + idProduct + '" data-id="' + idProduct + '">';
                row += '<td class="text-center">' + nameProduct + '</td>';
                row += '<td class="text-center">' + priceString + '</td>';
                row += '<td class="text-center">';
                row += '<a class="addProduct" data-id=' + idProduct + ' data-price="' + price + '" data-name="' + nameProduct + '"><i class="fa fa-plus"></i></a>';
                row += '<span class="pl-1 pr-1 items" data-item="1" data-id="' + idProduct + '" id="product_added_amount_' + idProduct + '">1</span>';
                row += '<a class="minusProduct" data-id=' + idProduct + ' data-price="' + price + '" data-name="' + nameProduct + '"><i class="fa fa-minus"></i></a>';
                row += '</td>';
                row += '<td class="text-center"><p class="totalPricePerProduct" id="product_added_price_' + idProduct + '" data-price="' + price + '">' + priceString + '</p></td>';
                row += '<td class="text-center"><a class="deleteProductAdded" data-id="' + idProduct + '">Xóa</a></td>';
                row += '</tr>';
                $('#productAdded').append(row);
            }
            updateTotalPrice(1, parseInt(price));
            updateTotalProduct(1, 1);
        });

        $(document).on('click', '.deleteProductAdded', function () {
            var idProduct = $(this).attr("data-id");
            var totalCurrentItem = parseInt($('#product_added_amount_' + idProduct).text());
            var totalPrice = parseInt($('#product_added_price_' + idProduct).attr("data-price"));
            updateTotalProduct(2, totalCurrentItem);
            updateTotalPrice(2, totalPrice);
            $('#product_id_' + idProduct).remove();
        });


        function addProduct(idProduct, price) {

            var currentAmount = $('#product_added_amount_' + idProduct).text();

            $('#product_added_amount_' + idProduct).text(++currentAmount);
            $('#product_added_amount_' + idProduct).attr("data-item", currentAmount);

            var totalCurrentPrice = parseInt($('#product_added_price_' + idProduct).attr("data-price"));
            var afterPrice = totalCurrentPrice + price;
            var priceString = afterPrice.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
            $('#product_added_price_' + idProduct).attr("data-price", afterPrice);
            $('#product_added_price_' + idProduct).text(priceString);
        }

        function minusProduct(idProduct, price) {
            var currentAmount = $('#product_added_amount_' + idProduct).text();
            $('#product_added_amount_' + idProduct).text(--currentAmount);
            $('#product_added_amount_' + idProduct).attr("data-item", currentAmount);
            var totalCurrentPrice = parseInt($('#product_added_price_' + idProduct).attr("data-price"));
            var afterPrice = totalCurrentPrice - price;
            var priceString = afterPrice.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
            $('#product_added_price_' + idProduct).attr("data-price", afterPrice);
            $('#product_added_price_' + idProduct).text(priceString);
            if (currentAmount == 0) {
                $('#product_id_' + idProduct).remove();
            }

        }

        $(document).on('click', '.minusProduct', function () {
            var price = $(this).attr("data-price");
            var idProduct = $(this).attr("data-id");
            var nameProduct = $(this).attr("data-name");
            minusProduct(idProduct, parseInt(price));
            updateTotalProduct(2, 1);
            updateTotalPrice(2, price);
        });

        function updateTotalPrice(type, price) {
            var currentPrice = parseInt($('#totalPrice').attr("data-total-price"));
            var after = 0;
            if (type == 1) {
                after = currentPrice + price;
                $('#totalPrice').attr("data-total-price", after);
                var priceString = after.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
                $('#totalPrice').text(priceString);

            } else if (type = 2) {
                after = currentPrice - price;
                $('#totalPrice').attr("data-total-price", after);
                var priceString = after.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
                $('#totalPrice').text(priceString);
            }
            if (after > 0) {
                $('#completedOrder').css("display", "inline-block");
            } else {
                $('#completedOrder').css("display", "none");
            }
        }

        function updateTotalProduct(type, nums) {
            var totalItemCurrent = parseInt($('#totalItem').attr("data-total-item"));
            if (type == 1) {
                var after = totalItemCurrent + nums;
                $('#totalItem').attr("data-total-item", after);
                $('#totalItem').text(after);

            } else if (type = 2) {
                var after = totalItemCurrent - nums;
                $('#totalItem').attr("data-total-item", after);
                $('#totalItem').text(after);

            }
        }
    });

    $('#formEdit').on('submit', function (e) {
        console.log("submit");
        e.preventDefault();
        var formData = $('#formEdit').serializeArray();
        var data = {};
        $.each(formData, function (i, v) {
            data[v.name] = v.value;
        });
        var idsDish = [];
        var listNumberItem = [];
        $('.items').each(function (i, v) {
            idsDish.push(v.getAttribute("data-id"));
            listNumberItem.push(v.getAttribute("data-item"));
        });
        data['idsDish'] = idsDish;
        data['listNumberItem'] = listNumberItem;
        $.ajax({
            type: "POST",
            url: "/api/admin/order",
            // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            beforeSend: function () {
                $('.loader').css("display", "block");
            },
            success: function (response) {
                alert(response.message);
                $('.loader').css("display", "none");
                window.location.href = "/admin"
            }, error: function (response) {
                $('.loader').css("display", "none");
                alert(response.responseJSON.message);

            }
        });
    });

    $('#completedOrder').on('click', function () {
        $('#totalPrice2').val($('#totalPrice').text());
        var price = $('#totalPrice').attr("data-total-price");
        $('#totalPrice2').attr("data-price", price);
        $('#totalPricePaid').val($('#totalPrice').text());
    });
    $('#checkVoucher').on('click', function () {
        var voucherCode = $('#voucherCode').val();
        $.ajax({
            type: "GET",
            url: "/api/voucher/valid?code=" + voucherCode,
            // headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
            // data: JSON.stringify(data),
            // dataType: "json",
            contentType: "application/json",
            beforeSend: function () {
                $('.loader').css("display", "block");
            },
            success: function (response) {
                $('.loader').css("display", "none");
                $('#alertVoucher').text(response.data.discount + " % ");
                var totalPrice = parseInt($('#totalPrice').attr("data-total-price"));
                var discount = response.data.discount / 100;
                var totalPriceAfter = totalPrice - totalPrice * discount;
                $('#totalPricePaid').val(totalPriceAfter.toLocaleString('it-IT', {style: 'currency', currency: 'VND'}));
            }, error: function (response) {
                $('.loader').css("display", "none");
                $('#alertVoucher').text(response.responseJSON.message);
                var totalPrice = parseInt($('#totalPrice').attr("data-total-price"));
                $('#totalPricePaid').val(totalPrice.toLocaleString('it-IT', {style: 'currency', currency: 'VND'}));
            }
        });
    })
});