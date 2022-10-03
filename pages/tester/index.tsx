import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Page } from "layouts/page";
import { NextPage } from "next";
import "./styles.scss";
import { EmptyState } from "components/empty-state";
import Split from "react-split";
import { QueryManager } from "./components/query-manager";
import { ArtifactManager } from "./components/artifact-manager";
import { ArtifactManagerProvider } from "./components/artifact-manager/store/artifact.context";

function Test({ color }: { color: any }) {
  return <div style={{ height: 500, width: 500, background: color }} />;
}

export const Tester: NextPage = () => {
  const handleChange = (e) => {
    console.log(e);
  };
  const queries = [];
  return (
    <Page id="tester-container">
      {/* <TextField fullWidth label="Ask your bot a question" onChange={handleChange} />

      {!queries.length && <EmptyState artWorkPath="/assets/empty.png" message="It looks empty here. Start asking some questions" />}
      <Divider />
      <div>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Accordion 1</Typography>
            <Button variant="contained" disableElevation>
              Save
            </Button>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div> */}
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
