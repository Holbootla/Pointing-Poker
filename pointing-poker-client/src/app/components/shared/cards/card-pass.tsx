import './cards.scss'

function CardPass(): JSX.Element {

  return (
    <div className="card-face card-data-block ">
      <div className="card-front-up">Pass</div>
      <div className="card-front-center card-value-name-pass">PASS</div>
      <div className="card-front-down">Pass</div>
    </div>
 );
}

export default CardPass;