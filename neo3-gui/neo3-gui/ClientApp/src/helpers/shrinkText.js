import constants from '../configs/constants';
const { PREFIX_CHAR_COUNT, SUFFIX_CHAR_COUNT } = constants;

const shrinkText = (text, prefixCount = PREFIX_CHAR_COUNT, suffixCount = SUFFIX_CHAR_COUNT) => {
  if (!text) return text;
  const len = text.length;
  if (len < (prefixCount + suffixCount)) return text;
  return `${text.substring(0, prefixCount + 1)}...${text.substring(len - suffixCount - 1)}`;
};

export default shrinkText;
