FROM debian:stable-slim

COPY ./build/chaosGallery /bin/
COPY ./assets /var/www/assets
COPY ./templates/ /var/www/templates

CMD ["/bin/chaosGallery"]