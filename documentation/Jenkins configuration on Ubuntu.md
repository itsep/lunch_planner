# Jenkins - CI
Current URL: [Jenkins Blue Ocean Dashboard](http://ec2-18-196-226-96.eu-central-1.compute.amazonaws.com:8080/blue/organizations/jenkins/lunch_planner/activity)

# Jenkins configuration on Ubuntu
## Connect to the ubuntu server
On macOS and Linux open a new terminal and run the following commands:  
#### 1. Change right of the certificate to read rights only 
```bash
chmod 400 it-sep.pem
```
#### 2. Connect
```
ssh -i it-sep.pem ubuntu@18.197.206.29
```

## Install Software Dependencies
#### 1. Make (bcrypt requires make)
```bash
sudo apt install make
```
#### 2. g++ (bcrypt/make requires make)
```bash
sudo apt-get install g++
```

## [Install Jenkins](https://wiki.jenkins.io/display/JENKINS/Installing+Jenkins+on+Ubuntu)
```bash
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
```
Go to `example.com:8080` and configure Jenkins. Don't forget to open port `8080` in the security group. To get the default password of Jenkins execute this command on the server:  

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

## Install Node.js
```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

# GitHub Integration
Flow this [Tutorial](https://resources.github.com/articles/practical-guide-to-CI-with-Jenkins-and-GitHub/)

# MariaDB
#### Installation
```bash
sudo apt-get update
sudo apt-get install mariadb-server mariadb-client
```
#### Secure Installation
```bash
sudo mysql_secure_installation
```

#### Create New User
```sql
CREATE USER 'root'@'localhost' IDENTIFIED BY '\'[/ZI\eXucdqAuV*8m0E';
GRANT ALL PRIVILEGES ON * . * TO 'root'@'localhost';
FLUSH PRIVILEGES;
```


