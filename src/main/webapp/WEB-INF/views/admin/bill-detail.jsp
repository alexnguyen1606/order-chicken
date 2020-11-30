<%--
  Created by IntelliJ IDEA.
  User: Alex
  Date: 11/30/2020
  Time: 8:36 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Hóa đơn</title>
    <link rel="stylesheet" href="/admin/css/admin/bill.css">
</head>
<body>
<input type="hidden" id="id" value="${id}">
<div class="container">
    <div class="col-md-12">
        <div class="row">
            <div class="col-md-12 top-bill">
                <div class="title ">
                    <h3 >pohachick</h3>
                    <h6>Địa chỉ:5 Phạm Hùng
                        Mỹ Đình
                        Từ Liêm
                        Hà Nội</h6>
                    <h6>Điện thoại:0384066197</h6>
                    <h6 class="orderId">Số hóa đơn</h6>
                    <h6 class="createdDate">Thời gian :</h6>
                </div>
                <div class="col-md-12">
                    <div class="col-12 text-left">
                        <p class="name">Tên khách hàng</p>
                        <p  class="phone">Số điện thoại</p>
                        <p class="address">Địa chỉ:</p>
                    </div>
                </div>
                <div class="col-md-12">
                    <table class="w-100 table " id="tableItem">
                        <thead>
                        <tr>
                            <th style="text-align: center;border: none">Tên sản phẩm</th>
                            <th style="text-align: center;border: none">Đơn giá</th>
                            <th style="text-align: center;border: none">Số lượng</th>
                            <th style="text-align: center;border: none" class="d-sm-block d-none">Thành tiền</th>
                        </tr>
                        </thead>
                        <tbody id="productOrdered">

                        </tbody>

                    </table>
                    <div class="row">
                        <div class="col-6 text-center">
                            <span class="payment"></span>

                        </div>
                        <div class="col-6 text-center">
                            <span class="totalPrice"></span>

                        </div>
                    </div>
                    <p style="text-align: center" class="my-5">Cảm ơn và hẹn gặp lại</p>
                </div>

            </div>
            <div class="col-md-12 bottom-bill">
                <div class="title">
                    <h3 >pohachick</h3>
                    <h6>Địa chỉ:5 Phạm Hùng
                        Mỹ Đình
                        Từ Liêm
                        Hà Nội</h6>
                    <h6>Điện thoại:0384066197</h6>
                    <h6 class="orderId">Số hóa đơn</h6>
                    <h6 class="createdDate">Thời gian :</h6>
                </div>
                <div class="col-md-12">
                    <div class="col-12 text-left">
                        <p class="name">Tên khách hàng</p>
                        <p  class="phone">Số điện thoại</p>
                        <p class="address">Địa chỉ</p>
                    </div>
                    <div class="col-12 row">
                        <div class="col-6 text-center">
                            <span class="payment"></span>
                        </div>
                        <div class="col-6 text-center">
                            <span class="note"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="/admin/js/bill-detail.js"></script>
</body>
</html>
