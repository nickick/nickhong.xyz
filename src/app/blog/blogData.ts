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

Stay paranoid. Stay secure.

— Nick
    `,
    date: "2026-02-15",
    tags: ["security", "vps", "openclaw", "ssh", "hardening"],
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
