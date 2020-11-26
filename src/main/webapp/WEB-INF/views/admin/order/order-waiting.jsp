<%@ page pageEncoding="utf-8" %>
<!-- Chart code -->


<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h4 class="m-0 text-dark">Đơn đặt</h4>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>

<section class="content">
    <div class="row">
        <div class="col-md-12 row">
            <table class="table table-striped table-hover" id="">
                <thead>
                <tr role="row" class="heading">
                    <th class="text-center" witdth="10px"><input id="checkAll" type="checkbox"></th>
                    <th width="" class="text-center">Mã đơn</th>
                    <th class="text-center">Tên khách hàng</th>
                    <th class="text-center">Số điện thoại</th>
                    <th class="text-center ">Thời gian nhận</th>
                    <th class="text-center ">Tổng tiền</th>
                    <th class="text-center ">Tình trạng đơn</th>
                    <th class="text-center "><button class="btn btn-primary" id="acceptAll">Nhận đơn</button></th>
                </tr>
                </thead>
                <tbody id="orders"></tbody>
            </table>
            <div class="col-sm-12 col-xs-12">
                <ul id="pagination-test" class="pagination"></ul>
            </div>

        </div>
    </div>
</section>
<div class="modal " id="modalInfo" role="dialog" style="pointer-events: none">
    <div class="modal-dialog modal-xl font-label " style="border-radius: 30px">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header color-theme-bg">

                <h4 class="modal-title">Chi tiết đơn hàng</h4>
                <button type="button" class="close position-relative  btnClose" style="z-index: 15"
                        data-dismiss="modal">&times;
                </button>
            </div>
            <div class="modal-body row" style="min-height: 400px">
                <div class="col-md-6">
                    <table class="w-100 table table-striped table-hover" id="tableItem">
                        <thead>
                        <tr>
                            <th style="text-align: center">Tên sản phẩm</th>
                            <th style="text-align: center">Đơn giá</th>
                            <th style="text-align: center">Số lượng</th>
                            <th style="text-align: center" class="d-sm-block d-none">Thành tiền</th>
                        </tr>
                        </thead>
                        <tbody id="productOrdered">

                        </tbody>

                    </table>
                    <div class="row">
                        <div class="col-6 text-center">
                            <span>Tổng sản phẩm : <h4 id="totalItem" data-total-item="0">0</h4></span>

                        </div>
                        <div class="col-6 text-center">
                            <span>Tổng tiền : <h4 id="totalPrice" data-total-price="0"></h4></span>

                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="panel-right col-md-12">

                        <input id="id" value="" type="hidden">
                        <div class="col-sm-12 mt-3 form-group">
                            <label class="ward input-label col-md-6 text-right">Tên khách hàng:</label>
                            <input class="form-control col-md-6" disabled type=""  name="customerName"
                                   id="customerName">
                        </div>
                        <div class="col-sm-12 mt-3 form-group">
                            <label class="ward input-label col-md-6 text-right">Số điện thoại:</label>
                            <input class="form-control col-md-6 " disabled required name="customerPhone" id="customerPhone">
                        </div>
                        <div class="col-sm-12 mt-3 form-group">
                            <label class="ward input-label col-md-6 text-right">Địa chỉ nhận hàng:</label>
                            <textarea class="form-control col-md-6" disabled  name="customerAddress" id="customerAddress"></textarea>
                        </div>
                        <div class="col-sm-12 mt-3 form-group">
                            <label class="ward input-label col-md-6 text-right">Thời gian nhận hàng:</label>
                            <input type="datetime-local" class="form-control col-md-6 " disabled  name="deliveryTime" id="deliveryTime">
                        </div>
                        <div class="col-sm-12 mt-3 form-group">
                            <label class="ward input-label col-md-6 text-right">Phương thức thanh toán:</label>
                            <select class="form-control col-md-6" name="payment" disabled id="payment">
                                <option value="COD" selected>Thanh toán khi nhận hàng</option>
                                <option value="TRANSFER">Chuyển khoản</option>
                            </select>
                        </div>
                        <div class="col-sm-12 mt-3 form-group">
                            <label class="ward input-label col-md-6 text-right">Ghi chú:</label>
                            <textarea class="form-control col-md-6 " disabled  name="note" id="note"></textarea>
                        </div>
                        <div class="col-sm-12 mt-3 form-group text-center" style="height: 46px">
                            <div class="col-md-6 text-right">
                                <button type="button" id="acceptOrder" class=" btn"
                                        style=" background: #00D380; color: #ffffff;width: 130px">Nhận đơn
                                </button>
                            </div>
                            <div class="col-md-6 text-right">
                                <button type="button" data-dismiss="modal" class=" btn" id="cancel"
                                        style="border:1px solid black;width: 130px">Đóng
                                </button>
                            </div>
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

</div>
<!-- /.content -->
<div class="position-absolute loader " style="">
    <div class="spinner-border " style="position:fixed;width: 3rem; height: 3rem;top: 50%;left: 50%"
         role="status">
        <span class="sr-only">Loading...</span>
    </div>
</div>


<script src='/admin/template/paging/jquery.twbsPagination.js'></script>
<script src="/admin/template/paging/jquery.twbsPagination.min.js"></script>
<script src="/admin/js/order/list-waiting.js"></script>
<script src="/admin/js/order/order-info.js"></script>