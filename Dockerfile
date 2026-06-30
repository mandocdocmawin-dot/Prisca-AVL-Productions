# Step 1: Gamitin ang opisyal at lightweight na bersyon ng Nginx bilang base image
FROM nginx:alpine

# Step 2: Burahin ang default static files na kasama sa Nginx image
RUN rm -rf /usr/share/nginx/html/*

# Step 3: Kopyahin ang lahat ng files mula sa iyong project papunta sa folder ng Nginx
COPY . /usr/share/nginx/html/

# Step 4: I-expose ang port 80 para ma-access ang website
EXPOSE 80

# Step 5: Patakbuhin ang Nginx server
CMD ["nginx", "-g", "daemon off;"]