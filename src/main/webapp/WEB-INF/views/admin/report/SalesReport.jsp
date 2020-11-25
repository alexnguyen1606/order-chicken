<%--
  Created by IntelliJ IDEA.
  User: Alex
  Date: 11/25/2020
  Time: 8:24 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<div class="container-fluid">
    <div class="row justify-content-between">
        <div class="col-auto ml-4">
            <h4>Thống kê doanh thu bán hàng</h4>
        </div>
        <div class="col-auto mr-5">
            <div class="row align-items-center">
                <div class="col-auto">
                    <a href="#" class="btn btn-primary " id="exportReport" style="color:#fff">Xuất báo cáo</a>
                </div>
                <div class="col-auto">
                    <a id="delete-btn" ><i class="fas fa-trash-alt" style="font-size:20px;"></i></a>

                </div>
            </div>
        </div>
    </div>
    <div class="my-1">
       <form id="formExport" class="d-flex col-md-12">
          <div class="form-group col-6 text-right">
              <label class="col-3">Từ ngày</label>
              <input type="datetime-local" name="startTime" required id="startTime" class="form-control ">
          </div>
           <div class="form-group col-6 text-right">
               <label class="col-3">Đến ngày</label>
               <input type="datetime-local" name="endTime" required class="form-control " id="endTime">
           </div>
           </form>
    </div>
    <div class="col-md-12">
        <table class="table table-striped table-hover" id="">
            <thead>
            <tr role="row" class="heading">
                <th class="text-center" witdth="10px"><input id="checkAll" type="checkbox"></th>
                <th width="" class="text-center">STT</th>
                <th class="text-center">Mã báo cáo</th>
                <th class="text-center">Từ ngày</th>
                <th class="text-center ">Đến ngày</th>
                <th class="text-center ">Tổng tiền</th>
                <th class="text-center ">Thực thư</th>
                <th class="text-center "></th>
            </tr>
            </thead>
            <tbody id="reports"></tbody>
        </table>
        <div class="col-sm-12 col-xs-12">
            <ul id="pagination-test" class="pagination"></ul>
        </div>
    </div>
</div>
<script src='/admin/template/paging/jquery.twbsPagination.js'></script>
<script src="/admin/template/paging/jquery.twbsPagination.min.js"></script>
<script src="/admin/js/report/list.js"></script>
</body>

</html>
