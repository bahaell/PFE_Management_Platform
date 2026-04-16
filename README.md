# 🎓 PFE Management Platform

A robust microservices-based platform designed for managing Graduation Projects (PFE). Built with **Java 17**, **Spring Boot 3.4+**, and **Spring Cloud**, leveraging a highly scalable and distributed architecture.

UserService : port 8082
ProjectService : port 8083
DefenseService : port 8084
NotificationService : port 8085

---

## 🏗️ Architecture Overview

The platform is built using a modern microservices approach:
- **Config Server**: Centralized configuration management.
- **Discovery Service**: Eureka-based service registration and discovery.
- **Projects Service**: Core logic for managing student projects.
- **Notification Service**: Real-time messaging and notifications.
- **API Gateway**: Unified entry point (In Progress).

---

## 🐳 Infrastructure with Docker Compose

The platform uses Docker Compose to run essential databases and tools. This ensures a consistent environment for all developers.

### 1. Start the Infrastructure
Navigate to the project root and run:
```bash
docker compose up -d
```
This will start the following services in the background:
- **PostgreSQL**: Primary relational database (Port `5433`).
- **MongoDB**: NoSQL database for flexible data (Port `27017`).
- **pgAdmin**: Web interface for PostgreSQL (Port `5050`).
- **Mongo Express**: Web interface for MongoDB (Port `8081`).
- **MailDev**: Mock SMTP server for email testing (Port `1080`).
- **Zipkin**: Distributed tracing (Port `9411`).

### 2. Accessing Dashboards
| Tool | URL | Default Credentials |
| :--- | :--- | :--- |
| **pgAdmin** | [http://localhost:5050](http://localhost:5050) | `admin@uni.tn` / `admin` |
| **Mongo Express** | [http://localhost:8081](http://localhost:8081) | `admin` / `admin` |
| **MailDev** | [http://localhost:1080](http://localhost:1080) | - |
| **Eureka** | [http://localhost:8761](http://localhost:8761) | (Only after running discovery-service) |

### 3. Database Setup (Action Required)
After starting Docker, you must create the databases required by the microservices:

#### **PostgreSQL Setup (via pgAdmin)**
1. Open [pgAdmin](http://localhost:5050) and log in.
2. **Register Server**: Right-click `Servers` > `Register` > `Server...`
   - **General**: Name it `PFE-Cluster`.
   - **Connection**:
     - Host: `localhost` (or `postgresql` if connecting from another container)
     - Port: `5433`
     - Username: `admin`
     - Password: `admin`
3. **Create Databases**: Once connected, right-click `Databases` > `Create` > `Database...` and create:
   - `user_db` (for User Service)
   - `projects_db` (for Projects Service)

#### **MongoDB Setup**
Mongo Express automatically connects. Databases will be created automatically by the services (e.g., `notification_db`) upon the first write operation.

### 4. Stop the Infrastructure
To stop and remove the containers:
```bash
docker compose down
```

---

## 🚀 Running the Services

### Prerequisites
- Docker & Docker Compose
- Java 17
- Maven

### Run Services
Always start the services in this order:
1. `config-server`
2. `discovery-service`
3. All other microservices (`projects`, `notification`, etc.)

---

## 📦 Microservices & Dependencies

Below is a detailed list of dependencies used across the platform's microservices. All services are built with **Spring Boot 4.0.5** and **Spring Cloud 2025.1.1**.

### 🛠️ Common Dependencies (Added to most services)
- **Spring Boot Actuator**: Monitoring and health checks.
- **Micrometer Tracing**: Distributed tracing infrastructure.
- **Micrometer Tracing Bridge Brave**: Tracer implementation for Brave.
- **Zipkin Reporter Brave**: Sends traces to Zipkin server.
- **Spring Cloud Config Client**: Fetches configuration from the Config Server.
- **Netflix Eureka Client**: Service registration and discovery.
- **Lombok**: Boilerplate code reduction.

### 🔌 Service Specific Dependencies

#### **1. Config Server**
- `spring-cloud-config-server`: Centralized external configuration.

#### **2. Discovery Service (Eureka Server)**
- `spring-cloud-starter-netflix-eureka-server`: Registry for microservices.

#### **3. API Gateway**
- `spring-cloud-starter-gateway-server-webflux`: Reactive API routing.
- `spring-cloud-starter-loadbalancer`: Client-side load balancing.
- `spring-cloud-starter-bootstrap`: Bootstrap initialization.

#### **4. User Service**
- `spring-boot-starter-data-jpa`: Database persistence.
- `spring-boot-starter-security`: Authentication & Authorization.
- `spring-boot-starter-validation`: Data validation.
- `postgresql`: Persistent storage driver.
- `jjwt-api`, `jjwt-impl`, `jjwt-jackson`: JWT token generation and parsing (0.11.5).

#### **5. Projects Service**
- `spring-boot-starter-web`: REST API support.
- `spring-boot-starter-data-jpa`: Database persistence.
- `spring-boot-starter-validation`: Data validation.
- `postgresql`: Persistent storage driver.

#### **6. Defense Service**
- `spring-boot-starter-web`: REST API support.
- `spring-boot-starter-data-jpa`: Database persistence.
- `spring-boot-starter-validation`: Data validation.
- `spring-cloud-starter-openfeign`: Declarative REST client for inter-service calls.
- `postgresql`: Persistent storage driver.

#### **7. Notification Service**
- `spring-boot-starter-web`: REST API support.
- `spring-boot-starter-data-jpa`: Database persistence.
- `postgresql`: Persistent storage driver.

---

## 📐 Microservice Development Standards

When creating or updating a microservice in this platform, adhere to the following template to ensure consistency across the cluster.

### 1. Global Properties
```xml
<properties>
    <java.version>17</java.version>
    <spring-cloud.version>2025.1.1</spring-cloud.version>
</properties>
```

### 2. Required Core Dependencies
Every microservice **must** include these core dependencies:

| Dependency | Purpose |
| :--- | :--- |
| `spring-boot-starter-web` | Web / REST API capabilities |
| `spring-boot-starter-actuator` | Monitoring and health checks |
| `spring-cloud-starter-config` | To fetch settings from the Config Server |
| `spring-cloud-starter-netflix-eureka-client` | For Service Discovery registration |
| `micrometer-tracing` | Distributed tracing |
| `lombok` | Boilerplate reduction |

---

## 📝 Troubleshooting

### DataSource Configuration Error
If you see `Failed to configure a DataSource: 'url' attribute is not specified`, it means your service is failing to connect to the **Config Server**. 
- Double check that `spring-cloud-starter-config` is in your `pom.xml`.
- Ensure `config-server` is healthy.
- Check `application.yml` for `spring.config.import: optional:configserver:http://localhost:8888`.
