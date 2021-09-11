import CardFace from "../../components/shared/cards/card-face";
import GameName from "../../components/shared/game-name/game-name";
import IssueGame from "../../components/shared/issue-game/issue-game";
import "./result.scss";

const Result = () : JSX.Element => {
  const issues = [
    { title: "issue111", priority: "Low", cards: [{ value: 1, votes: 42.8 }, { value: 2, votes: 28.5 }, { value: 3, votes: 28.5 }]},
    { title: "issue123", priority: "Low", cards: [{ value: 1, votes: 42.8 }, { value: 2, votes: 28.5 }, { value: 3, votes: 28.5 }]},
    { title: "issue324", priority: "Low", cards: [{ value: 1, votes: 42.8 }, { value: 2, votes: 28.5 }, { value: 3, votes: 28.5 }]},
  ];

  return (
  <div className="container">
    <GameName />
    <div className="result">
      {issues.map((issue) => (
          <div key={issue.title}>
            <div className="result__issue">
              <IssueGame />
            </div>
            <div className="result__cards">
              {issue.cards.map((card) => 
                <div className="result__card" key={card.value}>
                  <CardFace />
                  <div className="result__votes">{card.votes}%</div>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  </div>
  );
};

export default Result;
