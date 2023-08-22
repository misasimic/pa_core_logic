# pa_core_logic

This is core demo app. Which will be used in another app running in the cloud.
This "service" does not depend on concrete cloud provider.

This is temporal demo app. Which just shows the coding style and architecture thoughts.

In final app. this exactly the same code for folders _security_ and _sendGrid_ will be copied to the project and app will work.

Layer above this will generate HTML and using required methods from this app.

The main folder is security which has users.js file (The main file with core app logic)

"Users" apply repository pattern - and does not depend on concrete db.

It asks from cloud_provider "getKeyValueStorage", our cloud client code will provide that service which then stores data in concrete DB.

cloud folder simulates cloud env services and works locally.


It covers next functionalities:

* Sign Up - It just stores input data to db
* Login Pwd - takes data and compares with stored data - and returns token for that user
* Login Token - takes token and returns proper user if token is valid
* Generate PWD Change Request Token - returns token which will be send to requester
* Change PWD - gets token and new pwd - and will update pwd

## Tests

This code does not have units appropriate for Unit Tests. But it performs Integration tests

We just should run npm test - to see results.
