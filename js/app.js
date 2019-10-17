
// Select the Elements
clear = document.querySelector(".clear");
dateElement = document.getElementById("date");
list = document.getElementById("list");
input = document.getElementById("input");

// Classes names
CHECK = "fa-check-circle";
UNCHECK = "fa-circle-thin";
LINE_THROUGH = "lineThrough";

// get item from localstorage
// data = localStorage.getItem("TODO");
$.get("http://localhost:3000/tasks", function(data, status){
    if(data){
        LIST = data;
        id = LIST.length; 
        loadList(LIST); 
    }else{
        LIST = [];
        id = 0;
    }
  });

// check if data is not empty
// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item._id, item.status[0]);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Show todays date
options = {weekday : "long", month:"short", day:"numeric"};
today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

function addToDo(toDo, id, status){
    // if(trash){ return; }
  if(status == 'pending') {
     done = false;
  }
  else {
     done = true;
  }
DONE = done ? CHECK : UNCHECK;
LINE = done ? LINE_THROUGH : "";
item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
     position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
    $.post("http://localhost:3000/tasks",
    {
      name: toDo,
    },
    function(data, status){
    });
}

// add an item to the list user the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
     toDo = input.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});


// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
     element = event.target;
     elementJob = element.attributes.job.value;
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

