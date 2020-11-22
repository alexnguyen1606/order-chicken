    <%@ page pageEncoding="utf-8" %>

        <div class="wrapper">

        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
        <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>

        </ul>

        <!-- SEARCH FORM -->
        <form class="form-inline ml-3" id="formSearch">
        <div class="input-group ">
        <button type="submit" style="padding: unset;margin: unset;border:0" class="btn input-group-addon"><i class="fas fa-search" style="    width: 38px;
            height: 100%;
            text-align: center;
            line-height: 38px;background-color: #CCCCCC;
            "></i></button>
        <input type="search" id="search" class="form-control" name="search" >
        </div>
        <%--        <div class="input-group-append">--%>
        <%--          <button class="btn btn-navbar" type="submit">--%>
        <%--            --%>
        <%--          </button>--%>
        <%--        </div>--%>
        </form>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">

        <!-- Messages Dropdown Menu -->

        <!-- Notifications Dropdown Menu -->
        <li class="nav-item dropdown">

        <a href="/admin/order/create" class="btn btn-primary float-left" >Tạo đơn </a>
        <a href="/admin/logout" class="delete btn btn-danger float-left" data-confirm="Bạn có muốn đăng xuất khỏi hệ
        thống ? ">Đăng Xuất </a>

        </li>

        </ul>
        </nav>
        </div>