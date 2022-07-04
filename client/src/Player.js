import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'react-spotify-web-playback'

export default function Player({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false)

    useEffect(() => {
        setPlay(true)
    }, [trackUri])

    if (!accessToken) return null
    return (
        <SpotifyWebApi
            token={accessToken}
            showSaveIcon
            play={play}
            callback={state => {
                if (!state.isPlaying) setPlay(false)
            }}
            uris={trackUri ? [trackUri] : []}
        />
    )
}
