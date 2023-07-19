
$(document).ready(function () {
    $.noConflict();
    var id = $("#Id_order").val();

    axios.get('/Admin/Orders/GetDetailJson/' + id)
        .then(function (response) {

            var data = response.data;


        
        })
        .catch(function (error) {
            console.error('Lỗi khi gọi API: ', error);
        });
});

