import "./App.css";
import carsData from "./Components/data";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

let initialComeUp = { opacity: 0, scale: 0.5 };
let initialGoDown = { opacity: 1, scale: 1 };
let animateComeup = { opacity: 1, scale: 1 };
let animateGoDown = { opacity: 0, scale: 0.5 };
let transitionComeUp = {
  duration: 0.8,
  ease: [0, 0.71, 0.2, 1.01],
};
let transitionGoDown = {
  duration: 0.2,
  ease: [0, 0.71, 0.2, 1.01],
};

function App() {
  let [carsArray, setCarsArray] = useState(carsData);
  let [carsFetched, setCarsFetched] = useState(false);
  let [again, setAgain] = useState(false);

  useEffect(
    function () {
      let tempImagePathArray = [];

      async function fetch() {
        for (let i = 0; i < carsArray.length; i++) {
          let importedImagePath = await import(
            `./assets/${carsArray[i].image}.png`
          );
          let importedImagePathWithCircle = await import(
            `./assets/${carsArray[i].image}WithCircle.png`
          );
          tempImagePathArray.push(importedImagePath.default);
        }

        setCarsArray((prevValue) => {
          let tempArray = JSON.parse(JSON.stringify(prevValue));
          for (let i = 0; i < tempArray.length; i++) {
            tempArray[i] = {
              ...tempArray[i],
              imagePath: tempImagePathArray[i],
            };
          }
          return tempArray;
        });

        setCarsFetched((prevValue) => true);
      }

      fetch();
    },
    [carsData]
  );

  function onClickForwardButton() {
    setCarsArray((prevValue) => {
      let tempArray = JSON.parse(JSON.stringify(carsArray));
      for (let i = 0; i < tempArray.length - 1; i++) {
        let temp = tempArray[i];
        tempArray[i] = tempArray[i + 1];
        tempArray[i + 1] = temp;
      }
      return tempArray;
    });
    setAgain((prevValue) => !prevValue);
  }

  function onClickBackwardButton() {
    setCarsArray((prevValue) => {
      let tempArray = JSON.parse(JSON.stringify(carsArray));
      for (let i = tempArray.length - 1; i > 0; i--) {
        let temp = tempArray[i];
        tempArray[i] = tempArray[i - 1];
        tempArray[i - 1] = temp;
      }
      return tempArray;
    });
    setAgain((prevValue) => !prevValue);
  }

  useEffect(
    function () {
      let id = null;
      if (again) {
        id = setTimeout(() => setAgain((prevValue) => !prevValue), 300);
      }

      return () => clearTimeout(id);
    },
    [again]
  );

  return (
    <>
      <header>
        <div className="logo">
          <a href="#">
            V <span>c</span>{" "}
          </a>
        </div>
        <nav className="nav-bar">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Events</li>
          </ul>
        </nav>
      </header>

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
                src={
                  carsArray[1].imagePath.substr(
                    0,
                    carsArray[1].imagePath.length - 4
                  ) + "WithCircle.png"
                }
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
              <svg
                width="27"
                height="24"
                viewBox="0 0 27 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25 13.5C25.8284 13.5 26.5 12.8284 26.5 12C26.5 11.1716 25.8284 10.5 25 10.5V13.5ZM0.939339 10.9393C0.353552 11.5251 0.353552 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807612 11.0711 0.807612 10.4853 1.3934L0.939339 10.9393ZM25 10.5L2 10.5V13.5L25 13.5V10.5Z"
                  fill="#FCF9EF"
                />
              </svg>
            </motion.button>

            <button className="forward-button" onClick={onClickForwardButton}>
              <svg
                width="27"
                height="24"
                viewBox="0 0 27 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5L2 10.5ZM26.0607 13.0607C26.6464 12.4749 26.6464 11.5251 26.0607 10.9393L16.5147 1.3934C15.9289 0.807612 14.9792 0.807612 14.3934 1.3934C13.8076 1.97918 13.8076 2.92893 14.3934 3.51472L22.8787 12L14.3934 20.4853C13.8076 21.0711 13.8076 22.0208 14.3934 22.6066C14.9792 23.1924 15.9289 23.1924 16.5147 22.6066L26.0607 13.0607ZM2 13.5L25 13.5V10.5L2 10.5L2 13.5Z"
                  fill="#FCF9EF"
                />
              </svg>
            </button>
          </div>
        </main>
      )}

      <footer>
        <p className="carName">
          {carsArray[1].year}, {carsArray[1].name}
        </p>
        <p className="price">
          Current Bid : <span>{carsArray[1].price}</span>
        </p>
        <p className="bid">BID</p>
      </footer>
    </>
  );
}

export default App;
