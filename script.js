const form = document.querySelector("#workout-form");
const table = document.querySelector("#records-table");
const recordsBody = document.querySelector("#records-body");
const emptyState = document.querySelector("#empty-state");
const dateInput = document.querySelector("#training-date");

dateInput.valueAsDate = new Date();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const record = {
    trainingDate: formData.get("trainingDate"),
    duration: formData.get("duration"),
    exercise: formData.get("exercise").trim(),
    sets: formData.get("sets"),
    weight: formData.get("weight"),
  };

  addRecord(record);
  form.reset();
  dateInput.valueAsDate = new Date();
  dateInput.focus();
});

function addRecord(record) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${formatDate(record.trainingDate)}</td>
    <td>${record.duration} 分钟</td>
    <td>${escapeHtml(record.exercise)}</td>
    <td>${record.sets} 组</td>
    <td>${record.weight} 公斤</td>
  `;

  recordsBody.prepend(row);
  table.hidden = false;
  emptyState.hidden = true;
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${dateValue}T00:00:00`));
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return entities[character];
  });
}
