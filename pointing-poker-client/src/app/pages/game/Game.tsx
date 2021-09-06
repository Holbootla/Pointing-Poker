import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import IssueGame from '../../components/shared/issue-game/issue-game';

function Game(): JSX.Element {
  const { gameID } = useParams<{ gameID: string }>();
  return (
    <div className="container">
    <Button variant="warning" className="m-1">
      GAME: {gameID}
    </Button>
    <IssueGame />
    </div>
  );
}

export default Game;