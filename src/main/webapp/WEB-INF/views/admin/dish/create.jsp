<%--
  Created by IntelliJ IDEA.
  User: PC
  Date: 12/11/2020
  Time: 9:50 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container-fluid py-3">
    <div class="formCategory">
        <div class="portlet light py-4 px-3 portlet-fit bordered">
            <div class="">
                <div class="caption">
                    <i class="fas fa-layers">

                    </i>
                    <span class="font-green-sharp text-uppercase category">Thêm danh mục</span>
                </div>
            </div>
            <div class="portlet-body">
                <div class="form-normal">
                    <form class="form-horizontal" id="formEdit">
                        <input type="hidden" id="id" name="id">

                        <div class="">
                            <label for="" class="form-label">Tên món săn <span class="required" style="color: #e02222;">*</span></label>
                            <input type="text" name="name" id="name" class="form-control">
                        </div>
                        <div class="row my-2">
                            <div class="col">
                                <label for="" class="form-label">đơn giá <span class="required" style="color: #e02222;">*</span></label>
                                <input type="number" name="price" id="price" class="form-control">
                            </div>
                            <div class="col">
                                <label for="" class="form-label">đơn vị tính <span class="required" style="color: #e02222;">*</span></label>
                                <input type="text" name="unit" id="unit" class="form-control">
                            </div>
                        </div>
                        <div class="my-2">
                            <label for="" class="form-label">Hình ảnh</label>
                            <input type="hidden" id="urlImg" name="urlImg">
                            <input type="file" name="img" id="img" class="form-control">
                            <img src="" id="imgExam" class="d-none">
                        </div>
                        <div class="my-2">
                            <label for="" class="form-label">Mô tả <span class="required" style="color: #e02222;">*</span></label>
                            <textarea type="text" name="content" id="content" class="form-control"></textarea>
                        </div>
                        <div class="my-2">
                            <label for="" class="form-label">Danh mục <span class="required" style="color: #e02222;">*</span></label>
                            <select name="idCategory" id="idCategory" class="form-control"></select>
                        </div>
                        <div class="my-2">
                            <label for="" class="form-label">Trạng thái: </label><br>
                            <label class="form-label "><input type="radio" name="status" value="ACTIVE" checked> Hoạt động </label>
                            <label class="form-label ml-3"><input type="radio" name="status" value="INACTIVE"> Dừng hoạt động </label>
                        </div>
                        <div class="d-flex justify-content-between mt-2">
                            <button type="button" id="btnReset"  class="btn btn-default m-0">
                                Hủy
                            </button>
                            <button type="button"  id="btnEdit" class="btn btn-primary m-0">
                                Thêm
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
</div>
<script src="<c:url value="/admin/js/uploadImg.js"/>"></script>
<script src="<c:url value="/admin/js/dish/edit.js"/>"></script>
