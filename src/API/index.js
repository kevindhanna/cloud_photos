import Base64 from 'Base64'
import parser from 'fast-xml-parser'
import { useStateValue } from '../state'
import PhotoFactory from './factories/PhotoFactory'

export default class API {
    constructor() {
        this.headers = null
        this.rootFolder = null
        this.serverUri = null
        this.token = null
    }

    async init(settings) {
        this.rootFolder = `${settings.service}/remote.php/dav/files/${settings.username}`
        this.serverUri = settings.service
        let str = `${settings.username}:${settings.password}`
        this.token = Base64.btoa(str)
        this.headers = {
            Accept: "text/plain",
            Authorization: `Basic ${this.token}`,
        }
    }

    async getPhotos() {
        let response = await fetch(this.rootFolder, {
            method: "PROPFIND",
            headers: {
                ...this.headers,
                Depth: 99
            },
            responseType: "text"
        })

        if (response.ok) {
            let xml = await response.text()
            return this.parseXml(xml)
        } else {
            console.log('shits fucked')
        }
    }

    isInitialised() {
        return !!this.headers
    }

    parseXml(xml) {
        let data = parser.parse(xml, {
            arrayMode: false,
            ignoreNameSpace: true
        })
        
        return PhotoFactory(data)
    }
}