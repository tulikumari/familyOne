
import { AsyncStorage } from "react-native";
import React, { Component } from "react";
export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem("user_id")
        .then(res => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
};