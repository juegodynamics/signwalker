import Stack from '@mui/material/Stack';
import {spacingSize, totalWidth} from './const';
import {KeyboardButton} from './KeyboardButton';
import {KeyboardGroup} from './KeyboardGroup';
import {GlyphButtonOverrides, GlyphButtonProps} from './types';

export const KeyboardRow = <SelectionT,>({
  selectedKeys,
  setSelectedKeys,
  leader,
  leaderDisableFlex,
  captions,
  tail,
  groups,
  resolveKey,
  overrideKeys,
}: {
  selectedKeys: SelectionT;
  setSelectedKeys: (nextSelectedKeys: SelectionT) => void;
  leader: string;
  leaderDisableFlex?: boolean;
  captions: readonly string[];
  resolveKey: (selection: SelectionT) => string | undefined;
  tail?: string;
  groups?: GlyphButtonProps<SelectionT>[][];
  overrideKeys?: GlyphButtonOverrides;
}) => {
  const totalGroupEntries = groups
    ? groups.flatMap((group) => group).length
    : 0;
  return (
    <Stack direction="row" spacing={spacingSize} sx={{width: totalWidth}}>
      <KeyboardButton
        caption={leader}
        onClick={overrideKeys?.[leader]?.onClick}
        flexGrow={leaderDisableFlex ? undefined : 1}
      />
      {groups?.length &&
        groups.map((group, groupIndex, rowGroups) => {
          const currentCaptionIndex = rowGroups
            .slice(0, groupIndex)
            .flatMap((group) => group).length;
          return group.length ? (
            <KeyboardGroup
              key={groupIndex}
              selectedKeys={selectedKeys}
              setSelectedKeys={setSelectedKeys}
              group={group}
              resolveKey={resolveKey}
              overrideKeys={overrideKeys}
              captions={captions.slice(
                currentCaptionIndex,
                currentCaptionIndex + group.length
              )}
            />
          ) : null;
        })}
      {captions.slice(totalGroupEntries, captions.length).map((caption) => (
        <KeyboardButton key={caption} caption={caption} />
      ))}
      {tail && (
        <KeyboardButton
          caption={tail}
          onClick={overrideKeys?.[tail]?.onClick}
          flexGrow={1}
        />
      )}
    </Stack>
  );
};
