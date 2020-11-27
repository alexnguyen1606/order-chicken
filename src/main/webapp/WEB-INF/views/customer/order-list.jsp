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
    <title>Giỏ hàng</title>
    <link rel="stylesheet" href="/admin/css/customer/cart.css"/>
</head>
<body>
<div class="container mt-5">
    <div class="row">
        <div class="col-md-12" id="list-product">
            <div class="col-md-12">
                <div class="col-md-12 text-left title-category">
                    <h3 class="text-uppercase"> Danh sách đơn đã đặt</h3>
                </div>
                <div class="col-md-12">
                    <table class="w-100 table table-hover" id="tableItem">
                        <thead>
                        <tr style="border-top: none">
                            <th style="border-top: none">Mã đơn</th>
                            <th style="border-top: none">Tổng tiền</th>
                            <th style="border-top: none">Tổng sản phẩm</th>
                            <th style="border-top: none" class="d-sm-block d-none">Thời gian nhận
                                hàng
                            </th>
                            <th style="border-top: none">Trạng thái</th>
                            <th class="text-left" style="border-top: none"></th>
                        </tr>
                        </thead>
                        <tbody id="orderedList">

                        </tbody>

                    </table>
                    <div class="row">
                        <div class="col-md-6">
                            <p style="color: red;font-size: 14px; margin: 0px"> Lưu ý:</p>
                            <p style="color: red;font-size: 14px; margin: 0px">1. Cửa hàng chỉ bán ship (quý khách có
                                thể tự lấy đồ tại cửa hàng)</p>
                            <p style="color: red;font-size: 14px; margin: 0px">2. Đơn đặt hàng chỉ có thể hủy khi cửa
                                hàng chưa nhận đơn</p>
                            <p style="color: red;font-size: 14px; margin: 0px">3. Liên hệ 0339673626 để được hỗ trợ</p>
                        </div>
                        <div class="col-md-6 text-center">
                            <button onclick="window.location.href='/product/list'"
                                    class="btn  text-uppercase continousOrder mr-4">Tiếp tục mua
                            </button>
                            <button class="btn text-uppercase completedOrder" id="completedOrder" data-toggle="modal"
                                    data-target="#modalSubmit" style="display: none">Đặt hàng
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <%--<div class="col-md-12">--%>
</div>
<script src="/admin/js/customer/order-list.js"></script>
</body>
</html>


