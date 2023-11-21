import { useFetch } from "./ElprisFetch/Elpris_fetch";


async function getOptionsData() {
    let hour = new Date().getHours()
    let day = getDate()
    let month = getMonth()
    let year = new Date().getFullYear();
    console.log(hour, day, month, year);

    let data = await useFetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_DK1.json`)

    let powerPrice = document.querySelector('#powerPrice')
    powerPrice.innerHTML = `            
    <span id="powerPrice" style="${priceColors(data[hour].DKK_per_kWh)}">
        ${data[hour].DKK_per_kWh} kr.<br/>PR. KWH
    </span>
    `

    // style = "${priceColors(item.DKK_per_kWh)}"


    let timePeriodStart = document.querySelector('.timePeriod span')
    timePeriodStart.innerHTML = `${data[hour].time_start.slice(11, 16)} - ${data[hour].time_end.slice(11, 16)}`


    console.log(data);
}

getOptionsData()

