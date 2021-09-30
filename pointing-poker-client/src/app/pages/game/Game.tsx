import { useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import CardFace from '../../components/shared/cards/card-face';
import CardBreak from '../../components/shared/cards/card-break';
import GameName from '../../components/shared/game-name/game-name';
import KickPopup from '../../components/scrum/kick-popup/KickPopup';
import Member from '../../components/shared/member/member';
import ScrumMasterMember from '../../components/shared/scrum-master/scrum-master-member';
import { useAppSelector } from '../../redux/hooks';
import { gameState } from '../../redux/reducers/game-reducer';
import { membersState } from '../../redux/reducers/members-reducer';
import './game.scss';
import { IssueStatus } from '../../redux/reducers/issues-reducer';
import { sendToServer, socket } from '../../socket/socket-context';
import NewIssue from '../../components/scrum/new-issue/new-issue';
import Chat from '../../components/shared/chat/chat';

let timerId: NodeJS.Timeout;
let nextIssueId: string | number;
let votesQuantity: number;

function Game(): JSX.Element {
  const history = useHistory();
  const { members } = useAppSelector(membersState);
  const { minutes, seconds } = useAppSelector(gameState).currentTimer;
  const { roundStatus, currentIssue, nextIssue, votes, averageValues } =
    useAppSelector(gameState);
  const { cardValuesFinalSet, scoreTypeShort, cardCover } = useAppSelector(
    (store) => store.gameSettings
  );
  const { issues } = useAppSelector((store) => store.issues);
  const { isAdmin, role, id } = useAppSelector((store) => store.authPopup.user);
  const { gameID } = useParams<{ gameID: string }>();
  const thisMemberId = id;
  nextIssueId = nextIssue.id;
  votesQuantity = votes.length;

  useEffect(() => {
    socket.on('GAME_STOPPED', () => {
      history.push(`/result/${gameID}`);
    });
  }, [gameID, history]);

  const stopRound = () => {
    sendToServer('set_issue_status', {
      gameID,
      id: currentIssue.id,
      status: 'resolved',
    });
    sendToServer('set_current_issue', {
      gameID,
      currentIssue: { ...currentIssue, status: 'resolved' },
    });
    if (nextIssueId !== '') {
      sendToServer('set_issue_status', {
        gameID,
        id: nextIssueId,
        status: 'current',
      });
      const newCurrentIssue = issues.find((issue) => issue.id === nextIssueId);
      sendToServer('set_next_issue', {
        gameID,
        nextIssue: { ...newCurrentIssue, status: 'current' },
      });
    }
    clearInterval(timerId);
    // sendToServer('set_average_values', { gameID });
    // sendToServer('add_round_in_statistics', { gameID });
    sendToServer('finish_round', { gameID });
  };

  const startRound = (): void => {
    if (roundStatus === 'awaiting' && currentIssue.id !== '') {
      sendToServer('start_round', { gameID });
      sendToServer('set_all_vote_results', {
        gameID,
        voteResult: 'In progress',
      });
      let min = minutes;
      let sec = seconds;

      timerId = setInterval(() => {
        const totalTime = min * 60 + sec;
        if (totalTime === 0 || votesQuantity === members.length) {
          stopRound();
        } else {
          const decreasedTotalTime = totalTime - 1;
          sec = decreasedTotalTime % 60;
          min = (decreasedTotalTime - sec) / 60;
          sendToServer('set_current_timer', {
            gameID,
            currentTimer: { minutes: min, seconds: sec },
          });
        }
      }, 1000);
    }
  };

  const stopGame = (): void => {
    if (roundStatus === 'awaiting') {
      sendToServer('stop_game', { gameID });
    } else {
      stopRound();
      sendToServer('stop_game', { gameID });
    }
  };

  const nextIssueClickHandler = (): void => {
    if (roundStatus === 'awaiting') {
      const currentIssueIndex = issues.findIndex(
        (issue) => issue.status === 'current'
      );
      const newCurrentIssue =
        currentIssueIndex === -1 || currentIssueIndex === issues.length - 1
          ? issues.find((issue) => issue.status === 'awaiting')
          : issues.find(
              (issue, index) =>
                issue.status === 'awaiting' && index > currentIssueIndex
            );
      if (newCurrentIssue) {
        sendToServer('set_issue_status', {
          gameID,
          id: newCurrentIssue.id,
          status: 'current',
        });
        sendToServer('set_current_issue', {
          gameID,
          currentIssue: { ...newCurrentIssue, status: 'current' },
        });
      }
    } else {
      const nextIssueIndex = issues.findIndex(
        (issue) => issue.status === 'next'
      );
      const newNextIssue =
        nextIssueIndex === -1 || nextIssueIndex === issues.length - 1
          ? issues.find((issue) => issue.status === 'awaiting')
          : issues.find(
              (issue, index) =>
                issue.status === 'awaiting' && index > nextIssueIndex
            );
      if (newNextIssue) {
        sendToServer('set_issue_status', {
          gameID,
          id: newNextIssue.id,
          status: 'next',
        });
        sendToServer('set_next_issue', {
          gameID,
          nextIssue: { ...newNextIssue, status: 'next' },
        });
      }
    }
  };

  const cardClickHandler = (cardValue: string): void => {
    if (roundStatus === 'in progress') {
      sendToServer('add_vote', {
        gameID,
        memberId: thisMemberId,
        value: cardValue,
      });
      sendToServer('set_vote_result', {
        gameID,
        memberId: thisMemberId,
        voteResult: `${cardValue} ${scoreTypeShort}`,
      });
    }
  };

  const issueClickHandler = (
    issueId: number | string,
    status: IssueStatus
  ): void => {
    if (
      roundStatus === 'awaiting' &&
      status !== 'current' &&
      status !== 'resolved' &&
      isAdmin
    ) {
      sendToServer('set_issue_status', {
        gameID,
        id: issueId,
        status: 'current',
      });
      const newCurrentIssue = issues.find((issue) => issue.id === issueId);
      sendToServer('set_current_issue', {
        gameID,
        currentIssue: { ...newCurrentIssue, status: 'current' },
      });
    }
    if (
      roundStatus === 'in progress' &&
      status !== 'current' &&
      status !== 'resolved' &&
      isAdmin
    ) {
      sendToServer('set_issue_status', { gameID, id: issueId, status: 'next' });
      const newNextIssue = issues.find((issue) => issue.id === issueId);
      sendToServer('set_next_issue', {
        gameID,
        nextIssue: { ...newNextIssue, status: 'next' },
      });
    }
  };

  return (
    <div className="game">
      <GameName />
      {/* <div className="game__room">Room #{gameID}</div> */}
      <Container>
        <Row>
          <Col xl={7}>
            <Container>
              <Row>
                <Col>
                  <ScrumMasterMember />
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
                    <Button
                      variant="success"
                      className="m-1"
                      onClick={() => startRound()}
                    >
                      Start round
                    </Button>
                    <Button
                      variant="primary"
                      className="m-1"
                      onClick={() => nextIssueClickHandler()}
                    >
                      Next issue
                    </Button>
                    <Button
                      variant="danger"
                      className="m-1"
                      onClick={() => stopGame()}
                    >
                      Stop game
                    </Button>
                  </Col>
                )}
              </Row>
              <Row>
                <Col>
                  <h3>Issues</h3>
                  <ToastContainer>
                    {issues.map((item) => (
                      <Toast
                        bg={
                          (item.status === 'current' && 'success') ||
                          (item.status === 'resolved' && 'danger') ||
                          undefined
                        }
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => issueClickHandler(item.id, item.status)}
                        onKeyPress={() =>
                          issueClickHandler(item.id, item.status)
                        }
                      >
                        <Toast.Header closeButton={false}>
                          <strong className="me-auto">{item.title}</strong>
                          <small className="text-muted">{item.status}</small>
                        </Toast.Header>
                        <Toast.Body
                          className={`d-flex flex-column ${
                            item.status !== 'awaiting' && 'text-white'
                          }`}
                        >
                          <span>
                            Link:{' '}
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              className={
                                (item.status !== 'awaiting' && 'text-light') ||
                                'text-primary'
                              }
                            >
                              {item.link.substr(0, 40)}
                              {item.link.length > 40 && '...'}
                            </a>
                          </span>
                          <small
                            className={`align-self-end ${
                              item.status !== 'awaiting' && 'text-white-50'
                            }`}
                          >
                            {item.priority}
                          </small>
                        </Toast.Body>
                      </Toast>
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
          <Col xl={5}>
            <Container>
              <Chat />
              <h2>Players:</h2>
              {members.map((member) => (
                <Row key={member.id}>
                  <Col>
                    <Member
                      id={member.id}
                      firstName={member.firstName}
                      lastName={member.lastName}
                      jobPosition={member.jobPosition}
                      isAdmin={member.isAdmin}
                      avatar={member.avatar}
                    />
                  </Col>
                  {isAdmin && <Col>{member.voteResult}</Col>}
                  {!isAdmin && roundStatus === 'awaiting' && (
                    <Col>{member.voteResult}</Col>
                  )}
                  {!isAdmin && roundStatus === 'in progress' && (
                    <Col>In progress</Col>
                  )}
                </Row>
              ))}
            </Container>
          </Col>
        </Row>
        <Row>
          {role === 'player' &&
            cardValuesFinalSet.map((cardValue) => (
              <Col key={cardValue}>
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
      </Container>
      <KickPopup />
    </div>
  );
}

export default Game;
