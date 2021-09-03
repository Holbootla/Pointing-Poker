import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useAppDispatch } from '../../redux/hooks';
import { showAuthPopupAction } from '../../redux/reducers/auth-reducer';
import AuthPopup from './AuthPopup';

function Start(): JSX.Element {
  const dispatch = useAppDispatch();

  const showAuthPopup = () => dispatch(showAuthPopupAction());

  return (
    <>
      <h1>Planning poker</h1>
      <h2>Start your planning:</h2>
      <h3>
        Create session:
        <Button variant="primary" className="m-1" onClick={showAuthPopup}>
          Start new game
        </Button>
      </h3>
      <div>or</div>
      <h3>Connect to lobby by game ID</h3>
      <InputGroup>
        <FormControl placeholder="Enter game ID" aria-label="game-id" />
        <Button variant="primary" id="button-addon2" onClick={showAuthPopup}>
          Connect
        </Button>
      </InputGroup>
      <AuthPopup />
    </>
  );
}

export default Start;
