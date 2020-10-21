import '../assets/styles/index.scss'
import Ias from '../assets/scripts/ias'
import image0 from '../assets/images/cover.jpg'
import image1 from '../assets/images/1.jpg'
import image2 from '../assets/images/2.jpg'
import image3 from '../assets/images/3.jpg'
import image4 from '../assets/images/4.jpg'
import image5 from '../assets/images/5.jpg'
import image6 from '../assets/images/6.jpg'
import image7 from '../assets/images/7.jpg'
import image8 from '../assets/images/8.jpg'
import image9 from '../assets/images/9.jpg'
import image10 from '../assets/images/10.jpg'
import image11 from '../assets/images/11.jpg'
import image12 from '../assets/images/12.jpg'
import image13 from '../assets/images/13.jpg'
import image14 from '../assets/images/14.jpg'
import image15 from '../assets/images/15.jpg'
import image16 from '../assets/images/16.jpg'
import audio0 from '../assets/audios/0.mp3'
import audio1 from '../assets/audios/1.mp3'
import audio3 from '../assets/audios/3.mp3'
import audio4 from '../assets/audios/4.mp3'
import audio5 from '../assets/audios/5.mp3'
import audio6 from '../assets/audios/6.mp3'
import audio7 from '../assets/audios/7.mp3'
import audio8 from '../assets/audios/8.mp3'
import audio9 from '../assets/audios/9.mp3'
import audio10 from '../assets/audios/10.mp3'
import audio11 from '../assets/audios/11.mp3'
import audio12 from '../assets/audios/12.mp3'
import audio13 from '../assets/audios/13.mp3'
import audio14 from '../assets/audios/14.mp3'
import audio15 from '../assets/audios/15.mp3'
import audio16 from '../assets/audios/16.mp3'

const timeLine = [
  { image: image0, audio: audio0 },
  { image: image1, audio: audio1 },
  { image: image2, time: 2 },
  { image: image3, audio: audio3 },
  { image: image4, audio: audio4 },
  { image: image5, audio: audio5 },
  { image: image6, audio: audio6 },
  { image: image7, audio: audio7 },
  { image: image8, audio: audio8 },
  { image: image9, audio: audio9 },
  { image: image10, audio: audio10 },
  { image: image11, audio: audio11 },
  { image: image12, audio: audio12 },
  { image: image13, audio: audio13 },
  { image: image14, audio: audio14 },
  { image: image15, audio: audio15 },
  { image: image16, audio: audio16 }
]
new Ias({ el: 'ias-warp', timeLine })
