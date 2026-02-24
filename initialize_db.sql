DROP DATABASE res_mag_db;
CREATE DATABASE res_mag_db;
USE res_mag_db;

CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    role ENUM('customer','staff','admin') DEFAULT 'customer',
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20)
);

CREATE TABLE events (
    event_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE restaurant_tables (
    table_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quantity INT DEFAULT 1,
    location VARCHAR(100),
    table_number VARCHAR(20) UNIQUE,
    status ENUM('available','maintenance','hidden') DEFAULT 'available'
);

CREATE TABLE table_booking (
    booking_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    booking_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    special_request TEXT,
    table_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (table_id) REFERENCES restaurant_tables(table_id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE orders (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT NOT NULL,
    opened_at DATETIME NOT NULL,
    closed_at DATETIME,
    status ENUM('open','closed','cancelled') DEFAULT 'open',
    note TEXT,
    FOREIGN KEY (booking_id) REFERENCES table_booking(booking_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE meals (
    meal_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    img VARCHAR(255),
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    highlight BOOLEAN DEFAULT FALSE
);

CREATE TABLE order_items (
    order_item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    meal_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price_at_time DECIMAL(10,2) NOT NULL,
    note VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (meal_id) REFERENCES meals(meal_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE payments (
    payment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    method ENUM('cash','card','ewallet') NOT NULL,
    status ENUM('pending','paid','refunded') DEFAULT 'pending',
    paid_at DATETIME,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ratings (
    rating_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150),
    star INT NOT NULL,
    comment TEXT,
    user_id BIGINT NOT NULL,
    booking_id BIGINT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES table_booking(booking_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_booking_time ON table_booking(table_id, booking_time, end_time);
CREATE INDEX idx_order_booking ON orders(booking_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_payment_order ON payments(order_id);

