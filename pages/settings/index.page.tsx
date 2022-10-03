import { Alert, Button, Card, CardContent, Snackbar, TextField } from "@mui/material";
import useNotification from "hooks/notification.hook";
import { Page } from "layouts/page";
import { NextPage } from "next";
import { VariantType } from "notistack";
import { clearDB } from "pages/tester/components/query-manager/queries.service";
import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from "react";
import { httpService } from "services/http";
import "./styles.scss";

export const OPENBOOK_API_KEY_NAME = "openbookAPIKey";

const SettingsPage: NextPage = () => {
  const keyInputRef = useRef<{ value: any }>(null);
  const [apiKey, setApiKey] = useState("");
  const [msg, sendNotification]: ({ msg: string; variant: VariantType } | any)[] = useNotification();

  useEffect(() => {
    getOpenBookAPIKey();
  }, []);

  const getOpenBookAPIKey = () => {
    const key = localStorage.getItem(OPENBOOK_API_KEY_NAME);
    setApiKey(key!);
  };

  const setOpenBookAPIKey: MouseEventHandler = (e) => {
    const key = keyInputRef.current!.value;
    if (key) {
      localStorage.setItem(OPENBOOK_API_KEY_NAME, key);
      setApiKey(key);
      // Update service token
      httpService.OPENBOOK_API_KEY = key;
      httpService.openBookHeaders = {
        Authorization: "Bearer " + httpService.OPENBOOK_API_KEY,
      };
      sendNotification({ msg: "Key saved successfully", variant: "success" });
    }
  };

  const clearKey = () => {
    localStorage.removeItem(OPENBOOK_API_KEY_NAME);
    getOpenBookAPIKey();
    sendNotification({ msg: "Key was removed from storage", variant: "success" });
  };

  const clearQueryDB = async () => {
    await clearDB();
    sendNotification({ msg: "DB was cleared!", variant: "success" });
  };

  return (
    <Page id="settings">
      <Card variant="outlined">
        <CardContent>
          <h1>API Credentials</h1>
          <p>To avoid data encryption in order to save it in database, these credentials will be only saved in local storage</p>
          <TextField defaultValue={apiKey} key={apiKey} inputRef={keyInputRef} fullWidth label="API KEY" />
          <Button variant="contained" disableElevation onClick={setOpenBookAPIKey}>
            Save Key
          </Button>
          <Button variant="outlined" disableElevation onClick={clearKey}>
            Clear Key
          </Button>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <h1>Super Tools</h1>
          <p>⚠️ This will clear Queries DB ⚠️</p>
          <Button variant="outlined" disableElevation onClick={clearQueryDB}>
            Clear DB
          </Button>
        </CardContent>
      </Card>
    </Page>
  );
};

export default SettingsPage;
