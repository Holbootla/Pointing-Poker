import { Button, Table } from 'react-bootstrap';
import XLSX from 'xlsx';
import CardFace from '../../components/shared/cards/card-face';
import GameName from '../../components/shared/game-name/game-name';
import IssueGame from '../../components/shared/issue-game/issue-game';
import { useAppSelector } from '../../redux/hooks';
import { gameState } from '../../redux/reducers/game-reducer';
import './result.scss';

const Result = (): JSX.Element => {
  const { statistics } = useAppSelector(gameState);
  const { scoreTypeShort } = useAppSelector((store) => store.gameSettings);
  const { gameID } = useAppSelector((state) => state.authPopup);

  const downloadResults = () => {
    const table = document.getElementById('resultTable');
    const workBook = XLSX.utils.table_to_book(table);
    return XLSX.writeFile(workBook, `results-${gameID}.xlsx`);
  };

  return (
    <div className="container">
      <GameName />
      <div className="result">
        {statistics.map((round) => (
          <div key={round.issue.id}>
            <div className="result__issue">
              <IssueGame
                id={round.issue.id}
                title={round.issue.title}
                link={round.issue.link}
                priority={round.issue.priority}
                status={round.issue.status}
              />
            </div>
            <div className="result__cards">
              {round.averageValues.map((averageValue) => (
                <div className="result__card" key={averageValue.value}>
                  <CardFace value={averageValue.value} type={scoreTypeShort} />
                  <div className="result__votes">{averageValue.percents}%</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button variant="primary" className="mt-5" onClick={downloadResults}>
        Download results
      </Button>
      <Table className="invisible" id="resultTable">
        <thead>
          <tr>
            <th>ISSUE LINK</th>
            <th>SCORE</th>
            <th>TYPE OF SCORE</th>
          </tr>
        </thead>
        <tbody>
          {statistics.map((round) => (
            <tr key={round.issue.id}>
              <td>{round.issue.title}</td>
              <td>{round.issue.link}</td>
              <td>HERE IS THE FINAL SCORE OF ISSUE</td>
              <td>{scoreTypeShort}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Result;
