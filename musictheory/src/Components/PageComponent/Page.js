import React from "react"
import "../PageComponent/page.css"
import {playChord, mute } from '../SoundComponent/Sound'
export default function Page() {
 

    return (
        <div>
            <h1>Click a button to hear chord</h1>
            <div class="chords">
                <button onClick={playChord([3,2,0,0,3,3])}>Play E major</button>
                <button onClick={playChord([null,0,2,2,2,0])}>Play A major</button>
                <button onClick={playChord([null,2,1,2,0,2])}>Play B7</button>
                <button onClick={mute()}>Mute</button>
            </div>
        </div>
    )
}

