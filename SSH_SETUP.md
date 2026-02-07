# OpenClaw SSH Access Configuration

## SSH Connection Details

**Container Host:** localhost
**SSH Port:** 2222 (mapped from container port 22)
**User:** openclaw
**Password:** openclaw (set in container)

## Connection Instructions

### Option 1: Using SSH (terminal)
```bash
ssh -p 2222 openclaw@localhost
# Password: openclaw
```

### Option 2: Via Docker
```bash
docker exec -it openclaw-gateway bash
# Then login as openclaw user
```

### Option 3: Open in VS Code (Remote SSH)
```bash
ssh://openclaw@localhost:2222/home/openclaw
# Or configure Remote-SSH extension with:
# Host: localhost
# User: openclaw
# Port: 2222
```

## Container Details

**Container Name:** openclaw-gateway
**Docker Compose File:** docker-compose.yml
**Build:** ./Dockerfile

## Control UI

**URL:** http://localhost:18789
**Default User:** admin (for control UI access)

## Management Commands

```bash
# Start container
docker-compose up -d

# Stop container
docker-compose down

# View logs
docker-compose logs -f openclaw

# Restart container
docker-compose restart

# Shell into container
docker exec -it openclaw-gateway bash
```

## Initial Setup

1. Start the container:
   ```bash
   docker-compose up -d
   ```

2. Wait for OpenClaw to fully initialize (check logs)

3. Access Control UI at http://localhost:18789

4. Configure channels (WhatsApp, Telegram, Discord, etc.) through the UI

5. For production use, consider:
   - Stronger SSH password
   - Key-based authentication (add your SSH key to ssh-keys directory)
   - Firewall rules to limit access
   - Running on a dedicated server
