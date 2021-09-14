import { Button } from 'react-bootstrap';
import Members from '../../components/scrum/members/members';
import IssuesLobby from '../../components/scrum/issues-lobby/issues-lobby';
import GameSettings from '../../components/scrum/game-settings/game-settings';
import ScrumMasterMember from '../../components/shared/scrum-master/scrum-master-member';
import './lobby.scss'
import GameName from '../../components/shared/game-name/game-name';
import EditName from './EditNamePopup';
import CustomCoverPopup from './CustomCoverPopup';
import CardValuePopup from './AddCardValuePopup';


function Lobby(): JSX.Element {
  return (
    <div className="container">
      <section className="section-wrap">
        <GameName />
        <ScrumMasterMember />
        <p className="lobby-link-title">Link to lobby:</p>
        <div className="lobby-link-block">
          <p className="lobby-link-text">https://................</p>
          <Button variant="secondary" className="m-1">Copy Link</Button>
        </div>
        <div className="game-control-btn-block">
        <Button variant="primary" className="m-1">Start Game</Button>
        <Button variant="outline-danger" className="m-1">Cancel game</Button>
        </div>
      </section>
      <Members />
      <IssuesLobby />
      <GameSettings />
			<EditName />
			<CustomCoverPopup/>
			<CardValuePopup />
    </div>
  );
}

export default Lobby;
