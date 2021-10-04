import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  ToastContainer,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import CardFace from '../../components/shared/cards/card-face';
import CardBreak from '../../components/shared/cards/card-break';
import GameName from '../../components/shared/game-name/game-name';
import KickPopup from '../../components/scrum/kick-popup/KickPopup';
import Member from '../../components/shared/member/member';
import { useAppSelector } from '../../redux/hooks';
import { gameState } from '../../redux/reducers/game-reducer';
import { membersState } from '../../redux/reducers/members-reducer';
import './game.scss';
import { IssueStatus } from '../../redux/reducers/issues-reducer';
import { sendToServer, socket } from '../../socket/socket-context';
import NewIssue from '../../components/scrum/new-issue/new-issue';
import Chat from '../../components/shared/chat/chat';
import IssueLobby from '../../components/scrum/issue-lobby/issue-lobby';

let timerId: NodeJS.Timeout;
let totalTime: number;
let votesQuantity: number;

function Game(): JSX.Element {
  const history = useHistory();
  const { members } = useAppSelector(membersState);
  const admin = members.find((member) => member.isAdmin === true);
  const { minutes, seconds } = useAppSelector(gameState).currentTimer;
  const { showRestartControls } = useAppSelector(gameState);
  totalTime = minutes * 60 + seconds;
  const { roundStatus, currentIssue, votes, averageValues } =
    useAppSelector(gameState);
  const { cardValuesFinalSet, scoreTypeShort, cardCover } = useAppSelector(
    (store) => store.gameSettings
  );
  const { issues } = useAppSelector((store) => store.issues);
  const { isAdmin, role, id } = useAppSelector((store) => store.authPopup.user);
  const { gameID } = useParams<{ gameID: string }>();
  const [showAlert, setShowAlert] = useState(false);
  const thisMemberId = id;
  votesQuantity = votes.length;

  useEffect(() => {
    setShowAlert(true);
    socket.on('GAME_STOPPED', () => {
      history.push(`/result/${gameID}`);
    });
  }, [gameID, history]);

  const stopRound = () => {
    clearInterval(timerId);
    sendToServer('stop_round', { gameID });
  };

  const decreaseTime = (time: number): number[] => {
    const decreasedTime = time - 1;
    const sec = decreasedTime % 60;
    const min = (decreasedTime - sec) / 60;
    return [min, sec];
  };

  const startTimer = (): void => {
    timerId = setInterval(() => {
      if (totalTime === 0 || votesQuantity === members.length) {
        stopRound();
      } else {
        const [min, sec] = decreaseTime(totalTime);
        sendToServer('set_current_timer', {
          gameID,
          currentTimer: { minutes: min, seconds: sec },
        });
      }
    }, 1000);
  };

  const startRound = (): void => {
    if (roundStatus === 'awaiting' && currentIssue.id !== '') {
      sendToServer('start_round', { gameID, voteResult: 'In progress' });
      startTimer();
    }
  };

  const finishRound = () => {
    sendToServer('finish_round', {
      gameID,
      currentIssue: { ...currentIssue, status: 'resolved' },
    });
  };

  const stopGame = (): void => {
    if (roundStatus === 'in progress') {
      stopRound();
    }
    sendToServer('stop_game', { gameID });
  };

  const cardClickHandler = (cardValue: string): void => {
    if (roundStatus === 'in progress') {
      sendToServer('set_vote', {
        gameID,
        memberId: thisMemberId,
        value: cardValue,
        voteResult: `${cardValue} ${scoreTypeShort}`,
      });
    }
  };

  const issueClickHandler = (
    issueId: number | string,
    status: IssueStatus
  ): void => {
    if (roundStatus === 'awaiting' && status === 'awaiting' && isAdmin) {
      const newCurrentIssue = issues.find((issue) => issue.id === issueId);
      sendToServer('set_current_issue', {
        gameID,
        currentIssue: { ...newCurrentIssue, status: 'current' },
      });
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Alert
          variant="success"
          show={showAlert}
          onClose={() => setShowAlert(false)}
          dismissible
          className="game-alert"
        >
          <Alert.Heading>Welcome to the game #{gameID}!</Alert.Heading>
          <p>Let&apos;s play!</p>
        </Alert>
        <GameName />
      </Row>
      <Row className="mb-5">
        <Col xl={8}>
          <Container>
            <Row className="mb-5">
              <Col>
                {admin && (
                  <>
                    <h3>Scrum master</h3>
                    <Member
                      id={admin.id}
                      firstName={admin.firstName}
                      lastName={admin.lastName}
                      jobPosition={admin.jobPosition}
                      avatar={admin.avatar}
                      isGame={false}
                    />
                  </>
                )}
              </Col>
              <Col>
                <div className="game__timer">
                  <div className="game__timer-minutes">{minutes}</div>
                  <div className="game__timer-dividor">:</div>
                  <div className="game__timer-minutes">
                    {seconds > 9 ? seconds : `0${seconds}`}
                  </div>
                </div>
              </Col>
              {isAdmin && (
                <Col>
                  <h3>Controls</h3>
                  <Button
                    variant="success"
                    className="m-1"
                    onClick={() => startRound()}
                  >
                    {showRestartControls ? 'Restart round' : 'Start round'}
                  </Button>
                  {showRestartControls && (
                    <>
                      <Button
                        variant="primary"
                        className="m-1"
                        onClick={() => finishRound()}
                      >
                        Next&nbsp;issue
                      </Button>
                      <Button
                        variant="danger"
                        className="m-1"
                        onClick={() => stopGame()}
                      >
                        Stop&nbsp;game
                      </Button>
                      <Chat size={undefined} />
                    </>
                  )}
                </Col>
              )}
            </Row>
            <Row className="mb-5">
              <Col>
                <h3>Issues</h3>
                <ToastContainer>
                  {issues.map((issue) => (
                    <div
                      key={issue.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => issueClickHandler(issue.id, issue.status)}
                      onKeyPress={() =>
                        issueClickHandler(issue.id, issue.status)
                      }
                    >
                      <IssueLobby
                        id={issue.id}
                        mode="game"
                        title={issue.title}
                        link={issue.link}
                        status={issue.status}
                        priority={issue.priority}
                      />
                    </div>
                  ))}
                </ToastContainer>
                {isAdmin && <NewIssue />}
              </Col>
              <Col>
                <h3>
                  {roundStatus === 'awaiting' ? 'Statistics' : 'Playground'}
                </h3>
                {roundStatus === 'awaiting' ? (
                  <Row>
                    {averageValues.map((item) => (
                      <Col key={item.value}>
                        <CardFace value={item.value} type={scoreTypeShort} />
                        {item.percents} %
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Row>
                    {votes.map((vote) => (
                      <Col key={vote.memberId}>
                        <div
                          className="card-cover"
                          style={{ backgroundColor: `${cardCover}` }}
                        />
                      </Col>
                    ))}
                  </Row>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xl={4}>
          <Container>
            <h3>Players</h3>
            {members.map((member) => (
              <Row key={member.id}>
                <Col>
                  <Member
                    id={member.id}
                    firstName={member.firstName}
                    lastName={member.lastName}
                    jobPosition={member.jobPosition}
                    avatar={member.avatar}
                    isGame
                    voteResult={member.voteResult}
                  />
                </Col>
              </Row>
            ))}
          </Container>
        </Col>
      </Row>
      <Row className="mb-5">
        {role === 'player' &&
          cardValuesFinalSet.map((cardValue) => (
            <Col key={cardValue} className="d-flex justify-content-center">
              <div
                role="button"
                tabIndex={0}
                onClick={() => cardClickHandler(cardValue)}
                onKeyPress={() => cardClickHandler(cardValue)}
              >
                {cardValue === 'Break' ? (
                  <CardBreak key="cardBreack" />
                ) : (
                  <CardFace value={cardValue} type={scoreTypeShort} />
                )}
              </div>
            </Col>
          ))}
      </Row>
      <KickPopup />
    </Container>
  );
}

export default Game;
