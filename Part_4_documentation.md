# Teebay

---

## Backend - [Django](https://www.djangoproject.com/)

The Backend serves to provide the GraphQL API for the frontend to consume. It is built using the [Django](https://www.djangoproject.com/) framework and [Graphene](https://graphene-python.org/) library.
### Project Structure

The project is consists of 3 Django apps called `product`, `teebay`, and `user`

* `teebay` contains the project settings and urls
* `product` contains the product model, queries, and types
* `user` contains the user model, queries, and types

The project structure is as follows:

``` 
├───product
│   ├───apps.py         # contains the app configuration 
│   ├───models.py       # contains the product and category model
│   ├───mutations.py    # contains the product and category mutations
│   ├───queries.py      # contains the product and category queries
│   └───types.py        # contains the product and category types
├───teebay
│   ├───asgi.py         # async server gateway interface
│   ├───schema.py       # contains the inherited GraphQL query and mutation 
│   ├───settings.py     # contains the project settings
│   ├───urls.py         # contains the project urls
│   └───wsgi.py         # web server gateway interface
├───user
│   ├───apps.py         # contains the app configuration
│   ├───models.py       # contains the user model
│   ├───mutations.py    # contains the user mutations
│   ├───queries.py      # contains the user queries
│   └───types.py        # contains the user types
├───manage.py           # contains the Django management commands
└───requirements.txt    # contains the project dependencies
```
### Queries and Mutations
Entrypoint for the GraphQL API is at `http://localhost:8000/graphql/`
#### Queries
1. Product Queries
   * `products` - Inputs: `id` Returns: `id, title, description, price, rentPrice, rentType, category, datePosted`
   * `allProductsCreatedByUser` - Inputs: `None` Returns: `[id, title, description, price, rentPrice, rentType, category, datePosted]`
   * `categoryTypes` - Inputs: `None` Returns: `[id, category_name]`
   * `rentTypes` - Inputs: `None` Returns: `[id, rent_type]`
2. User Queries
   *  `allUsers` - Inputs: `None` Returns: `[id, firstName, lastName, address, email, phone]`
   *  `user` - Inputs: `email` Returns: `id, firstName, lastName, address, email, phone`

#### Mutations
1. Product Mutations
   * `createProduct` - Inputs: `title, description, price, rentPrice, rentType, category` Returns: `id, title, description, price, rentPrice, rentType, category, datePosted`
   * `editProduct` - Inputs: `id, title, description, price, rentPrice, rentType, category` Returns: `id, title, description, price, rentPrice, rentType, category, datePosted`
   * `deleteProduct` - Inputs: `id` Returns: `id`
2. User Mutations
   * `signIn` - Inputs: `email, password` Returns: `token, email`
   * `signUp` - Inputs: `firstName, lastName, address, email, phone, password` Returns: `token, email`

#### Types
1. Product Types
   * `ProductType` - `id, title, description, price, rentPrice, rentType, category, datePosted`
   * `CategoryType` - `id, category_name`
   * `CombinedProductCategoryType` - `ProductType[...,CategoryType]`
2. User Types
    * `UserType` - `id, firstName, lastName, address, email, phone`
---

## Frontend - [React](https://reactjs.org/)

### Project Structure

The project is consists of 2 Compoenents called `Product` and `User`

* `Product` contains the CRUD operations for the product
* `User` contains the user login and registration

The project structure is as follows:

```
public                                  # contains the public files
├─favicon.ico                           # contains the favicon
├─index.html                            # contains the html template
├─logo192.png                           # contains the logo
├─manifest.json                         # contains the manifest
└─robots.txt                            # contains the robots.txt

src                                     # contains the source files
├─App.css                               # contains the app styles
├─App.js                                # contains the app component with Routing
├─App.test.js                           # contains the app tests
├─components 
│ ├─Product                             # contains the product components
│ │ └─Product.js                        # contains the product component
│ └─User
│   └─Logout.js
├─pages
│ ├─Product
│ │ ├─CreateProductPage.js              # contains the create product page
│ │ ├─EditProduct.js                    # contains the edit product page
│ │ ├─ListProduct.js                    # contains the list product page
│ │ └─CreateProduct                     # contains the product components for multi-step form
│ │   ├─ProductSummary.js               # contains the product summary after inputing all the data
│ │   ├─SelectProductCategories.js      # contains the product categories input
│ │   ├─SelectProductDescription.js     # contains the product description input
│ │   ├─SelectProductPriceRent.js       # contains the product price and rent input
│ │   └─SelectProductTitle.js           # contains the product title input
│ └─User
│   ├─SignInPage.js                     # contains the sign in page
│   └─SignUpPage.js                     # contains the sign up page
├─index.css
├─index.js
├─logo.svg
├─reportWebVitals.js
├─setupTests.js
├─package-lock.json                     # contains the project dependencies
└─package.json                          # contains the project dependencies
```

### Features
1. Mutli-step form for creating a product includes these steps:
   * Select Product Title
   * Select Product Description
   * Select Product Price and Rent
   * Select Product Categories
   * Product Summary

2. Product CRUD operations
    * Create Product
    * Edit Product
    * Delete Product
    * List Product

2. User authentication
   * Sign in    - `token` and `email` is stored in the local storage
   * Sign up    - `token` and `email` is stored in the local storage
   * Logout     - `token` and `email` is removed from the local storage