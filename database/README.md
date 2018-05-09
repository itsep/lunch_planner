# Lunch Planer Web Database

## Installation of MariaDB

### Installation on Linux

```bash
$ sudo apt-get install mariadb-server
```

#### Start on Linux

```bash
$ sudo /etc/init.d/mysql start
```
#### Stop on Linux
```bash
$ sudo /etc/init.d/mysql stop
```
monitor-mode of MariaDB on linux as root

```bash
$ sudo mysql -u root -p -h localhost
```

monitor-mode of MariaDB on linux as user
```bash
$ sudo mysql -u USERNAME -p -h localhost
```

## Create a User
Open a connection to your MariaDB instance and execute the following SQL command:

```sql
CREATE USER 'name'@'localhost' IDENTIFIED BY 'password';
```
After that, you need to give a user all rights:

```sql
GRANT ALL PRIVILEGES ON * . * TO 'name'@'localhost';
```

## Create a Database Dump
Open the terminal and execute the following command: 

```bash
mysqldump lunch_planner --no-create-info --skip-extended-insert --skip-dump-date > test_data_dump.sql
```