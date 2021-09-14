import { ChangeEvent } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { closeEditNamePopupAction, saveNewGameNameAction } from "../../redux/reducers/game-name-reducer";

function EditName(): JSX.Element {
  const dispatch = useAppDispatch();

  const { editNamePopupVisible,  gameName, prevGameName } = useAppSelector(
    (state) => state.editNamePopup
  );

  const closeEditNamePopup = () => {
    dispatch(closeEditNamePopupAction());
    dispatch(saveNewGameNameAction(prevGameName));
}

const handelChangeNameInput = (e: ChangeEvent<HTMLInputElement>) => {
  const { value } = e.target;
  dispatch(saveNewGameNameAction(value));
}

  const saveEditedGameName = () => {
    dispatch(closeEditNamePopupAction());
  }

  return (
  <>
    <Modal show={editNamePopupVisible} onHide={closeEditNamePopup}>
      <Modal.Header closeButton>
        <Modal.Title>Edit game name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>New game name</Form.Label>
          <Form.Control
            type="text"
            value={gameName}
            onChange={handelChangeNameInput} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary" 
          onClick={closeEditNamePopup}>
            Close Without Saving
        </Button>
        <Button 
          variant="primary"
          type="button"
          onClick={saveEditedGameName}>
            Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
}

export default EditName;
