import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Game(): JSX.Element {
  const { gameID } = useParams<{ gameID: string }>();
  return (
    <Button variant="warning" className="m-1">
      GAME: {gameID}
    </Button>
  );
}

export default Game;
