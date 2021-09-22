import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  savePrevGameNameAction,
  showEditNamePopupAction,
} from '../../../redux/reducers/game-name-reducer';
import isScrum from '../../../shared';
import { socket } from '../../../socket/socket-context';
import './game-name.scss';

function GameName(): JSX.Element {
  const dispatch = useAppDispatch();

  const { gameName } = useAppSelector((state) => state.gameName);
  const { members } = useAppSelector((state) => state.members);

  const showEditNamePopup = () => {
    dispatch(showEditNamePopupAction());
    dispatch(savePrevGameNameAction());
  };

  const currentIsAdmin = isScrum(members, socket.id);

  return (
    <div className="game-name-wrap">
      <div className="game-name-title">{gameName}</div>
      {currentIsAdmin && (
        <div
          className="edit-game-name"
          role="button"
          tabIndex={0}
          onKeyPress={showEditNamePopup}
          onClick={showEditNamePopup}
        />
      )}
    </div>
  );
}

export default GameName;
