import {Enum, EnumType, TupleSubset} from 'extensions';
      import {FingerShapeVariation, VariantIndex} from './variants';

      const DigitVariation = new Enum(
        '񅰁', '񀀡', '񄩡', '񄅡', '񃛡'
      );
      type DigitVariation = EnumType<typeof DigitVariation>;
      
      const ShapeVariation = Enum.union(DigitVariation, FingerShapeVariation);
      
      type ShapeVariantIndex = VariantIndex<typeof ShapeVariation>;
      const ShapeVariantIndex: typeof VariantIndex<typeof ShapeVariation> = (
        key,
        entries
      ) => VariantIndex(key, entries);
      
      const v = ShapeVariation.subset;
      const e = <
        CharacterTupleT extends readonly string[],
        VariationTupleT extends readonly string[]
      >(
        character: CharacterTupleT[number],
        variation: TupleSubset<VariationTupleT>
      ): [CharacterTupleT[number], TupleSubset<VariationTupleT>] => [
        character,
        variation,
      ];

      
const ThumbVariants = new VariantIndex(
          ['񅰁'],
e('񅳁',v('񀀡񀑁')),
e('񅴡',v('񀕡񀠁')),
e('񅶁',v('񀀡񀉡')),
e('񅷡',v('񅊡񅖡')),
e('񅹁',v('񁁁񁂡')),
e('񅺡',v('񁁁񁂡')),
e('񅼁',v('񁁁񁂡')),
e('񅽡',v('񁁁񁂡')),
e('񅿁',v('񁁁񁂡')),
e('񆀡',v('񁁁񁂡')),
e('񆂁',v('񁁁񁂡')),
e('񆃡',v('񁁁񁂡', '񀀡񀎁')),
);

const IndexVariants = new VariantIndex(
          ['񀀡'],
e('񀏡',v('񅊡񅢡')),
e('񀑁',v('񀀡񀑁')),
e('񀒡',v('񀀡񀑁')),
e('񀉡',v('񀀡񀉡')),
e('񀌡',v('񀀡񀉡', '񁁁񁂡')),
e('񀎁',v('񀀡񀎁')),
);

const MiddleVariants = new VariantIndex(
          ['񄩡'],
e('񄬡',v('񀀡񀎁')),
);

const RingVariants = new VariantIndex(
          ['񄅡'],
e('񄇁',v('񀀡񀎁')),
);

const LittleVariants = new VariantIndex(
          ['񃛡'],
e('񃝁',v('񁁁񁂡')),
e('񃣁',v('񀀡񀎁')),
e('񃤡',v('񀀡񀉡')),
e('񃦁',v('񅊡񅙡')),
);

const ThumbIndexVariants = new VariantIndex(
          ['񅰁', '񀀡'],
e('񅍡',v('񀀡񀑁')),
e('񅏁',v('񀕡񀠁')),
e('񅐡',v('񀀡񀉡')),
e('񅒁',v('񀀡񀉡')),
e('񅓡',v('񀀡񀉡')),
e('񅕁',v('񀀡񀑁')),
e('񅖡',v('񅊡񅖡')),
e('񅘁',v('񅊡񅖡', '񀀡񀉡')),
e('񅙡',v('񅊡񅙡')),
e('񅛁',v('񅊡񅙡')),
e('񅜡',v('between', '񅊡񅡁')),
e('񅟡',v('񁁁񁂡', '񅊡񅡁')),
e('񅡁',v('񅊡񅡁')),
);

const ThumbMiddleVariants = new VariantIndex(
          ['񅰁', '񄩡'],
);

const IndexMiddleVariants = new VariantIndex(
          ['񀀡', '񄩡'],
e('񀘡',v('񀀡񀉡')),
e('񀚁',v('񀀡񀎁')),
e('񀞡',v('񀀡񀑁')),
e('񀝁',v('񀀡񀑁')),
e('񀛡',v('񀀡񀑁')),
e('񀠁',v('񀕡񀠁')),
e('񀡡',v('񀀡񀉡', '񀕡񀠁')),
e('񀣁',v('񀕡񀠁', '񀀡񀉡')),
e('񀤡',v('񅊡񅢡', '񀕡񀠁')),
e('񀦁',v('񀀡񀑁', '񀕡񀠁')),
e('񀧡',v('񀕡񀧡')),
e('񀪡',v('񀕡񀧡', '񀀡񀉡')),
e('񀬁',v('񀕡񀧡', '񀀡񀉡')),
);

const ThumbRingVariants = new VariantIndex(
          ['񅰁', '񄅡'],
);

const IndexRingVariants = new VariantIndex(
          ['񀀡', '񄅡'],
);

const MiddleRingVariants = new VariantIndex(
          ['񄩡', '񄅡'],
e('񄐁',v('񀕡񀠁')),
e('񄑡',v('񀀡񀎁')),
);

const ThumbLittleVariants = new VariantIndex(
          ['񅰁', '񃛡'],
);

const IndexLittleVariants = new VariantIndex(
          ['񀀡', '񃛡'],
);

const MiddleLittleVariants = new VariantIndex(
          ['񄩡', '񃛡'],
);

const RingLittleVariants = new VariantIndex(
          ['񄅡', '񃛡'],
);

const ThumbIndexMiddleVariants = new VariantIndex(
          ['񅰁', '񀀡', '񄩡'],
e('񀼡',v('񅊡񅢡')),
e('񀾁',v('񅊡񅡁')),
e('񀿡',v('񅊡񅙡')),
e('񁁁',v('񀀡񀑁')),
e('񁂡',v('between', '񀀡񀑁')),
e('񁄁',v('񀕡񀠁')),
e('񁅡',v('񀕡񀠁')),
e('񁇁',v('񀀡񀉡', '񀕡񀠁')),
e('񁈡',v('񅊡񅙡')),
e('񁊁',v('񅊡񅙡')),
e('񀰡',v('񀀡񀉡')),
e('񀲁',v('񀀡񀉡')),
e('񀳡',v('񀀡񀉡')),
e('񀹡',v('񀀡񀑁')),
e('񀶡',v('񀀡񀑁')),
e('񀸁',v('񀕡񀠁', '񀀡񀑁')),
e('񀵁',v('񀀡񀑁')),
e('񀻁',v('񅊡񅖡')),
e('񁎡',v('񅊡񅖡', '񀕡񀠁')),
e('񁋡',v('񀀡񀑁', '񀕡񀠁')),
e('񁍁',v('񀕡񀧡')),
e('񁐁',v('񅊡񅖡', '񅊡񅢡', '񀕡񀠁')),
e('񁑡',v('񅊡񅢡')),
e('񁓁',v('񅊡񅢡')),
e('񁔡',v('񅊡񅡁')),
e('񁚡',v('񅊡񅡁')),
e('񁖁',v('񅊡񅡁', '񀀡񀑁')),
e('񁗡',v('񀀡񀑁', '񀀡񀉡')),
e('񁙁',v('񀀡񀑁', '񀀡񀉡')),
e('񁜁',v('񀀡񀑁', '񀕡񀠁')),
e('񁝡',v('񀀡񀑁', '񀕡񀠁')),
e('񁟁',v('񀀡񀑁', '񀕡񀠁')),
e('񁠡',v('񀀡񀑁')),
e('񁢁',v('񀀡񀑁', '񀕡񀧡')),
e('񁣡',v('񀀡񀑁', '񀕡񀧡')),
e('񁥁',v('񅊡񅙡', '񀀡񀑁')),
);

const ThumbIndexRingVariants = new VariantIndex(
          ['񅰁', '񀀡', '񄅡'],
);

const ThumbMiddleRingVariants = new VariantIndex(
          ['񅰁', '񄩡', '񄅡'],
);

const IndexMiddleRingVariants = new VariantIndex(
          ['񀀡', '񄩡', '񄅡'],
e('񃑁',v('񀀡񀉡')),
e('񃒡',v('񀕡񀠁')),
e('񃔁',v('񀕡񀠁', '񀀡񀑁')),
);

const ThumbIndexLittleVariants = new VariantIndex(
          ['񅰁', '񀀡', '񃛡'],
);

const ThumbMiddleLittleVariants = new VariantIndex(
          ['񅰁', '񄩡', '񃛡'],
);

const IndexMiddleLittleVariants = new VariantIndex(
          ['񀀡', '񄩡', '񃛡'],
e('񃾁',v('񀕡񀧡')),
);

const ThumbRingLittleVariants = new VariantIndex(
          ['񅰁', '񄅡', '񃛡'],
);

const IndexRingLittleVariants = new VariantIndex(
          ['񀀡', '񄅡', '񃛡'],
);

const MiddleRingLittleVariants = new VariantIndex(
          ['񄩡', '񄅡', '񃛡'],
);

const ThumbIndexMiddleRingVariants = new VariantIndex(
          ['񅰁', '񀀡', '񄩡', '񄅡'],
e('񃗁',v('񀀡񀑁')),
e('񃘡',v('񀀡񀉡')),
e('񃚁',v('񅊡񅡁')),
);

const ThumbIndexMiddleLittleVariants = new VariantIndex(
          ['񅰁', '񀀡', '񄩡', '񃛡'],
);

const ThumbIndexRingLittleVariants = new VariantIndex(
          ['񅰁', '񀀡', '񄅡', '񃛡'],
);

const ThumbMiddleRingLittleVariants = new VariantIndex(
          ['񅰁', '񄩡', '񄅡', '񃛡'],
);

const IndexMiddleRingLittleVariants = new VariantIndex(
          ['񀀡', '񄩡', '񄅡', '񃛡'],
e('񁨁',v('񀀡񀉡')),
e('񁩡',v('񀀡񀑁')),
e('񁫁',v('񀕡񀠁')),
e('񁬡',v('񀕡񀠁')),
e('񁯡',v('񀕡񀠁')),
);

const ThumbIndexMiddleRingLittleVariants = new VariantIndex(
          ['񅰁', '񀀡', '񄩡', '񄅡', '񃛡'],
e('񁵡',v('񀀡񀉡')),
e('񁸡',v('񀀡񀉡')),
e('񁻡',v('񅊡񅖡')),
e('񂃁',v('񅊡񅖡', '񀀡񀑁')),
e('񂄡',v('񀀡񀑁')),
e('񂆁',v('񀕡񀠁', '񀀡񀑁')),
);
