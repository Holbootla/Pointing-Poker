import Member from '../../shared/member/member';
import './members.scss';

function Members(): JSX.Element {

  const avatarText = (name:string, surname: string) => {
    if (surname.length <1) {
      return name.slice(0, 1);
    } return name.slice(0, 1) + surname.slice(0, 1);
  }

  return (
    <section className="section-wrap">
      <div className="section-title">members:</div>
      <div className="members-container">
        <ul className="members-list">
					<Member />
          <li className="item member-item">
            <div className="member-avatar-wrap">
              <img src="" className="member-avatar-pic hidden" alt=""/>
              <div className="member-avatar">{`${avatarText('Name', 'Surname')}`}</div>
            </div>
            <div className="member-data">
              <p className="member-name">Name Surname</p>
              <p className="member-position">position</p>
            </div>
            <div className="kick-icon" />
          </li>
          <li className="item member-item">
            <div className="member-avatar-wrap">
              <img src="" className="member-avatar-pic hidden" alt=""/>
              <div className="member-avatar">{`${avatarText('Konstantin', 'Djakov')}`}</div>
            </div>
            <div className="member-data">
              <p className="member-name">Konstantin Djakov</p>
              <p className="member-position">position</p>
            </div>
            <div className="kick-icon" />
          </li>
          <li className="item member-item">
            <div className="member-avatar-wrap">
              <img src="" className="member-avatar-pic hidden" alt=""/>
              <div className="member-avatar">{`${avatarText('Nikita', 'Lashch')}`}</div>
            </div>
            <div className="member-data">
              <p className="member-name">Nikita Lashch</p>
              <p className="member-position">position</p>
            </div>
            <div className="kick-icon" />
          </li>
          <li className="item member-item">
            <div className="member-avatar-wrap">
              <img src="" className="member-avatar-pic hidden" alt=""/>
              <div className="member-avatar">{`${avatarText('Svetlana', 'Leshukova')}`}</div>
            </div>
            <div className="member-data">
              <p className="member-name">Svetlana Leshukova</p>
              <p className="member-position">position</p>
            </div>
            <div className="kick-icon" />
          </li>
          <li className="item member-item">
            <div className="member-avatar-wrap">
              <img src="" className="member-avatar-pic hidden" alt=""/>
              <div className="member-avatar">{`${avatarText('Name', 'Surname')}`}</div>
            </div>
            <div className="member-data">
              <p className="member-name">Name Surname</p>
              <p className="member-position">position</p>
            </div>
            <div className="kick-icon" />
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Members;