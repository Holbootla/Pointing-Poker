import { FC } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import DeleteIssuePopup from '../delete-issue-popup/DeleteIssuePopup';
import EditIssuePopup from '../edit-issue-popup/EditIssuePopup';
import IssueLobby from '../issue-lobby/issue-lobby';
import NewIssue from '../new-issue/new-issue';
import './issues-lobby.scss';

const IssuesLobby: FC = () => {
  const { issues } = useAppSelector((state) => state.issues);
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
      <DeleteIssuePopup />
      <EditIssuePopup />
    </section>
  );
};

export default IssuesLobby;
