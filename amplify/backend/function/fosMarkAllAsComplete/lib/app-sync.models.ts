export type MarkAllAsCompleteMutationVariables = {
}

export type MarkAllAsCompleteMutation = boolean;

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput
}

export type ListTodosQueryResponse = {
  listTodos: ListTodosQuery
}

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput
}

export type UpdateTodoMutationResponse = {
  updateTodo: UpdateTodoMutation
}

export type UpdateTodoInput = {
  id: string;
  title?: string | null;
  isCompleted?: boolean | null;
};

export type UpdateTodoMutation = {
  __typename: "Todo";
  id: string;
  title: string;
  isCompleted?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  isCompleted?: ModelBooleanInput | null;
  and?: Array<ModelTodoFilterInput | null> | null;
  or?: Array<ModelTodoFilterInput | null> | null;
  not?: ModelTodoFilterInput | null;
};

export type ListTodosQuery = {
  __typename: "ModelTodoConnection";
  items: Array<{
    __typename: "Todo";
    id: string;
    title: string;
    isCompleted?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}
