@extends('admin.layout.master')
@section('title','Thêm sản phẩm')
@section('content')
<div id="page-wrapper">
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Thêm sản phẩm mới</h1>
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->
    <div class="row">
    @if (count($errors) > 0)
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                
                <div class="panel-body">
                    <form role="form" method="post" enctype="multipart/form-data">
                        <input type="hidden" name="_token" value="{{csrf_token()}}">
                        <div class="row">
                            <div class="form-group col-md-6" >
                                <label>Tên sản phẩm</label>
                                <input class="form-control" name="name">
                            </div>
                            <div class="form-group col-md-6">
                                <label>Loại sản phẩm</label>
                                <select class="form-control" name='type'>
                                    @foreach($loaisp as $loai)
                                        <option value="{{$loai->id}}">{{$loai->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label>Đơn giá</label>
                                <input class="form-control" name="price">
                            </div>
                            <div class="form-group col-md-6">
                                <label>Đơn giá khuyến mãi</label>
                                <input class="form-control" name="promo_price">
                            </div>

                        </div>
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label>Đơn vị tính</label>
                                <select class="form-control" name="dvt">
                                    <option value="hộp">Hộp</option>
                                    <option value="cái">Cái</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6" >
                                <label>Khuyến mãi</label>
                                <input class="form-control" name="promo">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-6">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" value="1" name="new">Sản phẩm mới?
                                    </label>
                                </div>
                            </div>

                            <div class="form-group col-md-6 ">
                                <label>Hình ảnh</label>
                                <input type="file" name="photo">
                            </div>
                            <div class="form-group col-md-12">
                                <label>Mô tả</label>
                                <textarea class="form-control" rows="3" name="description"></textarea>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8"></div>
                            <div class="col-md-4">
                                <button type="submit" class="btn btn-primary">Thêm</button>
                                <button type="reset" class="btn btn-info">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
                    <!-- /.row (nested) -->
            </div>
                <!-- /.panel-body -->
        </div>
            <!-- /.panel -->
    </div>
        <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->
</div>
@endsection
