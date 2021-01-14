/*
	Read Only by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$titleBar = null,
		$nav = $('#nav'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '1025px',  '1280px' ],
			medium:   [ '737px',   '1024px' ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Tweaks/fixes.

		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}

	// Header Panel.

		// Nav.
			var $nav_a = $nav.find('a');

			$nav_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$nav_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '5vh',
							bottom: '5vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($nav_a.filter('.active-locked').length == 0) {

										$nav_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		// Title Bar.
			$titleBar = $(
				'<div id="titleBar">' +
					'<a href="#header" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$header
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'header-visible'
				});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				if (breakpoints.active('<=medium'))
					return $titleBar.height();

				return 0;

			}
		});
    
    
    // Features.
        $('.features')
            .on('click', 'a', function(event) {

                var $a = $(this),
                    $gallery = $a.parents('.features'),
                    $modal = $gallery.children('.modal'),
                    $modalImg = $modal.find('img'),
                    href = $a.attr('href');

                // Not an image? Bail.
                    if (!href.match(/\.(jpg|gif|png|mp4)$/))
                        return;

                // Prevent default.
                    event.preventDefault();
                    event.stopPropagation();

                // Locked? Bail.
                    if ($modal[0]._locked)
                        return;

                // Lock.
                    $modal[0]._locked = true;

                // Set src.
                    $modalImg.attr('src', href);

                // Set visible.
                    $modal.addClass('visible');

                // Focus.
                    $modal.focus();

                // Delay.
                    setTimeout(function() {

                        // Unlock.
                            $modal[0]._locked = false;

                    }, 600);

            })
            .on('click', '.modal', function(event) {

                var $modal = $(this),
                    $modalImg = $modal.find('img');

                // Locked? Bail.
                    if ($modal[0]._locked)
                        return;

                // Already hidden? Bail.
                    if (!$modal.hasClass('visible'))
                        return;

                // Stop propagation.
                    event.stopPropagation();

                // Lock.
                    $modal[0]._locked = true;

                // Clear visible, loaded.
                    $modal
                        .removeClass('loaded')

                // Delay.
                    setTimeout(function() {

                        $modal
                            .removeClass('visible')

                        setTimeout(function() {

                            // Clear src.
                                $modalImg.attr('src', '');

                            // Unlock.
                                $modal[0]._locked = false;

                            // Focus.
                                $body.focus();

                        }, 475);

                    }, 125);

            })
            .on('keypress', '.modal', function(event) {

                var $modal = $(this);

                // Escape? Hide modal.
                    if (event.keyCode == 27)
                        $modal.trigger('click');

            })
            .on('mouseup mousedown mousemove', '.modal', function(event) {

                // Stop propagation.
                    event.stopPropagation();

            })
            .prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
                .find('img')
                    .on('load', function(event) {

                        var $modalImg = $(this),
                            $modal = $modalImg.parents('.modal');

                        setTimeout(function() {

                            // No longer visible? Bail.
                                if (!$modal.hasClass('visible'))
                                    return;

                            // Set loaded.
                                $modal.addClass('loaded');

                        }, 275);

                    });

    
    // Hero.
        $('.hero')
            .on('click', 'a', function(event) {

                var $a = $(this),
                    $gallery = $a.parents('.hero'),
                    $modal = $gallery.children('.modal'),
                    $modalImg = $modal.find('img'),
                    href = $a.attr('href');

                // Not an image? Bail.
                    if (!href.match(/\.(jpg|gif|png|mp4)$/))
                        return;

                // Prevent default.
                    event.preventDefault();
                    event.stopPropagation();

                // Locked? Bail.
                    if ($modal[0]._locked)
                        return;

                // Lock.
                    $modal[0]._locked = true;

                // Set src.
                    $modalImg.attr('src', href);

                // Set visible.
                    $modal.addClass('visible');

                // Focus.
                    $modal.focus();

                // Delay.
                    setTimeout(function() {

                        // Unlock.
                            $modal[0]._locked = false;

                    }, 600);

            })
            .on('click', '.modal', function(event) {

                var $modal = $(this),
                    $modalImg = $modal.find('img');

                // Locked? Bail.
                    if ($modal[0]._locked)
                        return;

                // Already hidden? Bail.
                    if (!$modal.hasClass('visible'))
                        return;

                // Stop propagation.
                    event.stopPropagation();

                // Lock.
                    $modal[0]._locked = true;

                // Clear visible, loaded.
                    $modal
                        .removeClass('loaded')

                // Delay.
                    setTimeout(function() {

                        $modal
                            .removeClass('visible')

                        setTimeout(function() {

                            // Clear src.
                                $modalImg.attr('src', '');

                            // Unlock.
                                $modal[0]._locked = false;

                            // Focus.
                                $body.focus();

                        }, 475);

                    }, 125);

            })
            .on('keypress', '.modal', function(event) {

                var $modal = $(this);

                // Escape? Hide modal.
                    if (event.keyCode == 27)
                        $modal.trigger('click');

            })
            .on('mouseup mousedown mousemove', '.modal', function(event) {

                // Stop propagation.
                    event.stopPropagation();

            })
            .prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
                .find('img')
                    .on('load', function(event) {

                        var $modalImg = $(this),
                            $modal = $modalImg.parents('.modal');

                        setTimeout(function() {

                            // No longer visible? Bail.
                                if (!$modal.hasClass('visible'))
                                    return;

                            // Set loaded.
                                $modal.addClass('loaded');

                        }, 275);

                    });
    
    
    
})(jQuery);
