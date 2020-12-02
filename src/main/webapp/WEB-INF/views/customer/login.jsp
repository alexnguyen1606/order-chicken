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
<div class=" py-5 container-fluid" style="background:#000">
    <div class="container ">
        <div class="row mt-5 mb-5 justify-content-end">
            <div class="col">
                <img src="/customer/image/background-login.png"/>
            </div>
            <div class="form-menu col-md-5 ">
                <form action="/j_spring_security" id="formLogin" method="POST" class="menu">
                    <div class="text-center pt-5 mb-5">
                        <h3>Đăng nhập</h3>
                    </div>
                    <div class=" mt-5 col-md-12">
                        <div class="col-md-12 text-left">
                            <label class="">Tên tài khoản:</label>
                            <input name="username" type="text" style="background: #FFD7B3;border-radius: 3px;height: 48px;" class="form-control  col-md-12" placeholder=""
                                   autofocus="true"/>
                        </div>
                        <div class="col-md-12 my-2  text-left">
                            <label class="">Mật khẩu:</label>
                            <input name="password" style="background: #FFD7B3;border-radius: 3px;height: 48px;" type="password" class="form-control col-md-12" placeholder=""/>

                        </div>
                        <div class="col-md-12 my-4 ">
                            <div class="" style="width: 40% !important;margin: auto;">
                                <button class="btn btn-lg btn-block box-shadow" type="submit" id="login">Đăng nhập
                                </button>
                            </div>
                            <div class="text-center my-3 text-meta">
                                Bạn chưa có tài khoản?
                                <a href="#" data-toggle="modal" style="text-decoration-line: underline;"
                                   data-target="#register" class="color-primary">
                                    Đăng ký ngay
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="modal col-md-12 " id="register" role="dialog">
            <div class="modal-dialog modal-xl font-label " style="border-radius: 30px">
                <!-- Modal content-->
                <div class="modal-content" style="box-shadow: none">
                    <div class="modal-header color-theme-bg text-center" style="border:none;">
                        <div class="text-center col-md-11">
                            <h3 class=" ">Đăng ký tài khoản</h3>
                        </div>

                        <div class="col-auto">
                            <button type="button" class="close position-relative  btnClose" style="z-index: 15"
                                    data-dismiss="modal">&times;
                            </button>
                        </div>
                    </div>
                    <div class="modal-body" style="min-height: 400px">
                        <div class="container row mt-3 ml-3 mr-3">
                            <div class="row col-md-12">
                                <div class="panel-right col-md-12">
                                    <form id="formRegister" class="row justify-content-center" style="min-height: 400px">
                                        <div class="col-md-6 justify-content-center">
                                            <div class="col-md-12 justify-content-center my-2 text-left">
                                                <label class="">Họ và tên:</label>
                                                <input name="name" type="text" required class="form-control col-md-12"
                                                       placeholder=""/>
                                            </div>
                                            <div class="col-md-12  my-2 text-left">
                                                <label class="">Số điện thoại:</label>
                                                <input name="phone" type="text" required class="form-control col-md-12"
                                                       placeholder=""/>
                                            </div>

                                            <div class="col-md-12  my-2 text-left">
                                                <label class="">Email:</label>
                                                <input name="email" type="email"  class="form-control col-md-12"
                                                       placeholder=""/>
                                            </div>
                                            <div class="col-md-12  my-2 text-left">
                                                <label class="">Địa chỉ:</label>
                                                <textarea name="address" type="text" required class="form-control col-md-12" placeholder=""></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="col-md-12  my-2 text-left">
                                                <label class="">Tên tài khoản:</label>
                                                <input name="userName" type="text" required class="form-control col-md-12"
                                                       placeholder=""/>
                                            </div>
                                            <div class="col-md-12 my-2  text-left">
                                                <label class="">Mật khẩu:</label>
                                                <input name="password" type="password" required class="form-control col-md-12"
                                                       placeholder=""/>

                                            </div>
                                            <div class="col-md-12 my-2  text-left">
                                                <label class="">Nhập lại mật khẩu:</label>
                                                <input name="repeatPassword" type="password" required class="form-control col-md-12"
                                                       placeholder=""/>

                                            </div>
                                        </div>
                                        <div class="col-md-12 my-4">
                                            <div class="" style="width: 15% !important;margin: auto;">
                                                <button class="btn btn-lg btn-block box-shadow register " type="submit">
                                                    Đăng ký
                                                </button>
                                            </div>
                                            <div class="text-center my-3 text-meta">
                                                Bạn đã có tài khoản?
                                                <a href="#" data-dismiss="modal" style="text-decoration-line: underline;" class="color-primary">
                                                    Đăng nhập ngay
                                                </a>
                                            </div>
                                        </div>

                                    </form>
                                </div>


                            </div>
                        </div>
                    </div>
                    <%--<div class="modal-footer">--%>

                    <%--<button type="button" class="btn btn-default position-relative btnClose" style="z-index: 15"--%>
                    <%--data-dismiss="modal">Đóng--%>
                    <%--</button>--%>
                    <%--</div>--%>


                </div>

            </div>

            <%--</div>--%>
        </div>
    </div>
</div>
<script src="/admin/js/customer/register-account.js"></script>
<script src="/admin/js/customer/troll-login.js"></script>
