import flatpickr from "flatpickr";
import "flatpickr/dist/esm/l10n/es.js";
import rangePlugin from "flatpickr/dist/esm/plugins/rangePlugin";

function calendarHistory() {
  const inputStartDay = document.querySelector("#day");
  const inputEndDay = document.querySelector("#day_end");
  const inputStartMonth = document.querySelector("#month");
  const inputEndMonth = document.querySelector("#month_end");
  const inputStartYear = document.querySelector("#year");
  const inputEndYear = document.querySelector("#year_end");

  flatpickr("#startDate", {
    locale: 'es',
    plugins: [new rangePlugin({ input: "#endDate" })],
    dateFormat: "d-m-Y",
    disableMobile: "true",
    onChange: function(selectedDates, dateStr, instance) {
      inputStartDay.value = selectedDates[0].getDate();
      inputStartMonth.value = selectedDates[0].getMonth();
      inputStartYear.value = selectedDates[0].getFullYear();
      if (selectedDates[1]) {
        inputEndDay.value = selectedDates[1].getDate();
        inputEndMonth.value = selectedDates[1].getMonth();
        inputEndYear.value = selectedDates[1].getFullYear();
      }
    }
  });
}

export default calendarHistory
