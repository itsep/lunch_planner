# Lunch Planer Web Database

## Instalation of MariaDB

install on linux

```bash
$ sudo apt-get install mariadb-server
```

monitor-mode of mariaDB on linux as root

```bash
$ sudo mysql -u root -p -h localhost
```

create new user

```bash
MariaBD> CREATE USER 'name'@'localhost' IDENTIFIED BY 'password';
```

give User all rights
```bach
GRANT ALL PRIVILEGES ON * . * TO 'sebi'@'localhost';
```

monitor-mode of mariaDB on linux as user
```bash
$ sudo mysql -u root -p -h localhost;
```


