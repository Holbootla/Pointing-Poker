import { useAppDispatch } from '../../../redux/hooks';
import { showIssuePopupAction } from '../../../redux/reducers/issues-reducer';
import IssuePopup from '../issue-popup/Issue-popup';
import './new-issue.scss';

function NewIssue(): JSX.Element {
  const dispatch = useAppDispatch();

  const showIssuePopup = () => dispatch(showIssuePopupAction());
  
  return (
    <li className="item item-issue">
      <p className="issue-name new-issue-name">create new issue</p>
      <div
        className="issue-add"
        role="button"
        tabIndex={0}
        onKeyPress={showIssuePopup}
        onClick={showIssuePopup}/>
      <IssuePopup />
    </li>
  );
}
export default NewIssue;