var contactURLArray = [];
var contactArray = [];
var loadingContact = 0;

function initApplication() {
    console.log('Starting Mustang V1!'); 
}

function loadIndex() {
    var indexRequest = new XMLHttpRequest();
    indexRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
    indexRequest.onload = function() {
        console.log("Index JSON:" + indexRequest.responseText);
        document.getElementById("indexID").innerHTML = indexRequest.responseText;
        contactIndex = JSON.parse(indexRequest.responseText);
        contactURLArray.length = 0;
        for (i=0; i<contactIndex.length; i++) {
            contactURLArray.push(contactIndex[i].ContactURL);
        }
        console.log("ContactURLArray: " + JSON.stringify(contactURLArray));
    }
    indexRequest.send();
}

function loadContacts() {
    contactArray.length = 0;
    loadingContact = 0;

    if (contactURLArray.length > loadingContact) {
        loadNextContact(contactURLArray[loadingContact]);
    }
}

function loadNextContact(URL) {
    setTimeout(function () {
    console.log("URL: " + URL);
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', URL);
    contactRequest.onload = function() {
        console.log(contactRequest.responseText);
        var contact;
        contact = JSON.parse(contactRequest.responseText);
        console.log("Contact: " + contact.firstName);
        contactArray.push(contact);
        //document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray);
            loadingContact++;
    
        if (contactURLArray.length > loadingContact) {
            document.getElementById("statusID").innerHTML = "Status: Loaded " + contact.firstName + " " + contact.lastName;
            loadNextContact(contactURLArray[loadingContact]);
        } 
    }
    contactRequest.send();
    }, 500)
}

function logContacts() {
    console.log(contactArray);
}

function showContacts() {
    for (i = 0; i < contactArray.length; i++) {
        document.getElementById("contacts").innerHTML += JSON.stringify(contactArray[i]) + "<br /><br />";
    }
}