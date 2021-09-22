import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { showKickPopupAction } from '../../../redux/reducers/kick-reducer';
import isScrum from '../../../shared';
import { socket } from '../../../socket/socket-context';
import './member.scss';

interface MemberProps {
  id: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  isAdmin: boolean;
}

function Member({
  id,
  firstName,
  lastName,
  jobPosition,
  isAdmin,
}: MemberProps): JSX.Element {
  const dispatch = useAppDispatch();

  const { members } = useAppSelector((state) => state.members);

  const avatarText = () => {
    if (lastName.length < 1) {
      return firstName.slice(0, 1);
    }
    return firstName.slice(0, 1) + lastName.slice(0, 1);
  };

  const showKickPopup = () => dispatch(showKickPopupAction(String(id)));

  const currentIsAdmin = isScrum(members, socket.id);

  return (
    <div className="item member-item">
      <div className="member-avatar-wrap">
        <img src="" className="member-avatar-pic hidden" alt="" />
        <div className="member-avatar">{avatarText()}</div>
      </div>
      <div className="member-data">
        {socket.id === id && <p className="current-status">It&lsquo;s You</p>}
        <p className="member-name">{`${firstName} ${lastName}`}</p>
        <p className="member-position">{jobPosition}</p>
      </div>
      {currentIsAdmin && (
        <div
          className="kick-icon"
          role="button"
          tabIndex={0}
          onKeyPress={() => showKickPopup()}
          onClick={() => showKickPopup()}
        />
      )}
    </div>
  );
}

export default Member;
