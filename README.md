# Teebay
A simple product renting and buying/selling products application

---
### Pre-requisites

* Docker
* Docker Compose

To run this application, you must have Docker and Docker Compose installed. If you do not have those installed, follow the instructions for your operating system on the Docker website to install them.

---
### Running the Application
1. Clone this repository.
    ```sh
    git clone https://github.com/mhasan502/Teebay.git
    ```
2. Change directory to the root of the project. 
    ```sh
    cd Teebay
    ```

3. Run the following command to build the Docker images and start the containers:
    ```sh
    docker compose up
    ```

---
### Verifying the Installation
Once the containers are up and running, you can verify the installation by visiting the web application at http://localhost:3000.

Stopping and Removing the Containers
To stop and remove the containers, run the following command:

```sh
docker compose down
```
