USE res_mag_db;

-- ======================
-- USERS
-- ======================

-- ======================
-- RESTAURANT TABLES
-- ======================
INSERT INTO restaurant_tables (quantity, location, table_number, status) VALUES
(4, 'Tầng 1', 'A1', 'available'),
(4, 'Tầng 1', 'A2', 'available'),
(6, 'Tầng 2', 'B1', 'available'),
(8, 'VIP Room', 'VIP1', 'maintenance');

-- ======================
-- BOOKINGS
-- ======================
INSERT INTO bookings (quantity, booking_time, end_time, special_request, table_id, user_id) VALUES
(4, '2026-03-01 18:00:00', '2026-03-01 20:00:00', 'Sinh nhật', 1, 1),
(6, '2026-03-02 19:00:00', '2026-03-02 21:00:00', NULL, 3, 2);

-- ======================
-- BOOKING TABLES (many-to-many)
-- ======================
INSERT INTO booking_tables (booking_id, table_id) VALUES
(1, 1),
(2, 3);

-- ======================
-- MEALS
-- ======================
INSERT INTO meals (name, description, img, category, price, highlight) VALUES
('Pizza Hải Sản', 'Pizza tôm mực phô mai', 'pizza.jpg', 'Food', 199000, TRUE),
('Mì Ý Bò Bằm', 'Spaghetti bò sốt cà chua', 'spaghetti.jpg', 'Food', 149000, FALSE),
('Coca Cola', 'Nước ngọt có gas', 'coca.jpg', 'Drink', 25000, FALSE),
('Bia Tiger', 'Bia lon 330ml', 'tiger.jpg', 'Drink', 30000, TRUE);

-- ======================
-- ORDERS
-- ======================
INSERT INTO orders (booking_id, opened_at, closed_at, status, note) VALUES
(1, '2026-03-01 18:05:00', '2026-03-01 19:45:00', 'closed', 'Khách đông'),
(2, '2026-03-02 19:10:00', NULL, 'open', NULL);

-- ======================
-- ORDER ITEMS
-- ======================
INSERT INTO order_items (order_id, meal_id, quantity, price_at_time, note) VALUES
(1, 1, 2, 199000, NULL),
(1, 3, 4, 25000, 'Ít đá'),
(2, 2, 3, 149000, NULL),
(2, 4, 6, 30000, NULL);

-- ======================
-- PAYMENTS
-- ======================
INSERT INTO payments (order_id, amount, method, status, paid_at) VALUES
(1, 498000, 'card', 'paid', '2026-03-01 19:50:00'),
(2, 627000, 'cash', 'pending', NULL);

-- ======================
-- RATINGS
-- ======================
INSERT INTO ratings (email, star, comment, user_id, booking_id) VALUES
('a@gmail.com', 5, 'Phục vụ tốt, món ngon', 1, 1),
('b@gmail.com', 4, 'Không gian đẹp', 2, 2);