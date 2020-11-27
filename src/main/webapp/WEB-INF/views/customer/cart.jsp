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
                    <h3> GIỎ HÀNG CỦA BẠN</h3>
                    <p style="color: red;font-size: 14px;">(*)Lưu ý: Cửa hàng chỉ bán ship(quý khách có thể tự lấy đồ tại cửa hàng)</p>
                </div>
                <div class="col-md-12">
                    <table class="w-100 table table-hover" id="tableItem" >
                        <thead>
                        <tr style="border-top: none">
                            <th style="text-align: center;border-top: none">Tên sản phẩm</th>
                            <th style="text-align: center;border-top: none">Đơn giá</th>
                            <th style="text-align: center;border-top: none">Số lượng</th>
                            <th style="text-align: center;border-top: none" class="d-sm-block d-none">Thành tiền</th>
                            <th class="text-left" style="border-top: none">Thao tác</th>
                        </tr>
                        </thead>
                        <tbody id="productAdded">

                        </tbody>

                    </table>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="col-6 text-left row">
                                <h5>Tổng sản phẩm : </h5>
                                <h5 id="totalItem" class="totalItem" data-total-item="0">0</h5>
                            </div>
                            <div class="col-6 text-left row">
                                <h5>Tổng tiền :</h5>
                                <h5 id="totalPrice" data-total-price="0">0 đ</h5>
                            </div>
                        </div>
                        <div class="col-md-6 text-center">
                            <button onclick="window.location.href='/product/list'" class="btn  text-uppercase continousOrder mr-4">Tiếp tục mua</button>
                            <button class="btn text-uppercase completedOrder" id="completedOrder" data-toggle="modal"
                                    data-target="#modalSubmit" style="display: none">Đặt hàng</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <%--<div class="col-md-12">--%>
    <div class="modal col-md-12 " id="modalSubmit" role="dialog" >
        <div class="modal-dialog modal-xl font-label " style="border-radius: 30px">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header color-theme-bg">

                    <h4 class="modal-title">Thông tin khách hàng</h4>
                    <button type="button" class="close position-relative  btnClose" style="z-index: 15"
                            data-dismiss="modal">&times;
                    </button>
                </div>
                <div class="modal-body" style="min-height: 400px">
                    <div class="row mt-3 ml-3 mr-3">
                        <div class="row col-md-12">
                            <div class="panel-right col-md-12">
                                <form id="formEdit">
                                    <input type="hidden" name="id" id="id">
                                    <div class="col-sm-12 mt-3 row">
                                        <label class="ward input-label col-md-4 text-right">Tên khách hàng:</label>
                                        <input class="form-control col-md-8" type="" required name="customerName"
                                               id="customerName">
                                    </div>
                                    <div class="col-sm-12 mt-3 row">
                                        <label class="ward input-label col-md-4 text-right">Số điện thoại:</label>
                                        <input class="form-control col-md-8 " required name="customerPhone" id="customerPhone">
                                    </div>
                                    <div class="col-sm-12 mt-3 row">
                                        <label class="ward input-label col-md-4 text-right">Địa chỉ nhận hàng:</label>
                                        <textarea class="form-control col-md-8" required name="customerAddress" id="customerAddress"></textarea>
                                    </div>
                                    <div class="col-sm-12 mt-3 row">
                                        <label class="ward input-label col-md-4 text-right">Thời gian nhận hàng:</label>
                                        <input type="datetime-local" class="form-control col-md-8 " required name="deliveryTime" id="deliveryTime">
                                    </div>
                                    <div class="col-sm-12 mt-3 row">
                                        <label class="ward input-label col-md-4 text-right">Phương thức thanh toán:</label>
                                        <select class="form-control col-md-8" name="payment" id="payment">
                                            <option value="COD" selected>Thanh toán khi nhận hàng</option>
                                            <option value="TRANSFER">Chuyển khoản</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-12 mt-3 row">
                                        <label class="ward input-label col-md-4 text-right">Mã khuyến mại:</label>
                                        <input type="text" class="form-control col-md-3 "  name="voucherCode" id="voucherCode">
                                        <div class="col-md-5 row">
                                            <div class="col-md-8">
                                                <span id="alertVoucher"></span>
                                            </div>
                                            <div class="col-md-4 text-left">
                                                <button type="button"  class=" btn m-0" id="checkVoucher"
                                                        style="border:1px solid black;width: 130px">Kiểm tra mã
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 mt-3 row">
                                        <label class="ward input-label col-md-4 text-right">Tổng tiền:</label>
                                        <input type="text" class="form-control col-md-8 " required name="" disabled id="totalPrice2">
                                    </div>
                                    <div class="col-sm-12 mt-3 row">
                                        <label class="ward input-label col-md-4 text-right">Tổng tiền thanh toán:</label>
                                        <input type="text" class="form-control col-md-8 " required name="" disabled id="totalPricePaid">
                                    </div>
                                    <div class="col-sm-12 mt-3 row">
                                        <label class="ward input-label col-md-4 text-right">Ghi chú:</label>
                                        <textarea class="form-control col-md-8 "  name="note" id="note"></textarea>
                                    </div>
                                    <div class="col-sm-12 mt-3 row text-center" style="height: 46px">
                                        <div class="col-md-6 text-right">
                                            <button type="button" data-dismiss="modal" class=" btn cancel continousOrder" id="cancel">Hủy</button>
                                        </div>
                                        <div class="col-md-6 text-right">
                                            <button type="submit" class=" btn save"
                                            >Thanh Toán
                                            </button>
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
<script src="/admin/js/customer/cart-insert.js"></script>
<script src="/admin/js/customer/complete-order.js"></script>
</body>
</html>


