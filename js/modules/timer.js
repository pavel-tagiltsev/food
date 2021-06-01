function timer(id, deadline) {

    function getTimeRemaining(endtime) {
       const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60 ) % 60),
            seconds = Math.floor(t / 1000 % 60);

        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);

    function showDateEnd(deadline) {
        const endtime = new Date(Date.parse(deadline)),
              month = getStringMonth(),
              days = endtime.getDate(),
              hours = endtime.getHours(),
              mins = endtime.getMinutes();

        function getStringMonth() {
            const arr = ["января", "февраля", "марта", "апреля", "мая", 
            "июня", "июля", "августа", "сентября", 
            "октября", "ноября", "декабря"];

            let stringMonth;
            
            arr.forEach((month, i) => {
                if (endtime.getMonth() === i) {
                    stringMonth = month;
                }
            });

           return stringMonth;
        }
        
        document.querySelector("[data-date-end]").textContent = 
        `${days} ${month} в ${getZero(hours)}:${getZero(mins)}`;
    }

    showDateEnd(deadline);
}

export default timer;