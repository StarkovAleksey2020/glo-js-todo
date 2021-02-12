'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

// чтение списка todo из localStorage
const todoData = (localStorage.getItem('todoData')) ? JSON.parse(localStorage.getItem('todoData')) : [];

// сохранение списка todo в localStorage
const saveTodoData = function (data) { 
  localStorage.removeItem('todoData');
  localStorage.setItem('todoData', JSON.stringify(data));
};

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function (item) {  
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<span class="text-todo">${item.value}</span>
                    <div class="todo-buttons">
                      <button class="todo-remove"></button>
                      <button class="todo-complete"></button>
                    </div>`;
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    // слушатель на кнопку подтверждения выполнения
    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function () { 
      item.completed = !item.completed;
      saveTodoData(todoData);
      render();
    });
    // слушатель на кнопку удаления
    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function (e) { 
      let itemText = e.target.closest('.todo-buttons').closest('li').textContent.trim();
      let itemToRemove = todoData.findIndex(array => array.value === itemText);
      todoData.splice(itemToRemove, 1);
      saveTodoData(todoData);
      render();
    });
  })
};

todoControl.addEventListener('submit', function (event) {  
  event.preventDefault();
  if (headerInput.value.trim().length > 0) {
    const newTodo = {
      value: headerInput.value,
      completed: false
    };
    todoData.push(newTodo);
    headerInput.value = '';
    saveTodoData(todoData);
    render();
  }
})

render();