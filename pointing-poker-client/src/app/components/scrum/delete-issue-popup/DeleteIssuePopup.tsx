import { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setIssuesAction } from '../../../redux/reducers/issues-reducer';
import { closeDeleteIssuePopupAction } from '../../../redux/reducers/delete-issue-reducer';
import './delete-issue-popup.scss';

const DeleteIssuePopup: FC = () => {
  const dispatch = useAppDispatch();

  const { issues } = useAppSelector((state) => state.issues);
  const { deleteIssuePopupVisible, idIssueToDelete } = useAppSelector(
    (state) => state.deleteIssuePopup
  );

  const closeDeleteIssuePopup = () => dispatch(closeDeleteIssuePopupAction());
  const issueToDelete = issues.find((issue) => issue.id === idIssueToDelete);

  const deleteIssue = () => {
    const deleteIssueIndex = issues.findIndex(
      (issue) => issue.id === idIssueToDelete
    );
    dispatch(setIssuesAction(deleteIssueIndex));
    dispatch(closeDeleteIssuePopupAction());
  };

  return (
    <Modal
      show={deleteIssuePopupVisible}
      onHide={closeDeleteIssuePopup}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete issue?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you really want to remove the issue{' '}
        <span className="issue-title-delete">{issueToDelete?.title} </span>from
        spring
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="button" onClick={deleteIssue}>
          Delete
        </Button>
        <Button variant="secondary" onClick={closeDeleteIssuePopup}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteIssuePopup;
