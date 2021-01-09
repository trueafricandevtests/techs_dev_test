FROM php:7.2-apache
RUN apt-get update && apt-get install -y vim
COPY ./* /var/www/html/
EXPOSE 80
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
