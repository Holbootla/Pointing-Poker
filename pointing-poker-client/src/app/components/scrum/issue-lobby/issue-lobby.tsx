import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  addIssueToEditAction,
  Issue,
} from '../../../redux/reducers/issues-reducer';
import {
  saveIdIssueToDeleteAction,
  showDeleteIssuePopupAction,
} from '../../../redux/reducers/delete-issue-reducer';
import {
  saveIdIssueToEditAction,
  showEditIssuePopupAction,
} from '../../../redux/reducers/edit-issue-reducer';
import './issue-lobby.scss';

const IssueLobby: FC<Issue> = ({ title, priority, id }) => {
  const dispatch = useAppDispatch();
  const { issues } = useAppSelector((state) => state.issues);

  const issueToEdit = issues.find((issue) => issue.id === id);

  const showDeleteIssuePopup = () => {
    dispatch(showDeleteIssuePopupAction());
    dispatch(saveIdIssueToDeleteAction(id));
  };
  const showEditIssuePopup = () => {
    dispatch(showEditIssuePopupAction());
    dispatch(saveIdIssueToEditAction(id));
    if (issueToEdit) dispatch(addIssueToEditAction(issueToEdit));
  };

  return (
    <li className="item item-issue">
      <div className="issue-data">
        <p className="issue-name issue-name-text">{title}</p>
        <p className="issue-priority">{priority}</p>
      </div>
      <div className="issue-icons-wrap">
        <div
          className="issue-icon issue-edit"
          role="button"
          tabIndex={0}
          onKeyPress={showEditIssuePopup}
          onClick={showEditIssuePopup}
        />
        <div
          className="issue-icon issue-delete"
          role="button"
          tabIndex={0}
          onKeyPress={showDeleteIssuePopup}
          onClick={showDeleteIssuePopup}
        />
      </div>
    </li>
  );
};

export default IssueLobby;
