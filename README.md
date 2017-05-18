# Second Opinion - Mutant, MD

## Project 2 for NU Coding Boot Camp

### Created By
* [Caryn Carter](https://github.com/)
* [Andy Hang](https://github.com/ahang)
* [Laura McGinn](https://github.com/LauraMcG)
* [Jared Moscrip](https://github.com/1jared123)
* [Paul Sulikowski](https://github.com/psulikow)

### Objective
Second Opinion was developed, by 5 developers, to assists patients who desire additional advice on a sudden diagnosis and have been given a risky or intense treatment recommendations.

### Technology Used
* [NodeJS](https://nodejs.org/en/), [Express](https://expressjs.com/)
* [Express-Handlebars](https://www.npmjs.com/package/express-handlebars)
* [Passport](http://passportjs.org/)
* [Sequelizejs](http://docs.sequelizejs.com/)
* [jQuery](https://jquery.com/)

### App Functionality
The user, aka the patient, will create an account to login to view the dashboard. The user will be required to input their diagnosis and current doctor upon entering the dashboard. Upon submission of their diagnosis and current doctor, the app will do an ajax call to check the current doctor's rating and pick a similar or better rating from the list of available doctors and sends the results to the dashboard. The patient will then have the information available to make an appointment with the suggested doctor. 

### How to use

Viewing it Online
1. Access the link [here]()

Setup and Running the App Locally

1. Clone Repo and extract to accessible location
2. Navigate in `Git` to root of the extracted folder of `secondOpinion`
3. Type in `npm-install`
4. Open up the folder in your favorite text editor. Or if you are using sublime, type in `subl .`
5. Navigate to `config.json` in the config folder. Update the `development` block with your account information to connect to MySQL. 
6. Open up `MySQL Workbench` or any similar visual tool for database manipulation. 
7. Create the following database `second_opinion_db`. Close the tool after creating the database
8. Go back to `git` and type in `node server.js`
9. Open up your browser in and type in `localhost:3308/` in the address path.
10. Enjoy!

* To gain admin access, after running `node server.js` once, and registering a `patient` account. Open up `MySQL Workbench` and access the `patients table` modify the isAdmin column and change the value from `0` to `1` and apply the change. Doing this will allow you to view the admin dashboard. 



