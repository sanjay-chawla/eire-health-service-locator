# datafinder

## Using
1) Install the required modules
Install [Node.js](http://nodejs.org).


2) Download Desktop app for Neo4J: https://neo4j.com/docs/operations-manual/current/installation/neo4j-desktop/
Once you have it running at http://localhost:7474 we create an app to use this database.

3) Add some Turtle/RDF data. 
For this we use Neosemantics which builds extra layer over Neo4J. For download and setp see: https://neo4j.com/docs/labs/nsmntx/current/
Upload a .ttl file, sample added to project.

4) CD to app folder. To start the app, run these commands

    $ npm install
    
    $ node app.js

Finally, point your browser to
[http://localhost:3000/](http://localhost:3000/).
