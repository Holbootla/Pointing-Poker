import './member.scss';

interface MemberProps {
  id: number;
  firstName: string;
  lastName: string;
  jobPosition: string;
}

function Member({ id, firstName, lastName, jobPosition}: MemberProps): JSX.Element {

	const avatarText = (name:string, surname: string) => {
    if (surname.length <1) {
      return name.slice(0, 1);
    } return name.slice(0, 1) + surname.slice(0, 1);
  }

  return (
          <div className="item member-item">
            <div className="member-avatar-wrap">
              <img src="" className="member-avatar-pic hidden" alt=""/>
              <div className="member-avatar">{`${avatarText(firstName, lastName)}`}</div>
            </div>
            <div className="member-data">
              <p className="current-status">Member ID {id}</p>
              <p className="member-name">{firstName} {lastName}</p>
              <p className="member-position">{jobPosition}</p>
            </div>
            <div className="kick-icon" />
          </div>
  );
}

export default Member;