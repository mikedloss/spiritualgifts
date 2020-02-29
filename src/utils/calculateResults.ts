import { orderBy } from "lodash";
import { Answer, Gift, SimpleResult, SummarizedResults } from "../types";

export class SpiritualGifts {
  #answers: Answer[] = [];
  #gifts: Gift[] = [];

  #simpleResults: SimpleResult[] = [];
  results: SummarizedResults = {
    top3: [],
    fullResults: [],
    simpleResults: []
  };

  constructor(answers: Answer[], gifts: Gift[]) {
    this.#answers = answers;
    this.#gifts = gifts;
    
    this.buildSimpleResults();
    this.summarizeResults();
  }

  private buildSimpleResults() {
    this.#answers.forEach(answer => {
      const giftTitle = whatGiftIsThisQuestion(answer.question);
      if (giftTitle === "Unknown") {
        throw new Error("Unknown gift");
      }

      let result = this.#simpleResults.find(r => r.title === giftTitle) ?? {
        title: giftTitle,
        score: 0
      };

      result.score += answer.answer;
      if (!this.#simpleResults.some(r => r.title === giftTitle)) {
        this.#simpleResults.push(result);
      }
    });
    this.#simpleResults = orderBy(this.#simpleResults, ["score"], ["desc"]);
  }

  private summarizeResults() {
    let fullGiftsList = [];
    this.#simpleResults.forEach(result => {
      const gift = this.#gifts.find(g => g.title === result.title);
      fullGiftsList.push({ ...gift, score: result.score });
    });

    this.results.fullResults = fullGiftsList;
    this.results.top3 = fullGiftsList.slice(0, 3);
    this.results.simpleResults = this.#simpleResults;
  }
}

function whatGiftIsThisQuestion(question: number) {
  if ([6, 16, 27, 43, 65].includes(question)) {
    return "Leadership";
  }
  if ([1, 17, 31, 47, 59].includes(question)) {
    return "Administration";
  }
  if ([2, 18, 33, 61, 73].includes(question)) {
    return "Teaching";
  }
  if ([9, 24, 39, 68, 79].includes(question)) {
    return "Knowledge";
  }
  if ([3, 19, 48, 62, 74].includes(question)) {
    return "Wisdom";
  }
  if ([10, 25, 40, 54, 69].includes(question)) {
    return "Prophecy";
  }
  if ([11, 26, 41, 55, 70].includes(question)) {
    return "Discernment";
  }
  if ([20, 34, 49, 63, 75].includes(question)) {
    return "Exhortation";
  }
  if ([4, 21, 35, 50, 76].includes(question)) {
    return "Shepherding";
  }
  if ([12, 28, 42, 56, 80].includes(question)) {
    return "Faith";
  }
  if ([5, 36, 51, 64, 77].includes(question)) {
    return "Evangelism";
  }
  if ([13, 29, 44, 57, 71].includes(question)) {
    return "Apostleship";
  }
  if ([14, 30, 46, 58, 72].includes(question)) {
    return "Service/Helps";
  }
  if ([7, 22, 37, 52, 66].includes(question)) {
    return "Mercy";
  }
  if ([8, 23, 38, 53, 67].includes(question)) {
    return "Giving";
  }
  if ([15, 32, 45, 60, 78].includes(question)) {
    return "Hospitality";
  }
  return "Unknown";
}
