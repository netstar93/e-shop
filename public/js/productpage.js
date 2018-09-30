/**
 * Created by Nitish on 08 Sep.
 */

$(document).ready(function() {
    var product_id = parseInt($('#productId' +
        '').val());
    var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

    $('#addtocart').click(function(){
        $.ajax({
            /* the route pointing to the post function */
            url: '/catalog/product/addtocart',
            type: 'POST',
            /* send the csrf-token and the input to the controller */
            data: {_token: CSRF_TOKEN, product_id: product_id},
            dataType: 'JSON',
            success: function (data) {
                $('#myModal').modal('show');
            }
        });
    });

    $('#submit').click(function() {
        var email_id = $.trim($('#email').val());
        var password = $.trim($('#password').val());
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
            /* the route pointing to the post function */
            url: '/customer/checklogin',
            type: 'POST',
            /* send the csrf-token and the input to the controller */
            data: { _token : csrf_token,email: email_id,password:password,ajax:true},
            dataType: 'JSON',
            success: function (data) {
                if(data.success){
                    $('section.account label').trigger('click');
                    $('section.shipping label').trigger('click');
                }
            }
        });
    });

    $('#summary-submit').click(function(e) {
        $('section.summary label').trigger('click');
        $('section.payment label').trigger('click');
        $('.main_content').css('height','1000px');
    });

    $('#address-submit').click(function(e) {
        e.preventDefault();
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        var formData = $('#shipping-form').serialize();
        $.ajax({
            url: '/customer/address/save',
            type: 'POST',
            data: formData,
            dataType: 'JSON',
            success: function (data) {
                if(data.success){
                   $("#address_id").val(data.id);
                    $('section.shipping label').trigger('click');
                    $('section.summary label').trigger('click');
                }
            }
        });
    });

    $('#checkout_login_submit').click(function(e) {
        e.preventDefault();
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        var formData = $('#checkout_login_form').serialize();
        $.ajax({
            /* the route pointing to the post function */
            url: '/customer/checklogin',
            type: 'POST',
            /* send the csrf-token and the input to the controller */
            data: formData,
            dataType: 'JSON',
            success: function (data) {
                if(data.success){
                    $('section.account label').trigger('click');
                    $('section.account label').css('pointer-events', 'none')
                    $('section.shipping label').trigger('click');
                }
            }
        });
    });

    $('#ordernow').click(function(e) {
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $('#mainForm') .submit(
    });

});