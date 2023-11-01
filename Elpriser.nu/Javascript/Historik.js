import { useFetch } from "./ElprisFetch/Elpris_fetch.js";

async function getOverviewData() {

    let hour = new Date().getHours()
    let day = getDate()
    let month = getMonth()
    let year = new Date().getFullYear();
    console.log(hour, day, month, year);

    let data = await useFetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_DK1.json`)
}

getHistoryData()
