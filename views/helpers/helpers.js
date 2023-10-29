export default {
  block: function (name) {
    const blocks = this._blocks
    const content = blocks && blocks[name]
    return content ? content.join('\n') : null
  },
  contentFor: function (name, options) {
    const blocks = this._blocks || (this._blocks = {})
    const block = blocks[name] || (blocks[name] = []) // Changed this to [] instead of {}
    block.push(options.fn(this))
  }
}
