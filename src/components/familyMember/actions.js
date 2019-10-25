import { FAMILY_ADD, FAMILY_ADD_COMPLETE, FAMILY_ADD_ERROR, FAMILY_ADD_INFO, FAMILY_ADD_INFO_COMPLETE, FAMILY_ADD_INFO_ERROR } from '../../actionTypes';
import api from './../../config/api';

import { ToastActionsCreators } from 'react-native-redux-toast';

export const familyAddinfo = (user_id, callback) => {
    let finalJson = {
        action: "get_information",
        user_id: user_id

    };
    console.log("finaljson", finalJson)
    return dispatch => {
        dispatch({ type: FAMILY_ADD_INFO });
        fetch("https://family.one/oauthstaging2/reactrequest/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(finalJson)
        })
            .then(response => response.json())
            .then(function (json) {
                console.log("jsonvvvvvvvvvvv", json);


                if (json.statusCode != 404) {
                    dispatch({ type: FAMILY_ADD_INFO_COMPLETE });
                    callback(json);
                }
                else {
                    dispatch({ type: FAMILY_ADD_INFO_COMPLETE });
                    callback({})
                }
            })

            .catch(function (error) {
                console.log('error', error.message);
                dispatch({ type: FAMILY_ADD_INFO_ERROR });

            });
    }


    //return true;
};
export const deleteEditlist = (updaterelation, user_id, callback) => {
    let finalJson = {
        action: "update",
        user_id: user_id,
        user_metadata: {
            relation: updaterelation
        }

    };
    console.log("finaljson", finalJson)
    return dispatch => {
        dispatch({ type: FAMILY_ADD });
        fetch("https://family.one/oauthstaging2/reactrequest/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(finalJson)
        })
            .then(response => response.json())
            .then(function (json) {
                console.log("jsonvvvvvvgfghfvvvvv", json);
                if (json.statusCode != 404) {
                    dispatch({ type: FAMILY_ADD_COMPLETE });
                    callback({json});
                }
                else {
                    dispatch({ type: FAMILY_ADD_COMPLETE });
                    callback({})
                }


            })

            .catch(function (error) {
                console.log('error', error.message);

            });
    }
};

export const insertUser = (createuser, updaterelation, user_id, callback) => {
    let finalJson = {
        action: "update",
        user_id: user_id,
        user_metadata: {
            relation: updaterelation
        }

    };
    console.log("finaljson", finalJson)
    return dispatch => {
        dispatch({ type: FAMILY_ADD });
        fetch("https://family.one/oauthstaging2/reactrequest/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(finalJson)
        })
            .then(response => response.json())
            .then(function (json) {
                console.log("jsonvvvvvvgfghfvvvvv", json);


                // if (json.statusCode != 404) {
                //     dispatch({ type: FAMILY_ADD_COMPLETE });

                // }
                // else {
                //     dispatch({ type: FAMILY_ADD_COMPLETE });

                // }

                let finalUserCheckJson = {
                    action: "search", email: createuser.member_email
                }
                return fetch("https://family.one/oauthstaging2/searchbymail/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(finalUserCheckJson)
                })
            })
            .then(response => response.json())
            .then(function (json) {
                let name = createuser.firstName + createuser.lastName;
                console.log("json2222222222222222", json);
                console.log("length", json.length)
                let finalUserJson = {
                    action: "signup",
                    connection: "email",
                    email: createuser.member_email,
                    nickname: name,
                    name: name,
                    user_metadata: {

                        first_name: createuser.firstName,
                        last_name: createuser.lastName
                    }

                };

                if (json.length === 0) {
                    console.log("yaha aa gaya");
                    return fetch("https://family.one/oauthstaging2/reactrequest/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(finalUserJson)
                    })

                        .then(response => response.json())
                        .then(function (json) {
                            console.log("data", json)
                            dispatch({ type: FAMILY_ADD_COMPLETE });
                            callback({})
                        })
                }
                else {
                    dispatch({ type: FAMILY_ADD_COMPLETE });
                    callback({})

                }

            })

            .catch(function (error) {
                console.log('error', error.message);

            });
    }
};


