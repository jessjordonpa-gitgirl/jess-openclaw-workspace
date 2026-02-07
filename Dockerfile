FROM node:22-slim

# Install dependencies for SSH and utilities
RUN apt-get update && apt-get install -y \
    openssh-server \
    sudo \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set up SSH
RUN mkdir /run/sshd && \
    echo "PermitRootLogin yes" >> /etc/ssh/sshd_config && \
    echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config && \
    # Generate SSH keys
    ssh-keygen -A

# Install OpenClaw
RUN curl -fsSL https://openclaw.ai/install.sh | bash

# Create non-root user for OpenClaw
RUN useradd -m -s /bin/bash openclaw && \
    echo "openclaw ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# Set working directory
WORKDIR /home/openclaw

# Switch to openclaw user
USER openclaw

# Copy and setup openclaw data directory
RUN mkdir -p /home/openclaw/.openclaw

# Expose ports
# 18789: Control UI/Web Dashboard
# 22: SSH
EXPOSE 22 18789

# Start SSH and then OpenClaw gateway
CMD ["/usr/sbin/sshd", "-D"] && \
    openclaw gateway --port 18789
