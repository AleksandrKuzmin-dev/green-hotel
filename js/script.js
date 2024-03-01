/* 
    bgSelector - селектор класса, в котором находится фоновое изображение первого экрана
    slideSelector - селектор отдельных слайдов
    imgSelector - селектор изображения, которые находятся внутри сайтов (подставляются в фоновое изображение при смене слайда)
*/
function setFullPageSlider(bgSelector, slideSelector, imgSelector, prevBtnSelector, nextBtnSelector, activeBtnSelector, currentValueSelector, totalValueSelector) {
    const bgBlock = document.querySelector(bgSelector),
            slides = document.querySelectorAll(slideSelector),
            prevBtn = document.querySelector(prevBtnSelector),
            nextBtn = document.querySelector(nextBtnSelector),
            currentValue = document.querySelector(currentValueSelector),
            totalValue = document.querySelector(totalValueSelector);

    const quantitySlides = slides.length;
    let currentSlide = 0;
    let currentBg = 0;
    let bg;

    const addZeroToNumber = (num) => {
        if (num > 9) return num;

        return `0${num}`
    }

    const changeBg = (imgSrc) => {
        bg[currentBg].classList.add('none');
        currentBg = currentBg ? 0 : 1;
        bg[currentBg].src = imgSrc;
        bg[currentBg].classList.remove('none');
    
    }

    const setActiveBtn = (slideNumber) => {
        const activeSelector = activeBtnSelector.replace(/[.]/g, '');
        if (slideNumber === quantitySlides - 1) {
            prevBtn.classList.add(activeSelector);
            nextBtn.classList.remove(activeSelector)
        } else if (slideNumber === 0){
            prevBtn.classList.remove(activeSelector);
            nextBtn.classList.add(activeSelector)
        } else {
            prevBtn.classList.add(activeSelector);
            nextBtn.classList.add(activeSelector)
        }
    }

    const setSlide = (slideNumber) => {

        if (slideNumber > quantitySlides - 1) {
            currentSlide = slideNumber - 1;
        } else if (slideNumber < 0) {
            currentSlide = 0;
            
        } else {
            currentSlide = slideNumber;
        }

        setActiveBtn(currentSlide);

        slides.forEach((item, i) => {
            item.classList.add('none');

            if (i === currentSlide) {
                item.classList.add('fadeInFromNone');
                const imgSrc = item.querySelector(imgSelector).src;
                item.classList.remove('none');
                changeBg(imgSrc);
            } 
        })

        currentValue.textContent = addZeroToNumber(currentSlide + 1);
    }

    const initializationSlider = () => {
        totalValue.textContent = addZeroToNumber(quantitySlides);

        const duplicateBgBlock = bgBlock.cloneNode();
        const comment = document.createComment("Это технический блок, созданный автоматически и необходимый для работы слайдера");

        duplicateBgBlock.classList.add('none');
        duplicateBgBlock.append(comment);
        bgBlock.after(duplicateBgBlock);

        bg = document.querySelectorAll(bgSelector);

        prevBtn.addEventListener('click', () => {
            setSlide(currentSlide - 1);
        })

        nextBtn.addEventListener('click', () => {
            setSlide(currentSlide + 1);     
        })
    }

    initializationSlider();
} 

function setTabs(tabsElements, activeTabSelector, contentElements) {
    let lastContent = contentElements[0];
    let lastTab = tabsElements[0];
    

    tabsElements.forEach((item, index) => {
        item.addEventListener('click', () => {
            lastContent.classList.add('none');
            lastTab.classList.remove(activeTabSelector.replace(/[.]/g, ''));
        
            tabsElements[index].classList.add(activeTabSelector.replace(/[.]/g, ''));
            contentElements[index].classList.remove('none');

            lastTab = tabsElements[index];
            lastContent = contentElements[index];

        })
    })
}



function setTabRooms(tabSelector, activeTabSelector, contentSelector) {
    const tabs = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);


    setTabs(tabs, activeTabSelector, content);


    content.forEach((corpus) => {
        const roomTabs = corpus.querySelectorAll('.rooms__nav-item');
        const roomTabActiveSelector = '.rooms__nav-item_active';
        const roomContent = corpus.querySelectorAll('.rooms__room-content');
        setTabs(roomTabs, roomTabActiveSelector, roomContent);

        roomContent.forEach(item => {
            const images = item.querySelectorAll('.rooms__room-img');
            const previewBlock = item.querySelectorAll('.rooms__room-preview');
            /* Здесь будет вызов функции слайдера */
        })
    })
   
}

setTabRooms('.rooms__corpus-nav-item', '.rooms__corpus-nav-item_active', '.rooms__wrapper');



    