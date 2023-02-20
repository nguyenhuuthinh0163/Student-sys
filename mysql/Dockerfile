FROM mysql:5.7

COPY ./my.cnf /etc/mysql/conf.d/my.cnf
RUN chmod 644 /etc/mysql/conf.d/my.cnf

RUN mkdir -p /var/log/mysql && touch /var/log/mysql/general.log