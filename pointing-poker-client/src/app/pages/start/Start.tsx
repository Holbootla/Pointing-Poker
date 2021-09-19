import { ChangeEvent, FormEvent } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setGameIDAction,
  setNewGame,
  showAuthPopupAction,
} from '../../redux/reducers/auth-reducer';
import AuthPopup from './AuthPopup';

function Start(): JSX.Element {
  function getRandomID(min: number, max: number) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  const dispatch = useAppDispatch();

  const { gameID } = useAppSelector((state) => state.authPopup);

  const showAuthPopup = () => dispatch(showAuthPopupAction());

  const handleStartGameButton = () => {
    dispatch(setGameIDAction(getRandomID(10000000, 99999999).toString()));
    dispatch(setNewGame(true));
  };

  const handleChangeConnectGameID = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setGameIDAction(e.target.value.toString()));
  };

  const handleConnectGameButton = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setNewGame(false));
  };

  return (
    <>
      <h1>Planning poker</h1>
      <h2>Start your planning:</h2>
      <h3>
        Create session:
        <Button
          variant="primary"
          className="m-1"
          onClick={() => {
            handleStartGameButton();
            showAuthPopup();
          }}
        >
          Start new game
        </Button>
      </h3>
      <div>or</div>
      <h3>Connect to lobby by game ID</h3>
      <Form
        onSubmit={(e) => {
          handleConnectGameButton(e);
          showAuthPopup();
        }}
      >
        <InputGroup>
          <FormControl
            type="number"
            min="10000000"
            max="99999999"
            placeholder="Enter game ID"
            aria-label="game-id"
            value={gameID}
            required
            onChange={handleChangeConnectGameID}
          />
          <Button type="submit" variant="primary" id="button-addon2">
            Connect
          </Button>
        </InputGroup>
      </Form>
      <AuthPopup />
    </>
  );
}

export default Start;
