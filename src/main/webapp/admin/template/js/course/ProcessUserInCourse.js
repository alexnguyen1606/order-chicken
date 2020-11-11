jQuery(function ($) {
    $(document).ready(function () {
        $('#forwardBack').on('click', function () {
            window.history.back();
        });

        function getChapterInfo() {
            var courseId = $('#courseId').val();
            $.ajax({
                type: "GET",
                url: "/api/admin/chapter/course/" + courseId,
                headers: {"Authorization": "Bearer " + localStorage.getItem('eln_token')},
                contentType: "application/json",
                beforeSend: function () {
                    //  $('.loader').css("display","block");
                },
                success: function (response) {
                    loadChapter(response)
                }
            })

        }

        function loadChapter(data) {
            var row = "";
            $.each(data, function (i, v) {
                row += '<div class="panel panel-default ">';
                row += '<div class="panel-heading">';
                row += '<h4 class="panel-title">';
                row += '<a data-toggle="collapse" href="#chapter_'+v.id+'" data-id="'+v.id+'" data-parent="#acccordionChude" aria-expanded="false" class=" accordion-toggle-style detail " >'+v.name+'</a> </h4> </div>';
                row += '';
                row += '<div id="chapter_'+v.id+'" data-id="'+v.id+'" aria-expanded="false" class="panel-collapse collapse "><div class="timeline"></div></div>'
                row += '</div>'
            });
            $('#chapterInfo').append(row)

        }

        getChapterInfo();
        $(document).on('click','.detail',function () {
            var idChapter = $(this).attr("data-id");
            var userId = $('#userId');
            console.log(idChapter);
        })
    })
})