export const OPENBOOK_API_URL = process.env.OPENBOOK_API_URL;
export const OPENBOOK_TESTER_API_URL = process.env.OPENBOOK_TESTER_API_URL;

export const endPoints = {
  artifacts: `${OPENBOOK_API_URL}/artifacts`,
  queries: `${OPENBOOK_TESTER_API_URL}/queries`,
  openBookAnswers: (artifact_id: string) => `${OPENBOOK_API_URL}/artifacts/${artifact_id}/query`,
};
