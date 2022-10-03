import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { EmptyState } from "components/empty-state";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { AddCircle } from "@mui/icons-material";
import { createQuery, getQueries, Query } from "./queries.service";
import { QueryItem } from "../query-item";

export const QueryManager: FunctionComponent = () => {
  const QUERY_STATUS_PENDING = "PENDING";
  const QUERY_STATUS_CONFIRMED = "CONFIRMED";

  const queryInputRef = useRef<{ value: any }>(null);
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => {
    loadQueries();
  }, []);

  const loadQueries = async () => {
    const queries = await getQueries();
    if (queries && queries.length) {
      setQueries(queries!);
    }
  };

  const handleQueryInput = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      submitQuery();
    }
  };

  const submitQuery = async () => {
    const query = queryInputRef!.current!.value;
    if (query) {
      const createdQuery = await createQuery({
        body: query,
      });
      queries.unshift(createdQuery!);
      setQueries([...queries]);
      queryInputRef.current!.value = "";
    }
  };

  return (
    <div className="query-manager-container">
      <div className="query-manager-header">
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Ask your bot a question</InputLabel>
          <OutlinedInput
            inputRef={queryInputRef}
            id="outlined-adornment-password"
            onKeyDown={handleQueryInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end" onClick={submitQuery}>
                  <AddCircle />
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </div>
      <div className="query-manager-body">
        {!queries.length && <EmptyState artWorkPath="/assets/question.png" message="It looks empty here. Start asking some questions" />}
        {!!queries.length && (
          <div className="queries-list">
            {queries.map((query, index) => {
              return <QueryItem key={query._id} query={query} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
