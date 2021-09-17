import { FC } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { showDeleteIssuePopupAction } from '../../../redux/reducers/delete-issue-reducer';
import './issue-game.scss';

const IssueGame: FC = () => {
  const dispatch = useAppDispatch();

  const showDeleteIssuePopup = () => {
    dispatch(showDeleteIssuePopupAction());
  };

  return (
    <li className="item item-issue">
      <div className="issue-data">
        <p className="current-status">Current</p>
        <p className="issue-name">Issue Title</p>
        <p className="issue-priority">Priority</p>
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
