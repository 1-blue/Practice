export const actions = {
  SET_ADD_ITEM({ commit }, newItem){
    commit("onAddTodoItem", newItem);
  },
  SET_TOGGLE_CHECK_ITEM({ commit }, item){
    commit("onToggleCheckItem", item);
  },
  SET_REMOVE_ITEM({ commit }, item){
    commit("onRemoveItem", item);
  },
  SET_ALL_REMOVE_ITEM({ commit }, payload){
    commit("onAllDeleteItem");
    console.log(payload);
  },
}