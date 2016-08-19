import { expect } from "chai";

import { errorMessages } from "utils";

describe("utils/errorMessages", () => {
  it("should return error messages", () => {
    const messages = errorMessages({
      minLength: 8,
      maxLength: 64
    });

    expect(messages.isDefaultRequiredValue).to.equal("入力してください");
    expect(messages.isEmail).to.equal("形式が不正です");
    expect(messages.minLength).to.equal("8文字以上で入力してください");
    expect(messages.maxLength).to.equal("64文字以下で入力してください");
  });
});
