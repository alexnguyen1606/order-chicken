<%--
  Created by IntelliJ IDEA.
  User: HELLO
  Date: 27/11/2020
  Time: 9:35 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container">
    <div class="my-5">
        <h5 class="font-weight-bold">
            Thông tin tài khoản
        </h5>
        <div class="my-4">
            <ul class="nav nav-tabs" id="myTab" role="tablist">

                <li class="">
                    <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab"  aria-selected="true">Thông tin tài khoản</a>
                </li>
                <li class="">
                    <a class="nav-link " id="password-tab" data-toggle="tab" href="#password-content" role="tab"  aria-selected="false">Mật khẩu</a>
                </li>

            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="profile" role="tabpanel">
                    <form id="detail-form">

                        <input type="hidden" name="id" id="id">
                        <input type="hidden" name="user.id" id="userId">
                        <input type="hidden" name="user.idAccount" id="userIdAccount">
                        <div class="my-4">
                            <label class="font-weight-bold">Họ và tên:</label>
                            <input class="form-control" name="user.name" id="userName">
                        </div>
                        <div class="my-4">
                            <label class="font-weight-bold">Địa chỉ:</label>
                            <input class="form-control" name="user.address" id="userAddress">
                        </div>
                        <div class="my-4">
                            <label class="font-weight-bold">Số điện thoại:</label>
                            <input class="form-control" name="user.phone" id="userPhone">
                        </div>
                        <div class="my-4">
                            <label class="font-weight-bold">Email:</label>
                            <input class="form-control" name="user.email" id="userEmail">
                        </div>
                        <div class="my-4">
                            <div class="font-weight-bold mb-1">
                                Giới tính
                            </div>
                            <label>
                                <input type="radio" name="user.gender" class="gender" value="MALE" checked>
                                Nam
                            </label>
                            <label>
                                <input type="radio" name="user.gender" class="gender ml-2" value="FEMALE">
                                Nữ
                            </label>
                        </div>

                        <div class="my-4 text-center">
                            <button class="btn  btn-primary box-shadow px-5">Lưu</button>
                        </div>
                    </form>
                </div>
                <div class="tab-pane fade " id="password-content" role="tabpanel">
                    <form id="password-form">
                        <div class="my-4">
                            <label class="font-weight-bold">Mật khẩu cũ</label>
                            <input class="form-control" type="password" autocomplete="off" name="oldPassword" id="oldPassword">
                        </div>
                        <div class="my-4">
                            <label class="font-weight-bold">Mật khẩu:</label>
                            <input class="form-control" type="password" autocomplete="off" name="password" id="password">
                        </div>
                        <div class="my-4">
                            <label class="font-weight-bold">Nhập lại mật khẩu:</label>
                            <input class="form-control" name="repeatPassword" type="password" autocomplete="off" id="repeatPassword">
                        </div>
                        <div class="my-4 text-center">
                            <button class="btn  btn-primary box-shadow px-5">Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="/customer/js/account.js"></script>
