# Creating project using NestJs, typesript, typeOrm, Jest and SQLite
- the data is persisted locally in the database.sqlite file within the project
- I have created the following endpoints to create the favorites list,
  - **GET: /api/favorite** returns the list of favorites

  - **GET: /api/favorite/:productId** returns a favorite item by productId, I am using this endpoint to know if the product is in the favorites list or not

  - **POST: /api/favorite** I am using this endpoint to save favorites in the database, before saving the data I am validating the entries

  - **DELETE: /api/favorite** I am using this endpoint to delete favorites by productId

- I have created a single table in FavoriteProduct database
  - id: number - the id of the favorite item is saved here, it is an incrementable
  - productId: string; - we save the productId
  - name: string; - we save product name
  - description: string; - Product description
  - price: number; -Price of the product
  - imageUrl: string; - Product image
  - jsonData: string; - here I save all the product attributes in json string format, which can be retrieved in the FE to show more product data
- I have also created unit test, it can be run by executing the **npm run test** command
- I have not been able to implement authentication due to lack of time, below I describe what has to be implemented
  - create an enpdoint to register user, login and another for logout
  - when registering the user we save the user in the database
  - when we call the login endpoint, it validates if the user is in the database, if so we generate a token with JWT and return it
  - once the user has logged in, the FE has the token that was sent in each endpoint call
  - on the BE side we validate the token we implement Guard to validate the token if it is correct the endpoint is accessed otherwise we reject it with an unauthorized error 401

  # Steps to run the project locally
  - clone the project and go to the project folder and run the following commands
  - npm install
  - npm run start
  - open the url http://localhost:5000 in the browser