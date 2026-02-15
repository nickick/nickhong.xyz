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

Spin up a fresh VPS and watch your logs. Within minutes—sometimes seconds—you'll see automated bots probing for weaknesses. SSH brute force attempts, vulnerability scanners, cryptocurrency miners looking for unguarded resources. The internet is a dark forest, and your newly exposed server is fresh meat.

This isn't theoretical. When I spun up a VPS for OpenClaw, I saw over 1,000 failed SSH login attempts in the first hour. The bots are always watching.

Here's what you need to do to survive.

---

## 1. Create a Non-Root User Immediately

Never run operations as root. Create a dedicated user with sudo privileges:

\`\`\`bash
# Add a new user
adduser yourusername

# Add to sudo group
usermod -aG sudo yourusername

# Switch to new user
su - yourusername

# Verify sudo works
sudo whoami
# Should output: root
\`\`\`

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

Key settings for your custom SSH port:

\`\`\`ini
[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
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

## 5. Monitor and Update

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

After implementing these measures, my server went from thousands of daily brute force attempts to near-zero successful intrusions. The bots still knock, but they can't get in.

OpenClaw gives you powerful capabilities—make sure your foundation is solid. A compromised VPS isn't just your problem; it's a liability for everything connected to it.

**Want an interactive guide?** Check out the [Agent Walkthrough Guide](/blog/vps-security-agent-guide) - a structured guide designed for AI agents to walk you through securing your VPS step by step, plus instructions for checking if your server has been compromised.

Stay paranoid. Stay secure.

— Nick
    `,
    date: "2026-02-15",
    tags: ["security", "vps", "openclaw", "ssh", "hardening"],
  },
  {
    slug: "vps-security-agent-guide",
    title: "VPS Security Agent Guide: Interactive Walkthrough",
    excerpt: "A structured guide for AI agents to walk users through securing their VPS and inspecting for compromise. Designed for step-by-step interactive assistance.",
    content: `
## AGENT INSTRUCTION: How to Use This Guide

This document is designed for AI agents to help users secure their VPS and check for compromise. **Read the full guide first**, then walk the user through each step interactively. Ask for confirmation before executing commands. Explain what each step does in plain language.

---

# PART 1: VPS SECURITY SETUP WALKTHROUGH

## Phase 1: Initial Assessment

**AGENT:** First, let's check what state your VPS is in. I'll ask you to run some diagnostic commands.

### Step 1.1: Check Current User
**COMMAND:** 
\`\`\`bash
whoami
\`\`\`

**AGENT:** If output shows \`root\`, we need to create a non-root user immediately. If it shows a username, we may still need to verify sudo access.

### Step 1.2: Check SSH Configuration
**COMMAND:**
\`\`\`bash
grep -E "^(Port|PermitRootLogin|PasswordAuthentication)" /etc/ssh/sshd_config 2>/dev/null || echo "Could not read SSH config - may need sudo"
\`\`\`

**AGENT:** Ask user to share the output. Look for:
- Port: Should NOT be 22 (preferably above 1024)
- PermitRootLogin: Should be \`no\` or \`prohibit-password\`
- PasswordAuthentication: Should be \`no\`

---

## Phase 2: Create Non-Root User

**AGENT:** Never run OpenClaw as root. Let's create a dedicated user with sudo privileges.

### Step 2.1: Create New User
**COMMAND:**
\`\`\`bash
sudo adduser openclaw
\`\`\`

**AGENT:** Walk user through:
1. Setting a strong password
2. Fill in user info (can leave blank)
3. Confirm user creation

### Step 2.2: Add to Sudo Group
**COMMAND:**
\`\`\`bash
sudo usermod -aG sudo openclaw
\`\`\`

### Step 2.3: Verify Sudo Works
**COMMAND:**
\`\`\`bash
su - openclaw
sudo whoami
\`\`\`

**AGENT:** Should output \`root\`. If yes, success! If no, troubleshoot permissions.

---

## Phase 3: SSH Key Setup

**AGENT:** Passwords can be brute-forced. SSH keys are much more secure. We'll set up key authentication.

### Step 3.1: Check for Existing Keys
**COMMAND (on user's local machine):**
\`\`\`bash
ls -la ~/.ssh/*.pub 2>/dev/null || echo "No public keys found"
\`\`\`

**AGENT:** If no keys exist, guide user to generate one:
\`\`\`bash
ssh-keygen -t ed25519 -C "your-email@example.com"
\`\`\`

### Step 3.2: Copy Public Key to Server
**COMMAND (on user's local machine):**
\`\`\`bash
cat ~/.ssh/id_ed25519.pub
\`\`\`

**AGENT:** User copies the output. Then on the server as the new \`openclaw\` user:

**COMMAND:**
\`\`\`bash
mkdir -p ~/.ssh
echo "PASTE_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
\`\`\`

---

## Phase 4: Harden SSH Configuration

**AGENT:** Now we'll make SSH much more secure. **Important:** Keep your current terminal session open while testing!

### Step 4.1: Backup Original Config
**COMMAND:**
\`\`\`bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup
\`\`\`

### Step 4.2: Edit SSH Config
**COMMAND:**
\`\`\`bash
sudo nano /etc/ssh/sshd_config
\`\`\`

**AGENT:** Guide user to find and modify these lines:

\`\`\`ini
# Change port (pick 2222 or any number 1024-65535)
Port 2222

# Disable root login
PermitRootLogin no

# Disable password auth
PasswordAuthentication no
PubkeyAuthentication yes

# Allow only your user
AllowUsers openclaw
\`\`\`

### Step 4.3: Test SSH Config
**COMMAND:**
\`\`\`bash
sudo sshd -t
\`\`\`

**AGENT:** If no output, config is valid. If errors, fix them before proceeding.

### Step 4.4: Restart SSH and Test
**COMMAND:**
\`\`\`bash
sudo systemctl restart sshd
\`\`\`

**AGENT:** **Critical:** Have user open a NEW terminal and test:
\`\`\`bash
ssh -p 2222 openclaw@YOUR_SERVER_IP
\`\`\`

Only close the original terminal after confirming the new connection works!

---

## Phase 5: Firewall Setup (UFW)

**AGENT:** UFW (Uncomplicated Firewall) will block unwanted traffic. We'll be conservative and only allow what's needed.

### Step 5.1: Check UFW Status
**COMMAND:**
\`\`\`bash
sudo ufw status
\`\`\`

### Step 5.2: Set Default Policies
**COMMAND:**
\`\`\`bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
\`\`\`

### Step 5.3: Allow SSH on Custom Port
**AGENT:** Replace 2222 with whatever port you chose:
\`\`\`bash
sudo ufw allow 2222/tcp
\`\`\`

### Step 5.4: Allow OpenClaw Gateway (if needed)
**AGENT:** Only if you're exposing OpenClaw gateway directly:
\`\`\`bash
sudo ufw allow 3000/tcp
\`\`\`

### Step 5.5: Enable Firewall
**COMMAND:**
\`\`\`bash
sudo ufw enable
\`\`\`

**AGENT:** Confirm with \`y\`. Then verify:
\`\`\`bash
sudo ufw status verbose
\`\`\`

---

## Phase 6: Fail2Ban Installation

**AGENT:** Fail2Ban automatically bans IPs that show malicious behavior. It's your automated defense system.

### Step 6.1: Install Fail2Ban
**COMMAND:**
\`\`\`bash
sudo apt update
sudo apt install fail2ban
\`\`\`

### Step 6.2: Create Local Config
**COMMAND:**
\`\`\`bash
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
\`\`\`

### Step 6.3: Edit Jail Config
**COMMAND:**
\`\`\`bash
sudo nano /etc/fail2ban/jail.local
\`\`\`

**AGENT:** Guide user to find the \`[sshd]\` section and set:

\`\`\`ini
[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600
\`\`\`

**EXPLANATION:** 
- \`maxretry = 3\`: Ban after 3 failed attempts
- \`bantime = 3600\`: Ban for 1 hour (3600 seconds)
- \`findtime = 600\`: Count attempts within 10 minutes

### Step 6.4: Start and Enable
**COMMAND:**
\`\`\`bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
\`\`\`

### Step 6.5: Verify It's Working
**COMMAND:**
\`\`\`bash
sudo fail2ban-client status sshd
\`\`\`

**AGENT:** Should show \`active\` and list any banned IPs.

---

## Phase 7: Automatic Updates

**AGENT:** Security patches only help if you install them. Let's automate updates.

### Step 7.1: Install Unattended Upgrades
**COMMAND:**
\`\`\`bash
sudo apt install unattended-upgrades
\`\`\`

### Step 7.2: Configure
**COMMAND:**
\`\`\`bash
sudo dpkg-reconfigure unattended-upgrades
\`\`\`

**AGENT:** Select "Yes" to enable automatic updates.

---

# PART 2: COMPROMISE DETECTION GUIDE

**AGENT:** If you suspect your server has been compromised, work through these checks systematically. Look for anomalies.

## Check 1: Review Recent Logins

### 1.1: Check Current Sessions
**COMMAND:**
\`\`\`bash
who
w
\`\`\`

**RED FLAGS:**
- Unknown usernames
- Logins from unexpected IP addresses
- Sessions at unusual times

### 1.2: Check Login History
**COMMAND:**
\`\`\`bash
last
\`\`\`

**AGENT:** Look for:
- Failed login attempts from same IP
- Successful logins you don't recognize
- Logins outside your usual timezone

### 1.3: Check for Deleted Users
**COMMAND:**
\`\`\`bash
lastlog
\`\`\`

**AGENT:** Shows all users, including system accounts. Look for recently active accounts you didn't create.

---

## Check 2: Examine Authentication Logs

### 2.1: Review Failed SSH Attempts
**COMMAND:**
\`\`\`bash
sudo grep "Failed password" /var/log/auth.log | tail -20
\`\`\`

**COMMAND (for custom SSH port):**
\`\`\`bash
sudo grep "Failed" /var/log/auth.log | tail -20
\`\`\`

**RED FLAGS:**
- Many failures from same IP
- Attempts for usernames like "admin", "test", "user"
- Successful login after many failures

### 2.2: Check Accepted Logins
**COMMAND:**
\`\`\`bash
sudo grep "Accepted" /var/log/auth.log | tail -20
\`\`\`

**AGENT:** Verify each accepted login:
- Do you recognize the IP?
- Was it at a time you were active?
- Does the user make sense?

### 2.3: Look for Suspicious Commands
**COMMAND:**
\`\`\`bash
sudo grep "sudo:" /var/log/auth.log | tail -20
\`\`\`

**RED FLAGS:**
- sudo commands you didn't run
- Package installations you didn't authorize
- Modifications to system files

---

## Check 3: Check Running Processes

### 3.1: Look for Suspicious Processes
**COMMAND:**
\`\`\`bash
ps aux --sort=-%cpu | head -20
\`\`\`

**AGENT:** Look for:
- Processes consuming high CPU you don't recognize
- Mining software (xmrig, minerd, etc.)
- Processes running from /tmp or /dev/shm
- Processes with random names

### 3.2: Check Network Connections
**COMMAND:**
\`\`\`bash
sudo ss -tulpn | grep ESTAB
\`\`\`

**RED FLAGS:**
- Connections to unexpected foreign IPs
- Listening services you didn't set up
- High outbound traffic

### 3.3: Check Cron Jobs
**COMMAND:**
\`\`\`bash
crontab -l
sudo crontab -l
ls -la /etc/cron.*
\`\`\`

**AGENT:** Attackers often add persistence via cron. Look for:
- Jobs you didn't create
- Downloads or executions from /tmp
- Encoded or obfuscated commands

---

## Check 4: Check for Unauthorized Users

### 4.1: List All Users
**COMMAND:**
\`\`\`bash
cat /etc/passwd | grep -E "/bin/bash|/bin/sh"
\`\`\`

**AGENT:** This shows users with shell access. Look for:
- Usernames you didn't create
- System users with shell access (shouldn't have it)
- Recently created accounts

### 4.2: Check Sudoers
**COMMAND:**
\`\`\`bash
sudo cat /etc/sudoers
grep -r "" /etc/sudoers.d/
\`\`\`

**RED FLAGS:**
- Users with ALL privileges you didn't add
- NOPASSWD entries
- Recently modified sudoers

---

## Check 5: Check Filesystem for Tampering

### 5.1: Check for Recently Modified Files
**COMMAND:**
\`\`\`bash
find /etc /bin /usr/bin -mtime -1 -type f 2>/dev/null
\`\`\`

**AGENT:** Files modified in last 24 hours. Look for:
- Modified SSH configs
- New binaries in system directories
- Changed password files

### 5.2: Check for Hidden Files in Home
**COMMAND:**
\`\`\`bash
ls -la ~ | grep "^\."
\`\`\`

**AGENT:** Look for:
- Unusual hidden directories
- SSH keys you didn't add
- Suspicious .bashrc modifications

### 5.3: Check SSH Authorized Keys
**COMMAND:**
\`\`\`bash
cat ~/.ssh/authorized_keys
\`\`\`

**RED FLAGS:**
- Keys you didn't add
- Multiple keys when you only added one
- Keys with strange comments

---

## Check 6: Check for Rootkits

### 6.1: Check for Modified System Commands
**COMMAND:**
\`\`\`bash
which ls ps netstat
ls -la $(which ls ps netstat)
\`\`\`

**AGENT:** Attackers sometimes replace system binaries. Check file sizes and modification dates.

### 6.2: Check for Suspicious Kernel Modules
**COMMAND:**
\`\`\`bash
lsmod | head -20
\`\`\`

**AGENT:** Unusual kernel modules may indicate rootkit.

---

## What To Do If Compromised

**AGENT:** If you confirm compromise:

1. **Don't panic** - Document everything first
2. **Take snapshots** if your VPS provider supports it
3. **Check what data was accessible** - Assume worst case
4. **Rotate all credentials** - SSH keys, API keys, passwords
5. **Consider rebuilding** - Sometimes starting fresh is safest
6. **Learn and harden** - Use this guide to secure the new setup

---

## Summary: Daily Security Checklist

**AGENT:** Share this with the user for ongoing monitoring:

\`\`\`bash
# Daily quick check
who                    # Who's logged in
sudo fail2ban-client status sshd  # Any bans?
tail -5 /var/log/auth.log         # Recent auth activity
\`\`\`

Stay vigilant. Security is a process, not a destination.

— Nick
    `,
    date: "2026-02-15",
    tags: ["security", "vps", "agent-guide", "incident-response", "automation"],
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
