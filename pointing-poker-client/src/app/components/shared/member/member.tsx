import { useAppDispatch } from '../../../redux/hooks';
import { showKickPopupAction } from '../../../redux/reducers/kick-reducer';
import './member.scss';

interface MemberProps {
  id: number;
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
  const avatarText = () => {
    if (lastName.length < 1) {
      return firstName.slice(0, 1);
    }
    return firstName.slice(0, 1) + lastName.slice(0, 1);
  };

  const showKickPopup = () => dispatch(showKickPopupAction(String(id)));

  return (
    <div className="item member-item">
      <div className="member-avatar-wrap">
        <img src="" className="member-avatar-pic hidden" alt="" />
        <div className="member-avatar">{avatarText()}</div>
      </div>
      <div className="member-data">
        <p className="current-status">Member ID {id}</p>
        <p className="member-name">{`${firstName} ${lastName}`}</p>
        <p className="member-position">{jobPosition}</p>
      </div>
      {isAdmin ? (
        <div className="scrum-card">scrum</div>
      ) : (
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
