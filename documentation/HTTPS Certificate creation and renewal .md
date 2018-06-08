# HTTPS Certificate creation and renewal 
Create or renew the certificate from letsencrypt 

```shell
sudo certbot certonly -d mylunch.space,'*.mylunch.space' --server https://acme-v02.api.letsencrypt.org/directory --manual --preferred-challenges dns 
``` 
Afterwards you need change the configuration of `nginx` and reload the config with:

```shell
sudo /etc/init.d/nginx reload
```