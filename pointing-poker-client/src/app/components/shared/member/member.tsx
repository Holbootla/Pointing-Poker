import { Toast, Image } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { showKickPopupAction } from '../../../redux/reducers/kick-reducer';
import './member.scss';

interface MemberProps {
  id: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  avatar: string;
  isGame: boolean;
  roundStatus?: 'in progress' | 'awaiting';
  voteResult?: string;
}

function Member({
  id,
  firstName,
  lastName,
  jobPosition,
  avatar,
  isGame,
  roundStatus,
  voteResult,
}: MemberProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authPopup);
  const avatarText = () => {
    if (lastName.length < 1) {
      return firstName.slice(0, 1);
    }
    return firstName.slice(0, 1) + lastName.slice(0, 1);
  };

  const showKickPopup = () => dispatch(showKickPopupAction(String(id)));

  return (
    <Toast onClose={showKickPopup} className="d-inline-block m-1 member">
      <Toast.Header closeButton={id !== user.id && user.isAdmin}>
        {avatar ? (
          <Image src={avatar} roundedCircle className="avatar me-2" />
        ) : (
          <div className="avatar bg-info me-2">{avatarText()}</div>
        )}
        <strong className="me-auto">
          {firstName} {lastName}
        </strong>
        {id === user.id && (
          <small className="text-danger">It&lsquo;s&nbsp;You</small>
        )}
      </Toast.Header>
      <Toast.Body className="d-flex flex-column">
        {isGame ? (
          <div className="d-flex justify-content-between w-100">
            <small className="text-warning">
              {user.isAdmin && voteResult}
              {!user.isAdmin && roundStatus === 'in progress' && 'Thinking...'}
              {!user.isAdmin && roundStatus === 'awaiting' && voteResult}
            </small>
            <small className="text-muted">{jobPosition}</small>
          </div>
        ) : (
          <small className="align-self-end text-muted">{jobPosition}</small>
        )}
      </Toast.Body>
    </Toast>
  );
}

export default Member;
