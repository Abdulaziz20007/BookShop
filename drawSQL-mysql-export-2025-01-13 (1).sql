CREATE TABLE `books`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `category_id` INT NOT NULL,
    `author_id` VARCHAR(255) NOT NULL,
    `price` DECIMAL(8, 2) NOT NULL,
    `stock_quantity` INT NOT NULL,
    `publisher` VARCHAR(255) NOT NULL,
    `publication_date` DATE NOT NULL
);
CREATE TABLE `customers`(
    `customer_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `surname` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `birth_date` DATE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `verification` VARCHAR(255) NOT NULL,
    `refresh_token` BIGINT NOT NULL
);
CREATE TABLE `plans`(
    `plan_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `month` INT NOT NULL,
    `first_payment` DECIMAL(8, 2) NOT NULL,
    `percent` DECIMAL(8, 2) NOT NULL
);
CREATE TABLE `orders`(
    `order_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `customer_id` INT NOT NULL,
    `book_id` INT NOT NULL,
    `plan_id` INT NOT NULL,
    `total_amount` DECIMAL(8, 2) NOT NULL,
    `initial_payment` DECIMAL(8, 2) NOT NULL,
    `monthly_payment` DECIMAL(8, 2) NOT NULL,
    `order_date` TIMESTAMP NOT NULL,
    `delivery_date` DATE NOT NULL,
    `status` ENUM('') NOT NULL
);
CREATE TABLE `payments`(
    `payment_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `amount` DECIMAL(8, 2) NOT NULL,
    `payment_date` TIMESTAMP NOT NULL,
    `payment_method` ENUM('') NOT NULL,
    `payment_status` ENUM('') NOT NULL,
    `transaction_id` VARCHAR(255) NOT NULL
);
CREATE TABLE `authors`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `biography` TEXT NOT NULL,
    `birth_date` DATE NOT NULL,
    `nationality` VARCHAR(255) NOT NULL,
    `wiki_url` VARCHAR(255) NOT NULL
);
CREATE TABLE `book_reviews`(
    `review_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `customer_id` INT NOT NULL,
    `book_id` INT NOT NULL,
    `rating` INT NOT NULL,
    `review_date` TIMESTAMP NOT NULL
);
CREATE TABLE `book_categories`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL
);
CREATE TABLE `coupons`(
    `coupon_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(255) NOT NULL,
    `discount` INT NOT NULL,
    `from` DATE NOT NULL,
    `until` DATE NOT NULL,
    `times_used` INT NOT NULL,
    `is_active` BOOLEAN NOT NULL
);
CREATE TABLE `order_items`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `order_id` BIGINT NOT NULL,
    `book_id` BIGINT NOT NULL,
    `quantity` BIGINT NOT NULL
);
CREATE TABLE `cart_items`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `item_id` BIGINT NOT NULL,
    `quantity` BIGINT NOT NULL,
    `customer_id` BIGINT NOT NULL
);
CREATE TABLE `admins`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `refresh_token` VARCHAR(255) NOT NULL
);
CREATE TABLE `bans`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `admin_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `payments` ADD CONSTRAINT `payments_order_id_foreign` FOREIGN KEY(`order_id`) REFERENCES `orders`(`order_id`);
ALTER TABLE
    `book_reviews` ADD CONSTRAINT `book_reviews_customer_id_foreign` FOREIGN KEY(`customer_id`) REFERENCES `customers`(`customer_id`);
ALTER TABLE
    `orders` ADD CONSTRAINT `orders_plan_id_foreign` FOREIGN KEY(`plan_id`) REFERENCES `plans`(`plan_id`);
ALTER TABLE
    `bans` ADD CONSTRAINT `bans_admin_id_foreign` FOREIGN KEY(`admin_id`) REFERENCES `admins`(`id`);
ALTER TABLE
    `books` ADD CONSTRAINT `books_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `book_categories`(`id`);
ALTER TABLE
    `bans` ADD CONSTRAINT `bans_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `customers`(`customer_id`);
ALTER TABLE
    `orders` ADD CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY(`customer_id`) REFERENCES `customers`(`customer_id`);
ALTER TABLE
    `cart_items` ADD CONSTRAINT `cart_items_customer_id_foreign` FOREIGN KEY(`customer_id`) REFERENCES `customers`(`customer_id`);
ALTER TABLE
    `book_reviews` ADD CONSTRAINT `book_reviews_book_id_foreign` FOREIGN KEY(`book_id`) REFERENCES `books`(`id`);
ALTER TABLE
    `orders` ADD CONSTRAINT `orders_book_id_foreign` FOREIGN KEY(`book_id`) REFERENCES `books`(`id`);
ALTER TABLE
    `order_items` ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY(`order_id`) REFERENCES `orders`(`order_id`);
ALTER TABLE
    `order_items` ADD CONSTRAINT `order_items_book_id_foreign` FOREIGN KEY(`book_id`) REFERENCES `books`(`id`);
ALTER TABLE
    `books` ADD CONSTRAINT `books_author_id_foreign` FOREIGN KEY(`author_id`) REFERENCES `authors`(`id`);