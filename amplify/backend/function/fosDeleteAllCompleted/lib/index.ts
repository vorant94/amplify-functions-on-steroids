/* Amplify Params - DO NOT EDIT
	API_FUNCTIONSONSTEROIDS_GRAPHQLAPIENDPOINTOUTPUT
	API_FUNCTIONSONSTEROIDS_GRAPHQLAPIIDOUTPUT
	API_FUNCTIONSONSTEROIDS_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import {AmplifyGraphQlResolverHandler} from "aws-lambda";
import {
  DeleteAllCompletedMutation,
  DeleteAllCompletedMutationVariables,
  DeleteTodoMutation,
  DeleteTodoMutationResponse,
  DeleteTodoMutationVariables,
  ListTodosQuery,
  ListTodosQueryResponse,
  ListTodosQueryVariables
} from "./app-sync.models";
import {appSyncRequest} from "@lambda-shared";


export const handler: AmplifyGraphQlResolverHandler<
  DeleteAllCompletedMutationVariables,
  unknown,
  DeleteAllCompletedMutation
> = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);

  const { items } = await getCompletedTodos();
  await Promise.all(
    items
      .filter(todo => !!todo)
      .map(todo => deleteTodo(todo!))
  );

  console.log(`RESPONSE: `);
  return true;
};

async function getCompletedTodos(): Promise<ListTodosQuery> {
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
        eq: true
      }
    }
  };

  const { listTodos } = await appSyncRequest<
    ListTodosQueryResponse,
    ListTodosQueryVariables
  >(query, variables);

  return listTodos;
}

async function deleteTodo(
  todo: NonNullable<ListTodosQuery['items'][number]>
): Promise<DeleteTodoMutation> {
  const query = /* GraphQL */ `
    mutation DeleteTodo($input: DeleteTodoInput!) {
      deleteTodo(input: $input) {
        __typename
        id
        title
        isCompleted
        createdAt
        updatedAt
      }
    }
  `;
  const variables: DeleteTodoMutationVariables = {
    input: {
      id: todo.id,
    }
  };

  const { deleteTodo } = await appSyncRequest<
    DeleteTodoMutationResponse,
    DeleteTodoMutationVariables
  >(query, variables);

  return deleteTodo;
}
