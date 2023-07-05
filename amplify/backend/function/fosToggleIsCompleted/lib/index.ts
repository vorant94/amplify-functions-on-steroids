/* Amplify Params - DO NOT EDIT
	API_FUNCTIONSONSTEROIDS_GRAPHQLAPIENDPOINTOUTPUT
	API_FUNCTIONSONSTEROIDS_GRAPHQLAPIIDOUTPUT
	API_FUNCTIONSONSTEROIDS_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import {AmplifyGraphQlResolverHandler} from "aws-lambda";
import {
  GetTodoQuery,
  GetTodoQueryResponse,
  GetTodosQueryVariables,
  ToggleIsCompletedMutation,
  ToggleIsCompletedMutationVariables,
  UpdateTodoMutation,
  UpdateTodoMutationResponse,
  UpdateTodoMutationVariables
} from "./app-sync.models";
import {appSyncRequest} from "@lambda-shared";

export const handler: AmplifyGraphQlResolverHandler<
  ToggleIsCompletedMutationVariables,
  unknown,
  ToggleIsCompletedMutation
> = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);

  const { id } = event.arguments;
  const existing = await getTodo(id);
  const updated = await toggleIsCompleted(existing);

  console.log(`RESPONSE: ${JSON.stringify(updated, null, 2)}`);
  return updated;
};

async function getTodo(id: GetTodosQueryVariables['id']): Promise<GetTodoQuery> {
  const query = /* GraphQL */ `
    query GetTodo($id: ID!) {
      getTodo(id: $id) {
        id
        title
        isCompleted
        createdAt
        updatedAt
        __typename
      }
    }
  `;
  const variables: GetTodosQueryVariables = { id };

  const { getTodo } = await appSyncRequest<
    GetTodoQueryResponse,
    GetTodosQueryVariables
  >(query, variables);

  return getTodo;
}

async function toggleIsCompleted(todo: GetTodoQuery): Promise<UpdateTodoMutation> {
  const query = /* GraphQL */ `
    mutation UpdateTodo($input: UpdateTodoInput!) {
      updateTodo(input: $input) {
        id
        title
        isCompleted
        createdAt
        updatedAt
        __typename
      }
    }
  `;
  const variables: UpdateTodoMutationVariables = {
    input: {
      id: todo.id,
      isCompleted: !todo.isCompleted
    }
  };

  const { updateTodo } = await appSyncRequest<
    UpdateTodoMutationResponse,
    UpdateTodoMutationVariables
  >(query, variables);

  return updateTodo;
}
