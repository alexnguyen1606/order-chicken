<%--
  Created by IntelliJ IDEA.
  User: HELLO
  Date: 25/11/2020
  Time: 8:33 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container-fluid py-3">
    <div class="row justify-content-between align-items-center">
        <div class="col-auto">
            <h4>Danh sách người dùng</h4>
        </div>

    </div>
    <div class="my-2">
        <div class="card card-body">
            <form id="edit-form">

                <input type="hidden" name="id" id="id">
                <input type="hidden" name="user.id" id="userId">
                <input type="hidden" name="user.idAccount" id="userIdAccount">
                <div class="">
                    <label>Tên tài khoản</label>
                    <input type="text" class="form-control" name="userName">
                </div>
                <div class="my-3">
                    <label>Mật khẩu</label>
                    <input type="password" class="form-control" name="password">
                </div>
                <div class="row my-3">
                    <div class="col">
                        <label>Họ và tên</label>
                        <input type="text" class="form-control" name="user.name" id="userName">
                    </div>
                    <div class="col">
                        <label>Số điện thoại</label>
                        <input type="text" class="form-control" name="user.phone" id="userPhone">
                    </div>
                </div>
                <div class="row my-3">
                    <div class="col">
                        <label>Địa chỉ</label>
                        <input type="text" class="form-control" name="user.address" id="userAddress">
                    </div>
                    <div class="col">
                        <label>Email</label>
                        <input type="text" class="form-control" name="user.email" id="userEmail">
                    </div>
                </div>
                <div class="my-3">
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
                <div class="my-3">
                    <div class="font-weight-bold mb-1">
                        Trạng thái
                    </div>
                    <label>
                        <input type="radio" name="status" class="status" value="1" checked>
                        Hoạt động
                    </label>
                    <label>
                        <input type="radio" name="status" class="status ml-2" value="0">
                        Khóa
                    </label>

                </div>
            </form>
            <div class="row">
                <div class="col-auto">
                    <a href="/admin/account/list" class="btn btn-warning">Hủy</a>
                </div>
                <div class="col-auto">
                    <a href="#" class="btn btn-primary" id="edit-btn">Thêm mới</a>
                </div>
            </div>
        </div>

    </div>
</div>
<script src="<c:url value='/admin/template/paging/jquery.twbsPagination.js'/>"></script>
<script src="/admin/template/paging/jquery.twbsPagination.min.js"></script>
<script src="<c:url value="/admin/js/user/edit.js"/>"></script>
