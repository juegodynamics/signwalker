import {Enum, EnumType, TupleSubset} from 'extensions';
      import {FingerShapeVariation, VariantIndex} from './variants';

      const DigitVariation = new Enum(
        '񀯁', '񀂁', '񄫁', '񄊁', '񃞡'
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

      
const IndexVariants = new VariantIndex(
          ['񀂁'],
e('񀔁',v('񀀡񀑁')),
e('񀋁',v('񀀡񀉡')),
e('񀩁',v('񀕡񀧡')),
);

const IndexMiddleVariants = new VariantIndex(
          ['񀂁', '񄫁'],
e('񀩁',v('񀕡񀧡')),
);

const IndexLittleVariants = new VariantIndex(
          ['񀂁', '񃞡'],
);

const IndexMiddleRingVariants = new VariantIndex(
          ['񀂁', '񄫁', '񄊁'],
);

const IndexMiddleLittleVariants = new VariantIndex(
          ['񀂁', '񄫁', '񃞡'],
e('񃿡',v('񀕡񀧡')),
);

const IndexRingVariants = new VariantIndex(
          ['񀂁', '񄊁'],
);

const IndexRingLittleVariants = new VariantIndex(
          ['񀂁', '񄊁', '񃞡'],
);

const MiddleRingVariants = new VariantIndex(
          ['񄫁', '񄊁'],
e('񅀁',v('񀀡񀉡')),
);

const MiddleRingLittleVariants = new VariantIndex(
          ['񄫁', '񄊁', '񃞡'],
e('񅀁',v('񀀡񀉡')),
);
