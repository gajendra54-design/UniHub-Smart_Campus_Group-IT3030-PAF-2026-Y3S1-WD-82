-- Use the paf database
USE paf;

-- Ensure the resources table exists (Hibernate usually creates this, but we'll be safe)
CREATE TABLE IF NOT EXISTS resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    status VARCHAR(30) NOT NULL,
    description VARCHAR(500)
);

-- Clear existing data to avoid duplicates for this seed
DELETE FROM resources;

-- Insert sample Resource data
INSERT INTO resources (name, type, location, capacity, available, status, description) VALUES
('Lab 304', 'Lab', 'Science Building, 3rd Floor', 40, 1, 'ACTIVE', 'Primary computer science lab with high-end workstations.'),
('Conference Room A', 'Room', 'Admin Block, Level 2', 12, 1, 'ACTIVE', 'Meeting room with projector and video conferencing setup.'),
('Projector X1', 'Equipment', 'Storage Room 1', 1, 1, 'ACTIVE', 'Portable 4K projector for faculty use.'),
('Seminar Hall', 'Lecture Hall', 'Main Auditorium Wing', 150, 1, 'ACTIVE', 'Large lecture hall for presentations and workshops.'),
('Chemistry Lab', 'Lab', 'Science Building, 1st Floor', 30, 0, 'IN_MAINTENANCE', 'Secondary chemistry lab (Currently offline for equipment upgrade).'),
('Meeting Room 2', 'Room', 'Library, Ground Floor', 6, 1, 'ACTIVE', 'Small group study room.'),
('Tablet Kit #4', 'Equipment', 'Support Desk', 10, 1, 'UNDER_REPAIR', 'Kit of 10 iPads for classroom use.');
