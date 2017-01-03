@extends('layout.master')
@section('title','Đăng kí')
@section("container")
<div class="container">
  <div class="row">
  <div class="col-md-3"></div>
  	<div class="col-md-6">
    
          <form class="form-horizontal" action="{{route('admin.pages.user.signup')}}" method="POST">
          <fieldset>
            <div id="legend">
              <legend class=""><h1>Đăng kí</h1></legend>
              	@if(count($errors)>0)
        				<div class="alert alert-danger">
        					@foreach($errors->all() as $err)
        					<p>{{$err}}</p>
        					@endforeach
        				</div>
        				@endif
            </div>
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <div class="control-group">
              <label class="control-label" for="username">Họ tên</label>
              <div class="controls">
                <input id="username" name="fullname" placeholder="" class="form-control input-lg" type="text">
                <p class="help-block"></p>
              </div>
            </div>
         
            <div class="control-group">
              <label class="control-label" for="email">E-mail</label>
              <div class="controls">
                <input id="email" name="email" placeholder="Email" class="form-control input-lg" type="email">
                <p class="help-block"></p>
              </div>
            </div>
         
            <div class="control-group">
              <label class="control-label" for="password">Password</label>
              <div class="controls">
                <input id="password" name="password" placeholder="Password" class="form-control input-lg" type="password">
                <p class="help-block">Password ít nhất 6 kí tự</p>
              </div>
            </div>
         
            <div class="control-group">
              <label class="control-label" for="password_confirm">Password (Confirm)</label>
              <div class="controls">
                <input id="password_confirm" name="password_confirm" placeholder="Confirm password" class="form-control input-lg" type="password">
                <p class="help-block">Nhập lại password</p>
                <p id="infor" class="help-block" style="color:red"></p>
              </div>
            </div>
         
            <div class="control-group">
              <!-- Button -->
              <div class="controls">
                <button class="btn btn-success" id="dangki">Đăng kí</button>
              </div>
            </div>
          </fieldset>
        </form>
    
    </div> 
  </div>
</div>

<script src="assets/dest/js/jquery-3.1.1.min.js"></script>
<script>
$(document).ready(function(){
	$("#password_confirm").blur(function(){
		var password = $('#password').val();
		var pass_conf = $('#password_confirm').val();
    	if(password != pass_conf){
    		$('#infor').html("Mật khẩu nhập lại chưa đúng")
    	}

	});
	$('#dangki').click(function(){
		var password = $('#password').val();
		var pass_conf = $('#password_confirm').val();
    	if(password != pass_conf){
    		$('#infor').html("Mật khẩu nhập lại chưa đúng");
    		return false;
    	}
	})
})
</script>
@endsection