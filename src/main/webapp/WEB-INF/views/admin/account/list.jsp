<%--
  Created by IntelliJ IDEA.
  User: HELLO
  Date: 25/11/2020
  Time: 8:33 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container-fluid py-3">
    <div class="row justify-content-between align-items-center">
        <div class="col-auto">
            <h4>Danh sách người dùng</h4>
        </div>
        <div class="col-auto">
            <div class="row align-items-center">
                <div class="col-auto">
                    <a href="/admin/account/edit" class="btn btn-primary" style="color:#fff">Thêm mới</a>
                </div>

            </div>
        </div>
    </div>
    <div class="my-2">
        <table class="w-100 table table-borderless table-striped table-hover" id="list-user">
            <thead>
            <tr>
                <th>
                    Khách hàng
                </th>
                <th>
                    Số điện thoại
                </th>
                <th>
                    Tổng tiền đã mua
                </th>
                <th>

                </th>
            </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
        <ul id="pagination" class="pagination justify-content-center"></ul>

    </div>
</div>
<script src="<c:url value='/admin/template/paging/jquery.twbsPagination.js'/>"></script>
<script src="/admin/template/paging/jquery.twbsPagination.min.js"></script>
<script src="<c:url value="/admin/js/user/list.js"/>"></script>
