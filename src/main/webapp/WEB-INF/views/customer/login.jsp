<%--
  Created by IntelliJ IDEA.
  User: Alex
  Date: 11/19/2020
  Time: 12:48 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<link rel="stylesheet" href="/customer/css/login.css">
<div class="my-5 py-5 container-fluid" style="background:#000">
    <div class="container ">
        <div class="row justify-content-end">
            <div class="col">
                <img src="/customer/image/background-login.png" />
            </div>
            <div class="form-menu col-md-5">
                <form action="/j_spring_security" id="formLogin" method="POST" class="menu">
                    <div class="text-center pt-5 mb-5">
                        <h3>Đăng nhập</h3>
                    </div>
                    <div class=" mt-5 col-md-12">
                       <div class="col-md-12 text-left">
                           <label class="">Tên tài khoản:</label>
                           <input name="username" type="text" class="form-control col-md-12" placeholder=""
                                  autofocus="true"/>
                       </div>
                        <div class="col-md-12 my-2  text-left">
                            <label class="">Mật khẩu:</label>
                            <input name="password" type="password" class="form-control col-md-12" placeholder=""/>

                        </div>
                        <div class="col-md-12 my-4">
                            <div style="width: 40% !important;margin: auto;">
                                <button class="btn btn-lg btn-block box-shadow" type="submit" id="login">Đăng nhập</button>
                            </div>
                            <div class="text-center my-3 text-meta">
                                Bạn chưa có tài khoản?
                                <a href="/registration" class="color-primary">
                                    Đăng ký ngay
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
