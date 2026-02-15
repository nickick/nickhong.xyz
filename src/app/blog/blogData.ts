export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "securing-your-vps-for-openclaw",
    title: "Securing Your VPS for OpenClaw: A Survival Guide",
    excerpt: "Essential security hardening steps for your VPS before deploying OpenClaw, based on real experience with automated attacks hitting fresh servers within minutes.",
    content: `
## The Dark Forest Awaits

A VPS is a solid, always-on, and cost-effective way to run an OpenClaw setup. But it requires additional security steps to make sure it doesn't get taken over by random cryptominer malware.

Spin up a fresh VPS and watch your logs. [The internet is a dark forest](https://gwern.net/dark-forest) - you'll get brute force attempts at guessing your password within 5 minutes of spinning up a fresh VPS. Follow this guide to keep your OpenClaw box safe.

**Want an AI-native guide?** You can also give [the agent walkthrough](/blog/vps-security-agent-guide) to your AI assistant and have it execute these steps for you.

Here's what you need to do to survive.

---

## 1. Create a Non-Root User Immediately

Never run operations as root. Create a dedicated user with sudo privileges:

\`\`\`bash
# Add a new user (you'll be prompted to set a password)
adduser yourusername

# Add to sudo group
usermod -aG sudo yourusername

# Switch to new user
su - yourusername

# Verify sudo works
sudo whoami
# Should output: root
\`\`\`

**Important:** Store this password in a password manager like 1Password. You'll need it for sudo commands.

---

## 1.5. Disable Root Password (Optional but Recommended)

If you want to completely prevent root login via password (even with keys), lock the root account:

\`\`\`bash
# As root or sudo user, lock root password
sudo passwd -l root
\`\`\`

**Note:** This prevents any password-based root access. Ensure your sudo user works correctly before doing this! If you need root access later, you can use \`sudo -i\` or \`sudo su -\` from your sudo-enabled user.

---

## 2. Lock Down SSH: Custom Port + Key Auth + No Root

Default SSH on port 22 is a magnet for attacks. Move it and harden it.

Edit \`/etc/ssh/sshd_config\`:

\`\`\`bash
# Change default port (pick something above 1024)
Port 2222

# Disable root login
PermitRootLogin no

# Disable password authentication (use keys only)
PasswordAuthentication no
PubkeyAuthentication yes

# Allow only your specific user
AllowUsers yourusername
\`\`\`

Set up SSH keys before disabling password auth:

\`\`\`bash
# On your local machine
cat ~/.ssh/id_ed25519.pub

# On the server, as your user
mkdir -p ~/.ssh
echo "your-public-key-content" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
\`\`\`

### 2.1 Configure SSH Client to Prevent Self-Banning

On your local machine, create or edit \`~/.ssh/config\` to prevent accidental lockouts:

\`\`\`bash
# ~/.ssh/config
Host my-vps
    HostName YOUR_SERVER_IP
    Port 2222
    User yourusername
    IdentityFile ~/.ssh/id_ed25519
    ServerAliveInterval 60
    ServerAliveCountMax 3
    # Prevent multiple auth attempts that could trigger fail2ban
    IdentitiesOnly yes
\`\`\`

Now connect with: \`ssh my-vps\`

Restart SSH and test your new port before closing your current session:

\`\`\`bash
sudo systemctl restart sshd

# Test in new terminal (don't close current one!)
ssh -p 2222 yourusername@your-server-ip
\`\`\`

---

## 3. Firewall Everything with UFW

Block everything by default, allow only what you need:

\`\`\`bash
# Enable UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow your custom SSH port
sudo ufw allow 2222/tcp

# Allow OpenClaw gateway port (if exposed)
sudo ufw allow 3000/tcp

# Allow HTTP/HTTPS if running web server
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
\`\`\`

---

## 4. Install Fail2Ban for Automated Defense

Fail2Ban monitors logs and automatically bans IPs showing malicious patterns:

\`\`\`bash
# Install
sudo apt install fail2ban

# Create local config
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit jail.local
sudo nano /etc/fail2ban/jail.local
\`\`\`

Key settings for your custom SSH port (strict - 24 hour ban after 3 failures):

\`\`\`ini
[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 86400
findtime = 600
\`\`\`

Start and enable:

\`\`\`bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Check banned IPs
sudo fail2ban-client status sshd
\`\`\`

---

## 5. What To Do If You Ban Yourself

If you trigger fail2ban and lock yourself out:

1. **Access your VPS provider's control panel**
2. **Look for "KVM", "Console", or "Rescue" access**
3. **Connect via the web console** (this bypasses SSH)
4. **Unban your IP:**

\`\`\`bash
# Check banned IPs
sudo fail2ban-client status sshd

# Unban your IP (replace with your actual IP)
sudo fail2ban-client set sshd unbanip YOUR_IP_ADDRESS
\`\`\`

5. **Review your SSH config** to prevent future bans:
   - Ensure \`IdentitiesOnly yes\` is set
   - Verify you're using the correct key
   - Consider adding your IP to fail2ban whitelist (with caution):

\`\`\`bash
# Add to /etc/fail2ban/jail.local under [DEFAULT]
ignoreip = 127.0.0.1/8 YOUR_HOME_IP
\`\`\`

---

## 6. Monitor and Update

Set up automatic security updates:

\`\`\`bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
\`\`\`

Monitor your logs regularly:

\`\`\`bash
# Watch failed SSH attempts in real-time
sudo tail -f /var/log/auth.log

# See who's currently connected
who

# Check recent login history
last
\`\`\`

---

## The Result

After implementing these measures, my server went from hundreds of failed SSH attempts daily to near-zero successful intrusions. The bots still knock, but they can't get in.

OpenClaw gets more powerful the more access you give it-to your calendar, messages, files, and other services. But that also means a compromised OpenClaw server becomes more damaging. The foundation matters more here than on a typical VPS.

**Want an AI-native guide?** Check out the [Agent Walkthrough Guide](/blog/vps-security-agent-guide) - a structured guide designed for AI agents to walk you through securing your VPS step by step, plus instructions for checking if your server has been compromised.

Stay paranoid. Stay secure.

- Nick
    `,
    date: "2026-02-15",
    tags: ["security", "vps", "openclaw", "ssh", "hardening"],
  },
  {
    slug: "vps-security-agent-guide",
    title: "VPS Security Agent Guide: Automated Hardening",
    excerpt: "A guide for AI agents with root SSH access to automatically secure a VPS. Execute commands directly - no user interaction required.",
    content: `
## AGENT CONTEXT

You are an AI agent running on the client's local machine with root SSH access to a freshly provisioned VPS. Your job: secure this VPS automatically. Execute all commands via SSH. Report progress after each phase.

**SSH Connection:** You have root access. Create a dedicated user and switch to key-based auth, then lock down root.

---

# PART 1: AUTOMATED VPS HARDENING

## Phase 1: Initial Assessment

Check current security state:

\`\`\`bash
# Check current user
whoami

# Check SSH configuration
grep -E "^(Port|PermitRootLogin|PasswordAuthentication)" /etc/ssh/sshd_config

# Check if UFW is active
ufw status

# Check if Fail2Ban is installed
which fail2ban-client
\`\`\`

**Expected outputs:**
- whoami: root
- SSH: Likely Port 22, PermitRootLogin yes, PasswordAuthentication yes
- UFW: likely inactive
- Fail2Ban: likely not installed

---

## Phase 2: Create Dedicated User

Create non-root user with sudo access:

\`\`\`bash
# Create user with password (inform user to store in password manager)
adduser --gecos "" openclaw

# Add to sudo group
usermod -aG sudo openclaw
\`\`\`

**Report:** User 'openclaw' created with sudo privileges. Instruct user to store password in 1Password or similar password manager.

---

## Phase 3: Generate and Install SSH Keys

Generate key pair locally and install on server:

\`\`\`bash
# Generate SSH key (if not exists)
[ -f ~/.ssh/id_ed25519 ] || ssh-keygen -t ed25519 -C "openclaw-vps" -f ~/.ssh/id_ed25519 -N ""

# Get public key content
PUBKEY=$(cat ~/.ssh/id_ed25519.pub)

# Install key on server for openclaw user
mkdir -p /home/openclaw/.ssh
echo "$PUBKEY" > /home/openclaw/.ssh/authorized_keys
chmod 700 /home/openclaw/.ssh
chmod 600 /home/openclaw/.ssh/authorized_keys
chown -R openclaw:openclaw /home/openclaw/.ssh
\`\`\`

**Report:** SSH key installed for openclaw user.

---

## Phase 4: Harden SSH Configuration

Backup and modify SSH config:

\`\`\`bash
# Backup original
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup.$(date +%Y%m%d)

# Generate random port between 1024-65535
SSH_PORT=$((1024 + RANDOM % 64511))

# Write new SSH config
cat > /etc/ssh/sshd_config << 'EOF'
# Security-hardened SSH config
Port SSH_PORT_PLACEHOLDER
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AllowUsers openclaw
MaxAuthTries 3
ClientAliveInterval 60
ClientAliveCountMax 3

# Cryptography
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org
EOF

# Replace placeholder with actual port
sed -i "s/SSH_PORT_PLACEHOLDER/$SSH_PORT/g" /etc/ssh/sshd_config

# Validate config
sshd -t
\`\`\`

**Report:** SSH configured on port $SSH_PORT. Root login disabled. Password auth disabled.

---

## Phase 5: Configure SSH Client (Prevent Self-Banning)

Create SSH config on client machine to prevent accidental fail2ban triggers:

\`\`\`bash
# Create SSH config directory if needed
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add VPS entry to SSH config
cat >> ~/.ssh/config << EOF

Host vps-openclaw
    HostName localhost
    Port $SSH_PORT
    User openclaw
    IdentityFile ~/.ssh/id_ed25519
    ServerAliveInterval 60
    ServerAliveCountMax 3
    IdentitiesOnly yes
    StrictHostKeyChecking accept-new
EOF

chmod 600 ~/.ssh/config
\`\`\`

**Report:** SSH client configured. User can connect with: ssh vps-openclaw

---

## Phase 6: Configure Firewall

Set up UFW with essential rules:

\`\`\`bash
# Reset UFW to defaults
ufw --force reset

# Default policies
ufw default deny incoming
ufw default allow outgoing

# Allow new SSH port
ufw allow $SSH_PORT/tcp

# Allow standard web ports (optional)
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw --force enable

# Show status
ufw status verbose
\`\`\`

**Report:** Firewall active. Only SSH port $SSH_PORT and web ports allowed.

---

## Phase 7: Install and Configure Fail2Ban (Strict)

Install automated IP banning with strict settings (24 hour ban):

\`\`\`bash
# Update package list
apt-get update

# Install Fail2Ban
apt-get install -y fail2ban

# Create jail.local with strict SSH protection (24hr ban)
cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 86400
findtime = 600
maxretry = 3
backend = systemd

[sshd]
enabled = true
port = $SSH_PORT
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 86400
findtime = 600
EOF

# Start and enable
systemctl enable fail2ban
systemctl start fail2ban

# Verify
fail2ban-client status sshd
\`\`\`

**Report:** Fail2Ban installed with strict settings (24hr ban after 3 failures) on port $SSH_PORT.

---

## Phase 8: Disable Root Password

Lock root account password:

\`\`\`bash
# Lock root password (prevents password login even with keys)
passwd -l root

# Verify openclaw can still sudo
su - openclaw -c "sudo whoami"
\`\`\`

**Report:** Root password locked. OpenClaw user has working sudo access.

---

## Phase 9: Enable Automatic Updates

Install unattended security updates:

\`\`\`bash
# Install
apt-get install -y unattended-upgrades

# Configure for security updates only
cat > /etc/apt/apt.conf.d/50unattended-upgrades << 'EOF'
Unattended-Upgrade::Allowed-Origins {
    "\${distro_id}:\${distro_codename}-security";
};
Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::InstallOnShutdown "false";
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
EOF

# Enable
systemctl enable unattended-upgrades
systemctl start unattended-upgrades
\`\`\`

**Report:** Automatic security updates enabled.

---

## Phase 10: Restart SSH and Verify

Apply SSH changes and test:

\`\`\`bash
# Restart SSH
systemctl restart sshd

# Verify SSH is listening on new port
ss -tlnp | grep $SSH_PORT

# Test that root login fails (should timeout or refuse)
timeout 5 ssh -o StrictHostKeyChecking=no -o BatchMode=yes -p $SSH_PORT root@localhost 2>&1 || echo "Root login correctly blocked"
\`\`\`

**CRITICAL:** Now you must reconnect as 'openclaw' user on port $SSH_PORT using the SSH key.

---

# PART 2: POST-HARDENING VERIFICATION

Once reconnected as 'openclaw' user with key auth, verify the setup:

## Verification Checklist

\`\`\`bash
# 1. Verify non-root user
whoami
# Should output: openclaw

# 2. Verify sudo works
sudo whoami
# Should output: root

# 3. Verify SSH port
grep "^Port" /etc/ssh/sshd_config

# 4. Verify root login disabled
grep "^PermitRootLogin" /etc/ssh/sshd_config

# 5. Verify password auth disabled
grep "^PasswordAuthentication" /etc/ssh/sshd_config

# 6. Verify firewall active
sudo ufw status | grep "Status: active"

# 7. Verify Fail2Ban running
sudo systemctl is-active fail2ban

# 8. Check for existing bans (should be empty or show banned IPs)
sudo fail2ban-client status sshd

# 9. Verify unattended upgrades
sudo systemctl is-active unattended-upgrades
\`\`\`

**Report all verification results.**

---

# PART 3: UNBAN PROCEDURE (If Needed)

If the user bans themselves, provide these recovery steps:

## Recovery via VPS Provider Console

1. **Access VPS provider control panel**
2. **Find "KVM Console", "Web Console", or "Rescue Mode"**
3. **Connect through provider's web interface** (bypasses SSH)
4. **Unban the IP:**

\`\`\`bash
# Check banned IPs
sudo fail2ban-client status sshd

# Unban specific IP (replace with actual IP)
sudo fail2ban-client set sshd unbanip BANNED_IP
\`\`\`

5. **Update SSH client config** to prevent future bans:
   - Ensure IdentitiesOnly yes is set
   - Verify correct key is specified
   - Check ServerAlive settings

---

# PART 4: COMPROMISE DETECTION COMMANDS

If you suspect compromise, run these checks:

## Quick Health Check

\`\`\`bash
# Current sessions
who && w

# Recent logins
last | head -20

# Failed SSH attempts
grep "Failed" /var/log/auth.log | tail -20

# Successful logins
grep "Accepted" /var/log/auth.log | tail -20

# Running processes by CPU
ps aux --sort=-%cpu | head -15

# Network connections
ss -tulpn | grep ESTAB

# Recent file changes in /etc
find /etc -mtime -1 -type f 2>/dev/null | head -20

# Check for new users with shell access
awk -F: '$7 ~ /(\/bin\/bash|\/bin\/sh)/ {print $1}' /etc/passwd

# Check cron jobs for all users
for user in $(cut -f1 -d: /etc/passwd); do echo "=== $user ==="; crontab -u $user -l 2>/dev/null; done

# Check authorized keys for all users
find /home -name "authorized_keys" -exec echo "=== {} ===" \; -exec cat {} \;
\`\`\`

## Red Flags to Report

- Unknown users in \`who\` or \`last\` output
- Successful logins from unexpected IPs
- Processes consuming high CPU that you didn't start
- Listening ports you didn't configure
- Modified SSH config files
- Unauthorized SSH keys
- Cron jobs you didn't create
- Files in /tmp or /dev/shm that look suspicious

---

# FINAL REPORT

Provide the client with:

1. **SSH Connection Details:**
   - User: openclaw
   - Port: $SSH_PORT
   - Auth: SSH key only
   - Connect with: ssh vps-openclaw

2. **Security Status:**
   - Root login: Disabled
   - Password auth: Disabled
   - Firewall: Active
   - Fail2Ban: Active (24hr ban after 3 failures)
   - Auto-updates: Enabled

3. **Verification Results:** All checks passed/failed

4. **Compromise Check Results:** (if run)

5. **Recovery Info:**
   - If banned: Use provider's KVM console to unban
   - SSH config: ~/.ssh/config configured for safe connection

6. **Next Steps:**
   - Store SSH key securely
   - Save these connection details
   - Store sudo password in 1Password
   - Regular monitoring recommended

---

## AGENT EXECUTION NOTES

- All commands assume root SSH access initially
- After Phase 10, switch to 'openclaw' user with key auth
- If any command fails, stop and report the error
- Document any deviations from this guide
- Client should verify they can connect before you disconnect
- Emphasize password manager usage for sudo password
    `,
    date: "2026-02-15",
    tags: ["security", "vps", "automation", "agent", "hardening"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
