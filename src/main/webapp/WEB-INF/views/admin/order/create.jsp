<%@ page pageEncoding="utf-8" %>
<!-- Chart code -->


<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">Tạo đơn</h1>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>

    <section class="content">
        <div class="row">
            <div class="col-md-6">
                <table class="table table-striped table-hover" id="">
                    <thead>
                    <tr role="row" class="heading">
                        <th witdth="10px">#</th>
                        <th width="30%" class="text-center">Mã sản phẩm</th>
                        <th class="text-center">Tên sản phẩm</th>
                        <th class="text-center">Đơn giá</th>
                        <th class="text-center ">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody id="products"> </tbody>
                </table>
                <div class="col-sm-12 col-xs-12">
                    <ul id="pagination-test" class="pagination"></ul>
                </div>
            </div>
            <div class="col-md-6">
            <div id="itemInSession">

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
</div>
<script src='/admin/template/paging/jquery.twbsPagination.js'></script>
<script src="/admin/template/paging/jquery.twbsPagination.min.js"></script>
<script src="/admin/js/order/list-product.js"></script>
<script src="/admin/js/order/create.js"></script>