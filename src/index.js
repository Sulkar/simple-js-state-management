import "./style/index.scss";

import { State } from "./State";

//buttons
const app = document.getElementById("app");
app.insertAdjacentHTML("beforeend", "<h1 id='header'>Hello World</h1>");
app.insertAdjacentHTML("beforeend", "<button type='button' class='' id='btnTest1'>Change state value</button>");
app.insertAdjacentHTML("beforeend", "<button type='button' class='' id='btnTest3'>check state</button>");
app.insertAdjacentHTML("beforeend", "<button type='button' class='' id='btnTest2'>unsubscribe counter</button>");
app.insertAdjacentHTML("beforeend", "<br><br>");
app.insertAdjacentHTML("beforeend", "<h2 id='counter'>0</h2>");
app.insertAdjacentHTML("beforeend", "<button type='button' class='' id='btnCounterPlus'>+</button>");
app.insertAdjacentHTML("beforeend", "<button type='button' class='' id='btnCounterReset'>reset</button>");
app.insertAdjacentHTML("beforeend", "<button type='button' class='' id='btnCounterMinus'>-</button>");

//subscribe a function to state with a trigger
const myFunction = {
  name: "subMessage1",
  trigger: "message",
  function: () => {
    console.log("I was triggered by changing the value of 'message'");
    document.getElementById("header").innerHTML = State.instance.getValue("message");
  },
};
State.instance.subscribe(myFunction);

//subscribe another function to state with a trigger
const myCounter = {
  name: "subCounter1",
  trigger: "counter",
  function: () => {
    document.getElementById("counter").innerHTML = State.instance.getValue("counter");
  },
};
State.instance.subscribe(myCounter);

//add key, value to state
State.instance.editState("message", "simple state management");
State.instance.editState("counter", 0);

// BUTTONS //
//update state value and so, trigger subscribed function
document.getElementById("btnTest1").addEventListener("click", function () {
  State.instance.editState("message", "really simple!");
});
//unsubscribe the function from state by name
document.getElementById("btnTest2").addEventListener("click", function () {
  State.instance.unsubscribe("subCounter1");
});
//display current state
document.getElementById("btnTest3").addEventListener("click", function () {
  console.log(State.instance.getState());
});

//Counter buttons
document.getElementById("btnCounterPlus").addEventListener("click", function () {
  let currentCounter = State.instance.getValue("counter");
  currentCounter++;
  State.instance.editState("counter", currentCounter);
});
document.getElementById("btnCounterReset").addEventListener("click", function () {
  State.instance.editState("counter", 0);
});
document.getElementById("btnCounterMinus").addEventListener("click", function () {
  let currentCounter = State.instance.getValue("counter");
  currentCounter--;
  State.instance.editState("counter", currentCounter);
});
