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
  GetTodoQueryVariables,
  ToggleIsCompletedMutation,
  ToggleIsCompletedMutationVariables,
  UpdateTodoMutation,
  UpdateTodoMutationVariables
} from "./generated/types";
import {appSyncRequest} from "@lambda-shared";
import * as queries from './generated/queries';
import * as mutations from './generated/mutations';

export const handler: AmplifyGraphQlResolverHandler<
  ToggleIsCompletedMutationVariables,
  unknown,
  ToggleIsCompletedMutation["toggleIsCompleted"]
> = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);

  const { id } = event.arguments;
  const existing = await getTodo(id);
  const updated = await toggleIsCompleted(existing);

  console.log(`RESPONSE: ${JSON.stringify(updated, null, 2)}`);
  return updated;
};

async function getTodo(
  id: GetTodoQueryVariables['id']
): Promise<NonNullable<GetTodoQuery['getTodo']>> {
  const variables: GetTodoQueryVariables = { id };

  const { getTodo } = await appSyncRequest<
    GetTodoQuery,
    GetTodoQueryVariables
  >(queries.getTodo, variables);

  return getTodo!;
}

async function toggleIsCompleted(
  todo: NonNullable<GetTodoQuery['getTodo']>
): Promise<NonNullable<UpdateTodoMutation['updateTodo']>> {
  const variables: UpdateTodoMutationVariables = {
    input: {
      id: todo.id,
      isCompleted: !todo.isCompleted
    }
  };

  const { updateTodo } = await appSyncRequest<
    UpdateTodoMutation,
    UpdateTodoMutationVariables
  >(mutations.updateTodo, variables);

  return updateTodo!;
}
