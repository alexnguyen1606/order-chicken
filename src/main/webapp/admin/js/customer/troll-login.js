jQuery(function ($) {
    $(document).ready(function () {
        $(".login").mouseenter(function(){
            $(".login").css("position","absolute");
            $(".login").css("left",getRandomInt(100,500)+"px");
            $(".login").css("top",getRandomInt(100,500)+"px");
        });
        $(".login").mouseleave(function(){
            $(".login").css("position","absolute");
            $(".login").css("left",getRandomInt(100,500)+"px");
            $(".login").css("top",getRandomInt(100,500)+"px");

        });
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
        }
    })
});