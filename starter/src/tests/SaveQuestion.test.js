import { _saveQuestion } from "../utils/_DATA";

describe("_saveQuestion", () => {

  it("will return true if a structured question is passed", async () => {
    const question = { optionOneText: "Build our new application with Javascript", optionTwoText: "Build our new application with Typescript", author: "sarahedo"};
    const result = await _saveQuestion(question);
    expect(result.optionOne.text).toEqual(question.optionOneText);
    expect(result.optionTwo.text).toEqual(question.optionTwoText);
    expect(result.author).toEqual(question.author);
  });

  it("will return Error if wrong data is passed", async () => {
    const invalidQuestion = { optionOneText: "become a traveler", optionTwoText: "become a backpacker"};
    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
  });
});