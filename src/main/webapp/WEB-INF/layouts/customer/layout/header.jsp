<%--
  Created by IntelliJ IDEA.
  User: Alex
  Date: 11/19/2020
  Time: 12:25 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page pageEncoding="utf-8" %>
<meta charset="utf-8">
<nav class="navbar navbar-expand-lg  bg-header title-header" style="">
    <div class="col-md-12 d-flex justify-content-around pl-5 pr-5">
        <div class="col-md-6 row  position-relative">
            <div class="col-md-6">

                <a href="/"> <img class="position-absolute" style="left: 100px" src="/admin/image/header_logo_x1.png"></a>

            </div>
            <div class="col-md-6">
                <ul class="navbar-nav mr-auto title-header d-flex justify-content-end">
                    <li class="nav-item ${product}">
                        <a class="nav-link title-header" href="/product/list">Sản phẩm<span class="sr-only"></span></a>
                    </li>
                    <li class="nav-item ${voucher}">
                        <a class="nav-link" href="/voucher/list">Khuyến mãi</a>
                    </li>

                </ul>
            </div>
        </div>
        <div class="col-md-6">
            <ul class="navbar-nav mr-auto title-header d-flex justify-content-end">
                <li class="nav-item " style="width: 100px">
                    <a class="nav-link title-header" href="/cart/list"><img src="/admin/image/shopping_card.png"></a>
                </li>
                <li class="nav-item" style="width: 100px">
                    <a class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">Alex</a>
                    <div class="dropdown-menu" id="" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</nav>