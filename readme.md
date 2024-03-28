Name: Jacob Corbett

Student ID: 52316427

Website Live at: https://jacobcorbett.uk

Github Link: https://github.com/mightymander/CS1534_Assessment_2

IMPORTANT INFO:
- Looking for HTML5? in views folder, you will see filename.ejs these are all the html files.
- Looking for CSS? in public/CSS all style sheets are in there.


Development Approach
---

- firstly before starting this project, i thought i would be a good idea to get a grasp of Node.js and how it all works. I ended up watching this youtube series which drastically helped my understanding. https://www.youtube.com/playlistlist=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU
- Then i created a basic plan for myself on a piece of paper, including how many pages i wanted, and what each page needed to accomplish.
-  After that i felt confident to start the basics of the project, so i set up the basic layout for the project, views, public folders.
- I made sure to utilize partials partials which allowed me to make the navbar for example once and then put it on all the other pages. and if a change needed to be made it was quick and simple, and all the pages would get updated at instantly.
- I used the package morgan for more detailed logging for when users visit the website i can see what is being requested, method and more etc. Just very helpful during development
- initially before looking at the sample code which utilized sockets to send and receive information my plan was to use databases, specifically mongodb. although after some time spent on this i realized that sockets where the way to go and scraped using a database for the main component of the project, I still utilize mongodb to save each user and any chats sent but that was more for the learning experience of how to use mongodb. I used the mongoose package to interact with the database.
- i wanted to get the basics of the chat page done before i went on to do the rest of the webpage because i thought that the chat functionality would take the longest, so after getting the basics done and dusted, but not with as nice styling i went on to get the rest of the webpage implemented.
- For the main index/home page, I ended up going for a nice pastel pink kind of colour with nice big white text i think looks very nice, and easy on the eyes. also added a nice animation to the main page so its feels more premium, I made some important info bold, like my name and student. and further down the page just some more heading with small bits of information.
- after completing the home page i went onto the about page, i thought that it would be nice to have a photo of me, so instead i just used a temporary one for this assignment, with some temporary email and phone number as well. I thought it would be cool to show of the skills i have in regards to programming languages so utilizing bootstrap progress bars was easy to understand and implement. and then I thought that was not enough just for the about page so i split the page into two and added a place for me to just have space to write a lot of text, potentially talking about past jobs, achievements or really anything. i liked added the blue line under the about me, initially this was hard as it was underlining the whole div like beyond the actual text, then i had the idea to use span and style just the span element not knowing if this would work it was amazing when it did. this also has some consistency with the chat page as the active user list is also underlined in the same way and with the same colour.
- next and finally was the projects page, i scouted around the bootstrap documentation trying to see if anything caught my eye that would work nice for multiple items and i found cards, very nice, i can also add an image and button, which allows me to give users a little hint as to what kind of project it was, and i can use the button to link to the github where they can see the code written for that project. also on this page implementing the same underline as the other pages.


Challenges
---
- When creating the chat page, the page layout on desktop was very easy with long horizontal space i could have the list of active users on the left but on mobile this is not as easy. I was initially stuck on how to approach this, maybe just hide the active users? I ended up deciding that i would hide all the active users and only leave the title and if they clicked the title it would revel the list of active users.
- regarding the active users on mobile, this is a great plan however if you are unaware of the functionality of the button then you would just assume that the active users does not work on mobile so i implemented a bootstrap modal which is a fancy popup which lets you know if you are on mobile the functionality of the button. This gets ride of any possible confusion.
- Originally when trying to implement the active users div, i thought it would be easy as i already have when a user joins it appears in the chat, so when that happens just simple also add it to the active users div and when they leave remove them, Which is exactly what i did first however unknown to me because users join at different times everyone does not have the same chat so if Bob joins first and then Jake joins, Bob will have been notified that Jake joined and it will be added to his active users div, but for Jake no one has joined since he joined so for him it will be empty, so this was the first challenge i had to try and fix. I ended up having a simple array of all active users be stored on the server, when someone joins they are added and when they leave they are removed. and when ever someone joins or leave the array will be sent to everyone who is connected so they have the most up to date version of who's active.
- 

technical details of the chat's client-server communication
---
- At first glance the challenge of creating a chat page seems daunting but its much more simple that you think. if you think of it like when the client says something they send it to the server and then the server sends it to everyone else, thats it, its that simple. and with that basic knowledge you can do anything in relation to this task
- so when the server boots up it creates the socket server, and simple starts listening for certain tasks, when the server receives 'new_user' it adds that to database and also to two different arrays and then sends to all clients the current active users array so all the clients have the updated list of people online, which allows for the active users to be displayed on the clients.
- when the client first opens chat page, it gets there username from them and then as stated above it emits it under 'new_user'
- next for the server is 'send_chat_message' when this is received this is when the client tries to send a message, the server then uses broadcast to send it to every client other than the one who sent it and the server sends the message and the user who sent it. 
- when the client receives 'send_chat_message' it simple adds it to the chat div, with the username and message together.
- next for the server is 'disconnect' now this occurs when a user leaves the page or closes the tab for example, first the server will broadcast 'user_disconnected' then removes that user from the two arrays. and also emits 'active_users' which sends the array of all the users connected.
- when the client receives 'user_disconnected' it just adds to the screen name disconnected, now when the client receives 'active_users' it removes all names from the active users div then re adds all the users in the new array it has been sent.
- next for the server we have 'not_typing' and 'typing' all this does is when receives it either removes a user from the typing array or adds them to it. and separately outwith the socket listening every 1000ms the server emits 'typing_users' where it sends the array of everyone who is typing to all clients.
- when the client receives 'typing_users' depending of the length of the array, if array has no elements is sets the typing output to an empty string, if length 1,2,3 it will show all names is typing but if more than 3 it just shows the number as i thought it would get too cluttered with all the names typing.




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

