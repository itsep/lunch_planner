DROP DATABASE lunch_planner
CREATE DATABASE IF NOT EXISTS lunch_planner;
USE lunch_planner;

-- User
CREATE TABLE account
(
    account_email VARCHAR(30) NOT NULL,
    account_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (account_email)
);




INSERT INTO account (account_email, account_name) VALUES ('sebi@sebi.sebi', 'Sebi Sebi');
