-- Seed data aligned with frontend mock models (students, teachers, coordinator, skills).
-- For MySQL.

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM user_skills;
DELETE FROM skills;
DELETE FROM users;

SET FOREIGN_KEY_CHECKS = 1;

-- password hash placeholder (BCrypt). Change in production.
-- Plaintext used for all rows in mock scenario: Password123!

INSERT INTO users (id, name, email, password, phone, gender, birthdate, avatar, department, level, student_id, academic_year, interests, grade, speciality, bio, research_interests, years_of_experience, office, responsibilities, years_of_service, role)
VALUES
('STU001', 'Ahmed Youssef', 'ahmed.youssef@student.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+216 20 123 456', 'Male', '2002-03-15', 'AY', 'Software Engineering', 'M2', 'ST20001', '2024-2025', 'AI, Machine Learning, Computer Vision', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'STUDENT'),
('STU002', 'Mariem Khaled', 'mariem.khaled@student.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+216 21 234 567', 'Female', '2002-07-22', 'MK', 'Software Engineering', 'M2', 'ST20002', '2024-2025', 'Blockchain, Web3, Security', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'STUDENT'),
('TCH001', 'Dr. Sami Ahmed', 'sami.ahmed@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+216 98 123 456', 'Male', '1975-03-20', 'SA', 'Computer Science', NULL, NULL, NULL, NULL, 'Professor', 'Artificial Intelligence', 'Passionate about AI research and teaching.', 'Deep Learning, NLP, Computer Vision', 20, NULL, NULL, NULL, 'TEACHER'),
('TCH002', 'Dr. Mariem Ben Ali', 'mariem.benali@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+216 97 234 567', 'Female', '1985-06-10', 'MB', 'Computer Science', NULL, NULL, NULL, NULL, 'Associate Professor', 'Software Engineering', 'Expert in software architecture and web development.', 'DevOps, Microservices, Cloud Computing', 12, NULL, NULL, NULL, 'TEACHER'),
('COR001', 'Mme Mariem K.', 'mariem.k@university.tn', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+216 71 123 456', 'Female', '1980-11-10', NULL, 'Computer Science', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'B12', 'Oversee all PFE projects, schedule defenses, manage resources', 5, 'COORDINATOR');

INSERT INTO skills (name, category)
VALUES
('Python', 'Language'),
('TensorFlow', 'ML Framework'),
('OpenCV', 'Computer Vision'),
('Solidity', 'Language'),
('Blockchain', 'Crypto'),
('Web3.js', 'Framework'),
('JavaScript', 'Language'),
('Node.js', 'Backend'),
('Administration', 'Management'),
('Planning', 'Management'),
('Communication', 'Soft Skills');

INSERT INTO user_skills (user_id, skill_id, relevance)
VALUES
('STU001', 1, 90),
('STU001', 2, 85),
('STU001', 3, 80),
('STU002', 4, 85),
('STU002', 5, 88),
('STU002', 6, 80),
('TCH001', 1, 95),
('TCH001', 2, 90),
('TCH002', 7, 90),
('TCH002', 8, 88),
('COR001', 9, 95),
('COR001', 10, 90),
('COR001', 11, 90);
