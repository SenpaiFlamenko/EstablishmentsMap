export interface IPlaces {
  places: Place[];
}

export type Place = {
  name: string;
  photo: PhotoImages;
  price_level: string;
  ranking: string;
  awards: Award[];
  cuisine: Cuisine[];
  address: string;
  phone: string;
  web_url: string;
  website: string;
  longitude: number;
  latitude: number;
  rating: string;
  num_reviews: string;
};

type PhotoImages = {
  images: PhotoImagesLarge;
};

type PhotoImagesLarge = {
  large: Url;
};

type Url = {
  url: string;
};

type Award = {
  images: AwardImages;
  display_name: string;
};

type AwardImages = {
  small: string;
};

type Cuisine = {
  name: string;
};
