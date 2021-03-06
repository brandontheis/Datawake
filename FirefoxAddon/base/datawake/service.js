var self = require("sdk/self");
var data = self.data;
var addOnPrefs = require("sdk/simple-prefs").prefs;
var requestHelper = require("./request-helper");

exports.getEntities = getEntities;
exports.getDomainExtractedEntities = getDomainExtractedEntities;
exports.getExternalLinks = getExternalLinks;
exports.getDomains = getDomains;
exports.getTeams = getTeams;
exports.getTrails = getTrails;
exports.createTrail = createTrail;
exports.getTeamMembers = getTeamMembers;
exports.createTeam = createTeam;
exports.removeTeamMember = removeTeamMember;
exports.addTeamMemeber = addTeamMember;
exports.getDomainPreview = getDomainPreview;
exports.uploadDomain = uploadDomain;
exports.removeDomain = removeDomain;


/**
 * Get trails for a team and domain
 * @param team_id
 * @param domain_id
 * @param callback
 */
function getTrails(team_id,domain_id,callback){
    var url = addOnPrefs.datawakeDeploymentUrl + "/trails";
    var params = {team_id:team_id, domain_id:domain_id};
    requestHelper.get(url,callback,params);
}


function createTrail(team_id,domain_id,name,description,callback){
    var url = addOnPrefs.datawakeDeploymentUrl + "/trails/create";
    var post_data = JSON.stringify({
        team_id: team_id,
        domain_id: domain_id,
        name: name,
        description: description
    });
    requestHelper.post(url, post_data, function (response) {
        callback(response);
    });

}

/**
 * Gets the valid teams for the current user from the server
 * @param callback Response callback.
 */
function getTeams(callback) {
    var url = addOnPrefs.datawakeDeploymentUrl + "/teams";
    requestHelper.get(url,callback);
}

function createTeam(name,description,callback){
    var url = addOnPrefs.datawakeDeploymentUrl + "/teams/create";
    var post_data = JSON.stringify({
        name: name,
        description: description
    });
    requestHelper.post(url, post_data, function (response) {
        callback(response);
    });
}

function addTeamMember(data,callback){
    var url = addOnPrefs.datawakeDeploymentUrl + "/teams/add-member";
    var post_data = JSON.stringify(data)
    requestHelper.post(url, post_data, function (response) {
        callback(response);
    });
}

function removeTeamMember(data,callback){
    var url = addOnPrefs.datawakeDeploymentUrl + "/teams/remove-member";
    var post_data = JSON.stringify(data)
    requestHelper.post(url, post_data, function (response) {
        callback(response);
    });
}



/**
 * Gets the list of all team members for a given team
 * @param team_id
 * @param callback
 */
function getTeamMembers(team_id,callback) {
    var url = addOnPrefs.datawakeDeploymentUrl + "/team-members";
    var data = {team_id:team_id}
    requestHelper.get(url,callback,data);
}

/**
 * Gets the domains from the server.
 * @param callback Response callback.
 */
function getDomains(team_id,callback) {
    var url = addOnPrefs.datawakeDeploymentUrl + "/domains";
    var params = {team_id:team_id}
    requestHelper.get(url,callback,params);
}


function uploadDomain(data,callback){
    var url = addOnPrefs.datawakeDeploymentUrl + "/domainupload/upload";
    var post_data = JSON.stringify(data);
    requestHelper.post(url,post_data,function(response){
        callback(response);
    })
}

function removeDomain(data,callback){
    var url = addOnPrefs.datawakeDeploymentUrl + "/domainupload/delete";
    var post_data = JSON.stringify(data);
    requestHelper.post(url,post_data,function(response){
        callback(response);
    })
}


function getDomainPreview(team_id,domain_id,callback){
    var url = addOnPrefs.datawakeDeploymentUrl + "/domainpreview";
    var params = {team_id:team_id,domain_id:domain_id,limit: 25}
    requestHelper.get(url,callback,params);
}


function getEntities(url, callback) {
    var entitiesUrl = addOnPrefs.datawakeDeploymentUrl + "/visited/entities";
    var post_data = JSON.stringify({
        url: url
    });
    requestHelper.post(entitiesUrl, post_data, function (response) {
        callback(response);
    });
}

function getDomainExtractedEntities(team_id,domain_id, url, callback){
    var entitiesUrl = addOnPrefs.datawakeDeploymentUrl + "/visited/extracted";
    var post_data = JSON.stringify({
        url: url,
        domain_id: domain_id,
        team_id: team_id
    });
    requestHelper.post(entitiesUrl, post_data, function (response) {
        callback(response);
    });
}


var externalLinks = null;

function getExternalLinks(callback) {
    if (externalLinks == null) {
        requestHelper.get(addOnPrefs.datawakeDeploymentUrl + "/tools/get", function (response) {
            externalLinks = response.json;
            callback(externalLinks);
        });
    } else {
        callback(externalLinks);
    }
}