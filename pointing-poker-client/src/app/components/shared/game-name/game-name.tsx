import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  savePrevGameNameAction,
  showEditNamePopupAction,
} from '../../../redux/reducers/game-name-reducer';
import './game-name.scss';

function GameName(): JSX.Element {
  const dispatch = useAppDispatch();

  const { gameName } = useAppSelector((state) => state.gameName);
  const { isAdmin } = useAppSelector((state) => state.authPopup.user);

  const showEditNamePopup = () => {
    dispatch(showEditNamePopupAction());
    dispatch(savePrevGameNameAction());
  };

  return (
    <div className="game-name-wrap">
      <div className="game-name-title">{gameName}</div>
      {isAdmin && (
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
