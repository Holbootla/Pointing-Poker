import { ChangeEvent, FC, SyntheticEvent } from 'react';
import XLSX from 'xlsx';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Issue } from '../../../redux/reducers/game-reducer';
import { updateIssuesAction } from '../../../redux/reducers/issues-reducer';
import { sendToServer } from '../../../socket/socket-context';
import DeleteIssuePopup from '../delete-issue-popup/DeleteIssuePopup';
import EditIssuePopup from '../edit-issue-popup/EditIssuePopup';
import IssueLobby from '../issue-lobby/issue-lobby';
import NewIssue from '../new-issue/new-issue';
import './issues-lobby.scss';

const IssuesLobby: FC = () => {
  interface IssueData {
    id?: string;
    title: string;
    link: string;
    priority: string;
    status?: string;
  }
  const dispatch = useAppDispatch();
  const { issues } = useAppSelector((state) => state.issues);

  const { gameID } = useAppSelector((state) => state.authPopup);

  const createIssueId = (): string =>
    Math.round(Math.random() * 10000).toString();

  const readFileContent = async (file: any): Promise<IssueData[]> => {
    const response: IssueData[] = await new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        if (e.target != null) {
          const bufferArray = e.target.result;
          const workBook = XLSX.read(bufferArray, { type: 'buffer' });
          const workBookName = workBook.SheetNames[0];
          const workSheet = workBook.Sheets[workBookName];
          const data: IssueData[] = XLSX.utils.sheet_to_json(workSheet);
          resolve(data);
        }
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    console.log(response);
    return response;
  };

  const handleInputFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const issuesData = await readFileContent(file);
      const issuesUpdated = issuesData.map((issue) => {
        issue.id = createIssueId();
        issue.status = 'awaiting';
        return issue;
      }) as Issue[];
      sendToServer('issues_updated', { gameID, issuesUpdated });
    }
  };

  return (
    <section className="section-wrap">
      <div className="section-title">issues:</div>

      <div className="issues-container">
        <ul className="issues-list">
          {issues.map((issue) => (
            <IssueLobby
              key={issue.id}
              id={issue.id}
              title={issue.title}
              priority={issue.priority}
              link={issue.link}
              status={issue.status}
            />
          ))}
          <NewIssue />
        </ul>
      </div>
      <label htmlFor="issuesList">
        Add issues from file:
        <input
          type="file"
          name="issuesList"
          accept="xlsx"
          onChange={handleInputFileChange}
        />
      </label>
      <DeleteIssuePopup />
      <EditIssuePopup />
    </section>
  );
};

export default IssuesLobby;
