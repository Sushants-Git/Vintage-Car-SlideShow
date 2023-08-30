import { motion } from "framer-motion";
import forwardButtonSvg from "./svg/forwardButtonSvg";
import backwardbuttonSvg from "./svg/backwardbuttonSvg";

let initialComeUp = { opacity: 0, scale: 0.5 };
let initialGoDown = { opacity: 1, scale: 1 };
let animateComeup = { opacity: 1, scale: 1 };
let animateGoDown = { opacity: 0, scale: 0.5 };
let transitionComeUp = {
  duration: 0.5,
  ease: [0, 0.71, 0.2, 1.01],
};
let transitionGoDown = {
  duration: 0.2,
  ease: [0, 0.71, 0.2, 1.01],
};

export default function CarsSlideShow({
  carsArray,
  carsArrayWithCircle,
  carsFetched,
  onClickBackwardButton,
  onClickForwardButton,
  again,
}) {
  return (
    <>
      {carsFetched && (
        <main>
          <div className="cars-slider">
            <motion.div
              initial={again ? initialGoDown : initialComeUp}
              animate={again ? animateGoDown : animateComeup}
              transition={again ? transitionGoDown : transitionComeUp}
              className="left-car image-wrapper"
            >
              <img
                className="car-image"
                src={carsArray[0].imagePath}
                alt={carsArray[0].name}
              />
            </motion.div>

            <motion.div
              initial={again ? initialGoDown : initialComeUp}
              animate={again ? animateGoDown : animateComeup}
              transition={again ? transitionGoDown : transitionComeUp}
              className="central-car image-wrapper"
            >
              <img
                className="car-image"
                src={carsArrayWithCircle[1].imagePath}
                alt={carsArray[1].name}
              />
            </motion.div>

            <motion.div
              initial={again ? initialGoDown : initialComeUp}
              animate={again ? animateGoDown : animateComeup}
              transition={again ? transitionGoDown : transitionComeUp}
              className="right-car image-wrapper"
            >
              <img
                className="car-image"
                src={carsArray[2].imagePath}
                alt={carsArray[2].name}
              />
            </motion.div>

            <motion.button
              className="backward-button"
              onClick={onClickBackwardButton}
            >
              {backwardbuttonSvg}
            </motion.button>

            <button className="forward-button" onClick={onClickForwardButton}>
              {forwardButtonSvg}
            </button>
          </div>
        </main>
      )}
    </>
  );
}
