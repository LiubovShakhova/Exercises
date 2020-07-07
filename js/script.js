'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
          <button class="todo-edit"></button>
          <button class="todo-remove"></button>
          <button class="todo-complete"></button>
				</div>
      `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
            this.input.value = '';
        } else {
            //2) Сообщить пользователю (любым способом) что пустое дело добавить нельзя!
            alert('пустое дело добавить нельзя!');
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(target) {
        for (const key of this.todoData.keys()) {
            if (target === key) {
                this.todoData.delete(target);
            }
        }

        this.render();
    }

    completedItem(target) {
        for (const [key, value] of this.todoData) {
            if (target === key && value.completed === false) {
                value.completed = true;
            } else if (target === key && value.completed === true) {
                value.completed = false;
            }
        }

        this.render();
    }

    editItem(target) {
        const targetKey = target.key;
        target.contentEditable = 'true';
        target.addEventListener('blur', () => {
            for (const [key, value] of this.todoData) {
                if (targetKey === key) {
                    value.value = target.textContent.trim();
                    this.addToStorage();
                }
            }
        });
    }

    handler() {
        document.querySelector('.todo-container').addEventListener('click', event => {
            event.preventDefault();
            let target = event.target;

            if (target.matches('.todo-complete')) {
                target = target.closest('.todo-item');
                this.completedItem(target.key);
            } else if (target.matches('.todo-remove')) {
                target = target.closest('.todo-item');
                this.deleteItem(target.key);   
            } else if (target.matches('.todo-edit')) {
                target = target.closest('.todo-item');
                this.editItem(target);
            }
        });
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
todo.handler();
