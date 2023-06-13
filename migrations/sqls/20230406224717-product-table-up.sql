/* Replace with your SQL commands */
CREATE TABLE products(
    product_id VARCHAR(50) NOT NULL,
    price NUMERIC(7, 2) NOT NULL,
    review_score NUMERIC NOT NULL,
    order_approved_at Date NOT NULL,
    product_category_name VARCHAR(50)
);