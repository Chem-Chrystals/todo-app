// Queried html elements
const toggle = document.querySelector(".toggle");
const input = document.querySelector(".todo-input input");
const form = document.querySelector(".todo-input");
const active = document.querySelector("#active");
const completed = document.querySelector("#completed");
const all = document.querySelector("#all");
const clear = document.querySelector("#clear");
const resultContainer = document.querySelector(".results");

// array for to do elements
let todoValue = [];

// array for filtered data
let filteredData = todoValue;

// closure for selected element
let toggled = true;

// currently selected filter
let current = "active";

// added eventlistener to toggle between themes
toggle.addEventListener("click", (e) => {
  document.body.classList.toggle("theme");
  toggled = !toggled;
  if (!toggled) {
    toggle.setAttribute("src", "./images/icon-moon.svg");
  } else {
    toggle.setAttribute("src", "./images/icon-sun.svg");
  }
});

// added form eventlistener to get work on submitted data

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // store new values in array
  todoValue.push({
    id: todoValue.length,
    value: input.value,
    completed: false,
  });

  // clear input
  input.value = "";

  // check for current filter
  if (current === "active") {
    filteredData = todoValue.filter(({ completed }) => !completed);
  } else if (current === "completed") {
    filteredData = todoValue.filter(({ completed }) => completed);
  } else {
    filteredData = todoValue;
  }

  // refresh to do list
  addToDo();
});

// function to handle to todo elements
const addToDo = () => {
  // clear out all current element in todo
  document.querySelectorAll(".result").forEach((val) => {
    val.remove();
  });

  // Add new elements
  filteredData.forEach(({ id, value, completed }) => {
    const div = document.createElement("div");

    // add event listener to toggle checked
    div.addEventListener("click", () => {
      // map through the values
      todoValue = todoValue.map((val) =>
        val.id == id ? { ...val, completed: !todoValue[id].completed } : val
      );

      // checked if current index is checked
      if (todoValue[id].completed) {
        div.innerHTML = `
                <span class="check-input check-active">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                </span>
                <p><s>${value}</s></p>`;
      } else {
        div.innerHTML = `
    <span class="check-input"></span>
            <p>${value}</p>`;
      }
    });
    // add result class for styling
    div.classList.add("result");

    // add todo elements
    div.setAttribute("id", `todo-element-${id}`);

    // check completed status
    if (completed) {
      div.innerHTML = `
                <span class="check-input check-active">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                </span>
                <p><s>${value}</s></p>`;
    } else {
      div.innerHTML = `
    <span class="check-input"></span>
            <p>${value}</p>`;
    }

    // add elements to D.O.M
    resultContainer.appendChild(div);
  });
};

// toggle filter and active class
all.addEventListener("click", (e) => {
  filteredData = todoValue;
  all.classList.add("active");
  active.classList.remove("active");
  completed.classList.remove("active");
  current = "";
  addToDo();
});

// toggle filter and active class
active.addEventListener("click", (e) => {
  filteredData = todoValue.filter(({ completed }) => !completed);
  current = "active";
  all.classList.remove("active");
  active.classList.add("active");
  completed.classList.remove("active");
  addToDo();
});

// toggle filter and active class
completed.addEventListener("click", (e) => {
  filteredData = todoValue.filter(({ completed }) => completed);
  current = "completed";
  all.classList.remove("active");
  active.classList.remove("active");
  completed.classList.add("active");
  addToDo();
});

// clear completed tasks
clear.addEventListener("click", () => {
  todoValue = todoValue.filter(({ completed }) => !completed);
  addToDo();
});
