import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Link,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import {
  Header,
  Paragraph,
  SubHeader,
} from "../../components/common/textComps";
import styles from "./styles";
import config from "./config.txt";

const steps = [
  {
    title: "Install and run Anki app on your computer",
    content: (
      <Paragraph>
        Download an <Link href="https://apps.ankiweb.net/">Anki app</Link> and
        run it.
      </Paragraph>
    ),
  },
  {
    title: "Install AnkiConnect addon",
    content: (
      <Paragraph>
        Go to the official{" "}
        <Link href="https://ankiweb.net/shared/info/2055492159">
          AnkiConnect
        </Link>{" "}
        page and install the addon according to the instructions.
      </Paragraph>
    ),
  },
  {
    title: "Set up addon config",
    content: (
      <>
        <Paragraph>
          Go to the previously installed Anki app, next up click <b>Tools</b> on
          the toolbar, then <b>Add-ons</b>. Highlight the <b>AnkiConnect</b>{" "}
          addon on the left side of the window. Click <b>config</b> and replace
          the existing config with the code attached below.
        </Paragraph>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          src={config}
        ></iframe>
        <Paragraph>
          t is necessary to completely close the Anki app after saving the
          config for the local server to restart.
        </Paragraph>
      </>
    ),
  },
  {
    title: "Test if the connection was established",
    content: (
      <Paragraph>
        Go to the <Link href="/decks">decks viewer</Link> and test if the
        installation was successful.
      </Paragraph>
    ),
  },
  {
    title: "(Optional) Turn off adblock and trackers",
    content: (
      <Paragraph>
        For some web browsers, for example Brave, tracker blockers will prevent
        the Anki app to connect. Therefore it is necessary to turn off tracker
        blockers or/and ad blockers.{" "}
        <b>
          This app is not collecting any data about the users nor have any
          tracking algorithms running in the background.
        </b>
      </Paragraph>
    ),
  },
];

export default function HowToConnect(props) {
  const [activeStep, setActiveStep] = useState(0);
  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePreviousStep = () => {
    setActiveStep(activeStep - 1);
  };
  const handleRestart = () => {
    setActiveStep(0);
  };
  return (
    <Container sx={styles.container}>
      <Box sx={styles.header}>
        <Header>Connect Anki app</Header>
      </Box>
      <Box>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.title}>
              <StepLabel>
                <SubHeader>{step.title}</SubHeader>
              </StepLabel>
              <StepContent>
                <Box>
                  {step.content}
                  {step.gif ?? null}
                </Box>
                <Box sx={styles.buttons}>
                  <Button variant="contained" onClick={handleNextStep}>
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button onClick={handlePreviousStep} disabled={index === 0}>
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Card>
            <CardContent>
              <SubHeader>Still not working?</SubHeader>
              <Paragraph>
                Review the installation process by following it once more.
              </Paragraph>
            </CardContent>
            <CardActions>
              <Button onClick={handleRestart} variant="contained">
                Restart
              </Button>
            </CardActions>
          </Card>
        ) : null}
      </Box>
    </Container>
  );
}
