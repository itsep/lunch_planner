-- User
CREATE TABLE account
(
  account_id INTEGER AUTO_INCREMENT,
  account_email VARCHAR(120) NOT NULL,
  account_hashed_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (account_id),
  UNIQUE (account_email)
);
