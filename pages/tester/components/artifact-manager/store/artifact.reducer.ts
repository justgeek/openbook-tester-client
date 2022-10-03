import { Artifact } from "../artifacts.service";

// this should be defined in a global place though
export interface Action {
  type: string;
  payload?: any;
}

export interface ArtifactState {
  activeArtifact: Artifact | null;
  loadingQueries: { [queryId: string]: boolean };
}

export const ARTFIACT_ACTIONS = {
  SET_ACTIVE_ARTIFACT: "set-active-artifact",
  RESET_ACTIVE_ARTIFACT: "reset-active-artifact",
};

export const QUERY_ACTIONS = {
  REGISTER_AS_LOADING: "register-as-loading",
  DEREGISTER_AS_LOADING: "deregister-as-loading",
};

export const artifactReducer = (state: ArtifactState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ARTFIACT_ACTIONS.SET_ACTIVE_ARTIFACT: {
      state.activeArtifact = payload;
      return { ...state };
    }
    case ARTFIACT_ACTIONS.RESET_ACTIVE_ARTIFACT: {
      state.activeArtifact = null;
      return { ...state };
    }
    case QUERY_ACTIONS.REGISTER_AS_LOADING: {
      state.loadingQueries[payload] = true;
      return { ...state };
    }
    case QUERY_ACTIONS.DEREGISTER_AS_LOADING: {
      delete state.loadingQueries[payload];
      return { ...state };
    }

    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};
