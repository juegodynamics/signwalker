import {
  Finger,
  FingerCombination,
  FingerSpecification,
  Handshape,
  HandshapeVariantKey,
  Option,
  VariantSignature,
} from './types';

const v = ({
  thumb,
  index,
  middle,
  ring,
  little,
}: {
  thumb?: HandshapeVariantKey | HandshapeVariantKey[];
  index?: HandshapeVariantKey | HandshapeVariantKey[];
  middle?: HandshapeVariantKey | HandshapeVariantKey[];
  ring?: HandshapeVariantKey | HandshapeVariantKey[];
  little?: HandshapeVariantKey | HandshapeVariantKey[];
}): VariantSignature<HandshapeVariantKey> => [
  thumb ? (Array.isArray(thumb) ? thumb : [thumb]) : [],
  index ? (Array.isArray(index) ? index : [index]) : [],
  middle ? (Array.isArray(middle) ? middle : [middle]) : [],
  ring ? (Array.isArray(ring) ? ring : [ring]) : [],
  little ? (Array.isArray(little) ? little : [little]) : [],
];

const fingerVariants = {
  '񅊡񅢡': '񅊡񅢡',
  '񅊡񅡁': '񅊡񅡁',
  '񅊡񅙡': '񅊡񅙡',
  '񀀡񀑁': '񀀡񀑁',
  '񀀡񀉡': '񀀡񀉡',
  '񀀡񀎁': '񀀡񀎁',
  '񂇡񁲡': '񂇡񁲡',
  '񁁁񁂡': '񁁁񁂡',
  '񅊡񅖡': '񅊡񅖡',
  '񀕡񀠁': '񀕡񀠁',
  '񀕡񀧡': '񀕡񀧡',
};

export const fingerCombos: Record<string, FingerSpecification> = {
  '񆅁': {
    primaryFingers: ['񅰁', '񀀡', '񄩡', '񄅡', '񃛡'],
    combinations: {
      '': {key: '񆅁'},
      '񅰁': {
        key: '񅰁',
        variants: {
          '񅳁': v({thumb: '񀀡񀑁'}),
          '񅴡': v({thumb: '񀕡񀠁'}),
          '񅶁': v({thumb: '񀀡񀉡'}),
          '񅷡': v({thumb: '񅊡񅖡'}),
          '񅹁': v({thumb: '񁁁񁂡:between:index-middle' as HandshapeVariantKey}),
          '񅺡': v({thumb: '񁁁񁂡:between:middle-ring' as HandshapeVariantKey}),
          '񅼁': v({thumb: '񁁁񁂡:between:ring-little' as HandshapeVariantKey}),
          '񅽡': v({thumb: '񁁁񁂡:index-middle' as HandshapeVariantKey}),
          '񅿁': v({thumb: '񁁁񁂡:over-index-middle' as HandshapeVariantKey}),
          '񆀡': v({thumb: '񁁁񁂡:index-middle-ring' as HandshapeVariantKey}),
          '񆂁': v({thumb: '񁁁񁂡:index-middle-ring-little' as HandshapeVariantKey}),
          '񆃡': v({
            thumb: '񁁁񁂡:over-index-middle-ring-little' as HandshapeVariantKey,
            index: '񀀡񀎁',
            middle: '񀀡񀎁',
            ring: '񀀡񀎁',
            little: '񀀡񀎁',
          }),
        },
      },
      '񀀡': {
        key: '񀀡',
        variants: {
          '񀏡': v({index: '񅊡񅢡'}),
          '񀑁': v({index: '񀀡񀑁'}),
          '񀒡': v({index: '񀀡񀑁:low' as HandshapeVariantKey}),
          '񀉡': v({index: '񀀡񀉡'}),
          '񀌡': v({index: '񀀡񀉡', thumb: '񁁁񁂡:index' as HandshapeVariantKey}),
          '񀎁': v({thumb: '񀀡񀎁'}),
        },
      },
      '񄩡': {
        key: '񄩡',
        variants: {
          '񄬡': v({middle: '񀀡񀎁'}),
        },
      },
      '񄅡': {
        key: '񄅡',
        variants: {
          '񄇁': v({ring: '񀀡񀎁'}),
        },
      },
      '񃛡': {
        key: '񃛡',
        variants: {
          '񃝁': v({thumb: '񁁁񁂡'}),
          '񃣁': v({little: '񀀡񀎁'}),
          '񃤡': v({little: '񀀡񀉡'}),
          '񃦁': v({thumb: '񅊡񅙡', little: '񅊡񅙡'}),
        },
      },
      '񅰁񀀡': {
        key: '񅊡',
        variants: {
          '񅍡': v({thumb: '񀀡񀑁'}),
          '񅏁': v({thumb: '񀕡񀠁'}),
          '񅐡': v({thumb: '񀀡񀉡'}),
          '񅒁': v({index: '񀀡񀉡'}),
          '񅓡': v({thumb: '񀀡񀉡', index: '񀀡񀉡'}),
          '񅕁': v({index: '񀀡񀑁'}),
          '񅖡': v({thumb: '񅊡񅖡'}),
          '񅘁': v({thumb: '񅊡񅖡', index: '񀀡񀉡'}),
          '񅙡': v({thumb: '񅊡񅙡', index: '񅊡񅙡'}),
          '񅛁': v({
            thumb: '񅊡񅙡:curlicue' as HandshapeVariantKey,
            index: '񅊡񅙡:curlicue' as HandshapeVariantKey,
          }),
          '񅜡': v({thumb: 'between:inside' as HandshapeVariantKey, index: '񅊡񅡁'}),
          '񅟡': v({thumb: '񁁁񁂡', index: '񅊡񅡁'}),
          '񅡁': v({thumb: '񅊡񅡁', index: '񅊡񅡁'}),
        },
      },
      '񅰁񄩡': {key: '񄮁'},
      '񀀡񄩡': {
        key: '񀕡',
        variants: {
          '񀘡': v({index: '񀀡񀉡', middle: '񀀡񀉡'}),
          '񀚁': v({index: '񀀡񀎁', middle: '񀀡񀎁'}),
          '񀞡': v({index: '񀀡񀑁'}),
          '񀝁': v({middle: '񀀡񀑁'}),
          '񀛡': v({index: '񀀡񀑁', middle: '񀀡񀑁'}),
          '񀠁': v({index: '񀕡񀠁', middle: '񀕡񀠁'}),
          '񀡡': v({index: ['񀀡񀉡', '񀕡񀠁'], middle: '񀕡񀠁'}),
          '񀣁': v({index: '񀕡񀠁', middle: ['񀀡񀉡', '񀕡񀠁']}),
          '񀤡': v({
            index: ['񅊡񅢡', '񀕡񀠁'],
            middle: ['񅊡񅢡', '񀕡񀠁'],
          }),
          '񀦁': v({
            index: ['񀀡񀑁', '񀕡񀠁'],
            middle: ['񀀡񀑁', '񀕡񀠁'],
          }),
          '񀧡': v({index: '񀕡񀧡', middle: '񀕡񀧡'}),
          '񀪡': v({index: '񀕡񀧡', middle: ['񀕡񀧡', '񀀡񀉡']}),
          '񀬁': v({index: ['񀕡񀧡', '񀀡񀉡'], middle: '񀕡񀧡'}),
        },
      },
      '񅰁񄅡': {key: '񄔡'},
      '񀀡񄅡': {key: '񄓁'},
      '񄩡񄅡': {
        key: '񄎡',
        variants: {
          '񄐁': v({middle: '񀕡񀠁', ring: '񀕡񀠁'}),
          '񄑡': v({middle: '񀀡񀎁', ring: '񀀡񀎁'}),
        },
      },
      '񅰁񃛡': {key: '񃧡'},
      '񀀡񃛡': {key: '񃰡'},
      '񄩡񃛡': {key: '񄲡'},
      '񄅡񃛡': {key: '񄈡'},
      '񅰁񀀡񄩡': {
        key: '񀭡',
        variants: {
          '񀼡': v({thumb: '񅊡񅢡', index: '񅊡񅢡', middle: '񅊡񅢡'}),
          '񀾁': v({thumb: '񅊡񅡁', index: '񅊡񅡁', middle: '񅊡񅡁'}),
          '񀿡': v({thumb: '񅊡񅙡', index: '񅊡񅙡', middle: '񅊡񅙡'}),
          '񁁁': v({thumb: '񀀡񀑁', index: '񀀡񀑁', middle: '񀀡񀑁'}),
          '񁂡': v({
            thumb: 'between:index-middle' as HandshapeVariantKey,
            index: '񀀡񀑁',
            middle: '񀀡񀑁',
          }),
          '񁄁': v({index: '񀕡񀠁', middle: '񀕡񀠁'}),
          '񁅡': v({
            thumb: '񀕡񀠁',
            index: '񀕡񀠁',
            middle: '񀕡񀠁',
          }),
          '񁇁': v({thumb: '񀀡񀉡', index: '񀕡񀠁', middle: '񀕡񀠁'}),
          '񁈡': v({thumb: '񅊡񅙡', middle: '񅊡񅙡'}),
          '񁊁': v({thumb: '񅊡񅙡', index: '񅊡񅙡'}),
          '񀰡': v({thumb: '񀀡񀉡'}),
          '񀲁': v({index: '񀀡񀉡', middle: '񀀡񀉡'}),
          '񀳡': v({thumb: '񀀡񀉡', index: '񀀡񀉡', middle: '񀀡񀉡'}),
          '񀹡': v({index: '񀀡񀑁'}),
          '񀶡': v({middle: '񀀡񀑁'}),
          '񀸁': v({thumb: '񀕡񀠁', middle: '񀀡񀑁'}),
          '񀵁': v({index: '񀀡񀑁', middle: '񀀡񀑁'}),
          '񀻁': v({thumb: '񅊡񅖡'}),
          '񁎡': v({thumb: '񅊡񅖡', index: '񀕡񀠁', middle: '񀕡񀠁'}),
          '񁋡': v({
            index: ['񀀡񀑁', '񀕡񀠁'],
            middle: ['񀀡񀑁', '񀕡񀠁'],
          }),
          '񁍁': v({index: '񀕡񀧡', middle: '񀕡񀧡'}),
          '񁐁': v({
            thumb: '񅊡񅖡',
            index: ['񅊡񅢡', '񀕡񀠁'],
            middle: ['񅊡񅢡', '񀕡񀠁'],
          }),
          '񁑡': v({thumb: '񅊡񅢡', middle: '񅊡񅢡'}),
          '񁓁': v({thumb: '񅊡񅢡', index: '񅊡񅢡'}),
          '񁔡': v({thumb: '񅊡񅡁', middle: '񅊡񅡁'}),
          '񁚡': v({thumb: '񅊡񅡁', index: '񅊡񅡁'}),
          '񁖁': v({thumb: '񅊡񅡁', index: '񀀡񀑁', middle: '񅊡񅡁'}),
          '񁗡': v({thumb: '񀀡񀑁:out' as HandshapeVariantKey, index: '񀀡񀉡'}),
          '񁙁': v({thumb: '񀀡񀑁:in' as HandshapeVariantKey, index: '񀀡񀉡'}),
          '񁜁': v({
            thumb: ['񀀡񀑁', '񀕡񀠁'],
            index: ['񀀡񀑁', '񀕡񀠁'],
            middle: ['񀀡񀑁', '񀕡񀠁'],
          }),
          '񁝡': v({
            thumb: '񀀡񀑁:out' as HandshapeVariantKey,
            index: ['񀀡񀑁', '񀕡񀠁'],
            middle: ['񀀡񀑁', '񀕡񀠁'],
          }),
          '񁟁': v({
            thumb: '񀀡񀑁',
            index: ['񀀡񀑁', '񀕡񀠁'],
            middle: ['񀀡񀑁', '񀕡񀠁'],
          }),
          '񁠡': v({thumb: '񀀡񀑁:out' as HandshapeVariantKey, middle: '񀀡񀑁'}),
          '񁢁': v({
            thumb: '񀀡񀑁:out' as HandshapeVariantKey,
            middle: '񀀡񀑁',
            index: '񀕡񀧡',
          }),
          '񁣡': v({thumb: '񀀡񀑁', middle: '񀀡񀑁', index: '񀕡񀧡'}),
          '񁥁': v({thumb: '񅊡񅙡', middle: '񀀡񀑁', index: '񅊡񅙡'}),
        },
      },
      '񅰁񀀡񄅡': {key: ''},
      '񅰁񄩡񄅡': {key: ''},
      '񀀡񄩡񄅡': {
        key: '񃉡',
        variants: {
          '񃑁': [[], ['񀀡񀉡'], ['񀀡񀉡'], ['񀀡񀉡'], []],
          '񃒡': [[], ['񀕡񀠁'], ['񀕡񀠁'], ['񀕡񀠁'], []],
          '񃔁': [[], ['񀕡񀠁', '񀀡񀑁'], ['񀕡񀠁', '񀀡񀑁'], ['񀕡񀠁', '񀀡񀑁'], []],
        },
      },
      '񅰁񀀡񃛡': {key: '񃪡'},
      '񅰁񄩡񃛡': {key: '񄱁'},
      '񀀡񄩡񃛡': {
        key: '񃶡',
        variants: {'񃾁': v({index: '񀕡񀧡', middle: '񀕡񀧡'})},
      },
      '񅰁񄅡񃛡': {key: ''},
      '񀀡񄅡񃛡': {key: '񄗡'},
      '񄩡񄅡񃛡': {key: '񄴁'},
      '񅰁񀀡񄩡񄅡': {
        key: '񃕡',
        variants: {
          '񃗁': [[], [], ['񀀡񀑁'], ['񀀡񀑁'], []],
          '񃘡': [[], [], ['񀀡񀉡'], ['񀀡񀉡'], []],
          '񃚁': [['񅊡񅡁'], ['񅊡񅡁'], ['񅊡񅡁'], ['񅊡񅡁'], []],
        },
      },
      '񅰁񀀡񄩡񃛡': {key: '񄁁'},
      '񅰁񀀡񄅡񃛡': {key: '񄦡'},
      '񅰁񄩡񄅡񃛡': {key: ''},
      '񀀡񄩡񄅡񃛡': {
        key: '񁦡',
        variants: {
          '񁨁': [[], ['񀀡񀉡'], ['񀀡񀉡'], ['񀀡񀉡'], ['񀀡񀉡']],
          '񁩡': [[], ['񀀡񀑁'], ['񀀡񀑁'], ['񀀡񀑁'], ['񀀡񀑁']],
          '񁫁': [[], ['񀕡񀠁'], ['񀕡񀠁'], ['񀕡񀠁'], ['񀕡񀠁']],
          '񁬡': [
            [],
            ['񀕡񀠁:split-a' as HandshapeVariantKey],
            ['񀕡񀠁:split-a' as HandshapeVariantKey],
            ['񀕡񀠁:split-b' as HandshapeVariantKey],
            ['񀕡񀠁:split-b' as HandshapeVariantKey],
          ],
          '񁯡': [
            [],
            ['񀕡񀠁:񀀡񀉡-a' as HandshapeVariantKey],
            ['񀕡񀠁:񀀡񀉡-a' as HandshapeVariantKey],
            ['񀕡񀠁:񀀡񀉡-b' as HandshapeVariantKey],
            ['񀕡񀠁:񀀡񀉡-b' as HandshapeVariantKey],
          ],
        },
      },
      '񅰁񀀡񄩡񄅡񃛡': {
        key: '񁲡',
        variants: {
          '񁵡': [[], ['񀀡񀉡'], ['񀀡񀉡'], ['񀀡񀉡'], ['񀀡񀉡']],
          '񁸡': [['񀀡񀉡'], ['񀀡񀉡'], ['񀀡񀉡'], ['񀀡񀉡'], ['񀀡񀉡']],
          '񁻡': v({thumb: '񅊡񅖡'}),
          '񂃁': [['񅊡񅖡'], ['񀀡񀑁'], ['񀀡񀑁'], ['񀀡񀑁'], ['񀀡񀑁']],
          '񂄡': [[], ['񀀡񀑁'], ['񀀡񀑁'], ['񀀡񀑁'], ['񀀡񀑁']],
          '񂆁': [['񀕡񀠁'], ['񀀡񀑁'], ['񀀡񀑁'], ['񀀡񀑁'], ['񀀡񀑁']],
        },
      },
    },
  },
  '񂱡': {
    primaryFingers: ['񀯁', '񀂁', '񄫁', '񄊁', '񃞡'],
    combinations: {
      '': {key: '񂱡'},
      '񀂁': {
        key: '񀂁',
        variants: {
          '񀔁': v({index: '񀀡񀑁'}),
          '񀋁': v({index: '񀀡񀉡'}),
          '񀩁': v({index: '񀕡񀧡', middle: '񀕡񀧡'}),
        },
      },
      '񀂁񄫁': {
        key: '񀗁',
        variants: {
          '񀩁': v({index: '񀕡񀧡', middle: '񀕡񀧡'}),
        },
      },
      '񀂁񃞡': {
        key: '񃲁',
      },
      '񀂁񄫁񄊁': {
        key: '񃋁',
      },
      '񀂁񄫁񃞡': {
        key: '񃸁',
        variants: {
          '񃿡': v({middle: '񀕡񀧡', little: '񀕡񀧡'}),
        },
      },
      '񀂁񄊁': {
        key: '񄙁',
      },
      '񀂁񄊁񃞡': {
        key: '񄙁',
      },
      '񄫁񄊁': {
        key: '񄵡',
        variants: {
          '񅀁': v({middle: '񀀡񀉡', ring: '񀀡񀉡', little: '񀀡񀉡'}),
        },
      },
      '񄫁񄊁񃞡': {
        key: '񄵡',
        variants: {
          '񅀁': v({middle: '񀀡񀉡', ring: '񀀡񀉡', little: '񀀡񀉡'}),
        },
      },
    },
  },
  '񂰁': {
    primaryFingers: ['񂮡', '񄷁', '񄚡', '', ''],
    combinations: {
      '': {
        key: '񂰁',
      },
      '񀀡': {
        key: '',
      },
    },
  },
  '񂙡': {
    primaryFingers: ['񂛁', '񅞁', '񅁡', '', ''],
    combinations: {
      '': {key: '񂙡'},
      '񂛁': {
        key: '񂛁',
        variants: {
          '񁮁': v({
            index: '񀕡񀠁',
            middle: '񀕡񀠁',
            ring: '񀕡񀠁',
            little: '񀕡񀠁',
          }),
          '񂜡': v({thumb: '񀕡񀠁'}),
          '񂞁': v({thumb: '񅊡񅖡'}),
        },
      },
      '񅞁': {key: '񅞁'},
      '񂛁񅁡': {
        key: '񅃁',
      },
    },
  },
  '񂡁': {
    primaryFingers: ['񂟡', '񄟁', '񄯡', '񄖁', '񅇡'],
    combinations: {
      '': {key: '񂡁'},
      '񄟁': {
        key: '񄟁',
        variants: {
          '񄝡': v({little: '񁁁񁂡:in' as HandshapeVariantKey}),
          '񄜁': v({little: '񁁁񁂡:out' as HandshapeVariantKey}),
        },
      },
    },
  },
  '񂤁': {
    primaryFingers: ['񂧁', '񀃡', '񄠡', '񄸡', '񁽁'],
    combinations: {
      '': {
        key: '񂤁',
        variants: {
          '񂢡': [['񂇡񁲡'], [], [], [], []],
          '񂪁': [['񀕡񀠁'], [], [], [], []],
          '񂭁': [['񅊡񅖡'], [], [], [], []],
          '񂫡': [['񂇡񁲡', '񅊡񅖡'], [], [], [], []],
        },
      },
      '񂧁': {
        key: '񂧁',
        variants: {
          '񂥡': [['񂇡񁲡'], [], [], [], []],
          '񂨡': [['񂇡񁲡', '񀕡񀠁'], [], [], [], []],
        },
      },
      '񁽁': {
        key: '񁽁',
        variants: {
          '񁾡': [['񂇡񁲡'], [], [], [], []],
        },
      },
      '񂧁񀃡': {
        key: '񅢡',
        variants: {
          '񅤁': [['񂇡񁲡'], [], [], [], []],
        },
      },
    },
  },
  '񂳁': {
    primaryFingers: ['񂴡', '񀅁', '', '񄋡', '񃠁'],
    combinations: {
      '': {
        key: '񂳁',
        variants: {
          '񂁡': [['񂇡񁲡'], [], [], [], []],
        },
      },
      '񂴡': {
        key: '񂴡',
        variants: {
          '񂶁': [['񀕡񀠁'], [], [], [], []],
          '񂷡': [['񅊡񅖡'], [], [], [], []],
        },
      },
    },
  },
  '񂼁': {
    primaryFingers: ['񃀡', '񄺁', '񄢁', '񃹡', '񃌡'],
    combinations: {
      '': {
        key: '񂼁',
        variants: {
          '񂽡': [['񀀡񀑁'], [], [], [], []],
          '񁱁': [['񀕡񀠁'], [], [], [], []],
          '񂹁': [['񂇡񁲡', '񀕡񀠁'], [], [], [], []],
          '񂺡': [['񂇡񁲡', '񀕡񀠁', '񅊡񅖡'], [], [], [], []],
          '񂀁': [['񂇡񁲡'], [], [], [], []],
        },
      },
      '񃀡': {
        key: '񃀡',
        variants: {
          '񃃡': [['񀕡񀠁'], [], [], [], []],
          '񂿁': [['񂇡񁲡'], [], [], [], []],
          '񃂁': [['񂇡񁲡', '񀕡񀠁'], [], [], [], []],
          '񃅁': [['񀕡񀧡'], ['񀕡񀧡'], [], [], []],
          '񃆡': [['񁁁񁂡', '񀕡񀧡'], ['񀕡񀧡'], [], [], []],
        },
      },
      '񄢁': {key: '񄢁', variants: {'񄂡': v({thumb: '񅊡񅙡', index: '񅊡񅙡'})}},
      '񃀡񄺁': {key: '񅉁'},
      '񃀡񄢁': {key: '񄨁'},
      '񃀡񃹡': {key: '񃻁'},
      '񃀡񃌡': {key: '񃏡'},
      '񄢁񃹡': {key: '񃳡'},
      '񃀡񄢁񃹡': {key: '񃬁'},
      '񄢁񃹡񄺁': {
        key: '񀆡',
      },
      '񄺁񄢁񃹡񃌡': {
        key: '񅨡',
        variants: {
          '񅥡': [['񂇡񁲡:large' as HandshapeVariantKey], [], [], [], []],
          '񅧁': [['񂇡񁲡'], [], [], [], []],
          '񅪁': [['񀀡񀑁'], [], [], [], []],
        },
      },
      '񃀡񄺁񄢁񃹡': {
        key: '񃩁',
      },
      '񃀡񄢁񃹡񄺁': {
        key: '񅌁',
      },
    },
  },
  '񃈁': {
    primaryFingers: ['񅮡', '񄾡', '񄥁', '񃼡', '񃎁'],
    combinations: {
      '': {key: '񃈁'},
      '񅮡': {
        key: '񅮡',
        variants: {
          '񅭁': v({thumb: '񁁁񁂡:in' as HandshapeVariantKey}),
          '񅫡': v({thumb: '񁁁񁂡:out' as HandshapeVariantKey}),
          '񄄁': v({thumb: '񀕡񀧡', index: '񀕡񀧡'}),
        },
      },
      '񄥁': {
        key: '񄥁',
        variants: {
          '񄣡': v({thumb: '񁁁񁂡:out' as HandshapeVariantKey}),
        },
      },
      '񄾡': {
        key: '񄾡',
        variants: {
          '񄽁': v({thumb: '񁁁񁂡:in' as HandshapeVariantKey}),
          '񄻡': v({thumb: '񁁁񁂡:out' as HandshapeVariantKey}),
        },
      },
      '񅮡񄾡': {
        key: '񃯁',
        variants: {
          '񃭡': v({thumb: '񁁁񁂡:out' as HandshapeVariantKey}),
        },
      },
      '񄾡񄥁': {key: '񄍁'},
      '񄥁񃼡': {key: '񃵁'},
      '񄾡񄥁񃼡': {key: '񃡡'},
      '񄥁񃼡񃎁': {key: '񀈁'},
    },
  },
  '񂇡': {
    primaryFingers: ['񁫁', '񂌁', '񂒁', '񂓡', '񂘁'],
    combinations: {
      '': {
        key: '񂇡',
        variants: {
          '񁲡': [['񂇡񁲡'], [], [], [], []],
          '񁵡': [['񂇡񁲡'], ['񀀡񀉡'], ['񀀡񀉡'], ['񀀡񀉡'], ['񀀡񀉡']],
          '񁸡': [['񂇡񁲡', '񀀡񀉡'], ['񀀡񀉡'], ['񀀡񀉡'], ['񀀡񀉡'], ['񀀡񀉡']],
          '񁻡': [['񂇡񁲡', '񅊡񅖡'], [], [], [], []],
          '񂃁': [['񂇡񁲡', '񅊡񅖡', '񀀡񀑁'], [], [], [], []],
          '񂄡': [['񂇡񁲡', '񀀡񀑁'], [], [], [], []],
          '񂆁': [['񂇡񁲡', '񀀡񀑁', '񀕡񀠁'], [], [], [], []],
        },
      },
      '񁫁': {
        key: '񁫁',
        variants: {
          '񁦡': [['񂇡񁲡'], [], [], [], []],
          '񁨁': [['񂇡񁲡', '񀀡񀉡'], [], [], [], []],
          '񁩡': [['񂇡񁲡', '񀀡񀑁'], [], [], [], []],
        },
      },
      '񂌁': {
        key: '񂌁',
        variants: {
          '񂏁': v({thumb: '񀀡񀉡'}),
          '񂐡': v({thumb: '񅊡񅖡'}),
        },
      },
      '񁫁񂓡': {
        key: '񁬡',
      },
      '񂌁񂓡': {
        key: '񂕁',
        variants: {
          '񂖡': v({thumb: '񀀡񀉡'}),
        },
      },
    },
  },
};

export const getFingerOptions = ({
  selectedRoot,
  selectedFingers,
}: Pick<Handshape, 'selectedRoot' | 'selectedFingers'>): Option<Finger>[] =>
  !selectedRoot || !(selectedRoot in fingerCombos)
    ? []
    : fingerCombos[selectedRoot].primaryFingers.map((key, index) => ({
        key,
        label: Finger.keys[index],
        selected: Boolean(selectedFingers[Finger.keys[index]]),
      }));

export const getSelectedFingerOptions = (sign: Handshape): Option<Finger>[] =>
  getFingerOptions(sign).filter((option) => option.selected);

export const getSelectedComboKey = (sign: Handshape) =>
  getSelectedFingerOptions(sign)
    .map((option) => option.key)
    .join('');

export const getSelectedCombination = (
  sign: Handshape
): {comboKey: string; combination?: FingerCombination} => {
  if (!sign.selectedRoot) {
    return {comboKey: ''};
  }
  const comboKey = getSelectedComboKey(sign);
  return {
    comboKey,
    combination: fingerCombos[sign.selectedRoot]?.combinations[comboKey],
  };
};
