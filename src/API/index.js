import Base64 from 'Base64'
import parser from 'fast-xml-parser'
import PhotoFactory from './factories/PhotoFactory'
import { PermissionsAndroid, Platform } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll"

const PERMISSION = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

export default class API {
  constructor() {
    this.headers = null
    this.rootFolder = null
    this.serverUri = null
    this.token = null
    this.permissionGranted = false
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

  isInitialised() {
    return !!this.token
  }

  async getPhotos() {
    remote = await this._getRemotePhotos()
    local = await this._getLocalPhotos()
    return local.concat(remote)
  }

  async _hasAndroidPermission() {
    const hasPermission = this.permissionGranted || await PermissionsAndroid.check(PERMISSION);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    if (status === 'granted') {
      this.permissionGranted = true
    }
    return status === 'granted';
  }

    
  async _getLocalPhotos() {
    if (Platform.OS === "android" && !(await this._hasAndroidPermission())) {
    return
    }

    let photos = await CameraRoll.getPhotos({ 
      assetType: "All",
      first: 20,
      include: [
        "filename",
        "fileSize"
      ]
    })
    return PhotoFactory.fromLocalStorage(photos)
  }

  async _getRemotePhotos() {
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
        data = this._parseXml(xml)
        return PhotoFactory.fromDavSource(data)
    } else {
        console.log('shits fucked')
    }
  }

  _parseXml(xml) {
    return parser.parse(xml, {
        arrayMode: false,
        ignoreNameSpace: true
    })
  }
}

