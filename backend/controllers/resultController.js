const asyncHandler = require("express-async-handler");
const express = require("express");
const mongoose = require("mongoose");
const TestResult = require("../models/resultModel");
const Test = require("../models/testModel");
exports.saveResult = asyncHandler(async (req, res) => {
  const test = mongoose.Types.ObjectId(req.params.testId);

  const { user, answer, time, correct } = req.body;

  var finishDate = new Date();

  const result = await TestResult.create({
    user,
    test,
    answer,
    correct,
    finishDate,
    time,
  });

  if (result) {
    res.status(201).json({
      result,
    });
  } else {
    res.status(400).json({ message: "Fail to save" });
    throw new Error("Fail to save");
  }
});
/*  return 
  accuracy: 20
  correct: "1/200"
  finishDate: "14/4/2022"
  score: 10
  testResult: [{…}]
  time: "119:58"
  _id: "627ef45a53e9619dc8f156bb"  // id of result
*/
exports.getAllResult = asyncHandler(async (req, res) => {
  const limit = req.query.limit;
  const userId = mongoose.Types.ObjectId(req.params.userId);
  var result;
  if (limit === "4") {
    result = await TestResult.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $project: {
          user: 0,
          answer: 0,
        },
      },
      {
        $lookup: {
          from: "tests",
          localField: "test",
          foreignField: "_id",
          as: "testResult",
        },
      },
      {
        $project: {
          correct: 1,
          finishDate: 1,
          time: 1,
          testResult: {
            name: 1,
            test: 1,
          },
        },
      },
      {
        $limit: 3,
      },
    ]);
  } else {
    result = await TestResult.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $project: {
          user: 0,
          answer: 0,
        },
      },
      {
        $lookup: {
          from: "tests",
          localField: "test",
          foreignField: "_id",
          as: "testResult",
        },
      },
      {
        $project: {
          correct: 1,
          finishDate: 1,
          time: 1,
          testResult: {
            name: 1,
            test: 1,
          },
        },
      },
    ]);
  }

  for (let i = 0; i < result.length; i++) {
    const correctAnswer = result[i].correct.filter(
      (value) => value === 1
    ).length;

    const score = getScore(result[i].correct);
    result[i].score = score;
    result[i].accuracy = (
      (correctAnswer * 100) /
      result[i].correct.length
    ).toFixed(2);
    result[i].correct = correctAnswer + "/" + result[i].correct.length;
    // time zone
    const today = new Date(result[i].finishDate)
      .toLocaleString("en-GB", {
        timeZone: "Asia/Jakarta",
      })
      .split(",");
    result[i].finishDate = today[0];
    //result[i].finishDate =
    // today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();
  }

  if (result) {
    res.status(201).json({
      result,
    });
  } else {
    res.status(400).json({ message: "Fail to get result" });
    throw new Error("Fail to get result");
  }
});

exports.getTestResult = asyncHandler(async (req, res) => {
  const resultId = mongoose.Types.ObjectId(req.params.resultId);
  const result = await TestResult.aggregate([
    {
      $match: {
        _id: resultId,
      },
    },
    {
      $project: {
        user: 0,
        answer: 0,
      },
    },
    {
      $lookup: {
        from: "tests",
        localField: "test",
        foreignField: "_id",
        as: "testResult",
      },
    },
    {
      $project: {
        correct: 1,
        finishDate: 1,
        time: 1,
        testResult: {
          _id: 1,
          name: 1,
          test: 1,
        },
      },
    },
  ]);

  for (let i = 0; i < result.length; i++) {
    const correctAnswer = result[i].correct.filter(
      (value) => value === 1
    ).length;
    const wrongAnswer = result[i].correct.filter((value) => value === 0).length;

    const skipAnswer = result[i].correct.filter((value) => value === -1).length;
    const score = getScore(result[i].correct);
    result[i].score = score;
    result[i].accuracy = (
      (correctAnswer * 100) /
      result[i].correct.length
    ).toFixed(2);
    result[i].result = correctAnswer + "/" + result[i].correct.length;
    result[i].correct = correctAnswer;
    result[i].wrong = wrongAnswer;
    result[i].skip = skipAnswer;
  }

  if (result) {
    res.status(201).json({
      result,
    });
  } else {
    res.status(400).json({ message: "Fail to get result" });
    throw new Error("Fail to get result");
  }
});

exports.getAnswerResult = asyncHandler(async (req, res) => {
  const resultId = mongoose.Types.ObjectId(req.params.resultId);
  //const testId = mongoose.Types.ObjectId(req.params.testId);
  const result = await TestResult.find(
    { _id: resultId },
    { test: 1, answer: 1, correct: 1 }
  );
  console.log(result[0].test); // testId

  //get answer
  const test2 = await Test.aggregate([
    {
      $match: {
        _id: result[0].test,
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "question._id",
        foreignField: "_id",
        as: "result",
      },
    },
  ]);
  var answer = [];
  var keyAnswer = [];
  if (test2) {
    const s = test2[0].result.sort((a, b) =>
      a.question > b.question ? 1 : -1
    );

    const grouped = groupBy(s, (item) => item.part);
    const z = new Map([...grouped.entries()].sort());

    answer = [...z.values()]; // all answer and quetion /////////////

    for (let i = 0; i < answer.length; i++) {
      const part = answer[i]; // this an array
      part.forEach((element) => {
        if (element.types === "normal") {
          keyAnswer.push(element.answer);
        } else {
          const ans = element.questions;
          ans.forEach((ele) => {
            keyAnswer.push(ele.answer);
          });
        }
      });
    }
  } else {
    res.status(400).json({ message: "Fail to get answer result" });
    throw new Error("Fail to get answer result");
  }

  if (result) {
    res.status(201).json({ result, keyAnswer });
  } else {
    res.status(400).json({ message: "Fail to get answer result" });
    throw new Error("Fail to get answer result");
  }
});

exports.getDetailResult = asyncHandler(async (req, res) => {
  const resultId = mongoose.Types.ObjectId(req.params.resultId);
  //const testId = mongoose.Types.ObjectId(req.params.testId);
  const result = await TestResult.find(
    { _id: resultId },
    { test: 1, answer: 1, correct: 1 }
  );
  console.log(result[0].test); // testId

  //get answer
  const test2 = await Test.aggregate([
    {
      $match: {
        _id: result[0].test,
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "question._id",
        foreignField: "_id",
        as: "result",
      },
    },
  ]);
  var answer = [];
  var keyAnswer = [];
  if (test2) {
    const s = test2[0].result.sort((a, b) =>
      a.question > b.question ? 1 : -1
    );

    const grouped = groupBy(s, (item) => item.part);
    const z = new Map([...grouped.entries()].sort());

    answer = [...z.values()]; // all answer and quetion /////////////
  } else {
    res.status(400).json({ message: "Fail to get answer result" });
    throw new Error("Fail to get answer result");
  }

  if (result) {
    res.status(201).json({ result, answer });
  } else {
    res.status(400).json({ message: "Fail to get answer result" });
    throw new Error("Fail to get answer result");
  }
});

function getCorrectAnswer(arr) {
  return arr.filter((value) => value === 1).length;
}

function getReadScore(score) {
  if (score <= 9) return 5;
  if (score >= 97) return 495;
  if (score >= 10 && score <= 24) return 10 + (score - 10) * 5;
  if (score >= 25 && score <= 38) return 90 + (score - 25) * 5;
  if (score >= 39 && score <= 51) return 170 + (score - 39) * 5;
  if (score >= 52 && score <= 63) return 250 + (score - 52) * 5;
  if (score >= 64 && score <= 93) return 320 + (score - 64) * 5;
  return 480 + (score - 94) * 5;
}

function getLisScore(score) {
  if (score <= 6) return 5;
  if (score >= 93) return 495;
  if (score >= 7 && score <= 38) return 10 + (score - 7) * 5;
  if (score >= 39 && score <= 44) return 180 + (score - 39) * 5;
  if (score >= 45 && score <= 69) return 220 + (score - 44) * 5;
  if (score >= 70 && score <= 74) return 360 + (score - 70) * 5;
  if (score >= 75 && score <= 84) return 390 + (score - 75) * 5;
  return 450 + (score - 85) * 5;
}

function getScore(arr) {
  // const lis = getCorrectAnswer(arr.slice(0, 100));
  // const read = getCorrectAnswer(arr.slice(100, 200));

  // return getLisScore(lis) + getReadScore(read);
  const totalQuestions = 10/arr.length;
  const totalCorrect = getCorrectAnswer(arr);

  return ((totalCorrect * totalQuestions) ).toFixed(2).concat('/10');
}

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
