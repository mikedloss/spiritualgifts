export const surveyKeypress = (event: any, cb: (value: any) => any) => {
  let value = 0;
  if (event.isTrusted) {
    switch (event.which) {
      case 97:
      case 49: // Not true (1)
        value = 1;
        break;
      case 98:
      case 50: // Occasionally true (2)
        value = 2;
        break;
      case 99:
      case 51: // Frequently true (3)
        value = 3;
        break;
      case 100:
      case 52: // Mostly true (4)
        value = 4;
        break;
      case 101:
      case 53: // Definitely true (3)
        value = 5;
        break;
      default:
        break;
    }
  }
  if (value !== 0 && cb) {
    cb(value);
  }
};
