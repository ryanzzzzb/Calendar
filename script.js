//Global Variables
var tasksCompleted = 0;
var tasksDue = 0;

const $tasksComp = document.getElementById('tasksCompleted');
const $tasksP = $tasksComp.querySelector("p");
//update stats
if(localStorage.getItem("tasksCompleted") !== null){
    $tasksP.innerHTML = `&#x1F468;&#x200D;&#x1F373;<br>Tasks Completed<br>${localStorage.getItem("tasksCompleted")}`;
    //update variable
    tasksCompleted = localStorage.getItem("tasksCompleted");
}

//What the fuck how tf does this work
document.getElementById("tasksDue").querySelector("p").innerHTML = `&#x1F92E;<br>Tasks Due<br>${JSON.parse(localStorage.getItem("taskArray")).length}`;


//update date
const date = new Date();
const month = date.getMonth() + 1;
const day = date.getDate();

const $date = document.getElementById("date");
$date.innerHTML = `Dashboard - ${month}/${day}`;

//nav elements
const main=document.getElementById("main");
const tasks=document.getElementById("tasks");


//nav
function changeNav(event){
    const clickedElem = event.target;
    const liContent = clickedElem.textContent.trim();

    //remove active from each li
    const navItems = document.querySelectorAll('#navBar li');
    navItems.forEach(item => item.classList.remove('active'));

    if(liContent == "dashboardDashboard"){
        main.style.display = "block";
        tasks.style.display = "none";
    }else if(liContent == "checklistTasks"){
        main.style.display ="none";
        tasks.style.display = "block";
    }
    clickedElem.parentElement.classList.add('active');
}

//liveTime
function updateTime() {
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
  
    // Add leading zero if time is less than 10
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    var timeString = hours + ":" + minutes + ":" + seconds;
    document.getElementById("liveTime").textContent = timeString;
}
  
setInterval(updateTime, 1000);

//Eventlistener for add task
function addTask(id, task){
    let parentElem = document.getElementById(`${id}`);

    let newDiv = document.createElement("div");

    let radio = document.createElement("input");
    radio.type = "radio";

    let textDiv = document.createElement("div");
    textDiv.textContent = task;

    let removeBtn = document.createElement("span");
    removeBtn.classList.add("material-symbols-outlined");
    removeBtn.textContent = "close";

    newDiv.appendChild(radio);
    newDiv.appendChild(textDiv);
    newDiv.appendChild(removeBtn);
    newDiv.classList.add("task");

    parentElem.appendChild(newDiv);
}

const taskArray = [];

document.getElementById('addTask').addEventListener("keydown", function(e){
    if(e.code === "Enter"){
        e.preventDefault();

        //code...
        addTask("taskListTwo", e.target.value); 
        addTask("taskList", e.target.value); 

        //add to array to save in localstorage
        taskArray.push(e.target.value);
        console.log(taskArray);
        localStorage.setItem("taskArray", JSON.stringify(taskArray));

        //update
        document.getElementById("tasksDue").querySelector("p").innerHTML = `&#x1F92E;<br>Tasks Due<br>${JSON.parse(localStorage.getItem("taskArray")).length}`;

        //clear input
        e.target.value= "";
    }
})

//"remove" buttons
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("material-symbols-outlined") && e.target.textContent === "close") {
        const taskElement = e.target.parentElement;
        const taskListElement = taskElement.parentElement;
        taskListElement.removeChild(taskElement);
        
        let i = taskArray.indexOf(taskElement.querySelector("div").textContent);
        taskArray.splice(i,1);
        localStorage.setItem("taskArray", JSON.stringify(taskArray));

        document.getElementById("tasksDue").querySelector("p").innerHTML = `&#x1F92E;<br>Tasks Due<br>${JSON.parse(localStorage.getItem("taskArray")).length}`;
    }
});

//Add saved elements to dashboard
const quickDisplay = document.getElementById('taskList');
if(localStorage.getItem("taskArray") == null || JSON.parse(localStorage.getItem("taskArray")).length == 0){
    quickDisplay.innerHTML = "No Tasks Yet";
}else{
    const arrString = localStorage.getItem("taskArray");
    const newArr = JSON.parse(arrString);

    for(let i=0; i<newArr.length; i++){
        addTask("taskList", newArr[i]);
        addTask("taskListTwo", newArr[i]);
    }
}

//Eventlistener for check button
document.addEventListener("click", function(e) {
    if (e.target.type === "radio") {
        const taskElement = e.target.parentElement;

        if(confirm("Did you really finish?")){
            const taskListElement = taskElement.parentElement;
            taskListElement.removeChild(taskElement);
            let i = taskArray.indexOf(taskElement.querySelector("div").textContent);
            taskArray.splice(i,1);
            localStorage.setItem("taskArray", JSON.stringify(taskArray));

            tasksCompleted++;
            localStorage.setItem("tasksCompleted", tasksCompleted);

            $tasksP.innerHTML = `&#x1F468;&#x200D;&#x1F373;<br>Tasks Completed<br>${localStorage.getItem("tasksCompleted")}`;
            document.getElementById("tasksDue").querySelector("p").innerHTML = `&#x1F92E;<br>Tasks Due<br>${JSON.parse(localStorage.getItem("taskArray")).length}`;

            console.log("tasks updated");
        }
    }
});
