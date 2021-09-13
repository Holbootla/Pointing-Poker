import { useAppDispatch } from '../../../redux/hooks';
import { showKickPopupAction } from '../../../redux/reducers/kick-reducer';
import KickPopup from '../../shared/kick-popup/KickPopup';
import Member from '../../shared/member/member';
import './members.scss';

function Members(): JSX.Element {

  const members = [
    {id: 0, name: 'Name', surname: 'Surname'},
    {id: 1, name: 'Konstantin', surname: 'Djakov'},
    {id: 2, name: 'Nikita', surname: 'Lashch'},
    {id: 3, name: 'Svetlana', surname: 'Leshukova'},
  ];

  const avatarText = (name:string, surname: string) => {
    if (surname.length <1) {
      return name.slice(0, 1);
    } return name.slice(0, 1) + surname.slice(0, 1);
  }

  const dispatch = useAppDispatch();
  const showKickPopup = (kickedName: string, kickedSurname: string) =>
    dispatch(showKickPopupAction({ kickedName, kickedSurname }));

  return (
    <section className="section-wrap">
      <div className="section-title">members:</div>
      <div className="members-container">
        <div className="members-list">
          {members.map((member) => (
            <div className="item member-item" key={member.id}>
              <div className="member-avatar-wrap">
                <img src="" className="member-avatar-pic hidden" alt=""/>
                <div className="member-avatar">{`${avatarText(member.name, member.surname)}`}</div>
              </div>
              <div className="member-data">
                <p className="member-name">{member.name} {member.surname}</p>
                <p className="member-position">position</p>
              </div>
              <div
                className="kick-icon"
                role="button"
                tabIndex={0}
                onKeyPress={() => showKickPopup(member.name, member.surname)}
                onClick={() => showKickPopup(member.name, member.surname)}/>
            </div>
          ))}
        </div>
      </div>
      <KickPopup />
    </section>
  );
}

export default Members;