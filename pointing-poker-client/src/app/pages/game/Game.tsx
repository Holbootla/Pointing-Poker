import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CardFace from '../../components/shared/cards/card-face';
import IssueGame from '../../components/shared/issue-game/issue-game';
import Member from '../../components/shared/member/member';

function Game(): JSX.Element {
  const { gameID } = useParams<{ gameID: string }>();
  return (
    <div className="container">
      <Container>
        <Row>
          <Col sm>
            <Container>
              <Row>
                <Col sm>
                  <h2>
                    Room name <Badge bg="secondary">GAME# {gameID}</Badge>
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col sm>
                  Scrum master:
                  <Member />
                </Col>
                <Col sm>
                  <h4>2:00</h4>
                  <Button variant="success" className="m-1">
                    Start round
                  </Button>
                </Col>
                <Col sm>
                  <Button variant="danger" className="m-1">
                    Stop game
                  </Button>
                  <Button variant="primary" className="m-1">
                    Next issue
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col sm>
                  <h3>Issues</h3>
                  <IssueGame />
                  <IssueGame />
                  <IssueGame />
                  <IssueGame />
                  <IssueGame />
                </Col>
                <Col sm>
                  <h3>Statistics</h3>
                  <Row>
                    <Col sm>
                      <CardFace />
                      100%
                    </Col>
                    <Col sm>
                      <CardFace />
                      100%
                    </Col>
                    <Col sm>
                      <CardFace />
                      100%
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col sm>
                  <CardFace />
                </Col>
                <Col sm>
                  <CardFace />
                </Col>
                <Col sm>
                  <CardFace />
                </Col>
                <Col sm>
                  <CardFace />
                </Col>
                <Col sm>
                  <CardFace />
                </Col>
              </Row>
            </Container>
          </Col>
          <Col sm>
            <Container>
              <Row className="justify-content-md-center">
                <Col xs>
                  <Member />
                </Col>
                <Col md="auto">RESULT</Col>
              </Row>
              <Row>
                <Col>
                  <Member />
                </Col>
                <Col md="auto">RESULT</Col>
              </Row>
              <Row>
                <Col>
                  <Member />
                </Col>
                <Col md="auto">RESULT</Col>
              </Row>
              <Row>
                <Col>
                  <Member />
                </Col>
                <Col md="auto">RESULT</Col>
              </Row>
              <Row>
                <Col>
                  <Member />
                </Col>
                <Col md="auto">RESULT</Col>
              </Row>
              <Row>
                <Col>
                  <Member />
                </Col>
                <Col md="auto">RESULT</Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Game;
