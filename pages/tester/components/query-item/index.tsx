import { Badge, Accordion, AccordionSummary, Typography, AccordionDetails, CircularProgress, Divider, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useArtifactManager } from "../artifact-manager/store/artifact.context";
import { FunctionComponent, useEffect, useState } from "react";
import {
  GetAnswersParams,
  getOpenbookQueryAnswer,
  Query,
  QueryAnswer,
  updateOpenbookTesterQueryAnswer,
} from "../query-manager/queries.service";
import "./styles.scss";
import { ARTFIACT_ACTIONS } from "../artifact-manager/store/artifact.reducer";
import useNotification from "hooks/notification.hook";
import { VariantType } from "notistack";

export const QueryItem: FunctionComponent<{ query: Query }> = ({ query }) => {
  const QUERY_STATUS_PENDING = "PENDING";
  const QUERY_STATUS_CONFIRMED = "CONFIRMED";

  const [msg, sendNotification]: ({ msg: string; variant: VariantType } | any)[] = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);

  const {
    state: { activeArtifact, loadingQueries },
    dispatch,
  } = useArtifactManager()!;

  useEffect(() => {
    if (activeArtifact) {
      loadAnswers();
    }
  }, [activeArtifact?.id]);

  useEffect(() => {
    if (activeArtifact?.isTesting) {
      testArtifact();
    }
  }, [activeArtifact?.isTesting]);

  const testArtifact = async () => {
    setIsLoading(true);

    if (activeArtifact) {
      const payload: GetAnswersParams = { query: localQuery.body, history: [], answer_level: "strict" };
      const queryAnswerResponse = await getOpenbookQueryAnswer(activeArtifact?.id, payload);
      if (queryAnswerResponse) {
        const { result } = queryAnswerResponse;
        if (localQuery.lastApprovedAnswer) {
          // already submitted an answer for this artifact before, so now compare answers
          const { answer: savedAnswer } = localQuery.lastApprovedAnswer;
          const { answer: newAnswer } = result;

          if (newAnswer === savedAnswer) {
            // answers are matching no change is required
            localQuery.status = QUERY_STATUS_CONFIRMED;
          } else {
            // answers mismatch warn the use to take action
            localQuery.pendingAnswer = result;
            localQuery.status = QUERY_STATUS_PENDING;
          }
          setIsLoading(false);
        } else {
          // create first answer for the query
          const createdAnswer = await updateOpenbookTesterQueryAnswer({ queryId: localQuery._id, artifactId: activeArtifact.id }, result);
          if (createdAnswer) {
            localQuery.lastApprovedAnswer = result;
            localQuery.status = QUERY_STATUS_CONFIRMED;
            setIsLoading(false);
          }
        }
        dispatch({ type: ARTFIACT_ACTIONS.SET_ACTIVE_ARTIFACT, payload: { ...activeArtifact, isTesting: false } });
        setLocalQuery(localQuery);
      }
    }
  };

  const loadAnswers = async () => {
    setIsLoading(true);

    if (localQuery.lastApprovedAnswer) {
      setIsLoading(false);
      return;
    } else {
      testArtifact();
    }
  };

  const approveAnswer = async (answer: QueryAnswer) => {
    await updateOpenbookTesterQueryAnswer({ artifactId: activeArtifact!.id, queryId: localQuery._id }, answer);
    localQuery.lastApprovedAnswer = answer;
    setLocalQuery({ ...localQuery, status: QUERY_STATUS_CONFIRMED, pendingAnswer: null });
    sendNotification({ msg: "Answer has been updated", variant: "success" });
  };

  return (
    <div key={localQuery._id} className="query">
      {!isLoading && localQuery.status && activeArtifact && (
        <div className={`query-status ${localQuery.status == QUERY_STATUS_CONFIRMED ? "confirmed" : "pending"}`}>
          <Badge variant="dot"></Badge>
        </div>
      )}
      {isLoading && <div className="query-status loading">{isLoading && <CircularProgress size={20} color="primary" />}</div>}
      <Accordion elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>{localQuery.body}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {!activeArtifact && <Typography variant="body2">To see query details, you need to select an Artifact.</Typography>}
          {activeArtifact && (
            <>
              {localQuery.status === QUERY_STATUS_PENDING && (
                <Typography variant="subtitle1" color="limegreen">
                  Approved Answer
                </Typography>
              )}
              <Typography variant="body2">
                {!localQuery.lastApprovedAnswer && "Answer is being added for first time ..."}
                {localQuery.lastApprovedAnswer && `${localQuery.lastApprovedAnswer.answer}`}
              </Typography>
              {localQuery.status === QUERY_STATUS_PENDING && (
                <>
                  <Divider />
                  <Typography variant="subtitle1" color="orange">
                    New Answer
                  </Typography>
                  <Typography variant="body2"> {localQuery.pendingAnswer!.answer}</Typography>
                  <div className="approve-answer">
                    <Button
                      color="success"
                      size="small"
                      variant="outlined"
                      disableElevation
                      onClick={() => {
                        approveAnswer(localQuery.pendingAnswer!);
                      }}>
                      Mark as approved answer
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
