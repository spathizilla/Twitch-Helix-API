const restler = require("restler");
const index = require("../index");

function applyRateLimit(data, response) {
    Object.assign(data, {__ratelimit: {
        limit: +response.headers['ratelimit-limit'],
        remaining: +response.headers['ratelimit-remaining'],
        reset: +response.headers['ratelimit-reset'],
    }});
}

module.exports = {
    get: (url, data) => {
        return new Promise((resolve, reject) => {
            restler.get(url, {
                headers: {
                    "Client-ID": index.clientID,
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + index.token || ""
                }
            }).on("complete", function(data, response) {
                applyRateLimit(data, response);
                resolve(data);
            });
        });
    },
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            restler.post(url, {
                headers: {
                    "Client-ID": index.clientID,
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + index.token || ""
                },
                data: data
            }).on("complete", function(data, response) {
                applyRateLimit(data, response);
                resolve(data);
            });
        });
    },
    postHeaders: (url, data) => {
        return new Promise((resolve, reject) => {
            restler.post(url, {
                headers: {
                    "Client-ID": index.clientID,
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + index.token || ""
                },
                data: data
            }).on("complete", function(data, response) {
                applyRateLimit(data, response);
                resolve(data);
            });
        });
    },
    put: (url, data) => {
        return new Promise((resolve, reject) => {
            restler.put(url, {
                headers: {
                    "Client-ID": index.clientID,
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + index.token || ""
                },
                data: data
            }).on("complete", function(data, response) {
                applyRateLimit(data, response);
                resolve(data);
            });
        });
    },
    getLegacy: (url, data) => {
        return new Promise((resolve, reject) => {
            restler.get(url, {
                headers: {
                    "Client-ID": index.clientID,
                    "Accept": "application/vnd.twitchtv.v5+json",
                    "Content-Type": "application/json",
                    "Authorization": "OAuth " + index.token || ""
                }
            }).on("complete", function(data, response) {
                applyRateLimit(data, response);
                resolve(data);
            });
        });
    },
    postLegacy: (url, data) => {
        return new Promise((resolve, reject) => {
            restler.post(url, {
                headers: {
                    "Client-ID": index.clientID,
                    "Accept": "application/vnd.twitchtv.v5+json",
                    "Content-Type": "application/json",
                    "Authorization": "OAuth " + index.token || ""
                },
                data: data
            }).on("complete", function(data, response) {
                applyRateLimit(data, response);
                resolve(data);
            });
        });
    }
}
