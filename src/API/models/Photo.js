function Photo({ path, eTag, lastModified, size, contentType }) {
    this.path = path
    this.eTag = eTag
    this.lastModified = lastModified
    this.size = size
    this.contentType = contentType
}

export default Photo