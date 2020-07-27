import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";

function App() {
  const [charmModifier, setCharmModifier] = useState(false);
  const [masudaModifier, setMasudaModifier] = useState(false);

  const [content, setContent] = useState(null);
  const [countDisplay, setCountDisplay] = useState(null);

  var rollForShiny = function (e) {
    e.preventDefault();

    const SHINY_ROLL = 1; //number required to roll to get a shiny
    const DICE_SIDES = 4096;

    let rollsPerEncounter = 1;

    if (charmModifier) {
      rollsPerEncounter += 2;
    }

    if (masudaModifier) {
      rollsPerEncounter += 5;
    }

    let isShiny = false;

    let encounters = [];
    let count = 0;
    do {
      let rolls = [];
      for (let i = 0; i < rollsPerEncounter; i++) {
        rolls[i] = Math.floor(Math.random() * (DICE_SIDES - 1) + 1);
        if (rolls[i] === SHINY_ROLL) {
          isShiny = true;
        }
        console.log(rolls[i]);
      }
      encounters[count++] = rolls;
    } while (!isShiny);

    setCountDisplay(<div>Finding a shiny took {count} encounters</div>);

    setContent(
      <ListGroup>
        {encounters.map((encounter) => (
          <ListGroup.Item>
            |
            {encounter.map((roll) => (
              <span>&nbsp;{roll} |</span>
            ))}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  return (
    <div className="">
      <Container>
        <Row>
          <Col md={12} lg={6}>

            <Form onSubmit={(e) => rollForShiny(e)} className="border m-3 p-3">
            <div>
              <p>
                In order to get a shiny pokémon is sword and shield, a 4,096
                sided dice is rolled, if it rolls a 1, the pokémon will be
                shiny.
              </p>
              <p>
                There are two main modifiers that can be used to increase the
                amount of dice rolls per encounter
              </p>
              <p>
                The Shiny Charm is obtained by completing the pokédex. Having it
                in your inventory will add 2 shiny rolls for each encounter
                (This does not affect pokémon revived from fossils in Sword and
                Shield).
              </p>
              <p>
                The <span className="font-italic">Masuda Method</span> is done
                by breeding a pokémon with another pokémon belonging to a
                trainer from a different country. This adds 5 rolls.
              </p>

              <p>
                Using both modifiers, the chance goes from 1 in 4096 to 1 in 512
              </p>
            </div>

              <Form.Group controlId="formCatchMethod">
                <Form.Label>Shiny Chance Modifiers</Form.Label>
                <Form.Check
                  type="checkbox"
                  id="shiny-charm"
                  label="Shiny Charm"
                  onClick={() => setCharmModifier(!charmModifier)}
                />

                <Form.Check
                  type="checkbox"
                  id="masuda-method"
                  label="Masuda Method"
                  onClick={() => setMasudaModifier(!masudaModifier)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={12} lg={6}>
            <div
              className="border m-3 p-3 overflow-auto"
              style={{ maxHeight: "500px" }}
            >
              {countDisplay}
              {content}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
