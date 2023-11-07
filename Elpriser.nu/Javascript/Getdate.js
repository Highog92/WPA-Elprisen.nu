function updateDate(e) {
    console.log("updateDate", e);
        let selectedDate = e.target.value
        // console.log("Dato update",selectedDate);
        
        document.getElementById("displayDate").textContent = selectedDate;
        document.getElementById("displaySelectedDate").textContent = selectedDate;
    }