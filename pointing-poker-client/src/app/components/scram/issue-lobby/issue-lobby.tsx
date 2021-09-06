import './issue-lobby.scss';

function Issue(): JSX.Element {

  return (
    <li className="item item-issue">
			<div className="issue-data">
				<p className="issue-status">Current</p>
				<p className="issue-name">Issue Title</p>
				<p className="issue-priority">Priority</p>
			</div>
			<div className="issue-actions-wrap">
			<div className="issue-actions issue-edit" />
			<div className="issue-actions issue-delete" />
			</div>

    </li>
  );
}

export default Issue;