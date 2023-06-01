import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

/*
 *
 * This script uses Cody from SourceGraph. Go to the SourceGraph repo and
 * build Cody CLI locally.
 * */

const emptyExplanation = {
  explanation: "",
  relevantSnippets: [{ file: "", snippet: "" }],
};

function extractJson(value: string): typeof emptyExplanation {
  const match = value.match(/\{[\s\S]*\}/);

  if (match && match[0]) {
    const jsonString = match[0].trim();

    try {
      const parsedJson = JSON.parse(jsonString);
      return parsedJson;
    } catch (error) {
      console.error("Failed to parse JSON:", error, value);
    }
  }
  return emptyExplanation;
}

function runCodyCommand(hash: string) {
  const commit = `git show ${hash}`;
  const commitDiff = execSync(commit);
  const message = `
Acting as a changelog assistant, parse the changes below and return JSON that contains reason behind changes.

Rules:
- You are a changelog assistant
- The explanation field must always be returned
- You must return relevantSnippets as an array of objects with file and snippet fields

Changes to analyze:
\`\`\`diff
${commitDiff}
\`\`\`

{
  explanation: "",
  relevantSnippets: [{ file: "", snippet: "" }],
}
`;

  const filePath = join(tmpdir(), "cody_prompt.txt");
  writeFileSync(filePath, message, "utf8");
  const command = `cody -p ${filePath} -e https://sourcegraph.com -c "github.com/facebook/react-native"`;
  const result = execSync(command).toString();
  console.log(`Response for ${hash}: `, result);
  const response = extractJson(result);
  return response;
}

// git log --oneline --after=" 00:00" --before=" 23:59"
function getCommitsForPeriod(start: string, end: string) {
  // &#9; is a tab unicode to separate columns and make it easier to split
  const command = `git log --pretty=format:"%an&#9;%ae&#9;%ad&#9;%s&#9;%H" --after="${start} 00:00" --before="${end} 23:59"`;
  console.log("Getting logs for: ", command);

  const output = execSync(command).toString();
  return output
    .split("\n")
    .filter(Boolean)
    .map((line: string) => {
      const column = line.split("&#9;");
      const hash = column[4];
      const codyResults = runCodyCommand(hash);

      return {
        authorName: column[0],
        authorEmail: column[1],
        date: column[2],
        title: column[3],
        hash,
        ...codyResults,
      };
    });
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    console.error("Usage: cli-script <start date> <end date>");
    return;
  }

  const start = String(args[0]);
  const end = String(args[1]);

  const summarizedCommits = getCommitsForPeriod(start, end);

  writeFileSync(
    `./summary_${start}_${end}.json`,
    JSON.stringify(summarizedCommits),
    "utf8"
  );
}

await main();
