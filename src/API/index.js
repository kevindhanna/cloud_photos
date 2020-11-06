import Base64 from 'Base64'
import parser from 'fast-xml-parser'

export default class API {
    constructor() {
        this.headers = null
        this.rootFolder = null
    }

    async init(settings) {
        let str = `${settings.username}:${settings.password}`
        this.rootFolder = `${settings.service}/remote.php/dav/files/${settings.username}`
        this.headers = {
            Accept: "text/plain",
            Authorization: `Basic ${Base64.btoa(str)}`
        }
    }

    async getFolderContents(path, depth ) {
        let response = await fetch(this.rootFolder + path, {
            method: "PROPFIND",
            headers: this.headers,
            responseType: "text" 
        })
        if (response.ok) {
            let xml = await response.text()
            let json = parser.parse(xml, {
                arrayMode: false,
                ignoreNameSpace: true
            })
            json.multistatus.response.map((thing)=>console.log(thing))
        } else {
            console.log('shits fucked')
        }
    }

    isInitialised() {
        return !!this.headers
    }
}