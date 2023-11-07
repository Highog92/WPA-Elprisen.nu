import { useFetch } from "./ElprisFetch/Elpris_fetch.js";
window._myEventListner = { updateDate };

const getMonth = () => {
    let month = new Date().getMonth() + 1
    // Hvis måneden er under 10 så tilføjer den et nul
    // Fordi javascripten kun tilføjer 1 tal ad gangen
    if (month < 10) {
        return `0${month}`
    } else {
        return month
    }
}

// For dagen
const getDate = () => {
    let date = new Date().getDate()
    // Hvis måneden er under 10 så tilføjer den et nul
    // Fordi javascripten kun tilføjer 1 tal ad gangen
    if (date < 10) {
        return `0${date}`
    } else {
        return date
    }
}

let priceColors = (price) => {

    if (price <= 0.100) {
        return `color: #00ff6a;`
    } else if (price <= 0.200) {
        return `color: #68CC31;`

    } else if (price <= 0.300) {

        return `color: #68CC31;`
    } else if (price <= 0.500) {

        return `color: #F8EE00;`
    } else if (price <= 0.700) {

        return `color: #FFC400;`
    } else if (price <= 0.800) {

        return `color: #FF8A00;`
    } else if (price <= 0.900) {

        return `color: #FF5700;`
    } else if (price <= 1.000) {
        return `color: #FF1900;`

    } else if (price >= 1.000) {
        return `color: #FF1900`
    }
}


async function getHistoryData(year, month, day) {

    let hour = new Date().getHours()
    console.log(day, month, year);

    let data = await useFetch
        (`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_DK1.json`)

    let history = document.querySelector('.historyBars')
    history.innerHTML = ` `
    
    data.map(item => {
        history.innerHTML += `
        <div class="historyBars">
        <p>
           kl. ${item.time_start.slice(11, 16)}
        </p>
        <p style="${priceColors(item.DKK_per_kWh)}">
            ${item.DKK_per_kWh.toFixed(3)} kr.
        </p>
    </div>
        `
    })


    console.log(data);
}

let day = getDate()
let month = getMonth()
let year = new Date().getFullYear();

getHistoryData(year, month, day)

function updateDate(e) {
    let selectedDate = e.target.value
    console.log("Dato update", selectedDate);

    getHistoryData(selectedDate.slice(0, 4), selectedDate.slice(5, 7), selectedDate.slice(8, 10))

    document.getElementById("displayDate").textContent = selectedDate;
    document.getElementById("displaySelectedDate").textContent = selectedDate;
}
