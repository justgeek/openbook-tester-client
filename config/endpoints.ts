export const OPENBOOK_API_URL = `https://api.openbook.botpress.cloud/v1`;
export const OPENBOOK_TESTER_API_URL = `http://localhost:8080`;

export const endPoints = {
  artifacts: `${OPENBOOK_API_URL}/artifacts`,
  queries: `${OPENBOOK_TESTER_API_URL}/queries`,
  openBookAnswers: (artifact_id: string) => `${OPENBOOK_API_URL}/artifacts/${artifact_id}/query`,
};
