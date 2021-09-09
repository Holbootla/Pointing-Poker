import './cards.scss'

function CardFace(): JSX.Element {
  return (
    <div className="card-face card-data-block ">
      <div className="card-front-up">1</div>
      <div className="card-front-center card-value-name">SP</div>
      <div className="card-front-down">1</div>
    </div>
 );
}

export default CardFace;