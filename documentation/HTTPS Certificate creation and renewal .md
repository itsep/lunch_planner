# HTTPS Certificate creation and renewal 
Install Certbot

```shell
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx 
```
Create or renew the certificate from letsencrypt 

```shell
sudo certbot certonly -d mylunch.space,'*.mylunch.space' --server https://acme-v02.api.letsencrypt.org/directory --manual --preferred-challenges dns 
``` 
Afterwards you need change the configuration of `nginx` and reload the config with:

```shell
sudo /etc/init.d/nginx reload
```