import { FunctionComponent } from "react";

interface Props {
  children: React.ReactNode;
  id: string;
}

// Any Global functionality, or behavior that affects only pages can be handled here

export const Page: FunctionComponent<Props> = ({ children, id }) => {
  return (
    <>
      <main>
        <section className="page" id={id}>
          {children}
        </section>
      </main>
    </>
  );
};
