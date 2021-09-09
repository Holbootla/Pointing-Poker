import './member.scss';

function Member(): JSX.Element {

	const avatarText = (name:string, surname: string) => {
    if (surname.length <1) {
      return name.slice(0, 1);
    } return name.slice(0, 1) + surname.slice(0, 1);
  }

  return (
          <div className="item member-item">
            <div className="member-avatar-wrap">
              <img src="" className="member-avatar-pic hidden" alt=""/>
              <div className="member-avatar">{`${avatarText('Peter', 'Ivanov')}`}</div>
            </div>
            <div className="member-data">
              <p className="current-status">It is you</p>
              <p className="member-name">Peter Ivanov</p>
              <p className="member-position">position</p>
            </div>
            <div className="kick-icon" />
          </div>
  );
}

export default Member;