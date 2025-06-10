import team9 from '@src/assets/img/team/9.webp';
import team14 from '@src/assets/img/team/14.webp';
import team23 from '@src/assets/img/team/23.webp';
import team27 from '@src/assets/img/team/27.webp';
import team30 from '@src/assets/img/team/30.webp';
import team59 from '@src/assets/img/team/59.webp';
import team62 from '@src/assets/img/team/62.webp';
import gallery17 from '@src/assets/img/gallery/17.png';
import gallery18 from '@src/assets/img/gallery/18.png';
import gallery19 from '@src/assets/img/gallery/19.png';
import gallery20 from '@src/assets/img/gallery/20.png';
import gallery21 from '@src/assets/img/gallery/21.png';
import gallery22 from '@src/assets/img/gallery/22.png';
import gallery23 from '@src/assets/img/gallery/23.png';
import gallery24 from '@src/assets/img/gallery/24.png';
import gallery25 from '@src/assets/img/gallery/25.png';
import gallery26 from '@src/assets/img/gallery/26.png';
import img1 from '@src/assets/img/gallery/11.png';
import img2 from '@src/assets/img/gallery/12.png';
import img3 from '@src/assets/img/gallery/13.png';
import img4 from '@src/assets/img/gallery/14.png';
import img5 from '@src/assets/img/gallery/15.png';
import img6 from '@src/assets/img/gallery/16.png';
export const feedPosts = [
  {
    id: 1,
    author: {
      name: 'Zingko Kudobum',
      avatar: team59
    },
    time: '35 mins ago',
    location: 'Consett, UK',
    caption: 'Some paintings I love',
    images: [
      {
        cols: 3,
        src: gallery17
      },
      {
        cols: 3,
        src: gallery18
      },
      {
        cols: 6,
        src: gallery19
      }
    ],
    comments: [
      {
        name: 'Mamur Fechetti',
        avatar: team23,
        time: '35 mins ago',
        comment:
          'How long did it take to create this? It appears that you quickly produced the second one.',
        reply: [
          {
            name: 'Zingko Kudobum',
            avatar: team62,
            time: '5 mins ago',
            comment: `I am so clever that sometimes I don't understand a single word of what I am saying.`
          }
        ]
      }
    ],
    interactions: {
      likes: 345,
      comments: 45,
      shares: 56
    }
  },
  {
    id: 2,
    author: {
      name: 'Zingko Kudobum',
      avatar: team30
    },
    time: '35 mins ago',
    caption: `A guy enters a bakery while carrying a 25-pound haddock.
      He asks the baker if he makes fish cakes. The rather perplexed baker responds in the negative.
      The guy responds "That's unfortunate.Today is his birthday"`,
    interactions: {
      likes: 23,
      comments: 9,
      shares: 3
    }
  },
  {
    id: 3,
    author: {
      name: 'Zingko Kudobum',
      avatar: team59
    },
    time: '35 mins ago',
    location: 'Consett, UK',
    caption: 'Some paintings I love',
    images: [
      {
        cols: 3,
        src: gallery20
      },
      {
        cols: 3,
        src: gallery21
      }
    ],
    comments: [
      {
        name: 'Mamur Fechetti',
        avatar: team23,
        time: '35 mins ago',
        comment:
          'Time is the best teacher; Unfortunately it kills all its students!',
        reply: [
          {
            name: 'Zingko Kudobum',
            avatar: team62,
            time: '5 mins ago',
            comment: 'If you’re too open-minded, your brains will fall out.!'
          }
        ]
      }
    ],
    interactions: {
      likes: 345,
      comments: 45,
      shares: 56
    }
  }
];
export const profilePosts = [
  {
    id: 1,
    author: {
      name: 'Erza Bridgest',
      avatar: team9
    },
    time: '35 mins ago',
    location: 'Mustafar, British Columbia',
    caption: 'Melancholy is sadness that has taken on lightness.',
    images: [
      {
        cols: 3,
        src: gallery22
      },
      {
        cols: 3,
        src: gallery23
      },
      {
        cols: 6,
        src: gallery24
      }
    ],
    comments: [
      {
        name: 'Mamur Fechetti',
        avatar: team30,
        time: '35 mins ago',
        comment:
          'How long did it take to create this? It appears that you quickly produced the second one.',
        reply: [
          {
            name: 'Zingko Kudobum',
            avatar: team62,
            time: '5 mins ago',
            comment: `I am so clever that sometimes I don't understand a single word of what I am saying.`
          }
        ]
      }
    ],
    interactions: {
      likes: 345,
      comments: 45,
      shares: 56
    }
  },
  {
    id: 2,
    author: {
      name: 'Erza Bridgest',
      avatar: team9
    },
    time: '3 days ago',
    location: 'Lothal, USA',
    caption: `A guy enters a bakery while carrying a 25-pound haddock.
      He asks the baker if he makes fish cakes. The rather perplexed baker responds in the negative.
      The guy responds "That's unfortunate.Today is his birthday"`,
    interactions: {
      likes: 23,
      comments: 9,
      shares: 3
    }
  },
  {
    id: 3,
    author: {
      name: 'Zingko Kudobum',
      avatar: team9
    },
    time: '35 mins ago',
    location: 'Consett, UK',
    caption: 'Fear can hold you prisoner. Hope can set you free. - King',
    images: [
      {
        cols: 3,
        src: gallery25
      },
      {
        cols: 3,
        src: gallery26
      }
    ],
    comments: [
      {
        name: 'Sutanuka Gomez',
        avatar: team14,
        time: '35 mins ago',
        comment:
          'Time is the best teacher; Unfortunately it kills all its students!',
        reply: [
          {
            name: 'Zingko Kudobum',
            avatar: team27,
            time: '5 mins ago',
            comment: 'If you’re too open-minded, your brains will fall out.!'
          }
        ]
      }
    ],
    interactions: {
      likes: 345,
      comments: 45,
      shares: 56
    }
  }
];
export const socialPhotos = [img1, img2, img3, img4, img5, img6];
