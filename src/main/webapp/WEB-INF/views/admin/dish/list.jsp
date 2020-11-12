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
            <a href="/admin/dish/edit" class="btn btn-primary" style="color:#fff">Thêm mới</a>
        </div>
    </div>
</div>
<script src="<c:url value="/admin/js/dish/list.js"/>"></script>
