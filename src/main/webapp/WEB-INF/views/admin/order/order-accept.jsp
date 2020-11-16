<%@ page pageEncoding="utf-8" %>
<!-- Chart code -->


<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0 text-dark">Đơn đặt</h1>
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
                    <th class="text-center "><button class="btn btn-primary" id="completeAll">Hoàn thành</button></th>
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
<!-- /.content -->
<div class="position-absolute loader " style="">
    <div class="spinner-border " style="position:fixed;width: 3rem; height: 3rem;top: 50%;left: 50%"
         role="status">
        <span class="sr-only">Loading...</span>
    </div>
</div>


<script src='/admin/template/paging/jquery.twbsPagination.js'></script>
<script src="/admin/template/paging/jquery.twbsPagination.min.js"></script>
<script src="/admin/js/order/list-accept.js"></script>
<%--<script src="/admin/js/order/create.js"></script>--%>