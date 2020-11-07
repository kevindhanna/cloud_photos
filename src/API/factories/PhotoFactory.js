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

const PhotoFactory = (data) => {
    photos = []
    data.multistatus.response.forEach((item)=>{
        if(!Array.isArray(item.propstat)) {
            item.propstat = [item.propstat]
        } 
        let props = extractProps(item.propstat)
        let photo = new Photo({
            ...props,
            path: item.href
        })
        if (photo.contentType && photo.contentType.includes("image")) {
            photos.push(photo)
        }
    })

    return photos
}

const extractProps = (propstat) => {
    let properties = {}
    propstat.forEach(({ prop, status }) => {
        if (status.includes("200")) {
            for (const key in prop) {
                properties[PROP_KEYS[key]] = convertValue(key, prop[key])
            }
        }
    });
    
    return properties
}

const convertValue = (key, val) => {
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
export default PhotoFactory