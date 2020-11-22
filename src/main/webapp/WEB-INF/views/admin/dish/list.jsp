<%--
  Created by IntelliJ IDEA.
  User: PC
  Date: 11/11/2020
  Time: 11:05 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container-fluid py-3">
    <div class="row justify-content-between">
        <div class="col-auto">
            <h4>Danh sách thực đơn</h4>
        </div>
        <div class="col-auto">
            <div class="row align-items-center">
                <div class="col-auto">
                    <a href="/admin/dish/edit" class="btn btn-primary" style="color:#fff">Thêm mới</a>
                </div>
                <div class="col-auto">
                    <a id="delete-btn" ><i class="fas fa-trash-alt" style="font-size:20px;"></i></a>

                </div>
            </div>
        </div>
    </div>
    <div class="my-2">
        <table class="table table-striped table-hover w-100" id="listTable">
            <thead>
            <tr>
                <td>
                    <input type="checkbox" class="">
                </td>
                <td>Tên sản phẩm</td>
                <td>Tên danh mục</td>
                <td>Đơn giá</td>
                <td>Trạng thái</td>
                <td></td>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
        <ul id="pagination" class="pagination justify-content-center"></ul>

    </div>
</div>

<script src="<c:url value='/admin/template/paging/jquery.twbsPagination.js'/>"></script>
<script src="/admin/template/paging/jquery.twbsPagination.min.js"></script>
<script src="<c:url value="/admin/js/dish/list.js"/>"></script>
