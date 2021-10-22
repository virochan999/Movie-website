// const { render } = require("node-sass");

let menuBar = document.getElementsByClassName("menu-bar")[0];
let menuBox = document.getElementsByClassName("menu-box")[0];

//activate the toggle menu on click
menuBar.addEventListener('click', () => {
    menuBox.classList.toggle('active')
});


// Adjust the document width with respect to navigation menu
document.getElementsByClassName('menu-bar')[0].addEventListener('click', () => {
    if (menuBar.classList.toggle('active')) {
    document.getElementsByClassName('sidebar')[0].style.cssText = 'width: 20%';
    document.getElementsByClassName('main-section')[0].style.cssText = "width: 80%";
    document.getElementsByClassName('filtered-container')[0].style.cssText = "grid-template-columns: repeat(6, max-content)";
    }
    else {
        document.getElementsByClassName('sidebar')[0].style.cssText = 'width 0%';
        document.getElementsByClassName('main-section')[0].style.cssText = "width: 100%";
        document.getElementsByClassName('filtered-container')[0].style.cssText = "grid-template-columns: repeat(8, max-content)";
    }
})

// Categories list script for displaying according to the clicks on the screen
document.addEventListener('click' , e => {
    const isDropDownButton = e.target.matches("[data-dropdown-button]");
    if (!isDropDownButton && e.target.closest('[data-dropdown]') != null) {
        return
    }
    let currentDropDown;
    if (isDropDownButton) {
        currentDropDown = e.target.closest('[data-dropdown]');
        currentDropDown.classList.toggle('active')
    }
    document.querySelectorAll('[data-dropdown].active').forEach(dropDown => {
            if (dropDown === currentDropDown) {
                return
            }
            dropDown.classList.remove('active');
        })
    
})

//Check if viewport is smaller than 500 pixels
// document.getElementsByClassName('menu-bar')[0].addEventListener('click', () => {
//     if(window.innerWidth < 500  && menuBar.classList.toggle('active')) {
//         console.log(window.innerWidth)
//         document.getElementsByClassName('siderbar')[0].style.cssText = "width: 100%";
//         document.getElementsByClassName('main-section')[0].style.cssText = "width: 0%";
//     }else if(window.innerWidth > 500  && menuBar.classList.toggle('active')){ //Else we have a larger screen
//         console.log(window.innerWidth)
//         document.getElementsByClassName('sidebar')[0].style.cssText = 'width: 20%';
//         document.getElementsByClassName('main-section')[0].style.cssText = "width: 80%";
//         if(window.innerWidth > 500  && !(menuBar.classList.toggle('active'))) {
//             console.log("inside")
//             document.getElementsByClassName('sidebar')[0].style.cssText = 'width: 0%';
//             document.getElementsByClassName('main-section')[0].style.cssText = "width: 100%";
//         }
//         // else {
//         //     document.getElementsByClassName('sidebar')[0].style.cssText = 'width: 20%';
//         //     document.getElementsByClassName('main-section')[0].style.cssText = "width: 80%";
//         // }
//     }
// })

$(function(){
    $(window).on('resize', function(){
        if(window.innerWidth < 500){
            console.log(window.innerWidth);
            $('#myModel').removeClass('fa-2x');
            
        }
    });
});

// carousel script
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children); //takes all the track childrens into the array ie carousel-slides

const nextButton = document.querySelector('.carousel-btn-right');
const prevButton = document.getElementsByClassName('carousel-btn-left')[0];
const carouselNav = document.querySelector('.carousel-nav');
const carouselDots = Array.from(carouselNav.children); //carousel nav indicators

const slideWidth = slides[0].getBoundingClientRect().width; //for getting the width of current slide

// arrange the slides next to one another
// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';
const setSlidePosition = ((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
});
slides.forEach(setSlidePosition);

// common function to move the target slides.
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')'; // it takes the amount of width of current slide to move next slide in
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

//changing dot color according to the current slide
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
} 

// Hide the arrows when they are of no use 
const hideShowArrow = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

//when i click, move slides to the left
prevButton.addEventListener('click', e =>{
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = carouselNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrow(slides, prevButton, nextButton, prevIndex);
});

//when i click, move slides to the right
nextButton.addEventListener('click', e =>{
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = carouselNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrow(slides, prevButton, nextButton, nextIndex);
});

//when i click the nav indicators, move to that slide
carouselNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');  // only need the button when clicked

    if(!targetDot) {
        return;
    }
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = carouselNav.querySelector('.current-slide');
    const targetIndex = carouselDots.findIndex(dot => dot === targetDot); //returning the current index of the targetted dot.
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);  

    //changing dot color according to the current slide
    updateDots(currentDot, targetDot);

    hideShowArrow(slides, prevButton, nextButton, targetIndex);
})


// Card sliders
let cardContainers = [...document.querySelectorAll('.card-container')];
let prebtns =  [...document.querySelectorAll('.moviesList-pre-btn')];
let nextbtns =  [...document.querySelectorAll('.moviesList-next-btn')];

// Move the cards according to specified width when clciked on slider btns.
cardContainers.forEach((item, i) => {
    let containerDimentions = item.getBoundingClientRect();
    let containerWidth = containerDimentions.width;
    nextbtns[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth - 200;
    })
    prebtns[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth + 200;
    })
})


// add a popup to the login button
document.getElementsByClassName('open-button')[0].addEventListener('click', () => {
    document.getElementById("myForm").style.display = "block";
})
  
function closeForm() {
document.getElementById("myForm").style.display = "none";
}
