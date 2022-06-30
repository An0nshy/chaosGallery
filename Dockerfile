FROM debian:stable-slim

COPY ./build/go_build_picture /bin/
COPY ./assets /var/www/assets
COPY ./templates/ /var/www/templates

CMD ["/bin/go_build_picture"]