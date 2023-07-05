/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteAllCompleted = /* GraphQL */ `
  mutation DeleteAllCompleted {
    deleteAllCompleted
  }
`;
export const markAllAsComplete = /* GraphQL */ `
  mutation MarkAllAsComplete {
    markAllAsComplete
  }
`;
export const toggleIsCompleted = /* GraphQL */ `
  mutation ToggleIsCompleted($id: ID!) {
    toggleIsCompleted(id: $id) {
      id
      title
      isCompleted
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      title
      isCompleted
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      title
      isCompleted
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      title
      isCompleted
      createdAt
      updatedAt
      __typename
    }
  }
`;
