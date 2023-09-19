CREATE TABLE IF NOT EXISTS Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    phone VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL,
    addy VARCHAR(150) NOT NULL,
    postal VARCHAR(25) NOT NULL, 
    login_id VARCHAR(50) NOT NULL,
    login_salt VARCHAR(50) NOT NULL,
    login_password VARCHAR(50) NOT NULL,
    balance FLOAT NOT NULL,
    admin_val BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS Review (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    review_text VARCHAR(500),
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Review_Products (
    Preview_id INT PRIMARY KEY AUTO_INCREMENT,
    Preview_text VARCHAR(500),
    Preview_rate INT,
    prod_id INT REFERENCES Product(prod_id) ON DELETE CASCADE,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Branch (
    branch_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_addy VARCHAR(100),
    lat FLOAT,
    lon FLOAT
);

CREATE TABLE IF NOT EXISTS Car (
    car_id INT PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(25) NOT NULL,
    availibility VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS Trip (
    trip_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_code INT,
    trip_price FLOAT,
    distance FLOAT,
    branch_id INT REFERENCES Branch(branch_id),
    car_id INT REFERENCES Car(car_id)
);

CREATE TABLE IF NOT EXISTS Product (
    prod_id INT PRIMARY KEY AUTO_INCREMENT,
    prod_name VARCHAR(50) NOT NULL,
    prod_price FLOAT NOT NULL,
    img_url VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Shopping (
    receipt_id INT PRIMARY KEY AUTO_INCREMENT,
    shopping_price FLOAT NOT NULL,
    branch_id INT REFERENCES Branch(branch_id)
);

CREATE TABLE IF NOT EXISTS Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    date_issued DATE,
    date_completed DATE,
    order_price FLOAT NOT NULL,
    payment_code INT,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    trip_id INT REFERENCES Trip(trip_id) ON DELETE CASCADE,
    receipt_id INT REFERENCES Shopping(receipt_id) ON DELETE CASCADE,
    branch_id FLOAT REFERENCES Branch(branch_id) ON DELETE CASCADE,
	card_name VARCHAR(500),
	card_num VARCHAR(500),
	expiry VARCHAR(500),
	cvv VARCHAR(500),
	salt VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Purchased (
    purchase_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    prod_id INT REFERENCES Product(prod_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Error (
    error_text VARCHAR(50) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Messages (
    message_text VARCHAR(100) PRIMARY KEY
);

INSERT INTO Users (first_name, last_name, phone, email, addy, postal, login_id, login_salt, login_password, balance, admin_val)
VALUES ('Dave', 'Tran', '000-000-0000', 'dave.tran@gmail.com', 'Jane Finch Mall', 'M8V3B6', 'davetran', 'vW4SJfvFJf9hkUCP', 'ffa4fb0d0044e3f0384d75e881fd5e1c', 500.00, true),
        ('Anthony', 'Tran', '000-000-0001', 'atran@gmail.com', 'Yorkdale', 'M8V3B6', 'atran', '5EtA3f0orN4Ztwzf', 'fe6b3f9b3c01b91d3278d241f833e7eb' , 500.00, true),
        ('Sera', 'Wong', '000-000-0002', 'swong@gmail.com', 'Jane Finch Mall', 'M9C3J5', 'swong', 'b3/5KyIPaFMEfMyB', '86c9a1badb4cd57b4ee58884baf9e1f7', 500.00, true),
        ('Nanamin', 'Kento', '000-000-0003','nkento@gmail.com','4361 Yonge Street','M4W1J7','nkento','bHxMoqO6o6rihwuO','ffefb6e0063e8d342cfab1ab4ebcef1c',700.00, false),
        ('Seto', 'Kaiba', '000-000-0004', 'skaiba@gmail.com', '2514 Merton Street', 'M1L3K7', 'skaiba', 'AhOdbwsf6BcKF6kx', 'cbf720f7a3d7943c02af71e495143791', 500.00, false),
        ('Yae', 'Miko', '000-000-0005', 'ymiko@gmail.com', '1522 Adelaide St', 'M5H1P6', 'ymiko', 'j+BAsC+TjHCl9Vlt','6fedbd16b189161705dbfdf61a489837', 900.50, false);


INSERT INTO Review (review_text, user_id)
VALUES ('I am happy with the service I received. I ordered a smartphone and received it in good time at a reasonable price.', 0003),
        ('I ordered one thing and received something completely different, I''m not mad though', 0005),
        ('This place is better than KaibaCorp. 5/5 stars', 0004),
        ('I enjoy being able to shop to my needs while also being able to help the environment at the same time.', 0006);


INSERT INTO review_products(Preview_text, Preview_rate, prod_id, user_id) 
VALUES ('I enjoyed the blender', 4, 7, 1),
        ('Fast delivery and works well', 5, 7, 2),
        ('Blends well I like it', 5, 7, 3),
        ('Blender broke within 2 weeks of getting it. I would rate 0 stars if I could', 1, 7, 4),
        ('I enjoyed the waffle maker', 5, 6, 5), 
        ('All of my waffles come out in funny shapes, DO NOT RECOMMEND', 2, 6, 1),
        ('All of my waffles come out in cool shapes, highly recommend', 5, 6, 2),
        ('I thought this kettle would be battery powered', 3, 5, 3),
        ('I ordered just one kettle, but they sent me two!', 5, 5, 4),
        ('I think I ordered the wrong thing', 5, 5, 5),
        ('The toaster either burns my toast or does not cook it at all', 2, 4, 6),
        ('It works as expected.',5, 4, 1),
        ('The rice cooker has lots of different settings', 5, 3, 2),
        ('I have been using it for a year now, no problems so far',5, 3, 3),
        ('It needs rice to cook', 4, 3, 2),
        ('Its a microwave',5,2,1),
        ('It can only cook for 30 seconds, there is no other option', 1,2,2),
        ('Where am I?',5,2,3),
        ('The coffee machine is a must-have in any household',5,1,4),
        ('The shipping took too long so I ended up returning this one and getting a different one',2,1,5),
        ('The coffee gave me a headache every time I drank it',3,1,6);


         

INSERT INTO Branch (branch_addy, lat, lon)
VALUES ('Ryerson University', 43.657374, -79.378804),
        ('209 Bloor Street', 43.668255, -79.395536),
        ('158 Sterling Road', 43.654423, -79.444962),
        ('4841 Yonge Street', 43.761974, -79.410676);

INSERT INTO Car (model, availibility)
VALUES ('Subaru', 'Available'),
        ('Corolla Cross SUV', 'Available'),
        ('Range Rover', 'Available'),
        ('Bugatti', 'Available'),
        ('Lamborghini', 'Available');

INSERT INTO Trip (destination_code, trip_price, distance, branch_id, car_id)
VALUES (0001, 10.50, 52.00, 0000, 0002),
        (0002, 35.87, 68.9, 0001, 0003),
        (0003, 5.65, 10.00, 0002, 0001);

INSERT INTO Product (prod_name, prod_price, img_url)
VALUES ('Coffee machine', 45.49, 'img/products/coffee.png'), 
        ('Microwave', 99.99, 'img/products/microwave.png'),
        ('Rice cooker', 35.99, 'img/products/rice.jpg'),
        ('Toaster', 25.55, 'img/products/toaster.jpg'),
        ('Electric Kettle', 54.99, 'img/products/kettle.jpg'),
        ('Waffle Maker', 40.00, 'img/products/waffle.jpg'),
        ('Blender', 149.99, 'img/products/blender.png');

INSERT INTO Shopping (shopping_price, branch_id)
VALUES (81.48, 0000),
        (107.03, 0001),
        (45.49, 0002);

INSERT INTO Orders (date_issued, date_completed, order_price, payment_code, user_id, trip_id, receipt_id, branch_id, card_name, card_num, expiry, cvv, salt)
VALUES ('2022-01-20', '2022-01-25', 81.48, 0000, 0003, 0000, 0000, 0000, "Gawr Gura", "1234123412341234", "06/20", "420", "vW4SJfvFJf9hkUCP"),
        ('2022-01-26', '2022-02-01', 107.03, 0001, 0004,0001, 0001, 0001, "Fischl Mona", "6969420696944200", "06/09", "690", "AhOdbwsf6BcKF6kx"),
        ('2022-02-10', '2022-02-13', 45.49, 0002, 0005, 0002, 0002, 0002, "Predator", "4123456774652453", "12/25", "334", "bHxMoqO6o6rihwuO");
