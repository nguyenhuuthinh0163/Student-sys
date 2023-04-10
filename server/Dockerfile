FROM php:8.1.12-fpm-alpine

RUN apk --no-cache add \
        openssl \
        libssh2-dev \
        libxml2-dev \
        libzip-dev \
        freetype-dev \
        libjpeg-turbo-dev \
        libpng-dev \
        oniguruma-dev

RUN docker-php-ext-install pdo pdo_mysql xml zip opcache \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install gd

# composer install
RUN curl -sS https://getcomposer.org/installer | php -- --version=2.5.2 --install-dir=/usr/bin --filename=composer

# Laravel & dependency install
COPY ./laravel/composer.json /tmp/composer.json
COPY ./laravel/composer.lock /tmp/composer.lock
ENV COMPOSER_ALLOW_SUPERUSER 1
RUN COMPOSER_MEMORY_LIMIT=-1 composer install --prefer-dist --no-scripts --no-autoloader -d /tmp

# php-fpm setting
COPY ./php/php-fpm.conf /usr/local/etc/php-fpm.d/zzz-www.conf
COPY ./php/php.ini /usr/local/etc/php/php.ini

# Copy Laravel app and autoload-setting
WORKDIR /var/www/html/
COPY ./laravel/ /var/www/html/

ENV PATH $PATH:/var/www/html/vendor/bin/

RUN mkdir -p /etc/gcp

RUN adduser -D -s /bin/sh -u 1000 student \
    && mv -n /tmp/vendor ./ \
    && composer dump-autoload \
    && chown -R student:student /var/www/html
ENTRYPOINT ["php", "-S", "0.0.0.0:44444", "-t", "public/"]
