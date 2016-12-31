/**
 * Created by maduar on 2016/12/28.
 */
$(document).ready(function () {

    $('#countAll').on('click', function (e) {

        var _countTr = $('#myTable tr.enable');

        if(_countTr.length === 0) {
            return swal("没有可计算数据");
        }

        var showResult = `<div class="form-group">
                        <label for="inputPreferential" class="col-sm-2 control-label"></label>
                        <div class="col-sm-10">
                        <table class="table table-hover" id="resultTable">
            
                        <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="20%">
                        <col width="15%">
                        <col width="15%">
                        <col width="20%">
                        </colgroup>
            
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>姓名</th>
                                <th>商品数量</th>
                                <th>总价</th>
                                <th>优惠</th>
                                <th>实付款</th>
                            </tr>
                        </thead>
            
                        <tbody>
                         
                        </tbody>
            
                        </table>
                        </div>
                        </div>`;

        var _tbody = "";
        var resultArray = [];

        // _countTr.each(function (index, value) {
        //     var countTd = $
        //
        //     resultArray.push({
        //         user_name:
        //     })
        // })


        $('#myForm').append(showResult);
    })

    $('#inputAdd').on('click', function (e) {

        var addTr = "<tr class='disable'>\
            <td>1</td>\
            <td><input type='text' placeholder='请输入货物名称' class='text goods-name no-verity'></td>\
            <td><input type='text' placeholder='请输入货物价格' class='text goods-price no-verity'>元</td>\
            <td><input type='text' placeholder='请输入购买人姓名' class='text user-name no-verity'></td>\
            <td><input type='button' class='btn-danger' value='删除'/><input type='button' class='btn-warning' value='修改' style='margin-left: 10px'/></td></tr>";

        if($('#myTable tbody tr:first td:first').html() != "1") {
            $('#myTable tbody').empty();
            $('#myTable tbody').append(addTr);
            $('#myTable tbody tr:last td:first').html("1");
        } else {
            $('#myTable tbody').append(addTr);
            $('#myTable tbody tr:last td:first').html($('#myTable tbody tr').length);
        }


        $('.btn-danger').off('click').on('click', function (e) {
            var that = $(this);
            swal({
                    title: "是否删除?",
                    text: "删除之后不能恢复数据!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    if(confirm) {
                        that.parent().parent().remove();
                        $('#myTable tbody tr').each(function (index) {
                            $(this).find('td:first').html(String(index + 1));
                        });
                        swal("成功删除");
                    }
                });
        })

        $('.text').on('change', function (e) {

            var _this = $(this);
            var _sign = 0;
            var _tr = _this.parent().parent();
            var _value = '';
            var _reg = '';

            if($.trim(_this.val()) === '')
                return;

            if(_this.hasClass('goods-name')) {
                if(!obj.verityForm('goods-name', _this.val())) {
                    _tr.removeClass().addClass('disable');
                    _this.removeClass('verity').addClass('no-verity')
                    return swal("食物名称有误");
                } else {
                    _this.removeClass('no-verity').addClass('verity')
                }
            }

            if(_this.hasClass('goods-price')) {
                if(!obj.verityForm('goods-price1', String(_this.val())) && !obj.verityForm('goods-price2', String(_this.val()))) {
                    _tr.removeClass().addClass('disable');
                    _this.removeClass('verity').addClass('no-verity')
                    return swal("价格有误");
                } else {
                    _this.removeClass('no-verity').addClass('verity')
                }
            }

            if(_this.hasClass('user-name')) {
                if(!obj.verityForm('user-name', _this.val())) {
                    _tr.removeClass().addClass('disable');
                    _this.removeClass('verity').addClass('no-verity')
                    return swal("姓名有误");
                } else {
                    _this.removeClass('no-verity').addClass('verity')
                }
            }


            _tr.find('.text').each(function (e) {
                if($(this).val() !== '' && $(this).hasClass('verity')) {
                    _sign++;
                }
            })

            if(_sign === 3) {
                var _value = "";
                _tr.find('.text').each(function (e) {
                    var _temp = $(this);
                    _value = $.trim(_temp.val());

                    if(_temp.hasClass('goods-price')) {
                        _temp.parent().html(_value + ' 元');
                    } else {
                        _temp.parent().html(_value);
                    }

                });
                
                _tr.removeClass().addClass('enable');
            }

        })
    });
})

var obj = {
    verityForm: function (type, str) {
        var reg = null;
        switch(type) {
            case "goods-name": {
                reg = /\w+/;
                break;
            }
            case "goods-price1": {
                reg = /^[\d]+(\.)[\d]+$/;
                break;
            }
            case "goods-price2": {
                reg = /^[\d]+$/;
                break;
            }
            case "user-name": {
                reg = /\w+/;
                break;
            }
        }

        return reg.test(str);
    }
}
