import MoveAudio from '../assets/audios/move-self.mp3'
import CaptureAudio from '../assets/audios/capture.mp3'
import CastleAudio from '../assets/audios/castle.mp3'
import NotifyAudio from '../assets/audios/notify.mp3'
import PromoteAudio from '../assets/audios/promote.mp3'
import CheckAudio from '../assets/audios/move-check.mp3'

const playAudio = (src) => {
    const audio = new Audio(src)
    audio.oncanplaythrough = () => {
        const playPromise = audio.play()
        playPromise.catch(() => {})
    }
}

export const check = () => playAudio(CheckAudio)
export const capture = () => playAudio(CaptureAudio)
export const castle = () => playAudio(CastleAudio)
export const notify = () => playAudio(NotifyAudio)
export const promote = () => playAudio(PromoteAudio)
export const move = () => playAudio(MoveAudio)
