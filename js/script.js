function setMobileMenu(triggerSelector, modalSelector, closeSelector){
    const trigger = document.querySelector(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          body = document.querySelector('body');
    
    let isOpen = false;

    const disabledBtn = (value) => {
        close.disabled = value;
        trigger.disabled = value;
    }

    const openModal = () => {
        disabledBtn(true);
        body.style.overflow = 'hidden';
        trigger.disabled = true;
        modal.classList.add('animOpenMobileMenu');
        modal.classList.remove('none');
    }

    const closeModal = () => {
        disabledBtn(true);
        modal.classList.remove('animOpenMobileMenu');
        modal.classList.add('animCloseMobileMenu');
        body.style.overflow = 'unset';
    }

    modal.addEventListener('animationend', () => {
        if (isOpen) {
            modal.classList.add('none');
            modal.classList.remove('animCloseMobileMenu');
            isOpen = false;
        } else {
            isOpen = true;
        }

        disabledBtn(false);
    })

    trigger.addEventListener('click', openModal);
    close.addEventListener('click', closeModal);
}

function setFullPageSlider(bgSelector, slideSelector, imgSelector, prevBtnSelector, nextBtnSelector, activeBtnSelector, currentValueSelector, totalValueSelector) {
    /* 
    bgSelector - селектор класса, в котором находится фоновое изображение первого экрана
    slideSelector - селектор отдельных слайдов
    imgSelector - селектор изображения, которые находятся внутри сайтов (подставляются в фоновое изображение при смене слайда)
*/

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

/* Переключение табов */
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

function setTabsBySelector(tabSelector, activeTabSelector, contentSelector) {
    const tabs = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);
    setTabs(tabs, activeTabSelector, content);
}

/* Слайдер комнаты в "Номерной фонд" + динамическое создание превью в навигации*/
function setRoomSlider(imgElements, previewParentElement, previewSelector, previewActiveSelector){

    const createPreview = () => {
        imgElements.forEach((item, index) => {
            const previewEl = document.createElement('button');
            const imgSrc = item.src;

            previewEl.style.backgroundImage = `url(${imgSrc})`;
            previewEl.classList.add(previewSelector.replace(/[.]/g, ''));

            if (index === 0) {
                previewEl.classList.add(previewActiveSelector.replace(/[.]/g, ''));
            }
            previewParentElement.append(previewEl);
        })
    }

    createPreview();

    const imgWrapper = imgElements[0].parentNode;
    const previewElements = previewParentElement.querySelectorAll(previewSelector);
    let lastActivePreview = previewElements[0];

    const setNextSlide = (numSlide) => {
        const widthStep = imgElements[numSlide].width;

        lastActivePreview.classList.remove(previewActiveSelector.replace(/[.]/g, ''))
        previewElements[numSlide].classList.add(previewActiveSelector.replace(/[.]/g, ''));

        imgWrapper.style.transform = `translate(-${numSlide * widthStep}px)`;
        lastActivePreview = previewElements[numSlide];
    }

    previewElements.forEach((item, index) => {
        item.addEventListener('click', () => {
            setNextSlide(index);
        })
    })
}

/* Динамическое навешивание табов и слайдера для раздела "Номерной фонд" */
function setTabRooms(tabSelector, activeTabSelector, contentSelector) {
    const tabs = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);


    setTabs(tabs, activeTabSelector, content);


    content.forEach((corpus) => {
        const roomTabs = corpus.querySelectorAll('.rooms__nav-item');
        const roomTabActiveSelector = '.rooms__nav-item_active';
        const roomsContent = corpus.querySelectorAll('.rooms__room-content');
        setTabs(roomTabs, roomTabActiveSelector, roomsContent);

        roomsContent.forEach(room => {
            const images = room.querySelectorAll('.rooms__room-img');
            const previewBlock = room.querySelector('.rooms__room-preview');
            
            setRoomSlider(images, previewBlock, '.rooms__room-preview-item', '.rooms__room-preview-item_active');
        })
    })
   
}

setMobileMenu('.header__mobile-burger', '.mobile-modal-menu', '.mobile-modal-menu__close');





    