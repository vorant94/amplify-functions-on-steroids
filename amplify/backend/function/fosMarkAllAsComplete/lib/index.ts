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
  ListTodosQueryVariables,
  MarkAllAsCompleteMutation,
  UpdateTodoMutation,
  UpdateTodoMutationVariables
} from "./generated/types";
import {appSyncRequest} from "@lambda-shared";
import * as queries from './generated/queries';
import * as mutations from './generated/mutations';

export const handler: AmplifyGraphQlResolverHandler<
  unknown,
  unknown,
  MarkAllAsCompleteMutation['markAllAsComplete']
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

async function getUncompletedTodos(): Promise<NonNullable<ListTodosQuery['listTodos']>> {
  const variables: ListTodosQueryVariables = {
    filter: {
      isCompleted: {
        ne: true
      }
    }
  };

  const { listTodos } = await appSyncRequest<
    ListTodosQuery,
    ListTodosQueryVariables
  >(queries.listTodos, variables);

  return listTodos!;
}

async function markAsCompleted(
  todo: NonNullable<NonNullable<ListTodosQuery['listTodos']>['items'][number]>
): Promise<NonNullable<UpdateTodoMutation['updateTodo']>> {
  const variables: UpdateTodoMutationVariables = {
    input: {
      id: todo.id,
      isCompleted: true
    }
  };

  const { updateTodo } = await appSyncRequest<
    UpdateTodoMutation,
    UpdateTodoMutationVariables
  >(mutations.updateTodo, variables);

  return updateTodo!;
}
