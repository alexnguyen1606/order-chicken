<%--
  Created by IntelliJ IDEA.
  User: HELLO
  Date: 15/04/2020
  Time: 9:38 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@include file="/WEB-INF/layouts/admin/layout/head.jsp" %>

<script src="/admin/template/hill/js/jquery-3.4.1.min.js"></script>

<script src="/admin/template/js/login.js"></script>
<style>
    .my-card {
        -webkit-box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.5);
        -moz-box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.5);
        box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.5);
    }
    h3 {
        color: #e7a61a;
        font-weight: bold;
    }

</style>
<html>
<head>
    <title>login</title>
</head>
<body>
<div class="w-100 d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class="col-sm-4 text-center py-4 px-5 my-card position-relative">
        <form action="/j_spring_security" id="formLogin" method="post" class="text-center">
            <h3 class="mb-4">ADMIN E-LEARNING</h3>
            <div class="form-group">
                <input type="text" class="form-control" id="userName" name="username" placeholder="Tên đăng nhập">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" pattern="[a-zA-Z0-9]+" title="Chỉ bao gồm chữ và số" id="password" name="password" placeholder="">
            </div>
            <div class="form-group justify-content-center align-items-center">
                <label class="mb-0">Nhớ mật khẩu</label>
                <input type="checkbox" name="remember-me" class="ml-2 form-control-sm"/>
            </div>
        </form>
        <button type="submit" class="btn btn-primary mx-auto" id="login">Đăng nhập</button>
        <div class="position-absolute position-cover spin display-none">
            <div class="position-absolute position-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
<script src="/admin/template/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="/admin/template/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>

</html>
