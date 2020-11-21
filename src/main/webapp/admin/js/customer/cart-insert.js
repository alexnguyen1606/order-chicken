jQuery(function ($) {
    $(document).ready(function () {
        $(document).on('click', '.btnAddToCard', function () {
            var currentPrice = parseInt($(this).attr("data-price"));
            var productId = parseInt($(this).attr("data-id"));
            var productName = $(this).attr("data-name");
            var urlImg = $(this).attr("data-url");
            var item = {};
            item.id = productId;
            item.price = currentPrice;
            item.name = productName;
            item.urlImg = urlImg;
            var cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
            if (cartItems == null) {
                cartItems = [];
            }
            var check = true;
            for (var i in cartItems) {
                if (cartItems[i].id == item.id) {
                    cartItems[i].quantity += 1;
                    cartItems[i].totalPrice += cartItems[i].price;
                    check = false;
                    break;
                }
            }
            if (check) {
                item.quantity = 1;
                item.totalPrice = item.price;
                cartItems.push(item);
            }
            sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateTotalProduct();
        });

        function updateTotalProduct() {
            var cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
            var totalPrice = 0;
            var totalProduct = 0;
            for (var i in cartItems) {
                totalProduct += cartItems[i].quantity;
                totalPrice += cartItems[i].totalPrice;
            }
            sessionStorage.setItem("totalProduct", JSON.stringify(totalProduct));
            sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
            $('.totalItem').text(totalProduct);
            $('#totalPrice').text(totalPrice.toLocaleString('it-IT', {style: 'currency', currency: 'VND'}));
        }

        $(document).on('click', '.btnMinusItem', function () {
            var productId = parseInt($(this).attr("data-id"));
            var cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
            for (var i in cartItems) {
                if (cartItems[i].id == productId) {
                    cartItems[i].quantity -= 1;
                    cartItems[i].totalPrice -= cartItems[i].price;
                    if (cartItems[i].quantity <= 0) {
                        cartItems = removeItemStorage(productId);
                    }
                    break;
                }
            }
            sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateTotalProduct();
            loadCartItem();
        });

        $(document).on('click', '.removeItem', function () {
            var id = $(this).attr("data-id");
            $('#row_' + id).remove();
            var cartItems = removeItemStorage(parseInt(id));
            sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateTotalProduct();
            loadCartItem();
        });

        $(document).on('click', '.incrementProduct', function () {
            var productId = parseInt($(this).attr("data-id"));
            var cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
            for (var i in cartItems) {
                if (cartItems[i].id == productId) {
                    cartItems[i].quantity += 1;
                    cartItems[i].totalPrice += cartItems[i].price;
                    break;
                }
            }
            ;
            sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateTotalProduct();
            loadCartItem();
        });

        function removeItemStorage(id) {
            var cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
            var cartItemsRemove = [];
            for (var i in cartItems) {
                if (cartItems[i].id != id) {
                    cartItemsRemove.push(cartItems[i]);
                }
            }
            ;
            return cartItemsRemove;
        }

        function loadCartItem() {
            var cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
            var row = '';
            $.each(cartItems, function (i, v) {
                var totalPrice = v.totalPrice.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
                var currentPrice = v.price.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
                ;
                row += '<tr id="row_' + v.id + '">';
                row += '<td class="text-center">' + v.name + '</td>';
                row += '<td class="text-center">' + currentPrice + '</td>';
                row += '<td class="text-center row justify-content-center">';
                row += '<div class="incrementProduct" data-id=' + v.id + '><i class="fa fa-plus "></i></div>';
                row += '<div class="quantity"><div class="pl-1 pr-1 items mt-1" >' + v.quantity + '</div></div>';
                row += '<div class="btnMinusItem" data-id=' + v.id + '><i class="fa fa-minus "></i></div>';
                row += '</td>';
                row += '<td class="text-center"><p class="totalPricePerProduct" >' + totalPrice + '</p></td>';
                row += '<td class="text-center"><a class="removeItem text-center" data-id="' + v.id + '">Xóa</a></td>';
                row += '</tr>';
            });
            if (cartItems.length > 0) {
                $('#completedOrder').css("display", "inline-block")
            } else {
                $('#completedOrder').css("display", "none")
            }
            $('#productAdded').empty();
            $('#productAdded').append(row);
        }

        loadCartItem();
        getTotal();

        function getTotal() {
            var totalProduct = parseInt(sessionStorage.getItem("totalProduct"));
            var totalPrice = parseInt(sessionStorage.getItem("totalPrice"));
            if (totalProduct!=null){
                $('.totalItem').text(totalProduct);
            }
            if (totalPrice!=null){
                $('#totalPrice').text(totalPrice.toLocaleString('it-IT', {style: 'currency', currency: 'VND'}));
            }

        }
    });
});