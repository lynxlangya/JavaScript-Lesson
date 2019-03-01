new previewSlider({
    container: '.preview-slider',
    content: true,
    arrowLeft: '.arrow-left',
    arrowRight: '.arrow-right',
    scale: 0.4,
    scrollSpeed: 4
});

function previewSlider(obj) {
    this.container = document.querySelector(obj.container);
    this.images = this.container.querySelectorAll('.slider-item');
    this.wrapper = document.querySelector('.slider-wrapper');
    this.left = document.querySelector(obj.arrowLeft);
    this.right = document.querySelector(obj.arrowRight);
    this.width = window.innerWidth;
    this.pos = 0;
    this.scale = obj.scale === undefined ? 0.4 : obj.scale;
    this.scrollSpeed = obj.scrollSpeed === undefined ? 4 : obj.scrollSpeed;
    this.content = obj.content === undefined ? false : obj.content;

    const previewAnimationTime = 2000;
    var slider = this;
    var activeSlide = 0;
    var isAnimate = false;

    this.wrapper.style.transform = 'translate3d(0, 0, 0)';
    this.left.classList.add('hide');

    if (!slider.content) {
        for (var i = 0; i < this.images.length; i++) {
            this.container.removeChild(this.images[i]);

            var newSlide = document.createElement('div');
            newSlide.classList.add('slider-item');
            newSlide.style.backgroundImage = 'url(' + this.images[i].getAttribute('src') + ')';
            this.wrapper.appendChild(newSlide);
        }
    }

    this.slideNext = function (e) {
        if (slider.pos <= ((slider.images.length - 1) * slider.width) * -1) {
            e.preventDefault();
            this.right.classList.add('hide');
        } else if (slider.pos <= ((slider.images.length - 2) * slider.width) * -1) {
            slider.pos -= slider.width;
            slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0)';
            activeSlide++;
            slider.leftPreview();
            this.right.classList.add('hide');
        } else {
            slider.pos -= slider.width;
            slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0)';
            activeSlide++;
            this.left.classList.remove('hide');
            this.right.classList.remove('hide');
            slider.leftPreview();
            slider.rightPreview();
        }

        isAnimate = false;
        slider.right.classList.remove('show');
    }

    this.slidePrev = function (e) {
        if (slider.pos === 0) {
            e.preventDefault();
            this.left.classList.add('hide');
        } else if (activeSlide === 1) {
            slider.pos += slider.width;
            slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0)';
            activeSlide--;
            this.left.classList.add('hide');
            slider.rightPreview();
        } else {
            slider.pos += slider.width;
            slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0)';
            activeSlide--;
            this.right.classList.remove('hide');
            this.left.classList.remove('hide');
            slider.leftPreview();
            slider.rightPreview();
        }

        isAnimate = false;
        slider.left.classList.remove('show');
    }

    this.leftPreview = function () {
        if (activeSlide > 0) {
            var arrow = slider.left.querySelector('.preview');
            var src = slider.images[activeSlide - 1].getAttribute('style').match(/url\(["']?([^"']*)["']?\)/)[1];
            arrow.setAttribute('style', 'background-image: url(' + src + ')');
        }
    }

    this.rightPreview = function () {
        if (activeSlide < slider.images.length - 1) {
            var arrow = slider.right.querySelector('.preview');
            var src = slider.images[activeSlide + 1].getAttribute('style').match(/url\(["']?([^"']*)["']?\)/)[1];
            arrow.setAttribute('style', 'background-image: url(' + src + ')');
        }
    }

    this.previewAnimate = function (e, arrow, direction) {
        arrow.classList.add('animate');
        arrow.classList.add('show');
        isAnimate = true;

        if (direction === 'right') {
            slider.startCounting(counterRight);
            setTimeout(function () {
                slider.slideNext(e);
                arrow.classList.remove('animate');
            }, previewAnimationTime);
        } else {
            slider.startCounting(counterLeft);
            setTimeout(function () {
                slider.slidePrev(e);
                arrow.classList.remove('animate');
            }, previewAnimationTime);
        }
    }

    this.startCounting = function (counter) {
        var count = 0;
        var countdown = setInterval(function () {
            count++;
            counter.innerHTML = count;
            if (count === 100) {
                clearInterval(countdown);
                counter.innerHTML = 0;
            }
        }, previewAnimationTime / 100);
    }

    var gridLeft = document.createElement('div');
    var gridRight = document.createElement('div');
    gridLeft.innerHTML = '<span>See all<br>slides</span>';
    gridRight.innerHTML = '<span>See all<br>slides</span>';
    gridLeft.classList.add('grid');
    gridRight.classList.add('grid');
    this.left.appendChild(gridLeft);
    this.right.appendChild(gridRight);

    var previewLeft = document.createElement('div');
    var previewRight = document.createElement('div');
    previewLeft.classList.add('preview');
    previewRight.classList.add('preview');
    this.left.appendChild(previewLeft);
    this.right.appendChild(previewRight);

    var nextLeft = document.createElement('div');
    var nextRight = document.createElement('div');
    nextLeft.innerHTML = 'Prev<br>Slide';
    nextRight.innerHTML = 'Next<br>Slide';
    nextLeft.classList.add('arrow-link');
    nextRight.classList.add('arrow-link');
    this.left.appendChild(nextLeft);
    this.right.appendChild(nextRight);

    var counterLeft = document.createElement('div');
    var counterRight = document.createElement('div');
    counterLeft.innerHTML = '0';
    counterRight.innerHTML = '0';
    counterLeft.classList.add('counter');
    counterRight.classList.add('counter');
    this.left.appendChild(counterLeft);
    this.right.appendChild(counterRight);

    this.rightPreview();

    previewRight.addEventListener('click', function (e) {
        slider.previewAnimate(e, slider.right, 'right');
    })

    previewLeft.addEventListener('click', function (e) {
        slider.previewAnimate(e, slider.left, 'left');
    })

    this.right.addEventListener('mouseleave', function (e) {
        if (!isAnimate) {
            this.classList.remove('show');
        }
    })

    this.left.addEventListener('mouseleave', function (e) {
        if (!isAnimate) {
            this.classList.remove('show');
        }
    })

    var grids = document.querySelectorAll('.grid');
    var trigger = true;
    var intervalRight = null;
    var intervalLeft = null;

    for (var i = 0; i < grids.length; i++) {
        grids[i].addEventListener('click', function () {
            if (!isAnimate) {
                slider.left.classList.add('hide');
                slider.right.classList.add('hide');
                if (slider.pos === 0) {
                    slider.wrapper.style.transformOrigin = '0'
                } else {
                    slider.pos = slider.pos / (slider.scale * 10);
                }

                slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0) scale(' + slider.scale + ')';
                slider.wrapper.classList.add('zoom');


                setTimeout(function () {
                    function findObjectCoords(mouseEvent) {
                        var obj = slider.wrapper;
                        var obj_left = 0;
                        var obj_top = 0;
                        var xpos;

                        while (obj.offsetParent) {
                            obj_left += obj.offsetLeft;
                            obj_top += obj.offsetTop;
                            obj = obj.offsetParent;
                        }

                        if (mouseEvent) {
                            xpos = mouseEvent.pageX;
                            ypos = mouseEvent.pageY;
                        } else {
                            xpos = window.event.x + document.body.scrollLeft - 2;
                            ypos = window.event.y + document.body.scrollTop - 2;
                        }

                        xpos -= obj_left;
                        ypos -= obj_top;

                        if (xpos >= slider.width - 100) {
                            if (Math.abs(slider.wrapper.getBoundingClientRect().left) != ((slider.images.length * slider.width) * slider.scale) - slider.width) {
                                slider.slideRight(trigger);
                                trigger = false;
                            }
                        } else if (xpos <= 100) {
                            if (slider.wrapper.getBoundingClientRect().left != 0) {
                                slider.slideLeft(trigger);
                                trigger = false;
                            }
                        } else {
                            clearInterval(intervalRight);
                            clearInterval(intervalLeft);
                            trigger = true;
                        }
                    }

                    slider.wrapper.onmousemove = findObjectCoords;
                }, 1000);
            }
        })
    }

    this.slideRight = function (trigger) {
        if (trigger && slider.wrapper.classList.contains('zoom')) {
            slider.wrapper.style.transition = 'none';
            intervalRight = setInterval(function () {
                slider.pos -= slider.scrollSpeed;
                slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0) scale(' + slider.scale + ')';

                if (Math.abs(slider.wrapper.getBoundingClientRect().left) === ((slider.images.length * slider.width) * slider.scale) - slider.width) {
                    clearInterval(intervalRight);
                }
            }, 1);
        }
    }

    this.slideLeft = function (trigger) {
        if (trigger && slider.wrapper.classList.contains('zoom')) {
            slider.wrapper.style.transition = 'none';
            intervalLeft = setInterval(function () {
                slider.pos += slider.scrollSpeed;
                slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0) scale(' + slider.scale + ')';

                if (slider.wrapper.getBoundingClientRect().left === 0) {
                    clearInterval(intervalLeft);
                }
            }, 1);
        }
    }

    for (var i = 0; i < this.images.length; i++) {
        (function (index) {
            slider.images[i].addEventListener('click', function () {
                if (slider.wrapper.classList.contains('zoom')) {
                    slider.wrapper.style.transition = 'all 1s ease-in-out';
                    slider.wrapper.classList.remove('zoom');

                    slider.pos = (index * slider.width) * -1;
                    activeSlide = index;

                    slider.wrapper.style.transform = 'translate3d(' + slider.pos + 'px, 0, 0)';

                    if (index === 0) {
                        slider.right.classList.remove('hide');
                    } else if (index === slider.images.length - 1) {
                        slider.left.classList.remove('hide');
                    } else {
                        slider.right.classList.remove('hide');
                        slider.left.classList.remove('hide');
                    }

                    slider.leftPreview();
                    slider.rightPreview();
                }
            });
        })(i);
    }
}