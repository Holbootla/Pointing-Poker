import './issue-game.scss';

function IssueGame(): JSX.Element {

  return (
    <li className="item item-issue">
      <div className="issue-data">
        <p className="issue-status">Current</p>
        <p className="issue-name">Issue Title</p>
        <p className="issue-priority">Priority</p>
      </div>
      <div className="issue-icon issue-game-delete" />
    </li>
  );
}

export default IssueGame;