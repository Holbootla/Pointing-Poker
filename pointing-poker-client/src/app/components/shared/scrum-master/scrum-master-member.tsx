import { useAppSelector } from '../../../redux/hooks';

function ScrumMasterMember(): JSX.Element {
  const { members } = useAppSelector((state) => state.members);
  const scrum = members.find((member) => member.isAdmin === true);

  const avatarText = (name: string, surname: string) => {
    if (surname.length < 1) {
      return name.slice(0, 1);
    }
    return name.slice(0, 1) + surname.slice(0, 1);
  };

  return (
    <>
      <p className="settings-label">Scrum master:</p>
      <div className="item member-item member-scrum">
        <div className="member-avatar-wrap">
          <img src="" className="member-avatar-pic hidden" alt="" />
          <div className="member-avatar">
            {scrum ? avatarText(scrum.firstName, scrum.lastName) : null}
          </div>
        </div>
        <div className="member-data member-data-nokick">
          <p className="current-status">user id = member.id </p>
          <p className="member-name">
            {scrum ? `${scrum.firstName} ${scrum.lastName}` : null}
          </p>
          <p className="member-position">{scrum?.jobPosition}</p>
        </div>
      </div>
    </>
  );
}

export default ScrumMasterMember;
