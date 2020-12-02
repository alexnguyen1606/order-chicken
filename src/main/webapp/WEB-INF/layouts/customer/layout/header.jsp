<%--
  Created by IntelliJ IDEA.
  User: Alex
  Date: 11/19/2020
  Time: 12:25 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page pageEncoding="utf-8" %>
<meta charset="utf-8">
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<nav class="navbar navbar-expand-lg  bg-header title-header" style="">
    <div class="container" style="max-height:100%">
            <div class="col-auto position-relative">

                <a href="/"> <img class="position-absolute" style="    top: -30px;" src="/admin/image/header_logo_x1.png"></a>


            </div>
            <div class="col-auto">
                <ul class="navbar-nav mr-auto title-header d-flex">
                    <li class="nav-item ${product}">
                        <a class="nav-link title-header" href="/product/list">Thực đơn<span class="sr-only"></span></a>
                    </li>
                    <li class="nav-item ${voucher}">
                        <a class="nav-link" href="/voucher/list">Khuyến mãi</a>
                    </li>
                </ul>
            </div>
            <div class="col-auto">
                <ul class="navbar-nav mr-auto title-header d-flex justify-content-end">
                    <sec:authorize access="isAuthenticated()">
                        <li class="nav-item position-relative " style="display: table;width: fit-content">
                            <div>
                                <a class="nav-link title-header position-relative" href="/cart/list"><img src="/admin/image/shopping_card.png">
                                </a>
                            </div>
                            <div class="position-absolute totalItem text-center" id="totalProduct" >0</div>
                        </li>
                    </sec:authorize>
                    <li class="nav-item" style="display: table;width: fit-content">
                        <a class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                            <sec:authorize access="isAuthenticated()">
                                <security:authentication property="principal.username" />

                            </sec:authorize>
                        </a>
                        <div class="dropdown-menu" id="" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="/order/list">Đơn hàng</a>
                            <a class="dropdown-item" href="/account/detail">Thông tin cá nhân</a>
                          <sec:authorize access="hasAuthority('ADMIN')">
                              <a class="dropdown-item" href="/admin">Quản trị</a>
                          </sec:authorize>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="/logout">Đăng Xuất</a>
                        </div>
                    </li>
                </ul>
            </div>

    </div>

</nav>