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

                <li class="nav-item">
                    <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab"  aria-selected="true">Thông tin tài khoản</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " id="password-tab" data-toggle="tab" href="#password" role="tab"  aria-selected="false">Mật khẩu</a>
                </li>

            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="profile" role="tabpanel">profile</div>
                <div class="tab-pane fade " id="password" role="tabpanel">password</div>
            </div>
        </div>
    </div>
</div>
