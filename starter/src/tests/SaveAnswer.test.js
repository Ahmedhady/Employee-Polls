import { _saveQuestionAnswer } from "../utils/_DATA";

describe("_saveQuestionAnswer", () => {

    it("will return true if structured answer is passed", async () => {
      const answer = { authedUser: "sarahedo", qid: "8xf0y6ziyjabvozdd253nd", answer: "optionOne"};
      const result = await _saveQuestionAnswer(answer);
      expect(result).toEqual(true);
    });
  
    it("will return error if wrong data is passed", async () => {
      const invalidAanswer = { authedUser: "sarahedo", qid: "8xf0y6ziyjabvozdd253nd" }
      await expect(_saveQuestionAnswer(invalidAanswer)).rejects.toEqual("Please provide authedUser, qid, and answer");
    });
  });