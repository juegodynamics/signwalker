import {Enum, EnumType, TupleSubset} from 'extensions';
      import {FingerShapeVariation, VariantIndex} from './variants';

      const DigitVariation = new Enum(
        '񃀡', '񄺁', '񄢁', '񃹡', '񃌡'
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

      
const RootVariants = new VariantIndex(
          [],
e('񂽡',v('񀀡񀑁')),
e('񁱁',v('񀕡񀠁')),
e('񂹁',v('񂇡񁲡', '񀕡񀠁')),
e('񂺡',v('񂇡񁲡', '񀕡񀠁', '񅊡񅖡')),
e('񂀁',v('񂇡񁲡')),
);

const ThumbVariants = new VariantIndex(
          ['񃀡'],
e('񃃡',v('񀕡񀠁')),
e('񂿁',v('񂇡񁲡')),
e('񃂁',v('񂇡񁲡', '񀕡񀠁')),
e('񃅁',v('񀕡񀧡')),
e('񃆡',v('񁁁񁂡', '񀕡񀧡')),
);

const MiddleVariants = new VariantIndex(
          ['񄢁'],
e('񄂡',v('񅊡񅙡')),
);

const ThumbIndexVariants = new VariantIndex(
          ['񃀡', '񄺁'],
);

const ThumbMiddleVariants = new VariantIndex(
          ['񃀡', '񄢁'],
);

const ThumbRingVariants = new VariantIndex(
          ['񃀡', '񃹡'],
);

const ThumbLittleVariants = new VariantIndex(
          ['񃀡', '񃌡'],
);

const MiddleRingVariants = new VariantIndex(
          ['񄢁', '񃹡'],
);

const ThumbMiddleRingVariants = new VariantIndex(
          ['񃀡', '񄢁', '񃹡'],
);

const IndexMiddleRingVariants = new VariantIndex(
          ['񄢁', '񃹡', '񄺁'],
);

const IndexMiddleRingLittleVariants = new VariantIndex(
          ['񄺁', '񄢁', '񃹡', '񃌡'],
e('񅥡',v('񂇡񁲡')),
e('񅧁',v('񂇡񁲡')),
e('񅪁',v('񀀡񀑁')),
);

const ThumbIndexMiddleRingVariants = new VariantIndex(
          ['񃀡', '񄺁', '񄢁', '񃹡'],
);

const ThumbIndexMiddleRingVariants = new VariantIndex(
          ['񃀡', '񄢁', '񃹡', '񄺁'],
);
