import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CardFace from '../../components/shared/cards/card-face';
import GameName from '../../components/shared/game-name/game-name';
import IssueGame from '../../components/shared/issue-game/issue-game';
import KickPopup from '../../components/scrum/kick-popup/KickPopup';
import Member from '../../components/shared/member/member';
import ScrumMasterMember from '../../components/shared/scrum-master/scrum-master-member';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addVoteAction, finishRoundAction, gameState, setCurrentIssueAction, setCurrentTimer, setNextIssueAction, startRoundAction, setAvaregeValuesAction, addRoundInStatisticsAction } from '../../redux/reducers/game-reducer';
import { membersState, setAllVoteResultsAction, setVoteResultAction } from '../../redux/reducers/members-reducer';
import './game.scss';
import { IssueStatus, setIssueStatusAction } from '../../redux/reducers/issues-reducer';

let timerId: NodeJS.Timeout;

function Game(): JSX.Element {
  const dispatch = useAppDispatch();
  const { members } = useAppSelector(membersState);
  const { minutes, seconds } = useAppSelector(gameState).currentTimer;
  const { roundStatus, currentIssue, nextIssue, votes, averageValues } = useAppSelector(gameState);
  const { cardValuesFinalSet, scoreTypeShort } = useAppSelector((store) => store.gameSettings)
  const { issues } = useAppSelector((store) => store.issues);
  const thisMemberId = 1;
  
  const stopRound = () => {
    dispatch(setIssueStatusAction({ id: currentIssue.id, status: "resolved"}));
    if (nextIssue.id !== "") {
      dispatch(setIssueStatusAction({ id: nextIssue.id, status: "current"}))
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
        if (totalTime === 0 || votes.length === members.length) {
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

  const cardClickHandler = (cardValue: string): void => {
    if (roundStatus === "in progress") {
      dispatch(addVoteAction({ memberId: thisMemberId, value: cardValue }));
      dispatch(setVoteResultAction({ memberId: thisMemberId, voteResult: `${cardValue} ${scoreTypeShort}` }));
    }
  };

  const issueClickHandler = (issueId: number | string, status: IssueStatus): void => {
    if (roundStatus === "awaiting" && status !== "current" && status !== "resolved") {
      const newCurrentIssue = issues.find((issue) => issue.id === issueId);
      dispatch(setCurrentIssueAction(newCurrentIssue));
      dispatch(setIssueStatusAction({ id: issueId, status: "current"}));
    } if (roundStatus === "in progress" && status !== "current" && status !== "resolved") {
      const newNextIssue = issues.find((issue) => issue.id === issueId);
      dispatch(setNextIssueAction(newNextIssue));
      if (newNextIssue) {
        dispatch(setIssueStatusAction({ id: issueId, status: "next"}))
      }
    }
  };

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
                  <div className="game__timer">
                      <div className="game__timer-minutes">{minutes}</div>
                      <div className="game__timer-dividor">:</div>
                      <div className="game__timer-minutes">{seconds>9 ? seconds : `0${seconds}`}</div>
                  </div>
                  <Button variant="success" className="m-1" onClick={() => startRound()}>
                    Start round
                  </Button>
                </Col>
                <Col>
                  <Button variant="danger" className="m-1" onClick={() => stopRound()}>
                    Stop game
                  </Button>
                  <Button variant="primary" className="m-1" onClick={() => startRound()}>
                    Next issue
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3>Issues</h3>
                  {issues.map((item) => (
                    <div
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
                  ))}
                </Col>
                <Col>
                  <h3>Statistics</h3>
                  <Row>
                    {averageValues.map((item) => (
                      <Col key={item.value}>
                        <CardFace value={item.value} type={scoreTypeShort} />
                        {item.percents} %
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
              {members.map((member) => (
                <Row key={member.id}>
                  <Col>
                    <Member
                      id={member.id}
                      firstName={member.firstName}
                      lastName={member.lastName}
                      jobPosition={member.jobPosition}
                    />
                  </Col>
                  <Col>{member.voteResult}</Col>
                </Row>
              ))}
            </Container>
          </Col>
        </Row>
        <Row>
          {cardValuesFinalSet.map((cardValue) => (
            <Col key={cardValue}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => cardClickHandler(cardValue)}
                onKeyPress={() => cardClickHandler(cardValue)}
              >
                <CardFace value={cardValue} type={scoreTypeShort} />
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
