class VideoFile {
  constructor(url) {
    this.url = url
  }
  getPromise() {
    const url = this.url
    return new Promise(function(resolve, reject) {
      var x = document.createElement('VIDEO')
      x.oncanplaythrough = function() {
        resolve({
          duration: this.duration,
          width: this.videoWidth,
          height: this.videoHeight,
          name: this.name
        })
      }
      x.onerror = function(err) {
        reject(err)
      }
      x.setAttribute('src', url)
    })
  }
  async getInfo() {
    let videoFileInfo = null
    const promise = this.getPromise()
    await promise.then((res) => {
      videoFileInfo = res
    })
    return videoFileInfo
  }
}
export default VideoFile
