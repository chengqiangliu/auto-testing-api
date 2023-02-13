**WORKFLOW**

Commands to run the code(app.js): 
* cd `<project folder>`
* npm install
* npm run dev 

Then fetch the API by POST method in the postman using URL “http://localhost: [Port Address]/[API Address]”.  

[Port Address] can be fetched from bin/www. API address can be divided into two components. [API Address 1st part] is fetched in app.js, then 2nd part, i.e., the functionality that is required (like login, add, update, delete, or list) is fetched from user Router[./routes/user.route].  

 

**RESULTS AND OUTPUTS**

**USER LOGIN** \
The requests and response for user login are as follows: 
For user login, the API used is http://localhost:[PortAddress]/api/user/login. We need to send a post request to the given URL for login purposes. 
The necessary input attributes for user login are a username and password. 

**Case and error message for input attributes (validation errors)**
 CASE | ERROR MESSAGE 
---|---
Username is not given. |  Username is required and it should be a string.  
Username is given but it is not a string. | Username should be a string. 
Password is not given | Password is required. Password should contain at least one uppercase, one lowercase, one number and one special character. Password should be at least 5 letters long. 
Password is given but it doesn’t follow the password validation requirements. | Password should contain at least one uppercase, one lowercase, one number and one special character. 
Password follows all the validation requirements except for the length requirements. | Password should be at least 5 letters long. 

**Cases and responses if input attributes are correct** 
CASE | OUTPUT | HTTP CODE | LOGGER MESSAGE 
---|---|---|---
If username is admin |    | 200 | login success, admin.  
If the username is something other than admin and if the user is already in the database and all the input attributes provided are right. |  | 200 | login success, [username] 
If the username or password is wrong |  | 400 | login failed, username or password is wrong. 
If there is some system error |  | 400 | login failed, system error. [error] 

**USER ADD** \
The requests and response for user login are as follows: 
For user login, the API used is http://localhost:[PortAddress]/api/user/add. We need to send a post request to the given URL for login purposes. 
The necessary input attributes for user login are a username, password and a ClientID. 

**Case and error message for input attributes (validation errors)** 

CASE | ERROR | MESSAGE 
---|---|---
Username is not given | Username is required and it should be a string  
Username is given but it is not a string | Username should be a string 
Password is not given | Password is required. Password should contain at least one uppercase, one lowercase, one number and one special character. Password should be at least 5 letters long. 
Password is given but it doesn’t follow the password validation requirements | Password should contain at least one uppercase, one lowercase, one number and one special character. 
If clientId is not present | ClientID is required 

CASE | FORMAT OF OUTPUT | HTTP CODE | LOGGER MESSAGE 
---|---|---|---
Successfully adding user |  | 200 | add user successful, [username] 
User already exists |  | 400 | the username already exists, [username] 
System error |  | 500 | add user failed, system error。[error] 

**USER UPDATE** \
The requests and response for user update are as follows: 
For user update, the API used is http://localhost:[PortAddress]/api/user/update. We need to send a post request to the given URL for login purposes. 
The necessary input attributes for user login are a username, password and a ClientID. 

**Case and error message for input attributes (validation errors)**
CASE | ERROR MESSAGE 
---|---
Username is not given | Username is required and it should be a string  
Password is not given | Password is required. Password should contain at least one uppercase, one lowercase, one number and one special character. Password should be at least 5 letters long. 

CASE | FORMAT OF OUTPUT | HTTP CODE | LOGGER MESSAGE 
---|---|---|---
Successfully updating user email |  | 200 | Update user successful, [username] 
Username or password not given |  | 422 | Unprocessable Entity 
System error |  | 500 | Update user failed, system error。[error] 

***USER DELETE*** \
The requests and response for user delete are as follows: 
For user delete, the API used is http://localhost:[PortAddress]/api/user/delete. We need to send a post request to the given URL for login purposes. 
The necessary input attributes for user login is username. 

***Case and error message for input attributes (validation errors)***
CASE | ERROR MESSAGE
---|---
Username is not given | Username is required  

CASE | FORMAT OF OUTPUT | HTTP CODE | LOGGER MESSAGE 
---|---|---|---
Successfully deleting user |  | 200 | 
User doesn’t exists |  | 404 | 
System error |  | 500 | 
Username not in correct format |  | 400 | 

***USER LIST*** \
The requests and response for user list are as follows: 
For user list, the API used is http://localhost:[PortAddress]/api/user/list. We need to send a post request to the given URL for getting user list purposes. 
CASE | FORMAT OF OUTPUT | HTTP CODE | LOGGER MESSAGE 
---|---|---|---
Successfully fetching the user list |  | 200 | get user list successful. 

***ISSUES*** 

Exported validators are not working. Validators are coded but check statement was not defined. Instead ‘body’ was defined.  

***SOLUTION*** 

Exported the validators, defined ‘check’ in place of ‘body’, then called the function if there’s an error in the validation result return error 422. 

***HTTP CODE AND MEANING*** 
HTTP CODE | MEANING
---|---
200 | OK success status 
400 | Bad request, i.e., the servers cannot or will not process the request due to something that is perceived to be a client error 
500 | Internal server error, i.e., the server encountered an unexpected condition that prevented it from fulfilling the request 
422 | Unprocessable entity 

 

 
