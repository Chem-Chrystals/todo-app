const toggle = document.querySelector(".toggle");
const input = document.querySelector(".todo-input input");
const form = document.querySelector(".todo-input");
const active = document.querySelector("#active");
const completed = document.querySelector("#completed");
const all = document.querySelector("#all");
const clear = document.querySelector("#clear");


let todoValue = [];
let filteredData = todoValue;
let toggled = true;
let current = "active"
const resultContainer = document.querySelector(".results");
toggle.addEventListener("click", (e) => {
  document.body.classList.toggle("theme");
  toggled = !toggled;
  if (!toggled) {
    toggle.setAttribute("src", "./images/icon-moon.svg");
  } else {
    toggle.setAttribute("src", "./images/icon-sun.svg");
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  todoValue.push({
    id: todoValue.length,
    value: input.value,
    completed: false,
  });
    input.value = "";
    if (current === "active") {
        filteredData = todoValue.filter(({ completed }) => !completed); 
    }
   else if (current === "completed") {
        filteredData = todoValue.filter(({ completed }) => completed);   
    }
    else {
        filteredData = todoValue;
    }
  addToDo();
});
const addToDo = () => {
  document.querySelectorAll(".result").forEach((val) => {
    val.remove();
  });
    filteredData.forEach(({ id, value, completed }) => {
    const div = document.createElement("div");
    div.addEventListener("click", () => {
      todoValue = todoValue.map((val) =>
        val.id == id ? { ...val, completed: !todoValue[id].completed } : val
      );
      console.log(todoValue);
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
    div.classList.add("result");
    div.setAttribute("id", `todo-element-${id}`);
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
      resultContainer.appendChild(div);
  });
};
all.addEventListener("click", (e) => {
    filteredData = todoValue;   
    all.classList.add("active");
    active.classList.remove("active");
    completed.classList.remove("active");
    current = "";
    addToDo();
}
)
active.addEventListener("click", (e) => {
    filteredData = todoValue.filter(({ completed }) => !completed); 
    current = "active";
    all.classList.remove("active");
    active.classList.add("active");
    completed.classList.remove("active");
    addToDo();
})
completed.addEventListener("click", (e) => {
    filteredData = todoValue.filter(({ completed }) => completed);   
    current = "completed";
    all.classList.remove("active");
    active.classList.remove("active");
    completed.classList.add("active");
    addToDo();
})
clear.addEventListener("click", () => {
    todoValue = todoValue.filter(({ completed }) => !completed);
    addToDo();
},)