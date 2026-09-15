export type Situation={
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    image_url: string | null;
    background: string;
    is_popular: number
}

export type Section = {
  id: number;
  situation_id: number;
  name: string;
  description: string;
  sort_order: number;
};

export type Phrase = {
  id: number;
  section_id: number;
  hindi_text: string;
  english_text: string;
  better_english: string | null;
  audio_url: string | null;
  mindset_tip: string | null;
  mindset_image_url: string | null;
  example_english: string | null;
  example_hindi: string | null;
  sort_order: number;
};

export type PhraseAlternative = {
  id: number;
  phrase_id: number;
  english_text: string;
  description: string | null;
  audio_url: string | null;
  sort_order: number;
};


// share both types phrase and PhraseAlternative
export type PhraseDetail = Phrase & {
  alternativeRows: PhraseAlternative[];
};