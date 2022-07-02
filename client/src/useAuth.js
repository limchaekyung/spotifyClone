import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useAuth(code) {
    const [accessToken, setaccessToken] = useState()
    const [refreshToken, setrefreshToken] = useState()
    const [expiresIn, setexpiresIn] = useState()

    useEffect(() => {
        axios.post('http://localhost:3001/login', {
            code,
        }).then(res => {
            setaccessToken(res.data.accessToken)
            setrefreshToken(res.data.refreshToken)
            setexpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, "/")
        }).catch(() => {
            window.location = '/'
        })
    }, [code])

    useEffect(() => {
        axios.post('http://localhost:3001/refresh', {
            refreshToken,
        }).then(res => {
            setaccessToken(res.data.accessToken)
            setexpiresIn(res.data.expiresIn)
        }).catch(() => {
            window.location = '/'
        })
    }, [refreshToken, expiresIn])
    return accessToken
}
