<%--
  Created by IntelliJ IDEA.
  User: Alex
  Date: 11/19/2020
  Time: 12:48 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
    <title>Đăng nhập</title>
</head>
<body>

<link rel="stylesheet" href="/customer/css/login.css">

<div class="container">
    <div class="col-md-12">
        <div class="form-menu col-md-5">
            <form action="/j_spring_security" id="formLogin" method="POST" class="menu">
                <div class="text-center pt-5 mb-5">
                    <h3>Đăng nhập</h3>
                </div>
                <div class=" mt-5 col-md-12">
                   <div class="col-md-12 text-left">
                       <label class="col-md-6">Tên tài khoản:</label>
                       <input name="username" type="text" class="form-control col-md-12" placeholder=""
                              autofocus="true"/>
                   </div>
                    <div class="col-md-12  text-left">
                        <label class="col-md-6">Mật khẩu:</label>
                        <input name="password" type="password" class="form-control col-md-12" placeholder=""/>

                    </div>
                    <div class="col-md-12">
                        <div style="width: 40% !important;margin-left: 30% !important;">
                            <button class="btn btn-lg btn-block" type="submit" id="login">Đăng nhập</button>
                        </div>
                        <h4 class="text-center"><a href="/registration">Quên mật khẩu</a></h4>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>
