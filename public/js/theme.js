(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        if (document.body) {
            document.body.classList.add('dark-mode');
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                document.body.classList.add('dark-mode');
            });
        }
    }
})();

$(document).ready(function () {

    const toggleButton = $('<button id="themeToggle" class="btn btn-outline-light btn-sm">🌙</button>');

    const navbarNav = $('.navbar-nav');
    const themeItem = $('<li class="nav-item"></li>').append(toggleButton);
    navbarNav.append(themeItem);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        $('#themeToggle').html('☀️');
    }

    $('#themeToggle').click(function () {
        $('body').toggleClass('dark-mode');

        if ($('body').hasClass('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            $(this).html('☀️');
        } else {
            localStorage.setItem('theme', 'light');
            $(this).html('🌙');
        }
    });

});