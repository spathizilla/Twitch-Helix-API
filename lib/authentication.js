const queryString = require("query-string");
const request = require("./request");
const helpers = require("./helpers");

module.exports = {
    getAccessToken: (data) => {
        return new Promise((resolve, reject) => {
            if (!data || !data.client_secret) {
                resolve(helpers.generatePayload(400, "bad_request", "You must specify a client secret.", null))
            }
            else {
                queries = queryString.stringify({ client_id: data.client_id, client_secret: data.client_secret, grant_type: "client_credentials" });
                request.postHeaders("https://id.twitch.tv/oauth2/token?" + queries, {}).then(function(data) {
                    resolve(data);
                });
            }
        });
    },
    checkToken: (data) => {
        return new Promise((resolve, reject) => {
            if (!data || !data.token) {
                resolve(helpers.generatePayload(400, "bad_request", "You must specify an authorization token.", null))
            }
            else {
                request.getLegacy("https://id.twitch.tv/oauth2/validate", { token: data.token }).then(function(data) {
                    resolve(helpers.generatePayload(200, "success", "OK", data));
                });
            }
        });
    }
};
