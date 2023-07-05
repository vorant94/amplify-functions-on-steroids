/* Amplify Params - DO NOT EDIT
	API_FUNCTIONSONSTEROIDS_GRAPHQLAPIENDPOINTOUTPUT
	API_FUNCTIONSONSTEROIDS_GRAPHQLAPIIDOUTPUT
	API_FUNCTIONSONSTEROIDS_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import {AmplifyGraphQlResolverHandler} from "aws-lambda";
import {
  ListTodosQuery,
  ListTodosQueryResponse,
  ListTodosQueryVariables,
  MarkAllAsCompleteMutation,
  MarkAllAsCompleteMutationVariables,
  UpdateTodoMutation,
  UpdateTodoMutationResponse,
  UpdateTodoMutationVariables
} from "./app-sync.models";
import {appSyncRequest} from "@lambda-shared";


export const handler: AmplifyGraphQlResolverHandler<
  MarkAllAsCompleteMutationVariables,
  unknown,
  MarkAllAsCompleteMutation
> = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);

  const { items } = await getUncompletedTodos();
  await Promise.all(
    items
      .filter(todo => !!todo)
      .map(todo => markAsCompleted(todo!))
  );

  console.log(`RESPONSE: `);
  return true;
}

async function getUncompletedTodos(): Promise<ListTodosQuery> {
  const query = /* GraphQL */ `
    query ListTodos($filter: ModelTodoFilterInput) {
      listTodos(filter: $filter) {
        __typename
        items {
          __typename
          id
          title
          isCompleted
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  `;
  const variables: ListTodosQueryVariables = {
    filter: {
      isCompleted: {
        ne: true
      }
    }
  };

  const { listTodos } = await appSyncRequest<
    ListTodosQueryResponse,
    ListTodosQueryVariables
  >(query, variables);

  return listTodos;
}

async function markAsCompleted(
  todo: NonNullable<ListTodosQuery['items'][number]>
): Promise<UpdateTodoMutation> {
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
      isCompleted: true
    }
  };

  const { updateTodo } = await appSyncRequest<
    UpdateTodoMutationResponse,
    UpdateTodoMutationVariables
  >(query, variables);

  return updateTodo;
}
