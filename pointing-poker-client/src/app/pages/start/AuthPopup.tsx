import { Button, Form, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeAuthPopupAction } from '../../redux/reducers/auth-reducer';

function AuthPopup(): JSX.Element {
  const dispatch = useAppDispatch();

  const authPopupVisible = useAppSelector(
    (state) => state.authPopup.authPopupVisible
  );

  const closeAuthPopup = () => dispatch(closeAuthPopupAction());

  return (
    <Modal show={authPopupVisible} onHide={closeAuthPopup}>
      <Modal.Header closeButton>
        <Modal.Title>Connect to lobby</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="FirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="LastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="JobPosition">
            <Form.Label>Job position</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your job position"
              required
            />
            <Form.Text className="text-muted">
              Your job position will be influence on weight of your vote
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Observer">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Connect as observer"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeAuthPopup}>
          Cancel
        </Button>
        <Button variant="primary" onClick={closeAuthPopup}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AuthPopup;
