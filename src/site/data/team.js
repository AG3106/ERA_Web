// Team data. Photos are web-sized copies (see src/assets/optimized/team) of the
// originals in src/assets/team.
const photos = import.meta.glob('../../assets/optimized/team/*.jpg', {
  eager: true,
  import: 'default',
});
const photo = (slug) => photos[`../../assets/optimized/team/${slug}.jpg`];

export const currentHeads = [
  {
    name: 'Aayush Gajeshwar',
    email: 'aayushk24@iitk.ac.in',
    image: photo('aayush'),
    github: 'https://github.com/AG3106',
    instagram: 'https://www.instagram.com/aayush.g06/',
    linkedin: 'https://www.linkedin.com/in/aayush-gajeshwar-313017331',
  },
  {
    name: 'Arnab Datta',
    email: 'arnabd24@iitk.ac.in',
    image: photo('arnab-datta'),
    github: 'https://github.com/DattaArnab',
    instagram: 'https://www.instagram.com/24arnab/',
    linkedin: 'https://www.linkedin.com/in/arnab-datta-136290317/',
  },
  {
    name: 'Pranesh S',
    email: 'pranesh24@iitk.ac.in',
    image: photo('pranesh'),
    github: 'https://github.com/Pranesh-hub/',
    instagram: 'https://instagram.com/01pranesh',
    linkedin: 'https://www.linkedin.com/in/pranesh-s-yes',
  },
  {
    name: 'Sushil Krishna K',
    email: 'sushilk24@iitk.ac.in',
    image: photo('sushil-krishna-k'),
    github: 'https://github.com/k-sushil78569',
    linkedin: 'https://www.linkedin.com/in/sushil-krishna-8170a2210/',
  },
];

export const currentSTMs = [
  {
    name: 'Rattandeep Singh Puar',
    email: 'rattandeep24@iitk.ac.in',
    image: photo('rattandeep-singh-puar'),
    github: 'https://github.com/Rattandeep-Singh',
    linkedin: 'https://www.linkedin.com/in/rattandeep-singh-puar-1a473a1b9',
  },
];

export const juniorMembers = [
  {
    name: 'Aadya V R',
    email: 'aadyavr25@iitk.ac.in',
    image: photo('aadya'),
    github: 'https://github.com/aadyavr',
    instagram: 'https://www.instagram.com/aadya_.a?igsh=MWk2bDFpajF0Yjl1eQ==',
    linkedin: 'https://www.linkedin.com/in/aadya-v-r-23073a389/',
  },
  {
    name: 'Ishita Singh',
    email: 'ishitasi25@iitk.ac.in',
    image: photo('ishita'),
    github: 'https://github.com/ishitasi1304',
    instagram: 'https://www.instagram.com/sirignatiusthethird?igsh=MXNjY2xjcnJscHdjaw==',
    linkedin: 'https://www.linkedin.com/in/ishita-singh-947012341',
  },
  {
    name: 'Lakshya Agarwal',
    email: 'lakshyaag25@iitk.ac.in',
    image: photo('lakshya'),
    github: 'https://github.com/lava6479',
    instagram: 'https://www.instagram.com/lakshyaag25?igsh=MXAyOWtuNzhpbGt3dQ==',
    linkedin: 'https://www.linkedin.com/in/lakshya-agarwal-829847381',
  },
  {
    name: 'Lavanya Prakash',
    email: 'lprakash25@iitk.ac.in',
    image: photo('lavanya-prakash'),
    github: 'https://github.com/lavanyap-2107',
    instagram: 'https://www.instagram.com/p.lavanya.02?igsh=c3cxMzk1aHhhemJh',
    linkedin: 'https://www.linkedin.com/in/lavanya-prakash-11abb536b',
  },
  {
    name: 'Om Upadhyaya',
    email: 'omupadhyaya25@iitk.ac.in',
    image: photo('om-upadhyaya'),
    github: 'https://github.com/OmUpadhyaya',
    linkedin: 'https://www.linkedin.com/in/om-upadhyaya-383724240/',
  },
  {
    name: 'Praneel Pathak',
    email: 'ppraneel25@iitk.ac.in',
    image: photo('praneel-pathak'),
    github: 'https://github.com/PythonCodePythonSnake',
    instagram: 'https://www.instagram.com/praneel_lazy/',
    linkedin: 'https://www.linkedin.com/in/praneel-pathak-255926392',
  },
  {
    name: 'Soham Nandi',
    email: 'soham25@iitk.ac.in',
    image: photo('soham-nandi'),
    github: 'https://github.com/soham-nandi06',
    instagram: 'https://www.instagram.com/soham_n06',
    linkedin: 'https://www.linkedin.com/in/soham-nandi-354830369',
  },
  {
    name: 'Srivanth Guntha',
    email: 'gsrivanthsai25@iitk.ac.in',
    image: photo('srivanth-guntha'),
    github: 'https://github.com/srivanth123',
    instagram: 'https://www.instagram.com/srivanth.g_17?igsh=MTl5MGMycmoyemY3Mw==',
    linkedin: 'https://www.linkedin.com/in/srivanth-guntha-8228693b0',
  },
  {
    name: 'Sudhanva',
    email: 'chsudhanva25@iitk.ac.in',
    image: photo('sudhanv'),
    github: 'https://github.com/chsudhanva790-coder',
    instagram: 'https://www.instagram.com/sudhanva790/',
    linkedin: 'https://www.linkedin.com/in/sudhanva-c-h-8211b1377/',
  },
  {
    name: 'Surendar V',
    email: 'surendar25@iitk.ac.in',
    image: photo('surendar'),
    github: 'https://github.com/surendar92',
    instagram: 'https://www.instagram.com/surendar_92__/',
    linkedin: 'https://www.linkedin.com/in/surendar-v-b354a1375/',
  },
  {
    name: 'Suryansh Sanatan',
    email: 'suryanshs25@iitk.ac.in',
    image: photo('suryansh'),
    github: 'https://github.com/suryanshsanatan2096-cmyk',
    instagram: 'https://www.instagram.com/sanatansuryansh_iitk_25?igsh=ejNidXExNWwwdjc=',
    linkedin: 'https://www.linkedin.com/in/suryansh-sanatan-5945221b5',
  },
  {
    name: 'Yash Jatil',
    email: 'yashj25@iitk.ac.in',
    image: photo('yash-jatil'),
    github: 'https://github.com/studentyash36',
    instagram: 'https://www.instagram.com/yashjatil?igsh=ZGFuZnAwMnUzYml1',
    linkedin: 'https://www.linkedin.com/in/yash-jatil-56376a373',
  },
];

// The 2022-23 entries in the old site pointed at placeholder profile URLs
// (github.com/pastheadA etc.), so only their names and emails are kept.
export const pastHeads = [
  {
    year: '2024–25',
    members: [
      {
        name: 'Mayank Agrawal',
        email: 'mayanka22@iitk.ac.in',
        image: photo('2024-25head1'),
        github: 'https://github.com/Mayank534',
        instagram: 'https://www.instagram.com/_.mayank_agrawal._/',
        linkedin: 'https://www.linkedin.com/in/mayank-agrawal-209085254/',
      },
      {
        name: 'Nikhil Gupta',
        email: 'nikhilg@iitk.ac.in',
        image: photo('2024-25head2'),
        github: 'https://github.com/nikhilg2603',
        instagram: 'https://www.instagram.com/nikhil_gupta_36/',
        linkedin: 'https://www.linkedin.com/in/nikhil-gupta-970710279/',
      },
      {
        name: 'Debraj Karmakar',
        email: 'debrajk@iitk.ac.in',
        image: photo('2024-25head3'),
        github: 'https://github.com/debrajk22',
        instagram: 'https://www.instagram.com/debraj___k/',
        linkedin: 'https://www.linkedin.com/in/debraj-karmakar-a3758a255/',
      },
    ],
  },
  {
    year: '2023–24',
    members: [
      {
        name: 'Dhruva Singh Sachan',
        email: 'dhruvass21@iitk.ac.in',
        image: photo('21head1'),
        github: 'https://github.com/dhruv0x0x0',
        instagram: 'https://www.instagram.com/dhruv0x0/',
        linkedin: 'https://www.linkedin.com/in/dhruva-singh-sachan-366b17227/',
      },
      {
        name: 'Emaad Ahmed',
        email: 'emaada21@iitk.ac.in',
        image: photo('21head2'),
        instagram: 'https://www.instagram.com/emmddxx/',
        linkedin: 'https://www.linkedin.com/in/emaadahmedx4/',
      },
      {
        name: 'Kartik Kulkarni',
        email: 'kartik21@iitk.ac.in',
        image: photo('21head3'),
        github: 'https://github.com/kartik-iitk',
        instagram: 'https://www.instagram.com/kartikkulkarni27/',
        linkedin: 'https://www.linkedin.com/in/kartikkulkarni23/',
      },
      {
        name: 'Rishi Agarwal',
        email: 'rishi21@iitk.ac.in',
        image: photo('21head4'),
        github: 'https://github.com/LegendaryGene',
        instagram: 'https://www.instagram.com/_rishi_agarwal_/',
        linkedin: 'https://www.linkedin.com/in/-rishi-agarwal-/',
      },
    ],
  },
  {
    year: '2022–23',
    members: [
      { name: 'Nishi Mehta', email: 'nishim20@iitk.ac.in', image: photo('y20-head1') },
      { name: 'Shubham Mittal', image: photo('y20-head2') },
      { name: 'Aditya Jain', email: 'adityajain20@iitk.ac.in', image: photo('y20-head3') },
      { name: 'Tejas Chikoti', email: 'chikoti20@iitk.ac.in', image: photo('y20-head4') },
      { name: 'Yukkta Seelam', email: 'yukktas20@iitk.ac.in', image: photo('y20-head5') },
    ],
  },
];
