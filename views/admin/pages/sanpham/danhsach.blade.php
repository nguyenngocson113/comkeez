@extends('admin.layout.master')
@section('title','Danh sách sản phẩm')
@section('content')
<div id="page-wrapper">
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Danh sách sản phẩm</h1>
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->
    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    Danh sách sản phẩm
                </div>
                <!-- /.panel-heading -->
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Tên loại</th>
                                    <th>Đơn giá</th>
                                    <th>Giá khuyến mãi</th>
                                    <th>Ảnh</th>
                                </tr>
                            </thead>
                            <tbody>
                            @foreach($sanpham as $sp)
                            <?php $loaisp=$sp->productType; ?>
                                <tr>
                                    <td>{{$sp->id}}</td>
                                    <td>{{$sp->name}}</td>
                                    <td>{{$loaisp->name}}</td>
                                    <td>{{$sp->unit_price}}</td>
                                    <td>{{$sp->promotion_price}}</td>
                                    <td><img width="80px" height="60px" src="assets/dest/images/products/{{$sp->image}}"/></td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                    <!-- /.table-responsive -->
                </div>
                <!-- /.panel-body -->
            </div>
            <!-- /.panel -->
        </div>
    <!-- /.row -->
    <div class="col-lg-3"></div>
         <div class="col-lg-6">{{$sanpham->links()}}</div>
        <div class="col-lg-3"></div>
    </div>

</div>
<!-- /#page-wrapper -->
@endsection