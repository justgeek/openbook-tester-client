import { Page } from "layouts/page";
import { NextPage } from "next";
import "./styles.scss";
import Split from "react-split";
import { QueryManager } from "./components/query-manager";
import { ArtifactManager } from "./components/artifact-manager";
import { ArtifactManagerProvider } from "./components/artifact-manager/store/artifact.context";

export const Tester: NextPage = () => {
  const queries = [];
  return (
    <Page id="tester-container">
      <ArtifactManagerProvider>
        <Split
          sizes={[45, 55]}
          direction="horizontal"
          cursor="col-resize"
          className="split-flex" // You'll need to define this. check styles.css
          gutterSize={1}>
          <ArtifactManager />
          <QueryManager />
        </Split>
      </ArtifactManagerProvider>
    </Page>
  );
};
