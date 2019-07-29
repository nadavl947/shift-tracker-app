SELECT * FROM shift_app.shifts;

-- create Table shifts
CREATE TABLE shifts(
	id INT AUTO_INCREMENT PRIMARY KEY,
    shift_month TIMESTAMP DEFAULT NOW(),
    shift_date INT NOT NULL,
    shift_start TIME NOT NULL,
    shift_end TIME NOT null,
    user_email VARCHAR(200),
    FOREIGN KEY(user_email) REFERENCES shifts_users(user_email)
);

-- create Table users
CREATE TABLE shifts_users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_fname VARCHAR(100),
    user_lname VARCHAR(100),
    user_email VARCHAR(200) UNIQUE,
    user_password VARCHAR (200)
    );

-- insert into users
INSERT INTO 
	shifts_users(user_fname, user_lname, user_email, user_password) 
    VALUES
    ('nadav', 'levin', 'nadavl947@gmail.com', 'nadavpasswordis123'),
    ('rotem', 'monsa', 'rotemmonsa@gmail.com', 'rotempasswordis123');

-- select shifts home page
SELECT 
	DATE_FORMAT(shift_month, "%Y/%m") As 'month_and_year', 
    DATE_FORMAT(shift_start, "%H:%i") AS shift_start, 
    DATE_FORMAT(shift_end, "%H:%i") AS shift_end, 
    shift_date, 
    DATE_FORMAT(TIMEDIFF(shift_end, shift_start), "%H:%i") AS total_length, 
    id 
FROM shifts WHERE user_id = 1 ORDER BY shift_date;

-- select shift statistics    
SELECT 
	COUNT(id) AS total_shifts, 
	SUM(DATE_FORMAT(TIMEDIFF(shift_end, shift_start), "%H:%i")) AS total_hours, 
    COUNT(IF(shift_start BETWEEN 000000 AND 115959, 1, NULL)) AS morning,
    COUNT(IF(shift_start BETWEEN 120000 AND 195959, 1, NULL)) as noon, 
    COUNT(IF(shift_start BETWEEN 200000 AND 235959, 1, NULL)) AS night,
    COUNT(IF(
			DAYNAME(CONCAT(DATE_FORMAT(shift_month, '%Y/%m'),'/', shift_date))='Friday'
            || 
            DAYNAME(CONCAT(DATE_FORMAT(shift_month, '%Y/%m'),'/', shift_date))='Saturday'
		, 1, NULL)) As weekend
 FROM shifts WHERE user_email = 'rotemmonsa@gmail.com';

-- select statistics by month
SELECT 
	DATE_FORMAT(shift_month, '%M %Y') AS curent_month, 
    COUNT(id) AS total_shifts, 
    SUM(DATE_FORMAT(TIMEDIFF(shift_end, shift_start), "%H:%i")) AS total_hours, 
    COUNT(IF(shift_start BETWEEN 000000 AND 120000, 1, NULL)) AS morning, 
    COUNT(IF(shift_start BETWEEN 120100 AND 200000, 1, NULL)) as noon, 
    COUNT(IF(shift_start BETWEEN 200010 AND 235959, 1, NULL)) AS night,
	COUNT(IF(DAYNAME(CONCAT(DATE_FORMAT(shift_month, '%Y/%m'),'/', shift_date))='Friday' || DAYNAME(CONCAT(DATE_FORMAT(shift_month, '%Y/%m'),'/', shift_date))='Saturday', 1, NULL)) As weekend
FROM shifts WHERE user_id = 1 GROUP BY MONTH(shift_month) order by shift_month DESC LIMiT 2;

-- insert shift query

INSERT INTO shifts(shift_month, shift_date, shift_start, shift_end, user_email) VALUES (now(), 2, 063000, 143000, 'nadavl947@gmail.com');

