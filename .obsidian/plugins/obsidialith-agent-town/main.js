const { Plugin, ItemView, WorkspaceLeaf, TFile } = require('obsidian');

const VIEW_TYPE_AGENT_TOWN = "agent-town-view";

class AgentTownView extends ItemView {
    constructor(leaf) {
        super(leaf);
        this.engine = null;
    }

    getViewType() {
        return VIEW_TYPE_AGENT_TOWN;
    }

    getDisplayText() {
        return "Obsidialith HQ";
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        container.addClass('agent-town-view');

        const header = container.createDiv({ cls: 'agent-town-header' });
        header.createSpan({ text: 'AGENT MEGA-LAB V4.8' });
        const statusSpan = header.createSpan({ cls: 'agent-town-status', text: '● CONNECTING...' });

        const canvas = container.createEl('canvas', { cls: 'agent-town-canvas' });
        this.engine = new AgentEngine(canvas, this.app, statusSpan);
        this.engine.start();
    }

    async onClose() {
        if (this.engine) {
            this.engine.stop();
        }
    }
}

class AgentEngine {
    constructor(canvas, app, statusSpan) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.app = app;
        this.statusSpan = statusSpan;
        this.agents = new Map();
        
        // PRECISE IMAGE-BASED COORDINATES (X, Y in 0-1 range)
        this.rooms = {
            'forge':    { x: 0.28, y: 0.22, name: 'ENGINEERING BAY', color: '#73daca' },
            'archives': { x: 0.72, y: 0.22, name: 'KNOWLEDGE ARCHIVE', color: '#bb9af7' },
            'war-room': { x: 0.26, y: 0.44, name: 'STRATEGY WAR ROOM', color: '#ff9e64' },
            'studio':   { x: 0.74, y: 0.44, name: 'CREATIVE STUDIO', color: '#f7768e' },
            'exchange': { x: 0.26, y: 0.68, name: 'THE EXCHANGE', color: '#e0af68' },
            'core':     { x: 0.50, y: 0.45, name: 'SYSTEM CORE', color: '#7aa2f7' },
            'lobby':    { x: 0.50, y: 0.75, name: 'AGENTIC HQ', color: '#9ece6a' }
        };

        // SURGICAL SPRITE MAPPING (Tighter crops to prevent bleed)
        const row1 = 0.12, row2 = 0.60;
        const cW = 0.12, cH = 0.28;
        this.spriteRects = {
            ralph:      { sx: 0.06, sy: row1, sw: cW, sh: cH }, 
            echo:       { sx: 0.24, sy: row1, sw: cW, sh: cH }, 
            tetra:      { sx: 0.42, sy: row1, sw: cW, sh: cH }, 
            gene:       { sx: 0.60, sy: row1, sw: cW, sh: cH }, 
            researcher: { sx: 0.78, sy: row1, sw: cW, sh: cH }, 
            fiona:      { sx: 0.06, sy: row2, sw: cW, sh: cH }, 
            iola:       { sx: 0.23, sy: row2, sw: cW, sh: cH }, 
            rumi:       { sx: 0.38, sy: row2, sw: cW, sh: cH }, 
            vulture:    { sx: 0.63, sy: row2, sw: cW, sh: cH }, 
            atlas:      { sx: 0.81, sy: row2, sw: cW, sh: cH }  
        };

        this.running = false;
        this.lastTime = 0;
        this.worldImage = null;
        this.spritesImage = null;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.initAgents();
        this.loadAssets();
    }

    async loadAssets() {
        try {
            const worldFile = this.app.vault.getAbstractFileByPath("System/Assets/world.png");
            if (worldFile instanceof TFile) {
                const img = new Image();
                img.src = this.app.vault.getResourcePath(worldFile);
                img.onload = () => { this.worldImage = img; };
            }
            const spriteFile = this.app.vault.getAbstractFileByPath("System/Assets/sprites.png");
            if (spriteFile instanceof TFile) {
                const img = new Image();
                img.src = this.app.vault.getResourcePath(spriteFile);
                img.onload = () => { this.spritesImage = img; };
            }
        } catch (e) { console.error(e); }
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width || 800;
        this.canvas.height = rect.height || 600;
    }

    initAgents() {
        const agentNames = ['ralph', 'fiona', 'tetra', 'atlas', 'gene', 'vulture', 'echo', 'iola', 'rumi', 'researcher'];
        agentNames.forEach((name) => {
            const home = this.rooms[this.getHomeForAgent(name)];
            this.agents.set(name, {
                name: name,
                x: home.x * this.canvas.width,
                y: home.y * this.canvas.height,
                targetX: home.x * this.canvas.width,
                targetY: home.y * this.canvas.height,
                status: 'idle',
                task: '',
                frame: Math.random() * 10
            });
        });
    }

    getHomeForAgent(name) {
        const n = name.toLowerCase();
        if (n === 'ralph' || n === 'echo') return 'forge';
        if (n === 'tetra' || n === 'gene' || n === 'researcher') return 'archives';
        if (n === 'fiona' || n === 'atlas') return 'war-room';
        if (n === 'iola' || n === 'rumi') return 'studio';
        if (n === 'vulture') return 'exchange';
        return 'core';
    }

    start() {
        this.running = true;
        this.animate(performance.now());
        this.pollInterval = setInterval(() => this.pollState(), 500);
    }

    stop() {
        this.running = false;
        clearInterval(this.pollInterval);
    }

    async pollState() {
        const statePath = ".gemini/tmp/agent_states.json";
        try {
            const exists = await this.app.vault.adapter.exists(statePath);
            if (!exists) return;

            const content = await this.app.vault.adapter.read(statePath);
            const states = JSON.parse(content);
            const now = Date.now() / 1000; // State file uses unix timestamp in seconds
            
            this.statusSpan.setText("● HQ ONLINE");
            this.statusSpan.style.color = "#9ece6a";

            // Reset all agents first or check for staleness
            this.agents.forEach(agent => {
                const state = states[agent.name.toLowerCase()];
                
                if (state) {
                    // Check if the state is older than 5 minutes
                    const isStale = (now - state.last_update) > 300;
                    
                    if (isStale || state.status.toLowerCase() === 'idle') {
                        agent.status = 'idle';
                        agent.task = '';
                    } else {
                        agent.status = state.status;
                        agent.task = state.task || '';
                    }
                } else {
                    // No state found for this agent, default to idle
                    agent.status = 'idle';
                    agent.task = '';
                }

                // LOGIC: Movement targets based on room assignments
                const roomId = this.getHomeForAgent(agent.name);
                const room = this.rooms[roomId];
                
                if (room) {
                    const rx = room.x * this.canvas.width;
                    const ry = room.y * this.canvas.height;
                    const d = Math.sqrt(Math.pow(agent.targetX - rx, 2) + Math.pow(agent.targetY - ry, 2));
                    
                    // If way off target, or just for ambient movement
                    if (d > 80 || Math.random() > 0.99) {
                        agent.targetX = rx + (Math.random() * 80 - 40);
                        agent.targetY = ry + (Math.random() * 80 - 40);
                    }
                }
            });
        } catch (e) { console.error("PollState Error:", e); }
    }

    animate(time) {
        if (!this.running) return;
        const dt = Math.min(time - this.lastTime, 100);
        this.lastTime = time;
        this.update(dt);
        this.draw();
        requestAnimationFrame((t) => this.animate(t));
    }

    update(dt) {
        this.agents.forEach(agent => {
            const dx = agent.targetX - agent.x;
            const dy = agent.targetY - agent.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 2) {
                const speed = 0.08 * dt;
                agent.x += (dx / dist) * Math.min(speed, dist);
                agent.y += (dy / dist) * Math.min(speed, dist);
                agent.frame += dt * 0.01;
            } else { agent.frame += dt * 0.003; }
        });
    }

    draw() {
        const ctx = this.ctx;
        if (this.worldImage) {
            ctx.drawImage(this.worldImage, 0, 0, this.canvas.width, this.canvas.height);
        } else {
            ctx.fillStyle = '#16161e';
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        const sortedAgents = Array.from(this.agents.values()).sort((a, b) => a.y - b.y);
        sortedAgents.forEach(agent => this.drawAgent(agent));
    }

    drawAgent(agent) {
        const ctx = this.ctx;
        const x = agent.x;
        const y = agent.y;
        const bob = Math.sin(agent.frame) * 4;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.beginPath();
        ctx.ellipse(x, y + 2, 8, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        if (this.spritesImage) {
            const rect = this.spriteRects[agent.name] || this.spriteRects['researcher'];
            const sw = this.spritesImage.naturalWidth * rect.sw;
            const sh = this.spritesImage.naturalHeight * rect.sh;
            const sx = this.spritesImage.naturalWidth * rect.sx;
            const sy = this.spritesImage.naturalHeight * rect.sy;
            const renderW = 42; // EVEN SMALLER
            const renderH = (sh / sw) * renderW;
            ctx.drawImage(this.spritesImage, sx, sy, sw, sh, x - renderW/2, y - renderH + 5 + bob, renderW, renderH);
        }

        if (agent.status !== 'idle' && agent.status !== '') {
            ctx.font = '16px "VT323"';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white';
            ctx.fillText(agent.name.toUpperCase(), x, y + 15);
            if (agent.task) {
                ctx.font = '14px "VT323"';
                ctx.fillStyle = 'rgba(13, 14, 20, 0.9)';
                ctx.strokeStyle = '#73daca';
                const tw = ctx.measureText(agent.task).width;
                ctx.fillRect(x - tw/2 - 6, y - 65 + bob, tw + 12, 18);
                ctx.strokeRect(x - tw/2 - 6, y - 65 + bob, tw + 12, 18);
                ctx.fillStyle = 'white';
                ctx.fillText(agent.task, x, y - 52 + bob);
            }
        }
    }
}

module.exports = class AgentTownPlugin extends Plugin {
    async onload() {
        this.registerView(VIEW_TYPE_AGENT_TOWN, (leaf) => new AgentTownView(leaf));
        this.addRibbonIcon('bot', 'Agent World', () => this.activateView());
    }

    async activateView() {
        let leaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_AGENT_TOWN)[0];
        if (!leaf) {
            leaf = this.app.workspace.getRightLeaf(false);
            await leaf.setViewState({ type: VIEW_TYPE_AGENT_TOWN, active: true });
        }
        this.app.workspace.revealLeaf(leaf);
    }
}
