const scrollDownBtn = document.getElementById("scroll-down-btn");

scrollDownBtn.addEventListener("click", function() {
    window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
    });
});
