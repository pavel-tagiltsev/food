import {openModal, closeModal} from "./modal";
import {postData} from "../services/services";

function form(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector),
          message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    // Old method - XMLHttpRequest

    // function bindPostData(form) {
        
    //     form.addEventListener("submit", evt => {
    //         evt.preventDefault();
            
    //         let statusMessage = document.createElement('img');
    //         statusMessage.src = message.loading;
    //         statusMessage.style.cssText = `
    //             display: block;
    //             margin: 0 auto;
    //         `;
    //         form.insertAdjacentElement('afterend', statusMessage);

    //         const request = new XMLHttpRequest();
    //         request.open("POST", "server.php");
    //         request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    //         const formData = new FormData(form);
    
    //         const object = {};
    //         formData.forEach(function(value, key){
    //             object[key] = value;
    //         });
    //         const json = JSON.stringify(object);

    //         request.send(json);

    //         request.addEventListener("load", () =>{
    //             if (request.status === 200) {
    //                 console.log(request.response);
    //                 showThanksModal(message.success);
    //                 statusMessage.remove();
    //                 form.reset();
    //             } else {
    //                 showThanksModal(message.failure);
    //                 statusMessage.remove();
    //             }
    //         });
    //     });
    // }
    // The end of old method

    // New method - Promise

    function bindPostData(form) {
        
        form.addEventListener("submit", evt => {
            evt.preventDefault();
            
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
                statusMessage.remove();
            }).finally(() => {
                form.reset();
            });
        });
    }

    // The end of new method

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'),
              modal = document.querySelector(".modal");

        prevModalDialog.classList.add('hide');
        openModal(".modal", modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        modal.append(thanksModal);

        modal.addEventListener("click", evt => {
            if (evt.target === modal || evt.target.getAttribute('data-close') == "") {
                thanksModal.remove();
                prevModalDialog.classList.remove('hide');
                clearTimeout(removeModalTimerId);
            } 
        });
        
        function removeThanksModal() {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            closeModal(".modal");
        }
        
        const removeModalTimerId = setTimeout(removeThanksModal, 4000);
    }
}

export default form;