import { FormEvent, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { useLocation } from 'react-router';
import { useAppDispatch } from '../../redux/hooks';
import {
  closeAuthPopupAction,
  setGameIDAction,
  setIsAdminAction,
  setNewGame,
  setUserIDAction,
  showAuthPopupAction,
} from '../../redux/reducers/auth-reducer';
import { socket } from '../../socket/socket-context';
import AuthPopup from './AuthPopup';

function Start(): JSX.Element {
  useEffect(() => {
    dispatch(closeAuthPopupAction());
  }, []);

  function getRandomID(min: number, max: number) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  const dispatch = useAppDispatch();

  const location = useLocation();
  const locationID = location.pathname.split('/').splice(-1, 1);

  const showAuthPopup = () => dispatch(showAuthPopupAction());

  const handleStartGameButton = () => {
    dispatch(setGameIDAction(getRandomID(10000000, 99999999).toString()));
    dispatch(setNewGame(true));
    dispatch(setIsAdminAction(true));
    dispatch(setUserIDAction(socket.id));
  };

  // const handleChangeConnectGameID = (e: ChangeEvent<HTMLInputElement>) => {
  //   dispatch(setGameIDAction(e.target.value.toString()));
  // };

  const handleConnectGameButton = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setGameIDAction(locationID));
    dispatch(setNewGame(false));
    dispatch(setIsAdminAction(false));
    dispatch(setUserIDAction(socket.id));
  };

  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <h1>Start your planning:</h1>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
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
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h4>or</h4>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
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
                value={locationID}
                required
                // onChange={handleChangeConnectGameID}
              />
              <Button type="submit" variant="primary" id="button-addon2">
                Connect
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <AuthPopup />
    </Container>
  );
}

export default Start;
