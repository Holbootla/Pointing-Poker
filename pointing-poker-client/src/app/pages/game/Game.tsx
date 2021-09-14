import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CardFace from '../../components/shared/cards/card-face';
import GameName from '../../components/shared/game-name/game-name';
import IssueGame from '../../components/shared/issue-game/issue-game';
import Member from '../../components/shared/member/member';
import ScrumMasterMember from '../../components/shared/scrum-master/scrum-master-member';

function Game(): JSX.Element {
  const { gameID } = useParams<{ gameID: string }>();
  return (
    <div className="container">
      <GameName />
      <div>Room #{gameID}</div>
      <Container>
        <Row>
          <Col xl={7}>
            <Container>
              <Row>
                <Col>
                  <ScrumMasterMember />
                </Col>
                <Col>
                  <h4>2:00</h4>
                  <Button variant="success" className="m-1">
                    Start round
                  </Button>
                </Col>
                <Col>
                  <Button variant="danger" className="m-1">
                    Stop game
                  </Button>
                  <Button variant="primary" className="m-1">
                    Next issue
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3>Issues</h3>
                  {[1, 2, 3, 4, 5, 6, 7].map(() => (
                    <IssueGame />
                  ))}
                </Col>
                <Col>
                  <h3>Statistics</h3>
                  <Row>
                    {[1, 2, 3].map(() => (
                      <Col>
                        {/* <CardFace /> */}
                        100%
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xl={5}>
            <Container>
              <h2>Players:</h2>
              {[1, 2, 3].map(() => (
                <Row>
                  <Col>
                    <Member />
                  </Col>
                  <Col>RESULT</Col>
                </Row>
              ))}
            </Container>
          </Col>
        </Row>
        <Row>
          {[1, 2, 3, 4, 5, 6, 7].map(() => (
            <Col>
              {/* <CardFace /> */}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Game;
