import { Button, CircularProgress, IconButton } from "@mui/material";
import { EmptyState } from "components/empty-state";
import { FunctionComponent, useEffect, useState } from "react";
import { Artifact, getArtifatcs } from "./artifacts.service";
import "./styles.scss";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Sync from "@mui/icons-material/Sync";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { useArtifactManager } from "./store/artifact.context";
import { ARTFIACT_ACTIONS } from "./store/artifact.reducer";

export const ArtifactManager: FunctionComponent = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [isLoadingArtifacts, setIsLoadingArtifacts] = useState<Boolean>(true);

  const {
    state: { activeArtifact: stateActiveArtifact },
    dispatch,
  } = useArtifactManager()!;

  useEffect(() => {
    initArtifacts();
  }, []);

  useEffect(() => {
    const artifactIdx = artifacts.findIndex((artifact) => artifact.id === activeArtifact?.id);
    if (typeof artifactIdx === "number") {
      artifacts[artifactIdx] = stateActiveArtifact!;
    }
    setArtifacts([...artifacts]);
  }, [stateActiveArtifact?.isTesting]);

  const initArtifacts = async () => {
    setIsLoadingArtifacts(true);
    const artifacts = await getArtifatcs();
    if (artifacts?.length) {
      setArtifacts(artifacts);
    }
    setIsLoadingArtifacts(false);
  };

  const testArtifactBook = (artifact: Artifact) => {
    artifact.isTesting = true;
    dispatch({ type: ARTFIACT_ACTIONS.SET_ACTIVE_ARTIFACT, payload: { ...artifact } });
    setActiveArtifact(artifact);
  };

  const toggleActiveArtifact = (artifact: Artifact) => {
    if (artifact.isTesting) {
      return;
    }
    if (activeArtifact && activeArtifact.id === artifact.id) {
      dispatch({ type: ARTFIACT_ACTIONS.SET_ACTIVE_ARTIFACT, payload: null });
      setActiveArtifact(null);
      return;
    }
    dispatch({ type: ARTFIACT_ACTIONS.SET_ACTIVE_ARTIFACT, payload: artifact });
    setActiveArtifact(artifact);
  };

  return (
    <div className="artifact-manager-container">
      <Button startIcon={<Sync />} className="refresh-btn" variant="text" disableElevation onClick={initArtifacts}>
        Refresh Artifact List
      </Button>
      <div className={`artifact-manager-body ${isLoadingArtifacts ? "loading" : ""}`}>
        {!!isLoadingArtifacts && <CircularProgress />}
        {!isLoadingArtifacts && (
          <>
            {!artifacts.length && (
              <EmptyState artWorkPath="/assets/robot.png" message="To fetch Artifacts, please add your API Key, then publish your bot" />
            )}
            {!!artifacts.length && (
              <div className="artifacts-list">
                {artifacts.map((artifact) => {
                  const isActive = activeArtifact && activeArtifact!.id === artifact.id;
                  const isTesting = artifact.isTesting;
                  return (
                    <div
                      onClick={() => {
                        toggleActiveArtifact(artifact);
                      }}
                      className={`artifact ${isActive ? "active" : ""}`}
                      key={artifact.id}>
                      <AutoStoriesIcon color={`${isActive ? "primary" : "disabled"}`} />
                      <h4 className="artifact-name">{artifact.id}</h4>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => {
                          testArtifactBook(artifact);
                        }}>
                        {isTesting && <CircularProgress size={20} color="primary" />}
                        {!isTesting && <PlayCircleFilledIcon />}
                      </IconButton>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
