import './new-issue.scss';

function NewIssue(): JSX.Element {
  return (
    <li className="item item-issue">
      <p className="issue-name new-issue-name">create new issue</p>
      <div className="issue-add" />
    </li>
  );
}
export default NewIssue;