import blueLadyImg from '../assets/blue_lady.jpg';
import cakeImg from '../assets/cake.jpg';
import dogImg from '../assets/dog.jpg';
import dolphinImg from '../assets/dolphin.jpg';
import foxImg from '../assets/fox.jpg';
import giftImg from '../assets/gift.jpg';
import kidReadingImg from '../assets/kid_reading.png';
import purpleLadyImg from '../assets/purple_lady.jpg';

export const CARD_IMAGES: Record<number, {image: string, alt: string}> = {
  1: {image: blueLadyImg, alt: "image of a lady in blue"},
  2: {image: cakeImg, alt: "image of a cake"},
  3: {image: dogImg, alt: "image of a dog"},
  4: {image: dolphinImg, alt: "image of a dolphin"},
  5: {image: foxImg, alt: "image of a fox"},
  6: {image: giftImg, alt: "image of a wrapped gift"},
  7: {image: kidReadingImg, alt: "image of a kid reading a book while sitting on top of a pile of books"},
  8: {image: purpleLadyImg, alt: "image of a lady in purple"}
}