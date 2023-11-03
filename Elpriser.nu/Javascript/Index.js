import { useFetch } from "./ElprisFetch/Elpris_fetch.js";


// Service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../../sw.js')
        .then(reg => console.log('service worker registered', reg))
        .catch(err => console.error('service worker not registred'))
}

// For måneden
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
    } else if (price >= 1.000) {

        return `color: #FF1900;`
    }

}


async function getIndexData() {
    let hour = new Date().getHours()
    let day = getDate()
    let month = getMonth()
    let year = new Date().getFullYear();
    console.log(hour, day, month, year);

    let data = await useFetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_DK1.json`)

    let powerPrice = document.querySelector('#powerPrice')
    powerPrice.innerHTML =  `            
    <span id="powerPrice" style="${priceColors(data[hour].DKK_per_kWh)}">
        ${data[hour].DKK_per_kWh} kr.<br/>PR. KWH
    </span>
    `

    // style = "${priceColors(item.DKK_per_kWh)}"


let timePeriodStart = document.querySelector('.timePeriod span')
timePeriodStart.innerHTML = `${data[hour].time_start.slice(11, 16)} - ${data[hour].time_end.slice(11, 16)}`


console.log(data);
}

getIndexData()



