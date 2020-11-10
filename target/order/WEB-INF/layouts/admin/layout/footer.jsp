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
        <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN',
        '/admin/setting/user',
        '/admin/setting/permission',
        '/admin/setting/permission/list'
        )">
            <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-cog"></i>
            <p>
            Cài đặt chung
            <i class="fas fa-angle-left right"></i>
            </p>
            </a>
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_MODE')">
                <ul class="nav nav-treeview">
                <li class="nav-item">
                <a href="/admin/poscode/list" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Danh sách đơn vị</p>
                </a>
                </li>

                </ul>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN')">
                <ul class="nav nav-treeview">
                <li class="nav-item">
                <a href="/admin/employee/list" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Danh sách nhân viên</p>
                </a>
                </li>

                </ul>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN')">
                <ul class="nav nav-treeview">
                <li class="nav-item">
                <a href="/admin/setting/param" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Các tham số</p>
                </a>
                </li>

                </ul>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN')">
                <ul class="nav nav-treeview">
                <li class="nav-item">
                <a href="/form/home" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Form thông tin</p>
                </a>
                </li>

                </ul>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/setting/user')">
                <ul class="nav nav-treeview">
                <li class="nav-item">
                <a href="/admin/setting/user" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Quản trị người dùng</p>
                </a>
                </li>

                </ul>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/setting/permission')">
                <ul class="nav nav-treeview">
                <li class="nav-item">
                <a href="/admin/setting/permission" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Phân vai trò quản trị</p>
                </a>
                </li>

                </ul>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/setting/permission/list')">
                <ul class="nav nav-treeview">
                <li class="nav-item">
                <a href="/admin/setting/permission/list" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Quản lý nhóm chức năng</p>
                </a>
                </li>

                </ul>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN')">
                <ul class="nav nav-treeview">
                <li class="nav-item">
                <a href="/admin/setting/static-page" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Quản lý trang tĩnh</p>
                </a>
                </li>

                </ul>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN')">
                <ul class="nav nav-treeview">
                <li class="nav-item">
                <a href="/admin/setting/slideshow" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Quản lý Slide Show</p>
                </a>

                </li>

                </ul>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN')">
                <ul class="nav nav-treeview">
                <li class="nav-item">
                <a href="/admin/setting/role-course" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Quản lý Nhóm giảng viên</p>
                </a>

                </li>

                </ul>
            </sec:authorize>
            </li>
        </sec:authorize>
        <sec:authorize access="hasAnyAuthority(
        'ROLE_SUPER_ADMIN',
        '/admin/course/index',
        '/admin/courseCategory',
        '/admin/course/user'
        )">
            <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-table"></i>
            <p>
            Quản trị khóa học
            <i class="fas fa-angle-left right"></i>
            </p>
            </a>

            <ul class="nav nav-treeview">
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/course/index')">
                <li class="nav-item">
                <a href="/admin/course/index" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Danh sách khóa học</p>
                </a>
                </li>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('TCT')">
                <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/courseCategory')">
                    <li class="nav-item">
                    <a href="/admin/courseCategory" class="nav-link">
                    <i class="fa fa-folder-o nav-icon"></i>
                    <p>Danh mục khóa học</p>
                    </a>
                    </li>
                </sec:authorize>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/course/user')">
                <li class="nav-item">
                <a href="/admin/course/user" class="nav-link">
                <i class="far fa-user nav-icon"></i>
                <p>Danh sách học viên</p>
                </a>
                </li>
            </sec:authorize>
            </ul>
            </li>
        </sec:authorize>
        <sec:authorize access="hasAnyAuthority(
        'ROLE_SUPER_ADMIN',
        '/admin/news/list',
        '/admin/news/category/list',
        '/admin/events/category/list'
        )">
            <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-table"></i>
            <p>
            Quản trị blog
            <i class="fas fa-angle-left right"></i>
            </p>
            </a>
            <ul class="nav nav-treeview">
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/news/list')">
                <li class="nav-item">
                <a href="/admin/news/list" class="nav-link">
                <i class="far fa-newspaper nav-icon"></i>
                <p>Danh sách tin tức</p>
                </a>
                </li>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('TCT')">
                <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/news/category/list')">
                    <li class="nav-item">
                    <a href="/admin/news/category/list" class="nav-link">
                    <i class="far fa-folder nav-icon"></i>
                    <p>Danh mục tin tức</p>
                    </a>
                    </li>
                </sec:authorize>
            </sec:authorize>

            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/events/list')">
                <li class="nav-item">
                <a href="/admin/events/list" class="nav-link">
                <i class="far fa-newspaper-o nav-icon"></i>
                <p>Danh sách sự kiện</p>
                </a>
                </li>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('TCT')">
                <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/events/category/list')">
                    <li class="nav-item">
                    <a href="/admin/events/category/list" class="nav-link">
                    <i class="far fa-folder nav-icon"></i>
                    <p>Danh mục sự kiện</p>
                    </a>
                    </li>
                </sec:authorize>
            </sec:authorize>
            </ul>
            </li>
            </li>
        </sec:authorize>
        <sec:authorize access="hasAnyAuthority(
        'ROLE_SUPER_ADMIN','/admin/competition/list','/admin/competition/category'
        )">
            <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-book"></i>
            <p>
            Quản lý thi
            <i class="fas fa-angle-left right"></i>
            </p>
            </a>
            <ul class="nav nav-treeview">
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/competition/list')">
                <li class="nav-item">
                <a href="/admin/competition/list" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Danh sách cuộc thi</p>
                </a>
                </li>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('TCT')">
                <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/competition/category')">
                    <li class="nav-item">
                    <a href="/admin/competition/category" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Danh mục cuộc thi</p>
                    </a>
                    </li>
                </sec:authorize>
            </sec:authorize>

            </ul>
            </li>
        </sec:authorize>

        <sec:authorize access="hasAnyAuthority(
        'ROLE_SUPER_ADMIN','/admin/competition/category','/admin/test/testkit'
        )">
            <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-book"></i>
            <p>
            Ngân hàng đề thi
            <i class="fas fa-angle-left right"></i>
            </p>
            </a>
            <ul class="nav nav-treeview">
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/competition/category')">
                <li class="nav-item">
                <a href="/admin/test/list" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Danh sách đề thi</p>
                </a>
                </li>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/test/testkit')">
                <li class="nav-item">
                <a href="/admin/test/testkit" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Danh sách bộ đề</p>
                </a>
                </li>
            </sec:authorize>
            </ul>
            </li>
        </sec:authorize>
        <sec:authorize access="hasAnyAuthority(
        'ROLE_SUPER_ADMIN','/admin/question/list','/admin/question/category'
        )">
            <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-book"></i>
            <p>
            Ngân hàng câu hỏi
            <i class="fas fa-angle-left right"></i>
            </p>
            </a>
            <ul class="nav nav-treeview">
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/question/list')">
                <li class="nav-item">
                <a href="/admin/question/list" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Danh sách câu hỏi</p>
                </a>
                </li>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('TCT')">
                <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/question/category')">
                    <li class="nav-item">
                    <a href="/admin/question/category" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Danh mục câu hỏi</p>
                    </a>
                    </li>
                </sec:authorize>
            </sec:authorize>
            </ul>
            </li>
        </sec:authorize>
        <sec:authorize access="hasAnyAuthority(
        'ROLE_SUPER_ADMIN','/admin/document/category','/admin/document/category/list'
        )">
            <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-copy"></i>
            <p>
            Quản trị tài liệu
            <i class="fas fa-angle-left right"></i>
            </p>
            </a>
            <ul class="nav nav-treeview">
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/document/category')">
                <li class="nav-item">
                <a href="/admin/document/category" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Danh sách tài liệu</p>
                </a>
                </li>
            </sec:authorize>
            <sec:authorize access="hasAnyAuthority('TCT')">
                <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/document/category/list')">
                    <li class="nav-item">
                    <a href="/admin/document/category/list" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Danh mục tài liệu</p>
                    </a>
                    </li>
                </sec:authorize>
            </sec:authorize>
            </ul>
            </li>
        </sec:authorize>
        <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/courseware')">
            <%--            <li class="nav-item has-treeview">--%>
            <%--            <a href="#" class="nav-link">--%>
            <%--            <i class="nav-icon far fa-plus-square"></i>--%>
            <%--            <p>--%>
            <%--            Kho học liệu--%>
            <%--            <i class="fas fa-angle-left right"></i>--%>
            <%--            </p>--%>
            <%--            </a>--%>
            <%--            <ul class="nav nav-treeview">--%>

            <%--            <li class="nav-item">--%>
            <%--            <a href="/admin/courseware/all" class="nav-link">--%>
            <%--            <i class="far fa-circle nav-icon"></i>--%>
            <%--            <p>Tất cả</p>--%>
            <%--            </a>--%>
            <%--            </li>--%>

            <%--&lt;%&ndash;            <li class="nav-item">&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <a href="/admin/courseware/scorm" class="nav-link">&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <i class="far fa-circle nav-icon"></i>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <p>Bài giảng Scorm</p>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            </a>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            </li>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <li class="nav-item">&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <a href="/admin/courseware/video/index" class="nav-link">&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <i class="far fa-circle nav-icon"></i>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <p>Bài giảng Multimedia </p>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            </a>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            </li>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <li class="nav-item">&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <a href="/admin/courseware/freelectures/index" class="nav-link">&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <i class="far fa-circle nav-icon"></i>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <p>Bài giảng Tự Do</p>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            </a>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            </li>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <li class="nav-item">&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <a href="/admin/courseware/powerpoint/index" class="nav-link">&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <i class="far fa-circle nav-icon"></i>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            <p>Bài giảng Office</p>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            </a>&ndash;%&gt;--%>
            <%--&lt;%&ndash;            </li>&ndash;%&gt;--%>


            <%--            </ul>--%>
            <%--            </li>--%>
            <li class="nav-item">
            <a href="/admin/courseware/all" class="nav-link">
            <i class="nav-icon far fa-plus-square"></i>
            <p>
            Kho học liệu
            </p>
            </a>
            </li>
        </sec:authorize>
        <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN')">
            <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
            <i class="fas fa-comments"></i>
            <p>
            Quản lý helpdesk
            <i class="fas fa-angle-left right"></i>
            </p>
            </a>
            <ul class="nav nav-treeview">

            <li class="nav-item">
            <a href="/admin/helpdesk/index2" class="nav-link">
            <i class="far fa-circle nav-icon"></i>
            <p>Quản lý thư liên hệ</p>
            </a>
            </li>

            </ul>
            <ul class="nav nav-treeview">

            <li class="nav-item">
            <a href="/admin/helpdesk/index" class="nav-link">
            <i class="far fa-circle nav-icon"></i>
            <p>Quản lý đăng ký email</p>
            </a>
            </li>

            </ul>

            </li>
        </sec:authorize>
        <sec:authorize access="hasAnyAuthority(
        'ROLE_SUPER_ADMIN','/admin/report/list'
        )">
            <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-chart-pie"></i>
            <p>
            Thống kê báo cáo
            <i class="fas fa-angle-left right"></i>
            </p>
            </a>
            <ul class="nav nav-treeview">
            <sec:authorize access="hasAnyAuthority('ROLE_SUPER_ADMIN','/admin/report/list')">
                <li class="nav-item">
                <a href="/admin/report/list" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Các loại báo cáo</p>
                </a>
                </li>
            </sec:authorize>
            </ul>
            </li>
        </sec:authorize>
        <sec:authorize access="hasAuthority('ROLE_TEACHER')">
            <li class="nav-item ">
            <a href="/admin/my-course" class="nav-link">
            <i class="far fa-star"></i>
            <p>
            Khóa học của tôi
            </p>
            </a>

            </li>
        </sec:authorize>


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
        <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
        <%--   <script src="/template/dist/js/pages/dashboard.js"></script>--%>
        <!-- AdminLTE for demo purposes -->
        <script src="/admin/template/dist/js/demo.js"></script>
        <%--<script src="/template/hill/js/jquery-3.4.1.min.js"></script>--%>

        <%-- <script src="/template/hill/js/roundtest/roundTestJs.js"></script>
         <script src="/template/hill/js/checkAll.js"></script>
         <script src=/template/hil<script src="/template/hill/js/jquery-3.4.1.min.js"></script>l/js/commom.js></script>--%>

        <script src="/admin/template/hill/js/common_unit.js"></script>