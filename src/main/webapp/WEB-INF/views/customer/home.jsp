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
    <title>Title</title>
</head>
<body>
<link rel="stylesheet" href="/customer/css/home.css">

<div class="vh-100 d-flex flex-column">
    <img src="<c:url value="/customer/image/background-home.png"/>" class="position-absolute position-top-center"/>
    <div class="menu">
        <div class="container">
            <div class="row align-items-center justify-content-between">
                <div class="col-auto">

                    <a href="/"> <img src="/admin/image/header_logo_x1.png"></a>
                </div>
                <div class="col-auto">
                    <div class="row">
                        <div class="col-auto">
                            <a href="/product/list" class="menu-item reverse">Thực Đơn </a>

                        </div>
                        <div class="col-auto">
                            <a href="/voucher/list" class="menu-item reverse">Khuyến Mãi</a>
                        </div>
                    </div>
                </div>
                <div class="col-auto">
                    <a href="/login" class="btn btn-primary">
                        Đăng nhập
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="container height-100 ">
            <div class="row height-100 align-items-center">
                <div class="col-xl-5 col-4">
                    <h1 class="font-secondary color-secondary">
                        Ăn miếng gà cay tâm hồn thêm bay
                    </h1>
                    <div class="my-4">
                        Các thành phần gia vị được hoà trộn hoàn hảo với từng lớp bột phủ lên miếng gà rán được nhào nặn công phu bằng tay, cho ra đời những món ăn ngon miệng và đậm đà khó quên... Với tất cả mọi nỗ lực và tâm huyết này, chúng tôi hy vọng sẽ mang đến bạn một trải nghiệm ẩm thực thật phong phú và sự hài lòng tuyệt đối
                    </div>
                    <div>
                        <a href="/product/list" class="btn btn-primary box-shadow">
                            ĐẶT HÀNG NGAY
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
