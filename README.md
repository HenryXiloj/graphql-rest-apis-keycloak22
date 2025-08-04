# Securing GraphQL / REST APIs with OAuth2 Resource Server

A comprehensive demonstration of securing both GraphQL and REST APIs using OAuth2 Resource Server with Spring Security 6.1, Keycloak 22, and Angular 16.

📘 Blog Post: [Securing GraphQL / REST APIs with OAuth2 Resource Server Spring Security 6.1 & Keycloak 22 & Angular 16](https://jarmx.blogspot.com/2023/07/securing-graphql-rest-apis-with-oauth2.html)

## 🏗️ Architecture Overview

This project demonstrates how to implement OAuth 2.0 Resource Server authentication across multiple API types:

- **Spring Boot GraphQL API** (Port 8081) - Secured GraphQL endpoints
- **Spring Boot REST API** (Port 8082) - Secured REST endpoints  
- **Keycloak 22** (Port 8080) - Identity and Access Management
- **Angular 16 Frontend** - Client application with OAuth2 integration

## 🚀 Technology Stack

### Backend
- **Spring Boot 3.1.1**
- **Spring Security 6.1**
- **OAuth2 Resource Server**
- **Java 17**
- **Maven**
- **Keycloak 22**

### Frontend
- **Angular 16**
- **Angular Material 16**
- **Node.js 18**
- **npm 9**
- **SweetAlert2**

## 🔑 Key Features

- **Dual API Security**: Both GraphQL and REST APIs secured with OAuth2
- **JWT Token Validation**: Stateless authentication using JSON Web Tokens
- **Role-Based Access Control**: ADMIN and USER roles with method-level security
- **CORS Configuration**: Cross-origin support for frontend integration
- **Keycloak Integration**: Enterprise-grade identity management
- **Angular OAuth2 Client**: Complete frontend authentication flow

## 📁 Project Structure

```
├── spring-boot-graphql-api/        # GraphQL API (Port 8081)
├── spring-boot-rest-api/           # REST API (Port 8082)
├── angular-frontend/               # Angular 16 Client
└── keycloak/                       # Keycloak configuration
    └── realm.json                  # Realm import file
```

## 🛠️ Setup Instructions

### Prerequisites

- Java 17+
- Node.js 18+
- Docker
- Maven
- Angular CLI 16

### 1. Start Keycloak Server

```bash
docker run -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:22.0.0 start-dev
```

### 2. Configure Keycloak

#### Option A: Manual Setup
1. Access Keycloak Admin Console: http://localhost:8080
2. Login with `admin/admin`
3. Create a new realm: `demo`
4. Create client: `spring-boot-keycloak`
   - Client Protocol: `openid-connect`
   - Access Type: `confidential`
   - Valid Redirect URIs: 
     - `http://localhost:8081/*`
     - `http://localhost:8082/*`
     - `http://localhost:4200/*`
5. Create roles: `ADMIN`, `USER`
6. Create users:
   - `admin` (password: `admin`) - Assign ADMIN role
   - `henry` (password: `henry`) - Assign USER role

#### Option B: Import Configuration
1. Create realm `demo`
2. Go to Realm Settings → Action → Partial Import
3. Import the `realm.json` file from the repository
4. Select "Overwrite" for existing resources

### 3. Start Backend Services

#### GraphQL API
```bash
cd spring-boot-graphql-api
mvn spring-boot:run
# Runs on http://localhost:8081
# GraphiQL available at http://localhost:8081/graphiql
```

#### REST API
```bash
cd spring-boot-rest-api
mvn spring-boot:run
# Runs on http://localhost:8082
```

### 4. Start Angular Frontend

```bash
cd angular-frontend
npm install
ng serve
# Runs on http://localhost:4200
```

## 🔧 Configuration Details

### GraphQL API Configuration

**Key Dependencies:**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-graphql</artifactId>
</dependency>
```

**Security Configuration:**
- JWT validation against Keycloak
- Role-based authorization with `@PreAuthorize`
- CORS configuration for cross-origin requests

**GraphQL Schema:**
```graphql
type Query {
  getName: String
  getJWTByUser: JWTTokenDto
}
```

### REST API Configuration

**Endpoints:**
- `GET /api/name` - Returns user name (USER, ADMIN roles)
- `GET /api/principal` - Returns full JWT token details (USER, ADMIN roles)
- `GET /admin/**` - Admin-only endpoints (ADMIN role)

### Angular Frontend Configuration

**Environment Configuration:**
```typescript
export const environment = {
  client_ID: "spring-boot-keycloak",
  client_secret: "YOUR_CLIENT_SECRET",
  grant_type: "password",
  keycloakEndpoint: "http://localhost:8080/realms/demo/protocol/openid-connect/token",
  graphql_api: "http://localhost:8081/graphql",
  rest_api: "http://localhost:8082/"
};
```

**Key Features:**
- JWT token management
- HTTP interceptors for authentication
- Route guards for protected routes
- GraphQL and REST service integration

## 🧪 Testing

### Using Postman

1. **Get Access Token:**
   - Method: POST
   - URL: `http://localhost:8080/realms/demo/protocol/openid-connect/token`
   - Auth Type: OAuth 2.0
   - Grant Type: Password Credentials
   - Username: `admin` / Password: `admin`
   - Client ID: `spring-boot-keycloak`
   - Client Secret: `[your_client_secret]`

2. **Test GraphQL Endpoint:**
   - Method: POST
   - URL: `http://localhost:8081/graphql`
   - Headers: `Authorization: Bearer [access_token]`
   - Body:
   ```json
   {
     "query": "{ getName }"
   }
   ```

3. **Test REST Endpoint:**
   - Method: GET
   - URL: `http://localhost:8082/api/name`
   - Headers: `Authorization: Bearer [access_token]`

### Using Angular Application

1. Navigate to `http://localhost:4200`
2. Login with credentials:
   - Admin: `admin/admin`
   - User: `henry/henry`
3. Access protected GraphQL and REST endpoints through the UI

## 🔒 Security Features

### JWT Token Structure
- **Header**: Algorithm and token type
- **Payload**: User claims, roles, and metadata
- **Signature**: Token integrity verification

### Role-Based Access Control
- **ADMIN Role**: Full access to all endpoints
- **USER Role**: Limited access to user-specific endpoints
- **Method-level security**: `@PreAuthorize` annotations

### CORS Configuration
- Configured for cross-origin requests
- Supports multiple origins and HTTP methods
- Proper header handling for authentication

## 🐛 Troubleshooting

### Common Issues

1. **Keycloak Connection Issues**
   - Verify Keycloak is running on port 8080
   - Check realm name matches configuration (`demo`)
   - Ensure client secret is correctly configured

2. **JWT Token Validation Errors**
   - Verify `issuer-uri` in application.yml
   - Check `jwk-set-uri` endpoint accessibility
   - Ensure system time synchronization

3. **CORS Issues**
   - Verify CORS configuration in backend services
   - Check allowed origins match frontend URL
   - Ensure preflight requests are handled

4. **Role Assignment Issues**
   - Verify users have correct role assignments in Keycloak
   - Check role mapping in JWT token payload
   - Ensure `@PreAuthorize` expressions match role names

## 📚 Additional Resources

- [Spring Security OAuth2 Resource Server Documentation](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/index.html)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [GraphQL Java Documentation](https://www.graphql-java.com/)
- [Angular OAuth2 OIDC Library](https://github.com/manfredsteyer/angular-oauth2-oidc)
