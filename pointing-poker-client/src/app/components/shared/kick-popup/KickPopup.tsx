import { Modal, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { closeKickPopupAction } from '../../../redux/reducers/kick-reducer';
import './kickPopup.scss'

const KickPopup = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { kickPopupVisible, kickedName, kickedSurname } = useAppSelector((state) => state.kickPopup);
  const closeKickPopup = () => dispatch(closeKickPopupAction());

  return (
    <Modal
      className="kick-popup"
      show={kickPopupVisible}
      onHide={closeKickPopup}
      aria-labelledby="kick-popup"
      size="xl"
      centered
    >
      <Modal.Header className="kick-popup__header">
        <Modal.Title className="kick-popup__header-title">Kick player?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="kick-popup__body">
        Are you really want to remove player {kickedName} {kickedSurname} from game session?
      </Modal.Body>
      <Modal.Footer>
        <div className="kick-popup__footer">
          <Button
            className="kick-popup__footer-button"
            variant="primary"
            onClick={closeKickPopup}
            onKeyPress={closeKickPopup}
          >
            Yes
          </Button>
          <Button
            className="kick-popup__footer-button"
            variant="outline-primary"
            onClick={closeKickPopup}
            onKeyPress={closeKickPopup}
          >
            No
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default KickPopup;
