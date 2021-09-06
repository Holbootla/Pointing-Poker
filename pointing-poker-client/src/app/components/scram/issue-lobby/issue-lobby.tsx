import './issue-lobby.scss';

function Issue(): JSX.Element {

  return (
    <li className="item item-issue">
      <div className="issue-data">
        <p className="issue-name">Issue Title</p>
        <p className="issue-priority">Priority</p>
      </div>
      <div className="issue-icons-wrap">
      <div className="issue-icon issue-edit" />
      <div className="issue-icon issue-delete" />
      </div>
    </li>
  );
}

export default Issue;