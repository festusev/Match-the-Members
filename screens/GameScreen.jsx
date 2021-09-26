import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";

import { styles } from "../constants/Styles";
import { nameToPic } from "../constants/Constants";
import { useEffect } from "react";
import { shuffle } from "../utils/ArrayUtils";
const names = Object.keys(nameToPic);

export default function GameScreen() {
  // TODO: Declare and initialize state variables here, using "useState".
  const [correct, setCorrect] = useState(0);
  const [viewed, setViewed] = useState(0);
  const [correct_i, setCorrectI] = useState(0); // Index of the correct name in the "names" array
  const [image, setImage] = useState("");
  const [nameOptions, setNameOptions] = useState([]);

  // State for the timer is handled for you.
  const [timeLeft, setTimeLeft] = useState(5000);

  // Called by the timer every 10 milliseconds
  const countDown = () => {
    if (timeLeft > 0) {
      // Time still left
      // TODO: update appropriate state variables
      setTimeLeft(timeLeft - 10);
    } else {
      // Time has expired
      // TODO: update appropriate state variables
      setViewed(viewed + 1)
      getNextRound()
    }
  };

  // This is used in the useEffect(...) hook bound on a specific STATE variable.
  // It updates state to present a new member & name options.
  const getNextRound = () => {
    console.log(">>>>>> NEXT ROUND");
    // Fetches the next member name to guess.
    let correct = names[Math.floor(Math.random() * names.length)];
    let correctName = nameToPic[correct][0];
    let correctImage = nameToPic[correct][1];

    // Generate 3 more wrong answers.
    let nameOptions = [correctName];
    while (nameOptions.length < 4) {
      let wrong = names[Math.floor(Math.random() * names.length)];
      let wrongName = nameToPic[wrong][0];
      if (!nameOptions.includes(wrongName)) {
        nameOptions.push(wrongName);
      }
    }
    nameOptions = shuffle(nameOptions);

    // TODO: Update state here.
    setNameOptions(nameOptions);
    setCorrectI(nameOptions.indexOf(correctName));
    setTimeLeft(5000);

    setImage(correctImage);
  };

  // Called when user taps a name option.
  // TODO: Update correct # and total # state values.
  const selectedNameChoice = (index) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>> SELECTED NAME");
    if(index == correct_i) {
      setCorrect(correct + 1);
    }    
    setViewed(viewed + 1);
    getNextRound();
  };

  useEffect(() => {
    /* TODO: Call the countDown() method every 10 milliseconds */
    timeoutId = setTimeout(() => {
      countDown();
    }, 10);
    console.log("Setting timeout, id=" + timeoutId);
    
    // return ()=>{clearInterval(interval);};
  }, [timeLeft]);

  // TODO: Finish this useEffect() hook such that we automatically
  // get the next round when the appropriate state variable changes.

  useEffect(() => {
    getNextRound();
  }, []);

  // Set up four name button components
  const nameButtons = [];
  for (let i = 0; i < 4; i++) {
    const j = i;
    nameButtons.push(
      // TODO: Implement a Button/Pressable type that shows a name choice, and implement the functionality when a user press on it
      // Hint: Most functionality is already taken care of by one of the functions already defined
      <TouchableOpacity style={styles.button} onPress={()=>{selectedNameChoice(j)}}>
        <Text style={styles.buttonText}>
          {nameOptions[j]}
          </Text>
        </TouchableOpacity>
    );
  }

  const timeRemainingStr = (timeLeft / 1000).toFixed(2);

  // Style & return the view.
      /* TODO: Build out your UI using Text and Image components. */
  return (
    <View syle={styles.imageView}>
      <Text style={styles.scoreText}>Current Score: {correct}/{viewed}</Text>
      <Text style={styles.timerText}>Time Remaining: {timeRemainingStr} s</Text>      
      <Image source={image} style={styles.image}></Image>
      <View>
        {/* Hint: What does the nameButtons list above hold? 
        What types of objects is this list storing?
        Try to get a sense of what's going on in the for loop above. */
        nameButtons}      
      </View>
    </View>
  );
}
