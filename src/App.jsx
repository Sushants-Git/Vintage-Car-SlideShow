import "./App.css";
import carsData from "./Components/data";
import { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Header/Footer";
import CarsSlideShow from "./Components/Header/CarsSlideShow";

import Image1 from "./assetsNew/FirstCarWithCircle.webp";
import Image2 from "./assetsNew/SecondCarWithCircle.webp";
import Image3 from "./assetsNew/ThirdCarWithCircle.webp";
import Image4 from "./assetsNew/FourthCarWithCircle.webp";
import Image5 from "./assetsNew/FifthCarWithCircle.webp";
import Image6 from "./assetsNew/SixthCarWithCircle.webp";

import Image7 from "./assetsNew/FirstCar.webp";
import Image8 from "./assetsNew/SecondCar.webp";
import Image9 from "./assetsNew/ThirdCar.webp";
import Image10 from "./assetsNew/FourthCar.webp";
import Image11 from "./assetsNew/FifthCar.webp";
import Image12 from "./assetsNew/SixthCar.webp";

import useImagePreloader from "./Components/CustomHooks/useImagePreloader";

function App() {
  let [carsArray, setCarsArray] = useState(carsData);
  let [carsArrayWithCircle, setCarsArrayWithCircle] = useState(carsData);
  let [carsFetched, setCarsFetched] = useState(false);
  let [again, setAgain] = useState(false);

  useEffect(
    function () {
      let tempImagePathArray = [];
      let tempImagePathArrayWithCircle = [];

      async function fetch() {
        for (let i = 0; i < carsArray.length; i++) {
          let importedImagePath = await import(
            `./assetsNew/${carsArray[i].image}.webp`
          );
          let importedImagePathWithCircle = await import(
            `./assetsNew/${carsArray[i].image}WithCircle.webp`
          );

          tempImagePathArray.push(importedImagePath.default);
          tempImagePathArrayWithCircle.push(
            importedImagePathWithCircle.default
          );
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

        setCarsArrayWithCircle((prevValue) => {
          let tempArrayWithCircle = JSON.parse(JSON.stringify(prevValue));
          for (let i = 0; i < tempArrayWithCircle.length; i++) {
            tempArrayWithCircle[i] = {
              ...tempArrayWithCircle[i],
              imagePath: tempImagePathArrayWithCircle[i],
            };
          }
          return tempArrayWithCircle;
        });

        setCarsFetched((prevValue) => true);
      }

      fetch();
    },
    [carsData]
  );

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

    setCarsArrayWithCircle((prevValue) => {
      let tempArrayWithCircle = JSON.parse(JSON.stringify(carsArrayWithCircle));
      for (let i = 0; i < tempArrayWithCircle.length - 1; i++) {
        let temp = tempArrayWithCircle[i];
        tempArrayWithCircle[i] = tempArrayWithCircle[i + 1];
        tempArrayWithCircle[i + 1] = temp;
      }
      return tempArrayWithCircle;
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

    setCarsArrayWithCircle((prevValue) => {
      let tempArrayWithCircle = JSON.parse(JSON.stringify(carsArrayWithCircle));
      for (let i = tempArrayWithCircle.length - 1; i > 0; i--) {
        let temp = tempArrayWithCircle[i];
        tempArrayWithCircle[i] = tempArrayWithCircle[i - 1];
        tempArrayWithCircle[i - 1] = temp;
      }
      return tempArrayWithCircle;
    });
    setAgain((prevValue) => !prevValue);
  }

  Component();

  return (
    <>
      <Header />
      <CarsSlideShow
        carsArray={carsArray}
        carsArrayWithCircle={carsArrayWithCircle}
        carsFetched={carsFetched}
        onClickBackwardButton={onClickBackwardButton}
        onClickForwardButton={onClickForwardButton}
        again={again}
      />
      <Footer carsArray={carsArray} />
    </>
  );
}

const preloadSrcList = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
  Image11,
  Image12,
];

function Component() {
  const { imagesPreloaded } = useImagePreloader(preloadSrcList);

  if (!imagesPreloaded) {
    return <p>Preloading Assets</p>;
  }

  return <p>Assets Finished Preloading</p>;
}

export default App;
