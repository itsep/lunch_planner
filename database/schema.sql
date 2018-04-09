-- User
CREATE TABLE account
(
  account_id INTEGER AUTO_INCREMENT,
  account_email VARCHAR(30) NOT NULL,
  account_name VARCHAR(255) NOT NULL,
  account_hashed_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (account_id)
);
