# **Install and run the application.**

## **Clone the repository, install node packages and verify routes locally:**
       
     git clone git@github.com:fidanmova/Backend_Challenge.git
        
## **Go to the project directory**

       cd name of the directory
##  **In the project directory,  install the dependencies:**

       npm install
# **Adding Variables to your Environment**
###  Create a .env file locally, assign the port to the PORT variable ( for example PORT = 3000 ) 
###  Get your own api key on  <a name="https://www.last.fm/home">last.fm</a>.  Assign the given api key to an API_KEY in .env file. ( for example: API_KEY = your api key ) 
### *Or without creating .env file, you can also assign the values to PORT and API_KEY directly on server.js and artistControllers.js files*
##  **In the project directory run the:**

       npm start

### **Run the app in the development mode, open the url to view it in the browser, or check the Rest API's on API platform as Postman, or simply on Vs Code by rest client extension**

         http://localhost:3000/artist/name of the artist 