let listElement = document.querySelector('#app ul');
let inputElement = document.querySelector('#app input');
let buttonElement = document.querySelector('#app button');

let todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {
    listElement.innerHTML = '';
    for (todo of todos) {
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);
        todoElement.classList.add('mdc-list-item');

        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        linkElement.style.marginLeft = '10px';

        let position = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo(' + position + ')');

        let linkText = document.createTextNode('Excluir');

        linkElement.appendChild(linkText);

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
    }
}

renderTodos();

function addTodo() {
    if (!inputElement.value) {
        alert('Preencha um valor no campo!');
        inputElement.style.border = '1px solid red';
        inputElement.focus();
        return;
    }
    inputElement.style.border = '';
    let todoText = inputElement.value;
    todos.push(todoText);
    inputElement.value = '';
    renderTodos();
    saveToStorage();
}

buttonElement.onclick = addTodo;

function deleteTodo(position) {
    todos.splice(position, 1);
    renderTodos();
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos));
}