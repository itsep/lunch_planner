# Installationsanleitung
Voraussetzung: Ubuntu 16.04 + Zugriff per ssh

## 1. Ubuntu Konfigurieren
#### Benutzer erstellen
Als erstes müssen wir einen neuen Benutzer mit dem Namen `lunchspace` erstellet werden:

```shell
adduser lunchspace
```
Benutzer in die `sudo` Gruppe hinzufügen

```shell
usermod -aG sudo lunchspace
```
Temporär den Benutzer wechseln

```shell
su - lunchspace
```
RSA public key hinzufügen

```
mkdir ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
```
Kopiere den RSA public key und füge es in den Editor ein.
Danach mit CTRL-X um den Editor zu verlassen, mit y das Speichern bestätigen und mit Enter den Namen bestätigen.

Danach die Berechtigungen Beschränken.

```shell
chmod 600 ~/.ssh/authorized_keys
```
Aus dem Lunchspace Account abmelden.

```shell
exit
```

#### Passwort Authentication ausschalten

```shell
sudo nano /etc/ssh/sshd_config
```

Suche nach folgenden Einträge und änder Sie wie folgt ab:

```shell
PubkeyAuthentication yes
ChallengeResponseAuthentication no
PasswordAuthentication no
```
Danach mit CTRL-X um den Editor zu verlassen, mit y das Speichern bestätigen und mit Enter den Namen bestätigen.

Lade die Konfiguration neu:

```shell
sudo systemctl reload sshd
```

### Firewall einstellen

Firewall installieren

```shell
sudo apt-get update
sudo apt-get install ufw
```

Ports öffnen

```shell
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
# only for CI - Jenkins
sudo ufw allow 8080
```

Firewall einschalten

```shell
sudo ufw enable
```

## Software Abhängigkeiten installieren

```shell
sudo apt update
# Required by bcrypt
sudo apt install make g++
# Required for deployment
sudo apt-get install git
```
nodejs und npm

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Process Manager installieren

```
sudo npm install -g pm2
pm2 startup
```

Redis installieren

```shell
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install redis-server
```
MariaDB

```
sudo apt-get install mariadb-server mariadb-client
```

Neuer User erstellen. Mit `sudo mysql` eine Verbindung zum MariaDB Server herstellen und dann die folgende Query ausführeren, nachdem `<enter username here>` und `<enter password here>` durch die richtigen werden ersetzt wurden.

```sql
CREATE USER '<enter username here>'@'localhost' IDENTIFIED BY '<enter password here>';
GRANT ALL PRIVILEGES ON * . * TO '<enter username here>'@'localhost';
FLUSH PRIVILEGES;
```

## Webserver/Proxy - NGINX installieren
```shell
sudo apt-get update
sudo apt-get install nginx
```
Gebe deinem User Rechte um auf den Ordner `/var/wwww` zu zugreifen :

```shell
sudo chown <your user name> /var/www
```
Lade die Konfigurationsdateien die im Repository unter `/nginx` liegen auf den Server unter `/etc/nginx` hoch und lade die Konfiguration neu:

```
sudo /etc/init.d/nginx reload
```

## HTTPS
Certbot installieren

```shell
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx 
```

Erstelle eine neues SSL Zertifikat

```shell
sudo certbot certonly -d mylunch.space,'*.mylunch.space' --server https://acme-v02.api.letsencrypt.org/directory --manual --preferred-challenges dns 
``` 

## [Optional] CI - Jenkins installieren
Installation

```shell
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install openjdk-8-jdk
sudo apt-get install jenkins
```

Um Jenkins zu konfigurieren benötigen wir das Initiale Passwort:

```shell
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Im Browser dann die Domain/IP Adresse des Servers eingeben mit dem Port `8080`.


Befolge dieses [Tutorial](https://resources.github.com/articles/practical-guide-to-CI-with-Jenkins-and-GitHub/)


## Repository Downloaden und Anwendung Starten
Repository clonen

```
git clone https://github.com/itsep/lunch_planner.git
cd lunch_planner
```

Datenbank Schema importieren mit Test Daten

```
npm run clear-database --prefix=backend
```

Neuste Version Downloaden und starten

```
sh deploy.sh
```



