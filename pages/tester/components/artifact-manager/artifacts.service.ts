import { endPoints } from "config/endpoints";
import { httpService } from "services/http";

export interface Artifact {
  id: string;
  modifiedAt: Date;
  modified_at: Date;
  status: string;
  metadata: Metadata;
  isTesting?: boolean;
}

export interface Metadata {
  bookId: string;
}

export interface ArtifactsResponse {
  status: string;
  artifacts: Artifact[];
}

export const getArtifatcs = async () => {
  try {
    const { artifacts }: ArtifactsResponse = await httpService.get(endPoints.artifacts);
    return artifacts;
  } catch (e) {
    console.error(e);
    // toast("Could not fetch prodcuts. Please try again later", { type: "error" }); // for simplicity we keep message hardcoded
  }
};
