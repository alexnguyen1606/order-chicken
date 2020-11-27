<%--
  Created by IntelliJ IDEA.
  User: Alex
  Date: 11/26/2020
  Time: 10:16 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Chi tiết khuyến mại</title>
</head>
<body>

<input type="hidden" id="id" value="${id}">
<div class="container">
    <div class="my-5">
        <div class="my-3">
            <a href="/voucher/${id}" >   <img id="imgVoucher" src=""></a>
        </div>
        <div>
            <h3 id="code" class="font-weight-bold">Mã khuyến mãi</h3>
        </div>
        <div id="content">

        </div>
    </div>
</div>
<script src="/admin/js/customer/voucer-detail.js"></script>
</body>
</html>
