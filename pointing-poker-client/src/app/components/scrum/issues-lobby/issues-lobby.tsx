import Issue from '../issue-lobby/issue-lobby';
import NewIssue from '../new-issue/new-issue';
import './issues-lobby.scss';

function IssuesLobby(): JSX.Element {

  return (
    <section className="section-wrap">
      <div className="section-title">issues:</div>
      <div className="issues-container">
        <ul className="issues-list">
          <Issue />
          <NewIssue />          
        </ul>
      </div>
    </section>
  );
}

export default IssuesLobby;