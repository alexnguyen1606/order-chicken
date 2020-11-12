<%--
  Created by IntelliJ IDEA.
  User: PC
  Date: 12/11/2020
  Time: 10:58 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container-fluid py-3">
    <div class="row justify-content-between">
        <div class="col-auto">
            <h4>Danh mục thực đơn</h4>
        </div>
        <div class="col-auto">
            <a class="btn btn-primary" style="color:#fff">Thêm mới</a>
        </div>
    </div>
    <div class="row main-content">
        <div class="col-4">
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
                                <input name="id" id="id2" type="hidden">
                                <div class="">
                                    <label for="" class="form-label">Tên danh mục <span class="required" style="color: #e02222;">*</span></label>
                                    <input type="text" name="name" id="name" class="form-control">
                                    <input type="hidden" name="id">
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
        <div class="col">
            <div class="portlet light py-4 px-3 portlet-fit bordered">
                <div class="">
                    <div class="caption">
                        <span class="font-green-sharp text-uppercase category">Tất cả danh mục</span>
                    </div>
                </div>
                <div class="portlet-body">
                    <table id="list" class="w-100">
                        <col width="70%">
                        <col>
                        <tbody>

                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    </div>
</div>
<script src="<c:url value="/admin/js/dish-cat/list.js"/>"></script>
<script src="<c:url value="/admin/js/dish-cat/edit.js"/>"></script>
