function Photo({ id, path, eTag, lastModified, size, contentType, isRemote }) {
    this.id = id
    this.path = path
    this.eTag = eTag
    this.lastModified = lastModified
    this.size = size
    this.contentType = contentType
    this.isRemote = isRemote
}

export default Photo