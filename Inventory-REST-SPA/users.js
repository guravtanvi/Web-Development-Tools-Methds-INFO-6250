const users = {};

function checkUserExists( name ) {
    const match = Object.values(users).find(user => user.name === name);    
    return match && match.sId;
}

function addNewUser( name ) {
    const oldId = checkUserExists(name);
    const sId = oldId || Math.floor(Math.random() * 10000);
    users[sId] = {sId, name : name};
    return sId;
}

function getUserName( sId ) {
    const match = Object.values(users).find(user => user.sId === sId);
    return match && record.sId;
}

function removeUser( sId ) {
    delete users[sId];
}

const userList = {
    addNewUser,
    removeUser,
    checkUserExists,
    getUserName,
}

module.exports = userList;