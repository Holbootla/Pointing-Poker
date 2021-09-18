import { FC } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { showDeleteIssuePopupAction } from '../../../redux/reducers/delete-issue-reducer';
import { Issue } from '../../../redux/reducers/issues-reducer';
import './issue-game.scss';

const IssueGame: FC<Issue> = ({ id, title, link, priority, status }) => {
  const dispatch = useAppDispatch();

  const showDeleteIssuePopup = () => {
    dispatch(showDeleteIssuePopupAction());
  };

  return (
    <li className="item item-issue">
      <div className="issue-data">
        <p className="current-status">{status}</p>
        <p className="issue-name">{title} {id}</p>
        <div className="issue-link">{link}</div>
        <p className="issue-priority">{priority}</p>
      </div>
      <div
        className="issue-icon issue-game-delete"
        role="button"
        tabIndex={0}
        onKeyPress={showDeleteIssuePopup}
        onClick={showDeleteIssuePopup}
      />
    </li>
  );
};

export default IssueGame;
