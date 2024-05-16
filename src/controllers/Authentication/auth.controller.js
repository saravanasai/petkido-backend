import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

var poolData = {
  UserPoolId: process.env.USER_POOL_ID, // Your user pool id here
  ClientId: process.env.CLIENT_ID, // Your client id here
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const registerUser = asyncHandler(async (req, res) => {
    
  let {
    email,
    phoneNumber,
    gender,
    dob,
    username,
    name,
    password,
    city,
    user_type,
    country,
  } = req.body;

  let attributeList = [];

  let ArrtibutesMappings = [
    {
      Name: "email",
      Value: email,
    },
    {
      Name: "phone_number",
      Value: phoneNumber,
    },
    {
      Name: "custom:app_id",
      Value: "1212687236812736",
    },
    {
      Name: "custom:city",
      Value: city,
    },
    {
      Name: "custom:country",
      Value: country,
    },
    {
      Name: "custom:dob",
      Value: dob,
    },
    {
      Name: "custom:gender",
      Value: gender,
    },
    {
      Name: "custom:user_type",
      Value: user_type,
    },
    {
      Name: "custom:name",
      Value: name,
    },
  ];

  let arrtibutesAdded = [];

  ArrtibutesMappings.forEach((arribute) => {
    arrtibutesAdded.push(
      new AmazonCognitoIdentity.CognitoUserAttribute(arribute)
    );
  });

  attributeList.push(...arrtibutesAdded);

  userPool.signUp(
    username,
    password,
    attributeList,
    null,
    function (err, result) {
      if (err) {
        return res.status(500).json(new ApiResponse(500, err, "error"));
      }
      return res.status(200).json(new ApiResponse(200, result, "success"));
    }
  );
});

const verifyOTP = asyncHandler(async (req, res) => {
  let { username, code } = req.body;

  var userData = {
    Username: username,
    Pool: userPool,
  };

  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.confirmRegistration(code, true, function (err, result) {
    if (err) {
      return res
        .status(500)
        .json(new ApiResponse(500, err, "Email verification failed"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Email verified successfully"));
  });
});

const loginUser = asyncHandler(async (req, res) => {
  let { username, password } = req.body;

  let authenticationData = {
    Username: username,
    Password: password,
  };

  let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );

  let userData = {
    Username: username,
    Pool: userPool,
  };

  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  let accessToken = "";
  let userAttributes = {};

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      accessToken = result.getAccessToken().getJwtToken();

      cognitoUser.getUserAttributes(function (err, result) {
        if (err) {
          console.log("Attribute err", err);
          return;
        }
        for (let i = 0; i < result.length; i++) {
          let key = result[i].getName();
          let value = result[i].getValue();
          userAttributes[key] = value;
        }

        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              { token: accessToken, attributes: userAttributes },
              "logged in successfully"
            )
          );
      });
    },

    onFailure: function (err) {
      return res.status(500).json(new ApiResponse(500, err, "Login failed"));
    },
  });
});

export { registerUser, loginUser, verifyOTP };
