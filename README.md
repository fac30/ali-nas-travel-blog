# Ali & Nas Travel Blog

![Contributors](https://img.shields.io/github/contributors/fac30/ali-nas-travel-blog?style=plastic) ![Forks](https://img.shields.io/github/forks/fac30/ali-nas-travel-blog) ![Stars](https://img.shields.io/github/stars/fac30/ali-nas-travel-blog) ![Issues](https://img.shields.io/github/issues/fac30/ali-nas-travel-blog)


## Description 

This project was developed as our final project [FAC (Founders and Coders)](https://www.foundersandcoders.com/ "Go to Founders and Coders website") (FAC30A) curriculum. It aims to provide a web platform for a for travels to blog about their experiences and as part of that experience we incorporated OpenAI into the project.

__Techologies Used__ 

As part of the project the technologies we settled on were:

![HTML](https://img.shields.io/badge/-HTML-orange?style=flat-square&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/-CSS-blue?style=flat-square&logo=css3&logoColor=white) ![Bootstrap](https://img.shields.io/badge/-Bootstrap-563D7C?style=flat-square&logo=bootstrap&logoColor=white) ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow?style=flat-square&logo=javascript&logoColor=white) ![EJS](https://img.shields.io/badge/-EJS-302C2C?style=flat-square&logo=ejs&logoColor=white) ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) ![Mongoose](https://img.shields.io/badge/-Mongoose-47A248?style=flat-square&logo=mongoose&logoColor=white) ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) ![OpenAI](https://img.shields.io/badge/-OpenAI-FF7733?style=flat-square&logo=openai&logoColor=white)


## Installation & Running Project

Please click the link below to copy the pathway for cloning the project:

```sh
   git clone https://github.com/fac30/ali-nas-travel-blog.git
```

Once cloned please install the Node packages:

```sh
    npm install
```

As part of the installation process Nodemon was installed to run the project locally, to start the server:

```sh
    npm start
```

The project is using Port 5096 due to port conflicts during development.

```sh
    http://localhost:5096/
```

## How To Use The Project

Once installed copy the _.env.example_ and change the name to _.env_, as this is the projects environment file.

Then go to:

```sh
    https://www.mongodb.com/atlas/database
```

Create a free account and follow the instructions to open a free database, as part of the set up process you will is issued with a _Connection String_ to your API linking the project to you database where the blog posts and images will be stored.
If you're new to the process follow the YouTube video below:

```sh
    https://www.youtube.com/watch?v=jXgJyuBeb_o
```

Once you have the MongoDB connection string paste it into the _.env_ file next to MONGODB_URI=_<INSERT_HERE>_.

Create a random password of your own choice for JWT_SECRET=_<INSERT_HERE>_. 

Finally for OpenAI create an account and then paste the API key into the following place OPEN_API_KEY=_<INSERT_HERE>_:

__Documentation__

```sh
    https://platform.openai.com/overview
```

__YouTube Tutorial__

Or alternatively follow this YouTube video:

```sh
    https://www.youtube.com/watch?v=aVog4J6nIAU
```

Once your up nad running click on _Login_ on the top right and then click _Signup_ and create and account.

With the account setup go to MongoDB Atlas and in the collection for _users_ find the account you created and change the role for your user to **admin** and you will have administrator access.

Having logged in you can create blog posts with images that are mandatory and you also have the option for OpenAI to create the blog post, you will have to create the title and upload the image but the context will be inserted by OpenAI.


## Credits

The collaborators on this project are as follows:

- [Ali GitHub repo](https://github.com/AliQassab)
- [Nas GitHub repo](https://github.com/nascho)


## Acknowledgements

* Bootstrap [Official Documentation](https://getbootstrap.com/)