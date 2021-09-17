import { SyntheticEvent, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  closeAddCardValuePopupAction,
  addNewCardValueAction,
  saveCurrCardValueAction,
} from '../../redux/reducers/add-card-reducer';
import { setCardValuesFinalSetAction } from '../../redux/reducers/game-settings-reducer';

function CardValuePopup(): JSX.Element {
  const dispatch = useAppDispatch();

  const { scoreTypeShort, scoreType } = useAppSelector(
    (state) => state.gameSettings
  );
  const { addCardValuePopupVisible, currCardValue, cardValues, cardsSelected } =
    useAppSelector((state) => state.addCardValues);

  useEffect(() => {
    if (cardsSelected.length > 1)
      dispatch(setCardValuesFinalSetAction(cardsSelected));
  }, [cardsSelected]);

  const closeAddCardValuePopup = () => {
    dispatch(closeAddCardValuePopupAction());
    dispatch(saveCurrCardValueAction('0'));
  };

  const handelCardValueSelect = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(saveCurrCardValueAction(value));
  };
  const addCard = () => {
    dispatch(addNewCardValueAction(currCardValue));
    dispatch(saveCurrCardValueAction('0'));
    dispatch(closeAddCardValuePopupAction());
  };

  return (
    <Modal
      show={addCardValuePopupVisible}
      onHide={closeAddCardValuePopup}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Select card value (score type: {scoreType})</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label htmlFor="cardValues">Choose value</Form.Label>
        <Form.Select
          aria-label="cardValues"
          name="cardValues"
          value={currCardValue}
          onChange={handelCardValueSelect}
        >
          {cardValues.map((card) =>
            card.name === scoreTypeShort
              ? card.values.map((value) => (
                  <option value={value} key={Math.random() * Date.now()}>
                    {value}
                  </option>
                ))
              : null
          )}
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="button" onClick={addCard}>
          Add card
        </Button>
        <Button variant="secondary" onClick={closeAddCardValuePopup}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CardValuePopup;
