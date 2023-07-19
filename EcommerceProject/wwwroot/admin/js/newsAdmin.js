﻿$(document).ready(function () {
    $.noConflict();

    axios.get('/Admin/News/GetListRecord')
        .then(function (response) {

            var data = response.data;
            console.log(data);
            $('#NewsTable').DataTable({
                data: data,
                pageLength: 10,
                columns: [
                    {
                        data: 'name',
                        render: function (data, type, row) {
                            return '<strong>' + data + '</strong>';
                        }
                    },
                    {
                        data: 'photo',
                        render: function (data, type, row) {
                            return '<img src="/Upload/News/' + data + '" style="width:100px;" />';
                        },
                        orderable: false
                    },
                    {
                        data: 'categories',
                        render: function (data, type, row) {
                            return data;
                        },
                        orderable: false
                    },
                    {
                        data: 'hot',
                        render: function (data, type, row) {
                            return data;
                        },
                        orderable: false
                    },
                    {
                        data: 'id',
                        render: function (data, type, row) {
                            var advId = data;
                            var EditUrlUpdate = '/Admin/News/Update/' + advId;
                            var EditUrlDelete = '/Admin/News/Delete/' + advId;
                            var dropdownHtml = '<div class="dropdown">' +
                                '<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
                                '<i class="bx bx-dots-vertical-rounded"></i>' +
                                '</button>' +
                                '<div class="dropdown-menu">' +
                                '<a class="dropdown-item" href="' + EditUrlUpdate + '"><i class="bx bx-edit-alt me-1"></i> Edit</a>' +
                                '<a class="dropdown-item" href="' + EditUrlDelete + '"><i class="bx bx-trash me-1"></i> Delete</a>' +
                                '</div>' +
                                '</div>';
                            return dropdownHtml;
                        },
                        orderable: false
                    }
                ]
            });


        })
        .catch(function (error) {
            console.error('Lỗi khi gọi API: ', error);
        });
});

