<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container-fluid py-3">
    <div class="row justify-content-between">
        <div class="col-auto ml-4">
            <h4>Danh sách khuyến mại</h4>
        </div>
        <div class="col-auto mr-5">
            <div class="row align-items-center">
                <div class="col-auto">
                    <a href="/admin/voucher/create" class="btn btn-primary" style="color:#fff">Thêm mới</a>
                </div>
                <div class="col-auto">
                    <a id="delete-btn" ><i class="fas fa-trash-alt" style="font-size:20px;"></i></a>

                </div>
            </div>
        </div>
    </div>
    <div class="my-2">
        <table class="table table-striped table-hover" id="">
            <thead>
            <tr role="row" class="heading">
                <th class="text-center" witdth="10px"><input id="checkAll" type="checkbox"></th>
                <th width="" class="text-center">STT</th>
                <th class="text-center">Tên khuyến mại</th>
                <th class="text-center">Mã khuyến mại</th>
                <th class="text-center ">Thời gian hoạt động</th>
                <th class="text-center ">Tỉ lệ discount</th>
                <th class="text-center ">Trạng thái</th>
                <th class="text-center "></th>
            </tr>
            </thead>
            <tbody id="vouchers"></tbody>
        </table>
        <div class="col-sm-12 col-xs-12">
            <ul id="pagination-test" class="pagination"></ul>
        </div>

    </div>
</div>
<script src='/admin/template/paging/jquery.twbsPagination.js'></script>
<script src="/admin/template/paging/jquery.twbsPagination.min.js"></script>
<script src="/admin/js/voucher/list.js"></script>