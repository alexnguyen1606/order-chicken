jQuery(function ($) {
    $(document).ready(function () {
        CanvasJS.addColorSet("greenShades",
            [
                "#ff432e",
                "#ffd323",
                "#2E8B57",
                "#3CB371",
                "#90EE90"
            ]);
        getStatistic();
        function getStatistic() {
            var courseId = $('#courseId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/statistic/course/" + courseId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                //data: JSON.stringify(data),
                //  dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    //  $('.loader').css("display","block");
                },
                success: function (response) {
                    $('.totalUser').text(response.totalUser);
                    $('#totalUser').text("Học viên / Tổng:" + response.totalUser);
                    $('#totalCourseWare').text(response.totalCourseWare);
                    $('#totalChapter').text("HỌC LIỆU / " + response.totalChapter + " CHƯƠNG MỤC");
                    $('#totalComment').text(response.totalComment);
                    $('#rate').text(response.rate.toFixed(1));
                    $('#totalRate').text('Đánh giá ('+response.totalRate+')'+' Lượt');
                    var listDone = [];
                    var listJoin = [];
                    $.each(response.listStatistic,function (i,v) {
                        var object = {};
                        object['z'] = v.totalItem;
                        object['label'] = v.nameStatistic;
                        object['y'] = v.percent;
                        if (v.typeStatistic=="DONE"){
                            listDone.push(object);
                        }else if(v.typeStatistic=="JOIN"){
                            listJoin.push(object);
                        }

                    });
                    var chart = new CanvasJS.Chart("Statistics", {
                        theme: "light2",
                        colorSet:"greenShades",
                        animationEnabled: true,
                        title: {
                            text: "Thống kê đạt",
                            fontSize: 20,
                            fontWeight: "normal",
                        },

                        height: 400,
                        data: [{
                            type: "pie",
                            startAngle: 240,
                            yValueFormatString: "##.# '%'",
                            indexLabel: "{label} {z} ({y}) ",
                            dataPoints:
                            listDone
                        }]
                    });
                    var chart2 = new CanvasJS.Chart("Statistics2", {
                        theme: "light2",
                        colorSet:"greenShades",
                        animationEnabled: true,
                        title: {
                            text: "Thống kê tham gia khóa học",
                            fontSize: 20,
                            fontWeight: "normal",
                        },

                        height: 400,
                        data: [{
                            type: "pie",
                            startAngle: 240,
                            yValueFormatString: "##.# '%'",
                            indexLabel: "{label} {z} ({y})",
                            dataPoints:
                            listJoin
                        }]
                    });
                    chart2.render();
                    chart.render();
                },
                error: function (response) {
                    console.log(response);
                    $('.loader').css("display", "none");
                }
            });
        };
    })
})