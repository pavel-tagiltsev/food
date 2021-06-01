function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    let offset = 0;
    let slideIndex = 1;
 
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          width = window.getComputedStyle(slidesWrapper).width,
          slidesField = document.querySelector(field);
    
    function setZero() {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent =  `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent =  slideIndex;
        }
    }

    setZero();
     
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
 
    slidesWrapper.style.overflow = 'hidden';
 
    slides.forEach(slide => {
         slide.style.width = width;
    });
 
    slider.style.position = 'relative';

    // Create a panel for dots
    
    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
        `;
    slider.append(indicators);
     
    // Create dots

    const dots = [];
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
            `;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }
    
    // Helpers

    function deleteNotDigits(str){
        return +str.replace(/\D/g, "");
    }
    
    function setActiveDot() {
    dots.forEach(dot => dot.style.opacity = ".5");
    dots[slideIndex-1].style.opacity = 1;
    }

    function moveSlide(offset) {
    slidesField.style.transform = `translateX(-${offset}px)`;
    }

    // Adding listeners

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width); 
        }

        moveSlide(offset);

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        setZero();
        setActiveDot();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        moveSlide(offset);

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        setZero();
        setActiveDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (evt) => {
            const slideTo = evt.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            moveSlide(offset);
            setZero();
            setActiveDot();
        });
    });
 
}

export default slider;
 
    //My variat
     
    //  function slider(){
         // const slides = document.querySelectorAll(".offer__slide"),
         //     next = document.querySelector(".offer__slider-next"),
         //     prev = document.querySelector(".offer__slider-prev"),
         //     sliderWrapper = document.querySelector(".offer__slider-wrapper"),
         //     sliderInner = document.querySelector(".offer__slider-inner"),
         //     width = window.getComputedStyle(sliderWrapper).width;
             
         // let slideIndex = 0;
     
         // sliderInner.style.display = "flex";
         // sliderInner.style.width = 100 * slides.length + "%";
         // sliderInner.style.transition = "0.5s";
         // sliderWrapper.style.overflow = "hidden";
     
         // const slider = document.querySelector(".offer__slider");
         // const dotContainer = document.createElement("div");
         
         // slider.style.position = "relative";
         // dotContainer.classList.add("carousel-indicators");
     
         
         // function offsets() {
         //     let arr = [0];
         //     let counter = 0;
     
         //     for(let i = 0; i < slides.length - 1; i++) {
         //         arr.push(counter += -width.slice(0, width.length - 2));
         //     }
             
         //     return arr;
         // }
     
         // let newArr = offsets();
                 
         // function createDots() {
         //     for (let i = 0; i < slides.length; i++) {
         //         let dot = document.createElement("div");
         //         dot.classList.add("dot");
         //         dot.setAttribute("id", `${i}`);
         //         if (i == slideIndex) {
         //             dot.classList.add("dot_active");
         //         }
     
         //         dotContainer.append(dot);
         //     }
         //     slider.append(dotContainer);
         // }
         
         // createDots();
     
         // function setActiveDot() {
         //     let dots = document.querySelectorAll(".dot");
         //         dots.forEach((dot, i) => {
         //             dot.classList.remove("dot_active");
     
         //             if (i === slideIndex) {
         //                 dot.classList.add('dot_active');
         //             }
         //         });
         // }
     
         // function deactivateNext() {
         //     if (slideIndex + 1 === slides.length) {
         //         next.style.opacity = "0.5";
         //         next.style.cursor = "default";
         //     } else {
         //         prev.style.opacity = "1";
         //         prev.style.cursor = "pointer";
         //     }
         // }
     
         // function deactivatePrev() {
         //     if (slideIndex === 0) {
         //         prev.style.opacity = "0.5"; 
         //         prev.style.cursor = "default";
         //     } else {
         //         next.style.opacity = "1";
         //         next.style.cursor = "pointer";
         //     }
         // }
     
         // deactivatePrev();
     
         // dotContainer.addEventListener("click", (evt) => {
         //     const target = evt.target;
         //     if (target.classList.contains("dot")) {
         //         let id = +target.id;
         //         slideIndex = id;
         //         sliderInner.style.transform = `translateX(${newArr[slideIndex]}px)`;
         //         showCurrent(slideIndex);
     
         //         setActiveDot();
         //     }
         // });
     
     
         // next.addEventListener('click', () => {
         //     if (slideIndex >= 0 && slideIndex < slides.length - 1) {
         //         slideIndex++;
         //         showCurrent(slideIndex);
         //         setActiveDot();
         //     } 
     
         //    deactivateNext();
     
         //     sliderInner.style.transform = `translateX(${newArr[slideIndex]}px)`;
         // });
     
         // prev.addEventListener('click', () => {
         //     if (slideIndex > 0) {
         //         slideIndex--;
         //         showCurrent(slideIndex);
         //         setActiveDot();
         //     }
     
         //     deactivatePrev();
     
         //     sliderInner.style.transform = `translateX(${newArr[slideIndex]}px)`;
         // });
     
         // function showTotal(slides) {
         //     const slidesCounter = document.querySelector("#total");
             
         //     if (slides.length < 10) {
         //         slidesCounter.textContent = "0" + slides.length;
         //     } else {
         //         slidesCounter.textContent = slides.length;
         //     }
         // }
     
         // function showCurrent(slideIndex) {
         //     let currentSlideNumber = document.querySelector("#current");
     
         //     if (slides.length < 10) {
         //         currentSlideNumber.textContent = "0" + (slideIndex + 1);
         //     } else {
         //         currentSlideNumber.textContent = (slideIndex + 1);
         //     }
         // }
         
         // showTotal(slides);
         // showCurrent(slideIndex);

    //  }
         


     // Simple slider
     
    //  function slider() {
         // let i = 0;
         
         // next.addEventListener("click", () => {
         //     if (i < slides.length - 1) {
         //         i++;
         //     }
         //     hideSlides(slides);
         //     showSlide(slides, i); 
         //     showCurrent(i);
         // });
         
         // prev.addEventListener("click", () => {
         //     if (i > 0 && i <= slides.length - 1) {
         //         i--;
         //     }
         //     hideSlides(slides);
         //     showSlide(slides, i);  
         //     showCurrent(i);
         // });
         
         // function hideSlides(slides) {
         //     slides.forEach(slide => {
         //         slide.classList.add("hide");
         //         slide.classList.remove("show");
         //     });
         // }
         
         // function showSlide(slides, i) {
         //     slides[i].classList.remove("hide");
         //     slides[i].classList.add("show");
         // }
     
         // function showTotal(slides) {
         //     const slidesCounter = document.querySelector("#total");
             
         //     if (slides.length < 10) {
         //         slidesCounter.textContent = "0" + slides.length;
         //     } else {
         //         slidesCounter.textContent = slides.length;
         //     }
         // }
         
         // function showCurrent(i) {
         //     let currentSlideNumber = document.querySelector("#current");
     
         //     if (slides.length < 10) {
         //         currentSlideNumber.textContent = "0" + (i + 1);
         //     } else {
         //         currentSlideNumber.textContent = (i + 1);
         //     }
         // }
       
         // hideSlides(slides);
         // showSlide(slides, 0);
         // showTotal(slides);
         // showCurrent(i);

    //  }
 