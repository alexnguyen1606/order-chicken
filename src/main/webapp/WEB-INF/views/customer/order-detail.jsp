<%--
  Created by IntelliJ IDEA.
  User: Alex
  Date: 11/19/2020
  Time: 4:14 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>Chi tiết giỏ hàng</title>
    <link rel="stylesheet" href="/admin/css/customer/cart.css"/>
</head>
<body>
<input type="hidden" id="id" value="${id}">
<div class="container mt-5">
    <div class="row">
        <div class="col-md-12" id="list-product">
            <div class="col-md-12">
                <div class="col-md-12 text-left title-category">
                    <h3 class="text-uppercase">Đơn hàng</h3>
                </div>
                <div class="col-12 row" id="order-info">
                    <div class="col-md-6">
                        <p id="name"></p>
                        <p id="payment"></p>
                        <p id="status"></p>
                    </div>
                    <div class="col-md-6">
                        <p id="address"></p>
                        <p id="phone"></p>
                    </div>
                </div>
                <div class="col-md-12">
                    <table class="w-100 table table-hover" id="tableItem">
                        <thead>
                        <tr style="border-top: none">
                            <th style="border-top: none">Tên sản phẩm</th>
                            <th class="text-center" style="border-top: none">Giá</th>
                            <th class="text-center" style="border-top: none">Số lượng</th>
                            <th class="text-center" style="border-top: none" class="d-sm-block d-none">Thành tiền</th>
                        </tr>
                        </thead>
                        <tbody id="orderDetailList">

                        </tbody>

                    </table>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="col-6 text-left row">
                                <h5>Tổng sản phẩm : </h5>
                                <h5 id="totalItemDetail" class="totalItem" data-total-item="0">0</h5>
                            </div>
                            <div class="col-6 text-left row">
                                <h5>Tổng tiền :</h5>
                                <h5 id="totalPriceDetail" data-total-price="0">0 đ</h5>
                            </div>
                        </div>
                        <div class="col-md-6 text-center">
                            <button onclick="window.location.href='/product/list'"
                                    class="btn  text-uppercase continousOrder mr-4">Tiếp tục mua
                            </button>
                            <button class="btn text-uppercase completedOrder" id="cancelOrder" data-toggle="modal"
                                    data-target="#modalSubmit" style="display: none">Hủy đơn
                            </button>
                        </div>
                        <div class="col-md-6">
                            <p style="color: red;font-size: 14px; margin: 0px"> Lưu ý:</p>
                            <p style="color: red;font-size: 14px; margin: 0px">1. Cửa hàng chỉ bán ship (quý khách có
                                thể tự lấy đồ tại cửa hàng)</p>
                            <p style="color: red;font-size: 14px; margin: 0px">2. Đơn đặt hàng chỉ có thể hủy khi cửa
                                hàng chưa nhận đơn</p>
                            <p style="color: red;font-size: 14px; margin: 0px">3. Liên hệ 0339673626 để được hỗ trợ</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
    <%--<div class="col-md-12">--%>
</div>
<script src="/admin/js/customer/order-detail.js"></script>
</body>
</html>


