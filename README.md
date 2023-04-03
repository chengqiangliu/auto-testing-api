Install NodeJS, npm, MongoDb Compass, postman and any text editor (IntelliJ or Visual Studio Code). 

Commands to run the code(app.js): 
* cd `<project folder>`
* npm install
* npm run dev 

moment is for tracking time. \
Then fetch the API by POST method in the postman using URL “http://localhost: [Port Address]/[API Address]”. 
The postman scripts for all the api's is given in the code as well.  

There are about twelve different tables in the database schema diagram and they include add,update,delete and get information api's.

[Port Address] can be fetched from bin/www. API address can be divided into two components. [API Address 1st part] is fetched in app.js, then 2nd part, i.e., the functionality that is required (like login, add, update, delete, or list) is fetched from user Router[./routes/user.route].  

A swagger UI has been created as well for the above api's. The UI can be seen on the path “http://localhost: [Port Address]/api/docs"
