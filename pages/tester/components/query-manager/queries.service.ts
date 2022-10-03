import { endPoints } from "config/endpoints";
import { httpService } from "services/http";
import { res } from "./mock";

export interface GetAnswersParams {
  query: string;
  history: [];
  answer_level: "strict" | "loose";
}

export interface QueryAnswerResponse {
  status: string;
  result: QueryAnswer;
}

export interface QueryAnswer {
  query_id: string;
  answer: string;
  elected_facts: Fact[];
  entities: any[];
  top_facts: Fact[];
  remaining_queries: number;
}

export interface Fact {
  attachments: any[];
  subtopic: string;
  subtopic_desc: string;
  text: string;
  topic: string;
  topic_desc: string;
  slot_defs: any[];
  tagged_slots?: any[];
}

export interface CreateQueryReuqest {
  body: string;
}

export interface CreateAnswerReuqest {
  queryId: string;
  artifactId: string;
}

export interface CreateAnswerResponse extends QueryAnswer {
  queryId: string;
  artifactId: string;
}

export interface Answers {
  [artifactId: string]: QueryAnswer;
}

export interface Query {
  // server side
  _id: string;
  body: string;
  answers: Answers;
  // client side
  status: string;
  pendingAnswer: QueryAnswer | null;
}

export const getOpenbookQueryAnswer = async (artifactId: string, params?: GetAnswersParams) => {
  try {
    await new Promise((resolveOuter) => {
      resolveOuter(
        new Promise((resolveInner) => {
          setTimeout(resolveInner, 1000);
        }),
      );
    });
    // const response: QueryAnswerResponse = await httpService.post(endPoints.openBookAnswers(artifactId), params);
    // return response;
    return res;
  } catch (e) {
    console.error(e);
    // toast("Could not fetch prodcuts. Please try again later", { type: "error" }); // for simplicity we keep message hardcoded
  }
};

export const updateOpenbookTesterQueryAnswer = async ({ artifactId, queryId }: CreateAnswerReuqest, answer: QueryAnswer) => {
  try {
    const response: CreateAnswerResponse = await httpService.patch(endPoints.queries + `/${queryId}/answers/${artifactId}`, answer);
    return response;
  } catch (e) {
    console.error(e);
    // toast("Could not fetch prodcuts. Please try again later", { type: "error" }); // for simplicity we keep message hardcoded
  }
};

export const getQueries = async (params?: GetAnswersParams) => {
  try {
    const response: Query[] = await httpService.get(endPoints.queries, params);
    return response;
  } catch (e) {
    console.error(e);
    // toast("Could not fetch prodcuts. Please try again later", { type: "error" }); // for simplicity we keep message hardcoded
  }
};

export const createQuery = async (payload: CreateQueryReuqest) => {
  try {
    const response: Query = await httpService.post(endPoints.queries, payload);
    return response;
  } catch (e) {
    console.error(e);
    // toast("Could not fetch prodcuts. Please try again later", { type: "error" }); // for simplicity we keep message hardcoded
  }
};

export const clearDB = async () => {
  try {
    const response: Query = await httpService.delete(endPoints.queries);
    return response;
  } catch (e) {
    console.error(e);
    // toast("Could not fetch prodcuts. Please try again later", { type: "error" }); // for simplicity we keep message hardcoded
  }
};
