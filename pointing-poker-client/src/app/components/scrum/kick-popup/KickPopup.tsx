import { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { closeKickPopupAction } from '../../../redux/reducers/kick-reducer';
import { kickMemberAction } from '../../../redux/reducers/members-reducer';
import { sendToServer } from '../../../socket/socket-context';
import './kickPopup.scss';

const KickPopup: FC = () => {
  const dispatch = useAppDispatch();
  const { gameID } = useAppSelector((state) => state.authPopup);
  const { members } = useAppSelector((state) => state.members);

  const { kickPopupVisible, kickedMemberId } = useAppSelector(
    (state) => state.kickPopup
  );

  const kickedMember = members.find(
    (member) => member.id === Number(kickedMemberId)
  );

  const closeKickPopup = () => {
    dispatch(closeKickPopupAction());
  };

  const handelKickMemberClick = () => {
    sendToServer('user_kicked', { gameID, user: { id: kickedMemberId } });
    // dispatch(kickMemberAction(kickedMember));
    dispatch(closeKickPopupAction());
  };

  return (
    <Modal
      className="kick-popup"
      show={kickPopupVisible}
      onHide={closeKickPopup}
      aria-labelledby="kick-popup"
      size="lg"
      centered
    >
      <Modal.Header className="kick-popup__header">
        <Modal.Title className="kick-popup__header-title">
          Kick player?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="kick-popup__body">
        {` Are you really want to remove player ${kickedMember?.firstName} 
        ${kickedMember?.lastName} from game session?`}
      </Modal.Body>
      <Modal.Footer>
        <div className="kick-popup__footer">
          <Button
            className="kick-popup__footer-button"
            variant="primary"
            onClick={handelKickMemberClick}
            onKeyPress={handelKickMemberClick}
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
