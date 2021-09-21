import { FC, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { sendToServer, socket } from '../../socket/socket-context';
import { setGameSettings } from '../../redux/reducers/game-settings-reducer';

const Lobby: FC = () => {
  const dispatch = useAppDispatch();
  const { gameID } = useAppSelector((state) => state.authPopup);
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const history = useHistory();
  const linkToLobby = `https://.../lobby/${gameID}`;

  useEffect(() => {
    const defaultLocalSettings = localStorage.getItem('gameSettings');

    if (defaultLocalSettings) {
      dispatch(setGameSettings(JSON.parse(defaultLocalSettings)));
    }

    socket.on('GAME_STARTED', () => {
      history.push(`/game/${gameID}`);
    });
  }, []);

  const handelStartGameButtonClick = () => {
    const { isDefaultSettings } = gameSettings;
    if (isDefaultSettings) {
      localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
    }
    sendToServer('settings_changed', { gameID, gameSettings }, () => {
      sendToServer('game_started', { gameID });
    });
  };

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
            Start Game
          </Button>
          <Button variant="outline-danger" className="m-1">
            {/* <Link className="link-styles-cansel" to={linkToLobby}> */}
            Cancel game
            {/* </Link> */}
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
