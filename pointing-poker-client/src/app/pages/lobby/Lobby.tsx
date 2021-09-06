import { Button } from 'react-bootstrap';
import Members from '../../components/scram/members/members';
import IssuesLobby from '../../components/scram/issues-lobby/issues-lobby';

function Lobby(): JSX.Element {
  return (
    <div className="container">
      <Button variant="secondary" className="m-1">
        LOBBY
      </Button>
      <Members />
      <IssuesLobby />
    </div>
  );
}

export default Lobby;
