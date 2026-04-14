# 🎓 PFE Management Platform

A robust microservices-based platform designed for managing Graduation Projects (PFE). Built with **Java 17**, **Spring Boot 3.4+**, and **Spring Cloud**, leveraging a highly scalable and distributed architecture.

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

## 📐 Microservice Development Standards

When creating or updating a microservice in this platform, adhere to the following template to ensure consistency across the cluster.

### 1. Global Properties
```xml
<properties>
    <java.version>17</java.version>
    <spring-cloud.version>2024.0.1</spring-cloud.version>
</properties>
```

### 2. Required Dependencies
Every microservice **must** include these core dependencies:

| Dependency | Purpose |
| :--- | :--- |
| `spring-boot-starter-web` | Web / REST API capabilities |
| `spring-boot-starter-actuator` | Monitoring and health checks |
| `spring-cloud-starter-config` | **CRITICAL**: To fetch settings from the Config Server |
| `spring-cloud-starter-netflix-eureka-client` | For Service Discovery registration |
| `lombok` | Boilerplate reduction |

### 3. Optional Modules
| Condition | Dependency to Add |
| :--- | :--- |
| **Has own DB** | `spring-boot-starter-data-jpa` & `postgresql` |
| **Validation** | `spring-boot-starter-validation` |
| **Inter-service calls** | `spring-cloud-starter-openfeign` |
| **Routing / Gateway** | `spring-cloud-starter-gateway` |
| **Security** | `spring-boot-starter-security` |

---

## 📝 Troubleshooting

### DataSource Configuration Error
If you see `Failed to configure a DataSource: 'url' attribute is not specified`, it means your service is failing to connect to the **Config Server**. 
- Double check that `spring-cloud-starter-config` is in your `pom.xml`.
- Ensure `config-server` is healthy.
- Check `application.yml` for `spring.config.import: optional:configserver:http://localhost:8888`.
