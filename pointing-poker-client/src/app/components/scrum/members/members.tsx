import KickPopup from '../kick-popup/KickPopup';
import Member from '../../shared/member/member';
import './members.scss';

function Members(): JSX.Element {
  const members = [
    { id: 0, name: 'Name', surname: 'Surname', position: 'Boss' },
    { id: 1, name: 'Konstantin', surname: 'Djakov', position: 'Big Boss' },
    { id: 2, name: 'Nikita', surname: 'Lashch', position: 'Big Boss' },
    { id: 3, name: 'Svetlana', surname: 'Leshukova', position: 'Big Boss' },
  ];

  return (
    <section className="section-wrap">
      <div className="section-title">members:</div>
      <div className="members-container">
        <div className="members-list">
          {members.map((member) => (
            <Member
              key={member.id}
              name={member.name}
              surname={member.surname}
              position={member.position}
            />
          ))}
        </div>
      </div>
      <KickPopup />
    </section>
  );
}

export default Members;
