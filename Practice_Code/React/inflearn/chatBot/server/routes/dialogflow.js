const express = require('express');
const dialogflow = require('dialogflow');
const router = express.Router();

const { googleProjectID: projectId, dialogFlowSessionID: sessionId, dialogFlowSessionLanguageCode: languageCode } = require("../config/dev");
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// 텍스트쿼리
router.post("/textQuery", async (req, res) => {
  // 사용자가 입력한 텍스트
  const { text } = req.body;

  // dialogflow에 전달할 request
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text,
        languageCode,
      },
    },
  };

  // 사용자 입력 텍스트 전달후 리턴값
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  res.send(result);
});

// 이벤트쿼리 ( 최초입장시 전달할 텍스트 )
router.post("/eventQuery", async (req, res) => {
  const { event } = req.body;

  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        name: event,
        languageCode,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  res.send(result);
});


module.exports = router;
