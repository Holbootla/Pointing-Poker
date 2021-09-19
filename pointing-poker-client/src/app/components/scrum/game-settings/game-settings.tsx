import { ChangeEvent, SyntheticEvent } from 'react';
import { Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  cleanCardsSelectedAction,
  showAddCardValuePopupAction,
} from '../../../redux/reducers/add-card-reducer';
import {
  Cover,
  savePrevCardCoverAction,
  setSelectedCardCoverAction,
  showCustomCoverPopupAction,
} from '../../../redux/reducers/custom-cover-reducer';
import {
  cardChangeAction,
  saveCardCoverAction,
  scoreTypeAction,
  scoreTypeShortAction,
  setCardValuesFinalSetAction,
  timerMinutesAction,
  timerOnAction,
  timerSecondsAction,
} from '../../../redux/reducers/game-settings-reducer';
import CardBreak from '../../shared/cards/card-break';
import CardFace from '../../shared/cards/card-face';

import './game-settings.scss';

function GameSettings(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    cardChange,
    timerOn,
    scoreType,
    scoreTypeShort,
    timerMinutes,
    timerSeconds,
    cardCover,
    isDefaultSettings,
  } = useAppSelector((state) => state.gameSettings);

  const cardCovers = useAppSelector((state) => state.customCover.covers);
  const { selectedCoverId } = useAppSelector((state) => state.customCover);
  const { cardsSelected, cardValues } = useAppSelector(
    (state) => state.addCardValues
  );

  const cardChangeCheckboxHandler = () => {
    dispatch(cardChangeAction());
  };

  const timerOnCheckboxHandler = () => {
    dispatch(timerOnAction());
  };

  function findCardValues(type: string): string[] | null {
    const cardsValues = cardValues.find((card) => card.name === type);
    if (cardsValues) return cardsValues?.values;
    return null;
  }

  const handelScopeType = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(scoreTypeAction(event.target.value));
    dispatch(cleanCardsSelectedAction());
    const values = findCardValues(event.target.value);
    if (!(values === null)) dispatch(setCardValuesFinalSetAction(values));
  };

  const handelShortType = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(scoreTypeShortAction(event.target.value));
    dispatch(cleanCardsSelectedAction());
    const values = findCardValues(event.target.value);
    if (!(values === null)) dispatch(setCardValuesFinalSetAction(values));
  };
  const handelMinutes = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(timerMinutesAction(event.target.value));
  };
  const handelSeconds = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(timerSecondsAction(event.target.value));
  };
  const setCardCover = (
    event: SyntheticEvent<HTMLDivElement>,
    { cover, id }: Cover
  ) => {
    dispatch(saveCardCoverAction(cover));
    dispatch(setSelectedCardCoverAction(id));
  };
  const showCustomCardCover = () => {
    dispatch(showCustomCoverPopupAction());
    dispatch(savePrevCardCoverAction(cardCover));
  };
  const showAddCardValuePopup = () => {
    dispatch(showAddCardValuePopupAction());
  };

  const handelDefaultSettings = () => true;

  return (
    <section className="section-wrap">
      <div className="section-title">game settings:</div>
      <Form>
        <Form.Check
          id="cardChangeCheck"
          type="switch"
          className="settings-label"
          label="Allow players to change their card after reveal"
          checked={cardChange}
          onChange={cardChangeCheckboxHandler}
        />
        <Form.Check
          id="timerCheck"
          type="switch"
          className="settings-label"
          label="Timer is needed"
          checked={timerOn}
          onChange={timerOnCheckboxHandler}
        />
        <div className="select-timer-block">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="scopeType" className="settings-label">
              Scope type:
            </Form.Label>
            <Form.Select
              aria-label="scoreType"
              name="scoreType"
              value={scoreType}
              onChange={handelScopeType}
            >
              <option value="FB">
                Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?, Pass,
                Breack )
              </option>
              <option value="SP">
                Story point ( 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, Pass,
                Breack )
              </option>
              <option value="P2">
                Powers of 2 ( 0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, ?, Pass,
                Breack )
              </option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="settings-label">
              Score type (short):
            </Form.Label>
            <Form.Select
              aria-label="scope-type-short"
              name="scope-type-short"
              value={scoreTypeShort}
              onChange={handelShortType}
            >
              <option value="FB">FB</option>
              <option value="SP">SP</option>
              <option value="P2">P2</option>
            </Form.Select>
          </Form.Group>
          <div className="timer-settings-block">
            <div className="settings-label">Round time: </div>
            <div className="timer-settings">
              <div className="timer">
                <Form.Label className="settings-label timer-label">
                  minutes
                </Form.Label>
                <div className="timer-select">
                  <Form.Select
                    aria-label="timerMinutes"
                    name="timerMinutes"
                    value={timerMinutes}
                    onChange={handelMinutes}
                  >
                    <option value="00">00</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                  </Form.Select>
                </div>
              </div>
              <div className="timer">
                <Form.Label className="settings-label timer-label">
                  seconds
                </Form.Label>
                <div className="timer-select">
                  <Form.Select
                    aria-label="timerSeconds"
                    name="timerSeconds"
                    value={timerSeconds}
                    onChange={handelSeconds}
                  >
                    <option value="00">00</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                  </Form.Select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cards-covers-select-block">
          <Form.Label className="settings-label">
            Select cards cover:
          </Form.Label>
          <div className="cards-cover-container">
            {cardCovers.map((cover) => (
              <div
                className={`${
                  cover.id === selectedCoverId
                    ? 'card-cover card-cover-selected'
                    : 'card-cover'
                }`}
                key={cover.id * Date.now()}
                role="button"
                style={{ backgroundColor: `${cover.cover}` }}
                tabIndex={0}
                onKeyPress={(event) => setCardCover(event, cover)}
                onClick={(event) => setCardCover(event, cover)}
              />
            ))}
            <div
              className="card-cover option-add"
              role="button"
              tabIndex={0}
              onKeyPress={() => showCustomCardCover()}
              onClick={() => showCustomCardCover()}
            />
          </div>
        </div>
        <div className="cards-add-values-block">
          <Form.Label className="settings-label">Add card values:</Form.Label>
          <div className="cards-container" role="button" tabIndex={0}>
            {cardsSelected.map((card) =>
              card === 'Break' ? (
                <CardBreak key={Math.random() * Date.now()} />
              ) : (
                <CardFace
                  value={card}
                  type={scoreType}
                  key={Math.random() * Date.now()}
                />
              )
            )}
            <div
              className="card-cover option-add"
              role="button"
              tabIndex={0}
              onKeyPress={showAddCardValuePopup}
              onClick={showAddCardValuePopup}
            />
          </div>
        </div>
        <Form.Check
          type="checkbox"
          className="settings-label-default"
          label="Make these my default game settings"
          checked={isDefaultSettings}
          onChange={handelDefaultSettings}
        />
      </Form>
    </section>
  );
}

export default GameSettings;
