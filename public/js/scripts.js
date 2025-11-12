$(document).ready(function () {
    $('h1').first().addClass('fw-bold');
    $('#trainer-name').css({ 'color': '#1b5e20', 'font-weight': 600 });

    if ($('#demo-paragraph').length) {
        $('#hideBtn').on('click', function () { $('#demo-paragraph').hide(); });
        $('#showBtn').on('click', function () { $('#demo-paragraph').show(); });
        $('#toggleBtn').on('click', function () { $('#demo-paragraph').toggle(); });
    }

    if ($('#fadeImage').length) {
        $('#fadeInBtn').click(() => $('#fadeImage').fadeIn(600));
        $('#fadeOutBtn').click(() => $('#fadeImage').fadeOut(600));
        $('#fadeToggleBtn').click(() => $('#fadeImage').fadeToggle(500));
    }

    if ($('#collapsiblePanel').length) {
        $('#panelUp').click(() => $('#collapsiblePanel').slideUp(400));
        $('#panelDown').click(() => $('#collapsiblePanel').slideDown(400));
        $('#panelToggle').click(() => $('#collapsiblePanel').slideToggle(300));
    }


    if ($('#changeImgBtn').length && $('#changeableImg').length) {
        $('#changeImgBtn').click(function () {
            const newSrc = $(this).data('src') || 'images/placeholder.jpg';
            $('#changeableImg').attr('src', newSrc);
        });
    }

    if ($('#changeLinkBtn').length && $('#dynamicLink').length) {
        $('#changeLinkBtn').click(function () {
            const newHref = $(this).data('href') || 'https://www.example.com';
            $('#dynamicLink').attr('href', newHref).text('Open updated link');
        });
    }

    if ($('#jq-list').length) {
        const savedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        savedQuestions.forEach(q => {
            $('#jq-list').append(createListItem(q));
        });

        function createListItem(text) {
            return $(`<li class="list-group-item">${$('<div>').text(text).html()} <button class="btn btn-sm btn-danger float-end remove-item">Remove</button></li>`);
        }

        $('#addItemBtn').on('click', function () {
            const txt = $('#newItemInput').val().trim();
            if (!txt) {
                alert('Please enter a question.');
                return;
            }

            $('#jq-list').append(createListItem(txt));
            savedQuestions.push(txt);
            localStorage.setItem('questions', JSON.stringify(savedQuestions));
            $('#newItemInput').val('');
        });


        $('#jq-list').on('click', '.remove-item', function (e) {
            e.preventDefault();
            const li = $(this).closest('li');
            const text = li.text().replace('Remove', '').trim();
            const index = savedQuestions.indexOf(text);
            if (index > -1) savedQuestions.splice(index, 1);
                localStorage.setItem('questions', JSON.stringify(savedQuestions));
                li.fadeOut(200, function () { $(this).remove(); });
        });

        $('#removeLastBtn').on('click', function () {
            $('#jq-list li').last().remove();
            savedQuestions.pop();
            localStorage.setItem('questions', JSON.stringify(savedQuestions));
        });
    }

    if ($('#animateBox').length && $('#startAnimBtn').length) {
        $('#startAnimBtn').click(function () {
            const box = $('#animateBox');
            const original = {
                left: box.css('left'),
                top: box.css('top'),
                width: box.width(),
                height: box.height(),
                opacity: box.css('opacity')
            };

            box.animate({ left: '+=200px' }, 600)
            .animate({ top: '+=120px' }, 600)
            .animate({ width: original.width * 0.6, height: original.height * 0.6, opacity: 0.6 }, 500)
            .animate({ left: original.left, top: original.top, width: original.width, height: original.height, opacity: original.opacity }, 700);
        });
    }

    if ($('.thumb').length) {
        $('.thumb').css({ cursor: 'pointer' }).hover(
            function () { $(this).fadeTo(200, 0.7); },
            function () { $(this).fadeTo(200, 1.0); }
        );

        $('.thumb').click(function () {
            const large = $(this).data('large');
            if (large) {
                $('#galleryMain').fadeOut(200, function () {
                    $(this).attr('src', large).fadeIn(300);
                });
            }
        });
    }

    if ($('.accordion-header').length) {
        $('.accordion-body').hide();
        $('.accordion-header').click(function () {
            $(this).next('.accordion-body').slideToggle(300);
            $(this).toggleClass('open');
        });
    }

    if ($('#ball').length && $('#ballStage').length && $('#startBallBtn').length) {
        $('#startBallBtn').click(function () {
            const ball = $('#ball');
            const stage = $('#ballStage');
            const stageW = stage.width() - ball.width();
            const stageH = stage.height() - ball.height();
            ball.css({ position: 'relative' }).animate({ left: stageW }, 600)
            .animate({ top: stageH }, 700)
            .animate({ left: 0 }, 700)
            .animate({ top: 0 }, 600);
        });
    }

    if ($('#guessBtn').length && $('#guessInput').length) {
        function newSecret() {
            const s = Math.floor(Math.random() * 100) + 1;
            $('#guessBtn').data('secret', s);
            $('#guessResult').text('');
        }
        newSecret();

        $('#guessBtn').click(function () {
            const secret = $(this).data('secret');
            const val = parseInt($('#guessInput').val(), 10);
            if (isNaN(val)) { $('#guessResult').text('Enter a number.'); return; }
            if (val === secret) {
                $('#guessResult').html('<span class="text-success">Correct! You guessed it. Starting new game...</span>');
                setTimeout(newSecret, 1200);
            } else if (val < secret) {
                $('#guessResult').text('Too low. Try a higher number.');
            } else {
                $('#guessResult').text('Too high. Try a lower number.');
            }
        });
    } 

    $('a[target="_blank"]').attr('rel', 'noopener noreferrer');
});
