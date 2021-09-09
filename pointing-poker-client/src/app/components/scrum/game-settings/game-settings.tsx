import { Form } from "react-bootstrap";
import CardBreak from "../../shared/cards/card-break";
import CardFace from "../../shared/cards/card-face";
import CardPass from "../../shared/cards/card-pass";
import CardQuestion from "../../shared/cards/card-question";
import './game-settings.scss'

function GameSettings (): JSX.Element {

  const handelShortType = () => true;
  const handelScopeType = () => true;
  const handelMinutes = () => true;
  const handelSeconds = () => true;
  const handelDefaultSettings = () => true;

  return (
    <section className="section-wrap">      
      <div className="section-title">game settings:</div>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupSet">
          <Form.Check
            className="settings-label"
            type="switch"
            label="Scrum master as player"
          />
          <Form.Check
            className="settings-label" 
            type="switch"
            label="Changing card in round end"
          />
          <Form.Check
            className="settings-label" 
            label="Auto-flip cards after everyone has voted"
            type="switch"
          />
          <Form.Check 
            className="settings-label"
            type="switch"
            label="Allow players to change their vote after reveal"
          />
          <Form.Check 
            className="settings-label"
            type="switch"
            label="Timer is needed"
          />
        </Form.Group>
        <div className="select-timer-block">
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="settings-label">Scope type:</Form.Label>
          <Form.Select aria-label="Scope type" 
            name="scopeType"
            value=""
            onChange={handelScopeType}>
              <option>Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?, Pass )</option>
              <option>Story point ( 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, Pass )</option>
              <option>Powers of 2 ( 0, 1, 2, 4, 8, 16, 32, 64, ?, Pass )</option>
          </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="settings-label">Scope type(Short):</Form.Label>
          <Form.Select aria-label="Scope type(Short)" 
            name="scopeType"
            value=""
            onChange={handelShortType}>
              <option>FB</option>
              <option>SP</option>
              <option>P2</option>
          </Form.Select>
          </Form.Group>
          <div className="timer-settings-block">
            <Form.Label className="settings-label">Round time: </Form.Label>
            <div className="timer-settings">
              <div className="timer">
                <Form.Label className="settings-label timer-label">minutes</Form.Label>
                <div className="timer-select">
                  <Form.Select 
                  name="scopeType"
                  value=""
                  onChange={handelMinutes}>
                    <option>00 :</option>
                    <option>01 :</option>
                    <option>02 :</option>
                    <option>03 :</option>
                    <option>04 :</option>
                    <option>05 :</option>
                  </Form.Select>
                </div>
              </div>
              <div className="timer">
                <Form.Label className="settings-label timer-label">seconds</Form.Label>
                <div className="timer-select">
                  <Form.Select
                  name="scopeType"
                  value=""
                  onChange={handelSeconds}>
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </Form.Select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cards-covers-select-block">
          <p className="settings-label">Select cards cover:</p>
          <div className="cards-cover-container">
            <div className="card-cover option-one" />
            <div className="card-cover option-two card-cover-selected">selected</div>
            <div className="card-cover option-three" />
            <div className="card-cover option-add" />
          </div>
        </div>
        <div className="cards-add-values-block">
          <p className="settings-label">Add card values:</p>
          <div className="cards-container">
            <CardBreak />
            <CardQuestion />
            <CardPass />
            <CardFace />
            <div className="card-cover option-add" />
          </div>
        </div>
        <Form.Check
          type="checkbox" 
          className="settings-label-default"  
          label="Make these my default game settings" 
          checked
          onChange={handelDefaultSettings}
          />
      </Form> 
   </section>
  );
}

export default GameSettings;