# Node-Express-MongoDB Boilerplate

A robust Node.js REST API boilerplate with authentication, role-based access control (RBAC), and permission management built with Express.js and MongoDB.

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Secure password hashing with bcrypt
  - Role-based access control (RBAC)
  - Permission-based middleware

- **User Management**
  - User registration and login
  - Profile management
  - Admin user creation

- **Role & Permission System**
  - Flexible role management
  - Granular permission control
  - Admin role with full access
  - Custom permission checking

- **Product Management**
  - CRUD operations for products
  - RESTful API design

- **Database Integration**
  - MongoDB with Mongoose ODM
  - Database seeding for initial data
  - Connection management

- **API Features**
  - Input validation with Zod
  - Error handling middleware
  - CORS support
  - Request logging
  - JSON response formatting

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Password Hashing**: bcrypt
- **Development**: Nodemon

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Node-Express-Mongodb-Boilerplate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   HOST=127.0.0.1
   PORT=3000
   MONGO_URL="mongodb://127.0.0.1:27017/codersbank"
   JWT_SECRET="your-super-secret-jwt-key"
   ```

4. **Database Setup**
   Make sure MongoDB is running and accessible at the specified URL.

5. **Seed the database**

   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**

```json
{
  "message": "Login Successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": {
      "name": "user",
      "all": false
    },
    "permissions": ["product.read", "faq.read"],
    "isAdmin": false
  },
  "token": "jwt_token_here"
}
```

### User Management (Protected Routes)

All `/api/*` routes require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

#### Get All Users

```http
GET /api/users
Authorization: Bearer <token>
```

**Required Permission:** `user.read`

#### Get User by ID

```http
GET /api/users/:id
Authorization: Bearer <token>
```

#### Create User

```http
POST /api/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "SecurePass123!"
}
```

#### Update User

```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane.smith@example.com"
}
```

#### Delete User

```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

### Product Management

#### Get All Products

```http
GET /api/products
Authorization: Bearer <token>
```

#### Get Product by ID

```http
GET /api/products/:id
Authorization: Bearer <token>
```

#### Create Product

```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Sample Product",
  "description": "Product description",
  "price": 29.99
}
```

#### Update Product

```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Product",
  "price": 39.99
}
```

#### Delete Product

```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Role & Permission Management

#### Get All Roles

```http
GET /api/roles
Authorization: Bearer <token>
```

#### Get All Permissions

```http
GET /api/permissions
Authorization: Bearer <token>
```

## 🔐 User Roles & Permissions

### Default Roles

- **admin**: Full access to all resources (`all: true`)
- **user**: Limited access with specific permissions
- **executive**: Extended permissions for management

### Permission Structure

Permissions follow the format: `resource.action`

- `user.read` - View users
- `user.create` - Create users
- `user.update` - Update users
- `user.delete` - Delete users
- `product.read` - View products
- `product.create` - Create products
- `product.update` - Update products
- `product.delete` - Delete products

### Admin Access

Users with the "admin" role have unrestricted access to all endpoints regardless of specific permissions.

## 🗄 Database Schema

### User

```javascript
{
  name: String,
  email: String,
  password: String, // Hashed
  role: ObjectId (ref: 'Role'),
  avatar: String,
  timestamps: true
}
```

### Role

```javascript
{
  name: String,
  all: Boolean, // If true, bypasses permission checks
  timestamps: true
}
```

### Permission

```javascript
{
  name: String,
  display_name: String,
  deleted_at: Date
}
```

### RolePermission

```javascript
{
  role_id: ObjectId (ref: 'Role'),
  permission_id: ObjectId (ref: 'Permission'),
  timestamps: true
}
```

### Product

```javascript
{
  name: String,
  description: String,
  price: Number,
  // Add other product fields as needed
  timestamps: true
}
```

## 🧪 Testing the API

### 1. Register a new user

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "TestPass123!"}'
```

### 2. Login to get JWT token

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "TestPass123!"}'
```

### 3. Access protected endpoints

```bash
# Get all products
curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📜 Scripts

- `npm start` - Start the development server with nodemon
- `npm run seed` - Seed the database with initial roles and permissions
- `npm test` - Run tests (currently not implemented)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Input validation and sanitization
- CORS protection
- Role-based access control
- Permission-based authorization

## 📁 Project Structure

```
src/
├── config/
│   └── db.js                 # Database connection
├── controllers/
│   ├── Auth/
│   │   └── AuthController.js
│   ├── Products/
│   │   └── ProductsController.js
│   └── Users/
│       └── UserController.js
├── database/
│   └── seeders/
│       ├── index.js
│       ├── permission.seeder.js
│       ├── role.seeder.js
│       └── rolePermission.seeder.js
├── helpers/
│   └── helper.js            # JWT and password utilities
├── middleware/
│   ├── AuthMiddleware.js    # JWT verification
│   ├── RolePermissionCheck.js # Permission checking
│   └── Validate.js          # Input validation
├── models/
│   ├── Permission.model.js
│   ├── Product.model.js
│   ├── Role.model.js
│   ├── RolePermission.model.js
│   └── user.model.js
├── repositories/
│   ├── AuthRepository.js
│   ├── PermissionRepository.js
│   ├── RoleRepository.js
│   └── UserRepository.js
├── resources/
│   └── responseMessages.js  # API response messages
├── routes/
│   ├── auth.route.js
│   ├── permission.route.js
│   ├── product.route.js
│   ├── role.route.js
│   └── user.route.js
├── services/
│   ├── auth.service.js
│   ├── permission.service.js
│   ├── product.service.js
│   ├── role.service.js
│   └── user.service.js
├── validations/
│   ├── AuthValidation.js
│   ├── ProductValidation.js
│   └── UserValidation.js
└── server.js                # Main application file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For questions or issues, please open an issue in the repository.
