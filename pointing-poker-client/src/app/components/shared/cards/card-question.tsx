import './cards.scss'

function CardQuestion(): JSX.Element {
  return (
    <div className="card-face card-data-block ">
      <div className="card-front-up">?</div>
      <div className="card-front-center card-value-question">?</div>
      <div className="card-front-down">?</div>
    </div>
 );
}

export default CardQuestion;