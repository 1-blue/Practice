const router = require("express").Router();

// 데이터베이스 모델
const Subscriber = require("../models/Subscriber");

// 구독
router.post("/", async (req, res) => {
  const { writerId, userId } = req.body;

  // 이미구독했다면
  if (await Subscriber.findOne({ userFrom: userId }).exec()) {
    // 구독취소
    const response = await Subscriber.findOneAndRemove({ userFrom: userId }).exec();
    return res.json({ result: true, message: "구독삭제 성공", response });
  }

  const subscriber = new Subscriber({
    userTo: writerId,
    userFrom: userId,
  });

  subscriber.save((error, doc) => {
    if (error) {
      return res.json({ result: false, message: "구독실패", error });
    }

    return res.json({ result: true, message: "구독성공", doc });
  });
});

// 구독자 구하기 ( 구독자 수 및 내가 구독했는지 여부 판단 )
router.get("/:writerId", async (req, res) => {
  const { writerId } = req.params;

  res.send(await Subscriber.find({ userTo: writerId }).exec());
});

module.exports = router;
