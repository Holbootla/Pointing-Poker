import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { closeIssuePopupAction } from '../../../redux/reducers/issue-reducer';
import "./issue-popup.scss";

const IssuePopup = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { issuePopupVisible } = useAppSelector((state) => state.issuePopup);
  const closeIssuePopup = () => dispatch(closeIssuePopupAction());

  return (
    <Modal
      className="issue-popup"
      show={issuePopupVisible}
      onHide={closeIssuePopup}
      size="lg"
      centered
    >
      <Modal.Header className="issue-popup__header">
        <Modal.Title className="issue-popup__header-title">Create Issue</Modal.Title>
      </Modal.Header>
      <Modal.Body className="issue-popup__body">
      <Form className="issue-popup__form">
          <Form.Group  as={Row} className="mb-3" controlId="IssueTitle">
            <Form.Label  column sm={2}>Title</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Issue title" required/>
            </Col>
          </Form.Group>
          <Form.Group  as={Row} className="mb-3" controlId="IssueLink">
            <Form.Label  column sm={2}>Link</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Issue link" required/>
            </Col>
          </Form.Group>
          <Form.Group  as={Row} className="mb-3" controlId="IssuePriority">
            <Form.Label  column sm={2}>Priority</Form.Label>
            <Col sm={10}>
            <Form.Select aria-label="Priority">
              <option value="1">Low</option>
              <option value="2">Middle</option>
              <option value="3">Hight</option>
            </Form.Select>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="issue-popup__footer">
          <Button
            className="issue-popup__footer-button"
            variant="primary"
            onClick={closeIssuePopup}
            onKeyPress={closeIssuePopup}
          >
            Yes
          </Button>
          <Button
            className="issue-popup__footer-button"
            variant="outline-primary"
            onClick={closeIssuePopup}
            onKeyPress={closeIssuePopup}
          >
            No
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default IssuePopup;
