// eslint-disable-next-line import/extensions
import createTodoApp from './view.js';

const modulLs = './local.js';
const modulApi = './api.js';
let flag = true;
const owner = [
  { key: 'Я', title: 'Мои дела' },
  { key: 'Папа', title: 'Дела папы' },
  { key: 'Мама', title: 'Дела мамы' },
];

function init(index) {
  const storageBtnText = ['Перейти на серверное хранилище', 'Перейти на локальное хранилище'];
  const storageBtn = document.querySelector('.storage-btn');
  if (JSON.parse(localStorage.getItem('isApi'))) {
    storageBtn.textContent = storageBtnText[1];
  } else {
    storageBtn.textContent = storageBtnText[0];
  }
  storageBtn.addEventListener('click', () => {
    const isApi = JSON.parse(localStorage.getItem('isApi'));
    if (isApi) {
      callTodoAppLs(index);
      storageBtn.textContent = storageBtnText[0];
    } else {
      callTodoAppApi(index);
      storageBtn.textContent = storageBtnText[1];
    }
  });
  flag = false;
}

export function callTodoAppApi(index) {
  import(modulApi)
    .then(({
      getTodoList,
      createTodoItem,
      switchTodoItemDone,
      deleteTodoItem,
    }) => {
      (async () => {
        const todoItemList = await getTodoList(owner[index].key);
        createTodoApp(document.getElementById('todo-app'), {
          title: owner[index].title,
          owner: owner[index].key,
          todoItemList,
          onCreateFormSubmit: createTodoItem,
          onDoneClick: switchTodoItemDone,
          onDeleteClick: deleteTodoItem,
        });
      })();
    });

  if (flag) init(index);
  localStorage.setItem('isApi', true);
}

export function callTodoAppLs(index) {
  import(modulLs)
    .then(({
      getTodoList,
      createTodoItem,
      switchTodoItemDone,
      deleteTodoItem,
    }) => {
      (async () => {
        const todoItemList = await getTodoList(owner[index].key);
        createTodoApp(document.getElementById('todo-app'), {
          title: owner[index].title,
          owner: owner[index].key,
          todoItemList,
          onCreateFormSubmit: createTodoItem,
          onDoneClick: switchTodoItemDone,
          onDeleteClick: deleteTodoItem,
        });
      })();
    });

  if (flag) init(index);
  localStorage.setItem('isApi', false);
}
