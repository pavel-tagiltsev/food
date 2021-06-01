function calc() {
    const result = document.querySelector(".calculating__result span");
    let sex, height, weight, age, ratio;

    if (localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else {
        sex = "female";
        localStorage.setItem("sex", "female");
    }

    if (localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    } else {
        ratio = 1.375;
        localStorage.setItem("ratio", 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            
            if (elem.getAttribute("data-sex") === localStorage.getItem("sex")) {
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings("#gender div", "calculating__choose-item_active");
    initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "____";  
            return;
        }

        if (sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

    }

    calcTotal();

    function getStaticInformation(parentSelector, activeSelector) {
        const parentElement = document.querySelector(parentSelector),
              elements = document.querySelectorAll(`${parentSelector} div`);

        function setAciveClass(elem) {
            elements.forEach(element => {
                element.classList.remove(activeSelector);
            });
    
            elem.classList.add(activeSelector);
        }
   
        parentElement.addEventListener("click", evt => {
            if(evt.target.getAttribute("data-ratio")) {
                ratio = +evt.target.getAttribute("data-ratio");
                localStorage.setItem("ratio", +evt.target.getAttribute("data-ratio"));
                setAciveClass(evt.target);
                calcTotal();
            } else if (evt.target.getAttribute("data-sex")) {
                sex = evt.target.getAttribute("data-sex");
                localStorage.setItem("sex", evt.target.getAttribute("data-sex"));
                setAciveClass(evt.target);
                calcTotal();
            }
        });
    }

    getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");
    getStaticInformation("#gender", "calculating__choose-item_active");

    function getDynamicInformation(inputSelector) {
        let input = document.querySelector(inputSelector);

        input.addEventListener("input", () => {

            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }
    
    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");
}

export default calc;