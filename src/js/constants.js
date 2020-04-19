export const pageStatus = {
  pageMode: '',
  category: '',
};

export const emptyArr = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];

export const appStats = {
  'Action (set A)': [],

  'Action (set B)': [],

  'Action (set C)': [],

  Adjective: [],

  'Animal (set A)': [],

  'Animal (set B)': [],

  Clothes: [],

  Emotion: [],
};

export const pagesData = {
  categories: ['Main Page', 'Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotion'],

  'Main Page': [['dance.jpg', 'open.jpg', 'play.jpg', 'cold.jpg', 'bird.jpg', 'chicken.jpg', 'blouse.jpg', 'happy.jpg'],
    ['Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotion']],
  'Action (set A)': [['cry.jpg', 'dance.jpg', 'dive.jpg', 'draw.jpg', 'sit.jpg', 'jump.jpg', 'laugh.jpg', 'fly.jpg'],
    ['cry', 'dance', 'dive', 'draw', 'sit', 'jump', 'laugh', 'fly'],
    ['плакать', 'танцевать', 'нырять', 'рисовать', 'сидеть', 'прыгать', 'смеяться', 'летать']],

  'Action (set B)': [['open.jpg', 'point.jpg', 'skip.jpg', 'smile.jpg', 'ride.jpg', 'swim.jpg', 'sing.jpg', 'eat.jpg'],
    ['open', 'point', 'skip', 'smile', 'ride', 'swim', 'sing', 'eat'],
    ['открыть', 'указывать', 'скакать', 'улыбаться', 'ездить', 'плавать', 'петь', 'есть']],

  'Action (set C)': [['play.jpg', 'build.jpg', 'break.jpg', 'hit.jpg', 'cut.jpg', 'walk.jpg', 'read.jpg', 'hug.jpg'],
    ['play', 'build', 'break', 'hit', 'cut', 'walk', 'read', 'hug'],
    ['играть', 'строить', 'ломать', 'ударять', 'резать', 'ходить', 'читать', 'обнимать']],

  Adjective: [['cold.jpg', 'dirty.jpg', 'big.jpg', 'little.jpg', 'long.jpg', 'sweet.jpg', 'hot.jpg', 'funny.jpg'],
    ['cold', 'dirty', 'big', 'little', 'long', 'sweet', 'hot', 'funny'],
    ['холодный', 'грязный', 'большой', 'маленький', 'длинный', 'сладкий', 'горячий', 'забавный']],

  'Animal (set A)': [['bird.jpg', 'cat.jpg', 'chick.jpg', 'dog.jpg', 'dolphin.jpg', 'fish.jpg', 'frog.jpg', 'giraffe.jpg'],
    ['bird', 'cat', 'chick', 'dog', 'dolphin', 'fish', 'frog', 'giraffe'],
    ['птица', 'кот', 'цыплёнок', 'собака', 'дельфин', 'рыба', 'лягушка', 'жираф']],

  'Animal (set B)': [['chicken.jpg', 'horse.jpg', 'lion.jpg', 'mouse.jpg', 'pig.jpg', 'rabbit.jpg', 'sheep.jpg', 'turtle.jpg'],
    ['chicken', 'horse', 'lion', 'mouse', 'pig', 'rabbit', 'sheep', 'turtle'],
    ['курица', 'лошадь', 'лев', 'мышь', 'свинья', 'кролик', 'овечка', 'черепаха']],

  Clothes: [['blouse.jpg', 'boot.jpg', 'coat.jpg', 'dress.jpg', 'shirt.jpg', 'shoe.jpg', 'skirt.jpg', 'pants.jpg'],
    ['blouse', 'boot', 'coat', 'dress', 'shirt', 'shoe', 'skirt', 'pants'],
    ['блузка', 'ботинок', 'пальто', 'платье', 'рубашка', 'ботинок', 'юбка', 'брюки']],

  Emotion: [['angry.jpg', 'happy.jpg', 'sad.jpg', 'scared.jpg', 'tired.jpg', 'surprised.jpg', 'regret.jpg', 'shy.jpg'],
    ['angry', 'happy', 'sad', 'scared', 'tired', 'surprised', 'regret', 'shy'],
    ['сердитый', 'счастливая', 'грустный', 'напугана', 'устала', 'удивлены', 'сожалеем', 'стесняется']],
};

export const mainImages = document.getElementById('main-images');
export const navigation = document.getElementById('navigation');
export const audioCollection = [];
