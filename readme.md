Name: Jacob Corbett
Student ID: 52316427
Github Link: https://github.com/mightymander/CS1534_Assessment_2

IMPORTANT INFO:
- Looking for HTML5? in views folder, you will see filename.ejs these are all the html files.
- Looking for CSS? in public/CSS all style sheets are in there.


development approach
challenges
technical details of the chat's client-server communication




===========
15/3/24 - before starting this project i thought i would be a good idea to get a small grasp on how node worked so i watched this tutorial, link: https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU

17/3/24 

- set up basic layout for project, views, public

- added in partials to make all the pages easier to edit all at once

18/3/24

- attempted to connect to database and read data

- used mongoose packge for interacting with mongodb to make it simplier 

- set up a model for the database, just has user and body

- Big change, my inital idea was to use a database and then communicate through there to send and receive messages however after doing some research i found that using a package called 'socket.io' would be the best option and that i can still send all messages to the database as i can then create like a history page or something. so most of today was spent trying to get the socket messages system to work.

19/3/24

- updated the nav bar to look much nicer, its compatible with mobile, also making sure the chat was compatible was easy as bootstrap did most of the work. using max-height 75vh, translates well to moblie

- added active users div, which was easy for when users join because im already displaying that in the main chat area, its easy to also add it to the active users div. now on the other hand removing users i thought would be a pain i tired making unique id's but then after further testing it works even if there are two divs with the same id as it only removes one of them when a user leaves.

- made the active users hidden when on moblie, but you can click if you want it to be shown to you

- 

