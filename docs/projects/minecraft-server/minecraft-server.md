# Minecraft Server (Dockerized)

## Table of Contents
- [Description](#description)
- [Quickstart](#quickstart)
- [Usage](#usage)
  - [Environment Variables](#environment-variables)
  - [Ports](#ports)
  - [Volumes / Data Persistence](#volumes--data-persistence)
  - [Restart Behavior](#restart-behavior)
- [Testing](#testing)
- [Repository Structure](#repository-structure)

## Description
This repository contains a fully containerized **Minecraft Java Edition server**, built from scratch using a custom `Dockerfile` (no pre-built Minecraft images). The server runs inside a Docker container based on `eclipse-temurin` (JRE) and is orchestrated via `docker-compose.yaml`.

The purpose of this repository is to provide a reproducible, portable way to build, run, and persist a Minecraft server on any host or cloud VM that supports Docker, without manually installing Java or managing the server binary by hand.

## Quickstart
**Prerequisites:**
- Docker Engine (20.10+)
- Docker Compose plugin (v2+)

> [!IMPORTANT]
> You must set `EULA_ACCEPTED=true` in your `.env` file before starting the server. This confirms you accept the [Minecraft EULA](https://www.minecraft.net/en-us/eula) — the server will refuse to start otherwise.

**Steps:**
```bash
git clone https://github.com/PariKhavari/minecraft-server.git
cd minecraft-server
cp .env.example .env
# set EULA_ACCEPTED=true in .env before starting
docker compose build
docker compose up -d
```

The server will be reachable on port `8888` (mapped to the container's internal Minecraft port `25565`) a few seconds after startup — check readiness with:
```bash
docker compose logs -f mc-server
```
Look for the line `Done (...)! For help, type "help"`.

## Usage

### Environment Variables
The following non-critical environment variables can be configured in `docker-compose.yaml` under the `mc-server` service. Sensible defaults are provided so the server starts even without explicit configuration:

| Variable        | Default        | Description                                  |
|------------------|----------------|-----------------------------------------------|
| `MC_VERSION`     | `1.21.1`       | Minecraft server version to download and run |
| `SERVER_NAME`    | `My Minecraft Server` | Display name of the server (`motd`)   |
| `GAME_MODE`      | `survival`     | Default game mode                            |
| `DIFFICULTY`     | `normal`       | World difficulty                             |
| `MAX_PLAYERS`    | `20`           | Maximum number of concurrent players         |
| `EULA_ACCEPTED`  | `false`        | Must be set to `true` to accept the [Minecraft EULA](https://www.minecraft.net/en-us/eula); the server will not start otherwise |

> [!NOTE]
> No authentication secrets, tokens, or credentials are configured via environment variables in this repository, in line with the security guidelines below.

> [!NOTE]
> Setting `EULA_ACCEPTED=true` causes the entrypoint script to generate `eula.txt` with `eula=true` inside the container at startup — this file is not committed to the repository, since accepting the EULA is a per-deployment decision.

To change a value, edit the `environment:` section of the `mc-server` service in `docker-compose.yaml`, e.g.:
```yaml
environment:
  - MC_VERSION=1.21.1
  - GAME_MODE=creative
  - DIFFICULTY=hard
```
Rebuild/restart afterwards with `docker compose up -d --build` for the change to take effect.

### Ports
| Host Port | Container Port | Purpose                 |
|-----------|-----------------|--------------------------|
| `8888`    | `25565`         | Minecraft Java protocol |

To connect from a Minecraft Java client, use `<your-vm-ip>:8888` as the server address.

### Volumes / Data Persistence
World data, player data, and server configuration are persisted using a named Docker volume, so the game state survives container restarts and rebuilds:

```yaml
volumes:
  - mc-data:/server
```

Docker manages this volume internally (not a bind mount). Inspect its location with:
```bash
docker volume inspect mc-data
```

> [!CAUTION]
> Do not remove the `mc-data` volume (`docker volume rm`) unless you intend to permanently reset the world — this deletes all world and player data with no way to recover it.

### Restart Behavior
The service is configured with `restart: on-failure` (or `unless-stopped`), so the container automatically restarts if the Minecraft process crashes or the container otherwise terminates unexpectedly.

## Testing
Before submitting or deploying this project, verify the following:

1. **Connectivity check** using the included `app.py` script (based on [`mcstatus`](https://github.com/py-mine/mcstatus)):
   ```bash
   pip install mcstatus
   python app.py <host>:8888
   ```
   A successful response prints the server version and current player count.

2. **Persistence check**: restart the container (`docker compose restart`) and confirm the world/config data is unchanged.

3. **Resilience check**: manually kill the server process inside the container and confirm Docker restarts it automatically.

4. **(Optional)** Connect with an actual Minecraft Java client to `<host>:8888`.

## Repository Structure
```
.
├── Dockerfile             # Builds the Minecraft server image (no pre-built MC image used)
├── docker-compose.yaml    # Defines and configures the mc-server service
├── entrypoint.sh          # Startup script executed inside the container
├── app.py                 # Test script using mcstatus to verify server availability
├── .env.example           # Template for environment variables (copy to .env)
├── .gitignore
├── .dockerignore          # Excludes non-essential files from the build context
└── README.md
```
