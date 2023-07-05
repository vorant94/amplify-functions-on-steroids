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
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
  ListTodosQuery,
  ListTodosQueryVariables
} from "./generated/types";
import {appSyncRequest} from "@lambda-shared";
import * as queries from "./generated/queries";
import * as mutations from "./generated/mutations";


export const handler: AmplifyGraphQlResolverHandler<
  unknown,
  unknown,
  DeleteAllCompletedMutation['deleteAllCompleted']
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

async function getCompletedTodos(): Promise<NonNullable<ListTodosQuery['listTodos']>> {
  const variables: ListTodosQueryVariables = {
    filter: {
      isCompleted: {
        eq: true
      }
    }
  };

  const {listTodos} = await appSyncRequest<
    ListTodosQuery,
    ListTodosQueryVariables
  >(queries.listTodos, variables);

  return listTodos!;
}

async function deleteTodo(
  todo: NonNullable<NonNullable<ListTodosQuery['listTodos']>['items'][number]>
): Promise<NonNullable<DeleteTodoMutation['deleteTodo']>> {
  const variables: DeleteTodoMutationVariables = {
    input: {
      id: todo.id,
    }
  };

  const {deleteTodo} = await appSyncRequest<
    DeleteTodoMutation,
    DeleteTodoMutationVariables
  >(mutations.deleteTodo, variables);

  return deleteTodo!;
}
