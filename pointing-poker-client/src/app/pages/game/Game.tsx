import { Button, Col, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import CardFace from '../../components/shared/cards/card-face';
import CardBreak from '../../components/shared/cards/card-break';
import GameName from '../../components/shared/game-name/game-name';
import IssueGame from '../../components/shared/issue-game/issue-game';
import KickPopup from '../../components/scrum/kick-popup/KickPopup';
import Member from '../../components/shared/member/member';
import ScrumMasterMember from '../../components/shared/scrum-master/scrum-master-member';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addVoteAction, finishRoundAction, gameState, setCurrentIssueAction, setCurrentTimer, setNextIssueAction, startRoundAction, setAvaregeValuesAction, addRoundInStatisticsAction, Issue } from '../../redux/reducers/game-reducer';
import { membersState, setAllVoteResultsAction, setVoteResultAction } from '../../redux/reducers/members-reducer';
import './game.scss';
import { IssueStatus, setIssueStatusAction } from '../../redux/reducers/issues-reducer';

let timerId: NodeJS.Timeout;
let nextIssueId: string | number;
let votesQuantity: number;

function Game(): JSX.Element {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { members } = useAppSelector(membersState);
  const { minutes, seconds } = useAppSelector(gameState).currentTimer;
  const { roundStatus, currentIssue, nextIssue, votes, averageValues } = useAppSelector(gameState);
  const { cardValuesFinalSet, scoreTypeShort, cardCover } = useAppSelector((store) => store.gameSettings)
  const { issues } = useAppSelector((store) => store.issues);
  const { isAdmin, role } = useAppSelector((store) => store.authPopup.user)
  const { gameID } = useParams<{ gameID: string }>();
  const thisMemberId = 1;
  nextIssueId = nextIssue.id;
  votesQuantity = votes.length;
  
  const stopRound = () => {
    dispatch(setIssueStatusAction({ id: currentIssue.id, status: "resolved" }));
    dispatch(setCurrentIssueAction({ ...currentIssue, status: "resolved" }));
    if (nextIssueId !== "") {
      dispatch(setIssueStatusAction({ id: nextIssueId, status: "current" }))
      const newCurrentIssue = issues.find((issue) => issue.id === nextIssueId);
      dispatch(setNextIssueAction({ ...newCurrentIssue, status: "current" }));
    }
    clearInterval(timerId);
    dispatch(setAvaregeValuesAction());
    dispatch(addRoundInStatisticsAction());
    dispatch(finishRoundAction());
  };

  const startRound = (): void => {
    if (roundStatus === "awaiting" && currentIssue.id !== "") {
      dispatch(startRoundAction());
      dispatch(setAllVoteResultsAction({ voteResult: "In progress"}));
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
          dispatch(setCurrentTimer({ minutes: min, seconds: sec}));
        }
      }, 1000)
    }
  };

  const stopGame = (): void => {
    if (roundStatus === "awaiting") {
      history.push(`/result/${gameID}`);
    } else {
      stopRound();
      history.push(`/result/${gameID}`);
    }
  };

  const nextIssueClickHandler = (): void => {
    if (roundStatus === "awaiting") {
      const currentIssueIndex = issues.findIndex((issue) => issue.status === "current");
      const newCurrentIssue = (currentIssueIndex === -1 || currentIssueIndex === issues.length - 1)
        ? issues.find((issue) => issue.status === "awaiting")
        : issues.find((issue, index) => issue.status === "awaiting" && index > currentIssueIndex);
      if (newCurrentIssue) {
        dispatch(setIssueStatusAction({ id: newCurrentIssue.id, status: "current" }));
        dispatch(setCurrentIssueAction({ ...newCurrentIssue, status: "current" }));
      }
    } else {
      const nextIssueIndex = issues.findIndex((issue) => issue.status === "next");
      const newNextIssue = (nextIssueIndex === -1 || nextIssueIndex === issues.length - 1)
        ? issues.find((issue) => issue.status === "awaiting")
        : issues.find((issue, index) => issue.status === "awaiting" && index > nextIssueIndex);
      if (newNextIssue) {
        dispatch(setIssueStatusAction({ id: newNextIssue.id, status: "next"}));
        dispatch(setNextIssueAction({ ...newNextIssue, status: "next" }));
      }
    }
  };

  const cardClickHandler = (cardValue: string): void => {
    if (roundStatus === "in progress") {
      dispatch(addVoteAction({ memberId: thisMemberId, value: cardValue }));
      dispatch(setVoteResultAction({ memberId: thisMemberId, voteResult: `${cardValue} ${scoreTypeShort}` }));
    }
  };

  const issueClickHandler = (issueId: number | string, status: IssueStatus): void => {
    if (roundStatus === "awaiting" && status !== "current" && status !== "resolved" && isAdmin) {
      dispatch(setIssueStatusAction({ id: issueId, status: "current" }));
      const newCurrentIssue = issues.find((issue) => issue.id === issueId);
      dispatch(setCurrentIssueAction({ ...newCurrentIssue, status: "current" }));
    } if (roundStatus === "in progress" && status !== "current" && status !== "resolved" && isAdmin) {
      dispatch(setIssueStatusAction({ id: issueId, status: "next" }))
      const newNextIssue = issues.find((issue) => issue.id === issueId);
      dispatch(setNextIssueAction({ ...newNextIssue, status: "next" }));
    }
  };

  return (
    <div className="game">
      <GameName />
      <div className="game__room">Room #{gameID}</div>
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
                      <div className="game__timer-minutes">{seconds>9 ? seconds : `0${seconds}`}</div>
                  </div>
                </Col>
                {(isAdmin && 
                  <Col>
                    <Button variant="success" className="m-1" onClick={() => startRound()}>
                      Start round
                    </Button>
                    <Button variant="primary" className="m-1" onClick={() => nextIssueClickHandler()}>
                      Next issue
                    </Button>
                    <Button variant="danger" className="m-1" onClick={() => stopGame()}>
                      Stop game
                    </Button>
                  </Col>
                )}
              </Row>
              <Row>
                <Col>
                  <h3>Issues</h3>
                  {issues.map((item) => (
                    <div
                      className={`game__issue_${item.status}`}
                      key={item.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => issueClickHandler(item.id, item.status)}
                      onKeyPress={() => issueClickHandler(item.id, item.status)}
                    >
                      <IssueGame
                        id={item.id}
                        link={item.link}
                        title={item.title}
                        priority={item.priority}
                        status={item.status}
                      />
                    </div>
                  ))
                  }
                </Col>
                <Col>
                  <h3>{(roundStatus === "awaiting") ? "Statistics" : "Playground"}</h3>
                  {(roundStatus === "awaiting") 
                    ? <Row>
                      {averageValues.map((item) => (
                        <Col key={item.value}>
                          <CardFace value={item.value} type={scoreTypeShort} />
                          {item.percents} %
                        </Col>
                      ))}
                    </Row>
                    : <Row>
                      {votes.map((vote) => (
                        <Col key={vote.memberId}>
                          <div
                            className="card-cover"
                            style={{ backgroundColor: `${cardCover}` }}
                          />
                        </Col>
                      ))}
                      </Row>
                  }
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xl={5}>
            <Container>
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
                    />
                  </Col>
                  {(isAdmin) &&
                    <Col>{member.voteResult}</Col>
                  }
                  {(!isAdmin && roundStatus === "awaiting") &&
                    <Col>{member.voteResult}</Col>
                  }
                  {(!isAdmin && roundStatus === "in progress") &&
                    <Col>In progress</Col>
                  }
                </Row>
              ))}
            </Container>
          </Col>
        </Row>
        <Row>
          {(role === "player") && cardValuesFinalSet.map((cardValue) => (
            <Col key={cardValue}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => cardClickHandler(cardValue)}
                onKeyPress={() => cardClickHandler(cardValue)}
              >{cardValue === "Break" ? (
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
