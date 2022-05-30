'use strict'
module.exports = {
    params(key) {
        const method = this.request.method
        if (method === 'POST') {
            return key ? this.request.body[key] : this.request.body
        } else if (method === 'GET') {
            return key ? this.query[key] : this.query
        }
    },
}
