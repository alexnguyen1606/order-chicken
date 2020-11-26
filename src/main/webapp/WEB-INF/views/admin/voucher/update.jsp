<%--
  Created by IntelliJ IDEA.
  User: Alex
  Date: 11/22/2020
  Time: 9:08 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <c:if test="${id==null}">
        <title>Thêm khuyến mại</title>
    </c:if>
    <c:if test="${id!=null}">
        <title>Sửa khuyến mại</title>
    </c:if>
</head>
<body>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <c:if test="${id==null}">
                    <h1 class="m-0 text-dark">Tạo khuyến mại</h1>
                </c:if>
                <c:if test="${id!=null}">
                    <h1 class="m-0 text-dark">Cập nhật khuyến mại</h1>
                </c:if>
            </div><!-- /.col -->
        </div><!-- /.row -->
        <div class="col-md-12">
            <div class="portlet-body">
                <div class="form-normal">
                    <form class="form-horizontal" id="formEdit">
                        <input type="hidden" id="id" name="id" value="${id}">

                        <div class="">
                            <label for="" class="form-label">Tên khuyến mại:<span class="required"
                                                                                  style="color: #e02222;">*</span></label>
                            <input type="text" name="name" id="name" class="form-control">
                        </div>
                        <div class="">
                            <label for="" class="form-label">Mã khuyến mại:<span class="required"
                                                                                 style="color: #e02222;">*</span></label>
                            <input type="text" name="code" id="code" class="form-control">
                        </div>
                        <div class="row my-2">
                            <div class="col">
                                <label class="col-3">Từ ngày</label>
                                <input type="datetime-local" name="startTime" required id="startTime"
                                       class="form-control ">
                            </div>
                            <div class="col">
                                <label class="col-3">Đến ngày</label>
                                <input type="datetime-local" name="endTime" required class="form-control " id="endTime">
                            </div>
                        </div>
                        <div class="row my-2">
                            <div class="col">
                                <label for="" class="form-label">Discount <span class="required"
                                                                                style="color: #e02222;">*</span></label>
                                <input type="number" name="discount" min="0" max="100" id="discount"
                                       class="form-control">
                            </div>
                            <div class="col">
                                <label for="" class="form-label">Trạng thái: </label><br>
                                <select name="status" class="form-control" id="status">
                                    <option value="1">Hoạt động</option>
                                    <option value="0">Dừng hoạt động</option>
                                </select>

                            </div>
                        </div>
                        <div class="my-2">
                            <label for="" class="form-label">Hình ảnh</label>
                            <input type="hidden" id="urlImg" name="urlImg">
                            <input type="file" name="img" id="img" class="form-control">
                            <img src="" id="imgExam" class="d-none">
                        </div>
                        <div class="my-2">
                            <label for="" class="form-label">Mô tả</label>
                            <textarea type="text" name="content" id="content" class="form-control"></textarea>
                        </div>

                        <div class="d-flex justify-content-between mt-2">
                            <a href="/admin/voucher/list" type="button" id="btnReset" class="btn btn-default m-0">
                                Hủy
                            </a>
                            <button type="submit" id="btnEdit" class="btn btn-primary m-0">
                                <c:if test="${id==null}">
                                    Thêm
                                </c:if>
                                <c:if test="${id!=null}">
                                    Cập nhật
                                </c:if>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div><!-- /.container-fluid -->
</div>
<script src="/admin/js/voucher/update.js"></script>
<script src="<c:url value="/admin/js/uploadImg.js"/>"></script>
</body>
</html>
