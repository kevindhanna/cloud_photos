import Photo from '../models/Photo'

const PROP_KEYS = {
  getetag: "eTag",
  getlastmodified: "lastModified",
  "quota-available-bytes": "availableQuota",
  "quota-used-bytes": "size",
  resourcetype: "resourceType",
  getcontenttype: "contentType",
  getcontentlength: "size"
}

const fromDavSource = (data) => {
  photos = []
  data.multistatus.response.forEach((item)=>{
    if(!Array.isArray(item.propstat)) {
      item.propstat = [item.propstat]
    } 
    let props = _extractProps(item.propstat)
    let photo = new Photo({
      ...props,
      id: _uuidv4(),
      path: item.href,
      isRemote: true
    })
    if (photo.contentType && photo.contentType.includes("image")) {
      photos.push(photo)
    }
  })

  return photos
}

const _extractProps = (propstat) => {
  let properties = {}
  propstat.forEach(({ prop, status }) => {
    if (status.includes("200")) {
      for (const key in prop) {
        properties[PROP_KEYS[key]] = _convertValue(key, prop[key])
      }
    }
  });
  
  return properties
}

const _convertValue = (key, val) => {
  switch (key) {
    case "resourcetype":
      if (val === "") {
          return "child"
      } else {
          return "collection"
      }
      break;
    case "getlastmodified":
      return new Date(val)
    default:
      return val
      break;
  }
}

const fromLocalStorage = (data) =>  {
  return data.edges.map((file)=>{
    return new Photo({
      id: _uuidv4(),
      path: file.node.image.uri,
      eTag: null,
      lastModified: new Date(file.node.timestamp * 1000),
      size: file.node.image.fileSize,
      contentType: file.node.type,
      isRemote: false
    })
  })

}
const _uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const PhotoFactory = {
  fromDavSource: fromDavSource,
  fromLocalStorage: fromLocalStorage
}
export default PhotoFactory