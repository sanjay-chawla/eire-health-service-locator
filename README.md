# Éire Health Service Locator

## Usage
1) Install the required modules
Install [Node.js and nodemon](http://nodejs.org).

2) Add some Turtle/RDF data. 
For this we use a docker image of Apache Jena Fuseki Server(https://hub.docker.com/r/stain/jena-fuseki) running on a AWS EC2 instance. The Data sets available in the /turtle directories are created bu uplifting CSV data from various Opendata websites using JUMA see: https://www.scss.tcd.ie/~crottija/juma/. These are loaded into a persistent triplet store Jena TDB see: http://jena.apache.org/index.html
Upload a .ttl file, sample added to project.

3) Edit the SPARQLD endpoint in index.ejs and query.js

4) CD to app folder. To start the app, run these commands

    $ npm install
    
    $ nodemon app.js

Finally, point your browser to
[http://localhost:4000/](http://localhost:4000/).
