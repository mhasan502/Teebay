FROM node:18.17.1-slim

WORKDIR /opt/

# Copy files
COPY . /opt/

# Install dependecies and clean cache
RUN npm ci
RUN npm cache clean --force

CMD ["/bin/bash"]
