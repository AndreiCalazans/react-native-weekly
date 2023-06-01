import changes from "../summary_2023-05-30_2023-05-31.json";

import { P } from "../../components/p";
import { H1 } from "../../components/h1";
import { Snippet } from "../../components/snippet";

type ChangeLogSectionProps = (typeof changes)[number];

const ChangeLogSection = ({
  authorName,
  authorEmail,
  date,
  title,
  explanation,
  relevantSnippets,
}: ChangeLogSectionProps): JSX.Element => {
  return (
    <div>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex flex-col gap-0.5">
          <p>{`${authorName} - ${authorEmail}`}</p>
          <p>{date}</p>
        </div>
        <P>{explanation}</P>
      </div>
      <div>
        {relevantSnippets?.map((snippet, index) => (
          <Snippet key={snippet.file + index} caption={snippet.file}>
            {snippet.snippet}
          </Snippet>
        ))}
      </div>
    </div>
  );
};

export default function Example() {
  return (
    <div>
      <H1>Changelog</H1>
      <div className="h-6" />
      {changes.map((item, index) => (
        <ChangeLogSection key={`changelog_${index}`} {...item} />
      ))}
    </div>
  );
}
