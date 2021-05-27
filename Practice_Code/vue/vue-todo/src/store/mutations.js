export const mutations = {
  // 아이템추가
  onAddTodoItem(state, newItem){
    const tempItem = {};
    tempItem.name = newItem;
    tempItem.isCheck = true;

    localStorage.setItem(tempItem.name, JSON.stringify(tempItem));
    state.todoItems.push(tempItem);

    console.log(state);
  },
  // 아이템체크
  onToggleCheckItem(state, item){
    localStorage.removeItem(item.name);
    localStorage.setItem(item.name, JSON.stringify(item));
    item.isCheck = !item.isCheck;
  },
  // 아이템삭제
  onRemoveItem(state, item){
    localStorage.removeItem(item.name);
    const removeIndex = state.todoItems.indexOf(item);
    state.todoItems.splice(removeIndex, 1);
  },
  // 아이템전체삭제
  onAllDeleteItem(state){
    localStorage.clear();
    state.todoItems = [];
  },
}