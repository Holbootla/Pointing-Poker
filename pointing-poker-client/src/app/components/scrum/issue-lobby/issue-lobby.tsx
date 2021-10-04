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
  title: string;
  link: string;
  status: string;
  priority: string;
  mode: 'lobby' | 'game' | 'result';
}

const IssueLobby: FC<Props> = ({ id, mode, title, link, status, priority }) => {
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

  switch (mode) {
    case 'lobby':
      return (
        <Toast
          onClose={showDeleteIssuePopup}
          key={id}
          className="d-inline-block m-1 issue"
        >
          <Toast.Header>
            <strong className="me-auto">{title}</strong>
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
              <a href={link} target="_blank" rel="noreferrer">
                {link.substr(0, 35)}
                {link.length > 35 && '...'}
              </a>
            </span>
            <small className="align-self-end text-muted">{priority}</small>
          </Toast.Body>
        </Toast>
      );
    case 'game':
      return (
        <Toast
          className="m-1 issue"
          bg={
            (status === 'current' && 'success') ||
            (status === 'resolved' && 'danger') ||
            undefined
          }
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">{title}</strong>
            <small className="text-muted">{status}</small>
          </Toast.Header>
          <Toast.Body
            className={`d-flex flex-column ${
              status !== 'awaiting' && 'text-white'
            }`}
          >
            <span>
              Link:{' '}
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className={
                  (status !== 'awaiting' && 'text-light') || 'text-primary'
                }
              >
                {link.substr(0, 35)}
                {link.length > 35 && '...'}
              </a>
            </span>
            <small
              className={`align-self-end text-muted ${
                status !== 'awaiting' && 'text-white-50'
              }`}
            >
              {priority}
            </small>
          </Toast.Body>
        </Toast>
      );
    case 'result':
      return (
        <Toast className="m-1 issue">
          <Toast.Header closeButton={false}>
            <strong className="me-auto">{title}</strong>
            <small className="text-muted">{status}</small>
          </Toast.Header>
          <Toast.Body className="d-flex flex-column">
            <span>
              Link:{' '}
              <a href={link} target="_blank" rel="noreferrer">
                {link.substr(0, 35)}
                {link.length > 35 && '...'}
              </a>
            </span>
            <small className="align-self-end text-muted">{priority}</small>
          </Toast.Body>
        </Toast>
      );

    default:
      return null;
  }
};

export default IssueLobby;
