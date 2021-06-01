function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";

    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const openBtns = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    openBtns.forEach(item => {
        item.addEventListener("click", evt => {
            evt.preventDefault();
            openModal(modalSelector, modalTimerId);
        });  
    });

    modal.addEventListener("click", evt => {
        if (evt.target === modal || evt.target.getAttribute('data-close') == "") {
            closeModal(modalSelector, modalTimerId);
        }
    });

    document.addEventListener("keydown", evt => {
        if (evt.code === "Escape" && modal.classList.contains("show")) {
            closeModal(modalSelector, modalTimerId);
        }
    });

    function showModalByScroll(modalTimerId) {
        if ((window.pageYOffset + document.documentElement.clientHeight) + 1 >= 
        document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);  
        } 
    }

    window.addEventListener('scroll', showModalByScroll);
    
}

export default modal;
export {openModal};
export {closeModal};