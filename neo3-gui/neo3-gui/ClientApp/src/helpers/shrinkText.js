import React from 'react';
import { useViewPort } from './viewPort';
import { useTranslation } from 'react-i18next';
import constants from '../configs/constants';
import { Tooltip } from 'antd';
import showCopied from '../components/Messages/showCopied';
const { PREFIX_CHAR_COUNT, SUFFIX_CHAR_COUNT, BREAKPOINT_MD, THEME_COLOR } = constants;

export const shrinkText = (text, prefixCount = PREFIX_CHAR_COUNT, suffixCount = SUFFIX_CHAR_COUNT) => {
  if (!text) return;
  const len = text.length;
  if (len < (prefixCount + suffixCount)) return text;
  return `${text.substring(0, prefixCount + 1)}...${text.substring(len - suffixCount - 1)}`;
}

export const Shrinkable = ({ text, shrinkPoint = BREAKPOINT_MD, prefixCount, suffixCount, copyable }) => {
  if (isNaN(shrinkPoint)) shrinkPoint = +shrinkPoint;
  const { width } = useViewPort();
  const { t } = useTranslation();

  return copyable === false ? (
    <span>{ width > shrinkPoint ? text : shrinkText(text, prefixCount, suffixCount) }</span>
  ) : (
    <Tooltip placement="rightBottom" title={t('common.right click to copy hash')} color={THEME_COLOR} >
      <span onContextMenu={() => showCopied(text)} style={{ cursor: 'default' }}>
        { width > shrinkPoint ? text : shrinkText(text, prefixCount, suffixCount) }
      </span>
    </Tooltip>
  );
};
Shrinkable.displayName = 'Shrinkable';
