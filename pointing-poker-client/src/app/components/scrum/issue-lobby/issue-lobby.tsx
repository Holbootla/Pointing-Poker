import { FC } from 'react';
import { Toast } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addIssueToEditAction } from '../../../redux/reducers/issues-reducer';
import {
  saveIdIssueToDeleteAction,
  showDeleteIssuePopupAction,
} from '../../../redux/reducers/delete-issue-reducer';
import {
  saveIdIssueToEditAction,
  showEditIssuePopupAction,
} from '../../../redux/reducers/edit-issue-reducer';
import './issue-lobby.scss';

interface Props {
  id: number | string;
}

const IssueLobby: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { issues } = useAppSelector((state) => state.issues);
  const currentIssue = issues.find((issue) => issue.id === id);

  const showDeleteIssuePopup = () => {
    dispatch(showDeleteIssuePopupAction());
    dispatch(saveIdIssueToDeleteAction(id));
  };
  const showEditIssuePopup = () => {
    dispatch(showEditIssuePopupAction());
    dispatch(saveIdIssueToEditAction(id));
    if (currentIssue) dispatch(addIssueToEditAction(currentIssue));
  };

  return (
    <Toast
      onClose={showDeleteIssuePopup}
      key={id}
      className="d-inline-block m-1 issue"
    >
      <Toast.Header>
        <strong className="me-auto">{currentIssue?.title}</strong>
        <small
          className="text-muted"
          role="button"
          tabIndex={Number(id)}
          onClick={showEditIssuePopup}
          onKeyPress={showEditIssuePopup}
        >
          edit
        </small>
      </Toast.Header>
      <Toast.Body className="d-flex flex-column">
        <span>
          Link:{' '}
          <a href={currentIssue?.link} target="_blank" rel="noreferrer">
            {currentIssue?.link.substr(0, 35)}
            {currentIssue && currentIssue?.link.length > 35 && '...'}
          </a>
        </span>
        <small className="align-self-end text-muted">
          {currentIssue?.priority}
        </small>
      </Toast.Body>
    </Toast>
  );
};

export default IssueLobby;
