    <%@ page pageEncoding="utf-8" %>
        <%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

        <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="/" class="brand-link">
        <%--    <img src="https://vnpost.vnpt.edu.vn/assets/global/img/logo/logo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"--%>
        <%--    style="opacity: .8">--%>
        <span class="brand-text font-weight-light" style="font-size:18px;">VietNamPost E-LEARNING</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
        <!-- Sidebar user panel (optional) -->

        <!-- Sidebar Menu -->
        <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <!-- Add icons to the links using the .nav-icon class
        with font-awesome or any other icon font library -->
        <%--        <security:authorize access="hasAnyAuthority('ROLE_MOD','ROLE_SUPER_ADMIN')">--%>
        <li class="nav-item">
        <a href="/admin" class="nav-link">
        <i class="nav-icon fas fa-tachometer-alt"></i>
        <p>
        Bảng điều khiển

        </p>
        </a>
        </li>
        <li class="nav-item">
        <a href="/admin/order/waiting" class="nav-link">
        <i class="nav-icon fas fa-tachometer-alt"></i>
        <p>
        Đơn đặt

        </p>
        </a>
        </li>
        <li class="nav-item">
        <a href="/admin/order/accept" class="nav-link">
        <i class="nav-icon fas fa-tachometer-alt"></i>
        <p>
        Xử lý đơn

        </p>
        </a>
        </li>
        <li class="nav-item">
        <a href="/admin/order/completed" class="nav-link">
        <i class="nav-icon fas fa-tachometer-alt"></i>
        <p>
        Hoàn thành

        </p>
        </a>
        </li>
        <li class="nav-item">
        <a href="/admin/order/cancel" class="nav-link">
        <i class="nav-icon fas fa-tachometer-alt"></i>
        <p>
        Đã hủy

        </p>
        </a>
        </li>
        <li class="nav-item">
        <a href="/admin/dish/list" class="nav-link">
        <i class="nav-icon fas fa-tachometer-alt"></i>
        <p>
        Danh sách thực đơn

        </p>
        </a>
        </li>
        <li class="nav-item">
        <a href="/admin/dish-category/list" class="nav-link">
        <i class="nav-icon fas fa-tachometer-alt"></i>
        <p>
        Danh mục thực đơn

        </p>
        </a>
        </li>


        </ul>
        </li>

        </nav>
        <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
        </aside>

        <script src="/admin/template/plugins/jquery/jquery.min.js"></script>
        <!-- jQuery UI 1.11.4 -->
        <script src="/admin/template/plugins/jquery-ui/jquery-ui.min.js"></script>
        <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
        <script>
        $.widget.bridge('uibutton', $.ui.button)
        </script>
        <!-- Bootstrap 4 -->
        <script src="/admin/template/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
        <!-- ChartJS -->
        <script src="/admin/template/plugins/chart.js/Chart.min.js"></script>
        <!-- Sparkline -->
        <script src="/admin/template/plugins/sparklines/sparkline.js"></script>
        <!-- JQVMap -->
        <script src="/admin/template/plugins/jqvmap/jquery.vmap.min.js"></script>
        <script src="/admin/template/plugins/jqvmap/maps/jquery.vmap.usa.js"></script>
        <!-- jQuery Knob Chart -->
        <script src="/admin/template/plugins/jquery-knob/jquery.knob.min.js"></script>
        <!-- daterangepicker -->
        <script src="/admin/template/plugins/moment/moment.min.js"></script>
        <script src="/admin/template/plugins/daterangepicker/daterangepicker.js"></script>
        <script src="/admin/template/plugins/select2/js/select2.full.min.js"></script>

        <!-- Tempusdominus Bootstrap 4 -->
        <script src="/admin/template/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
        <!-- Summernote -->
        <script src="/admin/template/plugins/summernote/summernote-bs4.min.js"></script>
        <!-- overlayScrollbars -->
        <script src="/admin/template/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
        <!-- AdminLTE App -->
        <script src="/admin/template/dist/js/adminlte.js"></script>

        <script src="/admin/template/hill/js/common_unit.js"></script>