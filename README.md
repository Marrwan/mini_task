<!-- WRITE API ENDPOINTS AND DOCUMENTATION -->
url = https://secure-beach-03949.herokuapp.com/
## API Endpoints

### /api/auth/signup
#### new user signup

```
POST /api/auth/signup

{
  "email": "
  "password": "
}

```

### /api/auth/login
#### user login

```
POST /api/auth/login

{
  "email": "
  "password": "
}

```

### /api/auth/logout
#### user logout


```
POST /api/auth/logout

```
### /api/auth/forget-password
#### user forget password

```
POST /api/auth/forget-password

{
  "email": "
}

```
### /api/auth/reset
#### user reset password

```
POST /api/auth/reset

{
  "password": "
  "token": "
}

```

### /api/
#### get list of products

```
GET /api

```

### /api/:id
#### get product by id

```
GET /api/:id

```

### /api
#### create product

```
POST /api

{
  "name": "
  "description": "
  "price": "
  "image": "
  "inventoryQuantity": "
}

```
### /api/:id/cart
#### add product to cart

```
POST /api/:id/cart

```
### /api/:id/pay
#### pay for product

```
POST /api/:id/pay

```