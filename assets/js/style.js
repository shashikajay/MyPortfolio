var header = document.getElementById("header");
var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

window.onscroll = function() {
    var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > 0) {
        header.classList.add("transparency");
    } else {
        header.classList.remove("transparency");
    }
    scrollTop = currentScrollTop;
};
