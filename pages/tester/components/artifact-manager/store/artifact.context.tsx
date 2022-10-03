import React, { createContext, Dispatch, FunctionComponent, useReducer } from "react";
import { ArtifactState, Action, artifactReducer } from "./artifact.reducer";

const ArtifactContext = createContext<{ state: ArtifactState; dispatch: Dispatch<Action> } | undefined>(undefined);

export const ArtifactManagerProvider: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: ArtifactState = { activeArtifact: null, loadingQueries: {} };
  const [state, dispatch] = useReducer(artifactReducer, initialState);
  const value = { state, dispatch };
  return <ArtifactContext.Provider value={value}>{children}</ArtifactContext.Provider>;
};

export const useArtifactManager = () => {
  const context = React.useContext(ArtifactContext);
  return context;
};
