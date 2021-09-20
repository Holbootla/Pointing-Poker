import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Members from '../../components/scrum/members/members';
import IssuesLobby from '../../components/scrum/issues-lobby/issues-lobby';
import GameSettings from '../../components/scrum/game-settings/game-settings';
import ScrumMasterMember from '../../components/shared/scrum-master/scrum-master-member';
import './lobby.scss';
import GameName from '../../components/shared/game-name/game-name';
import EditName from './EditNamePopup';
import CustomCoverPopup from './CustomCoverPopup';
import CardValuePopup from './AddCardValuePopup';
import { useAppSelector } from '../../redux/hooks';

const Lobby: FC = () => {
  const { gameID } = useAppSelector((state) => state.authPopup);
  const { isDefaultSettings } = useAppSelector((state) => state.gameSettings);
  const linkToLobby = `https://.../lobby/${gameID}`;
  const linkToGame = `https://.../game/${gameID}`;

  const handelStartGameButtonClick = () =>
    isDefaultSettings
      ? console.log('send to server settings to use and save')
      : console.log('send to server settings onlu to use');

  const copyLinkButtonHandler = () =>
    navigator.clipboard.writeText(linkToLobby);

  return (
    <div className="container">
      <section className="section-wrap">
        <GameName />
        <ScrumMasterMember />
        <p className="lobby-link-title">Link to lobby:</p>
        <div className="lobby-link-block">
          <p className="lobby-link-text">{linkToLobby}</p>
          <Button
            variant="secondary"
            className="m-1"
            onClick={copyLinkButtonHandler}
          >
            Copy Link
          </Button>
        </div>
        <div className="game-control-btn-block">
          <Button
            variant="primary"
            className="m-1"
            onClick={handelStartGameButtonClick}
          >
            <Link className="link-styles-start" to={linkToGame}>
              Start Game
            </Link>
          </Button>
          <Button variant="outline-danger" className="m-1">
            <Link className="link-styles-cansel" to={linkToLobby}>
              Cancel game
            </Link>
          </Button>
        </div>
      </section>
      <Members />
      <IssuesLobby />
      <GameSettings />
      <EditName />
      <CustomCoverPopup />
      <CardValuePopup />
    </div>
  );
};

export default Lobby;
