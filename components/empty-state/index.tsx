import { FunctionComponent } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import "./styles.scss";

interface Props {
  artWorkPath: string;
  message: string;
  cta?: { message: string; action: () => void };
}

export const EmptyState: FunctionComponent<Props> = ({ artWorkPath, message, cta }) => {
  return (
    <div className="empty-state">
      <img src={artWorkPath} alt="Empty" />
      <p>{message}</p>
      {cta && (
        <div>
          <Button onClick={cta.action}>{cta.message}</Button>
        </div>
      )}
    </div>
  );
};
