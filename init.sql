DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'admin') THEN
      CREATE USER admin WITH PASSWORD 'admin';
   END IF;
END
$$;

SELECT 'CREATE DATABASE notification_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'notification_db')\gexec
GRANT ALL PRIVILEGES ON DATABASE notification_db TO admin;

SELECT 'CREATE DATABASE defense_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'defense_db')\gexec
GRANT ALL PRIVILEGES ON DATABASE defense_db TO admin;

SELECT 'CREATE DATABASE resource_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'resource_db')\gexec
GRANT ALL PRIVILEGES ON DATABASE resource_db TO admin;

SELECT 'CREATE DATABASE user_service_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'user_service_db')\gexec
GRANT ALL PRIVILEGES ON DATABASE user_service_db TO admin;

SELECT 'CREATE DATABASE projects_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'projects_db')\gexec
GRANT ALL PRIVILEGES ON DATABASE projects_db TO admin;

SELECT 'CREATE DATABASE scheduling_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'scheduling_db')\gexec
GRANT ALL PRIVILEGES ON DATABASE scheduling_db TO admin;

SELECT 'CREATE DATABASE ai_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ai_db')\gexec
GRANT ALL PRIVILEGES ON DATABASE ai_db TO admin;

