import '../styles/ias.scss'
import playCircle from '@fortawesome/fontawesome-free/svgs/solid/play-circle.svg'
import fastBackward from '@fortawesome/fontawesome-free/svgs/solid/fast-backward.svg'
import fastForward from '@fortawesome/fontawesome-free/svgs/solid/fast-forward.svg'
import music from '@fortawesome/fontawesome-free/svgs/solid/music.svg'
import pauseCircle from '@fortawesome/fontawesome-free/svgs/solid/pause-circle.svg'
import stepBackward from '@fortawesome/fontawesome-free/svgs/solid/step-backward.svg'
import stepForward from '@fortawesome/fontawesome-free/svgs/solid/step-forward.svg'
export default class Ias {
  constructor (props) {
    this.isStart = false // 是否已开始播放
    this.playing = false // 是否正在播放
    /* global Audio */
    this.audio = new Audio()
    this.audio.addEventListener('canplay', () => {
      if (this.isStart && this.playing) {
        this.audio.play()
      }
    })
    this.audio.addEventListener('play', () => {
    })
    this.audio.addEventListener('pause', () => {
    })
    this.audio.addEventListener('ended', () => {
      this.itemPlayFinish()
    })
    this.options = Object.assign({}, {
      el: '',
      timeLine: [],
      playState: 0, // 播放状态 0 自动播放 1 手动播放
      playIndex: 0 // 当前播放下标
    }, props)
    this.render()
  }

  timeLineItem (item, index) {
    const active = this.isStart && this.options.playIndex > index ? 'active' : ''
    return `<img src="${item.image}" class="ias-picture-item ${index === 0 ? 'cover' : ''} ${active}" style="z-index: ${this.options.timeLine.length - index}" />`
  }

  playStateView () {
    return (
      `
      <span id="ias-play-state-button">${this.options.playState ? '手动' : '自动'}播放</span>
      `
    )
  }

  startBtnView () {
    return (
      `
      <a id="ias-control-start-button"><img src="${playCircle}" /></a>
      `
    )
  }

  itemPlayFinish () {
    // 判断是否最后一个
    if (this.options.playIndex === this.options.timeLine.length - 1) {
      this.playing = false
      this.render()
      return false
    }
    if (this.options.playState === 0) {
      this.options.playIndex++
      this.render()
    } else {
      this.playing = false
      this.render()
    }
  }

  initControl () {
    return (`
      <div class="control">
        ${this.options.playState ? `
        <a id="ias-control-first-button" class="${this.options.playIndex === 0 ? 'disabled' : ''}"><img src="${fastBackward}" /></a>
        <a id="ias-control-pre-button" class="${this.options.playIndex === 0 ? 'disabled' : ''}"><img src="${stepBackward}" /></a>
        ` : ''}
        <a id="ias-control-play-button"><img src="${this.playing ? pauseCircle : playCircle}" /></a>
        ${this.options.playState ? `
        <a id="ias-control-next-button" class="${this.options.playIndex === this.options.timeLine.length - 1 ? 'disabled' : ''}"><img src="${stepForward}" /></a>
        <a id="ias-control-end-button" class="${this.options.playIndex === this.options.timeLine.length - 1 ? 'disabled' : ''}"><img src="${fastForward}" /></a>
        ` : ''}
        
      </div>
    `)
  }

  render () {
    let timeLineList = ''
    for (let i = 0; i < this.options.timeLine.length; i++) {
      timeLineList += this.timeLineItem(this.options.timeLine[i], i)
    }
    const control = this.initControl()
    const playState = this.playStateView()
    const startBtn = this.startBtnView()
    const ias = `
    <div id="ias">
      ${this.isStart ? playState : startBtn}
      ${this.options.timeLine[this.options.playIndex].audio && this.isStart ? `
        <a class="music-icon ${this.playing ? 'active' : ''}"><img src="${music}" /></a>
      ` : ''}
      <div class="ias-picture">
        ${timeLineList}
      </div>
      ${this.isStart ? control : ''}
    </div>
    `
    const elDom = document.getElementById(this.options.el)
    elDom.innerHTML = ias
    if (this.isStart) {
      if (this.playing) {
        this.play()
      }
      elDom.querySelector('#ias-control-play-button').addEventListener('click', () => {
        this.changePlaying()
      })
      elDom.querySelector('#ias-play-state-button').addEventListener('click', () => {
        this.changePlayState()
      })
      if (this.options.playState === 1) {
        elDom.querySelector('#ias-control-first-button').addEventListener('click', () => {
          this.toPlayIndex(0)
        })
        elDom.querySelector('#ias-control-pre-button').addEventListener('click', () => {
          if (this.options.playIndex <= 0) {
            return false
          }
          this.toPlayIndex(this.options.playIndex - 1)
        })
        elDom.querySelector('#ias-control-next-button').addEventListener('click', () => {
          if (this.options.playIndex >= this.options.timeLine.length - 1) {
            return false
          }
          this.toPlayIndex(this.options.playIndex + 1)
        })
        elDom.querySelector('#ias-control-end-button').addEventListener('click', () => {
          this.toPlayIndex(this.options.timeLine.length - 1)
        })
      }
    } else {
      elDom.querySelector('#ias-control-start-button').addEventListener('click', () => {
        this.start()
      })
    }
  }

  start () {
    this.isStart = true
    this.playing = true
    this.play()
    this.render()
  }

  play () {
    const item = this.options.timeLine[this.options.playIndex]
    if (item.audio) {
      this.audio.src = item.audio
    } else {
      setTimeout(() => {
        this.itemPlayFinish()
      }, item.time * 1000)
    }
  }

  changePlaying () {
    this.playing = !this.playing
    if (!this.playing) {
      this.audio.pause()
    }
    this.render()
  }

  changePlayState () {
    if (this.options.playState === 0) {
      this.options.playState = 1
    } else {
      this.options.playState = 0
    }
    this.playing = false
    this.audio.pause()
    this.render()
  }

  toPlayIndex (index) {
    if (this.options.playIndex === index) {
      return false
    }
    this.options.playIndex = index
    this.render()
  }
}
