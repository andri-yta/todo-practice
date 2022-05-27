import { html, css, LitElement } from "lit";

import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-radio-button/vaadin-radio-button";
import "@vaadin/vaadin-radio-button/vaadin-radio-group";

import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { addNewTodo, changeTodoStatus, clearCompleted } from "../redux/todoSlice";
import { updateFilter } from "../redux/filterSlice";

import { VisibilityFilters } from "../constant/cFilter";
import { BaseView } from "./base-view";

class TodoView extends connect(store)(BaseView) {
  static get properties() {
    return {
      todos: { type: Object },
      filter: { type: String },
      task: { type: String },
    };
  }

  stateChanged(state) {
    this.todos = state.todoReducer.todos;
    this.filter = state.filterReducer.filter;
  }

  render() {
    return html`
      <style>
        todo-view .todos-list {
          color: green !important;
        }
      </style>
      <h1>Todos</h1>
      <div class="input-layout" @keyup="${this.shortcutListener}">
        <vaadin-text-field
          placeholder="Task"
          value="${this.task || ""}"
          @change="${this.updateTask}"
        >
        </vaadin-text-field>
        <vaadin-button theme="primary" @click="${this.addTodo}"
          >Add todo</vaadin-button
        >
      </div>

      <div class="todos-list">
        <p>Here is the list ...</p>
        ${Object.keys(this.applyFilter(this.todos)).map(
          (todoId, _i) => html`
            <div class="todo-item">
              <vaadin-checkbox
                ?checked="${this.todos[todoId].complete}"
                @change="${(e) => this.updateTodoStatus(todoId)}"
                >${this.todos[todoId].task}</vaadin-checkbox
              >
            </div>
          `
        )}
      </div>

      <vaadin-radio-group
        class="visibility-filters"
        value="${this.filter}"
        @value-changed="${this.filterChanged}"
      >
        ${Object.values(VisibilityFilters).map(
          (filter) => html`
            <vaadin-radio-button value="${filter}">
              ${filter}
            </vaadin-radio-button>
          `
        )}
      </vaadin-radio-group>

      <vaadin-button theme="primary" @click="${this.resetCompleted}"
        >Reset completed</vaadin-button
      >
    `;
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  addTodo = async () => {
    if (this.task) {
      await store.dispatch(addNewTodo(this.task));
      this.task = "";
    }
  };

  shortcutListener(e) {
    if (e.key === "Enter") {
      this.addTodo();
    }
  }

  updateTodoStatus = async (todoId) => {
    await store.dispatch(changeTodoStatus(todoId));
  };

  filterChanged(e) {
    store.dispatch(updateFilter(e.target.value));
  }

  applyFilter(todos) {
    switch (this.filter) {
      case VisibilityFilters.SHOW_ACTIVE:
        return Object.fromEntries(
          Object.entries(todos).filter(([_key, value]) => !value.complete)
        );
      case VisibilityFilters.SHOW_COMPLETED:
        return Object.fromEntries(
          Object.entries(todos).filter(([_key, value]) => value.complete)
        );
      default:
        return todos;
    }
  }

  resetCompleted() {
    store.dispatch(clearCompleted());
  }
}

customElements.define("todo-view", TodoView);
