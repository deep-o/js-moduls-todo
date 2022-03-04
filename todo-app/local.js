function changeStorage(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

export function getTodoList(owner) {
  const todoItemList = JSON.parse(localStorage.getItem(owner)) || [];
  return todoItemList;
}

export function createTodoItem({
  owner,
  name,
}) {
  const todoItemList = getTodoList(owner) || [];
  const todoItem = {
    id: Date.now().toString(),
    name,
    done: false,
  };

  if (name) todoItemList.push(todoItem);

  changeStorage(owner, todoItemList);
  return todoItem;
}

export function switchTodoItemDone({
  todoItem,
  owner,
}) {
  todoItem.done = !todoItem.done;
  const todoItemList = getTodoList(owner) || [];
  todoItemList.find((item) => item.id === todoItem.id).done = todoItem.done;
  changeStorage(owner, todoItemList);
}

export function deleteTodoItem({
  element,
  todoItem,
  owner,
}) {
  if (!window.confirm('Вы уверены?')) {
    return;
  }
  element.remove();
  const todoItemList = getTodoList(owner) || [];
  todoItemList.splice(todoItemList.indexOf(todoItem), 1);
  changeStorage(owner, todoItemList);
}
